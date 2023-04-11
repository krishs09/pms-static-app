import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {

session : any=sessionStorage.getItem('loggedInEmpName_session');
//session : any='klasjdkas';

  constructor(private router:Router) { }

  // 1BY RETURING BOOLEAN
  getSession(){
    if(this.session){
      return true
    }else{
      this.router.navigate(['/']);
      return false;
    }
  }

  //2) BY RETURNING OBSERVABLE
    // getSession():Observable<boolean>{
    //   return new Observable((observer)=>{
    //     setTimeout(()=>{
    //       observer.next(this.session ? true : false);
    //       observer.complete();
    //     },2000);
    //   });
    // }


  // 3) BY RETURNING PROMISE
  // getSession():Promise<boolean>{
  //      return new Promise((resolve,reject)=>{
  //       setTimeout(()=>{
  //         resolve(this.session ? true : false);
  //       },1000);
  //     })
  // }
}
