'use client';
import React, { useState, useEffect, use } from 'react';
import { createClient } from '@/utils/supabase/client';
import KitchenTypes from '../_components/KitchenTypes';
import ProjectCreator from '../_components/ProjectCreator';
import ProjectEditor from '../_components/ProjectEditor';
import classNames from 'classnames';
import { Project } from '@/app/types';
import { AddRounded } from '@mui/icons-material';
import MenuItem from '../_components/MenuItem';
import FrontsCreator from '../_components/FrontsCreator';
import Fronts from '../_components/Fronts';
import Worktops from '../_components/Worktops';
import ItemList from '../_components/ItemList';
import Box from '../_components/Box';

const Admin = () => {
  const supabase = createClient();
  const [loading, setLoading] = useState<boolean>(false);
  const [projects, setProjects] = useState<Project[] | null>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [editing, setEditing] = useState<boolean>(false);
  const [creating, setCreating] = useState<boolean>(false);
  const [kitchenTypeKey, setKitchenTypeKey] = useState(0);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data: projects } = await supabase.from('projects').select('*');
      if (projects) {
        setProjects(projects as Project[]);
        setLoading(false);
      }
    };
    fetchProjects();
  }, [loading]);

  useEffect(() => {
    setLoading(false);
  }, [selectedProject]);

  const handleSelectProject = (project: Project) => {
    if (selectedProject?.id === project.id) {
      setKitchenTypeKey((prevKey) => prevKey + 1);
      setEditing(true);
      return;
    }
    setSelectedProject(project);
    setLoading(true);
    setEditing(true);
    setCreating(false);
  };
  const handleProjectEditorClose = () => {
    setEditing(false);
  };
  const handleProjectCreatorOpen = () => {
    setEditing(false);
    setCreating(true);
    setSelectedProject(null);
  };
  const handleProjectLoading = () => {
    setLoading(true);
  };

  return (
    <>
      <section className="flex flex-row justify-start gap-2 self-start w-full h-full max-h-160">
        <Box>
          <ItemList>
            {projects &&
              projects.map((project: any) => (
                <MenuItem
                  active={selectedProject?.id === project.id ? true : false}
                  key={project.id}
                  onClick={() => handleSelectProject(project)}
                  text={project.name}
                />
              ))}
            <MenuItem onClick={handleProjectCreatorOpen} icon={AddRounded} text="Project" active={creating} />
          </ItemList>
        </Box>
        {selectedProject && !loading && (
          <KitchenTypes
            project={selectedProject}
            handleProjectEditorClose={handleProjectEditorClose}
            key={kitchenTypeKey}
          />
        )}
        {editing && selectedProject && <ProjectEditor project={selectedProject} update={handleProjectLoading} />}
        {creating && <ProjectCreator update={handleProjectLoading} />}
        {!creating && !editing && !selectedProject && (
          <Box center grow>
            <p className="text-3xl font-bold text-text">Select a project to edit</p>
          </Box>
        )}
      </section>
      <section className="flex flex-row justify-start gap-2 self-start w-full h-full max-h-160">
        <Fronts />
        <Worktops />
      </section>
    </>
  );
};

export default Admin;
