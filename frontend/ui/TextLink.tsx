import { VariantProps, cva } from "class-variance-authority";
import Link from "next/link";

interface TextLinkProps extends VariantProps<typeof textLinkStyles> {
  url: string;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

const textLinkStyles = cva("text-base underline leading-[25.28px]", {
  variants: {
    disabled: {
      true: "text-disabled pointer-events-none cursor-default",
      false: "cursor-pointer text-dark hover:text-primary hover:underline transition-colors duration-200 ease-in-out",
    },
  },
  defaultVariants: {
    disabled: false,
  }
})

const TextLink = ({ url, children, disabled, className }: TextLinkProps) => {
  const handleClick = () => {
    if (disabled) return;

  }
  return (
    <Link href={url} onClick={handleClick} className={textLinkStyles({ disabled, className })}>
      {children}
    </Link>
  )
}

export default TextLink;