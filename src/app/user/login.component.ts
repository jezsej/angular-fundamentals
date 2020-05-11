import { Component } from '@angular/core'
import { authService } from './auth.service'
import { Router } from '@angular/router'

@Component({
    templateUrl: './login.component.html',
    styles: [`
    em {color: red; float: right; padding-left:10px;}
    `]
})

export class LoginComponent {
    userName
    password
    mouseoverLogin
    invalidLogin:boolean = false
    constructor(private authService: authService, private router: Router) {

    }

    login(data) {
        this.authService.handleLogin(data).subscribe(response=>{
            if(!response){
                this.invalidLogin = true
            }else{
                this.router.navigate(['/events'])
            }
        })
        
    }

    cancel() {
        this.router.navigate(['/events'])

    }

}