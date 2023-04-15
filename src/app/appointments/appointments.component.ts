import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Appointments } from 'src/model/Appointments';
import { Employee } from 'src/model/Employee';
import { PatientDetailsService } from '../patient-details.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {

  appointmentsList:Appointments []=[];
  appointmentObj : Appointments = new Appointments();
   empObjFromSession :Employee = new Employee();

   dummyData = [
    { appointmentId: 123, meetingTitle: 'Surgery' ,patientId:3423,appointment_with:'Dr. Simon Jones',
      appointmentDate:'Today',appointmentTime:'3:00 PM'},
      { appointmentId: 434, meetingTitle: 'Routine check up' ,patientId:54623,appointment_with:'Dr. Lisa Ray',
      appointmentDate:'Tomorrow',appointmentTime:'1:00 PM'},
      { appointmentId: 125553, meetingTitle: 'Kidney transplant' ,patientId:64,appointment_with:'Dr. Kishna Yadav',
      appointmentDate:'23-09-2023',appointmentTime:'8:30 PM'},
  ]

   //@ViewChild(HeaderComponent) headerComponent!: HeaderComponent;

  constructor(private patientDetailService:PatientDetailsService,private router:Router) { 
   
  }


  

  ngOnInit(): void {

 

    // this.empObjFromSession = JSON.parse(JSON.stringify(sessionStorage.getItem('empObj')));

    // console.log('Employee obj in session: '+sessionStorage.getItem('empObj'));
    
    // console.log('Employee Obj: '+this.empObjFromSession);
    // console.log("Emp detaislL "+this.empObjFromSession.gender);
    
    
        let physicianId =sessionStorage.getItem('loggedInEmpId_session'); // Get from login
        this.patientDetailService.getAllAppointmentsForPhysician(physicianId)
        .subscribe(data=>{
          this.appointmentsList = JSON.parse(JSON.stringify(data));
          console.log(data);
        });
  }

  patientExamination(e:any){
   
    console.log(e.appointmentId +" "+e.patientId) +"  In appointments page";
    sessionStorage.setItem('appointmentId',e.appointmentId);
    sessionStorage.setItem('patientId',e.patientId);
    sessionStorage.setItem('physicianId',e.appointment_with);

    this.appointmentObj.appointmentId= e.appointmentId;
    this.appointmentObj.appointmentDate = e.appointmentDate;
    this.appointmentObj.appointmentTime = e.appointmentTime;
    this.appointmentObj.appointment_with = e.appointment_with;
    this.appointmentObj.meetingTitle = e.meetingTitle;

    sessionStorage.setItem('appointmentDetails',JSON.stringify(this.appointmentObj));

//PASSING DATA THROUGH ROUTER NAVIGATION
  //   let navigationExtras: NavigationExtras = {
  //     queryParams: {
  //          "appointmentId": e.appointmentId,
  //          "patientId": e.patientId,
  //          "physicianId":e.appointment_with
  //     }
  // };
  //   this.router.navigate(["home"], navigationExtras);
    this.router.navigate(["home"]);
  }

}
