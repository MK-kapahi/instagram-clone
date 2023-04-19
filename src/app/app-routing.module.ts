import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGaurdService } from './core/gaurd/auth-gaurd.service';
import { MainGaurdService } from './core/gaurd/main-gaurd.service';
import { Main_Paths } from './common/constant';

const routes: Routes = [
  {
    path:'' ,redirectTo: Main_Paths.AUTH, pathMatch:'full'
  },
  {
    path:Main_Paths.AUTH , loadChildren :() => import('./modules/auth/auth.module').then((m)=>m.AuthModule),canActivate: [AuthGaurdService]
  },
  {
    path : Main_Paths.MAIN , loadChildren :()=> import('./modules/main/main.module').then((m)=>m.MainModule), canActivate :[MainGaurdService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
