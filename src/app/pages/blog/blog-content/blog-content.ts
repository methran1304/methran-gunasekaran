import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ArrowLeft, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-blog-content',
  imports: [RouterLink,  LucideAngularModule],
  templateUrl: './blog-content.html',
  styleUrl: './blog-content.css'
})
export class BlogContentComponent implements OnInit {
  readonly arrowIcon = ArrowLeft;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      console.log(params);
    });
  }
}
