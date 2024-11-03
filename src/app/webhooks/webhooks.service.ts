import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebhooksService {

  constructor(private http: HttpClient) { }

  listWebhooks(prefix: string): Observable<string[]> {
    const url = `${environment.webhooksBaseUrl}/?prefix=${prefix}`;
    return this.http.get(url, { responseType: 'text' }).pipe(
      map(response => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response, 'application/xml');
        const keys = Array.from(xmlDoc.getElementsByTagName('Key'));
        return keys.map(key => key.textContent || '');
      }),
      catchError(error => {
        return throwError(() => new Error(`Failed to fetch webhooks: ${error.message}`));
      })
    );
  }

  getWebhook(webhookFilename: string): Observable<any> {
    const url = `${environment.webhooksBaseUrl}/${webhookFilename}`;
    return this.http.get<any>(url).pipe(
      catchError(error => {
        return throwError(() => new Error(`Failed to fetch webhook: ${error.message}`));
      })
    );
  }
  
}
