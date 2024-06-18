// import { CanActivateFn } from '@angular/router';
// import { Injectable, inject } from '@angular/core';
// import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, RouterState, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { Observable } from 'rxjs';
// import { FirebaseService } from '../services/firebase.service';
// import { UtilsService } from '../services/utils.service';
// import { onAuthStateChanged } from 'firebase/auth';

// export const NoAuthGuard implements CanActivateFn {

//   firebaseSvc = inject(FirebaseService),
//     utilsSvc = inject(UtilsService)
  
//     CanActivatFn ( 
//       route: ActivatedRouteSnapshot,
//       state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean |  UrlTree>  | boolean | UrlTree {
  
  
  
  
//         return  new Promise((resolve) => {
  
//           firebaseSvc.getAuth().onAuthStateChanged((auth) => {
  
//             if(!auth) resolve(true);
            
//             else{
//               utilsSvc.routerLink('/main/main/tab1');
//               resolve(false);
//             }
  
//           })
  
//         });
//       }
//     }
  