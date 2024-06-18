import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// importacion de componentes personalizados que se comparten
import { HeaderComponent } from './components/header/header.component';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { LogoComponent } from './components/logo/logo.component';


@NgModule({
  // aca declaramos los componentes importados
  declarations: [
    HeaderComponent,
    CustomInputComponent,
    LogoComponent
  ],
  // aca permitimos que se puedan usar los componentes personalizados en otros componentes si importamos el shared module
  exports:[
    HeaderComponent,
    CustomInputComponent,
    LogoComponent,
    ReactiveFormsModule
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule { }
