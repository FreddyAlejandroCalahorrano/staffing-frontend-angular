import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogsCardsComponent } from './catalogs-cards.component';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('CatalogsCardsComponent', () => {
  let component: CatalogsCardsComponent;
  let fixture: ComponentFixture<CatalogsCardsComponent>;
  let compiled: HTMLElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogsCardsComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogsCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('the title should be empty', () => {
    const cardText = compiled.querySelector('#text').textContent
    expect(cardText.trim()).toEqual("");
  });

  it('the title should not be empty', () => {
    const title: string = "Test title"
    component.title = title
    fixture.detectChanges()
    const cardTitle = compiled.querySelector('#title').textContent
    expect(cardTitle.trim()).toEqual(title);
  });

  it('body text should be empty', () => {
    const cardText = compiled.querySelector('#text').textContent
    expect(cardText.trim()).toEqual("");
  });

  it('body text should not be empty', () => {
    const text: string = "Test text"
    component.text = text
    fixture.detectChanges()
    const cardText = compiled.querySelector('#text').textContent
    expect(cardText.trim()).toEqual(text);
  });

  it('there should be an icon', () => {
    const icon: string = "graphic_eq"
    component.icon = icon
    fixture.detectChanges()
    const cardIcon = compiled.querySelector('#icon').textContent
    expect(cardIcon.trim()).toEqual(icon);
  })
});
