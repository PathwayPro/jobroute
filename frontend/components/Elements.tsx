import { ButtonProps, InputProps, SelectProps } from "@/types/PropsTypes";
import React from "react";
import { twMerge } from "tailwind-merge";
import Spinner from "./Spinner";

// TODO - Clean this file to remove redundant components
export const Button: React.FC<ButtonProps> = ({
  variant = "primary-medium",
  children,
  className,
  disabled,
  loading,
  ...rest
}) => {
  const defaultButton = (variant: string) => {
    const PRIMARY_M = "primary-medium";
    const PRIMARY_S = "primary-small";
    const OUTLINED = "outlined";
    const SECONDARY = "secondary";

    const style = {
      "primary-medium":
        "h-[56px] min-w-[215px] bg-primary text-light-color hover:bg-dark active:bg-active-color hover:flex-row-reverse transition hover:duration-150",
      "primary-small":
        "h-[48px] bg-primary text-light-color hover:bg-dark active:bg-active-color hover:flex-row-reverse transition hover:duration-150",
      outlined:
        "h-[48px] bg-white text-primary border-primary border-2 hover:text-dark hover:border-dark active:border-active-color active:text-active-color transition-all",
      secondary:
        "group flex gap-2 text-primary hover:text-primary hover:flex-row-reverse transition hover:duration-150",
    };

    type Action = {
      condition: () => boolean;
      action: () => string;
    };

    const actions: Action[] = [
      {
        condition: () => variant === PRIMARY_M,
        action: () => style["primary-medium"],
      },
      {
        condition: () => variant === PRIMARY_S,
        action: () => style["primary-small"],
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

    console.warn("Cannot assign correct styles to button");

    return "";
  };

  const style =
    "flex flex-row py-4 px-8 items-center justify-around rounded-full font-bold normal-case text-base w-max min-w-[142px]";

  return (
    <button
      className={twMerge(style, defaultButton(variant), className)}
      {...rest}
    >
      {loading && <Spinner />}
      {!loading && children}
      {variant === "primary-medium" && !loading && (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            id="Vector"
            d="M1.28205 11.282H15.641L9.35897 17.564C8.84615 18.0769 8.84615 18.8461 9.35897 19.3589C9.87179 19.8717 10.641 19.8717 11.1538 19.3589L19.6154 10.8974C20.1282 10.3846 20.1282 9.61532 19.6154 9.1025L11.1538 0.640963C10.641 0.128143 9.87179 0.128143 9.35897 0.640963C8.84615 1.15378 8.84615 1.92301 9.35897 2.43583L15.641 8.71789H1.28205C0.51282 8.71789 0 9.23071 0 9.99994C0 10.7692 0.51282 11.282 1.28205 11.282Z"
            fill="white"
          />
        </svg>
      )}
      {variant === "secondary" && !loading && (
        <div className="rounded-full bg-primary p-2 group-hover:bg-dark group-active:bg-active-color">
          <svg
            width="10"
            height="10"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              id="Vector"
              d="M1.28205 11.282H15.641L9.35897 17.564C8.84615 18.0769 8.84615 18.8461 9.35897 19.3589C9.87179 19.8717 10.641 19.8717 11.1538 19.3589L19.6154 10.8974C20.1282 10.3846 20.1282 9.61532 19.6154 9.1025L11.1538 0.640963C10.641 0.128143 9.87179 0.128143 9.35897 0.640963C8.84615 1.15378 8.84615 1.92301 9.35897 2.43583L15.641 8.71789H1.28205C0.51282 8.71789 0 9.23071 0 9.99994C0 10.7692 0.51282 11.282 1.28205 11.282Z"
              fill="white"
            />
          </svg>
        </div>
      )}
    </button>
  );
};

export const Select: React.FC<SelectProps> = ({
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
      "text-sm border-black ps-8 bg-light-color hover:bg-hover-input active:bg-light-color select select-bordered",
    caption: "text-base text-center",
    option: "text-sm",
  };

  const checkForDisabled = (disabled: SelectProps["disabled"], i: number) => {
    type Action = {
      condition: () => boolean;
      action: () => boolean;
    };

    const actions: Action[] = [
      {
        condition: () => disabled === "none",
        action: () => false,
      },
      {
        condition: () => Array.isArray(disabled),
        action: () => (Array.isArray(disabled) ? disabled.includes(i) : false),
      },
    ];

    return actions.some((a) => a.condition())
      ? actions.find((a) => a.condition())?.action() ?? false
      : false;
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
          <option
            disabled={checkForDisabled(disabled, i)}
            className={style.option}
            key={i}
          >
            {string}
          </option>
        ))}
      </select>
    </label>
  );
};

export const InputField: React.FC<InputProps> = ({
  value,
  className,
  styleCaption,
  styleInput,
  type = "text",
  label,
  placeholder = "",
  onChange,
}) => {
  const style = {
    text: "tracking-wide leading-7",
    label: "flex flex-col gap-y-4 max-w-[374px]",
    caption: "text-base text-center",
    input: "text-sm bg-white border-black ps-8 input input-bordered",
  };

  return (
    <label className={twMerge(style.label, className)}>
      {label && (
        <span className={twMerge(style.text, style.caption, styleCaption)}>
          {label}
        </span>
      )}

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={twMerge(style.text, style.input, styleInput)}
      />
    </label>
  );
};
