import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MessageBarComponent} from './message-bar.component';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('MessageBarComponent', () => {
  let component: MessageBarComponent;
  let fixture: ComponentFixture<MessageBarComponent>;
  window.scroll = jest.fn()

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MessageBarComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    jest.spyOn(window,'scroll')

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(window.scrollY).toBe(0)
  });
});
