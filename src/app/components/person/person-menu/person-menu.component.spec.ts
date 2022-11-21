import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PersonMenuComponent } from './person-menu.component';
import {ActivatedRoute} from "@angular/router";

describe('MenuPersonComponent', () => {
  let component: PersonMenuComponent;
  let fixture: ComponentFixture<PersonMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        RouterTestingModule
      ],
      declarations: [ PersonMenuComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                        "breadcrumb": "Editar",
                        "person": {
                          "id": 19,
                          "ultimatix": null,
                          "name": "ALBERTO",
                          "lastName": "ALBERTO",
                          "email": "albeto@gmail.com",
                          "bornDay": null,
                          "bornMonth": 2,
                          "bankEntryDate": "2022-05-11",
                          "phoneNumber": "0983412571",
                          "codeCountry": "AND",
                          "role": "Staff",
                          "user": "luischi",
                          "state": "ACTIVO",
                          "idProvider": 2,
                          "idSeniority": 2,
                          "idChapter": 2,
                          "idProfile": 4,
                          "profileName": "Devops",
                          "chapterName": "Chapter Backend"
                        }
              }
            }
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return the value sent to the function', () => {
    component.onClickElementTab('H')
    expect(component.currentTabId).toEqual('H')
  });

});
