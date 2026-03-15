import { Component } from '@angular/core';
import { NgxTypewriterComponent } from '@omnedia/ngx-typewriter';
import { NgxCrypticTextComponent } from '@omnedia/ngx-cryptic-text';
import { LucideAngularModule, FileUser, FolderOpen, NotebookPen } from 'lucide-angular';
import { RouterLink } from '@angular/router';
import { ROUTE_CONSTANTS } from '../../constants/route-contants';

@Component({
  selector: 'app-home',
  imports: [
    NgxTypewriterComponent,
    NgxCrypticTextComponent,
    LucideAngularModule,
    RouterLink
],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {
  readonly fileUserIcon = FileUser;
  readonly folderIcon = FolderOpen;
  readonly notebookPenIcon = NotebookPen;
  readonly routeConstants = ROUTE_CONSTANTS;
}
