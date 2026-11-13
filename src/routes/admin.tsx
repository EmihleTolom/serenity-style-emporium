import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { LogOut, Plus, UploadCloud, X } from "lucide-react";
import type { User } from "@supabase/supabase-js";
import { ADMIN_USER_ID, PRODUCT_MEDIA_BUCKET, supabase } from "../lib/supabase";

export const Route = createFileRoute("/admin")({ component: AdminPage });

type ProductRow = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string | null;
  sizes: string[];
  colours: string[];
  stock_quantity: number;
  image_urls: string[];
  video_urls: string[];
  is_published: boolean;
};


function normaliseStringArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.filter((item): item is string => typeof item === "string").map((item) => item.trim()).filter(Boolean);
  if (typeof value !== "string" || !value.trim()) return [];
  try {
    const parsed: unknown = JSON.parse(value);
    if (Array.isArray(parsed)) return parsed.filter((item): item is string => typeof item === "string").map((item) => item.trim()).filter(Boolean);
  } catch {
    // A plain comma-separated value is also supported.
  }
  return value.split(",").map((item) => item.trim()).filter(Boolean);
}

function normaliseImageUrls(value: unknown): string[] {
  if (Array.isArray(value)) return value.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
  if (typeof value !== "string" || !value.trim()) return [];
  try {
    const parsed: unknown = JSON.parse(value);
    if (Array.isArray(parsed)) return parsed.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
  } catch {
    // A single public URL may be stored as plain text rather than a JSON array.
  }
  return value.startsWith("http") ? [value] : [];
}

const emptyForm = {
  name: "",
  description: "",
  price: "",
  category: "Dresses",
  sizes: "XS, S, M, L, XL",
  colours: "",
  stock_quantity: "1",
  is_published: false,
};

function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [existingVideos, setExistingVideos] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  const imagePreviews = useMemo(
    () => images.map((file) => ({ file, url: URL.createObjectURL(file) })),
    [images],
  );

  useEffect(() => {
    return () => {
      imagePreviews.forEach((preview) => URL.revokeObjectURL(preview.url));
    };
  }, [imagePreviews]);

  const loadProducts = useCallback(async () => {
    if (!supabase) return;
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      setMessage(error.message);
      return;
    }
    setProducts((data ?? []) as ProductRow[]);
  }, []);

  useEffect(() => {
    if (!supabase) {
      setChecking(false);
      return;
    }
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      const current = data.session?.user ?? null;
      setUser(current?.id === ADMIN_USER_ID ? current : null);
      setChecking(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const current = session?.user ?? null;
      setUser(current?.id === ADMIN_USER_ID ? current : null);
    });
    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user?.id === ADMIN_USER_ID) void loadProducts();
  }, [user, loadProducts]);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setImages([]);
    setVideos([]);
    setExistingImages([]);
    setExistingVideos([]);
  };

  const signIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!supabase) return;
    setBusy(true);
    setMessage("");
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) {
      setMessage(error.message);
      return;
    }
    if (data.user?.id !== ADMIN_USER_ID) {
      await supabase.auth.signOut();
      setMessage("This account is not authorised to access the Serenity Wears admin area.");
    } else {
      setMessage("You are signed in.");
    }
  };

  const uploadFiles = async (files: File[], folder: "images" | "videos") => {
    if (!supabase || !user) throw new Error("Please sign in again.");
    const urls: string[] = [];
    for (const file of files) {
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
      const path = `${user.id}/${folder}/${Date.now()}-${crypto.randomUUID()}-${safeName}`;
      const { error } = await supabase.storage.from(PRODUCT_MEDIA_BUCKET).upload(path, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type || undefined,
      });
      if (error) throw error;
      const { data } = supabase.storage.from(PRODUCT_MEDIA_BUCKET).getPublicUrl(path);
      urls.push(data.publicUrl);
    }
    return urls;
  };

  const saveProduct = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!supabase || !user) return;
    if (!form.name.trim() || !form.price || Number(form.price) < 0) {
      setMessage("Please enter a product name and a valid price.");
      return;
    }
    setBusy(true);
    setMessage("");
    try {
      const newImages = await uploadFiles(images, "images");
      const newVideos = await uploadFiles(videos, "videos");
      const payload = {
        name: form.name.trim(),
        description: form.description.trim(),
        price: Number(form.price),
        category: form.category.trim(),
        sizes: form.sizes.split(",").map((item) => item.trim()).filter(Boolean),
        colours: form.colours.split(",").map((item) => item.trim()).filter(Boolean),
        stock_quantity: Math.max(0, Number.parseInt(form.stock_quantity || "0", 10)),
        image_urls: [...existingImages, ...newImages],
        video_urls: [...existingVideos, ...newVideos],
        is_published: form.is_published,
        updated_at: new Date().toISOString(),
      };
      const result = editingId
        ? await supabase.from("products").update(payload).eq("id", editingId)
        : await supabase.from("products").insert(payload);
      if (result.error) throw result.error;
      setMessage(form.is_published ? "Product saved and published." : "Product saved as a draft.");
      resetForm();
      await loadProducts();
    } catch (error) {
      const details =
        error && typeof error === "object"
          ? [
              "message" in error ? String(error.message) : "",
              "details" in error && error.details ? String(error.details) : "",
              "hint" in error && error.hint ? String(error.hint) : "",
              "code" in error && error.code ? `Code: ${String(error.code)}` : "",
            ].filter(Boolean).join(" — ")
          : String(error || "Unknown error");
      setMessage(details || "The product could not be saved. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const editProduct = (product: ProductRow) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      description: product.description ?? "",
      price: String(product.price),
      category: product.category ?? "Dresses",
      sizes: normaliseStringArray(product.sizes).join(", "),
      colours: normaliseStringArray(product.colours).join(", "),
      stock_quantity: String(product.stock_quantity ?? 0),
      is_published: product.is_published,
    });
    setExistingImages(normaliseImageUrls(product.image_urls));
    setExistingVideos(normaliseStringArray(product.video_urls));
    setImages([]);
    setVideos([]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const removeProduct = async (product: ProductRow) => {
    if (!supabase || !window.confirm(`Delete "${product.name}"? This cannot be undone.`)) return;
    setBusy(true);
    const { error } = await supabase.from("products").delete().eq("id", product.id);
    setBusy(false);
    if (error) setMessage(error.message);
    else {
      setMessage("Product deleted.");
      await loadProducts();
      if (editingId === product.id) resetForm();
    }
  };

  const signOut = async () => {
    if (supabase) await supabase.auth.signOut();
    setUser(null);
    resetForm();
  };

  if (!supabase) {
    return <AdminShell><Notice title="Connect Supabase first">The website cannot find its Supabase settings. Check that Vercel has VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY, then redeploy.</Notice></AdminShell>;
  }

  if (checking) return <AdminShell><p className="text-sm text-[#77677c]">Checking your admin session…</p></AdminShell>;

  if (!user) {
    return <AdminShell>
      <div className="mx-auto max-w-md rounded-2xl bg-white p-7 shadow-sm ring-1 ring-[#eadff0] sm:p-9">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#9565ad]">Private access</p>
        <h1 className="mt-3 font-serif text-3xl text-[#32133f]">Serenity Wears Admin</h1>
        <p className="mt-2 text-sm leading-6 text-[#77677c]">Sign in with the admin email and password you created in Supabase.</p>
        <form onSubmit={signIn} className="mt-7 space-y-4">
          <label className="block text-xs font-semibold text-[#5d4964]">Email address<input type="email" required autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full rounded-lg border border-[#d9c8e0] px-4 py-3 text-sm outline-none focus:border-[#6b2b83]"/></label>
          <label className="block text-xs font-semibold text-[#5d4964]">Password<input type="password" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full rounded-lg border border-[#d9c8e0] px-4 py-3 text-sm outline-none focus:border-[#6b2b83]"/></label>
          <button disabled={busy} className="w-full rounded-full bg-[#4c1d67] px-5 py-3.5 text-sm font-semibold text-white disabled:opacity-60">{busy ? "Signing in…" : "Sign in"}</button>
        </form>
        {message && <p role="status" className="mt-4 text-sm text-[#6b2b83]">{message}</p>}
      </div>
    </AdminShell>;
  }

  return <AdminShell>
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div><p className="text-xs font-bold uppercase tracking-[0.25em] text-[#9565ad]">Store management</p><h1 className="mt-2 font-serif text-3xl text-[#32133f] sm:text-4xl">Your products</h1><p className="mt-2 text-sm text-[#77677c]">Add products, upload photos and videos, and control what customers can see.</p></div>
      <button onClick={signOut} className="inline-flex items-center gap-2 rounded-full border border-[#d9c8e0] bg-white px-4 py-2.5 text-sm font-semibold text-[#4c1d67]"><LogOut size={16}/> Sign out</button>
    </div>
    {message && <p role="status" className="mt-5 rounded-lg bg-white p-3 text-sm text-[#5b2475] ring-1 ring-[#eadff0]">{message}</p>}
    <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,.9fr)]">
      <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#eadff0] sm:p-8">
        <div className="flex items-center justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9565ad]">{editingId ? "Update listing" : "New listing"}</p><h2 className="mt-2 font-serif text-2xl text-[#32133f]">{editingId ? "Edit product" : "Add a product"}</h2></div>{editingId && <button onClick={resetForm} className="text-xs font-semibold text-[#6b2b83]">Cancel edit</button>}</div>
        <form onSubmit={saveProduct} className="mt-6 space-y-4">
          <Field label="Product name"><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={fieldClass}/></Field>
          <Field label="Description"><textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={fieldClass}/></Field>
          <div className="grid gap-4 sm:grid-cols-2"><Field label="Price (R)"><input type="number" min="0" step="0.01" required value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className={fieldClass}/></Field><Field label="Category"><select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={fieldClass}><option>Dresses</option><option>Sets</option><option>Accessories</option><option>Handbags</option><option>Other</option></select></Field></div>
          <Field label="Sizes (separate with commas)"><input value={form.sizes} onChange={(e) => setForm({ ...form, sizes: e.target.value })} placeholder="XS, S, M, L, XL or One Size" className={fieldClass}/></Field>
          <div className="grid gap-4 sm:grid-cols-2"><Field label="Colours (separate with commas)"><input value={form.colours} onChange={(e) => setForm({ ...form, colours: e.target.value })} className={fieldClass}/></Field><Field label="Stock quantity"><input type="number" min="0" step="1" value={form.stock_quantity} onChange={(e) => setForm({ ...form, stock_quantity: e.target.value })} className={fieldClass}/></Field></div>
          <div><label className="block text-xs font-semibold text-[#5d4964]">Product photos (you can select multiple)<input type="file" accept="image/*" multiple onChange={(e) => setImages((items) => [...items, ...Array.from(e.target.files ?? [])])} className="mt-2 block w-full rounded-lg border border-dashed border-[#cdb8d7] bg-[#fcf8ff] p-3 text-xs"/></label>{imagePreviews.length > 0 && <div className="mt-3"><p className="mb-2 text-xs font-semibold text-[#5d4964]">New photos — check these before saving</p><div className="flex flex-wrap gap-3">{imagePreviews.map(({ file, url }, index) => <div key={url} className="w-20"><div className="relative"><img src={url} alt={file.name} className="h-24 w-20 rounded-lg border border-[#eadff0] object-cover"/><button type="button" aria-label={`Remove ${file.name}`} onClick={() => setImages((items) => items.filter((_, itemIndex) => itemIndex !== index))} className="absolute -right-2 -top-2 rounded-full bg-white p-1.5 text-[#6b2b83] shadow"><X size={13}/></button></div><p className="mt-1 truncate text-[10px] text-[#77677c]" title={file.name}>{file.name}</p></div>)}</div></div>}{existingImages.length > 0 && <div className="mt-3"><p className="mb-2 text-xs font-semibold text-[#5d4964]">Saved photos</p><div className="flex flex-wrap gap-2">{existingImages.map((url) => <div key={url} className="relative"><img src={url} alt="Product" className="h-16 w-14 rounded object-cover"/><button type="button" onClick={() => setExistingImages((items) => items.filter((item) => item !== url))} className="absolute -right-1 -top-1 rounded-full bg-white p-1 shadow"><X size={12}/></button></div>)}</div></div>}</div>
          <div><label className="block text-xs font-semibold text-[#5d4964]">Product videos (optional)<input type="file" accept="video/*" multiple onChange={(e) => setVideos(Array.from(e.target.files ?? []))} className="mt-2 block w-full rounded-lg border border-dashed border-[#cdb8d7] bg-[#fcf8ff] p-3 text-xs"/></label>{videos.length > 0 && <p className="mt-2 text-xs text-[#77677c]">{videos.length} video(s) selected</p>}{existingVideos.length > 0 && <div className="mt-3 space-y-1">{existingVideos.map((url) => <div key={url} className="flex items-center justify-between gap-2 text-xs"><a href={url} target="_blank" rel="noreferrer" className="truncate text-[#6b2b83] underline">View existing video</a><button type="button" onClick={() => setExistingVideos((items) => items.filter((item) => item !== url))} className="text-[#6b2b83]">Remove</button></div>)}</div>}</div>
          <label className="flex items-center gap-3 rounded-lg bg-[#fcf8ff] p-3 text-sm text-[#4c1d67]"><input type="checkbox" checked={form.is_published} onChange={(e) => setForm({ ...form, is_published: e.target.checked })} className="h-4 w-4 accent-[#5b2475]"/> Publish this product on the storefront</label>
          <button disabled={busy} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#4c1d67] px-5 py-3.5 text-sm font-semibold text-white disabled:opacity-60"><UploadCloud size={17}/>{busy ? "Saving product…" : editingId ? "Save changes" : "Save product"}</button>
        </form>
      </section>
      <section><div className="flex items-center justify-between"><h2 className="font-serif text-2xl text-[#32133f]">Product listings</h2><button onClick={() => void loadProducts()} className="text-xs font-semibold text-[#6b2b83]">Refresh</button></div><div className="mt-4 space-y-3">{products.length === 0 ? <div className="rounded-xl border border-dashed border-[#d9c8e0] bg-white p-6 text-center text-sm text-[#77677c]">No products yet. Add your first product using the form.</div> : products.map((product) => <article key={product.id} className="flex gap-3 rounded-xl bg-white p-3 shadow-sm ring-1 ring-[#eadff0]"><img src={normaliseImageUrls(product.image_urls)[0] || "/placeholder.svg"} alt="" className="h-24 w-20 rounded-lg bg-[#f3e8f7] object-cover"/><div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-2"><div className="min-w-0"><h3 className="truncate font-serif text-lg text-[#32133f]">{product.name}</h3><p className="text-xs text-[#77677c]">R{Number(product.price).toFixed(2)} · {product.category || "Uncategorised"}</p></div><span className={product.is_published ? "rounded-full bg-green-50 px-2 py-1 text-[10px] font-semibold text-green-700" : "rounded-full bg-[#f4ebf8] px-2 py-1 text-[10px] font-semibold text-[#6b2b83]"}>{product.is_published ? "Published" : "Draft"}</span></div><p className="mt-1 text-xs text-[#77677c]">Stock: {product.stock_quantity} · {(product.image_urls ?? []).length} photo(s)</p><div className="mt-3 flex gap-3 text-xs font-semibold text-[#6b2b83]"><button type="button" onClick={() => editProduct(product)}>Edit</button><button type="button" onClick={() => void removeProduct(product)} disabled={busy}>Delete</button></div></div></article>)}</div></section>
    </div>
  </AdminShell>;
}

const fieldClass = "mt-2 w-full rounded-lg border border-[#d9c8e0] bg-white px-4 py-3 text-sm outline-none focus:border-[#6b2b83]";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block text-xs font-semibold text-[#5d4964]">{label}{children}</label>;
}

function Notice({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="mx-auto max-w-lg rounded-2xl bg-white p-7 shadow-sm ring-1 ring-[#eadff0]"><h1 className="font-serif text-2xl text-[#32133f]">{title}</h1><p className="mt-3 text-sm leading-6 text-[#77677c]">{children}</p></div>;
}

function AdminShell({ children }: { children: React.ReactNode }) {
  return <main className="min-h-screen bg-[#fcf8ff] px-5 py-10 text-[#261b2d] sm:px-8"><div className="mx-auto max-w-7xl"><a href="/" className="mb-9 inline-block font-serif text-xl text-[#3f1655]">Serenity Wears <span className="font-sans text-xs text-[#9565ad]">/ Admin</span></a>{children}</div></main>;
}
