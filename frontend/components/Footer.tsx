import Link from 'next/link';
import { Logo } from './Elements';

const Footer = () => {
  return (
    <footer className='text-light-color flex justify-around items-center h-[10.3rem] mt-[13.5rem] align-center' style={{ backgroundColor: 'rgba(62, 62, 62, 1)' }}>

      <div className='flex content-center justify-between gap-12'>
        <Logo />
        <span>© 2023 JobRoute. All rights reserved</span>
      </div>

      <div className='flex justify-between gap-8'>
        <span className='flex items-center '>
          <span>Terms & Policies</span>
        </span >
        <span className='flex items-center'>
          <span>Privacy Policy</span>
        </span>
        <span className='flex items-center'>
          <span>Contact</span>
        </span>
      </div>
    </footer>
  )
}

export default Footer;
