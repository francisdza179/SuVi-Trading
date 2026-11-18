import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { Navigation } from '@/sections/navigation';
import { Footer } from '@/sections/footer';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for SuVi Trading — how we collect, use, and protect your data.',
};

type Section = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

const privacySections: Section[] = [
  {
    title: '1. Information We Collect',
    paragraphs: [
      'We may collect information you provide voluntarily when you contact us, request a quote, or submit inquiries through our website. This may include:',
    ],
    bullets: [
      'Name and company name',
      'Email address and phone number',
      'Project details and product requirements',
      'Uploaded files such as bills of quantities (BOQs), drawings, or specifications',
    ],
  },
  {
    title: '2. How We Use Your Information',
    paragraphs: ['We use the information collected to:'],
    bullets: [
      'Respond to inquiries and quote requests',
      'Provide product recommendations and technical support',
      'Process orders and coordinate deliveries',
      'Improve our website and services',
      'Comply with legal and regulatory obligations',
    ],
  },
  {
    title: '3. Information Sharing',
    paragraphs: [
      'SuVi Trading does not sell, rent, or otherwise distribute your personal information to unaffiliated third parties for marketing purposes. We may share information with trusted suppliers, logistics partners, and service providers when necessary to fulfill your requests, process orders, coordinate deliveries, or provide technical support. Such sharing is limited to the specific information required to perform the requested service. We may also disclose information when required by law, regulation, legal process, or governmental request, or when necessary to protect the rights, safety, or property of SuVi Trading, our customers, or third parties. All third-party partners are expected to maintain appropriate confidentiality and data protection standards.',
    ],
  },
  {
    title: '4. Data Security',
    paragraphs: [
      'We implement appropriate administrative, technical, and physical security measures designed to protect your information against unauthorized access, alteration, disclosure, or destruction. Access to personal information is restricted to authorized personnel who require it to perform their duties. Data is stored on secure systems with controlled access and monitored safeguards. While we strive to protect your information, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security. Users are encouraged to take precautions when transmitting sensitive information online.',
    ],
  },
  {
    title: '5. Cookies and Analytics',
    paragraphs: [
      'Our website may use cookies and analytics tools to track visitor behavior, monitor website performance, and improve user experience. These tools may collect information such as page views, navigation patterns, device information, and interaction metrics. Cookies help us understand how visitors use our site so we can optimize content, functionality, and performance. You may control or disable cookies through your browser settings; however, doing so may affect certain features or functionality of the website.',
    ],
  },
  {
    title: '6. Third-Party Links',
    paragraphs: [
      'Our website may contain links to external manufacturer resources, supplier websites, or other third-party platforms. These external sites operate independently and are not controlled by SuVi Trading. We are not responsible for the privacy practices, content, or security of those external websites. We encourage users to review the privacy policies and terms of use of any third-party site they visit.',
    ],
  },
  {
    title: '7. Data Retention',
    paragraphs: [
      'We retain personal information only for as long as necessary to fulfill the purposes outlined in this policy or comply with legal obligations.',
    ],
  },
  {
    title: '8. Your Rights',
    paragraphs: [
      'You may request access to, correction of, or deletion of your personal information by contacting SuVi Trading. You may also object to certain processing of your information or request restrictions on how your data is used. We will respond to such requests in accordance with applicable laws and within a reasonable timeframe. To exercise these rights, please contact us using the contact information provided in Section 11.',
    ],
  },
  {
    title: "9. Children's Privacy",
    paragraphs: [
      "Our services are intended for business and professional users. We do not knowingly collect personal information from children.",
    ],
  },
  {
    title: '10. Changes to This Policy',
    paragraphs: [
      'We may update this Privacy Policy periodically. Any changes will be posted on this page with a revised effective date.',
    ],
  },
  {
    title: '11. Contact Us',
    paragraphs: [
      'SuVi Trading',
      'Dubai, UAE',
      'Email: quotes@suvitrading.ae',
      'Phone: +971 4 123 4567',
    ],
  },
  {
    title: '12. International Data Transfers',
    paragraphs: [
      'SuVi Trading operates within the United Arab Emirates and may process or store information locally. In the course of fulfilling requests, coordinating deliveries, or working with suppliers and partners, your information may be shared with or processed by parties located outside your country of residence. By using our website and services, you acknowledge and consent to such cross-border data transfers. We take reasonable steps to ensure that any international data sharing is conducted with appropriate safeguards and in accordance with applicable legal requirements.',
    ],
  },
  {
    title: '13. Marketing Communications',
    paragraphs: [
      'From time to time, SuVi Trading may send product updates, company announcements, promotional information, or service-related communications to users who have provided their contact details. You may opt out of receiving marketing communications at any time by following the unsubscribe instructions included in our communications or by contacting us directly. Transactional and operational communications related to your inquiries, quotes, or orders may still be sent as necessary.',
    ],
  },
  {
    title: '14. Uploaded Documents & Project Information',
    paragraphs: [
      'Users may submit bills of quantities (BOQs), drawings, specifications, and other project-related documents through our website. Such submissions are treated as confidential business information and are used solely for the purpose of evaluating inquiries, preparing quotations, and supporting project requirements. We implement reasonable safeguards to protect uploaded documents. However, users are responsible for ensuring that submitted documents do not contain sensitive personal data beyond what is necessary for business purposes.',
    ],
  },
  {
    title: '15. Website Security',
    paragraphs: [
      'SuVi Trading implements safeguards designed to protect the website and user information against unauthorized access, alteration, disclosure, or destruction. These safeguards include administrative, technical, and physical controls. However, no system or transmission method is completely secure, and we cannot guarantee absolute security. Users are responsible for maintaining the confidentiality of any credentials or information they provide and for reporting suspected security issues promptly.',
    ],
  },
  {
    title: '16. Business Contact Information',
    paragraphs: [
      'For corporate stakeholders, consultants, contractors, and procurement representatives, SuVi Trading may collect and process business contact information such as company names, email addresses, phone numbers, and project details. This information is used for business communications, quotation processing, order coordination, and service delivery. Business contact information may be retained for legitimate business purposes and shared with trusted partners when necessary to fulfill project requirements.',
    ],
  },
];

export default function PrivacyPage(): ReactElement {
  return (
    <>
      <Navigation />
      <main>
        <section className="relative overflow-hidden bg-[#0B132B] text-white">
          <div className="container-tight relative py-20 lg:py-28">
            <div className="max-w-4xl mx-auto px-6 text-center flex flex-col">
              <h1 className="contact-hero-title font-heading text-4xl font-extrabold tracking-tight text-white md:text-5xl" style={{ writingMode: 'horizontal-tb', wordBreak: 'normal', whiteSpace: 'normal' }}>
                Privacy Policy
              </h1>
              <div className="mt-4 mx-auto text-center text-gray-300 text-lg" style={{ width: '600px', maxWidth: '100%', whiteSpace: 'normal' }}>
                At SuVi Trading, we are committed to protecting your privacy and maintaining the security of any information you provide when interacting with our website and services. This Privacy Policy explains how we collect, use, store, and protect information obtained through our website.
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(to right, rgba(224,122,95,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(224,122,95,0.15) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </section>
        <section className="bg-[#F7F7F8] py-16 lg:py-24">
          <div className="container-tight px-4">
            <div className="mx-auto w-full max-w-4xl px-6 rounded-lg bg-white p-8 shadow-md md:p-12" style={{ width: '100%', maxWidth: '56rem' }}>
              <div className="space-y-8">
                {privacySections.map((s) => (
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
