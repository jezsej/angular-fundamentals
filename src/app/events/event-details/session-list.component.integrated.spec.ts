import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { DebugElement, NO_ERRORS_SCHEMA } from "@angular/core";
import { SessionListComponent } from "./session-list.component";
import { authService } from '../../user/auth.service'
import { By } from "@angular/platform-browser";
import { UpVoteService } from './upvote.service';
import { element } from '@angular/core/src/render3';
import { CollapsableWellComponent } from 'src/app/common';
import { UpVoteComponent } from './upvote.component';
import { DurationPipe } from 'src/app/shared';

describe('sessionListComponent', () => {
    let fixture: ComponentFixture<SessionListComponent>,
        component: SessionListComponent,
        el: HTMLElement,
        elDebug: DebugElement

    beforeEach(async () => {
        let mockAuthService = {
            isAuthenticated: () => true,
            currentUser: { userName: 'Jesse' }
        }, mockVoterService = {
            userHasVoted: () => true
        }

        TestBed.configureTestingModule({
            imports: [],
            declarations: [
                SessionListComponent,
                //CollapsableWellComponent,
                //UpVoteComponent,
                DurationPipe
            ],
            providers: [
                { provide: authService, useValue: mockAuthService },
                { provide: UpVoteService, useValue: mockVoterService }
            ],
            schemas:[NO_ERRORS_SCHEMA]
        })
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(SessionListComponent)
        component = fixture.componentInstance
        el = fixture.nativeElement
        elDebug = fixture.debugElement
    })

    beforeEach(() => {
        component.sessions = [
            {
                id: 1, voters: ['joe', 'jesse'], duration: 1,
                abstract: 'Take you DevOps to the next level', level: 'beginner',
                name: 'Business 101', presenter: 'Steve Mckay'
            }
        ]

        component.filterby = 'all'
        component.sortby = 'name'
        component.eventId = 4

    })
    describe('initial display', () => {
        it('should display correct session title', () => {
            component.ngOnChanges()
            fixture.detectChanges()

            //expect(el.querySelector('[well-title]').textContent).toContain('Business 101')
            expect(elDebug.query(By.css('[well-title]')).nativeElement.textContent)
                .toContain('Business 101')
        })
    })

})