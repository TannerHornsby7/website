export default function Page() {
  return (
    <div className="min-h-screen px-4 py-12 max-w-2xl mx-auto flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Support</h1>
      <p className="text-sm text-gray-600 mb-8">How can we help you?</p>
      <div className="space-y-8 text-gray-900 w-full">

        <section>
          <h2 className="text-2xl font-semibold mb-2">Contact Support</h2>
          <p>
            If you have questions, experience issues, or need help using Get Movin’, our support team is here for you. Please reach out, and we’ll do our best to assist you as soon as possible.
          </p>
          <div className="mt-4">
            <h3 className="font-semibold mb-1">Email Support</h3>
            <a
              className="text-blue-700 underline"
              href="mailto:tannerhornsby386@gmail.com"
            >
              tannerhornsby386@gmail.com
            </a>
          </div>
        </section>

        <hr className="border-gray-300" />

        <section>
          <h2 className="text-2xl font-semibold mb-2">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">How can I update or delete my account?</h3>
              <p>
                Please email us at <a className="text-blue-700 underline" href="mailto:tannerhornsby386@gmail.com">tannerhornsby386@gmail.com</a> requesting updates or deletion. We’ll confirm your request within a few days.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Why isn’t my location updating?</h3>
              <p>
                Ensure that you’ve granted location permissions to the app and that your device’s GPS is enabled. Try restarting the app if the problem persists.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">How do I report a bug or make a suggestion?</h3>
              <p>
                We welcome your feedback! Please send details (and screenshots, if possible) to <a className="text-blue-700 underline" href="mailto:tannerhornsby386@gmail.com">tannerhornsby386@gmail.com</a>.
              </p>
            </div>
          </div>
        </section>

        <hr className="border-gray-300" />

        <section>
          <h2 className="text-2xl font-semibold mb-2">Community Guidelines</h2>
          <p>
            Please be respectful in all communications and interactions. Harassment, spam, or abuse will not be tolerated.
          </p>
        </section>

        <hr className="border-gray-300" />

        <section>
          <h2 className="text-2xl font-semibold mb-2">Other Resources</h2>
          <ul className="list-disc ml-6">
            <li>
              <a href="/getMovin/privacy" className="text-blue-700 underline">Privacy Policy</a>
            </li>
            <li>
              <a href="mailto:tannerhornsby386@gmail.com" className="text-blue-700 underline">Contact Us</a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
