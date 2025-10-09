import { Component } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-about',
  imports: [MarkdownComponent],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class AboutComponent {
readonly filePath = "./about.md";
}
