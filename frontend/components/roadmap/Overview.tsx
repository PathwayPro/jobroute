
import { useState } from 'react';
import { HrDashed, Header2 } from '../Elements';

const Overview = () => {
  const overview = 'Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.';

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
        <button
          className="mt-4 btn btn-outline"
          onClick={toggleExpand}
        >
          Continue reading
        </button>
      ) : (
        <button className='mt-4 btn btn-square btn-outline'
          onClick={toggleExpand}
        >
          <svg xmlns='http://www.w3.org/2000/svg' className='w-6 h-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' /></svg>
        </button>
      )
      }
    </div>
  );
};

export default Overview;
