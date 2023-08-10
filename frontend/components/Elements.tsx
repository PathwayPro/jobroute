import { ButtonProps, HeaderProps, InputProps, SelectProps } from '@/types/PropsTypes';
import { twMerge } from 'tailwind-merge';

export const Logo = () => {
  const s = 'min-w-[8.68775rem] h-[1.5rem] bg-no-repeat bg-cover bg-center';

  return (
    <div className={s} style={{ backgroundImage: 'url(/img/logo.svg)' }}></div>
  )
}

export const HrDashed = () => {
  const s = 'my-4 border border-gray-300 border-dashed';

  return <>
    <div className={s}></div>
  </>
}

export const Header1: React.FC<HeaderProps> = ({ children, className }) => {
  const s = 'leading-6 tracking-normal text-4xl font-bold text-left text-titles text-center ${className}'

  return (
    <h1 className={twMerge(s, className)} >
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
    <h2 className={`tracking-normal text-2xl font-bold text-center text-light-color leading-normal ${className}`}>{children}</h2>
  );
};

export const HeaderText: React.FC<HeaderProps> = ({ children, className }) => {
  const s = 'text-xl font-normal tracking-normal leading-7';
  return (
    <p className={twMerge(s, className)}>{children}</p>)
}

export const Btn: React.FC<ButtonProps> = ({ color = 'primary', children, className, ...rest }) => {
  const defBtn = (color: string) => {
    const PRIMARY = 'primary';
    const SECONDARY = 'secondary';
    const OUTLINE_LIGHT = 'outline-light';
    const OUTLINE_DARK = 'outline-dark';
    const OUTLINE_SQUARE_DARK = 'outline-square-dark';

    const s = {
      primary: 'bg-primary text-light-color border-none hover:bg-hover-btn disabled:bg-active-color',
      secondary: 'bg-secondary text-light-color border-none hover:bg-primary',
      outLight: 'btn-outline text-light-color border-light-color border-outline hover:text-light-color hover:bg-hover-btn',
      outDark: 'btn-outline text-primary-text border-primary-text border-outline hover:text-light-color hover:bg-hover-btn',
      outSqureDark: 'btn-square btn-outline h-auto w-auto border-none text-primary-text hover:text-light-color hover:bg-hover-btn',
    };


    type Action = {
      condition: () => boolean;
      action: () => string;
    };

    const actions: Action[] = [
      {
        condition: () => color === PRIMARY,
        action: () => s.primary,
      },
      {
        condition: () => color === SECONDARY,
        action: () => s.secondary,
      },
      {
        condition: () => color === OUTLINE_LIGHT,
        action: () => s.outLight,
      },
      {
        condition: () => color === OUTLINE_DARK,
        action: () => s.outDark,
      },
      {
        condition: () => color === OUTLINE_SQUARE_DARK,
        action: () => s.outSqureDark,
      },
    ];

    const action = actions.find(({ condition }) => condition());

    if (action) return action.action();

    console.warn('Cannot assign correct styles to button');

    return '';
  }

  const s = 'btn text-base w-[18.125rem] h-[1.5625rem]';

  return <button className={twMerge(s, defBtn(color), className)} {...rest}>
    {children}
  </button>
    ;
};

export const Select: React.FC<SelectProps> = ({ className, styleCaption, styleSelect, label, options, disabled = 'none', defaultValue = '', onChange }) => {
  const s = {
    textStyle: 'tracking-wide leading-7',
    label: 'flex flex-col gap-y-4 w-[30.5rem]',
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
    <label className={twMerge(s.textStyle, s.label, className)}>
      {label && <span className={twMerge(s.caption, styleCaption)}>{label}</span>}

      <select
        defaultValue={defaultValue === '' ? '' : options[defaultValue]}
        className={twMerge(s.select, styleSelect)}
        onChange={onChange}
      >
        {options.map((string: string, i: number) => (
          <option disabled={checkForDisabled(disabled, i)} className={s.option} key={i}>
            {string}
          </option>
        ))}
      </select>
    </label>
  );
};

export const InputField: React.FC<InputProps> = ({ className, styleCaption, styleInput, type = 'text', label, placeholder = '', onChange }) => {
  const s = {
    textStyle: 'tracking-wide leading-7',
    label: 'flex flex-col gap-y-4 w-[29.5rem]',
    caption: 'text-base text-center',
    input: 'text-sm bg-white border-black ps-8 hover:bg-hover-input input input-bordered',
  };

  return <label className={twMerge(s.label, className)}>
    {label && <span className={twMerge(s.textStyle, s.caption, styleCaption)}>{label}</span>}

    <input
      type={type}
      onChange={onChange}
      placeholder={placeholder}
      className={twMerge(s.textStyle, s.input, styleInput)} />
  </label>
};
