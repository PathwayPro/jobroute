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
  "group flex flex-col cursor-pointer max-w-[405px] p-6 h-[356px] gap-8 rounded-3xl border-2 border-stone-300 hover:border-black",
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
      <div className="flex">
        <Badge type={type} />
      </div>
      {loader}
      <div className="line-clamp-6">{shouldDisplayContent && content}</div>
      {shouldDisplayError && <ErrorContent />}
      {!isLoading && !hasError && (
        <button className="ml-auto mt-auto flex w-max flex-row items-center gap-2 rounded-full text-base font-bold normal-case text-dark transition group-hover:flex-row-reverse group-hover:text-primary group-hover:duration-150 group-active:text-active-color">
          <>
            <span className="group-hover:text-primary group-active:text-active-color">
              Read More
            </span>
            <div className="m-0 rounded-full bg-black p-2 group-hover:bg-primary group-active:bg-active-color">
              <svg
                width="10"
                height="10"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  id="Vector"
                  d="M1.28205 11.282H15.641L9.35897 17.564C8.84615 18.0769 8.84615 18.8461 9.35897 19.3589C9.87179 19.8717 10.641 19.8717 11.1538 19.3589L19.6154 10.8974C20.1282 10.3846 20.1282 9.61532 19.6154 9.1025L11.1538 0.640963C10.641 0.128143 9.87179 0.128143 9.35897 0.640963C8.84615 1.15378 8.84615 1.92301 9.35897 2.43583L15.641 8.71789H1.28205C0.51282 8.71789 0 9.23071 0 9.99994C0 10.7692 0.51282 11.282 1.28205 11.282Z"
                  fill="white"
                />
              </svg>
            </div>
          </>
        </button>
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
              Try Again
            </Button>
          </div>
        )}
        {!isLoading && !hasError && children}
      </div>
    </Dialog>
  );
};

export default Card;
