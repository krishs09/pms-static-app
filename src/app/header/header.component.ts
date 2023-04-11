import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatientDetailsService } from '../patient-details.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedInEmpname_session:any;

  constructor(private router:Router,private patientService:PatientDetailsService) {

    console.log("loggedInEmpname in constructor: "+sessionStorage.getItem('loggedInEmpName_session'));
   }

  ngOnInit(): void {
    this.loggedInEmpname_session = sessionStorage.getItem('loggedInEmpName_session');
    console.log("loggedInEmpname in onint: "+sessionStorage.getItem('loggedInEmpName_session'));
  }
  logout(){
    sessionStorage.clear();
    console.log('Apt id afetre clear: '+sessionStorage.getItem('appointmentId'));
    console.log('Emp name: '+sessionStorage.getItem('loggedInEmpName_session'));
    this.router.navigate(['/']);
    this.ngOnInit();
    
  }
}
