import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppointmentsService } from '../../_services/appointments.service';

@Component({
  selector: 'app-view-appointment',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  appointment: any = null;
  appointmentId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private appointmentsService: AppointmentsService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.appointmentId = params.get('id');
      if (this.appointmentId) {
        this.appointmentsService.getAppointment(this.appointmentId).subscribe({
          next: (data: any) => {
            this.appointment = data;
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      }
    });
  }
}
