import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input('isUser') isUser = false;
  @Input('isProvider') isProvider = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  returnToUsers() {
    this.router.navigate(['anchor-company-users']);
  }

  returnToProviders() {
    this.router.navigate(['anchor-company-providers']);
  }
}
