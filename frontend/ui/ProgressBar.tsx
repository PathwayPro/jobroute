import ProgressBar from "@ramonak/react-progress-bar";
import { useEffect, useState } from "react";
import Paragraph from "./Paragraph";


interface ProgressBarLoadingProps {
  isLoading: boolean;
  intervalInSec?: number;
}

export const ProgressBarLoading = ({ isLoading, intervalInSec = 4000 }: ProgressBarLoadingProps) => {
  const initialNumber = 15;
  const [completed, setCompleted] = useState(initialNumber);

  function randomIncrement(isLoading: boolean) {
    let number = initialNumber;

    const intervalId = setInterval(() => {
      if (isLoading) {
        const increment = Math.min(Math.floor(Math.random() * (99 - number)) + 4, 18);
        number = Math.min(number + increment, 99);
        setCompleted(number);
      } else {
        number = 100;
        clearInterval(intervalId);
      }
    }, intervalInSec);
  }

  useEffect(() => {
    randomIncrement(isLoading);
  }, [])

  return (
    <div className="flex flex-col gap-12 justify-center items-center h-full w-full">
      <Paragraph className="font-bold" size="medium">Loading...</Paragraph>
      <ProgressBar
        completed={completed}
        bgColor="#df044d"
        height="37px"
        width="288px"
        labelColor="#ffffff"
        labelSize="16px"
        barContainerClassName="border-2 border-black rounded-3xl"
        labelClassName="font-bold text-white p-4"
        className="w-full"
      />
    </div>
  )
};

export const DialogLoading = ({ isLoading }: { isLoading: boolean }) => {
  const [open, setOpen] = useState(false);

  const wait = () => new Promise((resolve) => setTimeout(resolve, 300));

  useEffect(() => {
    if (isLoading) {
      setOpen(true);
    } else {
      wait().then(() => setOpen(false));
    }
  }, [isLoading]);


  return (
    open ? (
      <div
        className="fixed inset-0 z-20 bg-black bg-opacity-50 backdrop-blur-sm"
      >
        <div
          className="fixed left-1/3 top-1/4 z-30 max-h-[600px] min-w-[454px] max-w-[800px] overflow-hidden rounded-3xl border-2 border-dialog bg-white"
        >
          <div className="flex items-center justify-center h-[500px] p-10 w-full">
            <ProgressBarLoading isLoading={isLoading} />
          </div>
        </div>
      </div>
    ) : null
  )
}