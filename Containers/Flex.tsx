import { ReactNode } from 'react';

type FlexProps = {
  children: ReactNode;
  direction?: 'row' | 'column';
  justify?: 'start' | 'end' | 'center' | 'between' | 'around';
  align?: 'start' | 'end' | 'center' | 'stretch';
  wrap?: 'wrap' | 'nowrap';
  grow?: boolean;
};
const Flex = ({ direction, justify, align, wrap, grow, children }: FlexProps) => {
  const classes = `flex flex-${direction || 'row'} justify-${justify || 'start'} items-${align || 'start'} flex-wrap-${
    wrap || 'nowrap'
  } ${grow ? 'flex-grow' : ''}`;
  return <div className={classes}>{children}</div>;
};
export default Flex;
