import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { TotpComponent } from './totp/totp.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'totp', component: TotpComponent },
  { path: 'totp/:key', component: TotpComponent },
  { path: 'totp/:key/:digits', component: TotpComponent },
  { path: 'totp/:key/:digits/:timeStep', component: TotpComponent },
  { path: 'about', component: AboutComponent },
];