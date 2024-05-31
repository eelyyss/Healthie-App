import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-appointment',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent {
  constructor(private router: Router) {}

  createAppointment(type: string) {
    this.router.navigate(['/appointment-request', type]);
  }

  navigateToList() {
    this.router.navigate(['/appointments/list']);
  }
}
