import { DetailsProps } from "@/types/PropsTypes";
import Info from "./Info";
import Overview from "./Overview";
import Skills from "./Skills";

const Details: React.FC<DetailsProps> = ({ overview, info, skills }) => {

  return <div>
    <Overview overview={overview} />
    <Info info={info} />
    <Skills skills={skills} />

  </div>
}

export default Details;
