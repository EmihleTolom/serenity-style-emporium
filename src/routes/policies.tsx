import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/policies")({
  component: Policies,
});

const sections = [
  {
    title: "Returns Policy",
    body: [
      "We want you to love your Serenity Wears purchase. If an item arrives damaged, defective, incorrect, or materially different from what was ordered, please contact us as soon as possible after delivery with your order number and clear photographs of the issue.",
      "Items that are simply unwanted, incorrectly selected, or no longer needed may only be returned where permitted by the applicable consumer law and the specific terms communicated for that product or promotion. Items must be unused, unworn, unwashed, and returned with original tags and packaging where applicable.",
      "For hygiene-sensitive accessories or items that cannot reasonably be resold for health or hygiene reasons, returns may be excluded unless the item is defective or incorrect.",
      "Return requests are reviewed before a return is authorised. Customers are responsible for following the return instructions provided by Serenity Wears.",
    ],
  },
  {
    title: "Exchange Policy",
    body: [
      "Where an eligible item does not fit, customers may request an exchange for another available size, subject to stock availability and the applicable return conditions.",
      "Exchanges are not guaranteed where the requested replacement size or product is unavailable. In that case, Serenity Wears will discuss the available resolution with the customer.",
      "Items must be unworn, unwashed, undamaged, and returned with original tags and packaging where applicable.",
    ],
  },
  {
    title: "Refund Policy",
    body: [
      "Serenity Wears does not offer refunds for change-of-mind purchases unless required by applicable law.",
      "A refund may be considered where a product is confirmed to have a material defect, was damaged before delivery, or the wrong product was supplied, subject to review and applicable consumer-protection requirements.",
      "Where a refund is approved, it will normally be processed to the original payment method. Processing times may depend on the payment provider or financial institution.",
      "Nothing in this policy is intended to remove or limit any consumer right that cannot legally be excluded.",
    ],
  },
  {
    title: "Shipping & Delivery Policy",
    body: [
      "Serenity Wears currently delivers within South Africa using courier delivery. We do not offer collection at this time.",
      "Delivery fees, free-delivery thresholds, courier partners, and estimated delivery times shown at checkout are demo values until the business confirms its final shipping arrangements.",
      "Once your order has been dispatched, you may receive tracking or delivery information where available.",
      "Delivery times are estimates and can be affected by courier delays, public holidays, weather, incorrect address details, or other circumstances outside Serenity Wears' reasonable control.",
      "Customers are responsible for providing accurate delivery information. Additional charges or delays caused by an incorrect or incomplete address may apply where permitted.",
    ],
  },
  {
    title: "Order Cancellation Policy",
    body: [
      "Customers may request cancellation as soon as possible after placing an order. A cancellation can only be accepted before the order has entered fulfilment or been handed to the courier.",
      "Once an order has been dispatched, cancellation may no longer be possible and the normal returns process will apply.",
      "If a cancellation is accepted and a payment has already been captured, any applicable refund will be processed according to the refund policy and payment provider timelines.",
    ],
  },
  {
    title: "Payment Policy",
    body: [
      "Online orders will be paid through the secure payment gateway connected to the Serenity Wears website.",
      "Payment is considered successful only after the payment provider confirms the transaction. A payment attempt that fails, expires, or is reversed does not constitute a completed order.",
      "Serenity Wears will not ask customers to send card numbers, CVV numbers, passwords, or payment PINs through WhatsApp, Instagram, or ordinary email.",
    ],
  },
  {
    title: "Privacy Policy",
    body: [
      "Serenity Wears collects information needed to process orders, provide customer support, deliver products, communicate about orders, and operate the website.",
      "Depending on the customer's interaction with the website, this may include name, contact details, delivery address, order information, and information supplied when contacting customer support.",
      "Payment card details should be handled by the selected payment provider rather than stored directly by Serenity Wears unless a lawful and appropriately secured payment architecture requires otherwise.",
      "Personal information will be handled in accordance with applicable South African privacy and consumer-protection requirements. Where required, customers may request access to, correction of, or deletion of personal information, subject to legal and operational requirements.",
      "The final privacy notice will be updated with the business's registered details, responsible party/contact details, retention periods, cookie/analytics practices, and any third parties that process customer information before launch.",
    ],
  },
  {
    title: "Terms of Use",
    body: [
      "By using the Serenity Wears website, customers agree to use the website lawfully and not to interfere with its operation, attempt unauthorised access, or misuse website content.",
      "Product images, descriptions, branding, logos, written content, and other original website materials belong to Serenity Wears or are used with permission and may not be reproduced commercially without permission.",
      "Prices, product availability, promotions, and delivery information may change. The final order total shown at checkout will be the applicable amount for that order, subject to correction of manifest errors and applicable law.",
      "These website terms are intended as a business draft and should be reviewed and finalised with the business's legal adviser before launch.",
    ],
  },
];

function Policies() {
  return (
    <main className="min-h-screen bg-[#fcf8ff] text-[#261b2d]">
      <header className="border-b border-[#eadff0] bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-6 sm:px-8">
          <a href="/" className="font-serif text-2xl text-[#3f1655]">Serenity Wears</a>
          <a href="/" className="text-sm font-semibold text-[#5b2475]">Back to shop</a>
        </div>
      </header>
      <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8 lg:py-20">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#8a4ba4]">Customer care</p>
        <h1 className="mt-3 font-serif text-5xl text-[#32133f]">Policies</h1>
        <p className="mt-5 max-w-2xl leading-7 text-[#6f6073]">
          Draft customer policies for the Serenity Wears online store. These are prepared as a launch draft and should be reviewed against the business's final operations and applicable South African law before publication.
        </p>
        <div className="mt-12 space-y-5">
          {sections.map(section => (
            <section key={section.title} className="bg-white p-7 shadow-sm ring-1 ring-[#eadff0] sm:p-9">
              <h2 className="font-serif text-2xl text-[#32133f]">{section.title}</h2>
              <div className="mt-4 space-y-3 text-sm leading-7 text-[#66586b]">
                {section.body.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
              </div>
            </section>
          ))}
        </div>
        <p className="mt-10 text-xs leading-5 text-[#89798e]">
          Drafting note: this page is not legal advice. Before launch, replace demo shipping/payment details and add the business's legal name, contact details, registered information where applicable, effective date, and any specific rules agreed with the courier and payment provider.
        </p>
      </div>
    </main>
  );
}
