'use client';
import ItemList from '@/components/ItemList';
import MenuItem from '@/components/MenuItem';
import Text from '@/components/Text';
import React, { useContext, useState } from 'react';
import Flex from './Flex';
import { AppContext, AppContextType, AppState } from '@/app/admin/context/AppContext';
import { FrontType, Project, WorktopType } from '@/app/types';
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
  const {
    selectedProject,
    selectedFrontType,
    selectedWorktopType,
    changeSelectedProject,
    changeSelectedKitchenType,
    changeSelectedApartment,
    changeSelectedFrontType,
    changeSelectedWorktopType,
  } = useContext(AppContext) as AppContextType;
  const possibleIds = [selectedProject?.id, selectedFrontType?.id, selectedWorktopType?.id];
  const classes = `cursor-pointer flex items-center gap-2 ${isActive ? 'font-bold' : ''} hover:text-secondary`;
  const handleClickChildItem = (item: Project | FrontType | WorktopType) => {
    switch (state) {
      case 'EditProject':
        changeSelectedProject(item as Project);
        changeSelectedKitchenType(null);
        changeSelectedApartment(null);
        break;
      case 'EditFrontType':
        changeSelectedFrontType(item as FrontType);
        break;
      case 'EditWorktopType':
        changeSelectedWorktopType(item as WorktopType);
        break;
      default:
        break;
    }
  };
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
                active={possibleIds.includes(item.id)}
                key={index}
                text={item.name || item.make}
                onClick={() => {
                  handleClickChildItem(item);
                }}
              ></MenuItem>
            ))}
          </ItemList>
        )}
      </Flex>
    </>
  );
};
export default SideBarListItemWithChildren;
