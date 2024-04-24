import React from 'react';
import '@/styles/style.css';
type AdminGridProps = {
  children: React.ReactNode;
};

const AdminGrid = ({ children }: AdminGridProps) => {
  const classes = `grid grid-cols-adminGrid grid-rows-adminGrid overflow-hidden max-h-screen
  `;
  return <main className={classes}>{children}</main>;
};
export default AdminGrid;
