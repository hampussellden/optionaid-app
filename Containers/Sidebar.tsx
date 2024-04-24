'use client';
import { useState, useContext } from 'react';
import SideBarListItemWithChildren from '@/containers/SideBarListItemWithChildren';
import { ProjectsContext, ProjectsContextType } from '@/app/admin/context/ProjectsContext';
import { FrontsContext, FrontsContextType } from '@/app/admin/context/FrontsContext';
import { WorktopContextType, WorktopsContext } from '@/app/admin/context/WorktopsContext';
import { BusinessTwoTone, CountertopsTwoTone, DoorBackTwoTone } from '@mui/icons-material';
import Flex from './Flex';
const SideBar = () => {
  const [activeItem, setActiveItem] = useState('' as string);
  const { projects } = useContext(ProjectsContext) as ProjectsContextType;
  const { frontTypes } = useContext(FrontsContext) as FrontsContextType;
  const { worktopTypes } = useContext(WorktopsContext) as WorktopContextType;
  const handleClickItem = (name: string) => {
    setActiveItem(name);
  };
  return (
    <aside className="bg-static p-2 h-full min-h-screen overflow-y-auto" id="sidebar-navigation">
      <nav>
        <Flex as="ul" direction="column" rowGap={1}>
          <SideBarListItemWithChildren
            name="Projects"
            items={projects}
            onClick={() => handleClickItem('Projects')}
            isActive={activeItem === 'Projects'}
            icon={BusinessTwoTone}
            state="EditProject"
          />
          <SideBarListItemWithChildren
            name="Fronts"
            items={frontTypes}
            onClick={() => handleClickItem('frontTypes')}
            isActive={activeItem === 'frontTypes'}
            icon={DoorBackTwoTone}
          />
          <SideBarListItemWithChildren
            name="Worktops"
            items={worktopTypes}
            onClick={() => handleClickItem('worktopTypes')}
            isActive={activeItem === 'worktopTypes'}
            icon={CountertopsTwoTone}
          />
        </Flex>
      </nav>
    </aside>
  );
};
export default SideBar;
