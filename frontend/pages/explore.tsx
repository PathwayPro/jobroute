import Navbar from "@/components/Navbar";
import PercentageCard from "@/components/PercentageCard";
import { professionsMatch } from "@/tools/mocks";
import Button from "@/ui/Button";
import Paragraph from "@/ui/Paragraph";
import { useRouter } from "next/router";
import { useState } from "react";

const ExplorePage = () => {
  const router = useRouter();
  const initialProfessions = professionsMatch.map((profession, index) => ({
    ...profession,
    isActive: index === 0,
  }));

  const [professions, setProfessions] = useState(initialProfessions);

  const { profession, location } = router.query as {
    profession: string;
    location: string;
  };

  const handleActive = (professionTitle: string) => {
    setProfessions((prevProfessions) =>
      prevProfessions.map((profession) =>
        profession.title === professionTitle
          ? { ...profession, isActive: true }
          : { ...profession, isActive: false },
      ),
    );
  };

  const handleSearchAgain = () => {
    // TODO: reset localStorage
    router.push("/");
  };

  return (
    <>
      <Navbar />
      <div className="m-auto mt-[50px] flex max-w-[1500px] grow flex-col gap-10 p-10 px-[88px]">
        <div className="flex items-center justify-around rounded-xl bg-[#F0F0F0] px-12 py-6">
          <div className="flex w-[70%] flex-col gap-6">
            <h2>
              Jobs similar to {profession} in {location}
            </h2>
            <Paragraph>
              Your current occupation matches with several professions in{" "}
              {location}. Select any of them to explore how you can leverage
              your skills to transition into a new career.
            </Paragraph>
          </div>
          <div>
            <Button onClick={handleSearchAgain}>Search again</Button>
          </div>
        </div>
        <div className="flex justify-evenly">
          {professions.map((profession) => (
            <PercentageCard
              key={profession.title}
              percentage={profession.percentage}
              title={profession.title}
              salary={profession.salary}
              noc={profession.noc}
              active={profession.isActive}
              onClick={() => handleActive(profession.title)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ExplorePage;
