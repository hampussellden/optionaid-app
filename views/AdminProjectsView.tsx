'use client';
import React, { useContext, useState } from 'react';
import { ProjectsContext, ProjectsContextType } from '@/app/admin/context/ProjectsContext';
import { Project } from '@/app/types';
import ItemList from '@/components/ItemList';
import MenuItem from '@/components/MenuItem';
import Box from '@/components/Box';
import KitchenTypes from '@/components/KitchenTypes';
import ProjectEditor from '@/components/ProjectEditor';
import ProjectCreator from '@/components/ProjectCreator';
import { AddRounded, BusinessOutlined } from '@mui/icons-material';
import { sortByName } from '@/utilities/helpers/sorting';

const AdminProjectsView = () => {
  const { projects } = useContext(ProjectsContext) as ProjectsContextType;
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [editing, setEditing] = useState<boolean>(false);
  const [creating, setCreating] = useState<boolean>(false);
  const [kitchenTypesKey, setKitchenTypesKey] = useState(0);

  const handleProjectClick = (project: Project) => {
    if (selectedProject?.id === project.id) {
      setKitchenTypesKey((prevKey) => prevKey + 1);
      setEditing(true);
      return;
    }
    setEditing(true);
    setCreating(false);
    setSelectedProject(project);
  };
  const handleProjectEditorClose = () => {
    setEditing(false);
  };
  const handleProjectCreatorOpen = () => {
    setEditing(false);
    setCreating(true);
    setSelectedProject(null);
  };

  return (
    <section
      className="flex flex-row justify-start gap-2 self-start w-full h-full max-h-160 min-h-[24rem]"
      title="Project manage section"
      id="project-manage-section"
    >
      <Box>
        <ItemList>
          {projects &&
            projects
              .sort(sortByName)
              .map((project: any) => (
                <MenuItem
                  active={selectedProject?.id === project.id ? true : false}
                  key={project.id}
                  onClick={() => handleProjectClick(project)}
                  text={project.name}
                  icon={BusinessOutlined}
                />
              ))}
          <MenuItem onClick={handleProjectCreatorOpen} icon={AddRounded} text="Project" active={creating} />
        </ItemList>
      </Box>
      {selectedProject && (
        <KitchenTypes
          project={selectedProject}
          handleProjectEditorClose={handleProjectEditorClose}
          key={kitchenTypesKey}
        />
      )}
      {editing && selectedProject && <ProjectEditor project={selectedProject} />}
      {creating && <ProjectCreator />}
      {!creating && !editing && !selectedProject && (
        <Box grow center>
          <p className="text-3xl font-bold text-text">Select a project to edit</p>
        </Box>
      )}
    </section>
  );
};
export default AdminProjectsView;
