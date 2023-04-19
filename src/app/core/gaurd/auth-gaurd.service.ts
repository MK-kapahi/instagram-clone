import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { Main_Paths } from 'src/app/common/constant';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService {

  constructor(private router : Router ) { }
  canActivate(route: ActivatedRouteSnapshot):boolean{
  const token =localStorage.getItem('token');
    if(token)   
    {
      this.router.navigate([Main_Paths.AUTH])
      return false;
    } 
    return true;
}
}
