import {Celula} from "./celula";
import {Person} from "./person";


export interface PersonCelula {
  id?: number,
  assignmentStartDate?: string,
  assignmentEndDate?: string,
  tentativeAssignmentEndDate: string,
  allocationPercentage: number,
  personTo: Person,
  celulaTo: Celula,
  observation?: string
  user?: string,
  state?: string
}
