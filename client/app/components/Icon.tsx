import cx from "classnames";
import MagnifyingGlass from "@/app/assets/magnifying-glass.svg";

type IconProps = {
  name: IconName;
  size: number;
  className?: string;
} & React.SVGProps<SVGSVGElement>;

export type IconName = "magnifying-glass";

const icons: Record<IconName, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  "magnifying-glass": MagnifyingGlass,
}

const Icon = ({ name, size, className, ...props }: IconProps) => {

  const IconComponent = icons[name];

  return (
    <div className={cx("px-1 py-2 text-gray-alpha-11", className)}>
      <IconComponent width={size} height={size} {...props} />
    </div>
  )
}

export default Icon;