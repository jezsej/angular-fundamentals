import { Component } from '@angular/core'
import { Router } from '@angular/router';
import { EventService } from '../shared';

@Component({
  templateUrl: './create-event.component.html',
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

export class CreateEventComponent {
  newEvent
  isDirty: boolean = true
  constructor(private router: Router, private eventService: EventService) {

  }

  saveEvent(data) {
    this.eventService.saveEvent(data).subscribe(() => {
      this.isDirty = false
      this.router.navigate(['/events'])
    });

  }
  cancel() {
    this.router.navigate(['/events'])

  }
}