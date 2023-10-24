import { ButtonProps, HeaderProps, InputProps, SelectProps } from '@/types/PropsTypes';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import Spinner from './Spinner';

export const Logo = ({ variant }: { variant: 'primary' | 'secondary' }) => {
  const style = 'min-w-[8.68775rem] h-[1.5rem] bg-no-repeat bg-cover bg-center';

  return variant === 'primary' ? (
    <div className={style} style={{ backgroundImage: 'url(/img/logo-primary.svg)' }}></div>
  ) : (
    <div className={style} style={{ backgroundImage: 'url(/img/logo-secondary.svg)' }}></div>

  )
}

export const HrDashed: React.FC<{ className?: string }> = ({ className }) => {
  const style = 'my-4 border border-gray-300 border-dashed';

  return <>
    <div className={twMerge(style, className)}></div>
  </>
}

export const Header1: React.FC<HeaderProps> = ({ children, className }) => {
  const style = 'leading-6 tracking-normal text-4xl font-bold text-left text-titles text-center ${className}'

  return (
    <h1 className={twMerge(style, className)} >
      {children}
    </h1>
  );
};

export const Header2: React.FC<HeaderProps> = ({ children, className }) => {
  return (
    <h2 className={`tracking-normal text-4xl font-bold text-center text-light-color leading-normal ${className}`}>{children}</h2>
  );
};

export const Header3: React.FC<HeaderProps> = ({ children, className }) => {
  return (
    <h2 className={twMerge('tracking-normal text-2xl font-bold text-center text-light-color leading-normal', className)}>{children}</h2>
  );
};

export const HeaderText: React.FC<HeaderProps> = ({ children, className }) => {
  const style = 'text-xl font-normal tracking-normal leading-7';
  return (
    <p className={twMerge(style, className)}>{children}</p>)
}

// TODO - Clean this file to remove redundant components
export const Button: React.FC<ButtonProps> = ({ variant = 'primary-medium', children, className, disabled, loading, ...rest }) => {
  const defaultButton = (variant: string) => {
    const PRIMARY_M = 'primary-medium';
    const PRIMARY_S = 'primary-small';
    const OUTLINED = 'outlined';
    const SECONDARY = 'secondary';

    const style = {
      'primary-medium': 'h-[56px] min-w-[215px] bg-primary text-light-color hover:bg-dark active:bg-active-color hover:flex-row-reverse transition hover:duration-150',
      'primary-small': 'h-[48px] bg-primary text-light-color hover:bg-dark active:bg-active-color hover:flex-row-reverse transition hover:duration-150',
      outlined: 'h-[48px] bg-white text-primary border-primary border-2 hover:text-dark hover:border-dark active:border-active-color active:text-active-color transition-all',
      secondary: 'group flex gap-2 text-primary hover:text-primary hover:flex-row-reverse transition hover:duration-150',
    };

    type Action = {
      condition: () => boolean;
      action: () => string;
    };

    const actions: Action[] = [
      {
        condition: () => variant === PRIMARY_M,
        action: () => style['primary-medium'],
      },
      {
        condition: () => variant === PRIMARY_S,
        action: () => style['primary-small'],
      },
      {
        condition: () => variant === SECONDARY,
        action: () => style.secondary,
      },
      {
        condition: () => variant === OUTLINED,
        action: () => style.outlined,
      },
    ];

    const action = actions.find(({ condition }) => condition());

    if (action) return action.action();

    console.warn('Cannot assign correct styles to button');

    return '';
  }

  const style = 'flex flex-row py-4 px-8 items-center justify-around rounded-full font-bold normal-case text-base w-max min-w-[142px]';

  return <button className={twMerge(style, defaultButton(variant), className)} {...rest}>
    {loading && <Spinner />}
    {!loading && children}
    {variant === 'primary-medium' && !loading && (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path id="Vector" d="M1.28205 11.282H15.641L9.35897 17.564C8.84615 18.0769 8.84615 18.8461 9.35897 19.3589C9.87179 19.8717 10.641 19.8717 11.1538 19.3589L19.6154 10.8974C20.1282 10.3846 20.1282 9.61532 19.6154 9.1025L11.1538 0.640963C10.641 0.128143 9.87179 0.128143 9.35897 0.640963C8.84615 1.15378 8.84615 1.92301 9.35897 2.43583L15.641 8.71789H1.28205C0.51282 8.71789 0 9.23071 0 9.99994C0 10.7692 0.51282 11.282 1.28205 11.282Z" fill="white" />
      </svg>
    )}
    {variant === 'secondary' && !loading && (
      <div className='bg-primary rounded-full p-2 group-hover:bg-dark group-active:bg-active-color'>
        <svg width="10" height="10" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path id="Vector" d="M1.28205 11.282H15.641L9.35897 17.564C8.84615 18.0769 8.84615 18.8461 9.35897 19.3589C9.87179 19.8717 10.641 19.8717 11.1538 19.3589L19.6154 10.8974C20.1282 10.3846 20.1282 9.61532 19.6154 9.1025L11.1538 0.640963C10.641 0.128143 9.87179 0.128143 9.35897 0.640963C8.84615 1.15378 8.84615 1.92301 9.35897 2.43583L15.641 8.71789H1.28205C0.51282 8.71789 0 9.23071 0 9.99994C0 10.7692 0.51282 11.282 1.28205 11.282Z" fill="white" />
        </svg>
      </div>
    )}
  </button>
    ;
};

export const Arrow = ({ variant, className }: { variant: 'primary' | 'secondary' | 'tertiary', className?: any }) => {
  const color = {
    primary: '#DF044D',
    secondary: '#000000',
    tertiary: '#FFFFFF'
  };

  return (
    <div className={className}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.28205 11.2821H15.641L9.35897 17.5641C8.84615 18.0769 8.84615 18.8462 9.35897 19.359C9.87179 19.8718 10.641 19.8718 11.1538 19.359L19.6154 10.8974C20.1282 10.3846 20.1282 9.61538 19.6154 9.10256L11.1538 0.641024C10.641 0.128204 9.87179 0.128204 9.35897 0.641024C8.84615 1.15384 8.84615 1.92308 9.35897 2.4359L15.641 8.71795H1.28205C0.51282 8.71795 0 9.23077 0 10C0 10.7692 0.51282 11.2821 1.28205 11.2821Z" fill={color[variant]} />
      </svg>
    </div>
  )
}

export const Edit = ({ className }: { className?: any }) => {
  return (
    <div className={className}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.3764 20.0279L18.1628 8.66544C18.6403 8.0527 18.8101 7.3443 18.6509 6.62299C18.513 5.96726 18.1097 5.34377 17.5049 4.87078L16.0299 3.69906C14.7459 2.67784 13.1541 2.78534 12.2415 3.95706L11.2546 5.23735C11.1273 5.39752 11.1591 5.63401 11.3183 5.76301C11.3183 5.76301 13.812 7.76246 13.8651 7.80546C14.0349 7.96671 14.1622 8.1817 14.1941 8.43969C14.2471 8.94493 13.8969 9.41792 13.377 9.48242C13.1329 9.51467 12.8994 9.43942 12.7297 9.29967L10.1086 7.21422C9.98126 7.11855 9.79025 7.13898 9.68413 7.26797L3.45514 15.3303C3.0519 15.8355 2.91395 16.4912 3.0519 17.1255L3.84777 20.5761C3.89021 20.7589 4.04939 20.8879 4.24039 20.8879L7.74222 20.8449C8.37891 20.8341 8.97316 20.5439 9.3764 20.0279ZM14.2797 18.9533H19.9898C20.5469 18.9533 21 19.4123 21 19.9766C21 20.5421 20.5469 21 19.9898 21H14.2797C13.7226 21 13.2695 20.5421 13.2695 19.9766C13.2695 19.4123 13.7226 18.9533 14.2797 18.9533Z" fill="#242529" />
      </svg>

    </div>
  )
}

export const Icon = ({ className, children }: { className?: any; children: any }) => {
  const style = 'flex justify-center font-bold p-1 bg-white rounded-full text-light-color items-center text-center';

  return (
    <div className={twMerge(style, className)} >
      {children}
    </div>
  )
};

export const NumberBadge = ({ number }: { number: string }) => {
  const style = 'flex justify-center w-[3.5rem] h-[3.5rem] font-bold p-1 bg-black rounded-full text-light-color items-center text-center text-2xl';

  return (
    <div className={style}>
      {number}
    </div>
  );
}

export const Card: React.FC<{ className?: string, children: any }> = ({ children, className }) => {
  const style = 'bg-white w-[244px] h-[210px] rounded-2xl shadow-xl p-8';

  return (
    <div className={twMerge(style, className)}>
      {children}
    </div>
  );
}

export const Select: React.FC<SelectProps> = ({ className, styleCaption, styleSelect, label, options, disabled = 'none', defaultValue = '', onChange }) => {
  const style = {
    text: 'tracking-wide leading-7',
    label: 'flex flex-col gap-y-4 max-w-[374px]',
    select: 'text-sm border-black ps-8 bg-light-color hover:bg-hover-input active:bg-light-color select select-bordered',
    caption: 'text-base text-center',
    option: 'text-sm',
  };

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
    <label className={twMerge(style.text, style.label, className)}>
      {label && <span className={twMerge(style.caption, styleCaption)}>{label}</span>}

      <select
        defaultValue={defaultValue === '' ? '' : options[defaultValue]}
        className={twMerge(style.select, styleSelect)}
        onChange={onChange}
      >
        {options.map((string: string, i: number) => (
          <option disabled={checkForDisabled(disabled, i)} className={style.option} key={i}>
            {string}
          </option>
        ))}
      </select>
    </label>
  );
};

export const InputField: React.FC<InputProps> = ({ value, className, styleCaption, styleInput, type = 'text', label, placeholder = '', onChange }) => {
  const style = {
    text: 'tracking-wide leading-7',
    label: 'flex flex-col gap-y-4 max-w-[374px]',
    caption: 'text-base text-center',
    input: 'text-sm bg-white border-black ps-8 input input-bordered',
  };

  return <label className={twMerge(style.label, className)}>
    {label && <span className={twMerge(style.text, style.caption, styleCaption)}>{label}</span>}

    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={twMerge(style.text, style.input, styleInput)} />
  </label>
};
