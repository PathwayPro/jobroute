import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import { capitalizeWords } from "@/utils/utils";
import { useMatches } from "@/hooks/useMatches";
import Navbar from "@/components/Navbar";
import PercentageCard from "@/components/PercentageCard";
import Button from "@/ui/Button";
import Paragraph from "@/ui/Paragraph";
import Footer from "@/components/Footer";
import RoadmapCards from "@/components/roadmap/RoadmapCards";
import { DialogLoading } from "@/ui/ProgressBar";

interface Profession {
  title: string;
  percentage: string;
  salary: string;
  NOC: string;
  isActive: boolean;
}

const ExplorePage = () => {
  const effectRan = useRef(false);
  const router = useRouter();
  const [professions, setProfessions] = useState<Profession[]>([]);
  const { profession, province } = router.query as {
    profession: string;
    province: string;
  };
  const { isLoading, matches } = useMatches(profession, province);
  const activeProfession = professions.find(
    (profession) => profession.isActive,
  );

  useEffect(() => {
    if (matches && matches?.length > 0 && !effectRan.current) {
      const professionList = matches.map((match) => {
        if (match.title === matches[0].title) {
          return {
            title: match.title,
            percentage: match.percentage,
            salary: match.salary,
            NOC: match.NOC,
            isActive: true,
          };
        }
        return {
          title: match.title,
          percentage: match.percentage,
          salary: match.salary,
          NOC: match.NOC,
          isActive: false,
        };
      });
      setProfessions(professionList);

      return () => {
        effectRan.current = true;
      };
    }
  }, [matches]);

  const renderRoadmap = useMemo(() => {
    if (activeProfession) {
      return (
        <RoadmapCards
          key={activeProfession.title}
          profession={activeProfession.title}
          province={province}
        />
      );
    }
    return null;
  }, [activeProfession]);

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
              Jobs similar to {capitalizeWords(profession)} in{" "}
              {capitalizeWords(province)}
            </h2>
            <Paragraph>
              Your current occupation matches with several professions in{" "}
              {capitalizeWords(province)}. Select any of them to explore how you
              can leverage your skills to transition into a new career.
            </Paragraph>
          </div>
          <div>
            <Button onClick={handleSearchAgain}>Search again</Button>
          </div>
        </div>
        <DialogLoading isLoading={isLoading} />
        <div className="flex flex-wrap justify-center gap-4">
          {!isLoading &&
            matches &&
            professions?.map((profession) => (
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
        <div>{renderRoadmap}</div>
      </div>
      <Footer />
    </>
  );
};

export default ExplorePage;
