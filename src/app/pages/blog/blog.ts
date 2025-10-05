import { Component } from '@angular/core';
import { LucideAngularModule, TrafficCone } from 'lucide-angular';
import { NgxOrbComponent } from '@omnedia/ngx-orb';


@Component({
  selector: 'app-blog',
  imports: [LucideAngularModule, NgxOrbComponent],
  templateUrl: './blog.html',
  styleUrl: './blog.css'
})
export class BlogComponent {
  readonly coneIcon = TrafficCone;
}
