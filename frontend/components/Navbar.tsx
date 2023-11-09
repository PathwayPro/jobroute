import Logo from '@/ui/Logo';
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className='fixed top-0 z-10 w-full h-8 bg-white p-8 flex justify-between items-center'>
      <Link href='/'>
        <Logo variant="primary" />
      </Link>
    </div>
  )
}

export default Navbar;

