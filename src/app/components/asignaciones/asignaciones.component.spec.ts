import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AsignacionesComponent} from './asignaciones.component';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {AsignacionesCardComponent} from "./asignaciones-card/asignaciones-card.component";

describe('AsignacionesComponent', () => {
  let component: AsignacionesComponent;
  let fixture: ComponentFixture<AsignacionesComponent>;
  let compiled: HTMLElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AsignacionesComponent, AsignacionesCardComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

/*  it('Debe hacer match con el snapshot', () => {
    expect(compiled).toMatchSnapshot();
  });*/

  it('Debe renderizar 2 asignacionesCard', () => {
    const asignacionesCards = compiled.querySelectorAll('app-asignaciones-card')
    expect(asignacionesCards.length).toEqual(2);
  });

  it('No debe renderizar ninguna asignacionesCard', () => {
    component.card = []
    fixture.detectChanges()
    const asignacionesCards = compiled.querySelectorAll('app-asignaciones-card')
    expect(asignacionesCards.length).toEqual(0);
  });

  it('El contenido de la cardAsignaciones no debe ser vacío', () => {
    const cards = [{icon: 'graphic_eq', title: "test title", text: "test ", routerLink: "test"}]
    component.card = cards
    fixture.detectChanges()
    const asignacionesCardTitle = compiled.querySelector('#title').textContent
    expect(asignacionesCardTitle.trim()).toEqual(cards[0].title)

  });

});
