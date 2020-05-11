import { Component } from '@angular/core'
import { EventService } from 'src/app/shared/events.service';
import { ActivatedRoute, Params } from '@angular/router';
import { IEvent, ISession } from 'src/app/shared';
import { resetComponentState } from '@angular/core/src/render3/state';

@Component({
    templateUrl: './event-details.component.html',
    styles: [`
    .container{ padding: 0px 20px 0px 20px; }
    .event-image{ height: 100px; }
    a {cursor:pointer; text-decoration:none;}
    `]
})

export class EventDetailsComponent {
    event: IEvent
    addMode: boolean
    filterby: string = 'all'
    sortby: string = 'voters'
    constructor(private eventService: EventService, private route: ActivatedRoute) {

    }

    ngOnInit() {
        //this.route.params.forEach((params: Params) => {
        this.route.data.forEach((data) => {
            //this.event = this.eventService.getEvent(+params['id'])
            //this.eventService.getEvent(+params['id']).subscribe(event => {
            //this.event = this.route.snapshot.data['event']
            this.event = data['event']
            this.resetStates()
            //})

        })
        //this.event = this.eventService.getEvent(+this.route.snapshot.params['id'])
    }

    private resetStates() {
        this.filterby = 'all'
        this.sortby = 'voters'
        this.addMode = false
    }

    addSession() {
        this.addMode = true
    }

    exitAddMode() {
        this.addMode = false
    }

    saveSession(session: ISession) {
        const nextId = Math.max.apply(null, this.event.sessions.map(s => {
            s.id
        }))

        session.id = nextId + 1
        this.event.sessions.push(session)

        this.eventService.saveEvent(this.event).subscribe()
        this.addMode = false
    }

}