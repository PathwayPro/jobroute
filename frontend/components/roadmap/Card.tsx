import Badge from "@/ui/Badge";
import Dialog from "../Dialog";
import "react-loading-skeleton/dist/skeleton.css";
import SkeletonLoader from "./SkeletonLoader";
import { ProgressBarLoading } from "@/ui/ProgressBar";
import { cva } from "class-variance-authority";
import Button from "@/ui/Button";

type ContentType =
  | "overview"
  | "info"
  | "combinedSkills"
  | "education"
  | "qualification"
  | "networking";

interface CardContentProps {
  className?: string;
  type: ContentType;
  minimizedContent?: React.ReactNode;
  isLoading: boolean;
  children: React.ReactNode;
}

export interface Field {
  title: string;
  desc: string;
}
interface CardProps {
  className?: string;
  type: ContentType;
  isLoading: boolean;
  minimizedContent?: React.ReactNode;
  children: React.ReactNode;
}

const cardStyles = cva(
  "flex flex-col cursor-pointer max-w-[405px] p-6 h-[356px] gap-8 rounded-3xl border-2 border-stone-300 hover:border-black",
);

const CardContent = ({
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
    <div key={type} className={cardStyles({ className })}>
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

const Card = ({
  className,
  type,
  minimizedContent,
  isLoading,
  children,
}: CardProps) => {
  return (
    <Dialog
      trigger={CardContent({
        className,
        type,
        minimizedContent,
        isLoading,
        children,
      })}
    >
      <div className="flex w-[600px] flex-col gap-4">
        <Badge type={type} />
        {isLoading ? (
          <div className="min-w-[500px]">
            <SkeletonLoader />
          </div>
        ) : (
          children
        )}
      </div>
    </Dialog>
  );
};

export default Card;
