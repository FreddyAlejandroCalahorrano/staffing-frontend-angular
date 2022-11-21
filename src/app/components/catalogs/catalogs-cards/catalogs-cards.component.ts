import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-catalogs-cards',
  templateUrl: './catalogs-cards.component.html',
  styleUrls: ['./catalogs-cards.component.scss']
})
export class CatalogsCardsComponent implements OnInit {

  @Input() title: string
  @Input() text: string
  @Input() icon: string

  constructor() { }

  ngOnInit(): void {
  }

}
