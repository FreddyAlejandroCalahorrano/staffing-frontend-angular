import {faker} from '@faker-js/faker';
import {Person} from "@interfaces/person";

export const generatePerson = (person?: Partial<Person>): Person => {
  return {
    id: faker.datatype.number(),
    name: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    phoneNumber: faker.phone.phoneNumber(),
    role: faker.helpers.arrayElement(['Staff', 'Lider']),
    user: person?.user || 'mock',
    state: person?.state || faker.helpers.arrayElement(['ACTIVO', 'INACTIVO']),
    ultimatix: faker.datatype.number(),
    bankEntryDate: faker.date.birthdate().toString(),
    codeCountry: faker.address.countryCode(),
    idProvider: faker.datatype.number(),
    idSeniority: faker.datatype.number(),
    bornDay: faker.datatype.number({max: 31, min: 1}),
    bornMonth: faker.datatype.number({max: 12, min: 1}),
    idProfile: faker.datatype.number(),
    idChapter: faker.datatype.number(),
    profileName: faker.helpers.arrayElement(['Dev Back', 'Dev Front', 'QA', 'Devops']),
    chapterName: faker.helpers.arrayElement(['Backend', 'Frontend', 'QA'])
  }
}

export const generateManyPerson = (size: number = 10, params?: any): Person[] => {
  return [
    ...Array.from({length: size},
      (x, i) => generatePerson(params)
    )
  ]
}
