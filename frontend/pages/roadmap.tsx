import Footer from "@/components/Footer";
import Cards from "@/components/roadmap/Cards";
import TopHead from "@/components/TopHead";
import Details from "@/components/roadmap/Details";

const Roadmap = () => {
  return <div>
    <TopHead />
    <div className='min-h-[55px] bg-secBg flex justify-between items-center p-8'>
      <span className='text-4xl font-bold text-white'>
        Data Scientist Roadmap - Canada
      </span>
      <button className='btn bg-secBg btn-outline'>Search again</button>
    </div>

    <div className='mx-12 my-12 grid grid-cols-2 gap-12'>
      <Cards />
      <Details />
    </div>
    <Footer />
  </div >

}

export default Roadmap;
