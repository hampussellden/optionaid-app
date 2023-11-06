'use client'
import React, {useState, useEffect, use } from 'react';
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


const Admin = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [projects, setProjects] = useState<Project[] | null>([]);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [editing,setEditing] = useState<boolean>(false);
    const [creating, setCreating] = useState<boolean>(false);
    const supabase = createClient();

    useEffect(() => {
        const fetchProjects = async () => {
            const { data: projects } = await supabase.from('projects').select('*');
            if (projects) {
                setProjects(projects as Project[])
            }
        }
        fetchProjects();
    },[]);

    const handleSelectProject = (project: Project) => {
        if (selectedProject?.id === project.id) return
        setSelectedProject(project);
        setLoading(true);
        setEditing(true)
        setCreating(false)
    }
    const handleProjectEditorClose = () => {
        setEditing(false)
    }
    const handleProjectCreatorOpen = () => {
        setEditing(false)
        setCreating(true)
        setSelectedProject(null)
    }
    useEffect(() => {
        setLoading(false);
    },[selectedProject]);
 
    return ( 
        <>
        <section className='flex flex-row justify-start gap-2 self-start w-full h-full overflow-y-auto'>
            <div className='flex flex-col bg-static p-4 rounded min-w-fit gap-1 overflow-y-auto scrollbar-thin scrollbar-track-secondary scrollbar-thumb-secondaryHover'>
                <ul>
                    {projects && projects.map((project: any) => (
                        <MenuItem active={selectedProject?.id === project.id ? true : false} key={project.id} onClick={() => handleSelectProject(project)} text={project.name} />
                    ))}
                    <MenuItem onClick={handleProjectCreatorOpen} icon={AddRounded} text='Project' active={creating} />
                </ul>
            </div>
                {selectedProject && !loading && (
                    <KitchenTypes project={selectedProject} handleProjectEditorClose={handleProjectEditorClose}/>
                    )}
                {editing && selectedProject && (
                    <ProjectEditor project={selectedProject}/>
                    )}
                {creating && (
                    <ProjectCreator />
                )}
                {!creating && !editing && !selectedProject &&(
                    <div className='flex flex-col justify-center items-center grow bg-static rounded'>
                        <p className='text-3xl font-bold text-text'>Select a project to edit</p>
                    </div>
                )}
        </section>
        <section className='flex flex-row justify-start gap-2 self-start w-full h-full overflow-y-auto'>
                <Fronts />
                <Worktops />
        </section>
        </>
    );
};


export default Admin;