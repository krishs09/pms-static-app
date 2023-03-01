import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/model/Appointment';
import { DemographicDetails } from 'src/model/DemographicDetails';
import { PatientDetailsService } from '../patient-details.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

hardCodedPatientId =this.patientDetailService.hardCodedPatientId;

  firstname:string="";
  lastname:string="";
  email:string="";

  userData:any;
  
  appointmentArray:Appointment[]=[];
  isNewPatient:boolean=false;

  constructor(private patientDetailService:PatientDetailsService) { }

  ngOnInit(): void {
    console.log('Is navigated: '+this.isRouterActive);
    this.patientDetailService.getDemographicDetails(this.hardCodedPatientId)
    .subscribe(data=>{
      if(data == null){
        this.patientDetailService.isNewPatient_srvc = true;
        this.isNewPatient = true;
      }else{
        this.patientDetailService.demographicDetail = JSON.parse(JSON.stringify(data));
      }
    });


    // Call USER MODULE SERVICE TO GET USER DETAILS BY ID WHICH WILL BE PASSED 
    //BY OTHER MODULE WHICH HAS CALLED THIS MODULE

    this.patientDetailService.getPatientDetailsById(this.hardCodedPatientId).subscribe(data=>{
      console.log(JSON.stringify(data));
      this.userData = data;
      this.firstname = this.userData.firstname;
      this.lastname = this.userData.lastname;
      this.patientDetailService.userDetailObj.firstname = this.userData.firstname;
      this.patientDetailService.userDetailObj.lastname = this.userData.lastname;
      this.patientDetailService.userDetailObj.email = this.userData.email;
     this.patientDetailService.userDetailObj.dateOfBirth = this.userData.dateOfBirth;
    //this.patientDetailService.userDetailObj.dateOfBirth = '12/01/1990';
    });

    this.patientDetailService.getAllAppointments(this.hardCodedPatientId).subscribe(data=>{
      this.appointmentArray = JSON.parse(JSON.stringify(data));
      console.log("Appointment list: "+JSON.stringify(this.appointmentArray));
      console.log("DIdapt happend :"+this.appointmentArray[0].didExaminationhappened);
    })
  }
  isRouterActive:boolean=false;

  

  isNavigated(event:any){
    this.isRouterActive = !this.isRouterActive;
  }
}
