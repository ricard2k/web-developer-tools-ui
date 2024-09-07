import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClockRotateLeft, faArrowsTurnToDots, faEye } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    RouterModule,
    FontAwesomeModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  serviceItems = [
    { label: 'Time based One Time Password', icon: faClockRotateLeft, path: '/totp' },
    { label: 'Web hooks', icon: faArrowsTurnToDots, path: '/wh', toBeImplemented: true },
    { label: 'Request looking glass', icon: faEye, path: '/rlg', toBeImplemented: true },
  ];

}
