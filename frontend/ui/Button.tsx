import Spinner from "@/components/Spinner";
import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Ref = HTMLButtonElement;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
  | 'primary-medium'
  | 'primary-small'
  | 'secondary'
  | 'outlined';
  children: ReactNode;
  loading?: boolean;
  buttonRef?: React.Ref<Ref>;
}

const Button = React.forwardRef<Ref, ButtonProps>(({ variant = 'primary-medium', children, className, disabled, loading, ...rest }, ref) => {
  const defaultButton = (variant: string) => {
    const PRIMARY_M = 'primary-medium';
    const PRIMARY_S = 'primary-small';
    const OUTLINED = 'outlined';
    const SECONDARY = 'secondary';

    const style = {
      'primary-medium': 'h-[56px] min-w-[215px] justify-center gap-6 py-4 px-8 bg-primary text-light-color hover:bg-dark active:bg-active-color hover:flex-row-reverse transition hover:duration-150',
      'primary-small': 'h-[48px] justify-center py-4 px-8 bg-primary text-light-color hover:bg-dark active:bg-active-color hover:flex-row-reverse transition hover:duration-150',
      outlined: 'h-[48px] bg-white py-4 px-8 text-primary border-primary border-2 hover:text-dark hover:border-dark active:border-active-color active:text-active-color transition-all',
      secondary: 'group flex gap-2 w-max text-dark hover:text-primary hover:flex-row-reverse transition hover:duration-150',
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

  const style = 'flex flex-row items-center rounded-full font-bold normal-case text-base w-max';

  return <button ref={ref} className={twMerge(style, defaultButton(variant), className)} {...rest}>
    {loading && <Spinner />}
    {!loading && children}
    {variant === 'primary-medium' && !loading && (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path id="Vector" d="M1.28205 11.282H15.641L9.35897 17.564C8.84615 18.0769 8.84615 18.8461 9.35897 19.3589C9.87179 19.8717 10.641 19.8717 11.1538 19.3589L19.6154 10.8974C20.1282 10.3846 20.1282 9.61532 19.6154 9.1025L11.1538 0.640963C10.641 0.128143 9.87179 0.128143 9.35897 0.640963C8.84615 1.15378 8.84615 1.92301 9.35897 2.43583L15.641 8.71789H1.28205C0.51282 8.71789 0 9.23071 0 9.99994C0 10.7692 0.51282 11.282 1.28205 11.282Z" fill="white" />
      </svg>
    )}
    {variant === 'secondary' && !loading && (
      <div className='bg-black rounded-full p-2 m-0 group-hover:bg-primary group-active:bg-active-color'>
        <svg width="10" height="10" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path id="Vector" d="M1.28205 11.282H15.641L9.35897 17.564C8.84615 18.0769 8.84615 18.8461 9.35897 19.3589C9.87179 19.8717 10.641 19.8717 11.1538 19.3589L19.6154 10.8974C20.1282 10.3846 20.1282 9.61532 19.6154 9.1025L11.1538 0.640963C10.641 0.128143 9.87179 0.128143 9.35897 0.640963C8.84615 1.15378 8.84615 1.92301 9.35897 2.43583L15.641 8.71789H1.28205C0.51282 8.71789 0 9.23071 0 9.99994C0 10.7692 0.51282 11.282 1.28205 11.282Z" fill="white" />
        </svg>
      </div>
    )}
  </button>
    ;
});

Button.displayName = "Button"

export default Button;