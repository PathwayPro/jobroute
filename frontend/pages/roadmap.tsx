import Footer from '@/components/Footer';
import Card from '@/components/roadmap/Card';
import fetchServerData from '@/fetch/fetchRoadmap';
import { useEffect, useState } from 'react';
import { CardLoader } from '@/components/roadmap/Loaders';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import Button from '@/ui/Button';
import { capitalize } from '@/utils/utils';
import NewCard from '@/components/roadmap/NewCard';

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

  const [info, setInfo] = useState<any>('');
  const [infoLoader, setInfoLoader] = useState(true);

  const [skills, setSkills] = useState<any>('');
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
            // if(error.message === 'Function execution timed out' && counter < 4) {
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
          <h2>Jobs similar to {capitalize(profession)} in {capitalize(province)}</h2>
          <div>
            <Button onClick={handleSearchAgain}>Search again</Button>
          </div>
        </div>
      </div>
      <NewCard type="education" isLoading={false}>

      </NewCard>


      {/*        {educationLoader ? <CardLoader /> : <Card props={education} />}
              {qualificationLoader ? (
                <CardLoader />
              ) : (
                <Card props={qualification} />
              )}
              {networkingLoader ? <CardLoader /> : <Card props={networking} />}*/}
      {/*<Details
          overviewLoader={overviewLoader}
          infoLoader={infoLoader}
          skillsLoader={skillsLoader}
          overview={overview}
          info={info}
          skills={skills}
              />*/}
      <Footer />
    </>
  );
};

export default Roadmap;
