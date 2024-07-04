'use client';
import { useState, useContext, useEffect } from 'react';
import SideBarListItemWithChildren from '@/Containers/SideBarListItemWithChildren';
import { ProjectsContext, ProjectsContextType } from '@/app/admin/context/ProjectsContext';
import { FrontsContext, FrontsContextType } from '@/app/admin/context/FrontsContext';
import { WorktopContextType, WorktopsContext } from '@/app/admin/context/WorktopsContext';
import { AddRounded, BusinessTwoTone, CountertopsTwoTone, DoorBackTwoTone } from '@mui/icons-material';
import Flex from '@/Containers/Flex';
import MenuItem from '@/components/MenuItem';
import { AppContext, AppContextType } from '@/app/admin/context/AppContext';
import Button from '@/components/Button';
import Text from '@/components/Text';

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('' as string);
  const { projects } = useContext(ProjectsContext) as ProjectsContextType;
  const { frontTypes } = useContext(FrontsContext) as FrontsContextType;
  const { worktopTypes } = useContext(WorktopsContext) as WorktopContextType;
  const { user, changeAppState, state } = useContext(AppContext) as AppContextType;

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

  const AdjustingAside = (props: any) => {
    const [hovered, setHovered] = useState(false);
    const handleMouseEnter = () => setHovered(true);
    const handleMouseLeave = () => setHovered(false);
    const classes = `
    bg-static p-2 h-full overflow-y-auto overflow-x-hidden border-r border-r-1 border-text flex flex-col justify-between max-h-screen scrollbar-thin w-full`;
    return (
      <aside
        id="sidebar-navigation"
        className={classes}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {props.children}
      </aside>
    );
  };
  return (
    <AdjustingAside>
      <nav>
        <Flex as="ul" direction="column" gap={4}>
          <SideBarListItemWithChildren
            name="Projects"
            items={projects}
            onClick={() => handleClickItem('projects')}
            isActive={activeItem === 'projects' && state === 'EditProject'}
            icon={BusinessTwoTone}
            state="EditProject"
          />
          <MenuItem icon={AddRounded} text="New Project" active={state === 'CreateProject'} onClick={() => changeAppState('CreateProject')} />
          <SideBarListItemWithChildren
            name="Front Types"
            items={frontTypes}
            onClick={() => handleClickItem('frontTypes')}
            isActive={activeItem === 'frontTypes' && state === 'EditFrontType'}
            icon={DoorBackTwoTone}
            state="EditFrontType"
          />
          <MenuItem
            icon={AddRounded}
            text="New Front Type"
            active={state === 'CreateFrontType'}
            onClick={() => changeAppState('CreateFrontType')}
          />
          <SideBarListItemWithChildren
            name="Worktop Types"
            items={worktopTypes}
            onClick={() => handleClickItem('worktopTypes')}
            isActive={activeItem === 'worktopTypes' && state === 'EditWorktopType'}
            icon={CountertopsTwoTone}
            state="EditWorktopType"
          />
          <MenuItem
            icon={AddRounded}
            text="New Worktop Type"
            active={state === 'CreateWorktopType'}
            onClick={() => changeAppState('CreateWorktopType')}
          />
        </Flex>
      </nav>
      {user && (
        <Flex direction="column" align="stretch" gap={2}>
          <Text as="p">{user.full_name}</Text>
          <form action="/auth/sign-out" method="post">
            <Button text="Logout" fullWidth accent />
          </form>
        </Flex>
      )}
    </AdjustingAside>
  );
};
export default Sidebar;
