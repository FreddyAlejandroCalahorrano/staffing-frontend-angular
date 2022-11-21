import { PersonReport } from "./personReport";

export interface PaginationPersonReport{
  personReportTos: PersonReport[]
  totalPages: number
  totalElements: number
}