import Footer from '@/components/Footer';
import TopHead from '@/components/Navbar';
import Details from '@/components/roadmap/Details';
import { Button, Header2 } from '@/components/Elements';
import Link from 'next/link';
import { RoadmapItem, RoadmapProps } from '@/types/PropsTypes';
import Card from '@/components/roadmap/Card';
import fetchServerData from '@/fetch/fetchRoadmap';
import { useEffect, useState } from 'react';
import { CardLoader } from '@/components/roadmap/Loaders';
import { useRouter } from 'next/router';

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

  const capitalizeWords = (string: string) => {
    if (string) {
      return string
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
  };

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
  }, [industry, profession, province, fetched]);
  return (
    <div>
      <TopHead />
      <div className='h-[7.44rem] bg-secondary flex justify-between items-center'>
        <Header2 className='ms-[4rem] mb-[.5rem]'>
          {capitalizeWords(profession)} Roadmap - {capitalizeWords(province)}
        </Header2>
        <Link href='/' className='me-[4.2rem] '>
          <Button
            color='outline-light'
            className='Button w-[19.5625rem] h-[3.56rem] '
          >
            Search again
          </Button>
        </Link>
      </div>

      <div className='my-12 mx-[4rem] grid grid-cols-[8.8fr,6fr] gap-[5.5rem]'>
        <div className='grid grid-cols-12'>
          <div className='w-[3.75rem] bg-gradient-to-b from-yellow-400 via-orange-600 to-blue-600'></div>
          <div className='flex flex-col h-full col-span-11'>
            <div className='flex flex-col flex-grow gap-5'>
              {educationLoader ? <CardLoader /> : <Card props={education} />}
              {qualificationLoader ? (
                <CardLoader />
              ) : (
                <Card props={qualification} />
              )}
              {networkingLoader ? <CardLoader /> : <Card props={networking} />}
            </div>
          </div>
        </div>
        <Details
          overviewLoader={overviewLoader}
          infoLoader={infoLoader}
          skillsLoader={skillsLoader}
          overview={overview}
          info={info}
          skills={skills}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Roadmap;
