import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DemographicDetailsRequest } from 'src/model/DemographicDetailRequest';
import { DemographicDetails } from 'src/model/DemographicDetails';
import { UserPatient } from 'src/model/UserPatient';

@Injectable({
  providedIn: 'root'
})
export class PatientDetailsService {


  patientId_srvc:any;
  physicianId_srvc:any;
  appointmentId_srvc:any;


  userDetailObj :UserPatient = new UserPatient();
  isNewPatient_srvc:boolean=false
  private DEMOGRAPHIC_BASE_URL: string = 'http://localhost:8081/demographic_details';
  private VISIT_DETAIL_BASE_URL: string = 'http://localhost:8082/visit_details';
  private REGISTRATION_AND_LOGIN_URL :string = 'http://localhost:8083/registrationAndLogin';

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

  public getAllAppointmentsForPhysician(physicianId:any){
    return this.http.get(this.VISIT_DETAIL_BASE_URL+'/getallappointmentForPhysician',{params:{physicianId:physicianId}});
  }

  public getAppointmentTimeSlots(date:any){
    return this.http.get(this.VISIT_DETAIL_BASE_URL+'/getTimeSlots',{params:{date:date}});
  }

  public getExistingPatient(firstname:any,mobile:any,gender:any){
    return this.http.get(this.VISIT_DETAIL_BASE_URL+'/findExistingPatient',{params:{firstname:firstname,mobile:mobile,gender:gender}});
  }

  public getAllPhysician(){
    return this.http.get(this.DEMOGRAPHIC_BASE_URL+'/getAllPhysician');
  }

  public bookAppointment(bookAppointmetnObj:any){
    return this.http.post(this.VISIT_DETAIL_BASE_URL+'/saveAppointment',bookAppointmetnObj);
  }

  public validateLogin(email:any,password:any){
    return this.http.get(this.REGISTRATION_AND_LOGIN_URL+'/validateLoginCredentials',{params:{email:email,password:password}});
  }

  public newPatientRegistration(patientObj:any){
    return this.http.post(this.REGISTRATION_AND_LOGIN_URL+'/new-patient',patientObj);
  }

  public EmployeeRegistration(employeeObj:any){
    return this.http.post(this.REGISTRATION_AND_LOGIN_URL+'/new-employee',employeeObj);
  }
}
