import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-looking-glass',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './looking-glass.component.html',
  styleUrl: './looking-glass.component.scss'
})
export class LookingGlassComponent {

  public imageName: string = '';
  public intent: string = '';

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.intent = params['intent'];
      switch (this.intent) {
        case 'SUCCESS':
          this.imageName = `/images/success-${this.randomNumber(6)}.webp`;
          break;
        case 'ERROR':
          this.imageName = `/images/error-${this.randomNumber(6)}.webp`;
          break;
        case 'PAID':
          this.imageName = `/images/paid-${this.randomNumber(4)}.webp`;
          break;
        default:
          this.imageName = '';
          break;
      }
    });
  }

  private randomNumber(max: number): number {
    return Math.floor(Math.random() * max); 
  }
}
