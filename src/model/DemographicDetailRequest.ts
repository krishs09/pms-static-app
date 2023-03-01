import { Allergy } from "./Allergy";
import { DemographicDetails } from "./DemographicDetails";
import { EmergencyContact } from "./EmergencyContact";

export class DemographicDetailsRequest{
    patientId:any;
    demographicDetails:DemographicDetails=new DemographicDetails;
    emergencyContact:EmergencyContact=new EmergencyContact;
    allergy: Allergy[] = [];
    
}