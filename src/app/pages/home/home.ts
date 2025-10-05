import { Component } from '@angular/core';
import { NgxTypewriterComponent } from '@omnedia/ngx-typewriter';
import { NgxMarqueeComponent } from '@omnedia/ngx-marquee';
import { NgxGradientTextComponent } from '@omnedia/ngx-gradient-text';
import { NgxCrypticTextComponent } from '@omnedia/ngx-cryptic-text';
import { LucideAngularModule, Download, FolderOpen } from 'lucide-angular';

@Component({
  selector: 'app-home',
  imports: [
    NgxTypewriterComponent,
    NgxMarqueeComponent,
    NgxGradientTextComponent,
    NgxCrypticTextComponent,
    LucideAngularModule,
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
