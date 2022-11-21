import {Person} from "./person";
import {Chapter} from "./chapter";

export interface PersonChapter {
  personTo: Person,
  chapterToList: Chapter[],
  user: string
}
