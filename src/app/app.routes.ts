import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { TotpComponent } from './totp/totp.component';
import { BtoaComponent } from './btoa/btoa.component';
import { WebhooksComponent } from './webhooks/webhooks.component';
import { LookingGlassComponent } from './looking-glass/looking-glass.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'totp', component: TotpComponent },
  { path: 'totp/:sharedSecret', component: TotpComponent },
  { path: 'totp/:sharedSecret/:digits', component: TotpComponent },
  { path: 'totp/:sharedSecret/:digits/:timeStep', component: TotpComponent },
  { path: 'btoa', component: BtoaComponent },
  { path: 'wh', component: WebhooksComponent},
  { path: 'wh/:webhookId', component: WebhooksComponent},
  { path: 'about', component: AboutComponent },
  { path: 'lg', component: LookingGlassComponent },
  { path: 'lg/:intent', component: LookingGlassComponent },
];
