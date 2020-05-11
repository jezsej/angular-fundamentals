import { Injectable } from '@angular/core'
import { IUser } from './user.model'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { unescapeIdentifier } from '@angular/compiler'

@Injectable()
export class authService {
    currentUser: IUser
    constructor(private http: HttpClient) { }

    handleLogin(data) {
        let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
        let login = { username: data.userName, password: data.password }
        return this.http.post('/api/login', login, options)
            .pipe(tap(data => {
                this.currentUser = <IUser>data['user']
            }))
            .pipe(catchError(err => {
                return of(false)
            }))
        // this.currentUser = {
        //     id: 1,
        //     userName: data.userName,
        //     firstName: 'Jesse',
        //     lastName: 'Ssempijja'

        // }
    }

    logOut() {
        let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
        this.currentUser = undefined
        return this.http.post('/api/logout', {}, options)
    }

    updateUserProfile(firstName: string, lastName: string) {
        this.currentUser.firstName = firstName
        this.currentUser.lastName = lastName
        let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }

        return this.http.put(`/api/users/${this.currentUser.id}`, this.currentUser, options)
    }

    isAuthenticated() {
        return !!this.currentUser
    }

    checkAuthenticationStatus() {
        this.http.get('/api/currentIdentity')
            .pipe(tap(data => {
                if (data instanceof Object) {
                    this.currentUser = <IUser>data
                }
            }))
            .subscribe()
    }
    // private handleErrors<T>(operation = 'operation', result?: T) {
    //     return (error: any): Observable<T> => {
    //         console.error(error)
    //         return of(result as T)
    //     }}
}


