import {Person} from "./person";
import {Skill} from "./skill";

export interface PersonSkills {
  id?: number,
  personTo: Person,
  skillToList: Skill[],
  "user"?: string
  "state"?: string
}
