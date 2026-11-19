import { Component } from '@angular/core';

interface Achievement {
  title: string;
  description: string;
}

@Component({
  selector: 'app-about',
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class AboutComponent {
  readonly workRecognition: Achievement[] = [
    {
      title: 'Team of the Quarter – Kovai.co',
      description:
        'Recognised for major contributions to bug fixes and feature rollouts for the Document360 product.',
    },
    {
      title: 'Scholarship – LWT Academy',
      description:
        'Awarded an educational trip to Singapore for outstanding performance in coding contests.',
    },
  ];

  readonly codingCompetitions: Achievement[] = [
    {
      title: '2nd Place – UKIEPC (North West UK Region)',
      description:
        'Finished 2nd among 40+ teams, earning eligibility to compete in the ICPC Europe Championship.',
    },
    {
      title: '1st Place – CoDebug (Hindustan Institutions)',
      description:
        'Solved the highest number of problems among 50+ participants in a debugging contest.',
    },
    {
      title: '1st Place – TopCoder (SSEC)',
      description:
        'Achieved 1st position out of 200 teams in data structure and algorithm challenges.',
    },
    {
      title: '2nd Place – Code Gladiators (Parul University, Gujarat)',
      description:
        'Competed in a C programming event focused on I/O-intensive applications.',
    },
  ];
}
