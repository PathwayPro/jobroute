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
}

const cardStyles = cva("flex flex-col cursor-pointer w-[405px] p-6 h-[356px] gap-8 rounded-3xl border-2 border-stone-300 hover:border-black", {
  variants: {
    color: {
      gray: "bg-light-gray",
      white: "bg-white",
      brown: "bg-light-brown",
    },
  },
});

// TODO: Replace with proper loader when design is ready

const Card = ({ children, color = 'gray', isLoading = false, className, type }: CardProps) => {
  return (
    <Dialog
      trigger={
        <div className={cardStyles({ color, className })}>
          <div>
            <Badge type={type} />
          </div>
          <div className="line-clamp-6">
            {isLoading ? (
              <span>Loading...</span>
            ) : children}
          </div>
          <Button variant="secondary" className="mt-auto ml-auto">Read more</Button>
        </div>
      }
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