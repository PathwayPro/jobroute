import { ActionString, CardProps, Field, RoadmapItem, RoadmapProps } from '@/types/PropsTypes';
import Image from 'next/image';
import { CardLoader } from './Loaders';
import { useEffect, useState } from 'react';

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

const Card: React.FC<{ props: RoadmapItem }> = ({ props }) => {
  const {title, content} = props;

  const card = () => {
    return <div className='relative flex-grow flex-shrink-0 pt-3 pl-8 ml-4 border-2 bg-hover-input'>
      <span className='card-title mb-[-1rem]'>
        {title}
      </span>
      <Image className='h-[5.625rem] w-[6.875rem] absolute left-[-3.75rem] top-[50%] transform -translate-y-1/2'
        src={defIcon(title)}
        width={110} height={90}
        alt='card icons' />
      <ol className='list-decimal list-outside ms-3 card-body'>
        {content.map((field: Field, i: number) => {
          return <ListItem field={field} key={i} />
        })}
      </ol>
    </div>
  }

  try {
    return card();
  }
  catch {
    return <CardLoader />
  }
}

export default Card;

