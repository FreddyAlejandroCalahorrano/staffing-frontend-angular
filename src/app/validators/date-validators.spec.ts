import {FormControl} from "@angular/forms";
import {DateValidators} from "./date-validators";

describe('Validators', () => {

  it('debe ser una fecha invalida [2022-02-30]', () => {
    const control = new FormControl('2022-02-30');
    expect(DateValidators.dateValid(control)).not.toBeNull()
  })

  it('debe ser una fecha valida [2022-06-15]', () => {
    const control = new FormControl('2022-06-15');
    expect(DateValidators.dateValid(control)).toBeNull()
  })
})
