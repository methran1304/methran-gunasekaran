import { WorkStatus } from "../enums/work-status-enum";

export interface Work {
    title: string;
    description: string;
    githubLink?: string;
    githubStarCount?: number;
    githubForkCount?: number;
    liveLink?: string;
    status: WorkStatus;
    techStack: string[];
    isFeatured: boolean; // doesn't do anything for now
}