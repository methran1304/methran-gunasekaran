export interface BlogPost {
    id: number;
    title: string;
    description: string;
    slug: string;
    tags: string[];
    publishedDate: string;
    isLinkCopied: boolean;
}