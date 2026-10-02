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

      <section id="collection" className="scroll-mt-20 bg-[#fffaf6]">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:py-28">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9c7459]">The Serenity Collection</p>
            <h2 className="mt-3 font-serif text-4xl sm:text-5xl">Find your signature look.</h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#6e5b52]">
              Explore our curated edit of feminine, African-inspired fashion. New pieces are shared regularly on our Instagram.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {["All Styles", "Statement", "Occasion", "Everyday"].map((category, index) => (
              <a
                key={category}
                href="https://www.instagram.com/serenitywearrsa/"
                target="_blank"
                rel="noreferrer"
                className={index === 0
                  ? "rounded-full bg-[#30231e] px-5 py-2.5 text-xs font-semibold text-white"
                  : "rounded-full border border-[#30231e]/15 bg-white px-5 py-2.5 text-xs font-semibold text-[#5f4b42] transition hover:border-[#9c7459] hover:text-[#9c7459]"}
              >
                {category}
              </a>
            ))}
          </div>

          <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Statement Looks", "Bold pieces designed to make an entrance.", "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1200&q=85"],
              ["Occasion Wear", "Elegant silhouettes for your special moments.", "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1200&q=85"],
              ["Everyday Edit", "Effortless styles you can make your own.", "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=85"],
              ["African-Inspired", "Celebrating print, detail, culture and femininity.", "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=85"],
              ["New Arrivals", "Fresh pieces and looks from the latest drop.", "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=1200&q=85"],
              ["Serenity Favourites", "Pieces selected to become wardrobe staples.", "https://images.unsplash.com/photo-1550639525-c97d455acf70?auto=format&fit=crop&w=1200&q=85"],
            ].map(([title, description, image]) => (
              <a
                key={title}
                href="https://www.instagram.com/serenitywearrsa/"
                target="_blank"
                rel="noreferrer"
                className="group overflow-hidden rounded-[1.75rem] bg-white shadow-sm ring-1 ring-[#30231e]/5 transition duration-500 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="aspect-[4/5] overflow-hidden bg-[#e8ddd4]">
                  <div
                    className="h-full w-full bg-cover bg-center transition duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url("${image}")` }}
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-serif text-2xl text-[#30231e]">{title}</h3>
                      <p className="mt-2 text-sm leading-6 text-[#6e5b52]">{description}</p>
                    </div>
                    <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#30231e]/10 text-lg text-[#9c7459] transition group-hover:bg-[#30231e] group-hover:text-white">
                      ↗
                    </span>
                  </div>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#9c7459]">View on Instagram</p>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-12 rounded-[2rem] bg-[#30231e] px-7 py-10 text-center text-white sm:px-12">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#e8c9aa]">Shopping made personal</p>
            <h3 className="mt-3 font-serif text-3xl sm:text-4xl">See a piece you love?</h3>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/70">
              Send us a DM on Instagram to ask about availability, sizing, pricing and delivery. We are happy to help you find your perfect look.
            </p>
            <a
              href="https://www.instagram.com/serenitywearrsa/"
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex rounded-full bg-[#f4dfcc] px-7 py-3.5 text-sm font-semibold text-[#30231e] transition hover:bg-white"
            >
              Browse & Shop on Instagram
            </a>
          </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-20 overflow-hidden bg-[#30231e] text-white">
        <div className="mx-auto grid max-w-7xl items-stretch lg:grid-cols-2">
          <div className="relative min-h-[560px] overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center transition duration-700 hover:scale-105"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1400&q=85')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#201815]/80 via-transparent to-[#201815]/10" />
            <div className="absolute bottom-8 left-8 right-8 sm:left-12 sm:right-12">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#e8c9aa]">Serenity Wears</p>
              <p className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">Beauty, confidence &amp; culture.</p>
            </div>
          </div>

          <div className="flex flex-col justify-center px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#e8c9aa]">Our Story</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
              Where style meets serenity.
            </h2>

            <p className="mt-7 leading-8 text-white/75">
              Serenity Wears was created from a love for beautiful clothing and the feeling that comes with finding a look that truly feels like you. We believe fashion should be more than what you wear — it should be an expression of your beauty, confidence and individuality.
            </p>

            <p className="mt-5 leading-8 text-white/75">
              Our collection brings together feminine silhouettes, African-inspired details and timeless pieces for women who want to feel elegant, comfortable and effortlessly themselves.
            </p>

            <div className="mt-10 grid gap-6 border-y border-white/10 py-8 sm:grid-cols-3">
              {[
                ["01", "Confidence", "Wear what makes you feel beautiful."],
                ["02", "Culture", "Celebrate style with meaning and identity."],
                ["03", "Serenity", "Feel good in every piece you choose."],
              ].map(([number, title, text]) => (
                <div key={number}>
                  <p className="text-xs tracking-[0.25em] text-[#e8c9aa]">{number}</p>
                  <h3 className="mt-2 font-serif text-xl">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/55">{text}</p>
                </div>
              ))}
            </div>

            <a
              href="https://www.instagram.com/serenitywearrsa/"
              target="_blank"
              rel="noreferrer"
              className="mt-9 inline-flex w-fit rounded-full border border-[#e8c9aa]/60 px-7 py-3.5 text-sm font-semibold text-[#f4dfcc] transition hover:bg-[#e8c9aa] hover:text-[#30231e]"
            >
              Discover Serenity Wears
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 bg-[#201815]">
          <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 text-center sm:px-10 md:grid-cols-3">
            {[
              ["Thoughtfully Curated", "Pieces selected with elegance and individuality in mind."],
              ["Personal Experience", "We are here to help you find a look that feels like you."],
              ["Made for Her", "Fashion that celebrates the woman you are becoming."],
            ].map(([title, text]) => (
              <div key={title}>
                <h3 className="font-serif text-xl text-[#f4dfcc]">{title}</h3>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-white/55">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-20 bg-[#f1e4d9]">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9c7459]">Order &amp; Enquiries</p>
              <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
                Your next beautiful look starts here.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-[#6e5b52]">
                Seen something you love? Reach out to us for availability, sizing, pricing and delivery information. We are happy to make your Serenity Wears experience personal.
              </p>

              <div className="mt-9 flex flex-wrap gap-4">
                <a
                  href="https://www.instagram.com/serenitywearrsa/"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-[#30231e] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#46342c]"
                >
                  Shop on Instagram
                </a>
                <a
                  href="#contact"
                  className="rounded-full border border-[#30231e]/20 bg-white/60 px-7 py-3.5 text-sm font-semibold text-[#30231e] transition hover:bg-white"
                >
                  Make an Enquiry
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] bg-white/75 p-7 shadow-sm ring-1 ring-[#30231e]/5 sm:p-9">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9c7459]">How to order</p>
              <div className="mt-7 space-y-6">
                {[
                  ["01", "Browse", "Explore our latest pieces on Instagram and find a look you love."],
                  ["02", "Message us", "Send us a DM with the item you are interested in and any questions you have."],
                  ["03", "We assist you", "We will help with availability, sizing, pricing, delivery and the next steps."],
                ].map(([number, title, text]) => (
                  <div key={number} className="flex gap-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f1e4d9] text-xs font-semibold tracking-widest text-[#9c7459]">
                      {number}
                    </div>
                    <div>
                      <h3 className="font-serif text-xl text-[#30231e]">{title}</h3>
                      <p className="mt-1 text-sm leading-6 text-[#6e5b52]">{text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 border-t border-[#30231e]/10 pt-7">
                <div className="grid gap-3 sm:grid-cols-2">
                  <a
                    href="https://www.instagram.com/serenitywearrsa/"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-2xl bg-[#30231e] px-5 py-4 text-center text-sm font-semibold text-white transition hover:bg-[#46342c]"
                  >
                    Instagram
                    <span className="mt-1 block text-xs font-normal text-white/60">@serenitywearrsa</span>
                  </a>
                  <div className="rounded-2xl border border-[#30231e]/10 bg-[#f8f3ee] px-5 py-4 text-center">
                    <p className="text-sm font-semibold text-[#30231e]">WhatsApp</p>
                    <p className="mt-1 text-xs text-[#6e5b52]">Contact details coming soon</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-4 border-t border-[#30231e]/10 pt-10 text-center sm:grid-cols-3">
            {[
              ["Delivery", "Ask us about delivery options available for your order."],
              ["Appointments", "Prefer a personal experience? Contact us to arrange an appointment."],
              ["Personal Service", "We are here to help you choose something that feels like you."],
            ].map(([title, text]) => (
              <div key={title} className="px-4">
                <h3 className="font-serif text-xl text-[#30231e]">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#6e5b52]">{text}</p>
              </div>
            ))}
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
