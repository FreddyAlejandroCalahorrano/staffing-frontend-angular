import {
  Component,
  ElementRef,
  forwardRef,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {debounceTime, distinctUntilChanged, filter, first, map, pluck} from "rxjs/operators";
import {fromEvent, Observable, of, Subscription} from "rxjs";

@Component({
  selector: 'app-p-select',

  templateUrl: './p-select.component.html',
  styleUrls: ['./p-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PSelectComponent),
      multi: true,
    },
  ]
})
export class PSelectComponent implements ControlValueAccessor, OnInit, OnChanges {

  @HostBinding('value') hostValue: any;

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

  @Input() search: boolean = false
  @ViewChild('searchElement', {static: true}) searchElement: ElementRef
  items$: Observable<any[]>
  subs: Subscription
  subsClickOutside: Subscription

  _visibleOptions: number = 4

  constructor(private renderer: Renderer2,
              // private utilitaryService: UtilitaryService,
              private host: ElementRef<HTMLElement>) {
  }

  get visibleOptions() {
    return this.items?.length > this._visibleOptions ?
      this._visibleOptions
      : (this.items?.length || this._visibleOptions)
  }

  ngOnInit(): void {
    this.items$ = of(this.items)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('items' in changes) {
      this.items$ = of(this.items)
      this.refreshItemSelect()
    }
  }

  private onChange = (value: any) => {
  };

  private onTouched = () => {
  };


  writeValue(value: any) {
    this.refreshItemSelect(value)
    this.hostValue = value == null ? '' : value;
  }

  registerOnChange(fn: (value: any) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  get isOpen() {
    return this.open
  }

  get isSearcheable() {
    return this.search
  }

  refreshItemSelect(value?: any) {
    this.itemSelected = this.findItemSelect(value || this.hostValue)
  }

  openContainer() {
    this.onTouched()

    this.open = !this.open

    setTimeout(() => this.handleClickOutside())

    if (this.isSearcheable) {
      setTimeout(() => this.searchElement.nativeElement.focus())

      this.subs = fromEvent(this.searchElement.nativeElement, 'keyup')
        .pipe(
          pluck('target', 'value'),
          debounceTime(500),
          distinctUntilChanged(),
          map<any, string>(search => search.toUpperCase()),
        )
        .subscribe(search =>
            this.items$ = of(this.filterItems([...this.items], search))
          // this.items$ = of(this.items.filter(item => item[this.displayExpr].toUpperCase().includes(search)))
        )
    }
  }

  filterItems = (items: any[], searchTerm: string) =>
    items.filter(item => item[this.displayExpr].toUpperCase().includes(searchTerm))

  closeContainer() {
    this.subsClickOutside && this.subsClickOutside.unsubscribe()
    this.subs && this.subs.unsubscribe()
    this.isSearcheable && this.renderer.setProperty(this.searchElement.nativeElement, 'value', '')
    this.items$ = of(this.items)
    setTimeout(() => this.open = false)
  }

  isActive(item: any) {
    return this.itemSelected && this.itemSelected[this.valueExpr] === item[this.valueExpr]
  }

  handleClick(item: any) {
    this.itemSelected = item
    this.onChange(item[this.valueExpr]);
    this.closeContainer()
  }

  private handleClickOutside() {
    // fromEvent(this.utilitaryService.shadowBase, 'click')
    this.subsClickOutside && this.subsClickOutside.unsubscribe()

    if (this.isOpen)
      this.subsClickOutside = fromEvent(document, 'click')
        .pipe(
          pluck('target'),
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

  findItemSelect = (value: string | number) => {
    if (!this.items)
      return null
    return this.items.find(item => item[this.valueExpr] == value)
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
