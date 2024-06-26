import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  constructor(private storageService: StorageService) {}

  private getUserAppointmentsKey(): string {
    const user = this.storageService.getUser();
    return user ? `appointments_${user.username}` : 'appointments';
  }

  addAppointment(appointment: any) {
    const appointments = this.getAppointments();
    appointments.push(appointment);
    localStorage.setItem(this.getUserAppointmentsKey(), JSON.stringify(appointments));
  }

  getAppointments(): any[] {
    const appointments = localStorage.getItem(this.getUserAppointmentsKey());
    return appointments ? JSON.parse(appointments) : [];
  }

  isHourAvailable(date: string, hour: string): boolean {
    const appointments = this.getAppointments();
    return !appointments.some(app => app.date === date && app.hour === hour);
  }

  deleteAppointment(appointment: any): void {
    const appointments = this.getAppointments().filter(app => !(app.date === appointment.date && app.hour === appointment.hour));
    localStorage.setItem(this.getUserAppointmentsKey(), JSON.stringify(appointments));
  }
}
