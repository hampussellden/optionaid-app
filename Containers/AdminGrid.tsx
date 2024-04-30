import React from 'react';
import '@/styles/style.css';
type AdminGridProps = {
  children: React.ReactNode;
};

const AdminGrid = ({ children }: AdminGridProps) => {
  const classes = `grid grid-cols-adminGrid overflow-y-hidden min-h-screen max-h-full
  `;
  return <main className={classes}>{children}</main>;
};
export default AdminGrid;
