import { DiagnosisMaster } from "./DiagnosisMaster";
import { MedicationMaster } from "./MedicationMaster";
import { ProcedureMaster } from "./ProcedureMaster";

export class MasterDataResponse{
    diagnosisMaster: DiagnosisMaster[] = [];
    procedureMaster:ProcedureMaster[]=[];
    medicationMaster:MedicationMaster[]=[];
}