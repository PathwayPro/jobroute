import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { HrDashed } from '../Elements';

export const CardLoader: React.FC = () => {
  return (
    <SkeletonTheme baseColor='#D7D7D7' highlightColor='#eee'>
      <div className='relative flex-grow flex-shrink-0 pt-3 pl-8 ml-4 border-2 pb-7 bg-hover-input'>
        <Skeleton
          circle={true}
          width={100}
          height={100}
          className='absolute left-[-5.625rem] mb-[-5rem] top-[53%] transform -translate-y-1/2'
        />
        <Skeleton width={'30%'} height={28} className='mb-7' />
        <Skeleton width={'87%'} height={16} count={2.7} className='ms-7' />
        <Skeleton width={'87%'} height={16} count={2.7} className='ms-7' />
        <Skeleton width={'87%'} height={16} count={2.7} className='ms-7' />
      </div>
    </SkeletonTheme>
  );
};

export const OverviewLoader = () => {
  return (
    <SkeletonTheme baseColor='#D7D7D7' highlightColor='#eee'>
      <div className='flex flex-col p-3 bg-hover-input'>
        <Skeleton width={'87%'} height={16} count={3.7} className='ms-3' />
        <Skeleton width={'40%'} height={54} className='mt-3 ms-3' />
      </div>
    </SkeletonTheme>
  );
};

export const InfoLoader = () => {
  const info = ['loader', 'loader', 'loader', 'loader', 'loader'];
  return (
    <SkeletonTheme baseColor='#D7D7D7' highlightColor='#eee'>
      <div className='mt-12'>
        <div className='grid grid-cols-2 gap-4'>
          {info.map((card: string, i: number) => {
            return (
              <div
                className={`bg-hover-input border-solid border-2 p-3 card card-body ${i === 2 && 'row-span-2 mb-24'
                  }`}
                key={i}
              >
                <Skeleton width={'70%'} height={30} className='ms-3' />
                <HrDashed />
                <Skeleton
                  width={'95%'}
                  height={16}
                  count={i === 2 ? 5 : 2}
                  className='ms-3'
                />
              </div>
            );
          })}
        </div>
      </div>
    </SkeletonTheme>
  );
};


export const SkillsLoader = () => {
  const s = {
    wrapper: 'w-[90%] bg-hover-input border-solid border-2 p-3 card card-body p-5 ml-[-2rem]',
    skeleton: 'mb-4',
  }
  return <SkeletonTheme baseColor='#D7D7D7' highlightColor='#eee'>
    <div className='mt-12'>
      <div className='mt-12 gap-6 grid grid-cols-2 place-items-tip'>
        <div className={s.wrapper}>
          <Skeleton width={'100%'} height={32} className={s.skeleton} />
          <Skeleton width={'90%'} height={16} count={10} />
        </div>
        <div className={s.wrapper}>
          <Skeleton width={'100%'} height={32} className={s.skeleton} />
          <Skeleton width={'80%'} height={16} count={10} />
        </div>
      </div>
    </div>
  </SkeletonTheme>
}


export const AutoLoader = () => {
  return <div className='absolute right-3 w-12 h-10 bg-center bg-no-repeat bg-cover top-[4.1rem]' style={{ backgroundImage: 'url(/img/loader.gif)' }}> </div>
}

