import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {FormControl} from "@angular/forms";
import {debounceTime, first, map, skip, switchMap, takeUntil, tap} from "rxjs/operators";
import {BehaviorSubject, fromEvent, Observable, of, Subject, Subscription} from "rxjs";
import {ContextMenuModel, DtColumnInterface} from "./interfaces/table.interface";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit, OnDestroy, OnChanges {

  @Input() headers: DtColumnInterface[]
  @Input() rows: any[]
  @Input() actions: ContextMenuModel[]
  @Input() keyExpr: string
  @Input() allActions: boolean = false

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onEditingStart: EventEmitter<any> = new EventEmitter<any>()
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onDeleteStart: EventEmitter<any> = new EventEmitter<any>()

  searchControl: FormControl
  obsItems$: Observable<{ items: any[], current: number }>
  operation$: BehaviorSubject<string> = new BehaviorSubject<string>('')
  destroy$: Subject<boolean> = new Subject<boolean>()

  optionSize: number[] = [5, 10, 15, 25, 50, 75]
  pageSizeSelect: number = 5
  pagination: any = {
    start: 0,
    end: 5
  }

  filterColumns: any

  sub: Subscription;

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.unsubscribe()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('rows' in changes && !changes.rows.firstChange) {
      this.operation$.next(this.searchControl.value)
      this.cdr.detectChanges()
    }
  }

  ngOnInit(): void {
    this.initSearchPanel()

    this.obsItems$ = this.operation$
      .pipe(
        debounceTime(500),
        map(value => this.filterArray(value, [...this.rows])),
        switchMap(items => of({items, current: 1})),
        tap(({items}) => {
          if (items.length <= this.pageSizeSelect)
            this.resetPagination()
        }),
        takeUntil(this.destroy$)
      )
  }

  initSearchPanel() {
    this.searchControl = new FormControl([''])
    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        takeUntil(this.destroy$)
      )
      .subscribe(text =>
        this.operation$.next(text.toUpperCase())
      )

    this.filterColumns = this.headers?.filter(item => item.search)
      .map(item => item.dataField)
  }

  filterArray(search: string, rows: any[]) {
    if (search && rows.length > 0) {

      return filterFn(rows,
        this.filterColumns,
        search)
    }
    return rows || []
  }

  setRange(evt: any) {
    this.pagination = {
      ...evt
    }
    this.cdr.detectChanges()
  }

  resetPagination() {
    this.setRange({
      start: 0,
      end: this.pageSizeSelect
    })
  }

  //#region ContextMenu

  isDisplayContextMenu: boolean
  rightClickMenuItems: ContextMenuModel[] = []
  rightClickMenuPositionX: number;
  rightClickMenuPositionY: number;

  get rightClickMenuStyle() {
    return {
      position: 'fixed',
      left: `${this.rightClickMenuPositionX}px`,
      top: `${this.rightClickMenuPositionY}px`
    }
  }

  displayContextMenu(event: any, rowData: any) {
    const {clientX, clientY} = event

    this.sub = fromEvent<MouseEvent>(document, 'click')
      .pipe(
        skip(1),
        first(),
      ).subscribe({
        complete: () => this.closeContextMenu()
      })

    setTimeout(() => {
      this.isDisplayContextMenu = true
      this.cdr.detectChanges()
    }, 50);

    this.rightClickMenuItems = [
      {
        menuText: 'Editar',
        menuEvent: 'EDIT',
        icon: 'edit',
        handler: () =>
          this.onEditingStart.emit({
              action: 'EDIT',
              rowData,
              keyExpr: rowData[this.keyExpr] || rowData
            }
          )
      },
      {
        menuText: 'Eliminar',
        menuEvent: 'DELETE',
        icon: 'delete',
        handler: () => {
          this.onDeleteStart.emit({
              action: 'DELETE',
              rowData,
              keyExpr: rowData[this.keyExpr] || rowData
            }
          )
          this.resetPagination()
        }
      },
    ];

    this.rightClickMenuPositionX = (clientX - 120);
    this.rightClickMenuPositionY = clientY;

  }

  closeContextMenu() {
    this.sub && this.sub.unsubscribe()
    this.isDisplayContextMenu = false
    this.cdr.detectChanges()
  }

  handleMenuItemClick(event: any) {
    this.closeContextMenu()
    const {handler} = event.data as ContextMenuModel
    handler();
  }

  //#endregion

  trackById(index: number, item: any) {
    return item[this.keyExpr]
  }

}

/**
 * Filter Rows v1
 * @param items Elements Array
 * @param filterKeys Datafield Array
 * @param search Term Search
 */
const filterFn = (items: any[], filterKeys: string[], search: string) => {
  return items.filter(item =>
    filterKeys.reduce((acc, keyName) =>
        acc || (item[keyName] && item[keyName].toUpperCase().includes(search))
      , false)
  )
};
