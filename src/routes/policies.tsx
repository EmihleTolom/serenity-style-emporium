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
  {
    title: "Delivery & Shipping",
    body: [
      "Serenity Wears currently offers courier delivery within South Africa. We do not currently offer customer collection.",
      "Any delivery fee and available delivery information will be shown to you before you confirm an order. Please review these details at checkout before making payment.",
      "Orders are prepared for dispatch after payment has been successfully confirmed. Delivery estimates, where provided, are estimates and may be affected by courier operations, public holidays, weather, service interruptions or circumstances outside our control.",
      "Please provide a complete and accurate delivery address, contact number and any access instructions when placing an order. Customers should make arrangements to receive the parcel at the supplied address.",
      "If your parcel appears delayed, has not arrived within the communicated estimate, or arrives damaged, please contact serenitywearsrsa@gmail.com with your order number so that we can assist.",
      "Delivery arrangements, fees and estimated timeframes must be confirmed on the website before an order is placed. Where no specific delivery period has been agreed, delivery will be handled in accordance with applicable South African consumer-protection law.",
    ],
  },
  {
    title: "Privacy & Personal Information",
    body: [
      "Serenity Wears respects your privacy and aims to handle personal information responsibly in accordance with the Protection of Personal Information Act 4 of 2013 (POPIA), where applicable.",
      "When you enquire or place an order, we may collect information such as your name, email address, telephone number, delivery address, order details and communications with us. We use this information to respond to enquiries, process and deliver orders, provide customer support, manage returns and refunds, and meet applicable legal or record-keeping obligations.",
      "We only intend to use personal information for the purposes for which it was collected or for another lawful and compatible purpose. We do not sell customers' personal information.",
      "Information may be shared with service providers where reasonably necessary to operate the store and fulfil an order, such as courier companies, website hosting providers and payment service providers. These providers may process information on our behalf or independently under their own terms and privacy notices.",
      "When online payments are enabled, payment details will be handled through the payment service provider's secure payment process. Serenity Wears does not intend to collect or store full payment card numbers or card security codes on this website.",
      "We take reasonable steps to protect personal information against loss, unauthorised access, misuse or disclosure. Information is retained only for as long as reasonably necessary for the purposes described above or as required by law.",
      "You may contact us to ask about personal information we hold about you, request correction of inaccurate information, or raise a privacy concern. Some information may need to be retained where the law requires it.",
      "For privacy questions or requests, contact serenitywearsrsa@gmail.com.",
    ],
  },
  {
    title: "Customer Support & Business Information",
    body: [
      "For order enquiries, product questions, delivery assistance, returns, exchanges or privacy requests, contact Serenity Wears at serenitywearsrsa@gmail.com.",
      "Serenity Wears is based in Gqeberha, Eastern Cape, South Africa. Customer support is provided through the contact details published on this website.",
    ],
  },
  {
    title: "Website & Payment Notice",
    body: [
      "Product availability, prices, descriptions and images are displayed to help customers make an informed choice. Please check the product information and order summary before placing an order.",
      "Online payment functionality is still being prepared. Until a secure payment option is visibly enabled and a payment confirmation is provided, this website should not be treated as accepting live online payments.",
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
        <h1 className="mt-3 font-serif text-5xl font-semibold tracking-[-0.04em] text-[#32133f]">Store Policies</h1>
        <p className="mt-5 max-w-2xl leading-7 text-[#6f6073]">
          Please read these policies before placing an order. They explain how returns, delivery, personal information and customer support are handled at Serenity Wears.
        </p>
        <nav aria-label="Policy sections" className="mt-8 flex flex-wrap gap-2">
          {["Returns & Exchange", "Delivery & Shipping", "Privacy & Personal Information", "Customer Support & Business Information"].map(title => (
            <a key={title} href={"#"+title.toLowerCase().replaceAll(" ", "-").replaceAll("&", "and")} className="rounded-full border border-[#decfe5] bg-white px-4 py-2 text-xs font-semibold text-[#5b2475] hover:bg-[#f7eff9]">{title}</a>
          ))}
        </nav>
        <div className="mt-10 space-y-5">
          {sections.map(section => (
            <section key={section.title} id={section.title.toLowerCase().replaceAll(" ", "-").replaceAll("&", "and")} className="scroll-mt-8 bg-white p-7 shadow-sm ring-1 ring-[#eadff0] sm:p-9">
              <h2 className="font-serif text-2xl font-semibold tracking-[-0.02em] text-[#32133f]">{section.title}</h2>
              <div className="mt-4 space-y-3 text-sm leading-7 text-[#66586b]">
                {section.body.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
              </div>
            </section>
          ))}
        </div>
        <p className="mt-10 text-xs leading-5 text-[#89798e]">
          These policies are a working business draft and should be checked against Serenity Wears' actual delivery arrangements, data practices and applicable South African law before the store accepts live orders.
        </p>
      </div>
    </main>
  );
}
