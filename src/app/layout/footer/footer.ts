import { Component } from '@angular/core';
import { LucideAngularModule, Github, Linkedin, Mail } from 'lucide-angular';

@Component({
  selector: 'app-footer',
  imports: [LucideAngularModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class FooterComponent {
  readonly githubIcon = Github;
  readonly linkedInIcon = Linkedin;
  readonly mailIcon = Mail;
}
