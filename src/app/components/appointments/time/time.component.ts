import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-time-selector',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent implements OnInit {
  date: any;
  availableHours: string[] = [];
  selectedHour: string | null = null;
  showConfirmationMessage: boolean = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const navigation = window.history.state;
    this.date = navigation.date;
    this.availableHours = navigation.availableHours;
  }

  selectHour(hour: string) {
    this.selectedHour = hour;
  }

  confirmAppointment() {
    if (this.selectedHour) {
      console.log('Appointment confirmed for:', this.selectedHour);
      this.availableHours = this.availableHours.filter(h => h !== this.selectedHour);

      this.showConfirmationMessage = true;
    } else {
      alert('Por favor, selecciona una hora.');
    }
  }
}
