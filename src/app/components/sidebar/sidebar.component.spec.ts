import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SidebarComponent} from './sidebar.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from '@services/login.service';
import {RouterTestingModule} from "@angular/router/testing";
import {DialogService} from "@modal/dialog.service";
import {of} from "rxjs";

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let compiled: HTMLElement;
  let router: Router;

  let mockLoginService = {
    hasRole: jest.fn().mockImplementation(() => []),
    logout: jest.fn(),
  }
  let mockDialogService = {
    addDialog: jest.fn()
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([])
      ],
      declarations: [SidebarComponent],
      providers: [
        {provide: LoginService, useValue: mockLoginService},
        {provide: DialogService, useValue: mockDialogService},
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
    router = TestBed.get(Router);
    router.initialNavigation();
    jest.clearAllMocks()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should show an image', () => {
    const imageExpect = {
      name: 'Banco-Pichincha',
      photoUrl: '/assets/images/Banco-Pichincha.png',
    };
    const image = compiled.querySelector('img')
    expect(image.src).toContain(imageExpect.photoUrl)
  });

  it('should show an text "Staffing"', () => {
    const expectText = "Staffing ";
    const text = compiled.querySelector(".name").textContent
    expect(text).toEqual(expectText)
  });

  it('should show an text "Banco Pichincha"', () => {
    const expectText = "Banco Pichincha";
    const text = compiled.querySelector(".profession").textContent
    expect(text).toEqual(expectText)
  });

  it('should show an icon "arrow right"', () => {
    const expectText = " keyboard_arrow_right ";
    const text = compiled.querySelector(".toggle").textContent
    expect(text).toEqual(expectText)
  });

  it('should change the state of the sidebar', () => {
    component.closeSidebar = false
    const toggleButton : any = compiled.querySelector(".toggle");
    toggleButton.click()
    expect(component.closeSidebar).toEqual(true)
  });

  it('should output the state of the sidebar', () => {
    jest.spyOn(component.toggleEventEmitter, 'emit')
    component.closeSidebar = false
    const toggleButton : any = compiled.querySelector(".toggle");
    toggleButton.click()
    expect(component.toggleEventEmitter.emit).toBeCalled()

  });

  it('should display a menu item', () => {
    component.sidebarItems = [{
      code: "p",
      value: 'Personas',
      link: "/personas",
      icon: "person_outline",
      isActive: false,
      role: ['Admin']
    }];
    fixture.detectChanges()
    const menu = compiled.querySelector(".menu-links").textContent;
    expect(menu).toContain("person_outline Personas")
  });

  it('should contain the text of the "Cerrar Sesión" button', () => {
    const expectText = " exit_to_app Cerrar Sesión";
    const text = compiled.querySelector("#exitButton").textContent
    expect(text).toEqual(expectText)
  });

  it('should change the state that controls the dark mode', () => {
    component.isDarkMode = true
    const darkModeSwitch : any = compiled.querySelector(".mode");
    darkModeSwitch.click()
    expect(component.closeSidebar).toEqual(false)
  })

  it('should called logout when confirm logout modal', () => {
    const spyAddDialog = jest.spyOn(mockDialogService, 'addDialog')
      .mockImplementation(() => of(true))
    const spyLogout = jest.spyOn(mockLoginService, 'logout')

    component.logout()

    expect(
      spyAddDialog
    ).toBeCalled()

    expect(
      spyLogout
    ).toBeCalled()
  })
  it('should not called logout when not confirm logout modal', () => {
    const spyAddDialog = jest.spyOn(mockDialogService, 'addDialog')
      .mockImplementation(() => of(false))

    const spyLogout = jest.spyOn(mockLoginService, 'logout')

    component.logout()
    expect(
      spyAddDialog
    ).toBeCalled()

    expect(
      spyLogout
    ).not.toBeCalled()
  })


});
