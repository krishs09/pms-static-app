import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthguardService } from './authguard.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService:AuthguardService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
     {
      //WE CAN USE BOOLEAN TYE
    // if(this.authService.session) return true;
    //  else return false;

     // WE CAN USE OBSERVABLE TYPE
      return this.authService.getSession();
     // WE CAN USE PROMISE TYPE
  }
  
}
