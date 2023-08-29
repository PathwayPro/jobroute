import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import { HrDashed } from '../Elements';

export const CardLoader: React.FC = () => {
  return (
    <SkeletonTheme baseColor="#D7D7D7" highlightColor="#eee" >
      <div className='relative flex-grow flex-shrink-0 pt-3 pl-8 ml-4 border-2 pb-7 bg-hover-input'>
        <Skeleton circle={true} width={100} height={100} className='absolute left-[-5.625rem] mb-[-5rem] top-[53%] transform -translate-y-1/2' />
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
    <SkeletonTheme baseColor="#D7D7D7" highlightColor="#eee" >
      <div className='flex flex-col p-3 bg-hover-input'>
        <Skeleton width={'87%'} height={16} count={3.7} className='ms-3' />
        <Skeleton width={'40%'} height={54} className='mt-3 ms-3' />
      </div>
    </SkeletonTheme>
  );
}

export const InfoLoader = () => {
  return <SkeletonTheme baseColor="#D7D7D7" highlightColor="#eee" >
    <div className='p-3 border-2 border-solid card card-body'>
      <div className='flex justify-start'>
        <Skeleton width={'30%'} containerClassName="flex-1" height={32} className='ms-3' />
        <Skeleton width={'50%'} containerClassName="flex-1" height={30} className='ms-3' />
      </div>
      <HrDashed />
      <Skeleton width={'95%'} height={16} count={2} className='ms-3' />
    </div>

  </SkeletonTheme>
}
