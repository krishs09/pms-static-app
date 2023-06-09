import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';    

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { DemographicDetailsComponent } from './demographic-details/demographic-details.component';
import { VisitDetailsComponent } from './visit-details/visit-details.component';
import { HeaderComponent } from './header/header.component'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import{MatFormFieldModule} from '@angular/material/form-field';
import{MatSelectModule} from '@angular/material/select';
import{MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { HomeComponent } from './home/home.component';
import { HttpClientModule} from "@angular/common/http";
import {MatButtonModule} from '@angular/material/button';
import { ViewExaminationComponent } from './view-examination/view-examination.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatAutocomplete,MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipInputEvent,MatChipsModule} from '@angular/material/chips';
import {MatChipInput} from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { AppointmentsComponent } from './appointments/appointments.component';
import { TimepipePipe } from './pipes/timepipe.pipe';
import { AmpmpipePipe } from './pipes/ampmpipe.pipe';
import { BookappointmentsComponent } from './bookappointments/bookappointments.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { RegistrationloginComponent } from './registrationlogin/registrationlogin.component';
import { PatientregistrationComponent } from './patientregistration/patientregistration.component';
import { EmployeeregistrationComponent } from './employeeregistration/employeeregistration.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

@NgModule({
  declarations: [
    AppComponent,
    DemographicDetailsComponent,
    VisitDetailsComponent,
    HeaderComponent,
    HomeComponent,
    ViewExaminationComponent,
    AppointmentsComponent,
    TimepipePipe,
    AmpmpipePipe,
    BookappointmentsComponent,
    RegistrationloginComponent,
    PatientregistrationComponent,
    EmployeeregistrationComponent,
    PagenotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatInputModule,
    MatAutocompleteModule,
    MatIconModule,
    MatChipsModule,
    MatRadioModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatNativeDateModule 

  ],
  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule { }
