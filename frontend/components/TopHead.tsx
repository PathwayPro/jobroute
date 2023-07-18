import Image from 'next/image';
import Logo from './Logo';

const TopHead = () => {
  return (
      <div className='w-screen h-[64px] flex justify-center p-3 bg-primeBg'>
        <Logo />
      </div>
  )
}

export default TopHead;

