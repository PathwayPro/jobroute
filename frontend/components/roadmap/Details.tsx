import { DetailsProps } from '@/types/PropsTypes';
import Info from './Info';
import Overview from './Overview';
import Skills from './Skills';
import { Header3, HrDashed } from '../Elements';
import { InfoLoader, OverviewLoader, SkillsLoader } from './Loaders';

const Details: React.FC<DetailsProps> = ({
  overviewLoader,
  infoLoader,
  skillsLoader,
  overview,
  info,
  skills,
}) => {
  return (
    <div>
      {overviewLoader ? (
        <OverviewLoader />
      ) : (
        <>
          <Header3 className='text-primary-text'>Overview</Header3>
          <Overview overview={overview} />
        </>
      )}

      <HrDashed className='mt-[3rem]' />
      <Header3 className='mb-[-2rem] mt-8 text-primary-text'>Info</Header3>
      {infoLoader ? <InfoLoader /> : <Info info={info} />}
      <HrDashed className='mt-[3rem]' />
      {skillsLoader ? <SkillsLoader /> : <Skills skills={skills} />}
    </div>
  );
};

export default Details;
