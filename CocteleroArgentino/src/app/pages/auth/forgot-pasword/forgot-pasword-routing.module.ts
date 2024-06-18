import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForgotPaswordPage } from './forgot-pasword.page';

const routes: Routes = [
  {
    path: '',
    component: ForgotPaswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForgotPaswordPageRoutingModule {}
