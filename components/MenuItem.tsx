import React, { useState } from 'react';
import classNames from 'classnames';
import { ChevronRight } from '@mui/icons-material';

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
        'p-2 rounded text-mg flex flex-row items-center gap-2 focus:outline-none',
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
      <li className="list-none">{props.text}</li>
    </button>
  );
};

export default MenuItem;
