import { Component } from '@angular/core';
import { LucideAngularModule, TrafficCone } from 'lucide-angular';
import { NgxOrbComponent } from '@omnedia/ngx-orb';
import { MarkdownComponent } from 'ngx-markdown';


@Component({
  selector: 'app-blog',
  imports: [LucideAngularModule, NgxOrbComponent, MarkdownComponent],
  templateUrl: './blog.html',
  styleUrl: './blog.css'
})
export class BlogComponent {
  readonly coneIcon = TrafficCone;  
  readonly filePath = '/test.md';
}
