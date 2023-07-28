import React, { ReactNode } from 'react';

export const HrDashed = () => {
  return <>
    <div className="my-4 border border-gray-300 border-dashed"></div>
  </>
}

interface Header2Props {
  children: ReactNode;
  className?: string;
}

export const Header2: React.FC<Header2Props> = ({ children, className }) => {
  return (
    <h2 className={`text-2xl card-title $`}>{children}</h2>
  );
};
