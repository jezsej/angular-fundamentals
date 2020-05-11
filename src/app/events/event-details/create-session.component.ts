import { Component, OnInit, Output, EventEmitter } from '@angular/core'
import { EventService, ISession, CustomValidators } from 'src/app/shared';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'create-session',
  templateUrl: './create-session.component.html',
  styles: [`
    em {padding-left:10px; float:right; color: #E05D07;}
  
    .error input, .error select, .error textarea {background-color:#E3C3C5}
  
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

export class CreateSessionComponent implements OnInit {
  createSession: FormGroup
  @Output() saveNewSession = new EventEmitter()
  @Output() exitAddMode = new EventEmitter()
  private name: FormControl
  private presenter: FormControl
  private duration: FormControl
  private level: FormControl
  private abstract: FormControl

  constructor(private eventService: EventService, private customValidator: CustomValidators) { }

  ngOnInit() {
    this.name = new FormControl('', [Validators.required])
    this.presenter = new FormControl('', [Validators.required])
    this.duration = new FormControl('', [Validators.required])
    this.level = new FormControl('', [Validators.required])
    this.abstract = new FormControl('', [Validators.required, Validators.maxLength(400), this.customValidator.restrictedWords(['foo', 'woo'])])

    this.createSession = new FormGroup({
      name: this.name,
      presenter: this.presenter,
      duration: this.duration,
      level: this.level,
      abstract: this.abstract,
    })

  }

  saveSession(formData) {
    if(this.createSession.valid){
      let session: ISession = {
        id: undefined,
        abstract: formData.abstract,
        duration: +formData.duration,
        level: formData.level,
        name: formData.name,
        presenter: formData.presenter,
        voters: []
      }
  
      this.saveNewSession.emit(session)
    }
    

  }

  cancel() {
    this.exitAddMode.emit()
  }

}