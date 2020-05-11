import { Component, OnInit, Inject } from '@angular/core'
import { authService } from './auth.service'
import { Router } from '@angular/router'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { TOASTR_TOKEN, Toastr } from '../common/toastr.service'


@Component({
  templateUrl: './profile.component.html',
  styles: [`
  em {padding-left:10px; float:right; color: #E05D07;}

  .error input {background-color:#E3C3C5}

  .error ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
    color: #999;
  }

  .error ::-moz-placeholder { /* Firefox 19+ */
    color: #999;
  }

  .error :-ms-input-placeholder { /* IE 10+ */
    color: #999;
  }

  .error :-moz-placeholder { /* Firefox 18- */
    color: #999;
  }
  `]
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup
  private firstName: FormControl
  private lastName: FormControl
  constructor(private authservice: authService,
    private router: Router,
    @Inject(TOASTR_TOKEN) private toastr: Toastr) { }

  ngOnInit() {
    this.firstName = new FormControl(this.authservice.currentUser.firstName, [Validators.required, Validators.pattern('[a-zA-Z].*')])
    this.lastName = new FormControl(this.authservice.currentUser.lastName, [Validators.required, Validators.pattern('[a-zA-Z].*')])
    this.profileForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName
    })
  }

  validFirstName() {
    return this.firstName.untouched || this.firstName.valid
  }

  validlastName() {
    return this.lastName.untouched || this.lastName.valid
  }

  saveProfile(formValues) {
    if (this.profileForm.valid) {
      this.authservice.updateUserProfile(formValues.firstName, formValues.lastName).subscribe(() => {
        this.toastr.success('Profile Saved')
      })

    }

  }

  LogOut(){
    this.authservice.logOut().subscribe(()=>{
      this.router.navigate(['/user/login'])
    })
  }

  cancel() {
    this.router.navigate(['/events'])
  }

}