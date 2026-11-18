import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Navigation } from '@/sections/navigation';
import { Footer } from '@/sections/footer';
import { ProductFaq } from '@/sections/product-faq';
import { RevealOnScroll } from '@/components/reveal-on-scroll';
import { allProducts, getProductImage } from '@/lib/products';
import type { Product } from '@/lib/products';

function getFaqs(product: Product): { q: string; a: string }[] {
  const name = product.name;
  switch (product.category) {
    case 'Pumps':
      return [
        {
          q: `What is the maximum operating pressure for the ${name}?`,
          a: 'This pump is rated for the pressure class indicated in its specification. Verify system design pressure against the pump curve and select appropriate motor protection.',
        },
        {
          q: 'Does this pump require a variable frequency drive (VFD)?',
          a: 'A VFD is recommended for variable-flow systems to improve efficiency and reduce wear. Fixed-speed operation is suitable for constant-demand applications.',
        },
        {
          q: 'What maintenance is required for long-term reliability?',
          a: 'Inspect seals, bearings, and impeller annually; monitor vibration and motor current; flush the system to prevent scale and debris buildup.',
        },
      ];
    case 'Copper Pipes':
      return [
        {
          q: `What refrigerant is compatible with the ${name}?`,
          a: 'The coil is designed for common HVAC refrigerants such as R-410A and R-22 (depending on rating). Confirm refrigerant compatibility with your system design.',
        },
        {
          q: 'How should the coil be cleaned and maintained?',
          a: 'Use approved coil cleaners and low-pressure water; avoid high-pressure washing that can damage fins. Inspect for corrosion and fin damage annually.',
        },
        {
          q: 'What is the recommended operating temperature range?',
          a: 'Refer to the coil specification for rated entering/leaving air and fluid temperatures. Exceeding rated conditions reduces efficiency and lifespan.',
        },
      ];
    case 'Thermal Insulation':
      return [
        {
          q: `What is the thermal conductivity rating of the ${name}?`,
          a: 'The sheet provides the insulation value listed in its specification. Use the R-value/lambda rating to calculate required thickness for your application.',
        },
        {
          q: 'Can this insulation be used outdoors or in wet environments?',
          a: 'Select products rated for UV and moisture exposure for outdoor use. Seal joints and protect from mechanical damage to maintain performance.',
        },
        {
          q: 'How is the insulation installed and adhered?',
          a: 'Clean and dry the substrate, apply compatible adhesive, and butt joints tightly. Follow manufacturer guidelines for temperature and cure times.',
        },
      ];
    case 'Valves':
      return [
        {
          q: `What is the pressure rating of the ${name}?`,
          a: 'The valve is rated to the pressure class in its specification (e.g., PN16). Ensure system operating pressure stays within the rated limit.',
        },
        {
          q: 'Is this valve suitable for modulating control?',
          a: 'Some models support modulating actuation; confirm actuator compatibility and control signal requirements for your application.',
        },
        {
          q: 'What maintenance is recommended for valve longevity?',
          a: 'Periodically inspect seals, actuator, and stem; exercise the valve regularly; replace worn seals to prevent leakage.',
        },
      ];
    case 'HVAC Accessories':
      return [
        {
          q: `What airflow capacity does the ${name} deliver?`,
          a: 'Refer to the airflow rating in the specification. Select based on required CFM/m³/h and available static pressure.',
        },
        {
          q: 'Does this fan require variable speed control?',
          a: 'Variable speed control improves efficiency in variable-load systems. Fixed-speed units suit constant ventilation requirements.',
        },
        {
          q: 'What maintenance keeps the fan operating efficiently?',
          a: 'Inspect bearings, belts, and impeller; clean dust buildup; check motor current and vibration periodically.',
        },
      ];
    case 'Refrigeration Components':
      return [
        {
          q: `What is the heat transfer capacity of the ${name}?`,
          a: 'The capacity is listed in the specification. Size based on load, flow rates, and temperature differential for your system.',
        },
        {
          q: 'What fluids are compatible with this heat exchanger?',
          a: 'Compatible with water, refrigerants, and approved heat transfer fluids. Confirm material compatibility with your media.',
        },
        {
          q: 'How should the heat exchanger be maintained?',
          a: 'Flush and descale periodically; inspect gaskets and plates; monitor pressure drop to detect fouling.',
        },
      ];
    default:
      return [
        {
          q: `What are the key specifications of the ${name}?`,
          a: product.spec,
        },
        {
          q: 'How do I request a quote?',
          a: 'Use the "Request a Quote" button above or contact SuVi Trading with your bill of materials for availability and pricing.',
        },
      ];
  }
}

function getSpecs(product: Product): { label: string; value: string }[] {
  switch (product.category) {
    case 'Pumps':
      return [
        { label: 'Flow Rate', value: 'Model dependent (m3/h)' },
        { label: 'Head Pressure', value: 'Rated system head (m)' },
        { label: 'Motor', value: 'IE3 high-efficiency, 3-phase' },
        { label: 'Connection', value: 'Flanged / threaded (model dependent)' },
        { label: 'Material', value: 'Cast iron / stainless steel' },
        { label: 'Max Fluid Temp', value: 'Up to 120 C' },
      ];
    case 'Copper Pipes':
      return [
        { label: 'Tube Type', value: 'Type K / L / M (per spec)' },
        { label: 'Diameter', value: '1/4" - 2" OD' },
        { label: 'Length', value: '20 ft straight / coils' },
        { label: 'Material', value: '99.9% pure copper' },
        { label: 'Standard', value: 'ASTM B88 / B280' },
      ];
    case 'Thermal Insulation':
      return [
        { label: 'Material', value: 'Closed-cell elastomeric rubber' },
        { label: 'Thickness', value: '13mm - 50mm' },
        { label: 'Temp Range', value: '-50 C to +105 C' },
        { label: 'Thermal Conductivity', value: '0.033 W/mK' },
        { label: 'Fire Class', value: 'Class 0 / Class 1' },
      ];
    case 'Valves':
      return [
        { label: 'Size (DN)', value: 'DN25 - DN150' },
        { label: 'Pressure Rating', value: 'PN16 / PN25' },
        { label: 'Body Material', value: 'Cast iron / brass / SS' },
        { label: 'Connection', value: 'Flanged / threaded' },
        { label: 'Actuation', value: 'Manual / motorized' },
      ];
    case 'HVAC Accessories':
      return [
        { label: 'Airflow', value: 'Up to 1,500 m3/h' },
        { label: 'Static Pressure', value: 'Up to 500 Pa' },
        { label: 'Motor', value: 'EC / AC options' },
        { label: 'Speed', value: 'Variable / fixed' },
        { label: 'Housing', value: 'Galvanized steel / aluminum' },
      ];
    case 'Refrigeration Components':
      return [
        { label: 'Capacity', value: 'Up to 20 kW' },
        { label: 'Primary Medium', value: 'Water / glycol' },
        { label: 'Secondary Medium', value: 'Refrigerant / water' },
        { label: 'Max Pressure', value: 'Up to 30 bar' },
        { label: 'Material', value: 'Brazed stainless steel' },
      ];
    case 'Pipe Supports & Hangers':
      return [
        { label: 'Thread Size / Diameter', value: '3/8" - 1/2" (per model)' },
        { label: 'Material & Finish', value: 'Carbon steel, electro-galvanized (ASTM A108)' },
        { label: 'Channel Compatibility', value: 'Fits all standard 1-5/8" channels' },
        { label: 'Spring Type', value: 'Regular / long spring options' },
        { label: 'Design Load Rating', value: 'Standard industrial load capacity' },
      ];
    case 'Pipes & Fittings':
      return [
        { label: 'Size', value: 'DN20 - DN110' },
        { label: 'Material', value: 'PVC / HDPE / GI / Copper' },
        { label: 'Pressure', value: 'PN10 / PN16' },
        { label: 'Connection', value: 'Socket / threaded / grooved' },
        { label: 'Standard', value: 'DIN / ASTM' },
      ];
    case 'Industrial Consumables':
      return [
        { label: 'Material', value: 'Nylon / steel / chemical resin' },
        { label: 'Application', value: 'General industrial' },
        { label: 'Pack Size', value: 'Standard / bulk' },
        { label: 'Standard', value: 'ISO / DIN' },
      ];
    default:
      return [
        { label: 'Primary Specification', value: product.spec || 'Refer to product specification sheet' },
      ];
  }
}

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = allProducts.find((p) => p.sku.toLowerCase() === slug);
  if (!product) return { title: 'Product Not Found' };
  return {
    title: `${product.name} | SuVi Trading`,
    description: `${product.brand} ${product.name} - ${product.spec}. Request a quote from SuVi Trading.`,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps): Promise<ReactElement> {
  const { slug } = await params;
  const product = allProducts.find((p) => p.sku.toLowerCase() === slug);

  if (!product) {
    notFound();
  }

  const image = getProductImage(product);
  const features = product.spec.split(/[-,]/).map((s) => s.trim()).filter(Boolean);

  // Shuffle related products with a product-specific seed so each detail page
  // surfaces a different mix while staying stable across renders.
  const relatedSeed = product.sku.toLowerCase();
  const relatedRank = (sku: string): number => {
    const key = `${relatedSeed}:${sku}`;
    let hash = 2166136261;
    for (let i = 0; i < key.length; i++) {
      hash ^= key.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  };
  const relatedCandidates = allProducts.filter((p) => p.sku !== product.sku);
  const relatedProducts = [
    ...relatedCandidates
      .filter((p) => p.category === product.category)
      .sort((a, b) => relatedRank(a.sku) - relatedRank(b.sku)),
    ...relatedCandidates
      .filter((p) => p.category !== product.category)
      .sort((a, b) => relatedRank(a.sku) - relatedRank(b.sku)),
  ].slice(0, 3);

  return (
    <>
      <Navigation />
      <main className="pt-28">
        <section className="bg-slate-50/50 py-12 lg:py-16">
          <div className="container-tight">
            <div className="mb-8">
              <Link href="/products" className="text-base font-semibold text-[#C46A3A] hover:underline">
                ← Back to Product Catalog
              </Link>
            </div>

            <div className="grid gap-10 lg:grid-cols-2">
              <div className="sticky top-28 p-2">
                <div className="relative h-[640px] w-full overflow-hidden rounded-2xl bg-white">
                  {image ? (
                    <Image
                      src={image}
                      alt={product.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-gray-400">
                      No image available
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col">
                <h1
                  className="mt-2 font-heading text-3xl font-bold tracking-tight text-gray-900 md:text-4xl"
                  style={{ color: '#0B132B', fontSize: '48px', fontWeight: '700', lineHeight: '1.15', letterSpacing: '-0.025em' }}
                >
                  {product.name}
                </h1>

                <div className="mt-4 flex flex-wrap gap-3 text-base text-gray-600">
                  <span className="rounded-full border border-gray-200 bg-white px-3 py-1">
                    Model / SKU: <strong className="text-gray-900">{product.sku}</strong>
                  </span>
                  <span className="rounded-full border border-gray-200 bg-white px-3 py-1">
                    Category: <strong className="text-gray-900">{product.category}</strong>
                  </span>
                </div>

                <div className="mt-8">
                  <h2 className="font-heading text-lg font-bold" style={{ color: '#0B132B', fontSize: '18px', fontWeight: '700' }}>
                    Technical Specifications
                  </h2>
                  <ul className="mt-4 space-y-3">
                    {getSpecs(product).map((spec, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-base">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#C46A3A]" />
                        <span className="font-semibold text-gray-900">{spec.label}:</span>
                        <span className="text-gray-600">{spec.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <Link
                    href={`/contact?product=${encodeURIComponent(product.name)}&sku=${encodeURIComponent(product.sku)}`}
                    className="inline-flex items-center justify-center rounded-full bg-[#C46A3A] px-8 py-3.5 text-base font-bold text-white shadow-md transition hover:bg-[#C46A3A]/90"
                  >
                    Request a Quote for this Product
                  </Link>
                  <p className="mt-6 text-xs text-gray-500">
                    Bulk RFQ available for 10+ units. Our team responds within 24 hours.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-16 space-y-12">
              <section>
                <h2 className="font-heading text-lg font-bold" style={{ color: '#0B132B', fontSize: '18px', fontWeight: '700' }}>
                  Product Overview
                </h2>
                <p className="mt-3 text-base leading-relaxed text-gray-600">
                  The {product.name} from {product.brand} is engineered for dependable performance within HVAC and MEP systems.
                  Built to demanding industrial standards, it delivers reliable operation, long service life, and efficient integration
                  into commercial and institutional projects. SuVi Trading sources this product to help contractors and engineers
                  meet exact specifications with confidence.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-lg font-bold" style={{ color: '#0B132B', fontSize: '18px', fontWeight: '700' }}>
                  Key Features
                </h2>
                <div className="mt-4 space-y-3">
                  {[
                    { title: 'Durable Construction', desc: 'Industrial-grade materials for long service life.' },
                    { title: 'Reliable Performance', desc: 'Designed for consistent HVAC/MEP operation.' },
                    { title: 'Easy Integration', desc: 'Compatible with common installation standards.' },
                    { title: 'Trusted Manufacturer', desc: `Supported by proven industry brands like ${product.brand}.` },
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-sm bg-[#C46A3A]" />
                      <div>
                        <p className="text-base font-bold leading-tight text-gray-900">{feature.title}</p>
                        <p className="mt-1 text-xs leading-relaxed text-gray-600">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="font-heading text-lg font-bold" style={{ color: '#0B132B', fontSize: '18px', fontWeight: '700' }}>
                  Common Applications
                </h2>
                <p className="mt-3 text-base leading-relaxed text-gray-600">
                  Commonly deployed in commercial cooling towers, chilled water loops, booster pump setups, ventilation systems,
                  and general MEP infrastructure where reliability and specification accuracy are critical.
                </p>
              </section>

               <section>
                 <h2 className="font-heading text-lg font-bold" style={{ color: '#0B132B', fontSize: '18px', fontWeight: '700' }}>
                   Suitable For
                 </h2>
                 <div className="mt-4 flex flex-wrap gap-2">
                   {[
                     'Commercial Buildings',
                     'Hotels & Hospitality',
                     'Hospitals & Healthcare Facilities',
                     'Industrial Facilities',
                     'Educational Institutions',
                     'Data Centers',
                     'High-Rise Developments',
                     'Facility Maintenance Projects',
                   ].map((env, idx) => (
                     <span
                       key={idx}
                       className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700"
                     >
                       {env}
                     </span>
                   ))}
                 </div>
               </section>

              <section>
                <h2 className="font-heading text-lg font-bold" style={{ color: '#0B132B', fontSize: '18px', fontWeight: '700' }}>
                  Related Products
                </h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {relatedProducts.map((related, index) => (
                    <RevealOnScroll key={related.sku} delay={index * 100} className="h-full">
                      <Link
                        href={`/products/${related.sku.toLowerCase()}`}
                        className="block h-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
                      >
                        <div className="relative h-80 w-full bg-white">
                          <Image
                            src={getProductImage(related)}
                            alt={related.name}
                            fill
                            className="object-contain p-3"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        </div>
                        <div className="p-4">
                          <p className="text-base font-semibold text-gray-900">{related.name}</p>
                          <p className="mt-1 text-xs text-gray-500">{related.spec}</p>
                        </div>
                      </Link>
                    </RevealOnScroll>
                  ))}
                </div>
              </section>

              <ProductFaq faqs={getFaqs(product)} />

               <section className="flex flex-col gap-6 rounded-2xl bg-[#1E4A7B] p-8 text-white shadow-lg md:flex-row md:items-center md:justify-between">
                 <div>
                   <h2 className="font-heading text-2xl font-bold" style={{ color: '#ffffff', fontSize: '20px' }}>
                     Need This Product for Your Next Project?
                   </h2>
                   <p className="mt-3 text-base leading-relaxed text-blue-100">
                     Get fast quotes, custom submittals, and volume pricing tailored to your MEP or HVAC project requirements.
                   </p>
                 </div>
                 <div className="md:shrink-0">
                   <Link
                     href={`/contact?product=${encodeURIComponent(product.name)}&sku=${encodeURIComponent(product.sku)}`}
                     className="inline-flex items-center justify-center rounded-full bg-[#C46A3A] px-8 py-3.5 text-base font-bold text-white shadow-md transition hover:bg-[#C46A3A]/90"
                   >
                     Request a Quote Now
                   </Link>
                 </div>
               </section>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
