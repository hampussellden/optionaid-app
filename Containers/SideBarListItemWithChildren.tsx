'use client';
import ItemList from '@/components/ItemList';
import MenuItem from '@/components/MenuItem';
import Text from '@/components/Text';
import React, { useContext, useState } from 'react';
import Flex from './Flex';
import { AppContext, AppContextType, AppState } from '@/app/admin/context/AppContext';
type SideBarListItemWithChildrenProps = {
  name: string;
  items: any;
  onClick: any;
  isActive?: boolean;
  icon?: any;
  state?: AppState;
};
const SideBarListItemWithChildren = (props: SideBarListItemWithChildrenProps) => {
  const { items, name, onClick, isActive, icon, state } = props;
  const Icon = icon;
  const { changeAppState } = useContext(AppContext) as AppContextType;
  const classes = `cursor-pointer flex items-center gap-2`;
  return (
    <>
      <Flex direction="column" columnGap={2} as="li" rowGap={1}>
        <a onClick={onClick} className={classes}>
          {icon && <Icon />}
          <Text as="p" size="large">
            {name}
          </Text>
        </a>
        {isActive && items && (
          <ItemList indent marginTop>
            {items.map((item: any, index: number) => (
              <MenuItem
                key={index}
                text={item.name || item.make}
                onClick={() => state && changeAppState(state, item.id)}
              ></MenuItem>
            ))}
          </ItemList>
        )}
      </Flex>
    </>
  );
};
export default SideBarListItemWithChildren;
