'use client'
import React, {useState, useEffect, use } from 'react';
import { createClient } from '@/utils/supabase/client';
import KitchenTypes from '../_components/KitchenTypes';
import ProjectCreator from '../_components/ProjectCreator';
import ProjectEditor from '../_components/ProjectEditor';
import classNames from 'classnames'; 
import { Project } from '@/app/types';


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
            setProjects(projects)
        }
        fetchProjects();
    },[]);



    const handleSelectProject = (project: Project) => {
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
        <section className='flex flex-row justify-start gap-2 self-start w-full h-full'>
            <div className='flex flex-col bg-secondary p-4 rounded min-w-fit gap-1 overflow-y-auto scrollbar-thin scrollbar-track-secondary scrollbar-thumb-secondaryHover'>
            {projects && projects.map((project: any) => (
                    <button className={classNames({ 'bg-primary': selectedProject?.id === project.id }, 'p-2 rounded text-lg font-semibold hover:bg-primaryHover')} key={project.id} onClick={() => handleSelectProject(project)}>{project.name}</button>
                ))}
                <button className={classNames({ 'bg-primary': creating},'p-2 rounded text-lg font-semibold hover:bg-primaryHover')} onClick={handleProjectCreatorOpen}>+ Project</button>
            </div>
                {selectedProject && !loading && (
                    <KitchenTypes project={selectedProject} handleProjectEditorClose={handleProjectEditorClose}/>
                )}
                {editing && (
                    <ProjectEditor />
                )}
                {creating && (
                    <ProjectCreator />
                )}
        </section>
    );
};


export default Admin;