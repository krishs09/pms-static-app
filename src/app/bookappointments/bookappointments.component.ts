import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BookAppointmentRequest } from 'src/model/BookAppointmentRequest';
import { Employee } from 'src/model/Employee';
import { UserPatient } from 'src/model/UserPatient';
import { PatientDetailsService } from '../patient-details.service';

@Component({
  selector: 'app-bookappointments',
  templateUrl: './bookappointments.component.html',
  styleUrls: ['./bookappointments.component.css']
})
export class BookappointmentsComponent implements OnInit {

  firstname:any;
  mobile:any;
  gender:any;

  existingPatient:any;
  patientFound:any;
  selectedTimeSlot:any;
  timeSlotBtnBckgrnd:any;
  selectedDate:any;
  selectedPhysician:any;
  purpose:any;
  bookAppointmentObj:BookAppointmentRequest = new BookAppointmentRequest();
  allPhysician:Employee [] = [];

  availableTimeSlots= [
    {value:"10:00:00",name:"10:00 AM",disabled:"false"},
    {value:"11:00:00",name:"11:00 AM",disabled:"false"},
    {value:"12:00:00",name:"12:00 PM",disabled:"false"},
    {value:"13:00:00",name:"1:00 PM",disabled:"false"},
    {value:"14:30:00",name:"2:30 PM",disabled:"false"},
    {value:"15:00:00",name:"3:00 PM",disabled:"false"}
  ,{value:"16:00:00",name:"4:00 PM",disabled:"false"}
  ,{value:"17:00:00",name:"5:00 PM",disabled:"false"}
  ,{value:"17:30:00",name:"5:30 PM",disabled:"false"}
  ,{value:"19:00:00",name:"7:00 PM",disabled:"false"}
  ,{value:"20:00:00",name:"8:00 PM",disabled:"false"}
  ,{value:"21:00:00",name:"9:00 PM",disabled:"false"}
  ,{value:"22:00:00",name:"10:00 PM",disabled:"false"}
]
minDate: Date ;
maxDate: Date;
format = 'yyyy-MM-dd';
  notAvailableSlots: [] = [];
  existingPatientDetails:UserPatient=new UserPatient();

constructor(private patientService:PatientDetailsService,private _snackBar: MatSnackBar
  ,private router: Router) {

  // Set the minimum to January 1st 20 years in the past and December 31st a year in the future.
  const currentYear = new Date().getFullYear();
 // this.minDate = new Date(currentYear - 20, 0, 1);
 //this.maxDate = new Date(currentYear + 1, 11, 31);
 this.minDate = new Date();
 this.maxDate = new Date(currentYear + 1,1,31);

 this.patientService.getAllPhysician()
 .subscribe({
  next:(result)=>{
    this.allPhysician = JSON.parse(JSON.stringify(result));
    
  },
  error:(e)=>{

  },
  complete:()=>{

  }
 })
  
}

  ngOnInit(): void {
    this.existingPatient = "1";
  }

  isExistingPatient(e:any){
    this.existingPatient = e.target.value;
    console.log(this.existingPatient);
  }

  getExistingPatientDetails(){

    console.log(this.firstname +" "+this.mobile+" "+this.gender);
    this.patientService.getExistingPatient(this.firstname,this.mobile,this.gender)
    .subscribe({
      next:(result)=>{
        console.log("Result: "+JSON.stringify(result));
      this.existingPatientDetails = JSON.parse(JSON.stringify(result));
      this.patientFound = 1;
      },
      error:(e)=>{
        this.patientFound = 0;
      }
    })
  }

  getAvailableTimeSlots(){
    console.log('Selecetd date:' +this.selectedDate);
    this.patientService.getAppointmentTimeSlots(this.selectedDate)
    .subscribe(data=>{

      this.notAvailableSlots = JSON.parse(JSON.stringify(data));
      console.log("Time slots not available: "+JSON.stringify(data));
      console.log("Total time slots: "+this.notAvailableSlots);

      this.notAvailableSlots.forEach(e=>{
        
        this.availableTimeSlots.forEach(element => {
          if(e === element.value){
            console.log("Equesl");
           let index= this.availableTimeSlots.indexOf(element);
           console.log("Index found at :"+index);
           element.disabled = "true";
          }

        });

      });
      
    },
    error=>{
      this.availableTimeSlots.forEach(element=>{
        element.disabled = "false";
      });
    },
    ()=>{
      console.info('complete');
    })
  }

  getSelectedTime(e:any,i:any){
    // console.log(" Value : "+e.value);
    // console.log("Name: "+e.name);
    // console.log("Index: "+i);
   
    this.selectedTimeSlot = e.value;
    this.timeSlotBtnBckgrnd=i;
  }

  saveAppointment(){
    this.bookAppointmentObj.isExistingPatient = this.existingPatient;
    this.bookAppointmentObj.patientId = this.existingPatientDetails.user_id;
    this.bookAppointmentObj.firstname = this.existingPatientDetails.firstname;
    this.bookAppointmentObj.lastname = this.existingPatientDetails.lastname;
    this.bookAppointmentObj.email = this.existingPatientDetails.email;
    this.bookAppointmentObj.mobile = this.existingPatientDetails.mobile;
    this.bookAppointmentObj.gender = this.existingPatientDetails.gender;
    this.bookAppointmentObj.appointmentDate =this.selectedDate;
    this.bookAppointmentObj.appointmentTime = this.selectedTimeSlot;
    this.bookAppointmentObj.appointment_with = this.selectedPhysician;
    this.bookAppointmentObj.meetingTitle = this.purpose;

    console.log(this.bookAppointmentObj);
    this.patientService.bookAppointment(this.bookAppointmentObj)
    .subscribe({
      next:(result)=>{
        console.log(result);
        this.openSnackBar("Success", "Close");
                this.router.navigate(['/home']);
      },error:(e)=>{
        this.openSnackBar("Failed", "Close");
      },
      complete() {
        
      },
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{
      duration: 2000,
    panelClass: ['mat-toolbar','mat-accent']
    });
  }
}
