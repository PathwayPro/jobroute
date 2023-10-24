import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface HeaderProps {
  children: ReactNode;
  className?: string;
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
  | 'primary-medium'
  | 'primary-small'
  | 'secondary'
  | 'outlined';
  children: ReactNode;
  loading?: boolean;
}

export type RequestType = {
  province: string;
  industry: string;
  profession: string;
};

export type SelectProps = {
  className?: string;
  styleCaption?: string;
  styleSelect?: string;
  label?: string;
  options: string[];
  disabled?: 'none' | number[];
  defaultValue?: '' | number;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export type InputProps = {
  className?: string;
  styleCaption?: string;
  styleInput?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  type?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export interface MainProps {
  provinces: string[];
}

export interface RoadmapItem {
  title: string;
  content: {
    title: string;
    desc: string;
  }[];
}

export type TitleContent = {
  title: string;
  content: string[];
};

export type InfoProps = { info: TitleContent[] };

export type SkillsProps = { skills: TitleContent[] };

export type CardProps = {
  education: RoadmapItem;
  experience: RoadmapItem;
  networking: RoadmapItem;
};

export interface RoadmapProps {
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

export interface DetailsProps
  extends Omit<RoadmapProps, 'profession' | 'industry' | 'province'> { }

export interface Field {
  title: string;
  desc: string;
}

export interface ActionString {
  condition: () => boolean;
  action: () => string;
}

export interface ActionBool {
  condition: () => boolean;
  action: () => boolean;
}
