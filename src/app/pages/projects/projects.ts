import { Component, inject, OnInit } from '@angular/core';
import {
  LucideAngularModule,
  ExternalLink,
  Github,
  TrafficCone,
  Star,
  GitFork,
} from 'lucide-angular';
import { Work } from '../../models/work';
import { WorkStatus } from '../../enums/work-status-enum';
import { NgClass } from '@angular/common';
import { GitHubStatsService } from '../../services/github-stats-service';

@Component({
  selector: 'app-projects',
  imports: [LucideAngularModule, NgClass],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class ProjectsComponent implements OnInit {
  private githubStatsService = inject(GitHubStatsService);

  readonly WorkStatusEnum = WorkStatus;
  readonly liveSiteIcon = ExternalLink;
  readonly githubIcon = Github;
  readonly coneIcon = TrafficCone;
  readonly starIcon = Star;
  readonly gitForkIcon = GitFork;

  projects: Work[] = [
    {
      title: 'Verbatim',
      description:
        'An AI-powered typing platform that helps users improve speed and accuracy through adaptive exercises, real-time analytics, and personalized feedback.',
      githubLink: 'https://github.com/methran1304/verbatim-app',
      liveLink: 'https://verbatim.pro',
      status: WorkStatus.Completed,
      techStack: [
        '.NET 9',
        'MongoDB',
        'FastAPI',
        'Google Gemini LLM',
        'Angular v20',
        'SignalR',
      ],
      isFeatured: true,
    },
    {
      title: 'Document360 Identity Platform',
      description:
        'Handled authentication for a global SaaS platform, improving speed, security, and user experience while introducing features to single sign-on module.',
      liveLink: 'https://document360.com',
      status: WorkStatus.Completed,
      techStack: [
        'ASP.NET Core',
        'IdentityServer',
        'SQL Server',
        'Redis',
        'SAML/OIDC SSO',
      ],
      isFeatured: false,
    },
    {
      title: 'methran.dev',
      description:
        'A modern and responsive personal site with a Unix shell-inspired design featuring a Git-backed blogging system built with serverless functions.',
      githubLink: 'https://github.com/methran1304/methran-gunasekaran',
      liveLink: 'https://methran.dev',
      status: WorkStatus.Completed,
      techStack: [
        'Angular v20',
        'TypeScript',
        'Tailwind CSS',
        'NgxUI',
        'Serverless Function',
        'GitHub as CMS',
        'Markdown Blog',
      ],
      isFeatured: false,
    },
    {
      title: 'GraphForge',
      description:
        'A Rust-based compiler for a DSL that converts code into diagrams, built to simplify data structure visualisation. A lightweight alternative for MermaidJS.',
      githubLink: 'https://github.com/methran1304/graph-forge',
      liveLink: '',
      status: WorkStatus.InProgress,
      techStack: [
        'Rust',
        'DSL Interpreter',
        'AST Parsing',
        'Graph Rendering',
        'CLI Tool',
      ],
      isFeatured: false,
    },
    {
      title: 'CHIP-8 Emulator',
      description:
        'A lightweight CHIP-8 emulator in C# with full opcode support, 60 Hz timers, and a 64x32 framebuffer.',
      githubLink: 'https://github.com/methran1304/chip8-csharp',
      liveLink: '',
      status: WorkStatus.InProgress,
      techStack: ['C#', '.NET 9', 'Raylib-cs'],
      isFeatured: false,
    },
  ];

  openSourceContributions: Work[] = [
    {
      title: 'Ocelot',
      description:
        'A .NET API Gateway for building microservice architectures. Contributed by migrating AcceptanceTests and UnitTests from xUnit v2 to xUnit v3.',
      githubLink:
        'https://github.com/ThreeMammals/Ocelot/pulls?q=is%3Apr+author%3Amethran1304',
      liveLink: 'https://ocelot.readthedocs.io',
      status: WorkStatus.Completed,
      techStack: ['.NET', 'C#', 'xUnit', 'API Gateway', 'Microservices'],
      isFeatured: false,
    },
    {
      title: 'charttools',
      description:
        'A C# library for editing Clone Hero song data. Added enum validation for chart metadata.',
      githubLink:
        'https://github.com/TheBoxyBear/charttools/pulls?q=is%3Apr+author%3Amethran1304',
      liveLink: 'https://theboxybear.github.io/charttools/',
      status: WorkStatus.Completed,
      techStack: ['C#', '.NET', 'Library Development', 'Data Validation'],
      isFeatured: false,
    },
    {
      title: 'tldr-pages',
      description:
        'A community-driven collection of simplified CLI documentation. Added Linux pages for tools such as amdgpu_top and nvtop.',
      githubLink:
        'https://github.com/tldr-pages/tldr/pulls?q=is%3Apr+author%3Amethran1304',
      liveLink: 'https://tldr.sh',
      status: WorkStatus.Completed,
      techStack: [
        'Markdown',
        'CLI Tools',
        'Linux',
        'Open Source Documentation',
      ],
      isFeatured: false,
    },
    {
      title: 'Zen Browser',
      description:
        'A privacy-focused desktop browser. Contributed enhancement ideas through community discussions.',
      githubLink: 'https://github.com/zen-browser/desktop/discussions/10679',
      liveLink: 'https://zen-browser.app',
      status: WorkStatus.Completed,
      techStack: [
        'Desktop Browser',
        'Web Technologies',
        'Open Source',
        'Product Discussions',
      ],
      isFeatured: false,
    },
  ];

  ngOnInit(): void {
    this.loadGitHubStats();
  }

  private loadGitHubStats(): void {
    this.githubStatsService.getStats().subscribe((cache) => {
      this.projects = this.projects.map((project) =>
        this.updateProjectStats(project, cache.repos)
      );

      this.openSourceContributions = this.openSourceContributions.map(
        (project) => this.updateProjectStats(project, cache.repos)
      );
    });
  }

  private updateProjectStats(
    project: Work,
    repos: Record<string, { stars: number; forks: number }>
  ): Work {
    if (!project.githubLink) return project;

    const repoPath = this.githubStatsService.extractRepoPath(
      project.githubLink
    );
    if (!repoPath || !repos[repoPath]) return project;

    return {
      ...project,
      githubStarCount: repos[repoPath].stars,
      githubForkCount: repos[repoPath].forks,
    };
  }
}
