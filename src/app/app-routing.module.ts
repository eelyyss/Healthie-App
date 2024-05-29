import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/users/register/register.component';
import { LoginComponent } from './components/users/login/login.component';
import { CreateComponent } from './components/appointments/create/create.component';
import { ViewComponent } from './components/appointments/view/view.component';
import { EditComponent } from './components/appointments/edit/edit.component';
import { ListComponent } from './components/appointments/list/list.component';
import { AppointmentRequestComponent } from './components/appointments/appointment-request/appointment-request.component';
import { MedicamentsComponent } from './components/medicaments/medicaments.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'appointments/create', component: CreateComponent },
  { path: 'appointments/view/:id', component: ViewComponent },
  { path: 'appointments/edit/:id', component: EditComponent },
  { path: 'appointments/list', component: ListComponent },
  { path: 'appointment-request/:type', component: AppointmentRequestComponent },
  { path: 'medicaments', component: MedicamentsComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
