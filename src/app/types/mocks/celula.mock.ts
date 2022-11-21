import {faker} from '@faker-js/faker';
import {Celula} from "@interfaces/celula";

export const generateCelula = (celula?: Partial<Celula>): Celula => {
  return {
    id: faker.datatype.number(),
    celulaCreationDate: faker.date.birthdate().toString(),
    celulaFinishDate: faker.date.birthdate().toString(),
    celulaNameSquad: faker.commerce.product(),
    celulaNameProduct: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    idTribu: faker.datatype.number(),
    tribuName: faker.commerce.productName(),
    user: celula?.user || 'mock',
    state: celula?.state || faker.helpers.arrayElement(['ACTIVO', 'INACTIVO'])
  }
}

export const generateManyCelula = (size: number = 10, params?: any): Celula[] => {
  return [
    ...Array.from({length: size},
      (x, i) => generateCelula(params)
    )
  ]
}
