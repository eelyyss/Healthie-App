import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';

@Component({
  selector: 'app-appointment-request',
  templateUrl: './appointment-request.component.html',
  styleUrls: ['./appointment-request.component.css'],
})
export class AppointmentRequestComponent implements OnInit {
  appointmentType: string | null = null;
  dateValue: any = null;
  availableHours: string[] = [];
  today: any = moment().startOf('day');
  selectedHours: string[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.appointmentType = params['type'];
    });
    this.getDaysFromDate(moment().month() + 1, moment().year());
    this.generateAvailableHours(); // Llama al método para generar las horas disponibles
  }

  week: any = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  monthSelect: any[] = [];
  dateSelect: any;

  getDaysFromDate(month: number, year: number) {
    const startDate = moment(`${year}-${month}-01`);
    const endDate = startDate.clone().endOf('month');
    this.dateSelect = startDate;

    const diffDays = endDate.diff(startDate, 'days', true);
    const numberDays = Math.round(diffDays);

    const arrayDays = Object.keys([...Array(numberDays)]).map((a: any) => {
      a = parseInt(a) + 1;
      const dayObject = moment(`${year}-${month}-${a}`);
      return {
        name: dayObject.format('dddd'),
        value: a,
        indexWeek: dayObject.isoWeekday(),
        isPast: dayObject.isBefore(this.today, 'day'),
      };
    });

    this.monthSelect = arrayDays;
  }

  changeMonth(flag: number) {
    if (flag < 0) {
      const prevDate = this.dateSelect.clone().subtract(1, 'month');
      this.getDaysFromDate(parseInt(prevDate.format('MM')), parseInt(prevDate.format('YYYY')));
    } else {
      const nextDate = this.dateSelect.clone().add(1, 'month');
      this.getDaysFromDate(parseInt(nextDate.format('MM')), parseInt(nextDate.format('YYYY')));
    }
  }

  clickDay(day: any) {
    if (day.isPast) {
      return;
    }
    const monthYear = this.dateSelect.format('YYYY-MM');
    const parse = `${monthYear}-${day.value}`;
    const objectDate = moment(parse);
    this.dateValue = objectDate;
  }

  navigateToTime() {
    if (!this.dateValue || this.dateValue.isBefore(this.today, 'day')) {
      alert('Por favor, selecciona una fecha válida.');
      return;
    }
    console.log('Navegando a la selección de hora con la fecha:', this.dateValue.format('YYYY-MM-DD'));
    this.router.navigate(['appointments/time'], { state: { date: this.dateValue.format('YYYY-MM-DD'), availableHours: this.availableHours } });
  }

  generateAvailableHours(): void {
    // Generar las horas disponibles de 8am a 8pm
    for (let i = 8; i <= 19; i++) {
      const hour = i < 10 ? `0${i}:00` : `${i}:00`;
      this.availableHours.push(hour);
    }
  }
}
