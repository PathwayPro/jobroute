import { ButtonHTMLAttributes, ReactNode } from 'react';

export const Logo = () => {
  return (
    <div className='min-w-[12rem] h-[2rem] bg-no-repeat bg-content bg-center' style={{ backgroundImage: 'url(/img/logo.svg)' }}></div>
  )
}

export const HrDashed = () => {
  return <>
    <div className="my-4 border border-gray-300 border-dashed"></div>
  </>
}

interface HeaderProps {
  children: ReactNode;
  className?: string;
}

export const Header1: React.FC<HeaderProps> = ({ children, className }) => {
  return (
    <h1
      className={`  tracking-wide text-5xl font-bold text-left text-titles text-center ${className}`}
    >
      {children}
    </h1>
  );
};

export const Header2: React.FC<HeaderProps> = ({ children, className }) => {
  return (
    <h2 className={` tracking-wide text-2xl font-bold text-center ${className}`}>{children}</h2>
  );
};

export const HeaderText: React.FC<HeaderProps> = ({ children, className }) => {
  return (
    <p className={`text-xl tracking-wide leading-7 ${className}`}>{children}</p>)
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color: 'primary' | 'secondary' | 'tertiary';
  children: ReactNode;
}

export const Btn: React.FC<ButtonProps> = ({ color = 'primary', children, ...rest }) => {
  const defBtn = (color: string) => {
    let btnClasses = 'mb-[1.5rem] btn text-base w-[290px] h-[25px]';

    const PRIMARY = 'primary';
    const SECONDARY = 'secondary';
    const TERTIARY = 'tertiary';

    type Action = {
      condition: () => boolean;
      action: () => string;
    };

    const actions: Action[] = [
      {
        condition: () => color === PRIMARY,
        action: () => btnClasses += ' bg-primJr text-lightJr border-none hover:bg-hoverBtn disabled:bg-disabledBtn',
      },
      {
        condition: () => color === SECONDARY,
        action: () => btnClasses += ' bg-secJr text-lightJr border-none hover:bg-primJr',
      },
      {
        condition: () => color === TERTIARY,
        action: () => btnClasses += ' text-outlineBtn border-outlineBtn btn-outline hover:text-lightJr hover:bg-hoverBtn',
      },
    ];

    const action = actions.find(({ condition }) => condition());

    if (action) return action.action();

    console.warn('Cannot assign correct styles to button');

    return `${btnClasses}`;
  }

  return (
    <button className={defBtn(color)} {...rest}>
      {children}
    </button>
  );
};

type SelectProps = {
  className?: string;
  label?: string;
  options: string[];
  disabled?: 'none' | number[];
  defaultValue?: number;
};

export const Select: React.FC<SelectProps> = ({ className = 'w-[472px]', label, options, disabled = 'none', defaultValue = 0 }) => {
  const textStyle = 'trackng-wide leading-7';

  const checkForDisabled = (disabled: SelectProps['disabled'], i: number) => {
    type Action = {
      condition: () => boolean;
      action: () => boolean;
    };

    const actions: Action[] = [
      {
        condition: () => disabled === 'none',
        action: () => false,
      },
      {
        condition: () => Array.isArray(disabled),
        action: () => (Array.isArray(disabled) ? disabled.includes(i) : false),
      },
    ];

    return actions.some((a) => a.condition()) ? actions.find((a) => a.condition())?.action() ?? false : false;
  };

  return (
    <label className={`${className} ${textStyle} flex flex-col mb-5 gap-y-4`}>
      {label && <span className='text-base text-center'>{label}</span>}

      <select
        defaultValue={options[defaultValue]}
        className='mb-10 text-sm border-black ps-8 bg-disabledBtn hover:bg-hoverBtn active:bg-lightJr select select-bordered'
      >
        {options.map((string: string, i: number) => (
          <option disabled={checkForDisabled(disabled, i)} className='text-sm group-hover:bg-gray-100' key={i}>
            {string}
          </option>
        ))}
      </select>
    </label>
  );
};

type InputProps = {
  className?: string;
  label?: string;
  placeholder?: string;
  type?: string;
};

export const InputField: React.FC<InputProps> = ({ className = 'w-[472px]', type = 'text', label, placeholder = '' }) => {
  const textStyle = 'trackng-wide leading-7';

  return <label className={`${className} flex flex-col mb-5 gap-y-4`}>
    {label && <span className='text-base text-center'>{label}</span>}

    <input type={type} placeholder={placeholder} className='mb-10 text-sm border-black ps-8 hover:bg-hoverBtn bg-lightJr input input-bordered' />
  </label>
};
