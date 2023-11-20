import Badge, { BadgeType } from "@/ui/Badge";
import Button from "@/ui/Button";
import { ProgressBarLoading } from "@/ui/ProgressBar";
import { VariantProps, cva } from "class-variance-authority";
import Dialog from "../Dialog";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface CardProps extends VariantProps<typeof cardStyles> {
  children: React.ReactNode;
  color?: "gray" | "white" | "brown";
  className?: string;
  type:
    | "overview"
    | "info"
    | "skills"
    | "education"
    | "certification"
    | "networking";
  isLoading?: boolean;
  minimizedContent?: React.ReactNode;
}

interface CardContentProps {
  children: React.ReactNode;
  color: "gray" | "white" | "brown";
  className?: string;
  type:
    | "overview"
    | "info"
    | "skills"
    | "education"
    | "certification"
    | "networking";
  isLoading?: boolean;
  minimizedContent?: React.ReactNode;
}

const cardStyles = cva(
  "flex flex-col cursor-pointer max-w-[405px] p-6 h-[356px] gap-8 rounded-3xl border-2 border-stone-300 hover:border-black",
  {
    variants: {
      color: {
        gray: "bg-light-gray",
        white: "bg-white",
        brown: "bg-light-brown",
      },
    },
  },
);

const CardContent = ({
  color,
  className,
  type,
  minimizedContent,
  isLoading,
  children,
}: CardContentProps) => {
  const loader = isLoading && (
    <ProgressBarLoading key={type} isLoading={isLoading} />
  );
  const content = minimizedContent ? minimizedContent : children;

  return (
    <div key={type} className={cardStyles({ color, className })}>
      <div>
        <Badge type={type} />
      </div>
      <div className="line-clamp-6">{loader || content}</div>
      {!isLoading && (
        <Button variant="secondary" className="ml-auto mt-auto">
          Read more
        </Button>
      )}
    </div>
  );
};

const SkeletonLoader = (
  <SkeletonTheme baseColor="#D7D7D7" highlightColor="#eee">
    <div className="relative flex-shrink-0 flex-grow">
      <Skeleton width={"87%"} height={16} count={2.7} className="ms-7" />
      <Skeleton width={"87%"} height={16} count={2.7} className="ms-7" />
      <Skeleton width={"87%"} height={16} count={2.7} className="ms-7" />
    </div>
  </SkeletonTheme>
);

const Card = ({
  children,
  color = "white",
  isLoading = false,
  className,
  type,
  minimizedContent,
}: CardProps) => {
  return (
    <Dialog
      trigger={CardContent({
        color,
        className,
        type,
        minimizedContent,
        isLoading,
        children,
      })}
    >
      <div className="flex flex-col w-[600px] gap-4">
        <Badge type={type} />
        {isLoading ? SkeletonLoader : children}
      </div>
    </Dialog>
  );
};

export default Card;
