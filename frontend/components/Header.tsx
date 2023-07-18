import TopHead from './TopHead';

const Header = () => {
  return (
    <header className='relative flex flex-col items-center col-span-12'>
      <TopHead />
      <div className='w-screen h-[416px] bg-cover bg-[25%] mb-[5rem]' style={{ backgroundImage: 'url(/img/header-img.png)' }}> </div>
      <div className='text-primeColor flex flex-col justify-around content-center max-w-[50%] p-8 absolute top-[410px] rounded-2xl max-h-[194px] bg-secBg '>
        <h2 className='text-4xl font-bold text-center'>Empowering career decisions for all</h2>
        <p className='text-lg text-center'>Our open-source platform helps graduates, newcomers, and career changers with relevant information and resources</p>
      </div>
    </header>
  )
}

export default Header;

