import {Person} from "./person";

export interface PaginationPerson{
  personToList: Person[]
  totalPages: number
  totalElements: number
}
