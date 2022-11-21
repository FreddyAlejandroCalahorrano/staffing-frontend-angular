import {faker} from '@faker-js/faker';
import {PersonCelula} from "@interfaces/personCelula";
import {generateCelula} from "@interfaces/mocks/celula.mock";
import {generatePerson} from "@interfaces/mocks/person.mock";

export const generatePersonCelula = (personCelula?: Partial<PersonCelula>): PersonCelula => {
  return {
    id: faker.datatype.number(),
    assignmentStartDate: faker.date.birthdate().toString(),
    assignmentEndDate: faker.date.birthdate().toString(),
    tentativeAssignmentEndDate: faker.date.birthdate().toString(),
    allocationPercentage: faker.datatype.number({max: 100, min: 1}),
    personTo: generatePerson({state: 'ACTIVO'}),
    celulaTo: generateCelula({state: 'ACTIVO'}),
    observation: faker.commerce.productDescription(),
    user: personCelula?.user || 'mock',
    state: personCelula?.state || faker.helpers.arrayElement(['ACTIVO', 'INACTIVO'])
  }
}

export const generateManyPersonCelula = (size: number = 10, params?: any): PersonCelula[] => {
  return [
    ...Array.from({length: size},
      (x, i) => generatePersonCelula(params)
    )
  ]
}
