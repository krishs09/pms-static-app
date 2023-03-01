import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Allergy } from 'src/model/Allergy';
import { DemographicDetailsRequest } from 'src/model/DemographicDetailRequest';
import { DemographicDetails } from 'src/model/DemographicDetails';
import { EmergencyContact } from 'src/model/EmergencyContact';
import { PatientDetailsService } from '../patient-details.service';

@Component({
  selector: 'app-demographic-details',
  templateUrl: './demographic-details.component.html',
  styleUrls: ['./demographic-details.component.css']
})
export class DemographicDetailsComponent implements OnInit {

  existginPatientDemogrphic:DemographicDetails = new DemographicDetails();
isNewPatient:boolean=false;
  constructor(private formBuilder: FormBuilder,private patientDetailsService: PatientDetailsService
    ,private router: Router,private _snackBar: MatSnackBar){}

  ngOnInit(): void {
this.isNewPatient = this.patientDetailsService.isNewPatient_srvc;
    if(this.patientDetailsService.demographicDetail != null){

      this.existginPatientDemogrphic = this.patientDetailsService.demographicDetail;

      this.gender = this.existginPatientDemogrphic.gender;
      this.race = this.existginPatientDemogrphic.race;
      this.ethinicity = this.existginPatientDemogrphic.ethinicity;
      this.age = this.existginPatientDemogrphic.age;
      this.date = this.existginPatientDemogrphic.dateOFBirth;
      this.contact = this.existginPatientDemogrphic.contact;
      this.homeAddress =this.existginPatientDemogrphic.homeAddress;

    }
  }
  //GET FROM OTHER SERVICE
  hardCodedPatientId=this.patientDetailsService.hardCodedPatientId;
  hardCodedAppointmentId=this.patientDetailsService.hardCodedAppointmentId;

  emergencyContactForm:any;
  submitted = false;
  isFormValid:boolean=true;


  public raceArray = [
    { id: 'Asian', name: 'Asian' ,ischecked:false},
    { id: 'White', name: 'White' ,ischecked:false},
    // { id: 'BlackNH', name: 'Black, non-Hispanic' ,ischecked:false},
    { id: 'Hispanic', name: 'Hispanic' ,ischecked:false},
    { id: 'African', name: 'African' ,ischecked:false},
    { id: 'South Asian', name: 'South Asian' ,ischecked:false},
    { id: 'Alaskan', name: 'Alaskan' ,ischecked:false},
    { id: 'Native Indian', name: 'Native Indian' ,ischecked:false},
    { id: 'Others', name: 'Others' ,ischecked:false}
  ];

  Asian:boolean=false;
  White:boolean=false;
  BlackNH:boolean=false;
  Hispanic:boolean=false;
  Other:boolean=false;
  //DEMOGRAPHIC FORM DATA

  firstName:string=this.patientDetailsService.userDetailObj.firstname;
  lastName:string=this.patientDetailsService.userDetailObj.lastname;
  date:any = this.patientDetailsService.userDetailObj.dateOfBirth;
  age:any;
  gender:string="";
  race:string="";
  ethinicity:string="";
  languagesKnown:string="";
  email:string=this.patientDetailsService.userDetailObj.email;
  contact:any;
  homeAddress:string="";
  hasAllergy:boolean = false;

  //EMERGENCY FORM DATA

  emgFirstname:string=""
  emgLastname:string=""
  relationship:string=""
  emgEmail:string=""
  emgContact:any;
  emgAddress:string=""
  accessNeeded:any;

  // ALLERGY FORM DATA

  allergyType:string="";
  allergyName:string="";
  allergyDescrp:string="";
  allergyCinfo:string="";
  isAlergyFatal:any;

  demographicObj:DemographicDetails=new DemographicDetails();
  emergencyContactInfoObj:EmergencyContact=new EmergencyContact();
  allergyObj:Allergy=new Allergy();
  demographicRequestBody:DemographicDetailsRequest=new DemographicDetailsRequest();

 
 // get f() { return this.demographicForm.controls; }

  showAllergyForm(event:any){
    if ( event.target.checked ) {
      this.hasAllergy = !this.hasAllergy;
    }else{
      this.hasAllergy = !this.hasAllergy;
    }
  }

  isAccessNeeded(e:any){
   this.accessNeeded = e.target.value
  }
  isFatal(e:any){
    this.isAlergyFatal = e.target.value;
  }

   CalculateAge()
  { 
  //  this.demographicForm.dateOFBirth = this.date;
      if(Date.parse(this.date) > Date.now()){
       alert("Date cannot be grater than today");
      }else{
        if(Date.parse(this.date)){
          var timeDiff = Math.abs(Date.now() - Date.parse(this.date));
          this.age = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
          }
        }
  }

 getselectedOptions() { // right now: ['1','3']
  console.log("Called")
    return this.raceArray
              .filter(opt => opt.ischecked == true)
              .map(opt => opt.id)
  }



     mergeEmergencyDetails(){
  //    this.emergencyContactInfoObj = this.emergencyContactForm.value;
      this.emergencyContactInfoObj.firstName = this.emgFirstname;
      this.emergencyContactInfoObj.lastName = this.emgLastname;
      this.emergencyContactInfoObj.relationship = this.relationship;
      this.emergencyContactInfoObj.email =this.emgEmail;
      this.emergencyContactInfoObj.contact = this.emgContact;
      this.emergencyContactInfoObj.address = this.emgAddress; 
      this.emergencyContactInfoObj.accessNeeded = this.accessNeeded;
    //  this.demographicRequestBody.emergencyContact = this.emergencyContactInfoObj;
     }

     validateEmergencyForm():boolean{

     if( 
      
         this.race =="" || this.race == undefined &&
         this.ethinicity =="" || this.ethinicity == undefined &&
         this.contact =="" || this.contact == undefined &&
         this.homeAddress ==""  || this.homeAddress == undefined &&
        this.emgFirstname =="" || this.emgFirstname == undefined && 
        this.emgLastname=="" || this.emgLastname == undefined && 
        this.emgAddress=="" || this.emgAddress == undefined && 
        this.emgContact=="" || this.emgContact == undefined && 
        this.relationship=="" || this.relationship == undefined 
      ){
        console.log("Inside validation IF");
        this.isFormValid = false;
      
      }
      return this.isFormValid;
     
     }

  onSubmit(){
   // console.log("CHECK BOX VALUE: "+this.Asian+" "+this.White);
  //  let race2 =this.raceArray
  //             .filter(opt => opt.ischecked == true);
  //   console.log("Race array: "+JSON.stringify(race2));
    this.submitted = true;
    
    this.demographicObj.firstName = this.patientDetailsService.userDetailObj.firstname;
    this.demographicObj.lastName= this.patientDetailsService.userDetailObj.lastname;
    this.demographicObj.dateOFBirth= this.date;
    this.demographicObj.age= this.age;
    this.demographicObj.gender= this.gender;
    this.demographicObj.race= this.race;
    this.demographicObj.ethinicity= this.ethinicity;
    this.demographicObj.languagesKnown= this.languagesKnown;
    this.demographicObj.email= this.email;
    this.demographicObj.contact= this.contact;
    this.demographicObj.homeAddress= this.homeAddress;
    this.demographicObj.anyAllergy= this.hasAllergy;

    this.emergencyContactInfoObj.firstName = this.emgFirstname;
    this.emergencyContactInfoObj.lastName = this.emgLastname;
    this.emergencyContactInfoObj.relationship = this.relationship;
    this.emergencyContactInfoObj.email = this.emgEmail;
    this.emergencyContactInfoObj.contact = this.emgContact;
    this.emergencyContactInfoObj.address = this.emgAddress;
    this.emergencyContactInfoObj.accessNeeded = this.accessNeeded;

    this.allergyObj.allergyType = this.allergyType;
    this.allergyObj.allergyName = this.allergyName;
    this.allergyObj.description = this.allergyDescrp;
    this.allergyObj.allergyClinicalInfo = this.allergyCinfo;
    this.allergyObj.isFatal = this.isAlergyFatal;

    this.demographicRequestBody.patientId = this.hardCodedPatientId;
    this.demographicRequestBody.demographicDetails = this.demographicObj;
    this.demographicRequestBody.emergencyContact = this.emergencyContactInfoObj;
    this.demographicRequestBody.allergy.push(this.allergyObj);

    if(this.validateEmergencyForm()){
    
    console.log("RWEQUEST BODY: "+JSON.stringify(this.demographicRequestBody));
    

        this.patientDetailsService.saveDemographicDetails(this.demographicRequestBody)
              .subscribe(data=>{
                console.log(JSON.stringify(data));
                this.openSnackBar("Success", "Close");
                this.router.navigate(['/home']);
              })
    
    }else{
      alert("Please fill mandatory fields")
    }
}
openSnackBar(message: string, action: string) {
  this._snackBar.open(message, action,{
    duration: 2000,
  panelClass: ['mat-toolbar','mat-accent']
  });
}
}
