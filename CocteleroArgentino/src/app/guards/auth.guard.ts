import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UtilsService } from '../services/utils.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate //metodo que determina si el usuario puede navegar a esa ruta
{

  constructor(private router: Router, private utilSvc: UtilsService) {}

  canActivate(): boolean {
    const user = this.utilSvc.getFromLocalStorage('user'); //Si encuentra un usuario el método devuelve true, permitiendo así la activación de la ruta
    if (user) 
    {
      return true;
    } else // Si no encuentra un usuario se va redirigir a la ruta /auth y devuelve false, impidiendo la activación de la ruta.
    {
      this.router.navigate(['/auth']);
      return false;
    }
  }
}