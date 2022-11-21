import {Person} from "./person";
import {Profile} from "./profile";

export interface PersonProfile {
  id?: number;
  personTo: Person,
  profileTos: Profile[],
  user: string
}
