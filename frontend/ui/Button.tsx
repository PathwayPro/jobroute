import { Arrow, Icon } from "@/components/Elements";
import { VariantProps, cva } from "class-variance-authority";

interface ButtonProps extends VariantProps<typeof buttonStyles> {
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  trailingIcon?: React.ReactNode;
  leadingIcon?: React.ReactNode;
  size?: "medium" | "small" | "full";
}

const buttonStyles = cva("button font-bold px-8 h-[48px] py-4", {
  variants: {
    intent: {
      primary: ["bg-primary", "text-white", "rounded-full", "px-8", "py-4", "hover:bg-hover-btn", "active:bg-active", "disabled:bg-disabled"],
      secondary: ["bg-black"],
      loading: ["bg-rose-600"],
    },
    size: {
      medium: ["w-[215px]", "h-[56px]"],
      small: ["w-[142px]", "flex", "items-center", "justify-center", "h-12", "px-8", "py-4"],
      full: ["w-full", "flex", "items-center", "justify-center", "h-12", "px-8", "py-4"],
    },
    defaultVariants: {
      intent: "primary",
      size: "medium",
    },
  },
});

export default function Button({ defaultVariants, intent, size, trailingIcon, leadingIcon, children, disabled = false, onClick, className }: ButtonProps) {

  return (
    <button
      className={buttonStyles({ defaultVariants, size, intent, className })}
      disabled={disabled}
      onClick={onClick}
    >
      {leadingIcon}
      {children}
      {trailingIcon}
    </ button>
  );
}