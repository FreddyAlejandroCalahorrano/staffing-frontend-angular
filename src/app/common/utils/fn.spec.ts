import {getMessageError, pad} from './fn'

describe('fn utils global', () => {
  it('should getMessageError custom', () => {
    const msgError = "Error Custom"
    expect(
      getMessageError(msgError)
    ).toEqual(msgError)
  })

  it('should getMessageError not custom', () => {
    expect(
      getMessageError({})
    ).toEqual('Error del servidor')
  })

  it('should return string with 2 length', () => {
    expect(
      pad(9)
    ).toHaveLength(2)
  })

  it('should contains caracter "p"', () => {
    expect(
      pad(9, 'p')
    ).toContain('p')
  })
})
