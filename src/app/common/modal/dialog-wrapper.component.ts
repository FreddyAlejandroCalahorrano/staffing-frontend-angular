import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  ElementRef,
  Input,
  ReflectiveInjector,
  Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {DialogComponent} from "./dialog.component";
import {DialogService} from "./dialog.service";

const sizeModal = {
  'lg': 'modal-lg',
  'sm': 'modal-sm',
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'dialog-wrapper',
  template: `
    <div #container class="basic modal fade" style="display:block !important;" role="dialog">

      <div class="modal-dialog modal-dialog-centered {{dialogClass}} {{ sizeOption }}"
           role="document">
        <div class="modal-content">
          <template #element></template>
        </div>
      </div>

    </div>
  `,
  styleUrls: ['./dialog-wrapper.component.scss']
})
export class DialogWrapperComponent implements AfterViewInit {

  /**
   * Set Focus any first input
   */
  ngAfterViewInit() {
    const nativeElement = this.host.nativeElement
    const modalContent = nativeElement.querySelector('.modal-content')
    modalContent.querySelector('input')?.focus()
  }

  /**
   * Target element to insert dialog content component
   */
  @ViewChild('element', {static: true, read: ViewContainerRef}) public element: ViewContainerRef;

  /**
   * Link container DOM element
   */
  @ViewChild('container', {static: true}) public container: ElementRef;

  @Input() dialogClass: string
  @Input() size: 'sm' | 'lg'

  /**
   * Dialog content componet
   * @type {DialogComponent}
   */
  private content: DialogComponent<any, any>;

  /**
   * Constructor
   * @param {ComponentFactoryResolver} resolver
   * @param {DialogService} dialogService
   * @param host ElementRef
   */
  constructor(private resolver: ComponentFactoryResolver,
              private dialogService: DialogService,
              private host: ElementRef<HTMLElement>) {
  }

  /**
   * Adds content dialog component to wrapper
   * @param {Type<DialogComponent>} component
   * @return {DialogComponent}
   */
  addComponent<T, T1>(component: Type<DialogComponent<T, T1>>) {
    let factory = this.resolver.resolveComponentFactory(component);
    let injector = ReflectiveInjector.fromResolvedProviders([], this.element.injector);
    let componentRef = factory.create(injector);
    this.element.insert(componentRef.hostView);
    this.content = <DialogComponent<T, T1>>componentRef.instance;
    this.content.wrapper = this;
    return this.content;
  }

  /**
   * Registers event handler to close dialog by click on backdrop
   */
  closeByClickOutside() {
    const containerEl = this.container.nativeElement;
    containerEl.querySelector('.modal-content').addEventListener('click', (event: any) => {
      event.stopPropagation();
    });
    containerEl.addEventListener('click', () => {
      this.dialogService.removeDialog(this.content);
    }, false);
  }

  get sizeOption() {
    return sizeModal[this.size]
  }
}


