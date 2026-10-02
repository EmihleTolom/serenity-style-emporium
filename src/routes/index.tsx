
import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Heart, Instagram, Menu, Minus, Plus, Search, ShoppingBag, Trash2, X } from "lucide-react";
import adannaDress from "../assets/adanna-dress.jpg";
import amahleDress from "../assets/amahle-dress.jpg";
import autoGele from "../assets/auto-gele.jpg";
import imaniSet from "../assets/imani-set.jpg";
import nalediSet from "../assets/naledi-set.jpg";
import zuriKaftan from "../assets/zuri-kaftan.jpg";

export const Route = createFileRoute("/")({ component: Index });

type Product = {
  id: number; name: string; category: "Dresses" | "Sets" | "Accessories";
  price: number; image: string; description: string; sizes: string[]; badge?: string;
  oldPrice?: number; soldOut?: boolean;
};
type CartItem = Product & { size: string; quantity: number };

const products: Product[] = [
  { id: 1, name: "Adanna Dress", category: "Dresses", price: 1299, image: adannaDress, description: "A feminine statement silhouette designed for elegant occasions.", sizes: ["XS","S","M","L","XL"], badge: "New" },
  { id: 2, name: "Amahle Dress", category: "Dresses", price: 1399, image: amahleDress, description: "A refined occasion dress with a graceful, confident finish.", sizes: ["XS","S","M","L","XL"] },
  { id: 3, name: "Imani Set", category: "Sets", price: 1199, image: imaniSet, description: "A polished two-piece set made for effortless styling.", sizes: ["XS","S","M","L","XL"], badge: "Best Seller" },
  { id: 4, name: "Naledi Set", category: "Sets", price: 1249, image: nalediSet, description: "A sophisticated matching set that moves beautifully from day to night.", sizes: ["XS","S","M","L","XL"] },
  { id: 5, name: "Zuri Kaftan", category: "Dresses", price: 1099, image: zuriKaftan, description: "An easy, elegant kaftan inspired by African style and femininity.", sizes: ["XS","S","M","L","XL"], badge: "Sale", oldPrice: 1299 },
  { id: 6, name: "Auto Gele", category: "Accessories", price: 499, image: autoGele, description: "A statement accessory to complete your Serenity Wears look.", sizes: ["One Size"], soldOut: true },
];

const money = (value: number) => new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR", maximumFractionDigits: 0 }).format(value);

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [category, setCategory] = useState("All");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<number[]>([]);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [promo, setPromo] = useState("");
  const [appliedPromo, setAppliedPromo] = useState("");
  const [promoMessage, setPromoMessage] = useState("");

  const filtered = useMemo(() => products.filter(p =>
    (category === "All" || p.category === category) && p.name.toLowerCase().includes(searchTerm.toLowerCase())
  ), [category, searchTerm]);

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);
  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const discount = appliedPromo === "SERENITY10" ? Math.round(subtotal * 0.1) : 0;
  const shipping = subtotal === 0 || subtotal - discount >= 1500 ? 0 : 99;
  const total = Math.max(0, subtotal - discount + shipping);

  const openProduct = (p: Product) => {
    setSelectedSize(p.sizes[0]);
    setQuickView(p);
    setRecentlyViewed(current => [p.id, ...current.filter(id => id !== p.id)].slice(0, 4));
  };
  const addToCart = (p: Product) => {
    if (!selectedSize || p.soldOut) return;
    setCart(current => {
      const found = current.find(i => i.id === p.id && i.size === selectedSize);
      if (found) return current.map(i => i.id === p.id && i.size === selectedSize ? { ...i, quantity: i.quantity + 1 } : i);
      return [...current, { ...p, size: selectedSize, quantity: 1 }];
    });
    setQuickView(null); setCartOpen(true);
  };
  const changeQty = (id: number, size: string, delta: number) =>
    setCart(current => current.map(i => i.id === id && i.size === size ? { ...i, quantity: Math.max(0, i.quantity + delta) } : i).filter(i => i.quantity > 0));

  const applyPromo = () => {
    if (promo.trim().toUpperCase() === "SERENITY10") {
      setAppliedPromo("SERENITY10");
      setPromoMessage("10% demo discount applied.");
    } else {
      setAppliedPromo("");
      setPromoMessage("For the demo, try SERENITY10.");
    }
  };

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));
  const recentProducts = recentlyViewed.map(id => products.find(p => p.id === id)).filter(Boolean) as Product[];

  return (
    <main className="min-h-screen bg-[#fcf8ff] text-[#261b2d]">
      <div className="bg-[#4c1d67] px-4 py-2 text-center text-[11px] font-medium tracking-[0.16em] text-white">FREE DELIVERY ON ORDERS OVER R1,500 · YOUR BEAUTY, OUR PEACE</div>

      <header className="sticky top-0 z-50 border-b border-[#eadff0] bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <button className="md:hidden" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu size={22}/></button>
          <a href="#home" className="text-center md:text-left">
            <span className="block font-serif text-2xl tracking-wide text-[#3f1655]">Serenity Wears</span>
            <span className="hidden text-[9px] uppercase tracking-[0.32em] text-[#9565ad] sm:block">Your Beauty, Our Peace</span>
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            <a href="#home" className="text-sm hover:text-[#71318e]">Home</a>
            <a href="#shop" className="text-sm hover:text-[#71318e]">Shop</a>
            <a href="#collections" className="text-sm hover:text-[#71318e]">Collections</a>
            <a href="#about" className="text-sm hover:text-[#71318e]">About</a>
            <a href="#contact" className="text-sm hover:text-[#71318e]">Contact</a>
          </nav>
          <div className="flex items-center gap-1">
            <button className="rounded-full p-2.5 hover:bg-[#f4ebf8]" onClick={() => setSearchOpen(v => !v)} aria-label="Search"><Search size={19}/></button>
            <button className="relative hidden rounded-full p-2.5 hover:bg-[#f4ebf8] sm:block" onClick={() => setWishlistOpen(true)} aria-label="Wishlist"><Heart size={19}/>{wishlist.length > 0 && <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#6b2b83] text-[10px] font-bold text-white">{wishlist.length}</span>}</button>
            <button className="relative rounded-full p-2.5 hover:bg-[#f4ebf8]" onClick={() => setCartOpen(true)} aria-label="Shopping bag">
              <ShoppingBag size={20}/>{cartCount > 0 && <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#6b2b83] text-[10px] font-bold text-white">{cartCount}</span>}
            </button>
          </div>
        </div>
        {searchOpen && <div className="border-t border-[#eadff0] bg-[#fcf8ff] px-5 py-4"><div className="mx-auto flex max-w-3xl items-center gap-3 rounded-full border border-[#d9c8e0] bg-white px-5 py-3"><Search size={18} className="text-[#9565ad]"/><input autoFocus value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search dresses, sets, accessories..." className="w-full bg-transparent text-sm outline-none"/>{searchTerm && <button onClick={() => setSearchTerm("")}><X size={18}/></button>}</div></div>}
        {menuOpen && <div className="fixed inset-0 z-[70] bg-[#261b2d]/40 md:hidden"><div className="h-full w-[85%] max-w-sm bg-white p-6 shadow-2xl"><div className="flex items-center justify-between"><span className="font-serif text-2xl text-[#3f1655]">Serenity Wears</span><button onClick={() => setMenuOpen(false)}><X/></button></div><nav className="mt-12 flex flex-col gap-7 text-lg">{["Home","Shop","Collections","About","Contact"].map(x => <a key={x} href={"#" + x.toLowerCase()} onClick={() => setMenuOpen(false)}>{x}</a>)}</nav></div></div>}
      </header>

      <section id="home" className="relative overflow-hidden bg-[#f3e8f7]">
        <div className="mx-auto grid min-h-[650px] max-w-7xl items-center lg:grid-cols-[0.85fr_1.15fr]">
          <div className="order-2 px-6 py-16 sm:px-10 lg:order-1 lg:px-16">
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#8a4ba4]">The new Serenity edit</p>
            <h1 className="mt-5 max-w-xl font-serif text-5xl leading-[0.98] text-[#32133f] sm:text-6xl lg:text-7xl">Fashion that feels like you.</h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-[#66536c]">Discover elegant African-inspired pieces, occasion wear and everyday favourites designed to make you feel confident, feminine and beautifully yourself.</p>
            <div className="mt-8 flex flex-wrap gap-3"><a href="#shop" className="rounded-full bg-[#5b2475] px-7 py-3.5 text-sm font-semibold text-white hover:bg-[#461958]">Shop the collection</a><a href="#collections" className="rounded-full border border-[#6b2b83]/30 bg-white/70 px-7 py-3.5 text-sm font-semibold text-[#4c1d67]">Explore collections</a></div>
          </div>
          <div className="order-1 min-h-[520px] bg-cover bg-center lg:order-2 lg:min-h-[650px]" style={{backgroundImage: "url(" + amahleDress + ")"}} />
        </div>
      </section>

      <section className="border-y border-[#eadff0] bg-white"><div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-[#eadff0] sm:grid-cols-4">{[
        ["01","Secure checkout","Shop directly on our website"],["02","Easy support","Simple customer support"],["03","South African style","Curated for her"],["04","Free delivery","On orders over R1,500"]
      ].map(([n,t,d]) => <div key={n} className="px-4 py-7 text-center sm:px-7"><p className="text-[10px] tracking-[0.25em] text-[#9565ad]">{n}</p><h2 className="mt-2 font-serif text-lg text-[#3f1655]">{t}</h2><p className="mt-1 text-xs text-[#77677c]">{d}</p></div>)}</div></section>

      <section id="shop" className="scroll-mt-20 bg-white"><div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.3em] text-[#8a4ba4]">Shop Serenity</p><h2 className="mt-3 font-serif text-4xl text-[#32133f] sm:text-5xl">The latest pieces</h2><p className="mt-3 max-w-xl text-sm leading-6 text-[#76677b]">Browse products, choose your size, add your favourites to your bag and check out without leaving the website.</p></div><button onClick={() => setSizeGuideOpen(true)} className="flex items-center gap-2 text-sm font-semibold text-[#5b2475]">Size guide <span>→</span></button></div>
        <div className="mt-10 flex gap-2 overflow-x-auto pb-2">{["All","Dresses","Sets","Accessories"].map(x => <button key={x} onClick={() => setCategory(x)} className={"shrink-0 rounded-full px-5 py-2.5 text-xs font-semibold " + (category === x ? "bg-[#4c1d67] text-white" : "border border-[#decfe5] bg-white text-[#5d4964]")}>{x}</button>)}</div>
        <div className="mt-9 grid grid-cols-2 gap-x-3 gap-y-9 sm:gap-x-6 lg:grid-cols-3">{filtered.map(p => <article key={p.id} className="group relative">
          <div className="relative aspect-[3/4] overflow-hidden bg-[#f2eaf5]"><button className="h-full w-full" onClick={() => openProduct(p)}><img src={p.image} alt={p.name} className={"h-full w-full object-cover transition duration-700 group-hover:scale-105 " + (p.soldOut ? "opacity-65 grayscale-[0.2]" : "")}/></button>{p.badge && <span className="absolute left-3 top-3 bg-[#5b2475] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-white">{p.badge}</span>}{p.soldOut && <span className="absolute inset-x-3 bottom-3 bg-white/95 px-3 py-2 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-[#3f1655]">Sold out</span>}</div>
          <button className="absolute right-3 top-3 rounded-full bg-white/90 p-2.5 shadow-sm" onClick={() => setWishlist(w => w.includes(p.id) ? w.filter(x => x !== p.id) : [...w,p.id])} aria-label="Add to wishlist"><Heart size={18} fill={wishlist.includes(p.id) ? "currentColor" : "none"} className={wishlist.includes(p.id) ? "text-[#7a2e93]" : "text-[#49384e]"}/></button>
          <div className="pt-4"><div className="flex items-start justify-between gap-2"><div><p className="text-[10px] uppercase tracking-[0.2em] text-[#9565ad]">{p.category}</p><h3 className="mt-1 font-serif text-xl text-[#32133f]">{p.name}</h3></div><p className="font-semibold text-[#32133f]">{money(p.price)} {p.oldPrice && <span className="ml-1 text-xs font-normal text-[#9b899f] line-through">{money(p.oldPrice)}</span>}</p></div><button onClick={() => openProduct(p)} disabled={p.soldOut} className="mt-4 flex w-full items-center justify-center gap-2 border border-[#4c1d67]/20 py-3 text-xs font-bold uppercase tracking-[0.15em] text-[#4c1d67] hover:bg-[#4c1d67] hover:text-white disabled:cursor-not-allowed disabled:border-[#ddd] disabled:text-[#999]">{p.soldOut ? "Sold out" : "Quick add"} {!p.soldOut && <Plus size={15}/>}</button></div>
        </article>)}</div>
      </div></section>

      {recentProducts.length > 0 && <section className="bg-white"><div className="mx-auto max-w-7xl px-5 py-16 sm:px-8"><div className="flex items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.3em] text-[#8a4ba4]">For you</p><h2 className="mt-2 font-serif text-3xl text-[#32133f]">Recently viewed</h2></div><button onClick={() => setRecentlyViewed([])} className="text-xs font-semibold text-[#6b2b83]">Clear</button></div><div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">{recentProducts.map(p => <button key={p.id} onClick={() => openProduct(p)} className="text-left"><img src={p.image} alt={p.name} className="aspect-[3/4] w-full object-cover"/><p className="mt-3 font-serif text-lg text-[#32133f]">{p.name}</p><p className="mt-1 text-sm font-semibold">{money(p.price)}</p></button>)}</div></div></section>}

      {wishlistProducts.length > 0 && <section className="bg-[#f7eff9]"><div className="mx-auto max-w-7xl px-5 py-16 sm:px-8"><div className="flex items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.3em] text-[#8a4ba4]">Saved for later</p><h2 className="mt-2 font-serif text-3xl text-[#32133f]">Your wishlist</h2></div><button onClick={() => setWishlist([])} className="text-xs font-semibold text-[#6b2b83]">Clear wishlist</button></div><div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">{wishlistProducts.map(p => <button key={p.id} onClick={() => openProduct(p)} className="text-left"><img src={p.image} alt={p.name} className="aspect-[3/4] w-full object-cover"/><p className="mt-3 font-serif text-lg text-[#32133f]">{p.name}</p><p className="mt-1 text-sm font-semibold">{money(p.price)}</p></button>)}</div></div></section>}

      <section id="collections" className="scroll-mt-20 bg-[#f7eff9]"><div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28"><div className="text-center"><p className="text-xs font-bold uppercase tracking-[0.3em] text-[#8a4ba4]">Shop by mood</p><h2 className="mt-3 font-serif text-4xl text-[#32133f] sm:text-5xl">Collections</h2></div><div className="mt-12 grid gap-5 sm:grid-cols-3">{[
        ["New Arrivals",amahleDress,"Fresh pieces for the season"],["Occasion",adannaDress,"Elegant looks for memorable moments"],["Everyday Edit",zuriKaftan,"Effortless pieces you will reach for"]
      ].map(([t,img,d]) => <a key={t} href="#shop" className="group relative aspect-[4/5] overflow-hidden bg-[#e9ddef]"><img src={img} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105"/><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#25122d]/85 to-transparent p-7 pt-24 text-white"><p className="text-[10px] uppercase tracking-[0.25em] text-[#e6c7ee]">Serenity Wears</p><h3 className="mt-2 font-serif text-3xl">{t}</h3><p className="mt-1 text-sm text-white/75">{d}</p></div></a>)}</div></div></section>

      <section id="about" className="scroll-mt-20 bg-[#3b174d] text-white"><div className="mx-auto grid max-w-7xl lg:grid-cols-2"><div className="min-h-[520px] bg-cover bg-center" style={{backgroundImage: "url(" + imaniSet + ")"}}/><div className="flex flex-col justify-center px-6 py-20 sm:px-10 lg:px-16"><p className="text-xs font-bold uppercase tracking-[0.3em] text-[#dcb9e7]">About Serenity Wears</p><h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">Where style meets serenity.</h2><p className="mt-7 leading-8 text-white/75">Serenity Wears celebrates feminine fashion, African-inspired detail and the confidence that comes from finding a piece that feels like it was made for you.</p><p className="mt-4 leading-8 text-white/75">Our online store makes that experience easier: discover your next look, choose your size, add it to your bag and complete your order in one place.</p><a href="#shop" className="mt-8 w-fit rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#4c1d67]">Shop the edit</a></div></div></section>

      <section id="contact" className="scroll-mt-20 bg-white"><div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24"><div className="grid gap-10 lg:grid-cols-2"><div><p className="text-xs font-bold uppercase tracking-[0.3em] text-[#8a4ba4]">Need help?</p><h2 className="mt-3 font-serif text-4xl text-[#32133f] sm:text-5xl">We are here for you.</h2><p className="mt-5 max-w-lg leading-7 text-[#6f6073]">WhatsApp and social media remain available for sizing questions, product queries, appointments and general customer support. Your shopping journey, however, starts and ends here on the website.</p><div className="mt-7 flex flex-wrap gap-3"><a href="https://wa.me/" className="rounded-full bg-[#4c1d67] px-6 py-3 text-sm font-semibold text-white">WhatsApp us</a><a href="https://www.instagram.com/serenitywearrsa/" target="_blank" rel="noreferrer" className="rounded-full border border-[#4c1d67]/20 px-6 py-3 text-sm font-semibold text-[#4c1d67]">Instagram</a></div></div><div className="grid gap-3 sm:grid-cols-2">{[
        ["WhatsApp","Queries & customer support","https://wa.me/"],["Instagram","@serenitywearrsa","https://www.instagram.com/serenitywearrsa/"],["Facebook","Serenity Wears","#"],["TikTok","@serenitywearrsa","#"]
      ].map(([t,d,h]) => <a key={t} href={h} target={h.startsWith("http") ? "_blank" : undefined} rel={h.startsWith("http") ? "noreferrer" : undefined} className="rounded-2xl border border-[#eadff0] bg-[#fcf8ff] p-6 hover:border-[#c9a7d4]"><p className="font-serif text-xl text-[#3f1655]">{t}</p><p className="mt-2 text-sm text-[#77677c]">{d}</p></a>)}</div></div></div></section>

      <footer className="bg-[#25122d] px-5 py-12 text-white/65"><div className="mx-auto flex max-w-7xl flex-col gap-7 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-serif text-2xl text-white">Serenity Wears</p><p className="mt-1 text-sm">Your Beauty, Our Peace.</p></div><div className="flex flex-wrap items-center gap-5 text-sm"><a href="https://www.instagram.com/serenitywearrsa/" target="_blank" rel="noreferrer"><Instagram size={19}/></a><a href="https://wa.me/">WhatsApp</a><a href="#">Facebook</a><a href="#">TikTok</a><a href="/policies">Policies</a></div><p className="text-xs">© {new Date().getFullYear()} Serenity Wears</p></div></footer>

      {quickView && <div className="fixed inset-0 z-[80] flex items-end justify-center bg-[#1f1025]/55 p-0 sm:items-center sm:p-6"><div className="max-h-[92vh] w-full max-w-4xl overflow-y-auto bg-white shadow-2xl sm:grid sm:grid-cols-2"><div className="relative aspect-[3/4] sm:aspect-auto sm:min-h-[620px]"><img src={quickView.image} alt={quickView.name} className="h-full w-full object-cover"/><button onClick={() => setQuickView(null)} className="absolute right-4 top-4 rounded-full bg-white p-2.5"><X size={19}/></button></div><div className="p-7 sm:p-10"><p className="text-xs font-bold uppercase tracking-[0.25em] text-[#8a4ba4]">{quickView.category}</p><h2 className="mt-3 font-serif text-4xl text-[#32133f]">{quickView.name}</h2><p className="mt-3 text-xl font-semibold text-[#4c1d67]">{money(quickView.price)} {quickView.oldPrice && <span className="ml-2 text-sm font-normal text-[#9b899f] line-through">{money(quickView.oldPrice)}</span>}</p><p className="mt-6 leading-7 text-[#6f6073]">{quickView.description}</p><div className="mt-8"><div className="flex items-center justify-between"><p className="text-sm font-semibold">Size</p><button onClick={() => setSizeGuideOpen(true)} className="text-xs font-semibold text-[#6b2b83] underline">Size guide</button></div><div className="mt-3 grid grid-cols-5 gap-2">{quickView.sizes.map(s => <button key={s} onClick={() => setSelectedSize(s)} className={"border py-3 text-xs font-semibold " + (selectedSize === s ? "border-[#4c1d67] bg-[#4c1d67] text-white" : "border-[#d9c8e0]")}>{s}</button>)}</div></div><button onClick={() => addToCart(quickView)} disabled={quickView.soldOut} className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-[#4c1d67] py-4 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-[#aaa]"><ShoppingBag size={18}/> {quickView.soldOut ? "Sold out" : "Add to bag"}</button></div></div></div>}

      {cartOpen && <div className="fixed inset-0 z-[90] bg-[#1f1025]/45"><div className="ml-auto flex h-full w-full max-w-lg flex-col bg-white shadow-2xl"><div className="flex items-center justify-between border-b border-[#eadff0] px-6 py-5"><div><p className="text-xs uppercase tracking-[0.25em] text-[#9565ad]">Your bag</p><h2 className="font-serif text-2xl text-[#32133f]">{cartCount} {cartCount === 1 ? "item" : "items"}</h2></div><button onClick={() => setCartOpen(false)}><X/></button></div><div className="flex-1 overflow-y-auto px-6 py-5">{cart.length === 0 ? <div className="flex h-full flex-col items-center justify-center text-center"><ShoppingBag size={40} className="text-[#c2a9cb]"/><h3 className="mt-5 font-serif text-2xl">Your bag is empty</h3><p className="mt-2 text-sm text-[#77677c]">Add a few Serenity pieces and they will appear here.</p></div> : <div className="space-y-5">{cart.map(i => <div key={i.id + "-" + i.size} className="flex gap-4 border-b border-[#eee6f1] pb-5"><img src={i.image} alt={i.name} className="h-28 w-24 object-cover"/><div className="min-w-0 flex-1"><div className="flex justify-between gap-3"><div><h3 className="font-serif text-lg">{i.name}</h3><p className="mt-1 text-xs text-[#77677c]">Size: {i.size}</p></div><button onClick={() => changeQty(i.id,i.size,-i.quantity)}><Trash2 size={16}/></button></div><p className="mt-2 text-sm font-semibold">{money(i.price)}</p><div className="mt-3 flex w-fit items-center border border-[#decfe5]"><button className="p-2" onClick={() => changeQty(i.id,i.size,-1)}><Minus size={13}/></button><span className="w-8 text-center text-xs">{i.quantity}</span><button className="p-2" onClick={() => changeQty(i.id,i.size,1)}><Plus size={13}/></button></div></div></div>)}</div>}</div>{cart.length > 0 && <div className="border-t border-[#eadff0] bg-[#fcf8ff] px-6 py-6"><div className="mb-4 flex gap-2"><input value={promo} onChange={e => setPromo(e.target.value)} placeholder="Promo code" className="min-w-0 flex-1 rounded-full border border-[#d9c8e0] bg-white px-4 py-3 text-xs outline-none"/><button onClick={applyPromo} className="rounded-full border border-[#4c1d67] px-4 py-3 text-xs font-semibold text-[#4c1d67]">Apply</button></div>{promoMessage && <p className="mb-3 text-xs text-[#6b2b83]">{promoMessage}</p>}<div className="space-y-2 text-sm"><div className="flex justify-between"><span>Subtotal</span><span>{money(subtotal)}</span></div><div className="flex justify-between"><span>Delivery</span><span>{shipping === 0 ? "FREE" : money(shipping)}</span></div>{discount > 0 && <div className="flex justify-between text-[#6b2b83]"><span>Promo discount</span><span>-{money(discount)}</span></div>}<div className="flex justify-between border-t border-[#e4d7e8] pt-3 text-base font-bold"><span>Total</span><span>{money(total)}</span></div></div><button onClick={() => {setCartOpen(false);setCheckoutOpen(true)}} className="mt-5 w-full rounded-full bg-[#4c1d67] py-4 text-sm font-semibold text-white">Checkout</button></div>}</div></div>}

      {wishlistOpen && <div className="fixed inset-0 z-[95] bg-[#1f1025]/45" onClick={() => setWishlistOpen(false)}><div className="ml-auto h-full w-full max-w-md bg-white p-6 shadow-2xl" onClick={e => e.stopPropagation()}><div className="flex items-center justify-between border-b border-[#eadff0] pb-5"><div><p className="text-xs uppercase tracking-[0.25em] text-[#9565ad]">Saved pieces</p><h2 className="font-serif text-2xl text-[#32133f]">Wishlist</h2></div><button onClick={() => setWishlistOpen(false)}><X/></button></div>{wishlistProducts.length === 0 ? <div className="flex h-[70vh] items-center justify-center text-center"><div><Heart size={38} className="mx-auto text-[#c2a9cb]"/><p className="mt-4 font-serif text-2xl">Nothing saved yet</p><p className="mt-2 text-sm text-[#77677c]">Tap the heart on any piece to save it.</p></div></div> : <div className="mt-6 space-y-4">{wishlistProducts.map(p => <button key={p.id} onClick={() => {setWishlistOpen(false);openProduct(p)}} className="flex w-full gap-4 border-b border-[#eee6f1] pb-4 text-left"><img src={p.image} alt={p.name} className="h-28 w-24 object-cover"/><div><p className="font-serif text-xl">{p.name}</p><p className="mt-1 text-sm font-semibold">{money(p.price)}</p><p className="mt-3 text-xs text-[#6b2b83]">View product →</p></div></button>)}</div>}</div></div>}

      {sizeGuideOpen && <div className="fixed inset-0 z-[110] flex items-center justify-center bg-[#1f1025]/55 p-5"><div className="w-full max-w-2xl bg-white p-6 shadow-2xl sm:p-9"><div className="flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.25em] text-[#9565ad]">Demo measurements</p><h2 className="mt-2 font-serif text-3xl text-[#32133f]">Serenity size guide</h2><p className="mt-2 text-sm text-[#77677c]">Placeholder measurements for the demo. Your real size chart will replace these before launch.</p></div><button onClick={() => setSizeGuideOpen(false)}><X/></button></div><div className="mt-7 overflow-hidden rounded-xl border border-[#eadff0]"><div className="grid grid-cols-4 bg-[#f7eff9] text-xs font-bold"><div className="p-3">Size</div><div className="p-3">Bust</div><div className="p-3">Waist</div><div className="p-3">Hips</div></div>{[["XS","82–86 cm","64–68 cm","88–92 cm"],["S","87–91 cm","69–73 cm","93–97 cm"],["M","92–96 cm","74–78 cm","98–102 cm"],["L","97–102 cm","79–84 cm","103–108 cm"],["XL","103–109 cm","85–91 cm","109–115 cm"]].map(row => <div key={row[0]} className="grid grid-cols-4 border-t border-[#eadff0] text-sm">{row.map((cell,i)=><div key={i} className="p-3">{cell}</div>)}</div>)}</div><p className="mt-5 text-xs leading-5 text-[#77677c]">Tip: measure over light clothing and compare with your usual fit. Exact garment measurements and fit notes will be added per product later.</p></div></div>}

      {checkoutOpen && <div className="fixed inset-0 z-[100] overflow-y-auto bg-[#fcf8ff]"><div className="mx-auto max-w-6xl px-5 py-7 sm:px-8"><div className="flex items-center justify-between border-b border-[#eadff0] pb-5"><button onClick={() => setCheckoutOpen(false)} className="text-sm font-semibold text-[#5b2475]">← Back to bag</button><span className="font-serif text-xl text-[#3f1655]">Serenity Wears</span><span className="text-xs text-[#77677c]">Checkout</span></div><div className="grid gap-10 py-10 lg:grid-cols-[1.1fr_.9fr]"><form className="space-y-7" onSubmit={e => {e.preventDefault();alert("The checkout experience is ready. A payment provider still needs to be connected before real card payments can be processed.")}}><div><p className="text-xs font-bold uppercase tracking-[0.25em] text-[#9565ad]">01 · Delivery details</p><h1 className="mt-2 font-serif text-3xl text-[#32133f]">Where should we send your order?</h1></div><div className="grid gap-4 sm:grid-cols-2">{["First name","Last name","Email address","Phone number","Address","Suburb","City","Postal code"].map(label => <label key={label} className="text-xs font-semibold text-[#5d4964]">{label}<input required className="mt-2 w-full border border-[#d9c8e0] bg-white px-4 py-3 text-sm outline-none focus:border-[#6b2b83]"/></label>)}</div><div className="border-t border-[#eadff0] pt-7"><p className="text-xs font-bold uppercase tracking-[0.25em] text-[#9565ad]">02 · Payment</p><h2 className="mt-2 font-serif text-3xl text-[#32133f]">Pay securely</h2><div className="mt-5 rounded-2xl border border-[#d9c8e0] bg-white p-5"><p className="text-sm font-semibold">Online card payment</p><p className="mt-1 text-xs leading-5 text-[#77677c]">Demo checkout for now. A secure payment gateway will be connected before launch. Serenity Wears currently delivers by courier within South Africa.</p></div><button className="mt-5 w-full rounded-full bg-[#4c1d67] py-4 text-sm font-semibold text-white">Continue to secure payment · {money(total)}</button></div></form><aside className="h-fit bg-white p-6 shadow-sm ring-1 ring-[#eadff0]"><p className="text-xs font-bold uppercase tracking-[0.25em] text-[#9565ad]">Order summary</p>{cart.map(i => <div key={i.id + "-summary"} className="mt-5 flex gap-4"><img src={i.image} alt={i.name} className="h-24 w-20 object-cover"/><div><p className="font-serif text-lg">{i.name}</p><p className="mt-1 text-xs text-[#77677c]">Size {i.size} · Qty {i.quantity}</p><p className="mt-2 text-sm font-semibold">{money(i.price*i.quantity)}</p></div></div>)}<div className="mt-7 space-y-2 border-t border-[#eadff0] pt-5 text-sm"><div className="flex justify-between"><span>Subtotal</span><span>{money(subtotal)}</span></div><div className="flex justify-between"><span>Delivery</span><span>{shipping === 0 ? "FREE" : money(shipping)}</span></div><div className="flex justify-between border-t border-[#eadff0] pt-3 text-base font-bold"><span>Total</span><span>{money(total)}</span></div></div></aside></div></div></div>}
    </main>
  );
}
