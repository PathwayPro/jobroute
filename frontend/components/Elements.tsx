import { ButtonProps, HeaderProps, InputProps, SelectProps } from '@/types/PropsTypes';

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

export const Header1: React.FC<HeaderProps> = ({ children, className }) => {
  return (
    <h1 className={`leading-6 tracking-normal text-4xl font-bold text-left text-titles text-center ${className}`} >
      {children}
    </h1>
  );
};

export const Header2: React.FC<HeaderProps> = ({ children, className }) => {
  return (
    <h2 className={`leading-6 tracking-normal text-3xl font-bold text-center ${className}`}>{children}</h2>
  );
};

export const HeaderText: React.FC<HeaderProps> = ({ children, className }) => {
  return (
    <p className={`text-xl font-normal tracking-normal leading-7 ${className}`}>{children}</p>)
}

export const Btn: React.FC<ButtonProps> = ({ color = 'primary', children, className, ...rest }) => {
  const defBtn = (color: string) => {
    let btnClasses = 'mb-[1.5rem] btn text-base w-[290px] h-[25px]';

    const PRIMARY = 'primary';
    const SECONDARY = 'secondary';
    const OUTLINE_LIGHT = 'outline-light';
    const OUTLINE_DARK = 'outline-dark';
    const OUTLINE_SQUARE_DARK = 'outline-square-dark';


    type Action = {
      condition: () => boolean;
      action: () => string;
    };

    const actions: Action[] = [
      {
        condition: () => color === PRIMARY,
        action: () => btnClasses += ' bg-primary text-light-color border-none hover:bg-hover-btn disabled:bg-active-color',
      },
      {
        condition: () => color === SECONDARY,
        action: () => btnClasses += ' bg-secondary text-light-color border-none hover:bg-primary',
      },
      {
        condition: () => color === OUTLINE_LIGHT,
        action: () => btnClasses += ' text-light-color border-light-color border-outline btn-outline hover:text-light-color hover:bg-hover-btn',
      },
      {
        condition: () => color === OUTLINE_DARK,
        action: () => btnClasses += ' text-primary-text border-primary-text border-outline btn-outline hover:text-light-color hover:bg-hover-btn',
      },
      {
        condition: () => color === OUTLINE_SQUARE_DARK,
        action: () => 'mb-[1.5rem] btn btn-square border-none text-base text-primary-text btn-outline hover:text-light-color hover:bg-hover-btn',
      },
    ];

    const action = actions.find(({ condition }) => condition());

    if (action) return action.action();

    console.warn('Cannot assign correct styles to button');

    return `${btnClasses}`;
  }

  return (
    <button className={`${defBtn(color)} ${className}`} {...rest}>
      {children}
    </button>
  );
};

export const Select: React.FC<SelectProps> = ({ className = 'w-[472px]', label, options, disabled = 'none', defaultValue = '', onChange }) => {
  const textStyle = 'tracking-wide leading-7';

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
    <label className={`${textStyle} flex flex-col gap-y-4 ${className}`}>
      {label && <span className='text-base text-center'>{label}</span>}

      <select
        defaultValue={defaultValue === '' ? '' : options[defaultValue]}
        className='mb-10 text-sm border-black ps-8 bg-light-color hover:bg-hover-input active:bg-light-color select select-bordered'
        onChange={onChange}
      >
        {options.map((string: string, i: number) => (
          <option disabled={checkForDisabled(disabled, i)} className='text-sm' key={i}>
            {string}
          </option>
        ))}
      </select>
    </label>
  );
};

export const InputField: React.FC<InputProps> = ({ className = 'w-[472px]', type = 'text', label, placeholder = '', onChange }) => {
  const textStyle = 'tracking-wide leading-7';

  return <label className={`flex flex-col gap-y-4 ${className}`}>
    {label && <span className='text-base text-center'>{label}</span>}

    <input
      type={type}
      onChange={onChange}
      placeholder={placeholder}
      className='mb-10 text-sm bg-white border-black ps-8 hover:bg-hover-input input input-bordered' />
  </label>
};
