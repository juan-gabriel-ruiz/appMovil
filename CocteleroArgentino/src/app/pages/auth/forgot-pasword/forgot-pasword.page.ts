import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'; // son herramientas de Angular para crear y manejar formularios reactivos.
import { FirebaseService } from 'src/app/services/firebase.service'; // importacion para interactuar con el servicio de Firebase que creamos
import { UtilsService } from 'src/app/services/utils.service';

// definicion del componente forgot-password
@Component({
  selector: 'app-forgot-pasword',
  templateUrl: './forgot-pasword.page.html',
  styleUrls: ['./forgot-pasword.page.scss'],
})
export class ForgotPaswordPage implements OnInit {
    // definimos un formulario que involucra un mail con sus respectivas validaciones
    form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
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

        this.firebaseSvc.sendRecoveryEmail(this.form.value.email).then(res => {   this.utilSvc.presentToast({
          message: 'Correo enviado con exito',
          duration: 1500,
          color: 'primary',
          position: 'middle',
          icon: 'mail-outline'
        }); // Muestra un mensaje exitoso y envía un correo electrónico de recuperación utilizando el servicio de Firebase.

        // redirige a la pestaña de inicio de sesion
        this.utilSvc.routerLink('/auth');
        this.form.reset();

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
  
