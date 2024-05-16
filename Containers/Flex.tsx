import { ReactNode } from 'react';

type FlexProps = {
  children: ReactNode;
  direction?: 'row' | 'column';
  justify?: 'start' | 'end' | 'center' | 'between' | 'around';
  align?: 'start' | 'end' | 'center' | 'stretch';
  wrap?: 'wrap' | 'nowrap';
  gap?: number;
  rowGap?: number;
  columnGap?: number;
  grow?: boolean;
  as?: 'div' | 'ul' | 'ol' | 'li' | 'nav' | 'main' | 'section' | 'article' | 'aside' | 'header' | 'footer';
  classNames?: string;
  id?: string;
};
/**
 * A flexible container component that allows you to control the layout and alignment of its children.
 *
 * @param {FlexProps} props - The props for the Flex component.
 * @param {string} props.direction - The direction of the flex container. Defaults to 'row'.
 * @param {string} props.justify - The alignment of the flex items along the main axis. Defaults to 'start'.
 * @param {string} props.align - The alignment of the flex items along the cross axis. Defaults to 'start'.
 * @param {string} props.wrap - Whether the flex items should wrap to multiple lines. Defaults to 'nowrap'.
 * @param {boolean} props.grow - Whether the flex container should grow to fill available space.
 * @param {ReactNode} props.children - The children elements to be rendered inside the flex container.
 * @param {string} props.gap - The gap between flex items along the main axis.
 * @param {string} props.rowGap - The gap between flex items along the vertical axis.
 * @param {string} props.columnGap - The gap between flex items along the horizontal axis.
 * @param {string} props.as - The HTML element to render the Flex component as. Defaults to 'div'.
 * @returns {JSX.Element} The rendered Flex component.
 */
const Flex = ({
  direction,
  justify,
  align,
  wrap,
  grow,
  children,
  gap,
  rowGap,
  columnGap,
  as,
  classNames,
  id,
}: FlexProps) => {
  const Tag = as || 'div';
  const classes = `w-full flex flex-${direction === 'column' ? 'col' : 'row'} justify-${justify || 'start'} items-${
    align || 'start'
  } flex-wrap-${wrap || 'nowrap'} ${grow ? 'flex-grow' : ''}
  ${gap ? `gap-${gap}` : ''} ${rowGap ? `gap-y-${rowGap}` : ''} ${columnGap ? `gap-x-${columnGap}` : ''} ${
    classNames ? classNames : ''
  }`;
  return (
    <Tag className={classes} id={id}>
      {children}
    </Tag>
  );
};
export default Flex;
