import type { ReactElement } from 'react';

const defaultStats = [
  { value: '15+', label: 'Trusted Brands' },
  { value: '6', label: 'Core Categories' },
  { value: '24h', label: 'Quote Response' },
  { value: '100%', label: 'Spec-Verified' },
];

type Stat = {
  value: string;
  label: string;
};

type StatsProps = {
  stats?: Stat[];
};

export function Stats({ stats = defaultStats }: StatsProps): ReactElement {
  return (
    <section className="bg-steel py-12">
      <div className="container-tight">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-md bg-steel-50 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-steel p-6 text-center md:p-8">
              <p className="font-heading text-3xl font-bold text-copper md:text-4xl">{stat.value}</p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wider text-steel-600">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
