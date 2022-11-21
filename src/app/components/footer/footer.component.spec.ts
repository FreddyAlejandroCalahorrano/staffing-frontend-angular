import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let compiled: HTMLElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterComponent ],      
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the current year', () => {
    let date : Date = new Date
    expect(component.now.getFullYear()).toEqual(date.getFullYear())
  });

  it('should get the expected text', () => {
    let date : Date = new Date
    const expectFooter: string = (" © "+ date.getFullYear() + " " + "Banco Pichincha. Todos los derechos reservados ");
    fixture.detectChanges();
    const footer = compiled.querySelector('#dataFooter').textContent
    expect(expectFooter).toEqual(footer)
  })
});
