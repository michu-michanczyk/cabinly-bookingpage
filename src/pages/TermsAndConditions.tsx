import { Link } from "react-router-dom";

function PolicyLayout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      {/* Simple top bar */}
      <header className="sticky top-0 z-30 bg-bg-primary border-b border-border-light">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
          <Link to="/" className="text-base font-medium text-text-primary hover:opacity-70 transition-opacity flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </Link>
          <span className="text-sm text-text-secondary">Second Home Kashubia</span>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-[760px] mx-auto px-4 sm:px-8 py-16 sm:py-24">
          {/* Badge */}
          <div className="inline-flex mb-8">
            <span className="inline-flex items-center px-3 py-1 rounded-full border border-border-light text-base font-medium text-text-primary">
              Legal
            </span>
          </div>

          {/* Title */}
          <h1 className="font-medium text-text-primary mb-16" style={{ fontSize: "48px", lineHeight: "56px" }}>
            {title}
          </h1>

          {/* Content */}
          <div className="flex flex-col gap-12">
            {children}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border-light">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <span className="text-base text-text-secondary">© 2026 All rights reserved.</span>
          <div className="flex items-center gap-6">
            <Link to="/terms" className="text-base text-text-secondary hover:text-text-primary transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link to="/privacy" className="text-base text-text-secondary hover:text-text-primary transition-colors">
              Privacy policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Section({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-medium text-text-primary" style={{ fontSize: "24px", lineHeight: "32px" }}>
        {heading}
      </h2>
      <div className="flex flex-col gap-3 text-base font-normal text-text-secondary" style={{ lineHeight: "28px" }}>
        {children}
      </div>
    </section>
  );
}

export function TermsAndConditions() {
  return (
    <PolicyLayout title="Terms & Conditions">
      <Section heading="1. Introduction">
        <p>
          Welcome to Second Home Kashubia ("we", "our", "us"). By making a booking or using our website, you agree to be bound by these Terms and Conditions. Please read them carefully before proceeding with a reservation.
        </p>
        <p>
          These terms apply to all guests booking a stay at our property located at Na Gwizdówke 46, 83-400 Załakowo, Poland.
        </p>
      </Section>

      <Section heading="2. Bookings & Reservations">
        <p>
          A reservation is confirmed only upon receipt of a booking confirmation email from us. We reserve the right to decline any reservation at our discretion.
        </p>
        <p>
          You must be at least 18 years of age to make a reservation. By completing a booking, you confirm that you are legally capable of entering into a binding contract.
        </p>
        <p>
          The number of guests must not exceed the maximum occupancy stated at the time of booking (up to 10 guests). Any change in guest numbers must be communicated in advance and approved by us.
        </p>
      </Section>

      <Section heading="3. Payment">
        <p>
          Full payment is required to confirm your booking unless otherwise agreed in writing. All prices are quoted in Polish Złoty (PLN) and include applicable taxes unless stated otherwise.
        </p>
        <p>
          For promotional deals and special offers, the advertised deal price applies only for the specified dates and cannot be combined with other discounts.
        </p>
      </Section>

      <Section heading="4. Cancellation Policy">
        <p>
          Cancellations made more than 7 days before the check-in date will receive a full refund. Cancellations made within 7 days of check-in are eligible for a 50% refund.
        </p>
        <p>
          For special offer bookings, the deal price is non-refundable within 48 hours of the check-in date. In cases of force majeure (illness, severe weather, etc.), please contact us directly and we will do our best to accommodate your situation.
        </p>
        <p>
          We reserve the right to cancel a booking in exceptional circumstances. In such cases, a full refund will be issued.
        </p>
      </Section>

      <Section heading="5. Check-in & Check-out">
        <p>
          Check-in is from 3:00 PM. Check-out is by 11:00 AM. Early check-in and late check-out may be available upon request and subject to availability. Additional charges may apply.
        </p>
        <p>
          Guests are required to present a valid ID at check-in. Key collection instructions will be provided in the booking confirmation email.
        </p>
      </Section>

      <Section heading="6. House Rules">
        <p>
          Guests are expected to treat the property and its contents with care and respect. Any damage caused during your stay will be charged to the guest responsible.
        </p>
        <p>
          Smoking is strictly prohibited inside the property. Quiet hours are observed between 10:00 PM and 8:00 AM. Parties and events must be agreed upon in advance.
        </p>
        <p>
          Pets are welcome (up to 2 animals) with prior notice. Pets must be kept off the furniture and owners are responsible for cleaning up after their animals.
        </p>
      </Section>

      <Section heading="7. Liability">
        <p>
          We accept no responsibility for personal injury, loss, or damage to personal belongings during your stay, except where required by law. Guests are advised to obtain travel insurance.
        </p>
        <p>
          We are not liable for any disruption caused by circumstances beyond our control including but not limited to utility failures, extreme weather events, or third-party services.
        </p>
      </Section>

      <Section heading="8. Governing Law">
        <p>
          These Terms and Conditions are governed by Polish law. Any disputes arising shall be subject to the exclusive jurisdiction of the courts of Poland.
        </p>
        <p>
          Last updated: January 2026. We reserve the right to update these terms at any time. Continued use of our booking services constitutes acceptance of the updated terms.
        </p>
      </Section>

      <Section heading="9. Contact">
        <p>
          For any questions regarding these Terms and Conditions, please contact us at{" "}
          <a href="mailto:magda@drugidom.co.pl" className="text-text-primary underline underline-offset-4 hover:opacity-70 transition-opacity">
            magda@drugidom.co.pl
          </a>{" "}
          or call{" "}
          <a href="tel:+48509799278" className="text-text-primary underline underline-offset-4 hover:opacity-70 transition-opacity">
            +48 509 799 278
          </a>.
        </p>
      </Section>
    </PolicyLayout>
  );
}
