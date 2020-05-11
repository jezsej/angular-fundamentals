import { Component } from '@angular/core'
import { authService } from '../user/auth.service';
import { EventService, ISession } from '../shared';

@Component({
    selector: 'nav-bar',
    templateUrl: './nav-bar.component.html',
    styles: [`
    .nav .navbar-nav {font-size: 0.15rem;}
    #searchForm {margin-right: 1rem;}
    @media(max-width:12rem){#searchForm {display:none;}}
    li> a.active {color:#FAD679}
    `]
})

export class NavbarComponent {
    searchTerm: string = ""
    foundSessions: ISession[] = []
    constructor(private auth: authService, private eventService: EventService) {

    }

    searchSession(searchTerm) {
        this.eventService.searchSession(searchTerm).subscribe(sessions => {
            this.foundSessions = sessions
        })
    }
}