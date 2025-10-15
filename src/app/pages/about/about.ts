import { Component } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';
import { LucideAngularModule, ArrowLeft } from 'lucide-angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [MarkdownComponent, LucideAngularModule, RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class AboutComponent {
  readonly arrowIcon = ArrowLeft;
  readonly filePath = './about.md';
}
