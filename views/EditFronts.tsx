import React, { useContext } from 'react';
import { AppContext, AppContextType } from '@/app/admin/context/AppContext';
import Flex from '@/Containers/Flex';
import { FrontsContext, FrontsContextType } from '@/app/admin/context/FrontsContext';
import { sortByName } from '@/utilities/helpers/sorting';
import ItemList from '@/components/ItemList';
import MenuItem from '@/components/MenuItem';
import { AddRounded, DoorBackOutlined, DoorBackTwoTone } from '@mui/icons-material';
import FrontsEditor from '@/blocks/FrontsEditor';
import { Front } from '@/app/types';
import Text from '@/components/Text';

const EditFronts = () => {
  const { selectedFront, selectedFrontType, changeSelectedFront, changeSelectedFrontType, changeAppState } = useContext(
    AppContext
  ) as AppContextType;
  const { fronts } = useContext(FrontsContext) as FrontsContextType;

  const handleSelectFront = () => {};
  const handleCreateNewFront = () => {
    changeSelectedFrontType(null);
    changeSelectedFront(null);

  };

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
      <Flex as="section" id="fronts-editor" direction="column" classNames="w-full h-full max-h-full overflow-auto p-2" width='full'>
        {selectedFrontType && <FrontsEditor frontType={selectedFrontType} front={selectedFront ?? null} />}
        {!selectedFrontType && (
          <Flex align="center" justify="center" classNames="h-full">
            <Text as="h2" size="small">
            Select a front to edit
            </Text>
          </Flex>
        )}
      </Flex>
    </>
  );
};
export default EditFronts;
