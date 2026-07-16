import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline-light";
type Size = "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-bronze text-cream hover:bg-charcoal focus-visible:bg-charcoal",
  secondary:
    "bg-transparent text-charcoal border border-charcoal/30 hover:border-charcoal hover:bg-charcoal hover:text-cream",
  ghost: "bg-transparent text-charcoal hover:text-bronze underline-offset-4 hover:underline",
  "outline-light":
    "bg-transparent text-cream border border-cream/40 hover:border-cream hover:bg-cream hover:text-ink",
};

const sizeClasses: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

interface ButtonAsButton extends BaseProps {
  href?: undefined;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  form?: string;
  name?: string;
  value?: string;
  "aria-label"?: string;
}

interface ButtonAsLink extends BaseProps {
  href: string;
  target?: string;
  rel?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} target={props.target} rel={props.rel} onClick={props.onClick} className={classes}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;

  return (
    <button
      type={buttonProps.type ?? "button"}
      disabled={buttonProps.disabled}
      onClick={buttonProps.onClick}
      form={buttonProps.form}
      name={buttonProps.name}
      value={buttonProps.value}
      aria-label={buttonProps["aria-label"]}
      className={classes}
    >
      {children}
    </button>
  );
}
