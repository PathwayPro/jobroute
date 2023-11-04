import { twMerge } from "tailwind-merge";

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

const InputField: React.FC<InputProps> = ({ value, className, styleCaption, styleInput, type = 'text', label, placeholder = '', onChange }) => {
  const style = {
    text: 'tracking-wide leading-7',
    label: 'flex flex-col gap-y-4 max-w-[374px]',
    caption: 'text-base text-center',
    input: 'text-sm bg-white ps-8 input input-bordered',
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

export default InputField;