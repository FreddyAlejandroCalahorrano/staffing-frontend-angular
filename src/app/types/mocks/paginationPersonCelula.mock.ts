import {PaginationPersonCelula} from "@interfaces/paginationPersonCelula";
import {generateManyPersonCelula} from "@interfaces/mocks/personCelula.mock";
import {faker} from "@faker-js/faker";

export const generatePaginationPersonCelula = (paginationPersonCelula?: Partial<PaginationPersonCelula>): PaginationPersonCelula => {

  const totalPages = paginationPersonCelula?.totalPages || faker.datatype.number({min: 1, max: 10})
  const totalElements = paginationPersonCelula?.totalElements || faker.datatype.number({min: 10, max: 100})

  return {
    personCelulaToList: generateManyPersonCelula(totalElements / totalPages, {state: 'ACTIVO'}),
    totalPages: totalPages,
    totalElements: totalElements
  }
}

export const generateManyPaginationPersonCelula = (size: number = 10, params?: any): PaginationPersonCelula[] => {
  return [
    ...Array.from({length: size},
      (x, i) => generatePaginationPersonCelula(params)
    )
  ]
}
