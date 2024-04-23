import React from 'react';
type ColumnProps = {
  children: React.ReactNode;
  color?: string;
  rounded?: boolean;
};
const Column = ({ children, color, rounded }: ColumnProps) => {
  const classes = `flex flex-col bg-[${color}] ${rounded && 'rounded'}`;
  return <div className={classes}>{children}</div>;
};

export default Column;
