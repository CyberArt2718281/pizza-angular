import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable()
export class AuthService {
  private isLogged = false;
  public isLoggedSubject$: Subject<boolean> = new Subject<boolean>();

  constructor() {
  }

  login() {
    this.isLogged = true;
    this.isLoggedSubject$.next(this.isLogged);
  }

  logOut() {
    this.isLogged = false;
    this.isLoggedSubject$.next(this.isLogged);
  }

  isLoggedIn(): boolean {
    return this.isLogged;
  }
  getToken(){
    return "Bearer";
  }
}
