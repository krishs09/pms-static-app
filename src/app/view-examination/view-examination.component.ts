import { Component, OnInit } from '@angular/core';
import { Diagnosis } from 'src/model/Diagnosis';
import { Medication } from 'src/model/Medication';
import { Procedure } from 'src/model/Procedure';
import { VisitDetailsRequestBody } from 'src/model/VisitDetailsRequestBody';
import { VitalSigns } from 'src/model/VitalSigns';
import { PatientDetailsService } from '../patient-details.service';

@Component({
  selector: 'app-view-examination',
  templateUrl: './view-examination.component.html',
  styleUrls: ['./view-examination.component.css']
})
export class ViewExaminationComponent implements OnInit {

  //SHOULD GET FROM OTHER SERVICE, HOW IS CALLING THIS SERVICE
  hardCodedPatientId=this.patientDetailsService.hardCodedPatientId;
  hardCodedAppointmentId=this.patientDetailsService.hardCodedAppointmentId;
  
  vitalSignObj: VitalSigns = new VitalSigns();
  diagnosisObjArray:Diagnosis []= [];
  procedureObj:Procedure = new Procedure();
  medicationObj:Medication = new Medication();
  visitBody:VisitDetailsRequestBody  = new VisitDetailsRequestBody


  constructor(private patientDetailsService: PatientDetailsService) { }

  ngOnInit(): void {
    this.patientDetailsService.getVisitdetail(this.hardCodedPatientId,this.hardCodedAppointmentId)
    .subscribe(data=>{
      this.visitBody = JSON.parse(JSON.stringify(data));
      console.log("Visit data: "+JSON.stringify(data));
      this.vitalSignObj = this.visitBody.vitalSign;
      this.diagnosisObjArray = this.visitBody.diagnosis;
      this.procedureObj =this.visitBody.procedure;
      this.medicationObj = this.visitBody.medication;
    })
  }



}
