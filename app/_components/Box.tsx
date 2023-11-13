import React, { useState } from 'react';
import classNames from 'classnames';

type BoxProps = {
  children?: React.ReactNode;
  grow?: boolean;
  primary?: boolean;
  center?: boolean;
  noPaddingX?: boolean;
  noPaddingY?: boolean;
  relative?: boolean;
};
const example = 'overflow-y-scroll';
const Box = (props: BoxProps) => {
  const classes = classNames(
    {
      'grow overflow-x-auto': props.grow,
      'justify-center items-center': props.center,
      'bg-primary scrollbar-track-inherit scrollbar-thumb-secondary': props.primary,
      'bg-static scrollbar-track-static scrollbar-thumb-static': !props.primary,
      'py-4': !props.noPaddingY,
      'px-4': !props.noPaddingX,
      'flex relative': props.relative,
    },
    'flex flex-col overflow-y-auto rounded min-w-fit scroll-smooth scrollbar-thin scrollbar-track-rounded scrollbar-thumb-rounded gap-4 justify-start',
  );

  return <div className={classes}>{props.children}</div>;
};

export default Box;
