import { DetailsProps } from "@/types/PropsTypes";
import Info from "./Info";
import Overview from "./Overview";
import Skills from "./Skills";
import { Header3, HrDashed } from "../Elements";
import { InfoLoader } from "./Loaders";

const Details: React.FC<DetailsProps> = ({ overview, info, skills }) => {

  return <div>
    <Header3 className='text-primary-text'>Overview</Header3>
    <Overview overview={overview} />

    <HrDashed />
    <Header3 className='mb-[-2rem] mt-8 text-primary-text'>Info</Header3>
    <Info info={info} />
    <InfoLoader />
    <Skills skills={skills} />

  </div>
}

export default Details;
