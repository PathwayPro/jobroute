import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import { capitalizeWords } from "@/utils/utils";
import { getProfessionMatches } from "@/hooks/useMatches";
import Navbar from "@/components/Navbar";
import PercentageCard from "@/components/PercentageCard";
import Button from "@/ui/Button";
import Paragraph from "@/ui/Paragraph";
import Footer from "@/components/Footer";
import RoadmapCards from "@/components/roadmap/RoadmapCards";
import { DialogLoading } from "@/ui/ProgressBar";
import { provincesLowercase } from "@/provinces";
import Dialog from "@/components/Dialog";
import Form from "@/components/Form";
import Head from "next/head";

interface Profession {
  title: string;
  percentage: string;
  salary?: string;
  NOC: string;
  isActive: boolean;
}

interface Matches {
  title: string;
  Percentage: string;
  NOC: string;
}

const ExplorePage = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const effectRan = useRef(false);
  const effectMatchesRan = useRef(false);
  const router = useRouter();
  const [matches, setMatches] = useState<Matches[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [professions, setProfessions] = useState<Profession[]>([]);
  const { profession, province } = router.query as {
    profession: string;
    province: string;
  };

  useEffect(() => {
    if (!profession) return;
    if (!effectMatchesRan.current) {
      getProfessionMatches(profession, province).then((matches) => {
        setMatches(matches.content);
        setIsLoading(false);
      });
    }
    return () => {
      effectMatchesRan.current = true;
    };
  }),
    [profession, province];

  const activeProfession = useMemo(() => {
    return professions.find((profession) => profession.isActive);
  }, [professions]);

  useEffect(() => {
    if (matches && matches?.length > 0 && !effectRan.current) {
      const professionList = matches.map((match) => {
        if (match.title === matches[0].title) {
          return {
            title: match.title,
            percentage: match.Percentage,
            NOC: match.NOC,
            isActive: true,
          };
        }
        return {
          title: match.title,
          percentage: match.Percentage,
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
          profession={activeProfession.title.toLocaleLowerCase()}
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

  return (
    <>
      <Head>
        <title>
          Jobs similar to {capitalizeWords(profession)} in{" "}
          {capitalizeWords(province)}
        </title>
      </Head>
      <Navbar />
      <div className="m-auto mt-[50px] flex max-w-[1500px] grow flex-col gap-10 p-10 px-[88px]">
        <div className="flex items-center justify-around rounded-xl bg-[#F0F0F0] px-12 py-6">
          <div className="flex w-[70%] flex-col gap-6">
            <h2>
              Jobs similar to {capitalizeWords(profession)} in{" "}
              {capitalizeWords(province)}
            </h2>
            {matches?.length > 0 && (
              <Paragraph>
                Your current occupation matches with several professions in{" "}
                {capitalizeWords(province)}. Select any of them to explore how
                you can leverage your skills to transition into a new career.
              </Paragraph>
            )}
          </div>
          <div>
            <Dialog
              onOpenChange={setDialogOpen}
              open={dialogOpen}
              trigger={
                <Button onClick={() => setDialogOpen(true)}>
                  Search Again
                </Button>
              }
            >
              <Form setOpen={setDialogOpen} />
            </Dialog>
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
        <div>
          {!isLoading && !matches && (
            <div className="flex flex-col items-center justify-center gap-3">
              <Paragraph size="large">
                AI was unable to provide job roles with transferrable skills
                similar to {capitalizeWords(profession)} in{" "}
                {capitalizeWords(province)}.
              </Paragraph>
              <Paragraph size="large">
                Try searching for a different job role or province.
              </Paragraph>
            </div>
          )}
        </div>
        <div>{renderRoadmap}</div>
      </div>
      <Footer />
    </>
  );
};

export default ExplorePage;
