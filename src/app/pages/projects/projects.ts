import { Component } from '@angular/core';
import {
  LucideAngularModule,
  ExternalLink,
  Github,
  TrafficCone,
} from 'lucide-angular';
import { Project } from '../../models/project';
import { ProjectStatus } from '../../enums/project-status-enum';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-projects',
  imports: [LucideAngularModule, NgClass],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class ProjectsComponent {
  readonly projectStatusEnum = ProjectStatus;
  readonly liveSiteIcon = ExternalLink;
  readonly githubIcon = Github;
  readonly coneIcon = TrafficCone;

  projects: Project[] = [
    {
      title: 'Verbatim',
      description:
        'An AI-powered typing platform that helps users improve speed and accuracy through adaptive exercises, real-time analytics, and personalized feedback.',
      githubLink: 'https://github.com/methran1304/verbatim-app',
      liveLink: 'https://verbatim.pro',
      status: ProjectStatus.Completed,
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
      githubLink: null, // proprietary
      liveLink: 'https://document360.com',
      status: ProjectStatus.Completed,
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
      status: ProjectStatus.Completed,
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
      status: ProjectStatus.InProgress,
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
      status: ProjectStatus.InProgress,
      techStack: ['C#', '.NET 9', 'Raylib-cs'],
      isFeatured: false,
    },
  ];
}
