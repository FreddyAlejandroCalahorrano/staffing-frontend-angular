import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SkillsComponent} from './skills.component';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {SkillsService} from '@services/skills.service';
import {HttpModule} from '@pichincha/angular-sdk/http';
import {CustomCommonModule} from "../../../common/components/common.module";
import {MessageBarService} from "@services/message-bar.service";
import {DialogService} from "@modal/dialog.service";
import {of} from "rxjs";

describe('SkillsComponent', () => {
  let component: SkillsComponent;
  let fixture: ComponentFixture<SkillsComponent>;
  let mockedSkillsService = {
    updateSkill: jest.fn()
  };

  let mockedMessageService = {
    showMessage: jest.fn()
  };

  let mockedDialogService = {
    addDialog: jest.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpModule.forRoot({}),
        CustomCommonModule,
      ],
      declarations: [SkillsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: SkillsService, useValue: mockedSkillsService },
        {provide: MessageBarService, useValue: mockedMessageService},
        {provide: DialogService, useValue: mockedDialogService},
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should called "showMessage"', () => {
    component.setupMessageBar({text: '', status: 'success'})
    expect(
      mockedMessageService.showMessage
    ).toHaveBeenCalled();
  });

  it('should called "addDialog" when call "onEditRow" ', () => {

    mockedDialogService.addDialog
      .mockImplementation(() => of({text: '', status: 'success'}))

    const spyRefreshNext = jest.spyOn(component.refreshTable$, 'next')

    component.onEditRow()
    expect(
      mockedDialogService.addDialog
    ).toBeCalled()

    expect(
      spyRefreshNext
    ).toBeCalled()
  });

  it('should called method "addDialog" when delete register skill promise then', () => {
    let data = {
      rowData: {
        id: 18,
        nameSkill: "APIGEEE",
        typeSkill: "DevFront",
      }
    }

    const spyDialogService = mockedDialogService.addDialog
      .mockImplementation(() => of(true))

    const spySkillService = mockedSkillsService.updateSkill
      .mockImplementation(() => Promise.resolve())

    component.onDelete(data)

    expect(spyDialogService).toBeCalled()
    expect(spySkillService).toBeCalled()
  });

  it('should called method "addDialog" when delete register skill promise catch', () => {
    let data = {
      rowData: {
        id: 18,
        nameSkill: "APIGEEE",
        typeSkill: "DevFront",
      }
    }

    mockedDialogService.addDialog
      .mockImplementation(() => of(true))

    const spySkillService = mockedSkillsService.updateSkill
      .mockImplementation(() => Promise.reject({response:{data: ""}}))

    component.onDelete(data)

    expect(spySkillService).toBeCalled()
  })
});
