import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebhooksService } from './webhooks.service';
import { CommonModule } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-webhooks',
  standalone: true,
  imports: [
    CommonModule,
    MatIcon,
  ],
  templateUrl: './webhooks.component.html',
  styleUrl: './webhooks.component.css'
})
export class WebhooksComponent {
  webhooks: string[] = [];
  webhookId: string = '';

  constructor(
    private webhooksService: WebhooksService,
    private route: ActivatedRoute,
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
    })
  }

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      console.log('Text copied to clipboard', text);
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  }
}
