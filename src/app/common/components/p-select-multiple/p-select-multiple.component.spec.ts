import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PSelectMultipleComponent} from './p-select-multiple.component';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {ScrollingModule} from "@angular/cdk/scrolling";


xdescribe('PSelectMultipleComponent', () => {
  let component: PSelectMultipleComponent;
  let fixture: ComponentFixture<PSelectMultipleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrollingModule],
      declarations: [PSelectMultipleComponent],
      providers: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PSelectMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
