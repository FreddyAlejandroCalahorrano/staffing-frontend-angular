import {Component, ElementRef, EventEmitter, Input, Output, ViewChild,} from '@angular/core';
import {LoginService} from "@services/login.service";
import {Rol} from "../../core/enums/rol.enum";
import {DialogService} from "@modal/dialog.service";
import {ConfirmModalComponent} from "../../common/components/confirm-modal/confirm-modal.component";

export interface Sidebar {
  code: string,
  value: string,
  link: string,
  icon: string,
  isActive: boolean,
  role?: string[]
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: [
    './sidebar.component.scss',
  ],
})
export class SidebarComponent {
  sidebarItems: Sidebar[] = [
    {
      code: "p",
      value: 'Personas',
      link: "/personas",
      icon: "person_outline",
      isActive: false,
      role: ['Admin']
    },
    {
      code: "c",
      value: 'Catálogo',
      link: "/catalogos",
      icon: "panorama_horizontal",
      isActive: false,
      role: ['Admin']
    },
    {
      code: "a",
      value: 'Asignaciones',
      link: "/asignaciones",
      icon: "bubble_chart",
      isActive: false,
      role: ['Admin']
    },
    {
      code: "rp",
      value: 'Reporte Personas',
      link: "/person-report",
      icon: "content_paste",
      isActive: false,
      role: ['Admin', 'User']
    },
  ];

  @Input() closeSidebar: boolean = false
  @Input() isDarkMode: boolean = true

  @Output() toggleEventEmitter: EventEmitter<boolean> = new EventEmitter<boolean>()

  constructor(private loginService: LoginService,
              private dialogService: DialogService) {
  }

  onClickToggleSwitch() {
    this.isDarkMode = !this.isDarkMode
  }

  onClickToggle() {
    this.closeSidebar = !this.closeSidebar
    this.toggleEventEmitter.emit(this.closeSidebar)

  }

  get sidebarItemsFilter() {
    return this.sidebarItems
      .filter(({role}) =>
        role.some(
          // rol => this.loginService.hasRole(ROLE[rol])
          rol => this.loginService.hasRole((Rol as any)[rol])
        )
      )
  }

  logout() {
    this.dialogService.addDialog(
      ConfirmModalComponent,
      {title: `¿Esta seguro que desea cerrar la sesión?`},
    ).subscribe(
      (result: boolean) => {
        if (!result) return

        this.loginService.logout();
      }
    )
  }

  @ViewChild('inputSearch') inputSearch: ElementRef

  onClickInputSearch() {
    this.closeSidebar = !this.closeSidebar
    this.toggleEventEmitter.emit(this.closeSidebar)
    if (!this.closeSidebar) {
      setTimeout(() => {
        this.inputSearch.nativeElement.focus()
      }, 300)
    }
  }

}
