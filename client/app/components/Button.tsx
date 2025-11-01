import cx from "classnames";

type ButtonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "sm" | "md";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-purple-9 text-white px-4 py-2 rounded",
  secondary: "bg-gray-alpha-5 text-white px-4 py-2 rounded",
}

const sizes: Record<ButtonSize, string> = {
  sm: "px-2 py-1 text-xs",
  md: "px-3 py-2 text-sm font-medium",
}

const Button = ({ children, variant = "primary", size = "md", className, ...props }: ButtonProps) => {
  const variantClass = variants[variant];
  const sizeClass = sizes[size];

  return (
    <button className={cx("flex", variantClass, sizeClass, className)} {...props}>
      {children}
    </button>
  )
}

export default Button;