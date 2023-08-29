import Footer from '@/components/Footer';
import TopHead from '@/components/TopHead';
import Details from '@/components/roadmap/Details';
import { Btn, Header2 } from '@/components/Elements';
import Link from 'next/link';
import { apiRoadmap } from '@/tools/routes';
import { RoadmapItem, RoadmapProps } from '@/types/PropsTypes';
import Card from '@/components/roadmap/Card';
import fetchServerData from '@/fetch/cards';
import { useEffect, useState } from 'react';
import { CardLoader } from '@/components/roadmap/Loaders';

const Roadmap: React.FC<RoadmapProps> = ({ profession, industry, province, overview, info, skills }) => {
  const initCard = { title: '', content: [] };
  const [education, setEducation] = useState<RoadmapItem>(initCard);
  const [educationLoader, setEducationLoader] = useState(true);

  const [experience, setExperience] = useState<RoadmapItem>(initCard);
  const [experienceLoader, setExperienceLoader] = useState(true);

  const [networking, setNetworking] = useState<RoadmapItem>(initCard);
  const [networkingLoader, setNetworkingLoader] = useState(true);



  useEffect(() => {
    const fetchProps = async () => {
      try {
        const education = await fetchServerData('education', 'data scientist', 'it', 'alberta');
        setEducation(education);
        setEducationLoader(false);

        const experience = await fetchServerData('experience', 'data scientist', 'it', 'alberta');
        setExperience(experience);
        setExperienceLoader(false);

        const networking = await fetchServerData('networking', 'data scientist', 'it', 'alberta');
        setNetworking(networking);
        setNetworkingLoader(false);

      } catch (error) {
        throw error;
      } 
    }
   fetchProps();
  }, [])
  return <div>
    <TopHead />
    <div className='h-[7.44rem] bg-secondary flex justify-between items-center'>
      <Header2 className='ms-[4rem] mb-[.5rem]'>
        Data Scientist Roadmap - Canada
      </Header2>
      <Link href='/' className='me-[4.2rem] '>
        <Btn color='outline-light'
          className='btn w-[19.5625rem] h-[3.56rem] '>
          Search again
        </Btn>
      </Link>
    </div>

    <div className='my-12 mx-[4rem] grid grid-cols-[8.8fr,6fr] gap-[5.5rem]'>
      <div className='grid grid-cols-12'>
        <div className='w-[3.75rem] bg-gradient-to-b from-yellow-400 via-orange-600 to-blue-600'></div>
        <div className='flex flex-col h-full col-span-11'>
          <div className='flex flex-col flex-grow gap-5'>
            {educationLoader ? <CardLoader /> : <Card props={education} />}
            {experienceLoader ? <CardLoader /> : <Card props={experience} />}
            {networkingLoader ? <CardLoader /> : <Card props={networking} />}
          </div>
        </div>
      </div>
      <Details overview={overview} info={info} skills={skills} />
    </div>
    <Footer />
  </div >
}

export default Roadmap;

export const getStaticProps = async () => {
  const response = await fetch(apiRoadmap);
  const data = await response.json();
  const { education, projects, networking, overview, info, skills } = data;
  return {
    props: { education, projects, networking, overview, info, skills }
  }
}
