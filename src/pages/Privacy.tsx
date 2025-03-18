
import React from 'react';
import Navbar from '@/components/Navbar';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8 text-center">Privacy Policy</h1>
        
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="space-y-6">
            <section>
              <p className="text-muted-foreground mb-4">
                Effective Date: {new Date().toLocaleDateString()}
              </p>
              <p className="text-muted-foreground">
                At PricePanda, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. Please read this policy carefully.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
              <p className="text-muted-foreground mb-2">We may collect information about you in various ways, including:</p>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li>
                  <strong>Personal Data:</strong> While using our service, we may ask you to provide certain personally identifiable information that can be used to contact or identify you, including your name, email address, and phone number.
                </li>
                <li>
                  <strong>Usage Data:</strong> We may also collect information on how the service is accessed and used, including your computer's Internet Protocol address, browser type, pages visited, time spent on those pages, and other diagnostic data.
                </li>
                <li>
                  <strong>Cookies:</strong> We use cookies and similar tracking technologies to track activity on our service and hold certain information.
                </li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-2">2. How We Use Your Information</h2>
              <p className="text-muted-foreground mb-2">We may use the information we collect for various purposes, including to:</p>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li>Provide and maintain our service</li>
                <li>Notify you about changes to our service</li>
                <li>Provide customer support</li>
                <li>Monitor the usage of our service</li>
                <li>Detect, prevent, and address technical issues</li>
                <li>Provide you with news, special offers, and general information about other goods, services, and events</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-2">3. Disclosure of Your Information</h2>
              <p className="text-muted-foreground mb-2">We may disclose your information in the following situations:</p>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li>
                  <strong>To Service Providers:</strong> To facilitate our service, provide the service on our behalf, perform service-related services, or assist us in analyzing how our service is used.
                </li>
                <li>
                  <strong>For Business Transfers:</strong> In connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.
                </li>
                <li>
                  <strong>With Your Consent:</strong> We may disclose your personal information for any other purpose with your consent.
                </li>
                <li>
                  <strong>To Comply with Law:</strong> We may disclose your information where required to do so by law or in response to valid requests by public authorities.
                </li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-2">4. Security of Your Information</h2>
              <p className="text-muted-foreground">
                The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-2">5. Your Data Protection Rights</h2>
              <p className="text-muted-foreground mb-2">
                If you are a resident of the European Economic Area (EEA), you have certain data protection rights. PricePanda aims to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Data.
              </p>
              <p className="text-muted-foreground">
                If you wish to be informed what Personal Data we hold about you and if you want it to be removed from our systems, please contact us.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-2">6. Changes to This Privacy Policy</h2>
              <p className="text-muted-foreground">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-2">7. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about this Privacy Policy, please contact us at privacy@pricepanda.com or through the Contact Us page on our website.
              </p>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-border mt-16 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0 flex items-center">
              <span className="text-xl font-bold">Price<span className="text-primary">Panda</span></span>
            </div>
            <div className="flex space-x-6">
              <a href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Contact Us
              </a>
            </div>
          </div>
          <div className="text-center mt-8 text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} PricePanda. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Privacy;
