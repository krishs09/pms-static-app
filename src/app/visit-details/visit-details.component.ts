import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DemographicDetails } from 'src/model/DemographicDetails';
import { Diagnosis } from 'src/model/Diagnosis';
import { DiagnosisMaster } from 'src/model/DiagnosisMaster';
import { MasterDataResponse } from 'src/model/MasterDataResponse';
import { Medication } from 'src/model/Medication';
import { MedicationMaster } from 'src/model/MedicationMaster';
import { Procedure } from 'src/model/Procedure';
import { ProcedureMaster } from 'src/model/ProcedureMaster';
import { VisitDetailsRequestBody } from 'src/model/VisitDetailsRequestBody';
import { VitalSigns } from 'src/model/VitalSigns';
import { PatientDetailsService } from '../patient-details.service';
// FOR AUTOCOMPLETE
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

export interface Fruit {
  name: string;
}

@Component({
  selector: 'app-visit-details',
  templateUrl: './visit-details.component.html',
  styleUrls: ['./visit-details.component.css']
})

export class VisitDetailsComponent implements OnInit {

  panelOpenState = false;

  diagnosisMasterArray: DiagnosisMaster[] = [];
  procedureMasterArray:ProcedureMaster[]=[];
  medicationMasterArray:MedicationMaster[]=[];
  masterDataResponse:any;

 // allDiagnosisList: string[] = [];
 
  //SHOULD GET FROM OTHER SERVICE, HOW IS CALLING THIS SERVICE
   
  
  //SHOULD GET FROM OTHER SERVICE, HOW IS CALLING THIS SERVICE
  hardCodedPatientId=this.patientDetailService.hardCodedPatientId;
  hardCodedAppointmentId=this.patientDetailService.hardCodedAppointmentId;

  //VITAL SIGN DATA
  height:any;
  weight:any;
  bloodPressure:any;
  bloodPressureType:string="";
  bodyTemp:number=0;
  respirationRate:number=0;

  // DIAGNOSIS DATA

  diagnosisId:any;
  diagnosisCode:any;
  description:string="";

  //PROCEDURE DATA

  procedureId:any;
  procedureCode:any;
  prdescription:any;

  //MEDICATION DATA
  medicationId:any;
  drugId:any;
  drugName:string="";
 drugGenericName:string="";
 drugBrand:string="";
 drugForm:string="";
 drugStrength:string="";

 vitalSignObj: VitalSigns = new VitalSigns();
 diagnosisObjArray:Diagnosis []= [];
 procedureObj:Procedure = new Procedure();
 medicationObj:Medication = new Medication();
  visitDetailRequest :VisitDetailsRequestBody = new VisitDetailsRequestBody();

  diagnossiCategories= [{value:"Adult",name:"Adult"},{value:"Newborn",name:"Newborn"},{value:"Pediatric",name:"Pediatric"},
  {value:"Females only",name:"Females only"},{value:"Males Only",name:"Males Only"},{value:"Manifestation",name:"Manifestation"}
,{value:"Mental health",name:"Mental health"}]

  //FOR AUTOCOMPLETE
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl('');
  filteredFruits!: Observable<string[]>;
  selectedDiagnosis: string[] = [];
  //allDiagnosisList: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
  allDiagnosisList: string[] = [];
  allProcedureList = [];
  fruitInputs:string="";

  // FOR PROCEDURE AUTOCOMPLETE
  //myControl = new FormControl('');

  @ViewChild('fruitInput')
  fruitInput!: ElementRef<HTMLInputElement>; 

 constructor(private formBuilder: FormBuilder,private patientDetailService: PatientDetailsService,
  private router: Router,private _snackBar: MatSnackBar) { 
  
  }

  ngOnInit(): void {
    this.patientDetailService.getMasterData()
    .subscribe(data=>{
   //   console.log("Master data: "+JSON.stringify(data));
      this.masterDataResponse = JSON.parse(JSON.stringify(data));
    //  console.log("MASTER RESPONSE "+JSON.stringify(this.masterDataResponse));
    // console.log("DIAGNOSIS DATA: "+JSON.stringify(this.masterDataResponse.diganosisMaster));
    this.diagnosisMasterArray = this.masterDataResponse.diganosisMaster;
    this.procedureMasterArray = this.masterDataResponse.procedureMaster;
    this.medicationMasterArray = this.masterDataResponse.medicationMaster;
  
   // console.log("PROC: "+JSON.stringify(this.procedureMasterArray) );
  // console.log("MED: "+JSON.stringify(this.medicationMasterArray) );

    this.diagnosisMasterArray.forEach(diag=>{
      this.allDiagnosisList.push(diag.diagnosisDescription+" { "+diag.diagnosisCode+" } "+" < "+diag.diagnosisId+" >");
      });
    });
   
    // this.procedureMasterArray.forEach(proc=>{
    //    this.allProcedureList.push(this.procObj);

    // })
  
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allDiagnosisList.slice())),
    );
    }

// FOR AUTOCOMPLETE DIAGNOSIS

add(event: MatChipInputEvent): void {
  const value = (event.value || '').trim();

  // Add our fruit
  if (value) {
    this.selectedDiagnosis.push(value);
  }

  // Clear the input value
  event.chipInput!.clear();

  this.fruitCtrl.setValue(null);
}

remove(fruit: string): void {
  const index = this.selectedDiagnosis.indexOf(fruit);

  if (index >= 0) {
    this.selectedDiagnosis.splice(index, 1);
  }
}

selected(event: MatAutocompleteSelectedEvent): void {
  this.selectedDiagnosis.push(event.option.viewValue);
  this.fruitInput.nativeElement.value = '';
  //this.fruitInputs='';
  this.fruitCtrl.setValue(null);
}

private _filter(value: string): string[] {
  const filterValue = value.toLowerCase();
  
  return this.allDiagnosisList.filter(fruit => fruit.toLowerCase().includes(filterValue));
}

public submitf(){
  console.log("Fruits selected: "+JSON.stringify(this.selectedDiagnosis));
}
//FOR AUTOMVCOMPTE DIAGNOSIS END
 
displayFnProcedure(item:any){
  this.procedureCode = item.procedureCode;
  this.prdescription = item.procedureDescription;
 // console.log("Code: "+item.procedureCode + " Description :"+item.procedureDescription);
  return item.procedureDescription
}
displayFnMedication(item:any){
  this.drugId = item.drugId;
  this.drugGenericName = item.drugGenericName;
  this.drugForm = item.drugForm;
  this.drugStrength = item.drugStrength;
  return item.drugName
}


 onSubmit(){
      this.vitalSignObj.height = this.height;
      this.vitalSignObj.weight = this.weight;
      this.vitalSignObj.bloodPressure = this.bloodPressure;
      this.vitalSignObj.bloodPressureType = this.bloodPressureType;
      this.vitalSignObj.bodyTemp = this.bodyTemp;

      this.selectedDiagnosis.forEach(diag=>{
        let diagDesc =  diag.substring(0,diag.indexOf('{'));
        let diagCode = diag.substring(diag.indexOf('{')+1,diag.indexOf('}'));
        let diagId = diag.substring(diag.indexOf('<')+1,diag.indexOf('>'));
        console.log(diagDesc.trim().toString() +" / "+diagCode.trim().toString()+" /  "+diagId.trim().toString());

        let diagObj :Diagnosis={
          diagnosisId:0,
          diagnosisCode:"",
          description:"",
          isDepricated:false
        }

        diagObj.diagnosisId = Number(diagId.trim().toString());
       diagObj.diagnosisCode = diagCode.trim().toString();
       diagObj.description = diagDesc.trim().toString();

       this.diagnosisObjArray.push(diagObj);
      })

    

      this.procedureObj.procedureId = this.procedureId;
      this.procedureObj.procedureCode = this.procedureCode;
      this.procedureObj.description = this.prdescription;

      this.medicationObj.medicationId = this.medicationId;
      this.medicationObj.drugBrand = this.drugBrand;
      this.medicationObj.drugForm = this.drugForm;
      this.medicationObj.drugGenericName = this.drugGenericName;
      this.medicationObj.drugId = this.drugId;
      this.medicationObj.drugName = this.drugName;
      this.medicationObj.drugStrength = this.drugStrength;

      this.visitDetailRequest.patientId = this.hardCodedPatientId;
      this.visitDetailRequest.appointmentId = this.hardCodedAppointmentId;
      this.visitDetailRequest.vitalSign = this.vitalSignObj;
      this.visitDetailRequest.diagnosis = this.diagnosisObjArray;
      this.visitDetailRequest.procedure = this.procedureObj;
      this.visitDetailRequest.medication = this.medicationObj;

  console.log("Examination data: "+JSON.stringify(this.visitDetailRequest));

       this.patientDetailService.saveExaminationVisitDetails(this.visitDetailRequest)
       .subscribe(data=>{
       //  console.log(JSON.stringify(data));
         this.openSnackBar("Success", "Close");
         this.router.navigate(['/home']);
       });
 }

 openSnackBar(message: string, action: string) {
  this._snackBar.open(message, action,{
    duration: 2000,
  panelClass: ['mat-toolbar','mat-accent']
  });
}

}
