import DotsHorizontal from '@/app/assets/dots-horizontal.svg';
import MagnifyingGlass from '@/app/assets/magnifying-glass.svg';
import Plus from '@/app/assets/plus.svg';
import Star from '@/app/assets/star.svg';
type IconProps = {
  name: IconName;
  size: number;
  className?: string;
} & React.SVGProps<SVGSVGElement>;

export type IconName = 'magnifying-glass' | 'plus' | 'dots-horizontal' | 'star';

const icons: Record<IconName, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  'magnifying-glass': MagnifyingGlass,
  plus: Plus,
  'dots-horizontal': DotsHorizontal,
  star: Star,
};

const Icon = ({ name, size, className, ...props }: IconProps) => {
  const IconComponent = icons[name];

  return <IconComponent width={size} height={size} className={className} {...props} />;
};

export default Icon;
