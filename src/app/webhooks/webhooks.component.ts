import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebhooksService } from './webhooks.service';
import { CommonModule } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';
import { MatIcon } from '@angular/material/icon';
import {WebhookElement, WebhookFilenamePipe } from './webhook-filename.pipe';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-webhooks',
  standalone: true,
  imports: [
    CommonModule,
    MatIcon,
    WebhookFilenamePipe
  ],
  templateUrl: './webhooks.component.html',
  styleUrl: './webhooks.component.scss'
})
export class WebhooksComponent {
  webhooks: string[] = [];
  webhookId: string = '';
  webhookLocation: string = '';
  webhookViewLocation: string = '';

  constructor(
    private webhooksService: WebhooksService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.webhookId = params['webhookId'];
      if (this.webhookId) {
        this.webhooksService.listWebhooks(this.webhookId).subscribe({
          next: webhooks => {
            this.webhooks = webhooks;
          },
          error: error => {
            console.error('Error fetching webhooks:', error);
          }
        });
      } else {
        this.webhookId = uuidv4();
      }
      this.webhookLocation = 'https://api.rick.tools/' + this.webhookId;
      this.webhookViewLocation = window.location.origin + '/#/wh/' + this.webhookId ;
    })
  }

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      console.log('Text copied to clipboard', text);
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  }

  loadDetails(webhook: WebhookElement): void {
    webhook.showDetails = !webhook.showDetails;
    if (!webhook.details) {   
      this.webhooksService.getWebhook(webhook.filename).subscribe({
        next: response => {
          webhook.details = response;
        },
        error: error => {
          return throwError(() => new Error(`Failed to fetch webhook details: ${error.message}`));
        }
      });
    }
  }
}
