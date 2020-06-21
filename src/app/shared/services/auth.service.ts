import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {

  isAuth: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() { }

  toggleIsAuth(): void {
    this.isAuth.next(!this.isAuth.getValue());
  }
}
