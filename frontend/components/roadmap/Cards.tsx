import { ActionString, Field, RoadmapItem, RoadmapProps } from '@/types/PropsTypes';
import Image from 'next/image';

const defIcon = (title: string): string => {
  const EDUCATION = 'Education / Training';
  const EXPERIENCE = 'Experience / Projects';
  const LICENSING = 'Licensing / Certification';
  const NETWORKING = 'Job Search / Networking';

  const actions: ActionString[] = [
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

const ListItem: React.FC<{ field: Field }> = ({ field }) => {
  return <li>
    <span>{field.title}: </span>
    <span>{field.desc}</span>
  </li>
}

const Card: React.FC<{ card: RoadmapItem }> = ({ card }) => {
  return <div className='relative flex-grow flex-shrink-0 pt-3 pl-8 ml-5 border-2 bg-hover-input'>
    <span className='card-title'>{card.title}</span>
    <Image className='absolute left-[-60px] top-[50%] transform -translate-y-1/2'
      src={defIcon(card.title)} width={110} height={90} alt='card icons' />
    <ol className='list-decimal list-outside ms-3 card-body'>
      {card.content.map((field: Field, i: number) => {
        return <ListItem field={field} key={i} />
      })}
    </ol>
  </div>
}

const Cards = ({ cards }: Pick<RoadmapProps, 'cards'>) => {

  const cardsShow = (list: RoadmapItem[]) => {
    return <div className='flex flex-col h-full gap-8 col-span-11'>
      <div className='flex flex-col flex-grow gap-12'>
        {list.map((card: RoadmapItem, i: number) => {
          return <Card card={card} key={i} />
        })}
      </div>
    </div>
  }

  return <div className='grid grid-cols-12'>
    <div className='w-[3.75rem] bg-gradient-to-b from-yellow-400 via-orange-600 to-blue-600'></div>
    {cardsShow(cards)}

  </div>

}

export default Cards;

