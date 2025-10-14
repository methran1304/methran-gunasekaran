import { Component } from '@angular/core';
import { NgxTypewriterComponent } from '@omnedia/ngx-typewriter';
import { NgxCrypticTextComponent } from '@omnedia/ngx-cryptic-text';
import { LucideAngularModule, Download, FolderOpen } from 'lucide-angular';
import { RouterLink } from '@angular/router';

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
  readonly dlIcon = Download;
  readonly folderIcon = FolderOpen;
  
  test() {}
  
  navigateToProjects() {
    console.log('Navigate to projects');
  }
}
