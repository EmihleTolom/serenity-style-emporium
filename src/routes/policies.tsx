import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/policies")({
  component: Policies,
});

const sections = [
  {
    title: "Returns & Exchange",
    body: [
      "At Serenity Wears, we want you to feel confident and happy with your purchase. If your order isn't quite right, we're happy to assist with an eligible return or exchange.",
    ],
  },
  {
    title: "Return Period",
    body: [
      "Items may be returned within 7 days of delivery.",
      "To be eligible for a return, items must be unworn and unused, be in their original condition, have all original tags attached, be returned in the original packaging where applicable, and have no makeup, perfume, stains, damage, or other signs of wear.",
    ],
  },
  {
    title: "Items We Cannot Accept",
    body: [
      "For hygiene and safety reasons, certain items may not be eligible for return, including underwear and intimate items, swimwear where the hygiene seal has been removed, earrings, and items marked as Final Sale.",
    ],
  },
  {
    title: "Exchanges",
    body: [
      "If you would like to exchange an item for another size or eligible item, please contact us within 7 days of delivery.",
      "Exchanges are subject to availability. If the requested item is unavailable, you may be offered an alternative or store credit.",
    ],
  },
  {
    title: "Sale Items",
    body: [
      "Items purchased on sale may be exchange-only or final sale, depending on the promotion. Please check the product description before purchasing.",
    ],
  },
  {
    title: "Return Shipping",
    body: [
      "Customers are responsible for the cost of returning an item unless the item received was incorrect, damaged, or faulty.",
      "We recommend using a tracked delivery service, as Serenity Wears cannot be held responsible for parcels lost while being returned to us.",
    ],
  },
  {
    title: "Refunds",
    body: [
      "Once your return has been received and inspected, we will notify you whether your return has been approved.",
      "Approved refunds will be processed to the original payment method. Please allow additional processing time depending on your bank or payment provider.",
    ],
  },
  {
    title: "Faulty or Incorrect Item",
    body: [
      "If you receive an incorrect, damaged, or faulty item, please contact us as soon as possible with your order number and photographs of the item.",
      "We will assess the issue and assist with a replacement, exchange, or refund where applicable.",
    ],
  },
  {
    title: "How to Start a Return",
    body: [
      "To request a return or exchange, please contact us at serenitywearsrsa@gmail.com with your order number, the item(s) you wish to return, the reason for the return, and photographs where applicable.",
      "We'll provide you with the next steps.",
    ],
  },
];

function Policies() {
  return (
    <main className="min-h-screen bg-[#fcf8ff] text-[#261b2d]">
      <header className="border-b border-[#eadff0] bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-6 sm:px-8">
          <a href="/" className="font-serif text-2xl font-semibold tracking-[-0.03em] text-[#3f1655]">Serenity Wears</a>
          <a href="/" className="text-sm font-semibold tracking-wide text-[#5b2475]">Back to shop</a>
        </div>
      </header>
      <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8 lg:py-20">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#8a4ba4]">Customer care</p>
        <h1 className="mt-3 font-serif text-5xl font-semibold tracking-[-0.04em] text-[#32133f]">Returns & Exchange</h1>
        <p className="mt-5 max-w-2xl leading-7 text-[#6f6073]">
          Our returns and exchange policy is designed to make your Serenity Wears shopping experience simple and transparent.
        </p>
        <div className="mt-12 space-y-5">
          {sections.map(section => (
            <section key={section.title} className="bg-white p-7 shadow-sm ring-1 ring-[#eadff0] sm:p-9">
              <h2 className="font-serif text-2xl font-semibold tracking-[-0.02em] text-[#32133f]">{section.title}</h2>
              <div className="mt-4 space-y-3 text-sm leading-7 text-[#66586b]">
                {section.body.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
              </div>
            </section>
          ))}
        </div>
        <p className="mt-10 text-xs leading-5 text-[#89798e]">
          This policy should be reviewed against applicable South African consumer-protection requirements and the business's final operating procedures before launch.
        </p>
      </div>
    </main>
  );
}
