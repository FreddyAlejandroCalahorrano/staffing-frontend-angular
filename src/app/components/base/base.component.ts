import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnChanges,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {Router} from '@angular/router';
import {DialogService} from "@modal/dialog.service";
import {MessageBarService} from "@services/message-bar.service";
import {Observable} from "rxjs";
import {MessageBar} from "../../types/messageBar";
import {UtilitaryService} from "@services/utilitary.service";

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class BaseComponent implements OnInit, OnChanges {

  isClosed: boolean = false
  maxWidthToCloseSidebar: number = 650
  isDark: boolean = true
  isIframe = false
  activeRoute: string

  notify$: Observable<MessageBar>

  constructor(private router: Router,
              private elementRef: ElementRef,
              private cdf: ChangeDetectorRef,
              private messageBarService: MessageBarService,
              private dialogService: DialogService,
              private utilitaryService: UtilitaryService,) {
  }

  ngOnInit(): void {
    this.isIframe = window !== window.parent && !window.opener;
    this.dialogService.setContainer(this.elementRef.nativeElement.shadowRoot)
    this.utilitaryService.setContainer(this.elementRef.nativeElement.shadowRoot)
    this.activeRoute = this.router.url

    this.notify$ = this.messageBarService.notify
  }

  get closeSidebar() {
    return this.isClosed
  }

  ngOnChanges() {
    this.cdf.detectChanges()
  }

  verifyIfWelcome() {
    return this.router.url.includes('welcome');
  }

  onClickToggle(isClosed: boolean) {
    this.isClosed = isClosed
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isClosed = window.innerWidth <= this.maxWidthToCloseSidebar;
  }

}
