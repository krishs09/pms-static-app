import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/model/Hero';
import { UserPatient } from 'src/model/UserPatient';
import { UserPatientCopy } from 'src/model/UserPatientCopy';

@Component({
  selector: 'app-patientregistration',
  templateUrl: './patientregistration.component.html',
  styleUrls: ['./patientregistration.component.css']
})
export class PatientregistrationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  gender = ['Male', 'Female',
            'Others'];

  model = new UserPatientCopy('bvcb', 'DIQ', this.gender[0], 'Chuck Overstreet','sada','dsad','dsa');

  submitted = false;

  onSubmit() { this.submitted = true; 
    console.log("Submitted: "+JSON.stringify(this.model));
  }

  newHero() {
    this.model = new UserPatientCopy('', '', '', '', '', '', '');
  }

}
