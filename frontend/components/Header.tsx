import { Header2, HeaderText } from './Elements';
import TopHead from './TopHead';

const Header = () => {

  return (
    <header className='flex flex-col items-center'>
      <TopHead />
      <div className='w-[100%] h-[26rem] bg-cover bg-[center_top_62%] bg-[25%] mb-[5rem]' style={{ backgroundImage: 'url(/img/header-img.png)' }}> </div>
      <div className='flex flex-col justify-around content-center w-[56.8rem] px-12 absolute top-[25.625rem] rounded-2xl h-[12.63rem] bg-secondary '>
        <Header2 className='mt-[2rem] leading-[2.655rem]' >Confused about careers in Canada?<br/>We&apos;ve got you covered!</Header2>
        <HeaderText className='mb-[1.5rem] leading-[1.975rem] text-center text-light-color'>Our open-source platform helps graduates, newcomers, and career changers with relevant information. All you need in one place!</HeaderText>
      </div>
    </header>
  )
}

export default Header;

