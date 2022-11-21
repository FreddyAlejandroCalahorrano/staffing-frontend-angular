import {Person} from "./person";
import {Tribu} from "./tribu";

export interface PersonTribu {
  id?: number,
  typeRoleLeader: string,
  personTo: Person,
  tribuTo: Tribu,
  assignmentStartDate: string,
  assignmentEndDate: string,
  observation?: string
  "user"?: string
  "state"?: string
}

export interface PersonTribuTable {
  id?: number,
  tribuId: number,
  tribuName: string,
  longName: string,
  typeRoleLeader: string,
  assignmentStartDate: string,
  assignmentEndDate?: string,
}
