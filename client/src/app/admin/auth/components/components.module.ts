import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentesModule } from 'ngprime-core';
import { ChangePasswordComponent } from './change-password/change-password.component';



@NgModule({
  declarations: [
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ComponentesModule
  ],
  exports: [
    ChangePasswordComponent
  ]
})
export class ComponentsModule { }
