import React, { useState } from 'react';
import classNames from 'classnames';

type ItemListProps = {
  children: React.ReactNode;
  horizontal?: boolean;
  indent?: boolean;
  center?: boolean;
};

const ItemList = (props: ItemListProps) => {
  const classes = classNames(
    {
      'flex-row': props.horizontal,
      'flex-col': !props.horizontal,
      'ml-4': props.indent,
      'justify-center items-center': props.center,
    },
    'flex gap-2',
  );
  return <ul className={classes}>{props.children}</ul>;
};

export default ItemList;
