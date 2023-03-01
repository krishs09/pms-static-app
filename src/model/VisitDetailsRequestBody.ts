import { Diagnosis } from "./Diagnosis";
import { Medication } from "./Medication";
import { Procedure } from "./Procedure";
import { VitalSigns } from "./VitalSigns";

export class VisitDetailsRequestBody{

    patientId:any;
    appointmentId:any;
    vitalSign: VitalSigns = new VitalSigns();
    diagnosis:Diagnosis []= [];
    procedure:Procedure = new Procedure();
    medication:Medication = new Medication();
}