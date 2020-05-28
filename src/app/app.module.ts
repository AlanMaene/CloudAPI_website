import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SocialLoginModule, AuthServiceConfig, LoginOpt } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";

import { HttpClientModule } from '@angular/common/http';
import { AddCocktailComponent } from './add-cocktail/add-cocktail.component';
import { ViewCocktailsComponent } from './view-cocktails/view-cocktails.component';
import { LoginComponent } from './login/login.component';
import { UserPageComponent } from './user-page/user-page.component';
import { CanActivate , CanActivateChild, CanDeactivate} from '@angular/router';
import { Guard } from './only-logged-in';
import { UpdateCocktailComponent } from './update-cocktail/update-cocktail.component';



let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("998171199839-2061ud931cfaqgckitsfimod47c8nkhn.apps.googleusercontent.com")
  }
])

export function provideConfig(){
  return config;
}


@NgModule({
  declarations: [
    AppComponent,
    AddCocktailComponent,
    ViewCocktailsComponent,
    LoginComponent,
    UserPageComponent,
    UpdateCocktailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SocialLoginModule,

    
  ],
  providers: [{
    provide: AuthServiceConfig,
    useFactory: provideConfig,
    
  },
  Guard,
],
  bootstrap: [AppComponent]
})
export class AppModule { }