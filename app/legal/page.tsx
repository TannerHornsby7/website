'use client';

export default function Legal() {

  return (
    <div className="max-w-4xl mx-auto py-8 font-body">
      <h1 className="text-4xl font-header text-dark mb-8">Legal Information</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-header text-dark mb-4">Terms of Service</h2>
        <div className="space-y-4 text-darkgray">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h3 className="text-xl font-header text-dark mt-6">1. Acceptance of Terms</h3>
          <p>
            By accessing and using our services, you acknowledge that you have read,
            understood, and agree to be bound by these Terms of Service.
          </p>

          <h3 className="text-xl font-header text-dark mt-6">2. Mission and Purpose</h3>
          <p>
            Our services are provided as part of our non-profit mission to advance
            education and technology accessibility. We aim to create and maintain
            open-source solutions that benefit the community.
          </p>

          <h3 className="text-xl font-header text-dark mt-6">3. User Responsibilities</h3>
          <p>
            Users agree to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Use our services in accordance with applicable laws</li>
            <li>Respect intellectual property rights</li>
            <li>Not engage in any harmful or malicious activities</li>
            <li>Report any security vulnerabilities responsibly</li>
          </ul>

          <h3 className="text-xl font-header text-dark mt-6">4. Intellectual Property</h3>
          <p>
            Unless otherwise specified, our software is provided under open-source
            licenses. Contributors retain their intellectual property rights while
            granting necessary licenses for the project&apos;s operation.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-header text-dark mb-4">Privacy Policy</h2>
        <div className="space-y-4 text-darkgray">
          <p>Last updated: {new Date().toLocaleDateString()}</p>

          <h3 className="text-xl font-header text-dark mt-6">1. Data Collection</h3>
          <p>
            We collect minimal data necessary for service operation:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Technical information (e.g., browser type, device information)</li>
            <li>Usage data for service improvement</li>
            <li>Voluntary information provided by users</li>
          </ul>

          <h3 className="text-xl font-header text-dark mt-6">2. Data Usage</h3>
          <p>
            We use collected data to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide and maintain our services</li>
            <li>Improve user experience</li>
            <li>Analyze service usage patterns</li>
            <li>Communicate important updates</li>
          </ul>

          <h3 className="text-xl font-header text-dark mt-6">3. Data Protection</h3>
          <p>
            We implement reasonable security measures to protect user data. However,
            no method of transmission over the internet is 100% secure, and we cannot
            guarantee absolute security.
          </p>

          <h3 className="text-xl font-header text-dark mt-6">4. Third-Party Services</h3>
          <p>
            Our services may use third-party tools for analytics and functionality.
            These services have their own privacy policies and data collection
            practices.
          </p>

          <h3 className="text-xl font-header text-dark mt-6">5. User Rights</h3>
          <p>
            Users have the right to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access their personal data</li>
            <li>Request data correction or deletion</li>
            <li>Opt-out of data collection where possible</li>
            <li>Receive explanations about data usage</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-header text-dark mb-4">Contact Information</h2>
        <p className="text-darkgray">
          For questions about these terms or our privacy practices, please contact:
          <br />
          <a 
            href="mailto:tannerhornsby386@gmail.com" 
            className="text-tertiary hover:underline"
          >
            tannerhornsby386@gmail.com
          </a>
        </p>
      </section>

      <footer className="text-sm text-gray mt-8 border-t border-lightgray pt-4">
        <p>
          These terms and policies are provided for transparency and guidance.
          They may be updated periodically to reflect changes in our services
          or legal requirements.
        </p>
      </footer>
    </div>
  );
}
