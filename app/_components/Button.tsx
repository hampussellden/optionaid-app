import React from 'react';
import classNames from 'classnames';

type ButtonProps = {
  text?: string;
  onClick?: any;
  icon?: any;
  loading?: boolean;
  formAction?: string;
  fullWidth?: boolean;
  transparent?: boolean;
  marginZero?: boolean;
  accent?: boolean;
  ariaLabel?: string;
};

const Button = (props: ButtonProps) => {
  const Icon = props.icon;
  return (
    <button
      className={classNames('rounded py-2 px-4 text-xl font-semibold flex flex-row gap-2 items-center justify-center', {
        'bg-accent hover:bg-accentHover': props.accent,
        'w-full': props.fullWidth,
        'bg-secondary hover:bg-secondaryHover': !props.transparent && !props.accent,
        'border border-secondary hover:bg-secondaryHover': props.transparent,
        'mt-0': props.marginZero,
        'mt-auto self-end': !props.marginZero,
        'py-2.5': props.icon && !props.text,
      })}
      formAction={props.formAction}
      onClick={props.onClick}
      aria-label={props.ariaLabel}
    >
      {props.loading && (
        <div
          className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        ></div>
      )}
      {!props.loading && (
        <>
          {props.icon && <Icon />}
          {props.text && <p className="text-lg font-semibold">{props.text}</p>}
        </>
      )}
    </button>
  );
};

export default Button;
