import {Pipe, PipeTransform} from '@angular/core';
import {Skill} from "../types/skill";

@Pipe({
  name: 'filterSkill'
})
export class FilterSkillPipe implements PipeTransform {

  transform(array: Skill[], nameFilter?: string, typeFilter?: string): Skill[] {

    let returnArray:Skill[]

    returnArray = array

    nameFilter = nameFilter?.toUpperCase()

    if(!array) {
      return array
    } else{
      returnArray = returnArray.filter(({nameSkill})=>
        nameSkill.toUpperCase().includes(nameFilter)
      )
      if(typeFilter != undefined && typeFilter != '' && typeFilter != "Todas")  {
        returnArray = returnArray.filter(({typeSkill})=>
          typeSkill == typeFilter
        )
      }

    }

    return  returnArray
  }

}
