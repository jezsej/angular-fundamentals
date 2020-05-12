import { SessionListComponent } from "./session-list.component";
import { ISession } from 'src/app/shared';

describe('sessionList', () => {
    let component: SessionListComponent,
        mockAuthService, mockVoterService

    beforeEach(() => {
        component = new SessionListComponent(mockAuthService, mockVoterService)
    })

    describe('ngOnChanges', () => {

        it('it should filter sessions',()=>{
            component.sessions = <ISession[]>[
                { name: 'session 1', level: 'intermediate' },
                { name: 'session 3', level: 'intermediate' },
                { name: 'session 2', level: 'beginner' }
            ]
    
            component.filterby = 'intermediate'
            component.sortby = 'name'
            component.eventId = 6
    
            component.ngOnChanges()
    
            expect(component.visibleSessions.length).toBe(2)
        })

        it('it should sort sessions correctly',()=>{
            component.sessions = <ISession[]>[
                { name: 'session 1', level: 'intermediate' },
                { name: 'session 3', level: 'intermediate' },
                { name: 'session 2', level: 'beginner' }
            ]
    
            component.filterby = 'all'
            component.sortby = 'name'
            component.eventId = 6
    
            component.ngOnChanges()
    
            expect(component.visibleSessions[2].name).toBe('session 3')
        })
        
        
       
    })

})