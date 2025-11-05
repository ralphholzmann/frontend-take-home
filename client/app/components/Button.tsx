import cx from 'classnames';
import Icon, { IconName } from './Icon';

type ButtonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  iconStart?: IconName;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonVariant = 'primary' | 'secondary' | 'danger';
type ButtonSize = 'sm' | 'md';

const baseClasses = 'flex gap-2 items-center border';

const variants: Record<ButtonVariant, { default: string; disabled: string }> = {
  primary: {
    default: 'bg-purple-9 border-0 text-white cursor-pointer hover:bg-purple-8 active:bg-purple-9',
    disabled: 'bg-purple-9 border-0 text-white cursor-not-allowed opacity-50',
  },
  secondary: {
    default:
      'bg-background text-foreground border-grays-7 cursor-pointer hover:border-grays-6 active:border-grays-6 hover:bg-grays-2 active:bg-background',
    disabled: 'bg-gray-alpha-3 border-transparent text-gray-alpha-8 cursor-not-allowed',
  },
  danger: {
    default:
      'bg-red-surface border-red-alpha-7 text-red-alpha-11 cursor-pointer hover:bg-red-surface-hover active:bg-red-surface hover:border-red-divider active:border-red-divider',
    disabled: 'cursor-not-allowed',
  },
};

const sizes: Record<ButtonSize, string> = {
  sm: 'px-2 text-xs font-medium rounded-[3px] h-6',
  md: 'px-3 text-sm font-medium rounded h-8',
};

const iconSizes: Record<ButtonSize, number> = {
  sm: 16,
  md: 16,
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  iconStart,
  type = 'button',
  disabled = false,
  ...props
}: ButtonProps) => {
  const variantConfig = variants[variant];
  const sizeClass = sizes[size];
  const iconSize = iconSizes[size];

  const variantClass = disabled ? variantConfig.disabled : variantConfig.default;

  return (
    <button type={type} className={cx(baseClasses, variantClass, sizeClass, className)} {...props}>
      {iconStart && <Icon name={iconStart} size={iconSize} />}
      {children}
    </button>
  );
};

export default Button;
