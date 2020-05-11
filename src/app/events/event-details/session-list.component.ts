import { Component, Input, OnChanges } from '@angular/core'
import { ISession } from 'src/app/shared'
import { ThrowStmt } from '@angular/compiler'
import { authService } from 'src/app/user/auth.service'
import { UpVoteService } from './upvote.service'

@Component({
    selector: 'session-list',
    templateUrl: './session-list.component.html'
})

export class SessionListComponent implements OnChanges {
    @Input() sessions: ISession[]
    @Input() filterby: string
    @Input() sortby: string
    @Input() eventId: number
    visibleSessions: ISession[] = []

    constructor(private auth: authService, private voteService: UpVoteService) { }

    ngOnChanges() {
        if (this.sessions) {
            this.filterSessions(this.filterby)
            this.sortby === 'name' ? this.visibleSessions.sort(sortByNameAsc) : this.visibleSessions.sort(sortByVotesDesc)
        }

    }

    filterSessions(filter) {
        if (filter === 'all') {
            this.visibleSessions = this.sessions.slice(0)
        } else {
            this.visibleSessions = this.sessions.filter(s => {
                return s.level.toLocaleLowerCase() === filter
            })
        }

    }

    toggleVoteSession(session: ISession) {
        if (this.userHasVoted(session)) {
            this.voteService.deleteVoter(this.eventId, session, this.auth.currentUser.userName)
        } else {
            this.voteService.addVoter(this.eventId, session, this.auth.currentUser.userName).subscribe()
        }
        if (this.sortby === 'votes') {
            this.visibleSessions.sort(sortByVotesDesc)
        }

    }
    userHasVoted(session: ISession) {
        return this.voteService.userHasVoted(session, this.auth.currentUser.userName)
    }
}

function sortByNameAsc(s1: ISession, s2: ISession) {
    if (s1.name > s2.name) return 1
    else if (s1.name === s2.name) return 0
    else return -1
}

function sortByVotesDesc(s1: ISession, s2: ISession) {
    return s2.voters.length - s1.voters.length
}