import { FilterSkillPipe } from './filter-skill.pipe';
import {Skill} from "../types/skill";

describe('FilterSkillPipe', () => {
  const pipe = new FilterSkillPipe();
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms "inputArray" to "expectedArray" based on filters', () => {
    const inputArray: Skill[] = [
      {
        "id": 134,
        "nameSkill": "AngularJs",
        "typeSkill": "DevFront",
        "idProfile": 5,
        "user": "luischi",
        "state": "ACTIVO"
      },
      {
        "id": 18,
        "nameSkill": "Bus Soporte",
        "typeSkill": "QA",
        "idProfile": 6,
        "user": "luischi",
        "state": "ACTIVO"
      },
      {
        "id": 34,
        "nameSkill": "C#",
        "typeSkill": "DevBack",
        "idProfile": 7,
        "user": "luischi",
        "state": "ACTIVO"
      },
      {
        "id": 54,
        "nameSkill": "Camel",
        "typeSkill": "QA",
        "idProfile": 8,
        "user": "luischi",
        "state": "ACTIVO"
      },
      {
        "id": 131,
        "nameSkill": "CoD",
        "typeSkill": "DevBack",
        "idProfile": 9,
        "user": "luischi",
        "state": "ACTIVO"
      },
      {
        "id": 51,
        "nameSkill": "Data Tools",
        "typeSkill": "DevBack",
        "idProfile": 10,
        "user": "luischi",
        "state": "ACTIVO"
      },
      {
        "id": 123,
        "nameSkill": "Dbeaver",
        "typeSkill": "DevBack",
        "idProfile": 11,
        "user": "luischi",
        "state": "ACTIVO"
      },
      {
        "id": 36,
        "nameSkill": "Decision Server ODM",
        "typeSkill": "DevBack",
        "idProfile": 12,
        "user": "luischi",
        "state": "ACTIVO"
      },
      {
        "id": 24,
        "nameSkill": "DOCKER SWAR",
        "typeSkill": "DevBack",
        "idProfile": 13,
        "user": "luischi",
        "state": "ACTIVO"
      },
      {
        "id": 12,
        "nameSkill": "DPExterno",
        "typeSkill": "DevBack",
        "idProfile": 14,
        "user": "luischi",
        "state": "ACTIVO"
      },
      {
        "id": 56,
        "nameSkill": "DPInterno",
        "typeSkill": "QA",
        "idProfile": 15,
        "user": "luischi",
        "state": "ACTIVO"
      },
      {
        "id": 8,
        "nameSkill": "ESQL",
        "typeSkill": "DevBack",
        "idProfile": 16,
        "user": "luischi",
        "state": "ACTIVO"
      },
      {
        "id": 11,
        "nameSkill": "ETLs",
        "typeSkill": "DevBack",
        "idProfile": 17,
        "user": "luischi",
        "state": "ACTIVO"
      },
      {
        "id": 37,
        "nameSkill": "Git",
        "typeSkill": "DevBack",
        "idProfile": 18,
        "user": "luischi",
        "state": "ACTIVO"
      },
      {
        "id": 126,
        "nameSkill": "habilidad",
        "typeSkill": "DevBack",
        "idProfile": 19,
        "user": "luischi",
        "state": "ACTIVO"
      },
      {
        "id": 127,
        "nameSkill": "habilidad 2",
        "typeSkill": "DevBack",
        "idProfile": 20,
        "user": "luischi",
        "state": "ACTIVO"
      },
      {
        "id": 128,
        "nameSkill": "habilidad 3",
        "typeSkill": "DevFront",
        "idProfile": 21,
        "user": "luischi",
        "state": "ACTIVO"
      },
      {
        "id": 40,
        "nameSkill": "Html",
        "typeSkill": "DevFront",
        "idProfile": 22,
        "user": "luischi",
        "state": "ACTIVO"
      },
      {
        "id": 13,
        "nameSkill": "IB10",
        "typeSkill": "DevBack",
        "idProfile": 23,
        "user": "luischi",
        "state": "ACTIVO"
      },
      {
        "id": 43,
        "nameSkill": "Ibm Datapower",
        "typeSkill": "QA",
        "idProfile": 24,
        "user": "luischi",
        "state": "ACTIVO"
      },
      {
        "id": 44,
        "nameSkill": "IIB",
        "typeSkill": "QA",
        "idProfile": 25,
        "user": "luischi",
        "state": "ACTIVO"
      },
      {
        "id": 57,
        "nameSkill": "Integración Services",
        "typeSkill": "QA",
        "idProfile": 26,
        "user": "luischi",
        "state": "ACTIVO"
      },
      {
        "id": 52,
        "nameSkill": "Ipla java cammel",
        "typeSkill": "QA",
        "idProfile": 27,
        "user": "luischi",
        "state": "ACTIVO"
      },
      {
        "id": 1,
        "nameSkill": "Java",
        "typeSkill": "DevBack",
        "idProfile": 28,
        "user": "luischi",
        "state": "ACTIVO"
      },
      {
        "id": 27,
        "nameSkill": "JOBS",
        "typeSkill": "QA",
        "idProfile": 29,
        "user": "luischi",
        "state": "ACTIVO"
      },
      {
        "id": 39,
        "nameSkill": "Maven",
        "typeSkill": "DevBack",
        "idProfile": 30,
        "user": "luischi",
        "state": "ACTIVO"
      },
      {
        "id": 30,
        "nameSkill": "MDW",
        "typeSkill": "QA",
        "idProfile": 31,
        "user": "luischi",
        "state": "ACTIVO"
      },
      {
        "id": 9,
        "nameSkill": "MSSQL",
        "typeSkill": "DevBack",
        "idProfile": 32,
        "user": "luischi",
        "state": "ACTIVO"
      },
      {
        "id": 122,
        "nameSkill": "Neo4j",
        "typeSkill": "DevBack",
        "idProfile": 33,
        "user": "luischi",
        "state": "ACTIVO"
      },
      {
        "id": 21,
        "nameSkill": "Openshift",
        "typeSkill": "DevBack",
        "idProfile": 34,
        "user": "luischi",
        "state": "ACTIVO"
      },
      {
        "id": 20,
        "nameSkill": "Oracle",
        "typeSkill": "DevBack",
        "idProfile": 35,
        "user": "luischi",
        "state": "ACTIVO"
      },
      {
        "id": 33,
        "nameSkill": "Outlook",
        "typeSkill": "QA",
        "idProfile": 36,
        "user": "luischi",
        "state": "ACTIVO"
      },
      {
        "id": 10,
        "nameSkill": "PL-SQL",
        "typeSkill": "DevBack",
        "idProfile": 37,
        "user": "luischi",
        "state": "ACTIVO"
      },
      {
        "id": 32,
        "nameSkill": "Proofpoint",
        "typeSkill": "QA",
        "idProfile": 38,
        "user": "luischi",
        "state": "ACTIVO"
      },
      {
        "id": 5,
        "nameSkill": "Python",
        "typeSkill": "DevBack",
        "idProfile": 39,
        "user": "luischi",
        "state": "ACTIVO"
      },
      {
        "id": 132,
        "nameSkill": "Re4",
        "typeSkill": "QA",
        "idProfile": 40,
        "user": "luischi",
        "state": "ACTIVO"
      },
      {
        "id": 6,
        "nameSkill": "React",
        "typeSkill": "DevFront",
        "idProfile": 41,
        "user": "luischi",
        "state": "ACTIVO"
      },
      {
        "id": 7,
        "nameSkill": "RPA",
        "typeSkill": "QA",
        "idProfile": 42,
        "user": "luischi",
        "state": "ACTIVO"
      },
      {
        "id": 50,
        "nameSkill": "SAS Data Integration",
        "typeSkill": "DevFront",
        "idProfile": 43,
        "user": "luischi",
        "state": "ACTIVO"
      },
      {
        "id": 60,
        "nameSkill": "Scrum",
        "typeSkill": "DevBack",
        "idProfile": 44,
        "user": "luischi",
        "state": "ACTIVO"
      },
      {
        "id": 28,
        "nameSkill": "Seguridad Informática",
        "typeSkill": "QA",
        "idProfile": 45,
        "user": "luischi",
        "state": "ACTIVO"
      },
      {
        "id": 35,
        "nameSkill": "Shell",
        "typeSkill": "DevBack",
        "idProfile": 46,
        "user": "luischi",
        "state": "ACTIVO"
      },
      {
        "id": 16,
        "nameSkill": "Sprint Boot",
        "typeSkill": "DevBack",
        "idProfile": 47,
        "user": "luischi",
        "state": "ACTIVO"
      },
      {
        "id": 14,
        "nameSkill": "SQL",
        "typeSkill": "DevBack",
        "idProfile": 48,
        "user": "luischi",
        "state": "ACTIVO"
      },
      {
        "id": 49,
        "nameSkill": "SSAS",
        "typeSkill": "QA",
        "idProfile": 49,
        "user": "luischi",
        "state": "ACTIVO"
      },
      {
        "id": 41,
        "nameSkill": "SSIS",
        "typeSkill": "DevBack",
        "idProfile": 50,
        "user": "luischi",
        "state": "ACTIVO"
      },
      {
        "id": 48,
        "nameSkill": "SSMS",
        "typeSkill": "QA",
        "idProfile": 51,
        "user": "luischi",
        "state": "ACTIVO"
      },
      {
        "id": 29,
        "nameSkill": "Unix",
        "typeSkill": "QA",
        "user": "luischi",
        "idProfile": 52,
        "state": "ACTIVO"
      },
      {
        "id": 47,
        "nameSkill": "Visual Studio",
        "typeSkill": "DevBack",
        "idProfile": 53,
        "user": "luischi",
        "state": "ACTIVO"
      },
      {
        "id": 133,
        "nameSkill": "Word",
        "typeSkill": "DevFront",
        "idProfile": 54,
        "user": "luischi",
        "state": "ACTIVO"
      }
    ]
    const nameFilter:string = "ca"
    const typeFilter: string = "QA"

    const expectArray: Skill[] = [
      {
        "id": 54,
        "nameSkill": "Camel",
        "typeSkill": "QA",
        "idProfile": 8,
        "user": "luischi",
        "state": "ACTIVO"
      },
      {
        "id": 52,
        "nameSkill": "Ipla java cammel",
        "typeSkill": "QA",
        "idProfile": 27,
        "user": "luischi",
        "state": "ACTIVO"
      },
      {
        "id": 28,
        "nameSkill": "Seguridad Informática",
        "typeSkill": "QA",
        "idProfile": 45,
        "user": "luischi",
        "state": "ACTIVO"
      }
    ]

    // expected array
    expect(pipe.transform(inputArray, nameFilter, typeFilter)).toStrictEqual(expectArray);

    // expected to include the nameFilter
    pipe.transform(inputArray, nameFilter, typeFilter).forEach(({nameSkill})=>{
      expect(nameSkill.toUpperCase().includes(nameFilter.toUpperCase()))
    })

    // expected to equal the typeFilter
    pipe.transform(inputArray, nameFilter, typeFilter).forEach(({typeSkill})=>{
      expect(typeSkill).toEqual(typeFilter);
    })

  });

  it('transforms "inputArray" to same array based on undefined array', () => {
    const inputArray: Skill[] = undefined

    const expectArray: Skill[] = undefined

    // expected array
    expect(pipe.transform(inputArray)).toStrictEqual(expectArray);
  });


});
