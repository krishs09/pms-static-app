import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DemographicDetailsRequest } from 'src/model/DemographicDetailRequest';
import { DemographicDetails } from 'src/model/DemographicDetails';
import { UserPatient } from 'src/model/UserPatient';

@Injectable({
  providedIn: 'root'
})
export class PatientDetailsService {

  hardCodedPatientId=1;
  hardCodedAppointmentId=1

userDetailObj :UserPatient = new UserPatient();
isNewPatient_srvc:boolean=false
  private DEMOGRAPHIC_BASE_URL: string = 'http://localhost:8081/demographic_details';
  private VISIT_DETAIL_BASE_URL: string = 'http://localhost:8082/visit_details';

  demographicDetail:DemographicDetails=new DemographicDetails();
  
  constructor(private http:HttpClient) { }

  public getPatientDetailsById(id:any){
    return this.http.get(this.DEMOGRAPHIC_BASE_URL+'/getpatientById',{params:{patientId:id}});
  }
  public saveDemographicDetails(demographicDetailReqBody:Object){
    console.log("REQUEST IN SERVICE: "+JSON.stringify(demographicDetailReqBody));
    return this.http.post(this.DEMOGRAPHIC_BASE_URL+'/save',demographicDetailReqBody);
  }
  
  public getDemographicDetails(patientId:any){

    return this.http.get(this.DEMOGRAPHIC_BASE_URL+'/getDemographicDetail',{params:{patientId:patientId}});
  }

  public saveExaminationVisitDetails(visitDetailRequest:Object){
    console.log("VISIT DETAILS REQUEST IN SERVICE: "+JSON.stringify(visitDetailRequest));
    return this.http.post(this.VISIT_DETAIL_BASE_URL+'/save',visitDetailRequest);
  }
  public getMasterData(){
    return this.http.get(this.VISIT_DETAIL_BASE_URL+'/getmasterdata');
  }

  public getVisitdetail(patientId:any,appointmentId:any){
    return this.http.get(this.VISIT_DETAIL_BASE_URL+'/getVisitdetail',{params:{patientId:patientId,appointmentId:appointmentId}});
  }

  public getAllAppointments(patientId:any){
    return this.http.get(this.VISIT_DETAIL_BASE_URL+'/getallappointment',{params:{patientId:patientId}});
  }

}
