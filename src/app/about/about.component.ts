import { Component, OnInit } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-about',
  standalone: true,
  imports:    [ MarkdownModule ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent implements OnInit {

  public markdownData: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('/README.md', {responseType: 'text'}).subscribe(data => {
      this.markdownData = data;
    });
  }
}
