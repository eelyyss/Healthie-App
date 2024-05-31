import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from '../../../_services/appointment.service';

@Component({
  selector: 'app-time-selector',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent implements OnInit {
  date: string = '';
  availableHours: string[] = [];
  selectedHour: string | null = null;
  showConfirmationMessage: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    const navigation = window.history.state;
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
      const appointment = { date: this.date, hour: this.selectedHour, type: window.history.state.type };
      this.appointmentService.addAppointment(appointment);
      this.availableHours = this.availableHours.filter(h => h !== this.selectedHour);
      this.showConfirmationMessage = true;

      this.router.navigate(['/appointments/list']);
    } else {
      alert('Por favor, selecciona una hora.');
    }
  }
}
