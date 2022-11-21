import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {PSelectComponent} from "./p-select/p-select.component";
import {CustomInputComponent} from "./custom-input/custom-input.component";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MessageBarComponent} from "./message-bar/message-bar.component";
import {ErrorComponent} from "./error/error.component";
import {TableComponent} from './table/table.component';
import {TbPaginationComponent} from "./table/atoms/tb-pagination.component";
import {ContextMenuComponent} from "./table/atoms/context-menu.component";
import {ScrollingModule} from "@angular/cdk/scrolling";
import {PSelectMultipleComponent} from "./p-select-multiple/p-select-multiple.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollingModule,
  ],
  declarations: [
    PSelectComponent,
    PSelectMultipleComponent,
    CustomInputComponent,
    MessageBarComponent,
    ErrorComponent,
    TableComponent,
    TbPaginationComponent,
    ContextMenuComponent,
  ],
  exports: [
    PSelectComponent,
    CustomInputComponent,
    MessageBarComponent,
    ErrorComponent,
    TableComponent,
    PSelectMultipleComponent,
    TbPaginationComponent,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class CustomCommonModule {
}
