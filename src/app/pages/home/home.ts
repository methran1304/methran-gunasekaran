import { Component } from '@angular/core';
import { NgxTypewriterComponent } from '@omnedia/ngx-typewriter';
import { NgxMarqueeComponent } from '@omnedia/ngx-marquee';
import { NgxGradientTextComponent } from '@omnedia/ngx-gradient-text';
import { NgxCrypticTextComponent } from '@omnedia/ngx-cryptic-text';

@Component({
  selector: 'app-home',
  imports: [NgxTypewriterComponent, NgxMarqueeComponent, NgxGradientTextComponent, NgxCrypticTextComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
}
