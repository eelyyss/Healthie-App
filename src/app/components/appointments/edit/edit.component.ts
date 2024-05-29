import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentsService } from '../../../_services/appointments.service';

@Component({
  selector: 'app-edit-appointment',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  form: any = {
    date: null,
    time: null,
    description: null
  };
  isSuccessful = false;
  isEditFailed = false;
  errorMessage = '';
  appointmentId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private appointmentsService: AppointmentsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.appointmentId = params.get('id');
      if (this.appointmentId) {
        this.appointmentsService.getAppointment(this.appointmentId).subscribe({
          next: (data: any) => {
            this.form = data;
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      }
    });
  }

  onSubmit(): void {
    if (this.appointmentId) {
      this.appointmentsService.updateAppointment(this.appointmentId, this.form).subscribe({
        next: (data: any) => {
          this.isSuccessful = true;
          this.isEditFailed = false;
          this.router.navigate(['/appointments/list']);
        },
        error: (err: any) => {
          this.errorMessage = err.error.message || 'An error occurred during update';
          this.isEditFailed = true;
        }
      });
    }
  }
}
