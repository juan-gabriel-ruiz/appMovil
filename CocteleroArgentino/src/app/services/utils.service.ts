import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  loadingCtrl = inject(LoadingController);
  toatsCtrl = inject(ToastController);
  router = inject(Router)

  // ====== loading ====
  loading() {
    return this.loadingCtrl.create({ spinner: 'crescent' })
  }

  // =====toast===
  async presentToast(opts?: ToastOptions) {
    const toast = await this.toatsCtrl.create(opts);
    toast.present();
  }

  // =====Enruta a cualquier pagina disponible===
  routerLink(url: string) {
    return this.router.navigateByUrl(url);
  }

  // =====guardar elemento en localstorage===
  saveInLocalStorage(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value))
  }

  // =====obten elemento desde local storage===
  getFromLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key))
  }

}
