import {Component, OnInit} from '@angular/core';


export interface Card {
  icon: string
  title: string
  text: string;
  routerLink: string;
}

@Component({
  selector: 'app-asignaciones',
  templateUrl: './asignaciones.component.html',
  styleUrls: ['./asignaciones.component.scss']
})
export class AsignacionesComponent implements OnInit {

  card: Card[] = [
    {
      icon: 'graphic_eq',
      title: "Asignación a Tribus",
      text: "Asigne recursos con rol de tipo lider a Tribus",
      routerLink: "tribus",
    },
    {
      icon: 'tram',
      title: "Asignación a Células",
      text: "Asigne recursos con rol de tipo lider o staff a Células",
      routerLink: "celulas",

    },

  ]


  constructor() {

  }

  ngOnInit(): void {

  }


}

