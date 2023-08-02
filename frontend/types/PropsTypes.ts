import { ButtonHTMLAttributes, ReactNode } from "react";

export interface HeaderProps {
  children: ReactNode;
  className?: string;
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color: 'primary' | 'secondary' | 'outline-light' | 'outline-dark' | 'outline-square-dark';
  children: ReactNode;
  className?: string;
}

export type SelectProps = {
  className?: string;
  label?: string;
  options: string[];
  disabled?: 'none' | number[];
  defaultValue?: '' | number;
  onChange?: (event: any) => void; //TODO run unto the problem couldn't solve it : ChangeEvent<HTMLSelectElement>. Used a quick fix with any type
};

export type InputProps = {
  className?: string;
  label?: string;
  placeholder?: string;
  type?: string;
  onChange?: (event: any) => void;
};


export interface MainProps {
  provinces: string[],
  searchBy: string[],
};

export interface RoadmapItem {
  title: string;
  content: {
    title: string,
    desc: string,
  }[],
};

export type TitleContent = {
  title: string;
  content: string[];
}

export type InfoProps = { info: TitleContent[] };

export type SkillsProps = { skills: TitleContent[] };

export interface RoadmapProps {
  cards: RoadmapItem[];
  overview: string;
  info: TitleContent[];
  skills: TitleContent[];
}

export interface DetailsProps extends Omit<RoadmapProps, 'cards'> { }

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
