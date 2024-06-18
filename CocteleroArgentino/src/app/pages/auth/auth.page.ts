import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'; // son herramientas de Angular para crear y manejar formularios reactivos.
import { User } from 'src/app/models/user.model'; // importa el modelo de usuario
import { FirebaseService } from 'src/app/services/firebase.service'; // importacion para interactuar con el servicio de Firebase que creamos
import { UtilsService } from 'src/app/services/utils.service';

// definicion del componente auth
@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  // definimos un formulario que involucra un mail y una contraseña con sus respectivas validaciones
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
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
      this.firebaseSvc.singIn(this.form.value as User).then(res => {

        this.getUserInfo(res.user.uid);

      }).catch(error =>{
        console.log(error); // Si ocurre un error, lo maneja mostrando un mensaje de error

        this.utilSvc.presentToast({
          message: "Los datos ingresados son incorrectos, intente nuevamente",
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

async getUserInfo(uid: string) {
  // como en el anterior metodo se asegura que sea valido el formulario mientras muesta el indicador de carga
  if (this.form.valid) {

    const loading = await this.utilSvc.loading();
    await loading.present();

    let path = `users/${uid}`;
   
    // aca obtenemos la informacion del usuario
    this.firebaseSvc.getDocument(path).then((user: User ) => {

      // si es un formulario valido va a guardar la informacion en el local store y a proceder a pasar a el main
      this.utilSvc.saveInLocalStorage('user', user)
      this.utilSvc.routerLink('main/main/tab1');
      this.form.reset();
      
      // una vez en el main muestra el mensaje personalizado dando la bienvenida
      this.utilSvc.presentToast({
        message: `Te damos la bienvenida ${user.name}`,
        duration: 1500,
        color: 'primary',
        position: 'middle',
        icon: 'person-circle-outline'
      })
    

    }).catch(error =>{
      console.log(error); //si el formulario es invalido muestra un mensaje de error

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
