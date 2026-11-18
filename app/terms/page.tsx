import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { Navigation } from '@/sections/navigation';
import { Footer } from '@/sections/footer';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms of Use for SuVi Trading — industrial hardware supply, quotations, orders, and delivery.',
};

type Section = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

const termsSections: Section[] = [
  {
    title: '1. Acceptance of Terms',
    paragraphs: [
      'By accessing or using this website, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use and all applicable laws and regulations.',
    ],
  },
  {
    title: '2. Website Purpose',
    paragraphs: [
      'The content on this website is provided for general informational purposes regarding SuVi Trading and its products. The information is not intended to constitute a binding offer or contractual obligation.',
    ],
  },
  {
    title: '3. Product Information',
    paragraphs: [
      'Product descriptions, specifications, images, and availability are provided for general reference purposes. While we strive for accuracy, specifications, designs, and materials may change or be revised by manufacturers at any time without notice. Customers are responsible for verifying product suitability, compatibility, and compliance with their specific applications, project requirements, and applicable standards. SuVi Trading does not guarantee that products will meet all project specifications unless expressly confirmed in writing.',
    ],
  },
  {
    title: '4. Quotations and Pricing',
    paragraphs: [
      'All quotations provided by SuVi Trading are subject to review and approval and are not binding offers. Prices, stock availability, and delivery timelines may vary based on market conditions, manufacturer changes, and supplier availability. Quotations may be revised or withdrawn at any time prior to written order confirmation. Orders are confirmed only upon written acceptance by SuVi Trading. Customers should review quotations carefully before placing orders.',
    ],
  },
  {
    title: '5. Intellectual Property',
    paragraphs: [
      'All content on this website, including text, graphics, logos, images, design elements, and software, is the property of SuVi Trading or its licensors and is protected by applicable intellectual property laws. Users may not copy, reproduce, distribute, modify, or create derivative works from any content without prior written permission. Unauthorized use of SuVi Trading trademarks, logos, or branding is strictly prohibited.',
    ],
  },
  {
    title: '6. Website Usage Restrictions',
    paragraphs: [
      'Users agree not to misuse the website, attempt unauthorized access, interfere with website security, introduce malware, or engage in any activity that disrupts website functionality. SuVi Trading reserves the right to restrict or terminate access to the website for any user who violates these restrictions or engages in unlawful or harmful conduct. Unauthorized access attempts may be reported to relevant authorities.',
    ],
  },
  {
    title: '7. Third-Party Content',
    paragraphs: [
      'References to manufacturers, brands, or third-party products are for identification purposes only. Such trademarks remain the property of their respective owners.',
    ],
  },
  {
    title: '8. Disclaimer',
    paragraphs: [
      'This website is provided on an “as is” and “as available” basis without warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement. SuVi Trading does not warrant that the website will be uninterrupted, error-free, or free from viruses or other harmful components. Users assume all risks associated with the use of the website.',
    ],
  },
  {
    title: '9. Limitation of Liability',
    paragraphs: [
      'SuVi Trading shall not be liable for any direct, indirect, incidental, consequential, special, or punitive damages arising from the use of or inability to use this website or its content. This includes, but is not limited to, loss of business, loss of profits, loss of data, or interruption of operations. The total liability of SuVi Trading for any claim related to the website shall be limited to the maximum extent permitted by applicable law.',
    ],
  },
  {
    title: '10. Indemnification',
    paragraphs: [
      'Users agree to indemnify and hold harmless SuVi Trading from any claims, damages, losses, or expenses arising from misuse of the website or violation of these terms.',
    ],
  },
  {
    title: '11. Governing Law',
    paragraphs: [
      'These Terms of Use shall be governed by and construed in accordance with the laws of the United Arab Emirates. Any disputes shall be subject to the exclusive jurisdiction of the competent courts in Dubai, UAE.',
    ],
  },
  {
    title: '12. Changes to Terms',
    paragraphs: [
      'SuVi Trading reserves the right to update or modify these Terms of Use at any time without prior notice. Continued use of the website constitutes acceptance of the revised terms.',
    ],
  },
  {
    title: '13. Contact Information',
    paragraphs: [
      'SuVi Trading',
      'Dubai, UAE',
      'Email: quotes@suvitrading.ae',
      'Phone: +971 4 123 4567',
    ],
  },
  {
    title: '14. Technical Recommendations',
    paragraphs: [
      'Product recommendations provided by SuVi Trading are based on available information and are offered in good faith. Customers are responsible for verifying suitability, compatibility, and compliance with project requirements and applicable standards before use. SuVi Trading is not liable for outcomes resulting from incorrect or incomplete information provided by the customer.',
    ],
  },
  {
    title: '15. Product Images and Visual Representations',
    paragraphs: [
      'Product images and visual representations on the website are provided for reference purposes only. Actual products may differ in appearance, color, specifications, or packaging due to manufacturer revisions or display variations. Customers should rely on official specifications and documentation for accurate product details.',
    ],
  },
  {
    title: '16. Availability and Lead Times',
    paragraphs: [
      'Product availability and lead times may vary based on stock levels, manufacturer schedules, and supply chain conditions. Quotations may be revised if availability changes. SuVi Trading reserves the right to update pricing, availability, or delivery timelines as needed.',
    ],
  },
  {
    title: '17. Supplier and Manufacturer References',
    paragraphs: [
      'References to manufacturers, brands, or third-party products are for identification purposes only. Trademarks, logos, and brand names remain the property of their respective owners. Such references do not imply endorsement or affiliation unless expressly stated.',
    ],
  },
  {
    title: '18. Force Majeure',
    paragraphs: [
      'SuVi Trading shall not be held liable for delays or failure to perform due to events beyond its reasonable control, including natural disasters, supply chain disruptions, utility failures, government actions, or other unforeseen circumstances. Performance obligations may be suspended during such events.',
    ],
  },
  {
    title: '19. Supplier Quotations and Third-Party Information',
    paragraphs: [
      'Information obtained from suppliers or third parties is provided in good faith and may be subject to change. SuVi Trading is not responsible for inaccuracies in third-party data and relies on supplier-provided information for quotations and product details.',
    ],
  },
  {
    title: '20. Entire Agreement',
    paragraphs: [
      'These Terms of Use constitute the entire agreement between the user and SuVi Trading regarding website use. If any provision is found invalid or unenforceable, the remaining provisions shall remain in full effect.',
    ],
  },
];

export default function TermsPage(): ReactElement {
  return (
    <>
      <Navigation />
      <main>
        <section className="relative overflow-hidden bg-[#0B132B] text-white">
          <div className="container-tight relative py-20 lg:py-28">
            <div className="max-w-4xl mx-auto px-6 text-center flex flex-col">
              <h1 className="contact-hero-title font-heading text-4xl font-extrabold tracking-tight text-white md:text-5xl" style={{ writingMode: 'horizontal-tb', wordBreak: 'normal', whiteSpace: 'normal' }}>
                Terms of Use
              </h1>
              <div className="mt-4 mx-auto text-center text-gray-300 text-lg" style={{ width: '600px', maxWidth: '100%', whiteSpace: 'normal' }}>
                Welcome to the SuVi Trading website. By accessing or using this website, you agree to comply with and be bound by these Terms of Use. If you do not agree with these terms, please discontinue use of the website.
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(to right, rgba(224,122,95,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(224,122,95,0.15) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </section>
        <section className="bg-[#F7F7F8] py-16 lg:py-24">
          <div className="container-tight px-4">
            <div className="mx-auto w-full max-w-4xl px-6 rounded-lg bg-white p-8 shadow-md md:p-12" style={{ width: '100%', maxWidth: '56rem' }}>
              <div className="space-y-8">
                {termsSections.map((s) => (
                  <div key={s.title} className="w-full" style={{ width: '100%' }}>
                    <h2
                      className="w-full font-heading text-2xl font-bold text-[#0B132B]"
                      style={{ writingMode: 'horizontal-tb', wordBreak: 'normal', whiteSpace: 'normal', width: '100%', maxWidth: 'none', display: 'block', fontSize: '24px' }}
                    >
                      {(() => {
                        const m = s.title.match(/^(\d+\.\s*)(.*)$/);
                        return m ? (
                          <>
                            <span className="text-[#E07A5F]">{m[1]}</span>
                            {m[2]}
                          </>
                        ) : (
                          s.title
                        );
                      })()}
                    </h2>
                    {s.paragraphs?.map((p, i) => (
                      <p
                        key={i}
                        className="mt-3 w-full leading-relaxed text-gray-700"
                        style={{ writingMode: 'horizontal-tb', wordBreak: 'normal', whiteSpace: 'normal', width: '100%', maxWidth: 'none', display: 'block' }}
                      >
                        {p}
                      </p>
                    ))}
                    {s.bullets && (
                      <ul className="mt-3 list-disc space-y-2 pl-6 text-gray-700">
                        {s.bullets.map((b) => (
                          <li key={b} className="leading-relaxed" style={{ whiteSpace: 'normal' }}>
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
