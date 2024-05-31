import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../../_services/appointment.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  appointments: any[] = [];
  appointmentType: string | null = null;

  constructor(private appointmentService: AppointmentService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.appointmentType = params['type'];
    });

    this.appointments = this.appointmentService.getAppointments();
  }

  deleteAppointment(appointment: any): void {
    this.appointmentService.deleteAppointment(appointment);
    this.appointments = this.appointmentService.getAppointments();
  }
}
