export interface OverviewProps {
  content: string;
}

export interface InfoProps {
  salary: string[];
  Degree: string;
  Work: string[];
  "Credential Validation": string;
  "Language Proficiency": string;
}

export interface SkillProps {
  title: string;
  content: string[];
}

export interface EducationProps {
  title: string;
  content: {
    title: string;
    desc: string;
  }[];
}

export interface NetworkingProps {
  title: string;
  content: {
    name: string;
    services: string[];
    website: string;
  }[];
}

export interface QualificationProps {
  regulated: boolean;
  title: string;
  content: {
    title: string;
    desc: string;
  }[];
}
