import {SkillsService} from './skills.service';
import Mocked = jest.Mocked;
import {from} from "rxjs";
import DoneCallback = jest.DoneCallback;
import {PersonSkills} from "../types/personSkills";
import {Skill} from "../types/skill";

describe('SkillsService', () => {
  let skillsService: SkillsService;
  let httpServiceMock: Mocked<any>

  beforeEach(() => {
    httpServiceMock = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn()
    }
    skillsService = new SkillsService(httpServiceMock);
  })

  it('should be created', () => {
    expect(skillsService).toBeTruthy();
  });


  it('should return expected type skills', (done: DoneCallback) => {

    const expectedTypeSkills: string[] = ["DevBack", "DevFront", "QA"]

    httpServiceMock.get.mockReturnValueOnce([expectedTypeSkills]);

    from(skillsService.getTypeSkills())
      .subscribe((typeSkills) => {
        // expected value
        expect(typeSkills).toEqual(expectedTypeSkills)

        // skills length is expected to be greater than 0
        expect(typeSkills.length).toBeGreaterThan(0)

        done()
      })

    expect(httpServiceMock.get).toHaveBeenCalled();

  })

  it('should return expected skills by person id', (done: DoneCallback) => {

    const id = 49

    const expectedPersonSkills: PersonSkills = {
      "personTo": {
        "id": id,
        "ultimatix": 2070052,
        "name": "Ernesto",
        "lastName": "Arias",
        "email": "correofake@hotmail.com",
        "bornDay": 0,
        "bornMonth": 0,
        "bankEntryDate": "2022-01-03",
        "phoneNumber": "0995470801",
        "codeCountry": "ECU",
        "role": "Lider",
        "user": "luischi",
        "state": "ACTIVO",
        "idProvider": 2,
        "idSeniority": 2
      },
      "skillToList": [
        {
          "id": 49,
          "nameSkill": "SSAS",
          "typeSkill": "QA",
          "idProfile": 5,
          "user": "luischi",
          "state": "ACTIVO"
        },
        {
          "id": 126,
          "nameSkill": "habilidad",
          "typeSkill": "DevBack",
          "idProfile": 6,
          "user": "luischi",
          "state": "ACTIVO"
        },
        {
          "id": 127,
          "nameSkill": "habilidad 2",
          "typeSkill": "DevBack",
          "idProfile": 7,
          "user": "luischi",
          "state": "ACTIVO"
        }
      ],
      "user": "nicolasito"
    }

    httpServiceMock.get.mockReturnValueOnce([expectedPersonSkills]);

    from(skillsService.getSkillsByPersonId(id))
      .subscribe((personSkills) => {
        // expected value
        expect(personSkills).toEqual(expectedPersonSkills)

        // expected person id
        expect(personSkills.personTo.id).toEqual(expectedPersonSkills.personTo.id)

        // expected skillToList
        expect(personSkills.skillToList).toEqual(expectedPersonSkills.skillToList)

        // expected skillToList to be 3
        expect(personSkills.skillToList.length).toBe(3)

        done()
      })

  })

  it('should assign a skills list to a person', (done: DoneCallback) => {

    const newPersonSkills: PersonSkills = {
      "personTo": {
        "id": 49,
        "ultimatix": null,
        "name": "Ernesto",
        "lastName": "Arias",
        "email": "correofake@hotmail.com",
        "bornDay": 0,
        "bornMonth": 0,
        "bankEntryDate": "2022-05-10",
        "phoneNumber": "0987654321",
        "codeCountry": "AFG",
        "role": "Staff",
        "user": "luischi",
        "state": "ACTIVO",
        "idProvider": 2,
        "idSeniority": 2
      },
      "skillToList": [
        {
          "id": 24,
          "nameSkill": "DOCKER SWAR",
          "typeSkill": "DevBack",
          "idProfile": 8,
          "user": "luischi",
          "state": "ACTIVO"
        },
        {
          "id": 12,
          "nameSkill": "DPExterno",
          "typeSkill": "DevBack",
          "idProfile": 9,
          "user": "luischi",
          "state": "ACTIVO"
        }
      ],
      "user": "nicolasito"
    }

    httpServiceMock.post.mockReturnValueOnce([newPersonSkills]);

    from(skillsService.addPersonSkills(newPersonSkills))
      .subscribe((personSkills) => {
        // expected value
        expect(personSkills).toEqual(newPersonSkills)

        // skillToList Length is expected to be 2
        expect(personSkills.skillToList.length).toBe(2)

        done()
      })

    expect(httpServiceMock.post).toHaveBeenCalled();

  })

  it('should delete person skill and return the deleted skill', (done: DoneCallback) => {

    const deletedPersonSkill: any = {
      "id": 134,
      "personTo": {
        "id": 49,
        "name": "Ernesto",
        "lastName": "Arias",
        "email": "correofake@hotmail.com",
        "bornDate": "1998-01-01",
        "identificationCard": "1231231231",
        "phoneNumber": "2521525225",
        "homeAddress": "Diez de Agosto",
        "countryTo": {"code": "ARE", "description": "Emiratos Árabes Unidos"},
        "age": 24,
        "role": "Staff",
        "user": "luischi",
        "state": "ACTIVO",
        "providerTo": null
      },
      "skillTo": {"id": 49, "nameSkill": "SSAS", "typeSkill": "QA", "user": "luischi", "state": "ACTIVO"},
      "user": "luischi",
      "state": "INACTIVO"
    }

    httpServiceMock.put.mockReturnValueOnce([deletedPersonSkill]);

    from(skillsService.deletePersonSkill(deletedPersonSkill))
      .subscribe((personSkill) => {

        // expected value
        expect(personSkill).toEqual(deletedPersonSkill)

        // expected skillTo
        expect(personSkill.skillTo).toEqual(deletedPersonSkill.skillTo)

        done()
      })

  })

  it('should return expected skills', (done: DoneCallback) => {

    const expectedSkills: Skill[] = [
      {
        "id": 18,
        "nameSkill": "Bus Soporte",
        "typeSkill": "DevBack",
        "idProfile": 10,
        "user": "luischi",
        "state": "ACTIVO"
      },
      {
        "id": 34,
        "nameSkill": "C#",
        "typeSkill": "DevBack",
        "idProfile": 11,
        "user": "luischi",
        "state": "ACTIVO"
      },
      {
        "id": 54,
        "nameSkill": "Camel",
        "typeSkill": "QA",
        "idProfile": 12,
        "user": "luischi",
        "state": "ACTIVO"
      }
    ]

    httpServiceMock.get.mockReturnValueOnce([expectedSkills]);

    from(skillsService.getSkills())
      .subscribe((skills) => {
        // expected value
        expect(skills).toEqual(expectedSkills)

        // skills length is expected to be greater than 0
        expect(skills.length).toBeGreaterThan(0)

        done()
      })

    expect(httpServiceMock.get).toHaveBeenCalled();

  })

  it('should return expected skills expect deletedSkills', (done: DoneCallback) => {

    const deletedSkills: Skill[] = [
      {
        "id": 18,
        "nameSkill": "Bus Soporte",
        "typeSkill": "DevBack",
        "idProfile": 13,
        "user": "luischi",
        "state": "ACTIVO"
      }
    ]
    const fullSkills: Skill[] = [
      {
        "id": 18,
        "nameSkill": "Bus Soporte",
        "typeSkill": "DevBack",
        "idProfile": 14,
        "user": "luischi",
        "state": "ACTIVO"
      },
      {
        "id": 34,
        "nameSkill": "C#",
        "typeSkill": "DevBack",
        "idProfile": 15,
        "user": "luischi",
        "state": "ACTIVO"
      },
      {
        "id": 54,
        "nameSkill": "Camel",
        "typeSkill": "QA",
        "idProfile": 16,
        "user": "luischi",
        "state": "ACTIVO"
      }
    ]

    httpServiceMock.get.mockReturnValueOnce([fullSkills]);

    from(skillsService.getSkillsExpect(deletedSkills))
      .subscribe((skills) => {
        skills.forEach((skill) => {
          expect(skill.id).not.toBe(deletedSkills[0].id)
        })

        done()
      })

    expect(httpServiceMock.get).toHaveBeenCalled();

  })

  it('should update the skill and return the updated skill', (done: DoneCallback) => {

    const updatedSkill: Skill = {
      "id": 18,
      "nameSkill": "Bus Soporte",
      "typeSkill": "QA",
      "idProfile": 19,
      "user": "luischi",
      "state": "ACTIVO"
    }

    httpServiceMock.put.mockReturnValueOnce([updatedSkill]);

    from(skillsService.updateSkill(updatedSkill, updatedSkill.id))
      .subscribe((skill) => {

        // expected value
        expect(skill).toEqual(updatedSkill)

        // expected typeSkill
        expect(skill.typeSkill).toEqual(updatedSkill.typeSkill)

        done()
      })

    expect(httpServiceMock.put).toHaveBeenCalled();

  })

  it('should add the skill and return the new skill', (done: DoneCallback) => {

    const newSkill: Skill = {
      "id": 134,
      "nameSkill": "AngularJs",
      "typeSkill": "DevFront",
      "idProfile": 20,
      "user": "luischi",
      "state": "ACTIVO"
    }

    httpServiceMock.post.mockReturnValueOnce([newSkill]);

    from(skillsService.addSkill(newSkill))
      .subscribe((skill) => {

        // expected value
        expect(skill).toEqual(newSkill)

        // expected typeSkill
        expect(skill.typeSkill).toEqual(newSkill.typeSkill)

        done()
      })

    expect(httpServiceMock.post).toHaveBeenCalled();

  })


});
