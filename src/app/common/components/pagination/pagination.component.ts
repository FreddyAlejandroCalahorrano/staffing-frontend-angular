import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input() totalElements: number
  @Input() totalPages: number = 20
  @Input() size: number = 10
  @Input() page: number = 1

  @Output() paginationEmitter: EventEmitter<{ currentPage: number, size: number }> = new EventEmitter<{ currentPage: number, size: number }>()


  sizeOptions: { label: string; value: string }[] = [
    {label: '5', value: "5"},
    {label: '10', value: "10"},
    {label: '15', value: "15"},
    {label: '20', value: "20"},
  ]

  private currentPage: number = 1
  selectControl = new FormControl()

  paginationOptions: { next: any; last: any; first: any; previous: any; }

  paginationElements: { value: number, isActive: boolean }[] = []


  constructor() {
  }

  ngOnInit(): void {

    this.selectControl.setValue(this.size)

    this.setupPagination()

    this.selectControl.valueChanges.subscribe((value) => {
      this.onFirstPageClick(false)

      this.paginationEmitter.emit({
        currentPage: this.currentPage,
        size: value as number
      })
    })
  }

  ngOnChanges(simpleChanges: SimpleChanges): void {

    if (simpleChanges.totalPages) {
      setTimeout(() => {
        this.paginationOptions = {
          first: {isActive: false, isDisable: true},
          previous: {isActive: false, isDisable: true},
          next: {isActive: false, isDisable: true},
          last: {isActive: false, isDisable: true},
        }
        this.setupPagination()
      })
    }

    if (this.page == 0) {

      this.currentPage = 1


    }

    if (this.page == 1) {
      setTimeout(() => {
        this.onFirstPageClick(false)
      })
    }

  }

  setupPagination() {
    this.paginationOptions = {
      first: {isActive: false, isDisable: true},
      previous: {isActive: false, isDisable: true},
      next: {isActive: false, isDisable: true},
      last: {isActive: false, isDisable: true},
    }

    if (this.totalPages == 1) {
      this.paginationElements = [
        {value: this.currentPage, isActive: true}
      ]
    } else if (this.totalPages == 2) {
      this.paginationElements = [
        {value: this.currentPage, isActive: true},
        {value: this.currentPage + 1, isActive: false}
      ]
      this.paginationOptions.next.isDisable = false
    } else {
      this.paginationElements = [
        {value: this.currentPage, isActive: true},
        {value: this.currentPage + 1, isActive: false},
        {value: this.currentPage + 2, isActive: false}
      ]
      this.paginationOptions.next.isDisable = false
      this.paginationOptions.last.isDisable = false
    }

    if (this.page != 1 && this.totalPages != 1 && this.page <= this.totalPages) this.setupCurrentPage()

  }

  setupCurrentPage() {
    for (let i = 1; i < this.page; i++) {
      this.onNextPageClick(false)
    }
  }

  onFirstPageClick(emit: boolean) {
    this.currentPage = 1
    this.paginationOptions.first.isDisable = true
    this.paginationOptions.previous.isDisable = true
    this.paginationOptions.next.isDisable = this.totalPages == 1;

    if (this.totalPages >= 3) {
      this.paginationOptions.last.isDisable = false
      this.paginationElements = [
        {value: this.currentPage, isActive: true},
        {value: this.currentPage + 1, isActive: false},
        {value: this.currentPage + 2, isActive: false}
      ]
    }

    if (emit)
      this.paginationEmitter.emit({
        currentPage: this.currentPage,
        size: this.selectControl.value
      })
  }

  onPreviousPageClick() {
    this.currentPage = this.currentPage - 1
    this.previousPageSetup()
    this.paginationEmitter.emit({
      currentPage: this.currentPage,
      size: this.selectControl.value
    })
  }

  onElementPageClick(value: number) {
    if (value > this.currentPage) {
      this.currentPage = value
      this.nextPageSetup()
      this.paginationEmitter.emit({
        currentPage: this.currentPage,
        size: this.selectControl.value
      })
    } else if (value < this.currentPage) {
      this.currentPage = value
      this.previousPageSetup()
      this.paginationEmitter.emit({
        currentPage: this.currentPage,
        size: this.selectControl.value
      })
    }

  }

  onNextPageClick(emit: boolean) {
    this.currentPage = this.currentPage + 1
    this.nextPageSetup()
    if (emit)
      this.paginationEmitter.emit({
        currentPage: this.currentPage,
        size: this.selectControl.value
      })
  }

  onLastPageClick() {
    this.paginationOptions.previous.isDisable = false
    this.paginationOptions.first.isDisable = false
    this.paginationOptions.next.isDisable = true
    this.paginationOptions.last.isDisable = true
    this.currentPage = this.totalPages
    this.paginationElements = [
      {value: this.currentPage - 2, isActive: false},
      {value: this.currentPage - 1, isActive: false},
      {value: this.currentPage, isActive: true}
    ]
    this.paginationEmitter.emit({
      currentPage: this.currentPage,
      size: this.selectControl.value
    })
  }

  previousPageSetup() {
    if (this.totalPages == 2) {
      this.paginationOptions.first.isDisable = true
      this.paginationOptions.previous.isDisable = true
      this.paginationOptions.next.isDisable = false
      this.paginationElements = [
        {value: this.currentPage, isActive: true},
        {value: this.currentPage + 1, isActive: false}
      ]
    } else {
      this.paginationOptions.next.isDisable = false
      this.paginationOptions.last.isDisable = false
      if (this.currentPage == 1) {
        this.paginationOptions.first.isDisable = true
        this.paginationOptions.previous.isDisable = true

        this.paginationElements = [
          {value: this.currentPage, isActive: true},
          {value: this.currentPage + 1, isActive: false},
          {value: this.currentPage + 2, isActive: false}
        ]

      } else {
        this.paginationElements = [
          {value: this.currentPage - 1, isActive: false},
          {value: this.currentPage, isActive: true},
          {value: this.currentPage + 1, isActive: false}
        ]
      }
    }
  }

  nextPageSetup() {
    if (this.totalPages == 2) {
      this.paginationOptions.next.isDisable = true
      this.paginationOptions.last.isDisable = true
      this.paginationOptions.previous.isDisable = false
      this.paginationElements = [
        {value: this.currentPage - 1, isActive: false},
        {value: this.currentPage, isActive: true}
      ]
    } else {
      this.paginationOptions.first.isDisable = false
      this.paginationOptions.previous.isDisable = false
      if (this.currentPage == this.totalPages) {
        this.paginationOptions.next.isDisable = true
        this.paginationOptions.last.isDisable = true

        this.paginationElements = [
          {value: this.currentPage - 2, isActive: false},
          {value: this.currentPage - 1, isActive: false},
          {value: this.currentPage, isActive: true}
        ]

      } else {
        this.paginationElements = [
          {value: this.currentPage - 1, isActive: false},
          {value: this.currentPage, isActive: true},
          {value: this.currentPage + 1, isActive: false}
        ]
      }
    }

  }


}
