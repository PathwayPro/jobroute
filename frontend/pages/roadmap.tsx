import Footer from '@/components/Footer';
import fetchServerData from '@/fetch/fetchRoadmap';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import Button from '@/ui/Button';
import { capitalizeWords } from '@/utils/utils';
import { Field } from '@/types/PropsTypes';
import Paragraph from '@/ui/Paragraph';
import Card from '@/components/roadmap/Card';

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


  const InfoMinimized = (info: InfoProps[]) => {
    return (
      <div className='grid grid-cols-2 gap-2 h-[180px]'>
        {info.map((field: InfoProps) => (
          <div className='flex flex-col bg-light-gray rounded-xl p-2 h-[80px] line-clamp-1' key={field.title}>
            <p className="text-sm font-bold">{field.title}</p>
            {field.content.map((content: string) => (
              <p className='text-xs line-clamp-1' key={content}>{content}</p>
            ))}
          </div>
        ))}
      </div>
    )
  }

  const TextContentMinimized = (info: { title: string, desc: string }[]) => {
    return (
      info.map((field: Field) => (
        <div key={field.title}>
          <Paragraph className='mb-1' weight='bold'>{field.title}</Paragraph>
          <Paragraph className='mb-2'>{field.desc}</Paragraph>
        </div>
      ))
    )
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-evenly gap-8">
          <Card type="overview" isLoading={overviewLoader}>
            <Paragraph>
              {overview}
            </Paragraph>
          </Card>
          <Card type="info" color="white" isLoading={infoLoader} minimizedContent={InfoMinimized(info)}>
            <div className="grid grid-cols-2 gap-6">
              {info.map((field: InfoProps) => (
                <div className='bg-light-gray rounded-xl p-6 min-h-[200px]' key={field.title}>
                  <Paragraph className='mb-2' weight='bold'>{field.title}</Paragraph>
                  {field.content.map((content: string) => (
                    <Paragraph key={content}>{content}</Paragraph>
                  ))}
                </div>
              ))
              }
            </div>
          </Card>
          <Card type="skills" color="brown" isLoading={skillsLoader}>
            <div className="grid grid-cols-2 gap-6">
              {skills.map((field: InfoProps) => (
                <div key={field.title}>
                  <Paragraph className='mb-2' weight='bold'>{field.title}</Paragraph>
                  {field.content.map((content: string) => (
                    <Paragraph className='mb-1 line-clamp-1' key={content}>• {content}</Paragraph>
                  ))}
                </div>
              ))
              }
            </div>
          </Card>
          <Card type="education" color='brown' isLoading={educationLoader} minimizedContent={TextContentMinimized(education.content)}>
            <div className="flex flex-col justify-around">
              {education.content.map((field: Field) => (
                <div key={field.title}>
                  <Paragraph className='mb-1' weight='bold'>{field.title}</Paragraph>
                  <Paragraph className='mb-2'>{field.desc}</Paragraph>
                </div>
              ))
              }
            </div>
          </Card>
          <Card type="certification" isLoading={qualificationLoader} minimizedContent={TextContentMinimized(qualification.content)}>
            <div className="flex flex-col justify-around">
              {qualification.content.map((field: Field) => (
                <div key={field.title}>
                  <Paragraph className='mb-1' weight='bold'>{field.title}</Paragraph>
                  <Paragraph className='mb-2'>{field.desc}</Paragraph>
                </div>
              ))
              }
            </div>
          </Card>
          <Card type="networking" color='white' isLoading={networkingLoader} minimizedContent={TextContentMinimized(networking.content)}>
            <div className="flex flex-col justify-around">
              {networking.content.map((field: Field) => (
                <div key={field.title}>
                  <Paragraph className='mb-1' weight='bold'>{field.title}</Paragraph>
                  <Paragraph className='mb-2'>{field.desc}</Paragraph>
                </div>
              ))
              }
            </div>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Roadmap;
