import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from '../../../_services/appointment.service';

@Component({
  selector: 'app-time-selector',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent implements OnInit {
  appointmentType: string | null = null;
  date: string = '';
  availableHours: string[] = [];
  selectedHour: string | null = null;
  showConfirmationMessage: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    const navigation = window.history.state;

    if (navigation && navigation.type) {
      this.appointmentType = navigation.type;
    } else {
      console.error('Invalid navigation state', navigation);
      this.router.navigate(['/']);
      return;
    }

    if (navigation && navigation.date && navigation.availableHours) {
      this.date = navigation.date.toString();
      this.availableHours = navigation.availableHours.filter((hour: string) => this.appointmentService.isHourAvailable(this.date, hour));
    } else {
      console.error('Invalid navigation state', navigation);
      this.router.navigate(['/']);
    }
  }

  selectHour(hour: string) {
    this.selectedHour = hour;
  }

  confirmAppointment() {
    if (this.selectedHour) {
      const appointment = { date: this.date, hour: this.selectedHour, type: this.appointmentType };
      this.appointmentService.addAppointment(appointment);
      this.availableHours = this.availableHours.filter(h => h !== this.selectedHour);
      this.showConfirmationMessage = true;
    } else {
      alert('Por favor, selecciona una hora.');
    }
  }

  navigateToList() {
    if (this.appointmentType) {
      this.router.navigate(['/appointments/list', this.appointmentType]);
    } else {
      console.error('appointmentType is null');
    }
  }
}
