/* son necesarios para definir un componente y manejar la inicialización */
import { Component, OnInit, inject } from '@angular/core';
/* servicios importados */
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { CocktailService } from '../service/cocktail.service';

/* definicion del componente tab1 */
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  /* Cadena para almacenar el ingrediente ingresado por el usuario */
  ingredient: string = '';
  /* array para almacenar los resultados obtenidos de cócteles */
  cocktails: any[] = [];
  /* un booleano para controlar la visibilidad del error cuando el nombre del ingrediente está vacío */
  showEmptyNameError: boolean = false;

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  
  constructor(private cocktailService: CocktailService) { }

  /* Verifica si el ingrediente está vacío. Si es así, muestra un error y limpia la lista de cócteles.
    Si no está vacío, oculta el error y llama al servicio CocktailService para obtener los cócteles por ingrediente, y actualiza la lista de cócteles */
  async searchByIngredient() {
    if (this.ingredient.trim() === '') {
      this.showEmptyNameError = true;
      this.cocktails = [];
      return;
    }
    this.showEmptyNameError = false;
    this.cocktails = await this.cocktailService.getCocktailsByIngredient(this.ingredient);
  }

  /* Llama al método singOut del FirebaseService para cerrar sesión */
  singOut(){
    this.firebaseSvc.singOut();
  }
}
