import { twMerge } from "tailwind-merge";

export type SelectProps = {
  className?: string;
  styleCaption?: string;
  styleSelect?: string;
  label?: string;
  options: string[];
  disabled?: "none" | number[];
  defaultValue?: "" | number;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Select: React.FC<SelectProps> = ({
  className,
  styleCaption,
  styleSelect,
  label,
  options,
  disabled = "none",
  defaultValue = "",
  onChange,
}) => {
  const style = {
    text: "tracking-wide leading-7",
    label: "flex flex-col gap-y-4 max-w-[374px]",
    select:
      "text-sm ps-8 bg-light-color hover:border-black active:bg-light-color select select-bordered",
    caption: "text-base text-center",
    option: "text-sm",
  };

  return (
    <label className={twMerge(style.text, style.label, className)}>
      {label && (
        <span className={twMerge(style.caption, styleCaption)}>{label}</span>
      )}

      <select
        defaultValue={defaultValue === "" ? "" : options[defaultValue]}
        className={twMerge(style.select, styleSelect)}
        onChange={onChange}
      >
        {options.map((string: string, i: number) => (
          <option disabled={i === 0} className={style.option} key={i}>
            {string}
          </option>
        ))}
      </select>
    </label>
  );
};

export default Select;
