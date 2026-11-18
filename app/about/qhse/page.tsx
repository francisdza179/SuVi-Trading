import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { Navigation } from '@/sections/navigation';
import { PageHero } from '@/components/page-hero';
import { Footer } from '@/sections/footer';

export const metadata: Metadata = {
  title: 'QHSE Policy | SuVi Trading',
  description:
    'Quality, Health, Safety & Environment (QHSE) Policy of SuVi Trading.',
};

export default function QHSEPage(): ReactElement {
  return (
    <>
      <Navigation />
      <main>
        <PageHero
          title="Quality, Health, Safety & Environment (QHSE) Policy"
          description="Our commitment to quality, safety, environmental responsibility, and ethical business practices."
          image="/hero/about.png"
        />
        <section className="bg-insulation py-16 lg:py-24">
          <div className="container-tight max-w-4xl">
            <div className="space-y-8 text-gray-700 leading-relaxed">
              <p>
                At SuVi Trading, quality, safety, environmental responsibility, and ethical business practices are fundamental to how we operate. As a supplier of industrial, HVAC, plumbing, insulation, and MEP products, we recognize our responsibility to our customers, employees, suppliers, and the communities in which we operate.
              </p>
              <p>
                Our commitment extends beyond the products we supply. We strive to establish a culture that prioritizes quality, protects people, supports sustainable practices, and delivers consistent value to every project we serve.
              </p>
              <p>
                We believe that long-term success is achieved through responsible business operations, continuous improvement, and a commitment to meeting the expectations of customers while maintaining the highest standards of safety and professionalism.
              </p>

              <h2 className="font-heading text-2xl font-bold" style={{ color: '#0B132B' }}>Our QHSE Commitment</h2>
              <p>
                SuVi Trading is committed to maintaining a Quality, Health, Safety, and Environmental Management approach that supports operational excellence and responsible business practices across all areas of our organization.
              </p>
              <p>We are committed to:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li><strong>Delivering Quality Products &amp; Services:</strong> Providing products sourced from reputable manufacturers and suppliers that meet applicable industry requirements, specifications, and customer expectations.</li>
                <li><strong>Understanding Customer Requirements:</strong> Working closely with contractors, consultants, facility managers, and procurement teams to ensure accurate product selection, reliable sourcing, and responsive support throughout the procurement process.</li>
                <li><strong>Protecting Health &amp; Safety:</strong> Promoting a safe and healthy working environment for employees, visitors, suppliers, and business partners by encouraging risk awareness, accountability, and safe working practices.</li>
                <li><strong>Supporting Employee Development:</strong> Ensuring that our team has access to appropriate knowledge, resources, and training necessary to perform their roles effectively and responsibly.</li>
                <li><strong>Environmental Responsibility:</strong> Reducing environmental impact through responsible business decisions, efficient resource utilization, waste reduction initiatives, and support for environmentally conscious products and practices whenever possible.</li>
                <li><strong>Risk Management:</strong> Identifying potential risks within our operations and supply chain and implementing practical measures to mitigate those risks while maintaining service continuity and customer confidence.</li>
                <li><strong>Regulatory Compliance:</strong> Complying with applicable laws, regulations, industry standards, and customer requirements relevant to our products, services, and business activities.</li>
                <li><strong>Ethical Business Practices:</strong> Maintaining honesty, transparency, integrity, and fairness in all interactions with customers, suppliers, employees, and stakeholders.</li>
                <li><strong>Continuous Improvement:</strong> Regularly reviewing our processes, performance, and objectives to identify opportunities for improvement and enhance the quality, reliability, safety, and sustainability of our operations.</li>
              </ul>

              <h2 className="font-heading text-2xl font-bold" style={{ color: '#0B132B' }}>Our Quality Objectives</h2>
              <ul className="list-disc space-y-2 pl-6">
                <li>Providing dependable sourcing solutions across HVAC, plumbing, insulation, and industrial product categories.</li>
                <li>Ensuring accurate product information and specification support.</li>
                <li>Improving customer satisfaction through responsive communication and service.</li>
                <li>Strengthening relationships with trusted manufacturers and suppliers.</li>
                <li>Maintaining consistency in procurement, delivery coordination, and customer support.</li>
                <li>Continuously improving operational efficiency and service performance.</li>
              </ul>

              <h2 className="font-heading text-2xl font-bold" style={{ color: '#0B132B' }}>Our Health &amp; Safety Objectives</h2>
              <ul className="list-disc space-y-2 pl-6">
                <li>Promote a proactive safety culture throughout the organization.</li>
                <li>Encourage safe work practices and risk awareness.</li>
                <li>Minimize workplace hazards wherever reasonably practicable.</li>
                <li>Support employee well-being and safe business operations.</li>
                <li>Ensure accountability for health and safety responsibilities at every level.</li>
              </ul>

              <h2 className="font-heading text-2xl font-bold" style={{ color: '#0B132B' }}>Our Environmental Objectives</h2>
              <ul className="list-disc space-y-2 pl-6">
                <li>Reduce unnecessary waste generated through our operations.</li>
                <li>Promote responsible resource consumption.</li>
                <li>Support environmentally responsible sourcing practices where feasible.</li>
                <li>Encourage sustainable operational improvements.</li>
                <li>Continually evaluate opportunities to reduce our environmental footprint.</li>
              </ul>

              <h2 className="font-heading text-2xl font-bold" style={{ color: '#0B132B' }}>Our Responsibility</h2>
              <p>
                Quality, Health, Safety, and Environmental responsibility is not solely a management commitment. It is a shared responsibility embraced by every member of the SuVi Trading team.
              </p>
              <p>
                Through collaboration, accountability, and continual improvement, we remain committed to supporting our customers with reliable products, responsible business practices, and a commitment to excellence that contributes to safer, more efficient, and more sustainable projects.
              </p>

              <blockquote className="mt-8 border-l-4 border-copper pl-6 italic text-steel">
                &ldquo;At SuVi Trading, quality drives confidence, safety protects people, and responsibility guides every decision we make.&rdquo;
              </blockquote>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}