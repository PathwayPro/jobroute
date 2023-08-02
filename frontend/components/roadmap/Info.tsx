import Image from 'next/image';
import { Header2, HrDashed } from '../Elements';
import { ActionString, RoadmapProps, TitleContent } from '@/types/PropsTypes';

const SALARY = 'Salary';
const DEGREE = 'Degree';
const WORK = 'Work';
const VALIDATION = 'Credential Validation';
const LANGUAGE = 'Language Proficiency';

const Info = ({info}: Pick<RoadmapProps, 'info'>) => {
  const defIcon = (title: string): string => {
    const actions: ActionString[] = [
      {
        condition: () => title === SALARY,
        action: () => '/img/salary.svg',
      },
      {
        condition: () => title === DEGREE,
        action: () => '/img/degree.svg',
      },
      {
        condition: () => title === WORK,
        action: () => '/img/work.svg',
      },
      {
        condition: () => title === VALIDATION,
        action: () => '/img/validation.svg',
      },
      {
        condition: () => title === LANGUAGE,
        action: () => '/img/language.svg',
      },
    ];

    const action = actions.find(({ condition }) => condition());

    if (action) return action.action();

    console.warn('cannot find proper icon to show');

    return '/img/work.svg';
  }


  return <div className='mt-12'>
    <HrDashed />
    <Header2 className='mt-12'>Info</Header2>
    <div className='grid grid-cols-2 gap-8'>
      {info.map((card: TitleContent, i: number) => {
        return <div className={ `border-solid border-2 shadow-xl card card-body ${card.title === WORK && 'row-span-2'}` } key={i}>
          <div className='flex items-center gap-4'>
            <Image src={defIcon(card.title)} width={60} height={60} alt='Info icon' />
            <span className='card-title'>{card.title}</span>
          </div>
          <HrDashed />
          {
            card.content.map((field, i) => {
              return <div key={i}>
                {field}
              </div>
            })
          }
        </div>
      })}
    </div>
  </div>
}

export default Info;
