import Body from '@/components/Body';
import Footer from '@/components/Footer';
import { apiMain } from '@/tools/routes';
import { MainProps } from '@/types/PropsTypes';
import Navbar from '@/components/Navbar';

const Home: React.FC<MainProps> = (props) => {
  return (
    <div className='flex flex-col justify-around min-h-screen'>
      <Navbar />
      <Body provinces={props.provinces} />
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
    },
  };
}

export default Home;
