import Footer from "@/components/Footer";
import RoadmapCards from "@/components/RoadmapCards";
import TopHead from "@/components/TopHead";
import CommonDetails from "@/components/commonDetails/CommonDetails";

const Roadmap = () => {
  return <div>
    <TopHead />
    <div className='min-h-[55px] bg-secBg flex justify-between items-center p-8'>
      <span className='text-4xl font-bold text-white'>
        Data Scientist Roadmap - Canada
      </span>
      <button className='btn bg-secBg btn-outline'>Search again</button>
    </div>

    <div className='flex justify-between'>
      <RoadmapCards />
      <CommonDetails />
    </div>
    <Footer />
  </div >

}

export default Roadmap;
