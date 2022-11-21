import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormSkillsModalComponent} from './form-skills-modal.component';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BootstrapModalModule} from '@modal/bootstrap-modal.module';
import {SkillsService} from '@services/skills.service';
import {HttpModule} from '@pichincha/angular-sdk/http';
import {CustomCommonModule} from "../../../../common/components/common.module";
import {ProfilesService} from "@services/profiles.service";

describe('FormCelulasModalComponent', () => {
  let component: FormSkillsModalComponent;
  let fixture: ComponentFixture<FormSkillsModalComponent>;
  let mockSkillsService = {
    addSkill: jest.fn(),
    getTypeSkillsSelect: jest.fn()
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpModule.forRoot({}),
        FormsModule,
        ReactiveFormsModule,
        BootstrapModalModule,
        CustomCommonModule,
      ],
      declarations: [FormSkillsModalComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: SkillsService, useValue: mockSkillsService},
        ProfilesService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSkillsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('It should change the state of the "isEdit" variable to true and fill the form', () => {
    component.data={
      "id": 9,
      "nameSkill": "Skill2",
      "idProfile": 1,
    }
    component.editData()
    expect(component.isEdit).toBeTruthy()
    expect(component.nameSkill.value).toEqual('Skill2')
  });

  it('It should call the perform method "addSkill" and return a promise then', () => {
    component.skillsFormGroup.patchValue({
      nameSkill: 'SkillTest',
      idProfile: 1
    })
    const spySkillThen = jest.spyOn(mockSkillsService, 'addSkill')
      .mockImplementation(() => Promise.resolve())
    component.onSubmit()
    expect(spySkillThen).toBeCalled()

  });

  it('It should call the perform method "addSkill" and return a promise catch', () => {
    component.skillsFormGroup.patchValue({
      nameSkill: 'SkillTest',
      idProfile: 1
    })
    const spySkillCatch = jest.spyOn(mockSkillsService, 'addSkill')
      .mockImplementation(() => Promise.reject(null))
    component.onSubmit()
    expect(spySkillCatch).toBeCalled()

  })

});
