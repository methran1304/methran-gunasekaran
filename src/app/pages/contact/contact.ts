import { Component } from '@angular/core';
import { LucideAngularModule, Github, Linkedin, Mail, ChefHat, Code } from 'lucide-angular';

@Component({
  selector: 'app-contact',
  imports: [LucideAngularModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class ContactComponent {
  readonly githubIcon = Github;
  readonly linkedInIcon = Linkedin;
  readonly mailIcon = Mail;
  readonly chefIcon = ChefHat;
  readonly codeIcon = Code;
}
