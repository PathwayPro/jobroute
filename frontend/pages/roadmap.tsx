import Footer from "@/components/Footer";
import Cards from "@/components/roadmap/Cards";
import TopHead from "@/components/TopHead";
import Details from "@/components/roadmap/Details";
import { Btn, Header2 } from "@/components/Elements";
import Link from "next/link";
import { apiRoadmap } from "@/tools/routes";
import { RoadmapProps } from "@/types/PropsTypes";

const Roadmap: React.FC<RoadmapProps> = ({ cards, overview, info, skills }) => {
  return <div>
    <TopHead />
    <div className='h-[7.44rem] bg-secondary flex justify-between items-center'>
      <Header2 className='ms-[4rem] mb-[.5rem]'>
        Data Scientist Roadmap - Canada
      </Header2>
      <Link href='/' className='me-[4.2rem] '>
        <Btn color='outline-light'
          className='btn w-[19.5625rem] h-[3.56rem] '>
          Search again
        </Btn>
      </Link>
    </div>

    <div className='my-12 mx-[4rem] grid grid-cols-[8.8fr,6fr] gap-[5.5rem]'>
      <Cards cards={cards} />
      <Details overview={overview} info={info} skills={skills} />
    </div>
    <Footer />
  </div >
}

export default Roadmap;

export const getStaticProps = async () => {
  const response = await fetch(apiRoadmap);
  const data = await response.json();
  const { cards, overview, info, skills } = data;
  return {
    props: { cards, overview, info, skills }
  }
}
