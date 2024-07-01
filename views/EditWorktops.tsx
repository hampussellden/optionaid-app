import React, { useState, useContext } from 'react';
import { Worktop } from '../app/types';
import { AddRounded, CountertopsOutlined, CountertopsTwoTone, SaveRounded } from '@mui/icons-material';
import { WorktopsContext, WorktopContextType } from '../app/admin/context/WorktopsContext';
import { AppContext, AppContextType } from '@/app/admin/context/AppContext';
import ItemList from '@/components/ItemList';
import { sortByName } from '@/utilities/helpers/sorting';
import MenuItem from '@/components/MenuItem';
import Text from '@/components/Text';
import Flex from '@/Containers/Flex';
import WorktopsEditor from '@/components/WorktopsEditor';
import WorktopsCreator from '@/components/WorktopsCreator';


const EditWorktops = () => {
  const [creatingWorktop, setCreatingWorktop] = useState(false);
  const {
    selectedWorktopType,selectedWorktop, changeSelectedWorktopType, changeSelectedWorktop
  } = useContext(AppContext) as AppContextType;
  const {worktops, worktopTypes} = useContext(WorktopsContext) as WorktopContextType;

  const handleSelectWorktop = (worktop: Worktop) => {
    changeSelectedWorktop(worktop);
    setCreatingWorktop(false);
  }

  const handleCreatingWorktop = () => {
    changeSelectedWorktop(null);
    setCreatingWorktop(true);
  }

  return (
    <>
      <nav id="secondary-navigation" className='w-full'>
        {selectedWorktopType && (
          <ItemList horizontal classNames={'py-4 px-2 bg-static border-b border-text  sticky w-full'}>
            {worktops && worktops.filter((worktop: Worktop) => worktop.worktop_type_id === selectedWorktopType.id).sort(sortByName).map((worktop: Worktop, key: number) => (
              <MenuItem active={selectedWorktop?.id === worktop.id ? true : false} key={key} onClick={() => handleSelectWorktop(worktop)} text={worktop.name} 
              icon={selectedWorktop?.id === worktop.id ? CountertopsTwoTone : CountertopsOutlined}/>
            ))}
            <MenuItem icon={AddRounded} text="Worktop" onClick={handleCreatingWorktop} active={creatingWorktop}/>
          </ItemList>
        )}
      </nav>
      <Flex as="section" id="worktops-editor" direction="column" classNames="w-full h-full max-h-full overflow-auto p-2" width='full'>

        {selectedWorktopType && !creatingWorktop && <WorktopsEditor worktopType={selectedWorktopType} worktop={selectedWorktop ?? null} />}
        {selectedWorktopType && creatingWorktop && <WorktopsCreator worktopType={selectedWorktopType} />}
        {!selectedWorktopType && (
          <Flex align="center" justify="center" classNames="h-full">
            <Text as="h2" size="small">
              Select a worktop to edit
            </Text>
          </Flex>
        )}
      </Flex>
    </>
  );
};

export default EditWorktops;
