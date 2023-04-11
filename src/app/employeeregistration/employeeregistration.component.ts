import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/model/Employee';
import { PatientDetailsService } from '../patient-details.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-employeeregistration',
  templateUrl: './employeeregistration.component.html',
  styleUrls: ['./employeeregistration.component.css']
})
export class EmployeeregistrationComponent implements OnInit {

  gender = ['Male', 'Female','Others'];
  roles =['Physician','Nurse'];

  constructor(private patientService:PatientDetailsService,private _snackBar: MatSnackBar
    ,private router: Router) { }

  ngOnInit(): void {
  }

  employee = new Employee();

  onSubmit() { 


    console.log("Submitted: "+JSON.stringify(this.employee));
    this.patientService.EmployeeRegistration(this.employee)
    .subscribe({
      next :(result)=>{
        console.log(result);
        this.openSnackBar("Success", "Close");
                this.router.navigate(['/appointments']);
      },
      error:(e)=>{

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
