import React, { useState } from 'react';
import classNames from 'classnames';
import { ChevronRight} from '@mui/icons-material';

type MenuItemProps = {
    onClick?: any;
    loading?: boolean;
    text: string;
    active?: boolean;
    icon?: any;
}


const MenuItem = (props: MenuItemProps) => {
  const Icon = props.icon

    return (
      <button className={classNames({ 'bg-primary': props.active }, 'p-2 rounded text-lg font-semibold hover:bg-primaryHover flex flex-row items-center gap-2')}  onClick={props.onClick}>
        {props.icon ? (
          <Icon />
        )
      :
      (
        <>
          <ChevronRight />
        </>
      )
      }
        <li className='list-none'>{props.text}</li>
      </button>
    );
};

export default MenuItem;