import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/model/Hero';
import { UserPatient } from 'src/model/UserPatient';
import { UserPatientCopy } from 'src/model/UserPatientCopy';
import { PatientDetailsService } from '../patient-details.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patientregistration',
  templateUrl: './patientregistration.component.html',
  styleUrls: ['./patientregistration.component.css']
})
export class PatientregistrationComponent implements OnInit {

  constructor(private patientService:PatientDetailsService,private _snackBar: MatSnackBar
    ,private router: Router) { }

  ngOnInit(): void {
  }

  gender = ['Male', 'Female',
            'Others'];

  model = new UserPatientCopy('bvcb', 'DIQ', this.gender[0], 'Chuck Overstreet','sada','dsad','dsa');

  submitted = false;

  onSubmit() { 
    this.submitted = true; 

    console.log("Submitted: "+JSON.stringify(this.model));
    this.patientService.newPatientRegistration(this.model)
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

  newHero() {
    this.model = new UserPatientCopy('', '', '', '', '', '', '');
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{
      duration: 2000,
    panelClass: ['mat-toolbar','mat-accent']
    });
  }

}
