import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private localStorageKey = 'appointments';

  constructor() { }

  addAppointment(appointment: any) {
    const appointments = this.getAppointments();
    appointments.push(appointment);
    localStorage.setItem(this.localStorageKey, JSON.stringify(appointments));
  }

  getAppointments(): any[] {
    const appointments = localStorage.getItem(this.localStorageKey);
    return appointments ? JSON.parse(appointments) : [];
  }

  isHourAvailable(date: string, hour: string): boolean {
    const appointments = this.getAppointments();
    return !appointments.some(app => app.date === date && app.hour === hour);
  }

  deleteAppointment(appointment: any): void {
    const appointments = this.getAppointments().filter(app => !(app.date === appointment.date && app.hour === appointment.hour));
    localStorage.setItem(this.localStorageKey, JSON.stringify(appointments));
  }
}
