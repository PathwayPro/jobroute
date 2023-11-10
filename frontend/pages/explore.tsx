import Navbar from "@/components/Navbar";
import { fetchMatches } from '@/fetch/fetchProfessionMatch';
import PercentageCard from "@/components/PercentageCard";
import { professionsMatch } from "@/tools/mocks";
import Button from "@/ui/Button";
import Paragraph from "@/ui/Paragraph";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Matches {
  title: string;
  Percentage: string;
  NOC: string;
}

interface Profession {
  title: string;
  percentage: string;
  salary?: string;
  NOC: string;
  isActive: boolean;
}

interface Response {
  title: string;
  content: Matches[];
}

const ExplorePage = () => {
  const router = useRouter();
  const [fetched, setFetched] = useState(false);
  const [matches, setMatches] = useState<Matches[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [professions, setProfessions] = useState<Profession[]>([]);
  const { profession, province } = router.query as {
    profession: string;
    province: string;
  };


  useEffect(() => {
    const fetchProps = async () => {
      if (!fetched && profession && province) {
        const getPrompts = async (endpoint: string) => {
          try {
            const response = await fetchMatches(
              endpoint,
              profession,
              province
            );
            const parsedResponse: Response = JSON.parse(response);
            setIsLoading(false);
            return parsedResponse;
          } catch (error: any) {
            console.log(error)
            setIsLoading(false);
          }

        };

        try {
          const matches = await getPrompts('professionMatch');
          setMatches(matches?.content)
          setFetched(true);
        } catch (error) {
          throw error;
        }
      }
    };
    fetchProps();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profession, province, fetched]);

  useEffect(() => {
    if (!isLoading && matches && matches?.length > 0) {

      const professionList = matches.map((match) => {
        if (match.title === matches[0].title) {
          return {
            title: match.title,
            percentage: match.Percentage,
            NOC: match.NOC,
            isActive: true,
          }
        }
        return {
          title: match.title,
          percentage: match.Percentage,
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
          : { ...profession, isActive: false }
      )
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
            <h2>Jobs similar to {profession} in {province}</h2>
            <Paragraph>Your current occupation matches with several professions in {province}. Select any of them to explore how you can leverage your skills to transition into a new career.</Paragraph>
          </div>
          <div>
            <Button onClick={handleSearchAgain}>Search again</Button>
          </div>
        </div>
        <div className="flex justify-evenly">
          {!isLoading && matches && professions?.map((profession) => (
            <PercentageCard
              key={profession.title}
              percentage={profession.percentage}
              title={profession.title}
              noc={profession.NOC}
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