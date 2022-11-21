import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AsignacionesCardComponent} from './asignaciones-card.component';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('AsignacionesCardComponent', () => {
  let component: AsignacionesCardComponent;
  let fixture: ComponentFixture<AsignacionesCardComponent>;
  let compiled: HTMLElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AsignacionesCardComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignacionesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement
  });

  it('Should create AsignacionesCardComponent', () => {
    expect(component).toBeTruthy();
  });

  /*it('Debe hacer match con el snapshot', () => {
    expect(compiled).toMatchSnapshot();
  });*/

  it('El título debe ser vacío', () => {
    const cardTitle = compiled.querySelector('#title').textContent
    expect(cardTitle.trim()).toEqual("");
  });

  it('El texto debe ser vacío', () => {
    const cardText = compiled.querySelector('#text').textContent
    expect(cardText.trim()).toEqual("");
  });

  it('El título no debe ser vacío si hay title', () => {
    const title: string = "Test title"
    component.title = title
    fixture.detectChanges()
    const cardTitle = compiled.querySelector('#title').textContent
    expect(cardTitle.trim()).toEqual(title);
  });

  it('El texto no debe ser vacío si hay text', () => {
    const text: string = "Test text"
    component.text = text
    fixture.detectChanges()
    const cardText = compiled.querySelector('#text').textContent
    expect(cardText.trim()).toEqual(text);
  });

  it('El ícono no debe ser vacío si hay icon', () => {
    const icon: string = "graphic_eq"
    component.icon = icon
    fixture.detectChanges()
    const cardIcon = compiled.querySelector('#icon').textContent
    expect(cardIcon.trim()).toEqual(icon);
  });


});
