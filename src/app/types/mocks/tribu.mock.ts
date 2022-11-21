import {faker} from '@faker-js/faker';
import {Tribu} from "@interfaces/tribu";

export const generateTribu = (tribu?: Partial<Tribu>): Tribu => {
  return {
    id: faker.datatype.number(),
    tribuName: faker.commerce.productName(),
    tribuCreationDate: faker.date.birthdate().toString(),
    user: tribu?.user || 'mock',
    state: tribu?.state || faker.helpers.arrayElement(['ACTIVO', 'INACTIVO'])
  }
}


export const generateManyTribu = (size: number = 10, params?: any): Tribu[] => {
  return [
    ...Array.from({length: size},
      (x, i) => generateTribu(params)
    )
  ]
}
