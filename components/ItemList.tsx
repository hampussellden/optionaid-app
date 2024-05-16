import React from 'react';
import classNames from 'classnames';

type ItemListProps = {
  children: React.ReactNode;
  horizontal?: boolean;
  indent?: boolean;
  center?: boolean;
  between?: boolean;
  around?: boolean;
  marginTop?: boolean;
  classNames?: string;
};

const ItemList = (props: ItemListProps) => {
  const classes = `${props.horizontal ? 'flex-row' : 'flex-col'} ${props.indent ? ' ml-2' : ''} ${
    props.center ? ' justify-center items-center' : ''
  }${props.between ? ' justify-between' : ''} ${props.around ? ' justify-around' : ''}${
    props.marginTop ? ' mt-2 ' : ''
  }${props.classNames ? props.classNames : ''} flex gap-2 overflow-auto
  scroll-smooth scrollbar-thin`;
  return <ul className={classes}>{props.children}</ul>;
};

export default ItemList;
