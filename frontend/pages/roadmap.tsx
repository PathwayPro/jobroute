import Footer from '@/components/Footer';
import fetchServerData from '@/fetch/fetchRoadmap';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import Button from '@/ui/Button';
import { capitalizeWords } from '@/utils/utils';
import RoadmapCards from '@/components/roadmap/RoadmapCards';

type TitleContent = {
  title: string;
  content: string[];
};

interface RoadmapProps {
  profession: string;
  industry: string;
  province: string;
  overview: string;
  overviewLoader: boolean;
  infoLoader: boolean;
  skillsLoader: boolean;
  info: TitleContent[];
  skills: TitleContent[];
}

interface RoadmapItem {
  title: string;
  content: {
    title: string;
    desc: string;
  }[];
}

interface InfoProps {
  title: string;
  content: string[];
}

const Roadmap: React.FC<RoadmapProps> = () => {
  const router = useRouter();
  const { profession, industry, province } = router.query as {
    profession: string;
    industry: string;
    province: string;
  };

  const initCard = { title: '', content: [] };
  const [education, setEducation] = useState<RoadmapItem>(initCard);
  const [educationLoader, setEducationLoader] = useState(true);

  const [qualification, setQualification] = useState<RoadmapItem>(initCard);
  const [qualificationLoader, setQualificationLoader] = useState(true);

  const [networking, setNetworking] = useState<RoadmapItem>(initCard);
  const [networkingLoader, setNetworkingLoader] = useState(true);

  const [overview, setOverview] = useState<string>('');
  const [overviewLoader, setOverviewLoader] = useState<boolean>(true);

  const [info, setInfo] = useState<InfoProps[]>([]);
  const [infoLoader, setInfoLoader] = useState(true);

  const [skills, setSkills] = useState<InfoProps[]>([]);
  const [skillsLoader, setSkillsLoader] = useState(true);

  const [counter, setCounter] = useState(0);

  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    const fetchProps = async () => {
      if (!fetched && profession && province) {
        const getPrompts = async (setter: any, endpoint: string, loader: any) => {
          try {
            const response = await fetchServerData(
              endpoint,
              profession,
              industry,
              province,
            );
            setter(JSON.parse(response));
            loader(false);
          } catch (error: any) {
            if (counter < 8) {
              getPrompts(setter, endpoint, loader);
              setCounter(counter + 1);
              console.warn(`Another attempt to call the ${endpoint} prompt`)
            }
          }

        };

        try {
          getPrompts(setOverview, 'overview', setOverviewLoader);
          getPrompts(setInfo, 'info', setInfoLoader);
          getPrompts(setEducation, 'education', setEducationLoader);
          getPrompts(setQualification, 'qualification', setQualificationLoader);
          getPrompts(setNetworking, 'networking', setNetworkingLoader);
          getPrompts(setSkills, 'skills', setSkillsLoader);
          setFetched(true);
        } catch (error) {
          throw error;
        }
      }
    };
    fetchProps();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [industry, profession, province, fetched]);

  const handleSearchAgain = () => {
    // TODO: reset localStorage
    router.push('/')
  }

  return (
    <>
      <Navbar />
      <div className="max-w-[1500px] m-auto p-10 grow flex flex-col mt-[50px] px-[88px] gap-10">
        <div className="flex justify-around items-center px-12 py-6 bg-[#F0F0F0] rounded-xl">
          <h2>Jobs similar to {capitalizeWords(profession)} in {capitalizeWords(province)}</h2>
          <div>
            <Button onClick={handleSearchAgain}>Search again</Button>
          </div>
        </div>
        <RoadmapCards
          education={education}
          educationLoader={educationLoader}
          qualification={qualification}
          qualificationLoader={qualificationLoader}
          networking={networking}
          networkingLoader={networkingLoader}
          info={info}
          infoLoader={infoLoader}
          skills={skills}
          skillsLoader={skillsLoader}
          overview={overview}
          overviewLoader={overviewLoader}
        />
      </div>
      <Footer />
    </>
  );
};

export default Roadmap;
