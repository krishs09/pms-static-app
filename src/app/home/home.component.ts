import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AppointmentHistory } from 'src/model/AppointmentHistory';
import { Appointments } from 'src/model/Appointments';
import { DemographicDetails } from 'src/model/DemographicDetails';
import { PatientDetailsService } from '../patient-details.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  firstname:string="";
  lastname:string="";
  email:string="";

  userData:any;
  AppointmentObj: any;
  
  appointmentArray:AppointmentHistory[]=[];
  isNewPatient:boolean=false;
  appointmentIdFromRoute:any;
  patientIdFromRoute:any;
  physicianIdFromRoute:any;

  aptIdFromSession = sessionStorage.getItem('appointmentId');
  patientIdFromSession = sessionStorage.getItem('patientId');
  physicianIdFromSession = sessionStorage.getItem('physicianId');

 

  constructor(private patientDetailService:PatientDetailsService,private router:Router,
    private route: ActivatedRoute) {

  this.AppointmentObj = sessionStorage.getItem('appointmentDetails');
  this.AppointmentObj = JSON.parse(this.AppointmentObj);

//GETTING DATA FROM ROUTER NAVIGATION

    // this.route.queryParams.subscribe(params => {
    //   this.appointmentIdFromRoute = params["appointmentId"];
    //   this.patientIdFromRoute = params["patientId"];
    //   this.physicianIdFromRoute = params['physicianId'];

    // });
    // console.log("Appt id, pat, phy from route :"+this.appointmentIdFromRoute+" , "+this.patientIdFromRoute +" ")+this.physicianIdFromRoute;
    // this.patientDetailService.patientId_srvc = this.patientIdFromRoute;
    // this.patientDetailService.physicianId_srvc = this.physicianIdFromRoute;
    // this.patientDetailService.appointmentId_srvc = this.appointmentIdFromRoute;

    

    console.log("Meeting Appointment obj from sesion:" +this.AppointmentObj.meetingTitle);

   }

  ngOnInit(): void {
    console.log('Is navigated: '+this.isRouterActive);
    this.patientDetailService.getDemographicDetails(this.patientIdFromSession)
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

    this.patientDetailService.getPatientDetailsById(this.patientIdFromSession).subscribe(data=>{
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

    this.patientDetailService.getAllAppointments(this.patientIdFromSession).subscribe(data=>{
      this.appointmentArray = JSON.parse(JSON.stringify(data));
      console.log("Appointment list: "+JSON.stringify(this.appointmentArray));
      console.log("DIdapt happend :"+this.appointmentArray[0].didExaminationhappened);
    })
  }
  isRouterActive:boolean=false;

  viewExamination(e:any){

       let navigationExtras: NavigationExtras = {
      queryParams: {
           "appointmentId": e.appointmentId,
       }
   };
     this.router.navigate(["view-examination"], navigationExtras);
  }

  isNavigated(event:any){
    this.isRouterActive = !this.isRouterActive;
  }
}
