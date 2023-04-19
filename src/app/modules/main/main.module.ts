import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { ShowPostComponent } from './show-post/show-post.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { HomeComponent } from './home/home.component';
import { BlockComponent } from './block/block.component';
import { Main_Paths, Paths } from 'src/app/common/constant';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu'


const route : Routes = [
  {
    path: Main_Paths.DEFAULT ,redirectTo:Paths.MAIN.HOME,pathMatch:'full'
  },
  {
    path : Paths.MAIN.HOME , component: HomeComponent , children:[
      {
        path:Main_Paths.DEFAULT ,redirectTo:Paths.MAIN.SHOWPOST ,pathMatch:'full'
      },
      {
        path : Paths.MAIN.SHOWPOST , component : ShowPostComponent , 
      },
      {
        path : Paths.MAIN.CREATE , component : CreatePostComponent ,
      },
      {
        path : Paths.MAIN.PROFILE , component : ProfileComponent ,
      },
      {
        path : Paths.MAIN.BLOCK , component : BlockComponent
      }
    ]
  },
 
]
@NgModule({
  declarations: [
    ProfileComponent,
    ShowPostComponent,
    CreatePostComponent,
    HomeComponent,
    BlockComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    SharedModule,
    MatIconModule,
    MatMenuModule,
  ]
})
export class MainModule { }
