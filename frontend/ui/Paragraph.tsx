import { VariantProps, cva } from "class-variance-authority";

interface ParagraphProps extends VariantProps<typeof paragraphStyles> {
  children: React.ReactNode;
  size?: "small" | "medium" | "large";
  weight?: "regular" | "bold";
  className?: string;
}

const paragraphStyles = cva("", {
  variants: {
    size: {
      small: "leading-3 text-xs",
      medium: "leading-6 text-base",
      large: "text-2xl",
    },
    weight: {
      regular: "font-normal",
      bold: "font-bold",
    },
    defaultVariants: {
      size: "medium",
      weight: "regular",
    },
  },
});

const Paragraph = ({
  children,
  size = "medium",
  weight = "regular",
  defaultVariants,
  className,
}: ParagraphProps) => {
  return (
    <p
      className={paragraphStyles({ defaultVariants, size, weight, className })}
    >
      {children}
    </p>
  );
};

export default Paragraph;
