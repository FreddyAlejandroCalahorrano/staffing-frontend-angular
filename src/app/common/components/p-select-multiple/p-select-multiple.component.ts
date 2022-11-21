import {Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import {SelectionModel} from "@angular/cdk/collections";
import {fromEvent, Subscription} from "rxjs";
import {filter, first, map} from "rxjs/operators";

@Component({
  selector: 'app-p-select-multiple',
  templateUrl: './p-select-multiple.component.html',
  styleUrls: ['./p-select-multiple.component.scss'],
})
export class PSelectMultipleComponent implements OnChanges {

  selection = new SelectionModel(true);
  /**
   * Link container DOM element
   */
  @ViewChild('container', {static: true}) public container: ElementRef;

  @Input() open: boolean = false
  @Input() size: string = STATESIZE.SMALL
  @Input() state: string = STATEPROP.NORMAL
  @Input() label: string
  @Input() tooltip: string
  @Input() errorHelper: string
  @Input() items: any[]
  @Input() itemSelected: any
  @Input() placeholder: string = 'Seleccione una opción ...'

  @Input() valueExpr: string = 'value'
  @Input() displayExpr: string = 'label'
  @Output() changeSelect: EventEmitter<any> = new EventEmitter<any>()

  selectItems: any[] = []
  subsClickOutside: Subscription

  _visibleOptions: number = 6

  messageMapping:
    { [k: string]: string } =
    {'=0': 'Ninguno seleccionado', '=1': 'Un seleccionado', 'other': '# seleccionados'};

  constructor(private host: ElementRef<HTMLElement>) {
  }

  ngOnChanges(changes: SimpleChanges) {
    const {
      items
    } = changes
    if (items && !items.firstChange) {
      this.selection.clear()
      this.selectItems = []
    }
  }

  get visibleOptions() {
    return this.items?.length > this._visibleOptions ?
      this._visibleOptions
      : (this.items?.length || this._visibleOptions)
  }

  get isOpen() {
    return this.open
  }

  handleClick(item: any, evt: any) {
    const {checked} = evt.target

    if (checked)
      this.selection.select(item);
    else
      this.selection.deselect(item);

    this.setSelects()
  }

  openContainer(evt: any) {
    // const inputContain = this.host.nativeElement
    //   .querySelector('.bp-select__input-child')
    //   .contains(evt.target)
    //
    this.open = !this.open

    setTimeout(() => this.handleClickOutside())

    this.selection.select(...this.selectItems)
  }

  setSelects() {
    this.selectItems = [...this.selection.selected]
    // this.selection.clear()
    // this.open = false
    this.changeSelect.emit(
      [
        ...this.selectItems
      ]
    )
  }

  private handleClickOutside() {

    this.subsClickOutside && this.subsClickOutside.unsubscribe()

    if (this.isOpen)
      this.subsClickOutside = fromEvent(document, 'click')
        .pipe(
          map(({path}: any) => path[0]),
          filter((target) => {
            const origin = this.host.nativeElement as HTMLElement;
            return this.isOpen && origin.contains(target as HTMLElement) === false;
          }),
          first(),
        )
        .subscribe(() =>
          this.closeContainer()
        );
  }

  closeContainer() {
    this.subsClickOutside && this.subsClickOutside.unsubscribe()
    // this.isSearcheable && this.renderer.setProperty(this.searchElement.nativeElement, 'value', '')
    // this.items$ = of(this.items)
    setTimeout(() => this.open = false)
  }

}


export enum STATESIZE {
  EXTRA_SMALL = 'extra-small',
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large'
}

export enum STATEPROP {
  NORMAL = 'normal',
  DISABLED = 'disabled',
  FOCUS = 'focus',
  ERROR = 'error'
}
