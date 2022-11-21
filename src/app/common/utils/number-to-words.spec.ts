import {numberToWords} from "./numberToWords";

describe('number to words', () => {
  it('should send value numberToWords(520) return "quinientos veinte" ', () => {
    expect(numberToWords(520)).toBe('quinientos veinte')
  })

  it('should send value numberToWords(154) return "ciento cincuenta y cuatro" ', () => {
    expect(
      numberToWords(154)
    ).toBe('ciento cincuenta y cuatro')
  })

  it('should send value numberToWords(154) return "ciento cincuenta y cuatro" ', () => {
    expect(
      numberToWords(154)
    ).toBe('ciento cincuenta y cuatro')
  })

  it('should send value numberToWords(4520) return "cuatro mil quinientos veinte" ', () => {
    expect(
      numberToWords(4520)
    ).toBe('cuatro mil quinientos veinte')
  })

  it('should send value numberToWords(625120) return "cuatro mil quinientos veinte" ', () => {
    expect(
      numberToWords(625120)
    ).toBe('seiscientos veinticinco mil ciento veinte')
  })

  it('should send value numberToWords(0) return "cero" ', () => {
    expect(
      numberToWords(0)
    ).toBe('cero')
  })

  it('should return error send numberToWords(999999999 + 1)', () => {
    expect(
      numberToWords(999999999 + 1)
    ).toBe('N\u00famero fuera de rango')
  })
})
