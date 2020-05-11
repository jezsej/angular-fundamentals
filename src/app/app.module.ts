import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { EventsAppComponent } from './events-app.component';
import { NavbarComponent } from './nav/nav-bar.component';
import {
  TOASTR_TOKEN,
  JQ_TOKEN,
  CollapsableWellComponent,
  Toastr,
  SimpleModalComponent,
  ModalTriggerDirective
} from './common/index';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import {
  EventThumbnailComponent,
  EventsListComponent,
  EventListResolver,
  EventRouteActivator,
  CreateEventComponent,
  EventDetailsComponent,
  EventService,
  CreateSessionComponent,
  CustomValidators,
  SessionListComponent,
  DurationPipe,
  UpVoteComponent,
  UpVoteService,
  LocationValidator,
  EventResolver
} from './events/index'
import { Error404Component } from './errors/404.component';
import { authService } from './user/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'


let toastr: Toastr = window['toastr']
let jQuery = window['$']

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    NavbarComponent,
    EventDetailsComponent,
    CreateEventComponent,
    Error404Component,
    CreateSessionComponent,
    SessionListComponent,
    CollapsableWellComponent,
    DurationPipe,
    SimpleModalComponent,
    ModalTriggerDirective,
    UpVoteComponent,
    LocationValidator
  ],
  providers: [
    EventService,
    { provide: TOASTR_TOKEN, useValue: toastr },
    { provide: JQ_TOKEN, useValue: jQuery },
    EventRouteActivator,
    EventListResolver,
    authService,
    CustomValidators,
    UpVoteService,
    EventResolver,
    {
      provide: 'canDeactivateCreateEventRoute',
      useValue: checkDirtyState
    }
  ],
  bootstrap: [EventsAppComponent]
})

export class AppModule { }

export function checkDirtyState(component: CreateEventComponent) {
  if (component.isDirty) {
    return window.confirm('You have not saved your work. Do you wish to cancel?')
  }
  return true;
}
