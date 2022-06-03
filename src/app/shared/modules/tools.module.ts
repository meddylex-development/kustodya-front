import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cie10Pipe } from '../pipes/cie10.pipe';

@NgModule({
  declarations: [
    Cie10Pipe,
  ],
  imports: [
    CommonModule
  ], 
  exports: [
    Cie10Pipe,
  ],
})
export class ToolsModule { }
