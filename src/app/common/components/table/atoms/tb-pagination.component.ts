import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from "@angular/core";
import {PaginationEvt} from "@dt-table/interfaces/table.interface";

const MINIMAL_PAGE_ITEM_COUNT = 7;

@Component({
  selector: 'app-tb-pagination',
  template: `
    <div class="table-footer" [ngStyle]="{'justify-content': !showResults? 'end':''}">
      <div class="table-footer-results" *ngIf="showResults">
        {{total}} Resultados
      </div>
      <div class="table-footer-controls">
        <button type="button"
                *ngFor="let btn of pagesMap"
                [ngClass]="{'table-footer-controls-button-active': current === btn}"
                (click)="clickItem(btn)"
                [attr.disabled]="isString(btn)? 'disabled' : null"
                class="table-footer-controls-button">
          {{btn}}
        </button>
        <pichincha-select placeholder="5"
                          [items]="optionSizeMap"
                          size="extra-small"
                          (clickedItem)="handleSelectedItem($event)"
        ></pichincha-select>
      </div>
    </div>
  `,
  styles: [
    `
      .table-footer {
        padding-top: 14px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;

        &-results {
          color: #2c2c30;
          font-family: 'prelo-medium', serif;
          font-size: 0.875rem;
          line-height: 1.25rem;
        }
      }

      .table-footer-controls {
        display: flex;
        gap: 0.5rem;
        justify-content: space-between;

        &-button {
          width: 2rem;
          height: 2.3rem;
          padding: 0.375rem 0.25rem;
          background: #ffffff;
          border: 1px solid #dbdbdc;
          box-sizing: border-box;
          border-radius: 0.25rem;
          cursor: pointer;
          color: #2c2c30;
          font-family: prelo-medium;
        }

        &-button:hover {
          filter: opacity(0.8);
        }

        &-button-active {
          border: 1px solid #2f7abf;
          background-color: #f4f6f9;
        }

        &-button:disabled {
          color: #a39e9e;
          background: var(--darkGrey100);
          cursor: not-allowed;
        }

        &-button:disabled:hover {
          filter: none;
        }

        &-dropdown {
          color: #2c2c30;
          border: 1px solid #6e6e73;
          border-radius: 0.25rem;
          font-family: prelo-medium;
          padding: 0.375rem 0.5rem 0.375rem 1rem;
          display: flex;
        }

        &-dropdown-options {
          border: 1px solid #6e6e73;
          position: absolute;
          width: 100%;
          top: 32px;
          background-color: white;
          border-radius: 4px;

          &-center {
            text-align: center;
            font-family: prelo-medium;
            line-height: 1.25rem;
            color: #2c2c30;
          }

          &-center:hover {
            background-color: #dee3ed;
          }
        }

        &-dropdown-container {
          position: relative;
          display: flex;
          flex-direction: column;
        }

        &-dropdown-text {
          width: 1.5rem;
          height: 1rem;
          margin-right: 0.5rem;
          line-height: 1.25rem;
        }

        &-dropdown-icon {
          font-family: 'Material Icons', Helvetica, Arial, Sans, Sans-serif;
          font-size: 1.125rem;
          cursor: pointer;
        }

        &-dropdown-icon:hover {
          background-color: #f4f6f9;
          border-radius: 50%;
        }
      }
    `
  ],
})
export class TbPaginationComponent implements AfterViewInit, OnChanges {

  @Input() current: number
  @Input() size: number
  @Input() optionSize: number[]
  @Input() total: number
  @Input() showResults: boolean = true


  @Output() evtRange: EventEmitter<PaginationEvt> = new EventEmitter<PaginationEvt>()
  pages: (string | number)[]

  constructor(private cdf: ChangeDetectorRef) {
  }

  ngAfterViewInit() {
    this.cdf.detectChanges()
  }

  ngOnChanges(changes: SimpleChanges) {
    const {total} = changes
    this.clickItem(1, total.firstChange)
    this.cdf.detectChanges()
  }

  get optionSizeMap() {
    return this.optionSize.map((num) =>
      ({label: num, value: num, selected: num == this.size})
    )
  }

  get pagesMap() {
    return this.pages.map(item => (item == '...' ? item : +item + 1));
  }

  isString(btn: string | number) {
    return typeof btn === 'string'
  }

  handleSelectedItem = (evt: any) => {
    const {value} = evt.detail
    this.size = value
    this.clickItem(1, false)
  }

  clickItem(page: number | string, init: boolean = false) {
    this.current = +page
    const pageTotal = Math.ceil(this.total / this.size)
    this.pages = [
      ...this.generatePageItems(pageTotal, this.current - 1, 7)
    ]
    if (!init)
      this.evtRange.emit({
        start: ((+page - 1) * this.size),
        end: ((+page - 1) * this.size) + this.size,
        currentPage: +page,
        sizePage: this.size
      })
    this.cdf.detectChanges()
  }

  generatePageItems(total: number, current: number, width: number) {
    if (width < MINIMAL_PAGE_ITEM_COUNT) {
      throw new Error(`Must allow at least ${MINIMAL_PAGE_ITEM_COUNT} page items`);
    }
    if (width % 2 === 0) {
      throw new Error(`Must allow odd number of page items`);
    }
    if (total < width) {
      return [...new Array(total).keys()];
    }
    const left = Math.max(0, Math.min(total - width, current - Math.floor(width / 2)));
    const items: (string | number)[] = new Array(width);
    for (let i = 0; i < width; i += 1) {
      items[i] = i + left;
    }
    // replace non-ending items with placeholders
    if (items[0] > 0) {
      items[0] = 0;
      items[1] = '...' //'prev-more';
    }
    if (items[items.length - 1] < total - 1) {
      items[items.length - 1] = total - 1;
      items[items.length - 2] = '...' //'next-more';
    }
    return items
  }

}
