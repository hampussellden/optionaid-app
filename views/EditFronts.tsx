import React, { useContext } from 'react';
import { AppContext, AppContextType } from '@/app/admin/context/AppContext';
import Fronts from '@/components/Fronts';
import Flex from '@/containers/Flex';
import { FrontsContext, FrontsContextType } from '@/app/admin/context/FrontsContext';
import { sortByName } from '@/utilities/helpers/sorting';
import ItemList from '@/components/ItemList';
import MenuItem from '@/components/MenuItem';
import { AddRounded, DoorBack, DoorBackOutlined, DoorBackTwoTone } from '@mui/icons-material';
import FrontsEditor from '@/blocks/FrontsEditor';
import { Front } from '@/app/types';

const EditFronts = () => {
  const { selectedFront, selectedFrontType, changeSelectedFront, changeSelectedFrontType, changeAppState } = useContext(
    AppContext
  ) as AppContextType;
  const { fronts } = useContext(FrontsContext) as FrontsContextType;

  const handleSelectFront = () => {};
  const handleCreateNewFront = () => {};

  return (
    <>
      <nav className="w-full">
        {selectedFrontType && (
          <ItemList horizontal classNames={'py-4 px-2 bg-static border border-text border-l-0 sticky w-full'}>
            {fronts &&
              fronts
                .filter((front: Front) => front.front_type_id === selectedFrontType.id)
                .sort(sortByName)
                .map((front: Front, key: number) => (
                  <MenuItem
                    active={selectedFront?.id === front.id ? true : false}
                    key={key}
                    onClick={() => changeSelectedFront(front)}
                    text={front.name}
                    icon={selectedFront?.id === front.id ? DoorBackTwoTone : DoorBackOutlined}
                  />
                ))}
            <MenuItem icon={AddRounded} text="Front" onClick={handleCreateNewFront} />
          </ItemList>
        )}
      </nav>
      <Flex as="section" id="fronts-editor" direction="column" classNames="w-full h-full max-h-full overflow-auto p-2">
        {selectedFrontType && <FrontsEditor frontType={selectedFrontType} front={selectedFront ?? null} />}
        {!selectedFrontType && <p>Select a front to edit</p>}
      </Flex>
    </>
  );
};
export default EditFronts;
