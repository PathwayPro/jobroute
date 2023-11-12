import Navbar from "@/components/Navbar";
import PercentageCard from "@/components/PercentageCard";
import Button from "@/ui/Button";
import Paragraph from "@/ui/Paragraph";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMatches } from "@/hooks/useMatches";
import { capitalizeWords } from "@/utils/utils";
import Footer from "@/components/Footer";

interface Profession {
  title: string;
  percentage: string;
  salary: string;
  NOC: string;
  isActive: boolean;
}

const ExplorePage = () => {
  const router = useRouter();
  const [professions, setProfessions] = useState<Profession[]>([]);
  const { profession, province } = router.query as {
    profession: string;
    province: string;
  };

  const { isLoading, matches } = useMatches(profession, province);

  useEffect(() => {
    if (!isLoading && matches && matches?.length > 0) {
      const professionList = matches.map((match) => {
        if (match.title === matches[0].title) {
          return {
            title: match.title,
            percentage: match.percentage,
            salary: match.salary,
            NOC: match.NOC,
            isActive: true,
          }
        }
        return {
          title: match.title,
          percentage: match.percentage,
          salary: match.salary,
          NOC: match.NOC,
          isActive: false,
        }
      });
      setProfessions(professionList);
    }
  }, [isLoading, matches])

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
  }

  return (
    <>
      <Navbar />
      <div className="max-w-[1500px] m-auto p-10 grow flex flex-col mt-[50px] px-[88px] gap-10">
        <div className="flex justify-around items-center px-12 py-6 bg-[#F0F0F0] rounded-xl">
          <div className="flex flex-col w-[70%] gap-6">
            <h2>Jobs similar to {capitalizeWords(profession)} in {capitalizeWords(province)}</h2>
            <Paragraph>Your current occupation matches with several professions in {capitalizeWords(province)}. Select any of them to explore how you can leverage your skills to transition into a new career.</Paragraph>
          </div>
          <div>
            <Button onClick={handleSearchAgain}>Search again</Button>
          </div>
        </div>
        {isLoading && (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        )}
        <div className="flex flex-wrap gap-4">
          {!isLoading && matches && professions?.map((profession) => (
            <PercentageCard
              key={profession.title}
              percentage={profession.percentage}
              title={profession.title}
              salary={profession.salary}
              noc={profession.NOC}
              active={profession.isActive}
              onClick={() => handleActive(profession.title)}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ExplorePage;
