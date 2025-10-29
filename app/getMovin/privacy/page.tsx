export default function Page() {
  return (
    <div className="min-h-screen px-4 py-12 max-w-2xl mx-auto flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
      <p className="text-sm text-gray-600 mb-8">Last updated: October 29, 2025</p>

      <div className="space-y-8 text-gray-900">
        <p>
          Get Movin’ (“we,” “us,” or “our”) values your privacy. This Privacy Policy explains how we collect, use, disclose, and protect your information when you use our mobile application and related services (collectively, the “Service”). By using Get Movin’, you agree to the terms described below.
        </p>

        <hr className="border-gray-300" />

        <section>
          <h2 className="text-2xl font-semibold mb-2">1. Information We Collect</h2>
          <div className="mb-2">
            <h3 className="font-semibold">1.1 Information You Provide</h3>
            <ul className="list-disc ml-6">
              <li>Account details — such as your name, email address, phone number, or login credentials.</li>
              <li>Profile settings — including preferences, saved places, and communication settings.</li>
              <li>Feedback and support — when you contact us or participate in promotions.</li>
            </ul>
          </div>
          <div className="mb-2">
            <h3 className="font-semibold">1.2 Information We Collect Automatically</h3>
            <ul className="list-disc ml-6">
              <li>Location data — precise or approximate location from your device (even in the background, if you grant permission).</li>
              <li>Device data — such as hardware model, operating system, app version, and unique device identifiers.</li>
              <li>Usage data — interactions with the app, time and duration of sessions, and performance metrics.</li>
              <li>Cookies / analytics — to improve service quality and personalize your experience.</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">1.3 Information From Third Parties</h3>
            <ul className="list-disc ml-6">
              <li>Service partners (e.g., mapping or payment providers) may share limited data necessary for location verification, fraud prevention, or transaction processing.</li>
              <li>Platform providers (e.g., Apple or Google) may send basic analytics or crash reports.</li>
            </ul>
          </div>
        </section>

        <hr className="border-gray-300" />

        <section>
          <h2 className="text-2xl font-semibold mb-2">2. How We Use Your Information</h2>
          <ul className="list-disc ml-6">
            <li>Provide and operate the Get Movin’ Service.</li>
            <li>Display and monitor nearby movement zones or protected areas.</li>
            <li>Customize content and app functionality.</li>
            <li>Maintain security and prevent unauthorized activity.</li>
            <li>Analyze usage trends to improve performance.</li>
            <li>Communicate updates, offers, and important notices (you can opt out at any time).</li>
          </ul>
        </section>

        <hr className="border-gray-300" />

        <section>
          <h2 className="text-2xl font-semibold mb-2">3. How We Share Information</h2>
          <ul className="list-disc ml-6">
            <li>With service providers who help us deliver core functions such as hosting, analytics, and customer support.</li>
            <li>With authorities or as required by law when we believe disclosure is necessary to comply with regulations or protect rights, property, or safety.</li>
            <li>During a business transfer (e.g., merger or acquisition) where data may be transferred under appropriate safeguards.</li>
          </ul>
          <p className="mt-2">We do <span className="font-semibold">not</span> sell or rent your personal information.</p>
        </section>

        <hr className="border-gray-300" />

        <section>
          <h2 className="text-2xl font-semibold mb-2">4. Your Choices and Rights</h2>
          <ul className="list-disc ml-6">
            <li>Location permissions — You can enable or disable location access anytime in your device settings.</li>
            <li>Account data — You may update or delete your account by contacting us.</li>
            <li>Communication preferences — You can opt out of marketing emails or push notifications.</li>
            <li>Legal rights — Depending on your region, you may have rights to access, correct, or request deletion of your data.</li>
          </ul>
        </section>

        <hr className="border-gray-300" />

        <section>
          <h2 className="text-2xl font-semibold mb-2">5. Data Retention</h2>
          <p>
            We retain personal data only as long as necessary for legitimate business or legal purposes, then delete or anonymize it.
          </p>
        </section>

        <hr className="border-gray-300" />

        <section>
          <h2 className="text-2xl font-semibold mb-2">6. Security</h2>
          <p>
            We implement administrative, technical, and physical safeguards designed to protect your information. However, no system is completely secure, and you share data at your own risk.
          </p>
        </section>

        <hr className="border-gray-300" />

        <section>
          <h2 className="text-2xl font-semibold mb-2">7. Children’s Privacy</h2>
          <p>
            Get Movin’ is not directed at children under 13 (or 16 in certain regions). We do not knowingly collect personal data from minors. If we learn that a child’s information has been collected, we will delete it promptly.
          </p>
        </section>

        <hr className="border-gray-300" />

        <section>
          <h2 className="text-2xl font-semibold mb-2">8. International Data Transfers</h2>
          <p>
            Your information may be processed in countries other than where you reside. We take appropriate steps to ensure your data receives adequate protection consistent with applicable laws.
          </p>
        </section>

        <hr className="border-gray-300" />

        <section>
          <h2 className="text-2xl font-semibold mb-2">9. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy periodically. The “Last updated” date reflects the most recent version. Material changes will be communicated within the app or on our website.
          </p>
        </section>

        <hr className="border-gray-300" />

        <section>
          <h2 className="text-2xl font-semibold mb-2">10. Contact Us</h2>
          <p>
            If you have questions, concerns, or requests about this Privacy Policy or your data, contact us at:<br />
            <a className="text-blue-700 underline" href="mailto:tannerhornsby386@gmail.com">tannerhornsby386@gmail.com</a>
          </p>
        </section>
      </div>
    </div>
  );
}