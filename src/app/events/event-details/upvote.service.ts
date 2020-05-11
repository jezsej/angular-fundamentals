import { Injectable } from "@angular/core";
import { ISession } from 'src/app/shared';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class UpVoteService {

    constructor(private http: HttpClient) { }

    deleteVoter(eventId: number, session: ISession, userName: string) {
        session.voters = session.voters.filter(voter => voter !== userName);
        let url = `/api/events/${eventId}/sessions/${session.id}/voters/${userName}`
        return this.http.delete(url)
            .pipe(catchError(this.handleErrors('deleteVoter')))
    }
    addVoter(eventId: number, session: ISession, userName: string) {
        let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
        let url = `/api/events/${eventId}/sessions/${session.id}/voters/${userName}`
        session.voters.push(userName)
        return this.http.post(url, session, options)
            .pipe(catchError(this.handleErrors('addVoter')))
    }

    userHasVoted(session: ISession, userName: string) {
        return session.voters.some(voter => voter === userName)
    }

    private handleErrors<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error)
            return of(result as T)
        }
    }
}