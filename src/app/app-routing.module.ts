import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentsComponent } from './appointments/appointments.component';
import { BookappointmentsComponent } from './bookappointments/bookappointments.component';
import { DemographicDetailsComponent } from './demographic-details/demographic-details.component';
import { EmployeeregistrationComponent } from './employeeregistration/employeeregistration.component';
import { HomeComponent } from './home/home.component';
import { PatientregistrationComponent } from './patientregistration/patientregistration.component';
import { RegistrationloginComponent } from './registrationlogin/registrationlogin.component';
import { ViewExaminationComponent } from './view-examination/view-examination.component';
import { VisitDetailsComponent } from './visit-details/visit-details.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'home',component: HomeComponent },
   { path: '',component: RegistrationloginComponent },
  { path: 'demographic', component: DemographicDetailsComponent },
  { path: 'examination', component: VisitDetailsComponent },
  { path: 'view-examination', component: ViewExaminationComponent },
  { path: 'new-appointment', component: BookappointmentsComponent },
  { path: 'login', component: RegistrationloginComponent },
  {  path: 'appointments', 
    component: AppointmentsComponent,
    canActivate:[AuthGuard]
  },
  { path: 'registration', component: PatientregistrationComponent},
  { path: 'employee-registration', component: EmployeeregistrationComponent},
  { path: '404', component: PagenotfoundComponent },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
