import { Routes } from "@angular/router";
import {
    EventsListComponent,
    EventListResolver,
    EventRouteActivator,
    CreateEventComponent,
    EventDetailsComponent,
    EventResolver,
} from './events/index'
import { Error404Component } from './errors/404.component';
import { CreateSessionComponent } from './events/event-details/create-session.component';


export const appRoutes: Routes = [
    { path: 'events/new', component: CreateEventComponent, canDeactivate: ['canDeactivateCreateEventRoute'] },
    { path: 'events/sessions/new', component: CreateSessionComponent },
    { path: 'events', component: EventsListComponent, resolve: { events: EventListResolver } },
    { path: 'events/:id', component: EventDetailsComponent, resolve: { event: EventResolver } /*canActivate: [EventRouteActivator]*/ },
    { path: '404', component: Error404Component },
    { path: '', redirectTo: '/events', pathMatch: 'full' },
    { path: 'user', loadChildren: './user/user.module#UserModule' }
]