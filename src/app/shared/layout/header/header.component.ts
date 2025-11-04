import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/auth/auth.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['header.component.scss'],
})
export class HeaderComponent implements OnInit {
  loggedState: boolean = false;
  constructor(private authService: AuthService) {}

  login() {
    this.authService.login();
  }

  ngOnInit() {
    this.authService.isLoggedSubject$.subscribe((isLoggedIn: boolean) => {
      this.loggedState = isLoggedIn;
      console.log('State has been changed:', isLoggedIn);
    });
  }

  logout() {
    this.authService.logOut();
  }
}
