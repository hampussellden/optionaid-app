'use client'
import React, {useState, useEffect, use } from 'react';
import { createClient } from '@/utils/supabase/client';
import KitchenTypes from '../_components/KitchenTypes';

export type Project = {
    id: number,
    name: string | null,
}

const Admin = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [projects, setProjects] = useState<Project[] | null>([]);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [editing,setEditing] = useState<boolean>(false);
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
    }
    const handleProjectEditorClose = () => {
        setEditing(false)
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
            </div>
                {selectedProject && !loading && (
                    <KitchenTypes project={selectedProject} handleProjectEditorClose={handleProjectEditorClose}/>
                )}

                {editing && (
                    <div className='self-end bg-slate-500 h-40 w-full'>
                        editing project here
                    </div>
                )}
        </section>
    );
};

export default Admin;