
import React from 'react';
import Navbar from '@/components/Navbar';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8 text-center">Terms of Service</h1>
        
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By accessing and using PricePanda, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-2">2. Use License</h2>
              <p className="text-muted-foreground">
                Permission is granted to temporarily use PricePanda for personal, non-commercial purposes. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc pl-6 mt-2 text-muted-foreground">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose</li>
                <li>Attempt to decompile or reverse engineer any software contained on PricePanda</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-2">3. Disclaimer</h2>
              <p className="text-muted-foreground">
                The materials on PricePanda are provided on an 'as is' basis. PricePanda makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-2">4. Limitations</h2>
              <p className="text-muted-foreground">
                In no event shall PricePanda or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on PricePanda, even if PricePanda or a PricePanda authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-2">5. Accuracy of Materials</h2>
              <p className="text-muted-foreground">
                The materials appearing on PricePanda could include technical, typographical, or photographic errors. PricePanda does not warrant that any of the materials on its website are accurate, complete or current. PricePanda may make changes to the materials contained on its website at any time without notice.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-2">6. Links</h2>
              <p className="text-muted-foreground">
                PricePanda has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by PricePanda of the site. Use of any such linked website is at the user's own risk.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-2">7. Modifications</h2>
              <p className="text-muted-foreground">
                PricePanda may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-2">8. Governing Law</h2>
              <p className="text-muted-foreground">
                These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
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

export default Terms;
