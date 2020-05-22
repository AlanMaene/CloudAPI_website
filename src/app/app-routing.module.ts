import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AddCocktailComponent } from './add-cocktail/add-cocktail.component';
import { ViewCocktailsComponent } from './view-cocktails/view-cocktails.component';
import { LoginComponent } from './login/login.component';
import { UserPageComponent } from './user-page/user-page.component';
import {Guard } from './only-logged-in';



const routes: Routes = [
  
    {path: '' , component: LoginComponent},
    { path: 'login-component' , component: LoginComponent },
    { path: 'view-cocktail-component' , component: ViewCocktailsComponent },
    {
      path:'add-cocktail-component',
      component: AddCocktailComponent,
    }

  ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],

})
export class AppRoutingModule { }
