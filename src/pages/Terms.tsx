
import React from 'react';
import { Separator } from "@/components/ui/separator";

const Terms = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <Separator className="mb-6" />
      
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
          <p className="text-gray-700">
            By accessing and using PandaPricePoint, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using this site.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">2. Use License</h2>
          <p className="text-gray-700">
            Permission is granted to temporarily use PandaPricePoint for personal, non-commercial purposes. This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul className="list-disc pl-6 mt-2 text-gray-700">
            <li>Modify or copy the materials;</li>
            <li>Use the materials for any commercial purpose;</li>
            <li>Attempt to reverse engineer any software contained on PandaPricePoint;</li>
            <li>Remove any copyright or other proprietary notations from the materials;</li>
            <li>Transfer the materials to another person or "mirror" the materials on any other server.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">3. Disclaimer</h2>
          <p className="text-gray-700">
            The materials on PandaPricePoint are provided "as is". PandaPricePoint makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">4. Limitations</h2>
          <p className="text-gray-700">
            In no event shall PandaPricePoint be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use PandaPricePoint, even if PandaPricePoint or a PandaPricePoint authorized representative has been notified orally or in writing of the possibility of such damage.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">5. Revisions</h2>
          <p className="text-gray-700">
            The materials appearing on PandaPricePoint could include technical, typographical, or photographic errors. PandaPricePoint does not warrant that any of the materials on its website are accurate, complete or current. PandaPricePoint may make changes to the materials contained on its website at any time without notice.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Terms;
