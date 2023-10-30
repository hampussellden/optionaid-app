'use client'
import React, {useState, useEffect, use } from 'react';
import { createClient } from '@/utils/supabase/client';
import KitchenTypes from '../_components/KitchenTypes';
import ProjectCreator from '../_components/ProjectCreator';

export type Project = {
    id: number,
    name: string | null,
}

const Admin = ({data} : any) => {
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
        <section className='flex flex-row justify-start gap-12 self-start w-full'>
            <div className='flex flex-col'>
            {projects && projects.map((project: any) => (
                    <button className={selectedProject?.id == project.id ?'bg-white text-black' : 'text-white'}key={project.id} onClick={() => handleSelectProject(project)}>{project.name}</button>
                ))}
                <button className='bg-black text-white' onClick={handleProjectCreatorOpen}>add new project +</button>
            </div>
                {selectedProject && !loading && (
                    <KitchenTypes project={selectedProject} handleProjectEditorClose={handleProjectEditorClose}/>
                )}
                {editing && (
                    <div>Editing = true</div>
                )}
                {creating && (
                    <ProjectCreator />
                )}
        </section>
    );
};


export default Admin;