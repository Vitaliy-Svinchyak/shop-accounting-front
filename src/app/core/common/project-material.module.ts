import { NgModule } from '@angular/core';

import {
  ObserveContentModule,
  OverlayModule,
  MdAutocompleteModule,
  MdButtonModule,
  MdCardModule,
  MdCheckboxModule,
  MdIconModule,
  MdInputModule,
  MdMenuModule,
  MdProgressBarModule,
  MdSelectModule,
  MdTooltipModule,
  StyleModule,
  PlatformModule,
  MdDialogModule
} from '@angular/material';

const MATERIAL_MODULES: any[] = [
  MdAutocompleteModule,
  MdButtonModule,
  MdCardModule,
  MdCheckboxModule,
  MdIconModule,
  MdInputModule,
  MdMenuModule,
  MdProgressBarModule,
  MdSelectModule,
  MdTooltipModule,
  OverlayModule,
  StyleModule,
  PlatformModule,
  ObserveContentModule,
  MdDialogModule
];

@NgModule({
  imports: MATERIAL_MODULES,
  exports: MATERIAL_MODULES,
})
export class ProjectMaterialModule {
}
