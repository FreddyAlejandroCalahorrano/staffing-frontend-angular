import {Component, EventEmitter, Input, Output,} from "@angular/core";
import {ContextMenuModel} from "../interfaces/table.interface";

@Component({
  selector: "app-context-menu",
  template: `
    <ng-container>
      <ul>
        <li *ngFor="let menuItem of contextMenuItems; index as i"
            (click)="onContextMenuClick($event, menuItem)">

          {{ menuItem.menuText }}

          <pichincha-icon size="20px"
                          color="black"
                          weight_color="500"
                          type="--round">
            {{ menuItem.icon }}
          </pichincha-icon>

        </li>
      </ul>
    </ng-container>
  `,
  styles: [
    `
      ul {
        list-style: none;
        background: white;
        border: 2px solid var(--info);
        border-radius: 4px;
        padding: 0;
        width: 120px;
        margin: 0;
        box-shadow: rgb(211 211 211 / 52%) 0px 1px 2px 2px;

        li {
          font-size: 14px;
          color: var(--darkGrey400);
          line-height: 16px;
          padding: 11px 12px 11px 16px;
          margin: 0;
          cursor: pointer;
          font-family: var(--preloslabBook) !important;
          border-bottom: 1px solid rgb(222, 227, 237);
          display: flex;
          justify-content: space-between;
          align-items: center;

          &:hover {
            color: var(--strongBlue500);
            background-color: var(--darkGrayishBlue50);
          }
        }
      }
    `
  ],
})
export class ContextMenuComponent {
  @Input()
  contextMenuItems: Array<ContextMenuModel>;

  @Output() contextMenuItemClick: EventEmitter<any> = new EventEmitter<any>();

  onContextMenuClick(event: any, data: ContextMenuModel): any {
    this.contextMenuItemClick.emit({
      event,
      data,
    });
  }
}
