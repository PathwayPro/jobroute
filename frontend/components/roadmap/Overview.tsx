
import { useState } from 'react';
import { Button, Header3 } from '../Elements';
import { RoadmapProps } from '@/types/PropsTypes';

const Overview = ({ overview }: any) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const containerClasses = `overflow-hidden ${expanded ? 'h-auto' : 'h-16'}`;
  const maxChars = 200;
  const truncatedOverview = overview[0] ? overview[0].slice(0, maxChars) : '';

  return (
    <div>
      <div className={containerClasses}>
        <p>{expanded ? overview : truncatedOverview}</p>
      </div>
      {!expanded ? (
        <Button color='outline-dark'
          className='mt-4 w-[13rem] h-[2.5rem]'
          onClick={toggleExpand}
        >
          Continue reading
        </Button>
      ) : (
        <Button color='outline-square-dark'
          className='w-12 mt-4'
          onClick={toggleExpand}
        >
          <svg xmlns='http://www.w3.org/2000/svg' className='w-6 h-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' /></svg>
        </Button>
      )
      }
    </div>
  );
};

export default Overview;
