import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../../_services/appointment.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  appointments: any[] = [];

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.appointments = this.appointmentService.getAppointments();
  }
}
