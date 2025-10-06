import { Component } from '@angular/core';
import { LucideAngularModule, ExternalLink, Github } from 'lucide-angular';
import { Project } from '../../models/project';
import { ProjectStatus } from '../../enums/project-status-enum';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-projects',
  imports: [LucideAngularModule, NgClass],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class ProjectsComponent {
  readonly liveSiteIcon = ExternalLink;
  readonly githubIcon = Github;

  projects: Project[] = [
    {
      title: "Verbatim",
      description: "An AI-powered typing platform that helps users improve speed and accuracy through adaptive drills, real-time analytics, and personalized feedback.",
      githubLink: "https://github.com/methran1304/verbatim-app",
      liveLink: "https://verbatim.pro",
      status: ProjectStatus.InProgress,
      techStack: [
        ".NET 9",
        "MongoDB",
        "FastAPI",
        "Google Gemini LLM",
        "Angular v20",
        "SignalR"
      ],
      isFeatured: true
    },
    {
      title: "Document360 Identity Platform",
      description: "Handled authentication for a global SaaS platform, improving speed, security, and user experience while introducing features to single sign-on module.",
      githubLink: null, // proprietary
      liveLink: "https://document360.com",
      status: ProjectStatus.Completed,
      techStack: [
        "ASP.NET Core",
        "IdentityServer",
        "SQL Server",
        "Redis",
        "SAML/OIDC SSO"
      ],
      isFeatured: false
    },
    {
      title: "Methran-Gunasekaran",
      description: "A modern, responsive personal website with Unix terminal shell-inspired design where I share my thoughts and showcase my work.",
      githubLink: "https://github.com/methran1304/methran-gunasekaran",
      liveLink: 'http://localhost:4200', // will be deployed
      status: ProjectStatus.InProgress,
      techStack: [
        "Angular v20",
        "TypeScript",
        "Tailwind CSS",
        "NgxUI"
      ],
      isFeatured: false
    }
    
  ];
}
