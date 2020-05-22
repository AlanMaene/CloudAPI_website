import { Component, OnInit } from '@angular/core';
import { AuthService } from "angularx-social-login";
import {  GoogleLoginProvider } from "angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(private authService: AuthService) { }

  signInWithGoogle(): void{
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void{
    this.authService.signOut();
  }

  ngOnInit() {
    
  }

}
