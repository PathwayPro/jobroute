import { Iconly } from "react-iconly";

const icon = {
  'overview': 'Chat',
  'info': 'InfoSquare',
  'skills': 'TickSquare',
  'education': 'Work',
  'certification': 'Star',
  'networking': 'TwoUsers',
}

const title = {
  'overview': 'Overview',
  'info': 'Info',
  'skills': 'Hard / Soft Skills',
  'education': 'Education / Training',
  'certification': 'Licensing / Certification',
  'networking': 'Job Search / Networking',
}

export enum BadgeType {
  Overview = "overview",
  Info = "info",
  Skills = "skills",
  Education = "education",
  Certification = "certification",
  Networking = "networking",
}

interface BadgeProps {
  type: 'overview' | 'info' | 'skills' | 'education' | 'certification' | 'networking';
}

const Badge = ({ type }: BadgeProps) => {
  function getTitle() {
    return title[type];
  };

  return (
    <div className="inline-flex w-max items-center bg-black p-2 rounded-full max-w-[250px] shadow-md">
      <div className="bg-white rounded-full p-1">
        <Iconly name={icon[type]} set="bold" primaryColor="black" size={20} />
      </div>
      <span className="ml-2 text-sm pr-2 font-bold uppercase text-white">{getTitle()}</span>
    </div>
  )
}

export default Badge;