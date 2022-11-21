import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-asignaciones-card',
  templateUrl: './asignaciones-card.component.html',
  styleUrls: ['./asignaciones-card.component.scss']
})
export class AsignacionesCardComponent implements OnInit {

  @Input() title: string
  @Input() text: string
  @Input() icon: string

  constructor() {
  }

  ngOnInit(): void {
  }

}
