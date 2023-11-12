import { MainProps } from "@/types/PropsTypes";
import Image from "next/image";
import Dialog from "./Dialog";
import Form from "./Form";
import Paragraph from "@/ui/Paragraph";
import NumberedCards from "./NumberedCards";
import Button from "@/ui/Button";

const Body: React.FC<MainProps> = ({ provinces }) => {
  return (
    <div className='flex flex-row max-w-[1500px] m-auto p-10 grow justify-between'>
      <div className="flex flex-col mt-[120px] w-2/5">
        <div className="max-w-[536px]">
          <h1>Your path to a <strong className="text-primary">new career</strong> in Canada</h1>
        </div>
        <Dialog
          trigger={
            <Button
              className="mt-10"
            >
              Get Started
            </Button>
          }
        >
          <Form provinces={provinces} />
        </Dialog>
        <div className="mt-16">
          <Paragraph className="max-w-[190px]">
            3 easy steps to getting new job:
          </Paragraph>
          <NumberedCards />
        </div>
      </div>
      <div className='flex flex-col mt-[100px]'>
        <Image priority className="object-contain md:object-scale-down" alt="Hero" src="/img/Illustration.svg" width={758} height={671} />
        <div className="flex flex-col ml-[100px] mt-[130px] max-w-[600px] items-start">
          <div className="flex mr-auto">
            <h2>Your personal AI assistant</h2>
          </div>
          <Paragraph size="large" className="mt-7">Our open-source platform helps graduates, newcomers,
            and career changers with relevant information. All you need in one place!</Paragraph>
        </div>
      </div>
    </div >
  );
};

export default Body;
