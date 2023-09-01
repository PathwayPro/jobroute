import Link from 'next/link';
import { Logo } from './Elements';

const TopHead = () => {
  return (
    <div className='w-[100%] h-[4rem] flex justify-center items-center bg-primary'>
      <Link href='/'>
        <Logo />
      </Link>
    </div>
  )
}

export default TopHead;

