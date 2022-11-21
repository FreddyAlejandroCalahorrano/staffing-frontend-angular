import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpModule} from '@pichincha/angular-sdk/http';
import {TribuService} from '@services/tribu.service';
import {TribusComponent} from './tribus.component';
import {CustomCommonModule} from '../../../common/components/common.module';
import {MessageBarService} from "@services/message-bar.service";
import {ReactiveFormsModule} from "@angular/forms";
import {DialogService} from "@modal/dialog.service";
import {of} from "rxjs";
import {MessageBar} from '@interfaces/messageBar';

describe('TribusComponent', () => {
  let component: TribusComponent;
  let fixture: ComponentFixture<TribusComponent>;
  let compiled: HTMLElement

  let mockedMessageService = {
    showMessage: jest.fn()
  }
  let mockedDialogService = {
    addDialog: jest.fn()
  }
  let mockedTribuService = {
    updateTribu: jest.fn()
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TribusComponent],
      imports: [
        HttpModule.forRoot({}),
        ReactiveFormsModule,
        CustomCommonModule,
      ],
      providers: [
        {provide: TribuService, useValue: mockedTribuService},
        {provide: MessageBarService, useValue: mockedMessageService},
        {provide: DialogService, useValue: mockedDialogService},
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TribusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error message by default', () => {
    const error = compiled.querySelector('app-error')
    expect(error).toBeTruthy()
  });

  it('should called method "addDialog" when delete register tribu', () => {
    let data = {
      rowData: {
        id: 'NN',
        tribuName: 'NN',
        state: 'NN',
      }
    }
    const spyDialogService = mockedDialogService.addDialog
      .mockImplementation(() => of(true))

    const spyTribuService = mockedTribuService.updateTribu
      .mockImplementation(() => Promise.resolve({}))

    component.onDeleteTable(data)

    expect(
      spyDialogService
    ).toBeCalled()

    expect(
      spyTribuService
    ).toBeCalled()

  })

  it('should called method "addDialog" when edit -o- add tribu', () => {
    const spyDialogService = mockedDialogService.addDialog
      .mockImplementation(() => of<MessageBar>({text: '', status: 'success'}))

    component.onClickEdit()

    expect(
      spyDialogService
    ).toBeCalled()

    expect(
      mockedMessageService.showMessage
    ).toBeCalled()

  })

});
