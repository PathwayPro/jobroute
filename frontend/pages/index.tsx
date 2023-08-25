import Body from '@/components/Body';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { apiMain } from '@/tools/routes';

import { Inter } from 'next/font/google'
import { MainProps } from '@/types/PropsTypes';

const inter = Inter({ subsets: ['latin'] })

const Home: React.FC<MainProps> = (props) => {
  return (
    <div className='flex flex-col justify-around min-h-screen'>
      <Header />
      <Body provinces={props.provinces} searchBy={props.searchBy} />
      <Footer />
    </div>
  )
}

export const getStaticProps = async () => {
  const response = await fetch(apiMain);
  const data = await response.json();

  return {
    props: {
      provinces: data.provinces,
      searchBy: data.searchby,
    },
  };
}

export default Home;
