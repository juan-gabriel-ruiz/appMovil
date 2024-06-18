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
/* definicion del componente tab3 */
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  /* Variable que almacenará los datos del cóctel */
  cocktail: any;

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  /* Llama al método singOut del servicio FirebaseService para cerrar la sesión del usuario */
  singOut(){
    this.firebaseSvc.singOut();
  }

  /* Constructor que inyecta CocktailService para obtener datos de cócteles */
  constructor(private cocktailService: CocktailService) { }

  /* Método que obtiene un cóctel aleatorio y lo asigna a la variable cocktail */
  async getRandomCocktail() {
    this.cocktail = await this.cocktailService.getRandomCocktail();
  }

   /* Este método crea un archivo PDF con los detalles de un cóctel.
      Utiliza jsPDF para crear un documento PDF.
      Añade el nombre del cóctel y las instrucciones al PDF.
      Añade una imagen del cóctel al PDF y, una vez que la imagen se ha cargado, guarda el archivo PDF con el nombre del cóctel */
  async downloadCocktail(cocktail: Cocktail) {

    /* Crea un nuevo documento PDF con jsPDF */
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
    
    /* Carga la imagen del cóctel y la añade al PDF una vez cargada */
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
