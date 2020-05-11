import { Component, OnInit } from '@angular/core';
import { authService } from './user/auth.service';

@Component({
  selector: 'events-app',
  template: ` 
  
  <nav-bar></nav-bar>
  <router-outlet></router-outlet>

  `

})
export class EventsAppComponent implements OnInit{
  title = 'ng-fundamentals';

  constructor(private auth: authService) { }
  ngOnInit(){
    this.auth.checkAuthenticationStatus()
  }
  
}
