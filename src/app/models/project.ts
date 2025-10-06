import { ProjectStatus } from "../enums/project-status-enum";

export interface Project {
    title: string;
    description: string;
    githubLink: string | null;
    liveLink: string | null;
    status: ProjectStatus;
    techStack: string[];
    isFeatured: boolean;
}