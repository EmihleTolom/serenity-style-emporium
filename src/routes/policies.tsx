import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/policies")({
  component: Policies,
});

const sections = [
  {
    title: "Returns & Exchanges",
    body: [
      "We want you to be happy with your Serenity Wears purchase. Please contact us before sending any item back so that we can guide you through the process.",
      "Change-of-mind and size exchanges: If you selected the wrong size or simply changed your mind, contact us within 7 calendar days after delivery. This is a voluntary exchange arrangement and does not limit any statutory cancellation or return right. Items must be unworn, unwashed and unused, with original tags attached and in their original condition and packaging. The item must not have stains, makeup, perfume, odours, damage or signs of wear. Exchanges are subject to stock availability.",
      "For a voluntary size exchange where the customer selected the wrong size, the customer is responsible for the reasonable cost of returning the item and the delivery cost of the replacement item. We will confirm the return method and any costs before the customer proceeds. If the requested size is unavailable, we will discuss available alternatives.",
      "Faulty, unsafe, damaged or incorrect items: Please notify us as soon as reasonably possible, preferably within 48 hours of delivery, and include your order number and clear photographs where relevant. The 48-hour request is to help us investigate delivery or packing issues; it does not reduce any rights you have under the Consumer Protection Act or other applicable law. Where the goods are defective or incorrectly supplied, we will arrange an appropriate remedy and bear costs where required by law.",
      "Statutory rights: Under section 56 of the Consumer Protection Act 68 of 2008, qualifying defective goods may be returned within six months of delivery, at the supplier's risk and expense, and the consumer may choose the applicable statutory remedy of repair, replacement or refund. A cooling-off right under section 44 of the Electronic Communications and Transactions Act 25 of 2002 may also apply to qualifying transactions, including certain direct-marketing transactions. Where it applies, the law governs the cancellation period and direct return costs.",
      "Sale items are subject to the same statutory consumer rights as other items. A sale label or store policy does not remove a customer's rights in respect of defective or incorrectly supplied goods.",
      "Refunds will be processed in accordance with the applicable legal right or agreed resolution. Where a refund is due, we will communicate the process and expected timing. Refund timing may depend on the payment provider or bank.",
      "To request a return or exchange, email serenitywearsrsa@gmail.com or WhatsApp 072 519 3126 with your order number, the item, the reason for the request and photographs where relevant. Please wait for our instructions before returning an item."
    ],
  },
  {
    title: "Delivery & Shipping",
    body: [
      "Serenity Wears offers delivery to residential and business addresses across South Africa through PAXI store-to-home courier delivery. The parcel is delivered to the address supplied by the customer; customers do not need to collect it from a PAXI point.",
      "We do not offer collection from the Serenity Wears premises. Please provide a complete and accurate delivery address, recipient name, mobile number, suburb, city and postal code, together with any useful access instructions.",
      "Current PAXI store-to-home delivery options: Standard bag (estimated 3–5 business days): R119.95. Large bag (estimated 3–5 business days): R149.95. The appropriate parcel size depends on the items and packaging. Delivery estimates are estimates and may be affected by courier operations, public holidays, weather or service interruptions.",
      "Delivery is FREE on orders over R1,500. For orders of R1,500 or less, the applicable standard or large bag delivery charge will be added and shown before the order is confirmed. If the order contents require a different parcel size, we will contact the customer before dispatch if the delivery charge needs to change.",
      "Orders are processed for dispatch after payment has been received and confirmed. Please ensure someone is available at the delivery address to receive the parcel. If delivery cannot be completed because the address or contact details supplied are incorrect or no recipient is available, additional delivery costs may apply where the courier charges them and where permitted by law.",
      "If a parcel is delayed, appears lost, or arrives damaged, contact us at serenitywearsrsa@gmail.com or WhatsApp 072 519 3126 with your order number so that we can assist with the courier."
    ],
  },
  {
    title: "Privacy & Personal Information",
    body: [
      "Serenity Wears aims to handle personal information responsibly and in accordance with the Protection of Personal Information Act 4 of 2013 (POPIA).",
      "When you place an order or contact us, we may collect your name, phone number, email address, delivery address, order details and communications with us. Customers can place an order without creating a website account.",
      "We use this information to respond to enquiries, process and deliver orders, communicate about an order, provide customer support, handle returns and refunds, prevent fraud and meet applicable legal and record-keeping obligations. At present, we intend to use customer contact details for order-related communications and customer service, not unsolicited promotional messages.",
      "We may share only the information reasonably needed with service providers involved in operating the website, processing payments or delivering orders, including courier and payment service providers. Those providers may also have their own privacy notices and terms.",
      "We do not sell customers' personal information. We take reasonable steps to protect personal information against loss, unauthorised access, misuse or disclosure and retain it only for as long as reasonably necessary or as required by law.",
      "You may contact us to ask about personal information we hold, request correction of inaccurate information or raise a privacy concern. Some records may need to be retained where the law requires it. For privacy requests, email serenitywearsrsa@gmail.com."
    ],
  },
  {
    title: "Appointments & In-Person Viewing",
    body: [
      "Customers in Gqeberha may request an appointment to view or try on selected clothing or to arrange an order collection by prior arrangement. Appointments must be booked in advance through WhatsApp on 072 519 3126.",
      "An additional appointment fee applies. The fee will be discussed with the customer when the appointment is arranged and must be communicated before the booking is confirmed.",
      "Serenity Wears operates from a private residential premises. For privacy and security, the exact address will only be shared after an appointment has been agreed and confirmed. Please do not arrive without an appointment.",
      "Appointment availability, the items available to view and any collection arrangement must be confirmed with Serenity Wears in advance. This appointment arrangement does not create a general walk-in or parcel-collection service."
    ],
  },
  {
    title: "Payment Methods & Order Confirmation",
    body: [
      "All prices are displayed in South African rand (ZAR). Orders are only processed once the full payment due has been received and confirmed.",
      "The payment methods currently available will be displayed or communicated by Serenity Wears before an order is confirmed. Do not send cash or payment to an account or number unless the payment instructions have been provided directly by Serenity Wears through its official contact channels.",
      "The website checkout currently remains a demonstration and does not process live online payments. A payment gateway must be connected and tested before customers can pay by card or another online method through the website. Until that is done, customers should follow the payment instructions confirmed directly by Serenity Wears."
    ],
  },
  {
    title: "Terms & Conditions",
    body: [
      "By browsing the website or placing an order, you agree to use the website lawfully and to provide accurate and complete information when ordering.",
      "All prices are in South African rand (ZAR). Prices, product descriptions, images, promotions and availability may be updated from time to time. A price or availability change will not retrospectively alter an order that Serenity Wears has already accepted and confirmed, except where correction is required by law or the customer agrees.",
      "Products are subject to availability. If an item becomes unavailable after an order is placed, we will contact the customer and arrange an appropriate alternative or refund of amounts paid for the unavailable item.",
      "An order is not ready for processing until payment has been received and confirmed. Customers are responsible for checking their selected products, sizes, quantities and delivery details before submitting an order.",
      "Product colours and appearance may vary slightly depending on screen settings and photography. We aim to provide accurate descriptions and images, and this statement does not limit statutory rights where goods are materially misdescribed or defective.",
      "Serenity Wears may update these website terms from time to time. The version published at the time an order is placed will generally apply to that order, subject always to applicable law.",
      "Nothing in these policies is intended to exclude, restrict or waive any consumer right that cannot lawfully be excluded under South African law. If any term conflicts with a mandatory legal requirement, the legal requirement will prevail."
    ],
  },
  {
    title: "Customer Support & Business Information",
    body: [
      "For product questions, order support, delivery enquiries, returns, exchanges, appointments or privacy requests, contact Serenity Wears using the details below.",
      "WhatsApp: 072 519 3126. Email: serenitywearsrsa@gmail.com. Instagram: @serenitywearrsa. Business location: Gqeberha, Eastern Cape, South Africa.",
      "Social media: Instagram @serenitywearrsa and TikTok @serenitywears. Please use the official contact details on this page for order-related support."
    ],
  },
];

const sectionId = (title: string) =>
  title.toLowerCase().replaceAll(" ", "-").replaceAll("&", "and");

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
          Please read these policies before placing an order. They explain how delivery, returns, payments, appointments, personal information and customer support work at Serenity Wears.
        </p>
        <nav aria-label="Policy sections" className="mt-8 flex flex-wrap gap-2">
          {sections.map(section => (
            <a key={section.title} href={"#" + sectionId(section.title)} className="rounded-full border border-[#decfe5] bg-white px-4 py-2 text-xs font-semibold text-[#5b2475] hover:bg-[#f7eff9]">{section.title}</a>
          ))}
        </nav>
        <div className="mt-10 space-y-5">
          {sections.map(section => (
            <section key={section.title} id={sectionId(section.title)} className="scroll-mt-8 bg-white p-7 shadow-sm ring-1 ring-[#eadff0] sm:p-9">
              <h2 className="font-serif text-2xl font-semibold tracking-[-0.02em] text-[#32133f]">{section.title}</h2>
              <div className="mt-4 space-y-3 text-sm leading-7 text-[#66586b]">
                {section.body.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
              </div>
              {section.title === "Customer Support & Business Information" && (
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href="https://wa.me/27725193126" className="rounded-full bg-[#4c1d67] px-6 py-3 text-sm font-semibold text-white">WhatsApp Serenity Wears</a>
                  <a href="mailto:serenitywearsrsa@gmail.com" className="rounded-full border border-[#4c1d67]/20 px-6 py-3 text-sm font-semibold text-[#4c1d67]">Email us</a>
                </div>
              )}
            </section>
          ))}
        </div>
        <p className="mt-10 text-xs leading-5 text-[#89798e]">
          These policies are intended as practical business information and do not replace legal advice. They must be applied consistently with the Consumer Protection Act, the Electronic Communications and Transactions Act and POPIA.
        </p>
      </div>
    </main>
  );
}
