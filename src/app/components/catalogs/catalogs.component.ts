import { Component, OnInit } from '@angular/core';

export interface Card {
  icon: string
  title: string
  text: string;
  routerLink: string;
}

@Component({
  selector: 'app-catalogs',
  templateUrl: './catalogs.component.html',
  styleUrls: ['./catalogs.component.scss']
})
export class CatalogsComponent implements OnInit {

  card: Card[] = [
    {
      icon: 'graphic_eq',
      title: "Tribu",
      text: "Administración de Tribus",
      routerLink: "tribus",
    },
    {
      icon: 'tram',
      title: "Células",
      text: "Administración de Células",
      routerLink: "celulas",

    },
    {
      icon: 'crop',
      title: "Habilidades",
      text: "Administración de Habilidades",
      routerLink: "habilidades",

    },

  ]

  constructor() { }

  ngOnInit(): void {
  }

}
