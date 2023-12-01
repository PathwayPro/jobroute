import { useRouter } from "next/router";
import { capitalizeWords } from "@/utils/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/ui/Button";
import RoadmapCards from "@/components/roadmap/RoadmapCards";
import { useEffect } from "react";
import { provincesLowercase } from "@/provinces";

type TitleContent = {
  title: string;
  content: string[];
};

interface RoadmapProps {
  profession: string;
  industry: string;
  province: string;
  overview: string;
  overviewLoader: boolean;
  infoLoader: boolean;
  skillsLoader: boolean;
  info: TitleContent[];
  skills: TitleContent[];
}

const Roadmap: React.FC<RoadmapProps> = () => {
  const router = useRouter();
  const { profession, province } = router.query as {
    profession: string;
    province: string;
  };

  const allowedProvince = provincesLowercase.includes(province?.toLowerCase())

  useEffect(() => {
    if (!profession || !province || !allowedProvince) {
      router.push("/");
      return;
    }
  }, [profession, province])

  const handleSearchAgain = () => {
    router.push("/");
  };

  return (
    <>
      <Navbar />
      <div className="m-auto mt-[50px] flex max-w-[1500px] grow flex-col gap-10 p-10 px-[88px]">
        <div className="flex items-center justify-between rounded-xl bg-[#F0F0F0] px-12 py-6">
          <h2>
            {capitalizeWords(profession)} in {capitalizeWords(province)}
          </h2>
          <div>
            <Button onClick={handleSearchAgain}>Search again</Button>
          </div>
        </div>
        <RoadmapCards profession={profession} province={province} />
      </div>
      <Footer />
    </>
  );
};

export default Roadmap;
