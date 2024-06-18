import { INJECTOR, inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // autenticación con Firebase en Angular.
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc ,  getDoc } from '@angular/fire/firestore' // Para las funciones de Firestore de Firebase
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  //===dudas inject
  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);
  utilsSvc = inject(UtilsService);


  // Metodos Auth

  // autenticacion, devuelve una instancia de Auth de Firebase
  getAuth() {
    return getAuth();
  }

  // Inicia sesión con correo electrónico y contraseña

  singIn(user: User) {

    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  // Crea un nuevo usuario con correo electrónico y contraseña

  singUp(user: User) {

    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  // Actualiza el perfil del usuario autenticado (nombre para mostrar)

  updateUser(displayName: string) {
    return updateProfile(getAuth().currentUser, { displayName })
  }

   // Envía un correo electrónico para restablecer la contraseña
   sendRecoveryEmail(email: string) {
    return sendPasswordResetEmail(getAuth(),email );
   }

   // Cierra la sesión del usuario y limpia la información del usuario en localStorage

   singOut(){
    getAuth().signOut();
    localStorage.removeItem('user');
    this.utilsSvc.routerLink('/auth')
   }

  // Base de datos

  // Guarda un documento en Firestore en la ruta especificada con los datos proporcionados
  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data);

  }

  // Obtiene un documento de Firestore en la ruta especificada y devuelve sus datos
  async getDocument(path: string) {
    return ( await getDoc(doc(getFirestore(), path))).data();

  }


}
