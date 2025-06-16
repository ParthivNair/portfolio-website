import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Project {
    id: string;
    title: string;
    description: string;
    image: string;
    tags: string[];
    demoUrl: string;
    githubUrl: string;
    createdAt: number;
}

interface ProjectStore {
    projects: Project[];
    addProject: (project: Omit<Project, 'id' | 'createdAt'>) => void;
    removeProject: (id: string) => void;
    setProjects: (projects: Project[]) => void;
}

export const useProjectStore = create<ProjectStore>()(
    persist(
        (set) => ({
            projects: [],
            addProject: (project) =>
                set((state) => ({
                    projects: [
                        ...state.projects,
                        {
                            ...project,
                            id: crypto.randomUUID(),
                            createdAt: Date.now(),
                        },
                    ],
                })),
            removeProject: (id) =>
                set((state) => ({
                    projects: state.projects.filter((project) => project.id !== id),
                })),
            setProjects: (projects) => set({ projects }),
        }),
        {
            name: 'project-storage',
        }
    )
); 