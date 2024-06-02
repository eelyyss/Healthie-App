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

    this.loadAppointments();
  }

  loadAppointments(): void {
    this.appointments = this.appointmentService.getAppointments();
  }

  confirmDeleteAppointment(appointment: any): void {
    const confirmDelete = confirm('¿Está seguro de que desea eliminar la cita?');
    if (confirmDelete) {
      this.deleteAppointment(appointment);
    }
  }

  deleteAppointment(appointment: any): void {
    this.appointmentService.deleteAppointment(appointment);
    this.loadAppointments();
  }
}
