import { Component } from '@angular/core';
import { LucideAngularModule, TrafficCone } from 'lucide-angular';


@Component({
  selector: 'app-blog',
  imports: [LucideAngularModule],
  templateUrl: './blog.html',
  styleUrl: './blog.css'
})
export class BlogComponent {
  readonly coneIcon = TrafficCone;  
  readonly filePath = '/test.md';
}
