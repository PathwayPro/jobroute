import { Iconly } from "react-iconly";

const icon = {
  overview: "Chat",
  info: "InfoSquare",
  combinedSkills: "TickSquare",
  education: "Work",
  qualification: "Star",
  networking: "TwoUsers",
};

const title = {
  overview: "Overview",
  info: "Info",
  combinedSkills: "Hard / Soft Skills",
  education: "Education / Training",
  qualification: "Licensing / Certification",
  networking: "Job Search / Networking",
};

export enum BadgeType {
  Overview = "overview",
  Info = "info",
  Skills = "skills",
  Education = "education",
  Qualification = "qualification",
  Networking = "networking",
}

interface BadgeProps {
  type:
  | "overview"
  | "info"
  | "combinedSkills"
  | "education"
  | "qualification"
  | "networking";
}

const Badge = ({ type }: BadgeProps) => {
  function getTitle() {
    return title[type].toUpperCase();
  }

  return (
    <div style={{ padding: '4px 20px 4px 4px' }} className="flex w-max items-center gap-3 rounded-full bg-black shadow-md">
      <div className="w-max rounded-full bg-white p-1">
        <Iconly name={icon[type]} set="bold" primaryColor="black" size={20} />
      </div>
      <span className="mr-4 text-sm font-bold text-white">{getTitle()}</span>
    </div>
  );
};

export default Badge;
