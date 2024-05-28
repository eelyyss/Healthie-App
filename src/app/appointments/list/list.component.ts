import { Component, OnInit } from "@angular/core";
import { AppointmentsService } from "../../_services/appointments.service";

@Component({
  selector: 'app-list-appointments',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  appointments: any[] = [];

  constructor(private appointmentsService: AppointmentsService) { }

  ngOnInit(): void {
    this.appointmentsService.getAllAppointments().subscribe({
      next: (data: any) => {
        this.appointments = data;
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  deleteAppointment(id: string): void {
    this.appointmentsService.deleteAppointment(id).subscribe({
      next: () => {
        this.appointments = this.appointments.filter(appointment => appointment.id !== id);
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }
}

