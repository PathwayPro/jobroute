import { useRouter } from "next/router";
import { capitalizeWords } from "@/utils/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/ui/Button";
import RoadmapCards from "@/components/roadmap/RoadmapCards";
import { useEffect, useState } from "react";
import { provincesLowercase } from "@/provinces";
import Dialog from "@/components/Dialog";
import Form from "@/components/Form";

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
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();
  const { profession, province } = router.query as {
    profession: string;
    province: string;
  };

  const allowedProvince = provincesLowercase.includes(province?.toLowerCase());

  useEffect(() => {
    if (!profession || !province || !allowedProvince) {
      router.push("/");
      return;
    }
  }, [profession, province]);

  return (
    <>
      <Navbar />
      <div className="m-auto mt-[50px] flex max-w-[1500px] grow flex-col gap-10 p-10 px-[88px]">
        <div className="flex items-center justify-between rounded-xl bg-[#F0F0F0] px-12 py-6">
          <h2>
            {capitalizeWords(profession)} in {capitalizeWords(province)}
          </h2>
          <div>
            <Dialog
              onOpenChange={setDialogOpen}
              open={dialogOpen}
              trigger={
                <Button onClick={() => setDialogOpen(true)} className="mt-10">
                  Search again
                </Button>
              }
            >
              <Form setOpen={setDialogOpen} />
            </Dialog>
          </div>
        </div>
        <RoadmapCards
          key={`${profession}-${province}`}
          profession={profession}
          province={province}
        />
      </div>
      <Footer />
    </>
  );
};

export default Roadmap;
