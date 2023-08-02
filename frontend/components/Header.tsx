import { Header2, HeaderText } from './Elements';
import TopHead from './TopHead';

const Header = () => {

  return (
    <header className='relative flex flex-col items-center col-span-12'>
      <TopHead />
      <div className='w-screen h-[416px] bg-cover bg-[25%] mb-[5rem]' style={{ backgroundImage: 'url(/img/header-img.png)' }}> </div>
      <div className='text-primeColor flex flex-col justify-around content-center w-[50.3rem] p-8 absolute top-[410px] rounded-2xl max-h-[7.63rem] bg-secondary '>
        <Header2 className='text-light-color'>Empowering career decisions for all</Header2>
        <HeaderText className='text-center text-light-color'>Our open-source platform helps graduates, newcomers, and career changers with relevant information and resources</HeaderText>
      </div>
    </header>
  )
}

export default Header;

