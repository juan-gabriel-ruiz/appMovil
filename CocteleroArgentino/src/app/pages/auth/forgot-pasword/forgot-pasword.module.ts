import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgotPaswordPageRoutingModule } from './forgot-pasword-routing.module';

import { ForgotPaswordPage } from './forgot-pasword.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForgotPaswordPageRoutingModule,
    SharedModule
  ],
  declarations: [ForgotPaswordPage]
})
export class ForgotPaswordPageModule {}
