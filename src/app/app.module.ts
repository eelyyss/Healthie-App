import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoginComponent } from './components/users/login/login.component';
import { RegisterComponent } from './components/users/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { CreateComponent } from './components/appointments/create/create.component';
import { ListComponent } from './components/appointments/list/list.component';
import { AppointmentRequestComponent } from './components/appointments/appointment-request/appointment-request.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TimeComponent } from './components/appointments/time/time.component';
import { MedicationComponent } from './components/medicaments/medication.component';
import { ResultsComponent } from './components/results/results.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    CreateComponent,
    ListComponent,
    AppointmentRequestComponent,
    TimeComponent,
    MedicationComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
    MatNativeDateModule,
    MatSnackBarModule,
    NgxMaterialTimepickerModule,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
