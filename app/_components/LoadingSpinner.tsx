import React, { useState } from 'react';
import classNames from 'classnames';

type LoadingSpinnerProps = {
  size: 'small' | 'medium' | 'large';
};

const LoadingSpinner = (props: LoadingSpinnerProps) => {
  const classes = classNames(
    {
      'h-6 w-6': props.size === 'small',
      'h-12 w-12': props.size === 'medium',
      'h-40 w-40': props.size === 'large',
    },
    'inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]',
  );

  return <div className={classes} role="status"></div>;
};

export default LoadingSpinner;
