import Image from 'next/image';
import { Header3, HrDashed } from '../Elements';
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
    <Header3 className='mt-12 text-primary-text'>Info</Header3>
    <div className='grid grid-cols-2 gap-4'>
      {info.map((card: TitleContent, i: number) => {
        return <div className={ `border-solid border-2 shadow-xl p-3 card card-body ${card.title === WORK && 'row-span-2 mb-24'}` } key={i}>
          <div className='flex items-center gap-4'>
            <Image src={defIcon(card.title)} width={40} height={40} alt='Info icon' />
            <span className='text-sm card-title'>{card.title}</span>
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
