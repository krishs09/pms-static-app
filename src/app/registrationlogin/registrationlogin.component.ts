import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/model/Employee';
import { PatientDetailsService } from '../patient-details.service';

@Component({
  selector: 'app-registrationlogin',
  templateUrl: './registrationlogin.component.html',
  styleUrls: ['./registrationlogin.component.css']
})
export class RegistrationloginComponent implements OnInit {

email:any;
password:any;
empDetails:any;
loggedInEmpId:any;
loggedInEmpName:any;
loggedInEmpRole:any;
loggedInEmpGender:any;




  constructor(private patientService: PatientDetailsService,private router:Router) { }

  ngOnInit(): void {
  }

  login(){
    this.patientService.validateLogin(this.email,this.password)
    .subscribe({
      next:(result)=>{
        
        console.log("Emp data Dtaa "+result);
        this.empDetails = result;
        console.log("Emp id: "+this.empDetails.employeeId);
        sessionStorage.setItem('loggedInEmpId_session',this.empDetails.employeeId);
        sessionStorage.setItem('loggedInEmpName_session',this.empDetails.employeeName);
        sessionStorage.setItem('loggedInEmpRole_session',this.empDetails.role);
        sessionStorage.setItem('loggedInEmpGender_session',this.empDetails.gender);
        this.router.navigate(['/appointments']);
      //  this.empDetails = JSON.parse(JSON.stringify(result));
       
      // sessionStorage.setItem('empObj',JSON.stringify(result)); // Doesnt work for object

      },
      error:(e)=>{
        alert("Invalid email or password");
      }
    })
  }

}
