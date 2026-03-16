export interface BlogPost {
    id: number;
    slug: string;
    isLinkCopied: boolean;
    frontMatter: FrontMatter;
}

export interface FrontMatter {
    title: string;
    description: string;
    tags: string[];
    publishedDate: Date;
}