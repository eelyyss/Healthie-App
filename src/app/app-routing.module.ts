import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './users/register/register.component';
import { LoginComponent } from './users/login/login.component';
import { HomeComponent } from './home/home.component';
import { CreateComponent } from './appointments/create/create.component';
import { EditComponent } from './appointments/edit/edit.component';
import { ListComponent } from './appointments/list/list.component';
import { ViewComponent } from './appointments/view/view.component';
import { AppointmentRequestComponent } from './appointments/appointment-request/appointment-request.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'appointments/create', component: CreateComponent },
  { path: 'appointments/view/:id', component: ViewComponent },
  { path: 'appointments/edit/:id', component: EditComponent },
  { path: 'appointments/list', component: ListComponent },
  { path: 'appointment-request/:type', component: AppointmentRequestComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
