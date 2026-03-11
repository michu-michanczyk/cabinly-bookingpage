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

export function PrivacyPolicy() {
  return (
    <PolicyLayout title="Privacy Policy">
      <Section heading="1. Who We Are">
        <p>
          Second Home Kashubia is a private holiday rental property operated by Maciej &amp; Ania, located at Na Gwizdówke 46, 83-400 Załakowo, Poland. For privacy-related queries, you may contact us at{" "}
          <a href="mailto:magda@drugidom.co.pl" className="text-text-primary underline underline-offset-4 hover:opacity-70 transition-opacity">
            magda@drugidom.co.pl
          </a>.
        </p>
      </Section>

      <Section heading="2. What Data We Collect">
        <p>
          When you make a booking or contact us, we may collect the following personal data:
        </p>
        <ul className="flex flex-col gap-2 pl-5 list-disc">
          <li>Full name and contact details (email address, phone number)</li>
          <li>Booking information (dates, number of guests, special requests)</li>
          <li>Payment information (processed securely via third-party providers — we do not store card details)</li>
          <li>Communication records (emails, messages exchanged with us)</li>
          <li>Technical data (IP address, browser type, pages visited — collected automatically via cookies)</li>
        </ul>
      </Section>

      <Section heading="3. How We Use Your Data">
        <p>
          We use your personal data solely for the following purposes:
        </p>
        <ul className="flex flex-col gap-2 pl-5 list-disc">
          <li>To process and manage your reservation</li>
          <li>To communicate with you about your booking and stay</li>
          <li>To send you important information such as check-in instructions</li>
          <li>To comply with legal obligations (e.g. tax records, guest registration)</li>
          <li>To improve our website and booking experience (aggregated, anonymised analytics only)</li>
        </ul>
        <p>
          We do not use your data for automated decision-making or profiling. We do not sell or share your personal data with third parties for marketing purposes.
        </p>
      </Section>

      <Section heading="4. Legal Basis for Processing">
        <p>
          We process your personal data under the following legal bases in accordance with GDPR:
        </p>
        <ul className="flex flex-col gap-2 pl-5 list-disc">
          <li><strong className="text-text-primary font-medium">Contract performance</strong> — processing is necessary to fulfil your booking</li>
          <li><strong className="text-text-primary font-medium">Legal obligation</strong> — processing is necessary to comply with applicable law</li>
          <li><strong className="text-text-primary font-medium">Legitimate interests</strong> — for improving our services and communicating with past guests</li>
          <li><strong className="text-text-primary font-medium">Consent</strong> — where you have explicitly opted in (e.g. newsletter)</li>
        </ul>
      </Section>

      <Section heading="5. Data Retention">
        <p>
          We retain your personal data only for as long as necessary to fulfil the purposes outlined in this policy. Booking records are kept for a minimum of 5 years to comply with Polish tax and accounting law. You may request deletion of your data at any time (subject to legal retention requirements).
        </p>
      </Section>

      <Section heading="6. Cookies">
        <p>
          Our website uses essential cookies necessary for the site to function. We may also use analytics cookies (e.g. Google Analytics) to understand how visitors use our site. These cookies collect anonymised, aggregated data only.
        </p>
        <p>
          You can control cookie settings through your browser. Disabling certain cookies may affect the functionality of the website.
        </p>
      </Section>

      <Section heading="7. Your Rights">
        <p>
          Under GDPR, you have the following rights regarding your personal data:
        </p>
        <ul className="flex flex-col gap-2 pl-5 list-disc">
          <li><strong className="text-text-primary font-medium">Right of access</strong> — request a copy of the data we hold about you</li>
          <li><strong className="text-text-primary font-medium">Right to rectification</strong> — request correction of inaccurate data</li>
          <li><strong className="text-text-primary font-medium">Right to erasure</strong> — request deletion of your personal data</li>
          <li><strong className="text-text-primary font-medium">Right to restriction</strong> — request that we limit how we use your data</li>
          <li><strong className="text-text-primary font-medium">Right to portability</strong> — receive your data in a structured, machine-readable format</li>
          <li><strong className="text-text-primary font-medium">Right to object</strong> — object to processing based on legitimate interests</li>
        </ul>
        <p>
          To exercise any of these rights, contact us at{" "}
          <a href="mailto:magda@drugidom.co.pl" className="text-text-primary underline underline-offset-4 hover:opacity-70 transition-opacity">
            magda@drugidom.co.pl
          </a>. We will respond within 30 days. You also have the right to lodge a complaint with the Polish Data Protection Authority (UODO).
        </p>
      </Section>

      <Section heading="8. Third-Party Services">
        <p>
          We may use the following third-party services which have their own privacy policies:
        </p>
        <ul className="flex flex-col gap-2 pl-5 list-disc">
          <li>Google Maps — for location display on our website</li>
          <li>Payment processors — for secure handling of transactions</li>
          <li>Email providers — for sending booking confirmations and communications</li>
        </ul>
        <p>
          We only share the minimum data necessary with these providers and ensure they maintain adequate data protection standards.
        </p>
      </Section>

      <Section heading="9. Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time. The date of the most recent revision will always be shown at the bottom of this page. We encourage you to review this policy periodically.
        </p>
        <p>
          Last updated: January 2026.
        </p>
      </Section>

      <Section heading="10. Contact">
        <p>
          If you have any questions about this Privacy Policy or how we handle your data, please contact us at{" "}
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
