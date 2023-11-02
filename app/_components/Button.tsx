import React, { useState } from 'react';
import classNames from 'classnames';

type ButtonProps = {
  text?: string;
  onClick?: any;
  icon?: any;
  loading?: boolean;
  formAction?: string;
  fullWidth?: boolean;
  transparent?: boolean
  marginZero?: boolean
}


const Button = (props: ButtonProps) => {
  const Icon = props.icon;
    return (
        <button className={classNames('rounded py-2 px-4 text-xl font-semibold self-end hover:bg-accentHover flex flex-row gap-2 items-center justify-center',{
          'w-full' : props.fullWidth,
          'bg-accent': !props.transparent,
          'border border-accent': props.transparent,
          'mt-0': props.marginZero,
          'mt-auto': !props.marginZero
        })} 
        onClick={props.onClick
        }>
          {props.loading && (
            <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status">
            </div>
          )}
          {!props.loading && (
            <>
              {props.icon && (
                <Icon /> 
              )}
              {props.text && (

                <p className='text-lg font-semibold'>
                  {props.text} 
                </p>
              )}
            </>
          )}
        </button>
    );
};

export default Button;