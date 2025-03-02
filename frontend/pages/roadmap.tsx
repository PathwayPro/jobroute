import { useRouter } from "next/router";
import { capitalizeWords, validateProvinceCode } from "@/utils/utils";
import { getProvinceName } from "@/utils/provinces";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/ui/Button";
import RoadmapCards from "@/components/roadmap/RoadmapCards";
import { useEffect, useState } from "react";
import Dialog from "@/components/Dialog";
import Form from "@/components/Form";
import Head from "next/head";

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
  
  // Add loading state
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Wait for router to be ready
    if (!router.isReady) return;
    
    setIsLoading(false);
    
    // Now check params
    const { profession, province } = router.query as {
      profession: string;
      province: string;
    };
    
    if (!profession || !province || !validateProvinceCode(province)) {
      router.push('/');
      return;
    }
  }, [router.isReady, router]);

  // Don't render anything while loading
  if (isLoading) return null;

  const { profession, province } = router.query as {
    profession: string;
    province: string;
  };

  return (
    <>
      <Head>
        <title>
          {capitalizeWords(profession)} in {getProvinceName(province)}
        </title>
      </Head>
      <Navbar />
      <div className="m-auto mt-[50px] flex max-w-[1500px] grow flex-col gap-10 p-10 px-[88px]">
        <div className="flex items-center justify-between rounded-xl bg-[#F0F0F0] px-12 py-6">
          <h1 className="text-[40px]">
            {capitalizeWords(profession)} in {getProvinceName(province)}
          </h1>
          <div>
            <Dialog
              onOpenChange={setDialogOpen}
              open={dialogOpen}
              trigger={
                <Button onClick={() => setDialogOpen(true)}>
                  Search Again
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
