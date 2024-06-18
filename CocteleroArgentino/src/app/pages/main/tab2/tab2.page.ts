/* son necesarios para definir un componente y manejar la inicialización */
import { Component, OnInit, inject } from '@angular/core';
/* servicios importados */
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { CocktailService } from '../service/cocktail.service';
/* se importa desde la librería jspdf, que se usa para crear y gestionar archivos PDF */
import { jsPDF } from 'jspdf';

/* definimos la interfaz cocktail para establecer la estructura de un objeto cóctel con tres propiedades: nombre, foto y instrucciones */
interface Cocktail {
  strDrink: string;
  strDrinkThumb: string;
  strInstructions: string;
}
/* definicion del componente tab2 */
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  /* Cadena para almacenar el ingrediente ingresado por el usuario */
  name: string = '';
  /* array para almacenar los resultados obtenidos de cócteles */
  cocktails: any[] = [];
  /* un booleano para controlar la visibilidad del error cuando el nombre del ingrediente está vacío */
  showEmptyNameError: boolean = false;

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  constructor(private cocktailService: CocktailService) { }

  /* Llama al método singOut del servicio FirebaseService para cerrar la sesión del usuario */
  singOut(){
    this.firebaseSvc.singOut();
  }
  
  /* Verifica si el nombre está vacío. Si es así, muestra un error y limpia la lista de cócteles.
    Si no está vacío, oculta el error y llama al servicio CocktailService para obtener los cócteles por nombre, y actualiza la lista de cócteles */
  async searchByName() {
    if (this.name.trim() === '') {
      // Mostrar el mensaje de error si el campo está vacío
      this.showEmptyNameError = true;
      // Vaciar la lista de cocktails
      this.cocktails = [];
      return;
    }
    
    // Si el campo no está vacío, realizar la búsqueda normalmente
    this.showEmptyNameError = false;
    this.cocktails = await this.cocktailService.getCocktailByName(this.name);
  }

  /* Este método crea un archivo PDF con los detalles de un cóctel.
      Utiliza jsPDF para crear un documento PDF.
      Añade el nombre del cóctel y las instrucciones al PDF.
      Añade una imagen del cóctel al PDF y, una vez que la imagen se ha cargado, guarda el archivo PDF con el nombre del cóctel */
  async downloadCocktail(cocktail: Cocktail) {
    const doc = new jsPDF();
  
    // Ajuste de la fuente para el título y el contenido
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
  
    // Añadir "Nombre del trago:" y el nombre del trago en la misma línea
    const drinkTitle = "Nombre del trago: ";
    const drinkTitleWidth = doc.getTextWidth(drinkTitle);
    doc.text(drinkTitle, 10, 20);
    doc.setFont("helvetica", "normal");
    doc.text(cocktail.strDrink, 10 + drinkTitleWidth, 20);
  
    // Añadir "Instrucciones:" y las instrucciones en la misma línea si es posible
    doc.setFont("helvetica", "bold");
    const instructionsTitle = "Instrucciones: ";
    const instructionsTitleWidth = doc.getTextWidth(instructionsTitle);
    doc.text(instructionsTitle, 10, 30);
    doc.setFont("helvetica", "normal");
    doc.text(cocktail.strInstructions, 10 + instructionsTitleWidth, 30, { maxWidth: 170 - instructionsTitleWidth });
  
    const img = new Image();
    img.src = cocktail.strDrinkThumb;
    img.onload = () => {
      // Posicionar la imagen después del texto
      doc.addImage(img, 'JPEG', 10, 40, 80, 80);
  
      // Guardar el PDF
      doc.save(`${cocktail.strDrink}.pdf`);
    };
  }
  
}
