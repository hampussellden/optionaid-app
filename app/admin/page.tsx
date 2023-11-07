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
  const [loading, setLoading] = useState<boolean>(false);
  const [projects, setProjects] = useState<Project[] | null>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [editing, setEditing] = useState<boolean>(false);
  const [creating, setCreating] = useState<boolean>(false);
  const supabase = createClient();

  useEffect(() => {
    const fetchProjects = async () => {
      const { data: projects } = await supabase.from('projects').select('*');
      if (projects) {
        setProjects(projects as Project[]);
      }
    };
    fetchProjects();
  }, []);

  const handleSelectProject = (project: Project) => {
    if (selectedProject?.id === project.id) return;
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
  useEffect(() => {
    setLoading(false);
  }, [selectedProject]);

  return (
    <>
      <section className="flex flex-row justify-start gap-2 self-start w-full h-full max-h-144">
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
          <KitchenTypes project={selectedProject} handleProjectEditorClose={handleProjectEditorClose} />
        )}
        {editing && selectedProject && <ProjectEditor project={selectedProject} />}
        {creating && <ProjectCreator />}
        {!creating && !editing && !selectedProject && (
          <Box center grow>
            <p className="text-3xl font-bold text-text">Select a project to edit</p>
          </Box>
        )}
      </section>
      <section className="flex flex-row justify-start gap-2 self-start w-full h-full max-h-144">
        <Fronts />
        <Worktops />
      </section>
    </>
  );
};

export default Admin;
