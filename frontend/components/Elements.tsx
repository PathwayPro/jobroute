import {
  btnBaseStyle,
  btnOutlineDarkStyle,
  btnOutlineSquareStyle,
  btnPrimaryStyle,
  btnSecondaryStyle,
  h1Style,
  h2Style,
  hText,
  hrDashedStyle,
  logoStyle,
  optionStyle,
  captionStyle,
  labelStyle,
  selectStyle,
  textStyle,
  inputStyle,
  btnOutlineLightStyle
} from '@/styles/elementStyles';
import { ActionBool, ActionString, ButtonProps, HeaderProps, InputProps, SelectProps } from '@/types/PropsTypes';

export const Logo = () => {
  return (
    <div className={logoStyle} style={{ backgroundImage: 'url(/img/logo.svg)' }}></div>
  )
}

export const HrDashed = () => {
  return <>
    <div className={hrDashedStyle}></div>
  </>
}

export const Header1: React.FC<HeaderProps> = ({ children, className }) => {
  return (
    <h1 className={`${h1Style} ${className}`} >
      {children}
    </h1>
  );
};

export const Header2: React.FC<HeaderProps> = ({ children, className }) => {
  return (
    <h2 className={`${h2Style} ${className}`}>{children}</h2>
  );
};

export const HeaderText: React.FC<HeaderProps> = ({ children, className }) => {
  return (
    <p className={`${hText} ${className}`}>{children}</p>)
}

export const Btn: React.FC<ButtonProps> = ({ color = 'primary', children, className, ...rest }) => {
  const defBtn = (color: string) => {

    const PRIMARY = 'primary';
    const SECONDARY = 'secondary';
    const OUTLINE_LIGHT = 'outline-light';
    const OUTLINE_DARK = 'outline-dark';
    const OUTLINE_SQUARE_DARK = 'outline-square-dark';

    const actions: ActionString[] = [
      {
        condition: () => color === PRIMARY,
        action: () => `${btnBaseStyle} ${btnPrimaryStyle}`,
      },
      {
        condition: () => color === SECONDARY,
        action: () => `${btnBaseStyle} ${btnSecondaryStyle}`,
      },
      {
        condition: () => color === OUTLINE_LIGHT,
        action: () => `${btnBaseStyle} ${btnOutlineLightStyle}`,
      },
      {
        condition: () => color === OUTLINE_DARK,
        action: () => `${btnBaseStyle} ${btnOutlineDarkStyle}`,
      },
      {
        condition: () => color === OUTLINE_SQUARE_DARK,
        action: () => btnOutlineSquareStyle,
      },
    ];

    const action = actions.find(({ condition }) => condition());

    if (action) return action.action();

    console.warn('Cannot assign correct styles to button');

    return `${btnBaseStyle}`;
  }

  return (
    <button className={`${defBtn(color)} ${className}`} {...rest}>
      {children}
    </button>
  );
};

export const Select: React.FC<SelectProps> = ({ className = 'w-[472px]', label, options, disabled = 'none', defaultValue = '', onChange }) => {

  const checkForDisabled = (disabled: SelectProps['disabled'], i: number) => {

    const actions: ActionBool[] = [
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
    <label className={`${textStyle} ${labelStyle} ${className}`}>
      {label && <span className={captionStyle}>{label}</span>}

      <select
        defaultValue={defaultValue === '' ? '' : options[defaultValue]}
        className={selectStyle}
        onChange={onChange}
      >
        {options.map((string: string, i: number) => (
          <option disabled={checkForDisabled(disabled, i)} className={optionStyle} key={i}>
            {string}
          </option>
        ))}
      </select>
    </label>
  );
};

export const InputField: React.FC<InputProps> = ({ className = 'w-[472px]', type = 'text', label, placeholder = '', onChange }) => {
  return <label className={`${labelStyle} ${className}`}>
    {label && <span className={captionStyle}>{label}</span>}

    <input
      type={type}
      onChange={onChange}
      placeholder={placeholder}
      className={inputStyle} />
  </label>
};
