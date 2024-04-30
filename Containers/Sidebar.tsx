'use client';
import { useState, useContext, useEffect } from 'react';
import SideBarListItemWithChildren from '@/containers/SideBarListItemWithChildren';
import { ProjectsContext, ProjectsContextType } from '@/app/admin/context/ProjectsContext';
import { FrontsContext, FrontsContextType } from '@/app/admin/context/FrontsContext';
import { WorktopContextType, WorktopsContext } from '@/app/admin/context/WorktopsContext';
import {
  AddRounded,
  BusinessTwoTone,
  CountertopsTwoTone,
  DoorBackTwoTone,
} from '@mui/icons-material';
import Flex from './Flex';
import MenuItem from '@/components/MenuItem';
import { AppContext, AppContextType } from '@/app/admin/context/AppContext';
import Button from '@/components/Button';
import Text from '@/components/Text';


const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('' as string);
  const { projects } = useContext(ProjectsContext) as ProjectsContextType;
  const { frontTypes } = useContext(FrontsContext) as FrontsContextType;
  const { worktopTypes } = useContext(WorktopsContext) as WorktopContextType;
  const { user, changeAppState } = useContext(AppContext) as AppContextType;

  const handleClickItem = (name: 'projects' | 'frontTypes' | 'worktopTypes') => {
    setActiveItem(name);
    switch (name) {
      case 'projects':
        changeAppState('EditProject');
        break;
      case 'frontTypes':
        changeAppState('EditFrontType');
        break;
      case 'worktopTypes':
        changeAppState('EditWorktopType');
        break;
      default:
        break;
    }
  };
  return (
    <aside
      className="bg-static p-4 h-full overflow-auto border border-text flex flex-col justify-between max-h-screen scrollbar-thin"
      id="sidebar-navigation"
    >
      <nav>
        <Flex as="ul" direction="column" gap={4}>
          <SideBarListItemWithChildren
            name="Projects"
            items={projects}
            onClick={() => handleClickItem('projects')}
            isActive={activeItem === 'projects'}
            icon={BusinessTwoTone}
            state="EditProject"
          />
          <MenuItem icon={AddRounded} text="New Project" onClick={() => changeAppState('CreateProject')} />
          <SideBarListItemWithChildren
            name="Front Types"
            items={frontTypes}
            onClick={() => handleClickItem('frontTypes')}
            isActive={activeItem === 'frontTypes'}
            icon={DoorBackTwoTone}
            state="EditFrontType"
          />
          <MenuItem icon={AddRounded} text="New Front Type" onClick={() => changeAppState('CreateFrontType')} />
          <SideBarListItemWithChildren
            name="Worktop Types"
            items={worktopTypes}
            onClick={() => handleClickItem('worktopTypes')}
            isActive={activeItem === 'worktopTypes'}
            icon={CountertopsTwoTone}
            state="EditWorktopType"
          />
          <MenuItem icon={AddRounded} text="New Worktop Type" onClick={() => changeAppState('CreateWorktopType')} />
        </Flex>
      </nav>
      {user && (

        <Flex direction='column' align='stretch' gap={2}>
          <Text as='p'>{user.full_name}</Text>
          <form action="/auth/sign-out" method="post">
            <Button text='Logout' fullWidth />
          </form>
    </Flex>
    )}
    </aside>
  );
};
export default Sidebar;
