import Badge from "@/ui/Badge";
import Dialog from "../Dialog";
import "react-loading-skeleton/dist/skeleton.css";
import SkeletonLoader from "./SkeletonLoader";
import { ProgressBarLoading } from "@/ui/ProgressBar";
import { cva } from "class-variance-authority";
import Button from "@/ui/Button";
import Paragraph from "@/ui/Paragraph";
import { useState } from "react";

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
  hasError?: boolean;
  callback?: () => void;
}

export interface Field {
  title: string;
  desc: string;
}
interface CardProps {
  className?: string;
  type: ContentType;
  isLoading: boolean;
  hasError?: boolean;
  minimizedContent?: React.ReactNode;
  children: React.ReactNode;
  callback?: () => void;
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
  hasError,
  callback,
}: CardContentProps) => {
  const loader = isLoading && (
    <ProgressBarLoading key={type} isLoading={isLoading} />
  );
  const content = minimizedContent ? minimizedContent : children;
  const shouldDisplayError = !isLoading && hasError;
  const shouldDisplayContent = !isLoading && !hasError;

  const ErrorContent = () => {
    return (
      <div className="flex flex-col content-center items-center justify-center gap-2 text-center">
        <Paragraph>AI services are currently down. </Paragraph>
        <Paragraph>
          Please bear with us as we work to return to normal service.
        </Paragraph>
        <Button onClick={callback} variant="primary-small">
          Try again
        </Button>
      </div>
    );
  };

  return (
    <div key={type} className={cardStyles({ className })}>
      <div>
        <Badge type={type} />
      </div>
      {loader}
      <div className="line-clamp-6">{shouldDisplayContent && content}</div>
      {shouldDisplayError && <ErrorContent />}
      {!isLoading && !hasError && (
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
  hasError,
  callback,
}: CardProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog
      onOpenChange={(isOpen) => setOpen(isOpen)}
      open={!hasError ? open : false}
      trigger={CardContent({
        className,
        type,
        minimizedContent,
        isLoading,
        children,
        hasError,
        callback,
      })}
    >
      <div className="flex w-[600px] flex-col gap-4">
        <Badge type={type} />
        {isLoading && (
          <div className="min-w-[500px]">
            <SkeletonLoader />
          </div>
        )}
        {hasError && (
          <div>
            <Paragraph>Ops</Paragraph>
            <Button
              onClick={callback}
              variant="secondary"
              className="ml-auto mt-auto"
            >
              Try again
            </Button>
          </div>
        )}
        {!isLoading && !hasError && children}
      </div>
    </Dialog>
  );
};

export default Card;
