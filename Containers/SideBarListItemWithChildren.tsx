'use client';
import ItemList from '@/components/ItemList';
import MenuItem from '@/components/MenuItem';
import Text from '@/components/Text';
import React, { useContext } from 'react';
import Flex from '@/Containers/Flex';
import { AppContext, AppContextType, AppState } from '@/app/admin/context/AppContext';
import { FrontType, Project, WorktopType } from '@/app/types';
type SideBarListItemWithChildrenProps = {
  name: string;
  items: any;
  onClick: any;
  isActive?: boolean;
  icon?: any;
  state: AppState;
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
    changeSelectedFront,
    changeSelectedWorktopType,
    changeSelectedWorktop,
  } = useContext(AppContext) as AppContextType;
  const idToMatch = (state: AppState) => {
    switch (state) {
      case 'EditProject':
        return selectedProject?.id;
      case 'EditFrontType':
        return selectedFrontType?.id;
      case 'EditWorktopType':
        return selectedWorktopType?.id;
      default:
        return null;
    }
  };
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
        changeSelectedFront(null);
        break;
      case 'EditWorktopType':
        changeSelectedWorktopType(item as WorktopType);
        changeSelectedWorktop(null);
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
                active={idToMatch(state) === item.id}
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
