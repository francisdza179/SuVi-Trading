import type { ReactElement } from 'react';
import { Card } from '@/components/card';

const defaultValues = [
  {
    title: 'Multi-Brand Availability',
    description: 'Access products from 15+ trusted industrial brands without managing multiple vendor relationships.',
  },
  {
    title: 'Fast Sourcing',
    description: 'Our procurement team quickly confirms stock and lead times so your project schedule stays on track.',
  },
  {
    title: 'Technical Clarity',
    description: 'Clear specifications, datasheets, and compatibility guidance from people who understand MEP systems.',
  },
  {
    title: 'Consistent Quality',
    description: 'Every product is checked against project requirements and industry standards before delivery.',
  },
];

type Value = {
  title: string;
  description: string;
};

type ValuePropsProps = {
  values?: Value[];
};

export function ValueProps({ values = defaultValues }: ValuePropsProps): ReactElement {
  return (
    <section className="bg-concrete py-20 lg:py-28">
      <div className="container-tight">
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="w-full">
            <h2 className="font-heading text-3xl font-bold text-steel md:text-4xl">
              Procurement without the friction
            </h2>
          </div>
          <p className="max-w-md text-steel-300">
            We bridge the gap between engineering specifications and reliable supply, so you can focus on installation.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {values.map((value, index) => (
            <Card
              key={value.title}
              className={index === 0 ? 'md:translate-x-6' : index === 2 ? 'md:-translate-x-6' : ''}
            >
              <div className="flex items-start gap-5">
                <span className="font-heading text-2xl font-bold text-copper">0{index + 1}</span>
                <div>
                  <h3 className="font-heading text-lg font-bold text-steel">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-steel-400">
                    {value.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
