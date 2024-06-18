import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'; // son herramientas de Angular para crear y manejar formularios reactivos.
import { User } from 'src/app/models/user.model'; // importa el modelo de usuario
import { FirebaseService } from 'src/app/services/firebase.service'; // importacion para interactuar con el servicio de Firebase que creamos
import { UtilsService } from 'src/app/services/utils.service';

// definicion del componente sing up
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  // definimos un formulario que involucra un mail, un nombre y una contraseña con sus respectivas validaciones
  form = new FormGroup({
    uid: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
  })

  // Utilizamos inject para obtener instancias de FirebaseService y UtilsService
  firebaseSvc = inject(FirebaseService);
  utilSvc = inject(UtilsService)

  ngOnInit() {
  }

  async submit() {

    // verifica que el formulario sea valido mientras se muestra un simbolo de carga
    if (this.form.valid) {
      
      const loading = await this.utilSvc.loading();
      await loading.present();

      // Llama al método signIn del FirebaseService, si la autenticación es exitosa, obtiene la información del usuario
      this.firebaseSvc.singUp(this.form.value as User).then( async res => {

        await this.firebaseSvc.updateUser(this.form.value.name);

        let uid = res.user.uid;
        this.form.controls.uid.setValue(uid);

        this.setUserInfo(uid);
      

      }).catch(error =>{
        console.log(error); // Si ocurre un error, lo maneja mostrando un mensaje de error

        this.utilSvc.presentToast({
          message: error.message,
          duration: 2500,
          color: 'primary',
          position: 'middle',
          icon: 'alert-circle-outline'
        })


      }).finally(() => {
        loading.dismiss();

      })
  }

}

async setUserInfo(uid: string) {
  if (this.form.valid) {

    const loading = await this.utilSvc.loading();
    await loading.present();

    let path = `users/${uid}`;
    delete this.form.value.password;

    this.firebaseSvc.setDocument(path, this.form.value).then(async res => {

      this.utilSvc.saveInLocalStorage('user', this.form.value)
      this.utilSvc.routerLink('main/main/tab1');
      this.form.reset();
    

    }).catch(error =>{
      console.log(error);

      this.utilSvc.presentToast({
        message: error.message,
        duration: 2500,
        color: 'primary',
        position: 'middle',
        icon: 'alert-circle-outline'
      })

    }).finally(() => {
      loading.dismiss();
    })


  }

}
}
