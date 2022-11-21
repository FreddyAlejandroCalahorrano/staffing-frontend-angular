import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PSelectComponent} from './p-select.component';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {FormsModule} from '@angular/forms';
import {UtilitaryService} from '@services/utilitary.service';
import {HttpModule} from '@pichincha/angular-sdk/http';
import {ScrollingModule} from "@angular/cdk/scrolling";

xdescribe('PSelectComponent', () => {
  let component: PSelectComponent;
  let fixture: ComponentFixture<PSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PSelectComponent],
      imports: [
        HttpModule.forRoot({}),
        ScrollingModule,
      ],
      providers: [FormsModule, UtilitaryService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
