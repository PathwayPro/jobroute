import Footer from "@/components/Footer";
import Cards from "@/components/roadmap/Cards";
import TopHead from "@/components/TopHead";
import Details from "@/components/roadmap/Details";
import { Btn } from "@/components/Elements";
import Link from "next/link";
import { apiRoadmap } from "@/tools/routes";
import { RoadmapProps } from "@/types/PropsTypes";

const Roadmap: React.FC<RoadmapProps> = ({ cards, overview, info, skills }) => {
  return <div>
    <TopHead />
    <div className='min-h-[55px] bg-secondary flex justify-between items-center p-8'>
      <span className='text-4xl font-bold text-white'>
        Data Scientist Roadmap - Canada
      </span>
      <Link href='/'><Btn color='outline-light' className='mb-0'>Search again</Btn></Link>
    </div>

    <div className='mx-12 my-12 grid grid-cols-2 gap-12'>
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
