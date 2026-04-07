import Link from 'next/link';

type Color = 'green' | 'gold' | 'blue' | 'red' | 'navy' | 'outline';
type Size  = 'sm' | 'md' | 'lg' | 'xl';

const colors: Record<Color, { bg: string; shadow: string; hover: string; active: string; text: string }> = {
  green: {
    bg:     'bg-[#58CC02]',
    shadow: 'shadow-[0_5px_0_#46A302]',
    hover:  'hover:bg-[#61D006]',
    active: 'active:shadow-[0_2px_0_#46A302] active:translate-y-[3px]',
    text:   'text-white',
  },
  gold: {
    bg:     'bg-[#F5C542]',
    shadow: 'shadow-[0_5px_0_#CFA830]',
    hover:  'hover:bg-[#F7CE5C]',
    active: 'active:shadow-[0_2px_0_#CFA830] active:translate-y-[3px]',
    text:   'text-[#27355B]',
  },
  blue: {
    bg:     'bg-[#1CB0F6]',
    shadow: 'shadow-[0_5px_0_#1899D6]',
    hover:  'hover:bg-[#34B8F7]',
    active: 'active:shadow-[0_2px_0_#1899D6] active:translate-y-[3px]',
    text:   'text-white',
  },
  red: {
    bg:     'bg-[#FF4B4B]',
    shadow: 'shadow-[0_5px_0_#E53535]',
    hover:  'hover:bg-[#FF5C5C]',
    active: 'active:shadow-[0_2px_0_#E53535] active:translate-y-[3px]',
    text:   'text-white',
  },
  navy: {
    bg:     'bg-[#27355B]',
    shadow: 'shadow-[0_5px_0_#172140]',
    hover:  'hover:bg-[#2f3f6e]',
    active: 'active:shadow-[0_2px_0_#172140] active:translate-y-[3px]',
    text:   'text-white',
  },
  outline: {
    bg:     'bg-white',
    shadow: 'shadow-[0_5px_0_#D1D5DB]',
    hover:  'hover:bg-gray-50',
    active: 'active:shadow-[0_2px_0_#D1D5DB] active:translate-y-[3px]',
    text:   'text-[#27355B] border-2 border-[#E2E8F0]',
  },
};

const sizes: Record<Size, string> = {
  sm: 'px-5 py-2 text-xs rounded-xl',
  md: 'px-8 py-3.5 text-sm rounded-2xl',
  lg: 'px-12 py-4 text-base rounded-2xl',
  xl: 'px-16 py-5 text-lg rounded-2xl w-full max-w-md',
};

const base =
  'inline-flex items-center justify-center gap-2 font-extrabold uppercase tracking-wider transition-all duration-100 ease-in-out select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none';

interface SharedProps {
  color?: Color;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

interface LinkProps extends SharedProps {
  href: string;
  onClick?: never;
  type?: never;
  disabled?: never;
}

interface ButtonProps extends SharedProps {
  href?: never;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

type ButtonCustomProps = LinkProps | ButtonProps;

export function ButtonCustom({
  href,
  onClick,
  color = 'green',
  size = 'md',
  type = 'button',
  disabled,
  className = '',
  children,
}: ButtonCustomProps) {
  const c = colors[color];
  const cls = `${base} ${sizes[size]} ${c.bg} ${c.shadow} ${c.hover} ${c.active} ${c.text} ${className}`;

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  );
}
