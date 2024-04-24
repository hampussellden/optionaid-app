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

  return (
    <button
      className={classNames(
        { 'bg-secondary': props.active, 'hover:bg-secondaryHover': !props.noHover },
        'text-mg flex flex-row items-center gap-1 focus:outline-none'
      )}
      onClick={props.onClick}
    >
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
