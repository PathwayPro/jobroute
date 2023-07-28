import Image from 'next/image';

interface RoadmapItem {
  title: string;
  content: {
    title: string,
    desc: string,
  }[],
};

interface Field {
  title: string;
  desc: string;
}

const EDUCATION = 'Education / Training';
const EXPERIENCE = 'Experience / Projects';
const LICENSING = 'Licensing / Certification';
const NETWORKING = 'Job Search / Networking';

const defIcon = (title: string): string => {
  type Action = {
    condition: () => boolean;
    action: () => string;
  };

  const actions: Action[] = [
    {
      condition: () => title === EDUCATION,
      action: () => '/img/education.svg',
    },
    {
      condition: () => title === EXPERIENCE,
      action: () => '/img/experience.svg',
    },
    {
      condition: () => title === LICENSING,
      action: () => '/img/licensing.svg',
    },
    {
      condition: () => title === NETWORKING,
      action: () => '/img/networking.svg',
    },
  ];

  const action = actions.find(({ condition }) => condition());

  if (action) return action.action();

  console.warn('cannot find proper icon to show');

  return '/img/networking.svg';
};

const Cards = () => {
  const roadmap: RoadmapItem[] = [
    {
      title: 'Education / Training',
      content: [
        { title: 'Step 1', desc: 'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.' },
        { title: 'Step 2', desc: 'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.' },
        { title: 'Step 3', desc: 'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.' },
      ],
    },
    {
      title: 'Experience / Projects',
      content: [
        { title: 'Step 1', desc: 'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.' },
        { title: 'Step 2', desc: 'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.' },
        { title: 'Step 3', desc: 'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.' },
      ],
    },
    {
      title: 'Job Search / Networking',
      content: [
        { title: 'Step 1', desc: 'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.' },
        { title: 'Step 2', desc: 'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.' },
        { title: 'Step 3', desc: 'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.' },
      ],
    },
  ];

  const cards = (list: RoadmapItem[]) => {
    return <div className='flex flex-col h-full overflow-y-auto gap-8 col-span-11'>
      <div className='flex flex-col flex-grow gap-12'>
        {list.map((card: any, i: any) => {
          return <div className='flex-grow flex-shrink-0 relative bg-[#EFEFEF] pt-3 pl-8 ml-12 border-2' key={i}>
            <span className='card-title'>{card.title}</span>
            <Image className='absolute left-[-45px] top-[50%] transform -translate-y-1/2'
              src={defIcon(card.title)} width={90} height={90} alt='card icons' />
            <ol className='list-decimal list-outside card-body'>
              {card.content.map((field: Field, i: any) => {
                return <li key={i}>
                  <span>{field.title}: </span>
                  <span>{field.desc}</span>
                </li>
              })}
            </ol>
          </div>
        })}
      </div>
    </div>
  }

  return <div className='grid grid-cols-12'>
    <div className='w-[60px] bg-gradient-to-b from-yellow-400 via-orange-600 to-blue-600'></div>
    {cards(roadmap)}

  </div>

}

export default Cards;
