import Badge, { BadgeType } from "@/ui/Badge";
import Button from "@/ui/Button";
import Paragraph from "@/ui/Paragraph";
import { VariantProps, cva } from "class-variance-authority";
import Dialog from "../Dialog";

interface CardProps extends VariantProps<typeof cardStyles> {
  children: React.ReactNode;
  color?: 'gray' | 'white' | 'brown';
  className?: string;
  type: 'overview' | 'info' | 'skills' | 'education' | 'certification' | 'networking';
  isLoading?: boolean;
  minimizedContent?: React.ReactNode;
}

interface CardContentProps {
  children: React.ReactNode;
  color: 'gray' | 'white' | 'brown';
  className?: string;
  type: 'overview' | 'info' | 'skills' | 'education' | 'certification' | 'networking';
  isLoading?: boolean;
  minimizedContent?: React.ReactNode;
}

const cardStyles = cva("flex flex-col cursor-pointer max-w-[405px] p-6 h-[356px] gap-8 rounded-3xl border-2 border-stone-300 hover:border-black", {
  variants: {
    color: {
      gray: "bg-light-gray",
      white: "bg-white",
      brown: "bg-light-brown",
    },
  },
});

// TODO: Replace with proper loader when design is ready

const CardContent = ({ color, className, type, minimizedContent, isLoading, children }: CardContentProps) => {
  const loader = isLoading && (
    <span>Loading...</span>
  );

  const content = minimizedContent ? (
    minimizedContent
  ) : children;

  return (
    <div className={cardStyles({ color, className })}>
      <div>
        <Badge type={type} />
      </div>
      <div className="line-clamp-6">
        {loader || content}
      </div>
      <Button variant="secondary" className="mt-auto ml-auto">Read more</Button>
    </div>
  )
}

const Card = ({ children, color = 'gray', isLoading = false, className, type, minimizedContent }: CardProps) => {
  return (
    <Dialog
      trigger={CardContent({ color, className, type, minimizedContent, isLoading, children })}
    >
      <div className="flex flex-col gap-4">
        <Badge type={type} />
        {isLoading ? (
          <span>Loading...</span>
        ) : children}
      </div>
    </Dialog>
  )
}

export default Card;