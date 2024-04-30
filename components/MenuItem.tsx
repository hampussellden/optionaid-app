import React, { useState } from 'react';
import classNames from 'classnames';
import { ChevronRight } from '@mui/icons-material';
import Text from './Text';

type MenuItemProps = {
  onClick?: any;
  loading?: boolean;
  text: string;
  active?: boolean;
  icon?: any;
  noHover?: boolean;
};

const MenuItem = (props: MenuItemProps) => {
  const Icon = props.icon;
  const classes = `text-mg flex flex-row items-center gap-1 focus:outline-none whitespace-nowrap
  ${props.active ? 'font-bold' : ''}
  ${props.noHover ? '' : 'hover:text-secondary'}
`;
  return (
    <button className={classes} onClick={props.onClick}>
      {props.icon ? (
        <Icon />
      ) : (
        <>
          <ChevronRight />
        </>
      )}
      <li className="list-none">
        <Text>{props.text}</Text>
      </li>
    </button>
  );
};

export default MenuItem;
