
import { useState } from 'react';
import { Btn, Header2 } from '../Elements';
import { RoadmapProps } from '@/types/PropsTypes';

const Overview = ({overview}: Pick<RoadmapProps, 'overview'>) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const containerClasses = `overflow-hidden ${expanded ? 'h-auto' : 'h-16'}`;
  const maxChars = 200;
  const truncatedOverview = overview.slice(0, maxChars);

  return (
    <div>
      <Header2>Overview</Header2>
      <div className={containerClasses}>
        <p>{expanded ? overview : truncatedOverview}</p>
      </div>
      {!expanded ? (
        <Btn color='outline-dark'
          className='mt-4'
          onClick={toggleExpand}
        >
          Continue reading
        </Btn>
      ) : (
        <Btn color='outline-square-dark'
          className='mt-4'
          onClick={toggleExpand}
        >
          <svg xmlns='http://www.w3.org/2000/svg' className='w-6 h-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' /></svg>
        </Btn>
      )
      }
    </div>
  );
};

export default Overview;
