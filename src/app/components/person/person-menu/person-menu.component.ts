import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Person} from "@interfaces/person";

@Component({
  selector: 'app-person-menu',
  templateUrl: './person-menu.component.html',
})
export class PersonMenuComponent implements OnInit {

  currentTabId: string = "DP"
  tabElements = [
    {id: "DP", name: "Información Básica", isActive: true, isDisabled: false},
    {id: "H", name: "Habilidades", isActive: false, isDisabled: true},
  ]
  selectedPerson: Person
  isEdit: boolean = false

  constructor(
    private aRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    const {person} = this.aRoute.snapshot.data
    if (!person) return

    this.isEdit = true
    this.selectedPerson = person
    this.tabElements.forEach((element, index) => {
      if (index > 0) element.isDisabled = false
    })
  }

  onClickElementTab(elementId: string) {
    this.currentTabId = elementId
    this.tabElements.forEach((element) => {
      element.isActive = element.id == elementId
    })
  }

}
