import type { ReactElement } from 'react';

type LogoProps = {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'light';
};

const sizeClasses: Record<NonNullable<LogoProps['size']>, string> = {
  sm: 'text-2xl',
  md: 'text-3xl',
  lg: 'text-4xl',
};

export function Logo({ size = 'md', variant = 'default' }: LogoProps): ReactElement {
  const colorClass = variant === 'light' ? 'text-insulation' : 'text-steel';
  const tradingColorClass = variant === 'light' ? 'text-blueprint-700' : 'text-blueprint';

  return (
    <div className={`logo inline-flex flex-col items-start leading-none ${colorClass}`}>
      <span className={`font-heading font-extrabold tracking-tight ${sizeClasses[size]}`}>
        SuVi
      </span>
      <span className={`logo-trading mt-1 ${tradingColorClass}`}>
        {'TRADING'.split('').map((char, index) => (
          <span key={index}>{char}</span>
        ))}
      </span>
    </div>
  );
}
