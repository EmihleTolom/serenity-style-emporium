import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="min-h-screen bg-[#f8f3ee] text-[#2c211d]">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#201815]/90 text-white shadow-lg backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-10 lg:px-16">
          <a href="/" onClick={closeMenu} className="group">
            <span className="font-serif text-2xl tracking-wide transition group-hover:text-[#e8c9aa]">
              Serenity Wears
            </span>
            <span className="block text-[9px] uppercase tracking-[0.35em] text-[#e8c9aa]">
              Your Beauty, Our Peace.
            </span>
          </a>

          <div className="hidden items-center gap-9 md:flex">
            <a href="#home" className="text-sm font-medium transition hover:text-[#e8c9aa]">Home</a>
            <a href="#collection" className="text-sm font-medium transition hover:text-[#e8c9aa]">Collection</a>
            <a href="#about" className="text-sm font-medium transition hover:text-[#e8c9aa]">About</a>
            <a href="#contact" className="text-sm font-medium transition hover:text-[#e8c9aa]">Contact</a>
            <a
              href="https://www.instagram.com/serenitywearrsa/"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[#e8c9aa]/70 px-5 py-2.5 text-sm font-semibold text-[#f4dfcc] transition hover:bg-[#e8c9aa] hover:text-[#30231e]"
            >
              Shop
            </a>
          </div>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 md:hidden"
          >
            <span className="text-xl">{menuOpen ? "×" : "☰"}</span>
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-white/10 bg-[#201815] px-6 py-5 md:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-1">
              {[
                ["Home", "#home"],
                ["Collection", "#collection"],
                ["About", "#about"],
                ["Contact", "#contact"],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  onClick={closeMenu}
                  className="rounded-xl px-4 py-3 text-sm transition hover:bg-white/5 hover:text-[#e8c9aa]"
                >
                  {label}
                </a>
              ))}
              <a
                href="https://www.instagram.com/serenitywearrsa/"
                target="_blank"
                rel="noreferrer"
                className="mt-2 rounded-full bg-[#f4dfcc] px-5 py-3 text-center text-sm font-semibold text-[#30231e]"
              >
                Shop on Instagram
              </a>
            </div>
          </div>
        )}
      </nav>

      <section id="home" className="relative min-h-[92vh] scroll-mt-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(31,20,16,.78), rgba(31,20,16,.2)), url('https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=2000&q=85')",
          }}
        />
        <div className="relative mx-auto flex min-h-[92vh] max-w-7xl items-center px-6 py-24 pt-32 sm:px-10 lg:px-16">
          <div className="max-w-2xl text-white">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.35em] text-[#e8c9aa]">Serenity Wears</p>
            <h1 className="font-serif text-5xl leading-[1.02] sm:text-6xl lg:text-8xl">Your Beauty,<br />Our Peace.</h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-white/85 sm:text-lg">
              Discover elegant African-inspired fashion made for women who want to feel confident, beautiful and effortlessly refined.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a href="#collection" className="rounded-full bg-[#f4dfcc] px-7 py-3.5 text-sm font-semibold text-[#33231c] transition hover:bg-white">Explore the Collection</a>
              <a href="https://wa.me/" className="rounded-full border border-white/50 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10">Order via WhatsApp</a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#dfd2c7] bg-[#fffaf6]">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-8 text-center sm:grid-cols-3 sm:px-10">
          {[
            ["01", "Curated Style", "Thoughtfully selected pieces for your wardrobe."],
            ["02", "Made to Impress", "Elegant looks for everyday moments and occasions."],
            ["03", "Personal Service", "Order online or arrange a personal appointment."],
          ].map(([number, title, text]) => (
            <div key={number} className="px-4">
              <p className="text-xs tracking-[0.3em] text-[#9c7459]">{number}</p>
              <h2 className="mt-2 font-serif text-xl">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-[#6e5b52]">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="collection" className="mx-auto max-w-7xl scroll-mt-20 px-6 py-20 sm:px-10 lg:py-28">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9c7459]">The Serenity Edit</p>
            <h2 className="mt-3 font-serif text-4xl sm:text-5xl">Curated for confidence.</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-[#6e5b52]">From statement pieces to timeless essentials, find styles that celebrate femininity, culture and individuality.</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            ["Statement", "Bold silhouettes", "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1000&q=85"],
            ["Elegance", "Refined occasion wear", "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1000&q=85"],
            ["Everyday", "Effortless beauty", "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=85"],
          ].map(([title, subtitle, image]) => (
            <a href="https://www.instagram.com/serenitywearrsa/" key={title} className="group relative overflow-hidden rounded-[2rem] bg-[#e8ddd4]">
              <div className="aspect-[4/5] bg-cover bg-center transition duration-700 group-hover:scale-105" style={{ backgroundImage: `url("${image}")` }} />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-7 pt-24 text-white">
                <p className="text-xs uppercase tracking-[0.25em] text-white/70">{subtitle}</p>
                <h3 className="mt-1 font-serif text-3xl">{title}</h3>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section id="about" className="scroll-mt-20 bg-[#30231e] text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 sm:px-10 lg:grid-cols-2 lg:py-28">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#e8c9aa]">About Serenity Wears</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">Where style meets serenity.</h2>
            <p className="mt-6 max-w-xl leading-8 text-white/75">
              Serenity Wears is an African-inspired fashion boutique created for women who appreciate beautiful clothing, thoughtful details and the confidence that comes from feeling good in what you wear.
            </p>
            <p className="mt-4 max-w-xl leading-8 text-white/75">
              Whether you are dressing for a special occasion or simply choosing yourself today, every look is an invitation to embrace your beauty.
            </p>
            <a href="https://www.instagram.com/serenitywearrsa/" className="mt-8 inline-flex rounded-full border border-[#e8c9aa]/60 px-7 py-3.5 text-sm font-semibold text-[#f4dfcc] transition hover:bg-white/10">Visit us on Instagram</a>
          </div>
          <div className="min-h-[420px] rounded-[2rem] bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1550639525-c97d455acf70?auto=format&fit=crop&w=1200&q=85')" }} />
        </div>
      </section>

      <section id="contact" className="scroll-mt-20 bg-[#f1e4d9]">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center sm:px-10 lg:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9c7459]">Your next look awaits</p>
          <h2 className="mt-4 font-serif text-4xl sm:text-5xl">Ready to find your Serenity?</h2>
          <p className="mx-auto mt-5 max-w-2xl leading-7 text-[#6e5b52]">Browse our latest pieces, send us a message and let us help you find something that feels beautifully you.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href="https://www.instagram.com/serenitywearrsa/" className="rounded-full bg-[#30231e] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#46342c]">Shop on Instagram</a>
            <a href="https://wa.me/" className="rounded-full border border-[#30231e]/25 bg-white/50 px-7 py-3.5 text-sm font-semibold text-[#30231e] transition hover:bg-white">Chat on WhatsApp</a>
          </div>
        </div>
      </section>

      <footer className="bg-[#201815] px-6 py-10 text-center text-white/60">
        <p className="font-serif text-2xl text-white">Serenity Wears</p>
        <p className="mt-2 text-sm">Your Beauty, Our Peace.</p>
        <p className="mt-5 text-xs">© {new Date().getFullYear()} Serenity Wears. All rights reserved.</p>
      </footer>
    </main>
  );
}
