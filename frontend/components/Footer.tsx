import Logo from './Logo';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className='text-primeColor col-span-12 flex justify-around items-center h-[165px] align-center' style={{ backgroundColor: 'rgba(62, 62, 62, 1)' }}>

      <div className='flex justify-between gap-12'>
        <Logo />
        <span>© 2023 JobRoute. All rights reserved</span>
      </div>

      <div className='flex justify-between gap-8'>
        <Link href='/terms' className='flex items-center '>
          <span>Terms & Policies</span>
        </Link >
        <Link href='/privacy' className='flex items-center'>
          <span>Privacy Policy</span>
        </Link>
        <Link href='/contact' className='flex items-center'>
          <span>Contact</span>
        </Link>
      </div>
    </footer>
  )
}

export default Footer;
