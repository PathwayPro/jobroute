import { MainProps } from "@/types/PropsTypes";
import Image from "next/image";
import Dialog from "./Dialog";
import Form from "./Form";
import Paragraph from "@/ui/Paragraph";
import NumberedCards from "./NumberedCards";
import { useRouter } from "next/router";
import Button from "@/ui/Button";

const Body: React.FC<MainProps> = ({ provinces }) => {
  const router = useRouter();

  return (
    <div className="m-auto flex max-w-[1500px] grow flex-row justify-between p-10">
      <div className="mt-[120px] flex w-2/5 flex-col">
        <div className="max-w-[536px]">
          <h1>
            Your path to a <strong className="text-primary">new career</strong>{" "}
            in Canada
          </h1>
        </div>
        <Dialog trigger={<Button className="mt-10">Get Started</Button>}>
          <Form provinces={provinces} />
        </Dialog>
        <div className="mt-16">
          <Paragraph className="max-w-[190px]">
            3 easy steps to getting new job:
          </Paragraph>
          <NumberedCards />
        </div>
        <Button
          variant="outlined"
          className="mt-10"
          onClick={() =>
            router.push("/explore?location=Alberta&profession=Accountant")
          }
        >
          Click to go to Explore Jobs
        </Button>
      </div>
      <div className="mt-[100px] flex flex-col">
        <Image
          priority
          className="object-contain md:object-scale-down"
          alt="Hero"
          src="/img/Illustration.svg"
          width={758}
          height={671}
        />
        <div className="ml-[100px] mt-[130px] flex max-w-[600px] flex-col items-start">
          <div className="mr-auto flex">
            <h2>Your personal AI assistant</h2>
          </div>
          <Paragraph size="large" className="mt-7">
            Our open-source platform helps graduates, newcomers, and career
            changers with relevant information. All you need in one place!
          </Paragraph>
        </div>
      </div>
    </div>
  );
};

export default Body;
