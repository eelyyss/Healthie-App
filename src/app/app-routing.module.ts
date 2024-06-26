import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/users/register/register.component';
import { LoginComponent } from './components/users/login/login.component';
import { CreateComponent } from './components/appointments/create/create.component';
import { ListComponent } from './components/appointments/list/list.component';
import { AppointmentRequestComponent } from './components/appointments/appointment-request/appointment-request.component';
import { TimeComponent } from './components/appointments/time/time.component';
import { MedicationComponent } from './components/medicaments/medication.component';
import { ResultsComponent } from './components/results/results.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'appointments/create', component: CreateComponent },
  { path: 'appointments/list/:type', component: ListComponent },
  { path: 'appointments/list', component: ListComponent },
  { path: 'appointment-request/:type', component: AppointmentRequestComponent },
  { path: 'medicaments', component: MedicationComponent},
  { path: 'appointments/time', component: TimeComponent},
  { path: 'results', component: ResultsComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
