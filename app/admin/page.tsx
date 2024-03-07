'use client';
import React, { useState, useEffect, useContext } from 'react';
import { createClient } from '@/utils/supabase/client';
import KitchenTypes from '../_components/KitchenTypes';
import ProjectCreator from '../_components/ProjectCreator';
import ProjectEditor from '../_components/ProjectEditor';
import { Project } from '@/app/types';
import { AddRounded, BusinessOutlined } from '@mui/icons-material';
import MenuItem from '../_components/MenuItem';
import Fronts from '../_components/Fronts';
import Worktops from '../_components/Worktops';
import ItemList from '../_components/ItemList';
import Box from '../_components/Box';
import Message from '../_components/Message';
import { MessagesContext, MessagesContextType } from './context/MessagesContext';
import LoadingSpinner from '../_components/LoadingSpinner';
import { ProjectsContext, ProjectsContextType } from './context/ProjectsContext';
import AdminProjectsView from '../_views/AdminProjectsView';

const Admin = () => {
  const supabase = createClient();
  const [loading, setLoading] = useState<boolean>(true);
  const { projects } = useContext(ProjectsContext) as ProjectsContextType;
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [editing, setEditing] = useState<boolean>(false);
  const [creating, setCreating] = useState<boolean>(false);
  const [kitchenTypeKey, setKitchenTypeKey] = useState(0);

  const { messages } = useContext(MessagesContext) as MessagesContextType;

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
      <AdminProjectsView />
      <section
        className="flex flex-row justify-start gap-2 self-start w-full h-full max-h-144 min-h-[24rem]"
        title="Fronts manage section"
        id="fronts-manage-section"
      >
        <Fronts />
      </section>
      <section
        className="flex flex-row justify-start gap-2 self-start w-full h-full max-h-144 min-h-[24rem]"
        title="Worktops manage section"
        id="worktops-manage-section"
      >
        <Worktops />
      </section>
      {messages.length > 0 && (
        <section className="flex flex-col-reverse justify-start gap-2 self-start fixed bottom-2 right-2 items-end transition">
          {messages.map((message, i) => (
            <Message message={message} key={i} />
          ))}
        </section>
      )}
    </>
  );
};

export default Admin;
