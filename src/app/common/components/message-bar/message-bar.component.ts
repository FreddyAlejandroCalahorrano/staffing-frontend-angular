import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-message-bar',
  templateUrl: './message-bar.component.html',
  styleUrls: ['./message-bar.component.scss']
})
export class MessageBarComponent implements OnInit {

  @Input() open: boolean = false
  @Input() text: string = ""
  @Input() status: status = "success"
  @Input() variant: variant = "normal"

  constructor() {
  }

  ngOnInit(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'auto'
    });
  }
}

type status = "error" | "info" | "success" | "warning" | ''
type variant = "light" | "normal"
