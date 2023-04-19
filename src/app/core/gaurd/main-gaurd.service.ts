import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Main_Paths } from 'src/app/common/constant';

@Injectable({
  providedIn: 'root'
})
export class MainGaurdService {

  constructor(private router : Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

      const token = localStorage.getItem('token');
      if(token)
      {
        return true;
      }
      else {

        this.router.navigate([Main_Paths.AUTH]);
        return false;
      }
  }
}
