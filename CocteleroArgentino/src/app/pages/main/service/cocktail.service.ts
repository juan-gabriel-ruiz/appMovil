// permite que la clase CocktailService sea inyectable como una dependencia
import { Injectable } from '@angular/core';
// importa la biblioteca axios, que se utiliza para realizar solicitudes HTTP
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class CocktailService {
  //propiedad privada apiUrl que contiene la URL base de la API de cócteles.
  private apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1';

  constructor() { }

  // Este método toma un ingrediente como argumento y realiza una solicitud HTTP GET a la API de cócteles para filtrar cócteles que contengan ese ingrediente
  async getCocktailsByIngredient(ingredient: string) {
    try {
      const response = await axios.get(`${this.apiUrl}/filter.php?i=${ingredient}`);
      return response.data.drinks;
    } catch (error) {
      console.error('Error fetching cocktails by ingredient', error);
      throw error;
    }
  }
  // Este método toma un nombre de cóctel como argumento y realiza una solicitud HTTP GET a la API de cócteles para buscar cócteles que coincidan con ese nombre
  async getCocktailByName(name: string) {
    try {
      const response = await axios.get(`${this.apiUrl}/search.php?s=${name}`);
      return response.data.drinks;
    } catch (error) {
      console.error('Error fetching cocktail by name', error);
      throw error;
    }
  }
  // Este método no toma argumentos y realiza una solicitud HTTP GET a la API de cócteles para obtener un cóctel aleatorio
  async getRandomCocktail() {
    try {
      const response = await axios.get(`${this.apiUrl}/random.php`);
      return response.data.drinks[0];
    } catch (error) {
      console.error('Error fetching random cocktail', error);
      throw error;
    }
  }
}
