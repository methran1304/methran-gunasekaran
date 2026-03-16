import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import techStack from '../../data/tech-stack.json';
import { NgxTypewriterComponent } from '@omnedia/ngx-typewriter';
import { NgxCrypticTextComponent } from '@omnedia/ngx-cryptic-text';
import {
  LucideAngularModule,
  FileUser,
  FolderOpen,
  NotebookPen,
} from 'lucide-angular';
import { RouterLink } from '@angular/router';
import { ROUTE_CONSTANTS } from '../../constants/route-contants';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    NgxTypewriterComponent,
    NgxCrypticTextComponent,
    LucideAngularModule,
    RouterLink,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {
  languages = techStack.languages;
  frameworks = techStack.frameworks;
  tools = techStack.tools;

  readonly fileUserIcon = FileUser;
  readonly folderIcon = FolderOpen;
  readonly notebookPenIcon = NotebookPen;
  readonly routeConstants = ROUTE_CONSTANTS;
}
