import { Arrow, Icon } from "@/components/Elements";
import { VariantProps, cva } from "class-variance-authority";

interface ButtonProps extends VariantProps<typeof buttonStyles> {
  text: string;
  disabled?: boolean;
  onClick: () => void;
  className?: string;
}

const buttonStyles = cva("py-[15px] flex flex-row items-center rounded-full text-white text-base font-bold leading-[17.60px]", {
  variants: {
    intent: {
      primary: "bg-primary hover:bg-hover-btn active:bg-active disabled:bg-disabled p-2",
      secondary: "bg-black",
      loading: "bg-rose-600",
    },
    size: {
      medium: "w-[215px] h-[50px] pl-8 pr-1",
      small: "w-[142px] flex items-center justify-center h-12 px-8",
      full: "w-full flex items-center justify-center h-12 px-8",
    },
    defaultVariants: {
      intent: "primary",
      size: "medium",
    },
  },
});

export default function Button({ defaultVariants, intent, size, text, disabled = false, onClick, className }: ButtonProps) {

  return (
    <button
      className={buttonStyles({ defaultVariants, size, intent, className })}
      disabled={disabled}
      onClick={onClick}
    >
      {intent !== 'loading' && text}
      {size === 'medium' && (
        <div className="ml-auto">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
            <rect width="36" height="36" rx="24" fill="white" />
            <path d="M15.2821 25.282H29.641L23.359 31.564C22.8462 32.0769 22.8462 32.8461 23.359 33.3589C23.8718 33.8717 24.641 33.8717 25.1538 33.3589L33.6154 24.8974C34.1282 24.3846 34.1282 23.6153 33.6154 23.1025L25.1538 14.641C24.641 14.1281 23.8718 14.1281 23.359 14.641C22.8462 15.1538 22.8462 15.923 23.359 16.4358L29.641 22.7179H15.2821C14.5128 22.7179 14 23.2307 14 23.9999C14 24.7692 14.5128 25.282 15.2821 25.282Z" fill="#DF044D" />
          </svg>
        </div>
      )}
    </ button>
  );
}