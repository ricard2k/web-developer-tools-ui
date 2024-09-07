import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SecondClockService {

  private secondSubject = new BehaviorSubject<number>(this.getSecond());

  constructor() { 
    setTimeout(() => {
      setInterval(() => this.secondSubject.next(this.getSecond()), 1000);
    }, 1000 - new Date().getMilliseconds());
  }

  public getSecondAsObservable(): Observable<number> {
    return this.secondSubject.asObservable();
  }

  public getSecond(): number {
    const date = new Date();
    return date.getMinutes() * 60 + date.getSeconds();
  }
}
