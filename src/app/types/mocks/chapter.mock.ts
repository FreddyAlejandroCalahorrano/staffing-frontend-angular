import {faker} from "@faker-js/faker";
import {Chapter} from "@interfaces/chapter";

export const generateChapter = (): Chapter => {
  return {
    id: faker.datatype.number(),
    chapterName: faker.helpers.arrayElement(['Backend', 'Frontend', 'QA'])
  }
}

export const generateManyChapter = (size: number = 10): Chapter[] => {
  return [
    ...Array.from({length: size},
      (x, i) => generateChapter()
    )
  ]
}
