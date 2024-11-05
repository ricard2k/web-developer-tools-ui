import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'webhookFilename',
  standalone: true
})
export class WebhookFilenamePipe implements PipeTransform {

  transform(values: string[], ): WebhookElement[] {
    return values.map(value => {    
      const regex = /^[0-9a-f]{8}\-[0-9a-f]{4}\-[0-9a-f]{4}\-[0-9a-f]{4}\-[0-9a-f]{12}\/(\d{13})\-(GET|PUT|POST|HEAD|DELETE|OPTIONS|TRACE|PATCH)\-([a-f0-9\.\:]*)\.json$/g
      const result = regex.exec(value);
      if (result) { 
        const timestamp = parseInt(result[1], 10);
        const humanReadableTime = new Intl.DateTimeFormat(navigator.language, {
          dateStyle: 'medium',
          timeStyle: 'medium',
          timeZone: 'UTC'
        }).format(timestamp);
        return {
          filename: result[0],
          showDetails: false,
          time: humanReadableTime,
          method: result[2],
          ip: result[3]
        };
      }
      return { 
        filename: value,
        showDetails: false,
        error: `Invalid webhook filename: \"${ value }\"` 
      };
    });
  }
}
export class WebhookElement {
  filename: string = '';
  time?: string; 
  method?: string; 
  ip?: string;
  error?: string;
  showDetails: boolean = false; 
  details?: any;
}

