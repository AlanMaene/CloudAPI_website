import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CocktailApiService } from './cocktail-api.service';
import { AuthService, GoogleLoginProvider } from 'angularx-social-login';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit {

  title = 'cloudAPI-website';
  cocktails :JSON;
  products:any = [];
  auth2: any;
  incomingData : JSON;
  user:any;
  loggedIn : boolean;

  @ViewChild('loginRef', {static: true }) loginElement: ElementRef;

  constructor(private service: CocktailApiService,private authService: AuthService,private userService: UserService){
    
  }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;

      if(user == null){
        this.loggedIn = false;
        this.userService.isLoggedIn= false;
      }
      else{
        this.loggedIn = (user != null);
        this.userService.isLoggedIn= (user != null);

        console.log("Logged in");
        console.log(user.idToken.toString());
        this.service.requestToken(user.idToken.toString()).subscribe((data: {}) => {
          
          this.incomingData = JSON.parse(JSON.stringify(data));
          console.log(this.incomingData['token']);
          this.service.token = this.incomingData['token'];
        });
        this.userService.isLoggedIn = true;

      }
      
    });
    
  }

  signInWithGoogle(): void{
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    console.log("logged in");
    this.service.requestToken(this.user.idToken.toString()).subscribe((data: {}) => {
          
      this.incomingData = JSON.parse(JSON.stringify(data));
      console.log(this.incomingData['token']);
      this.service.token = this.incomingData['token'];
    });
    this.userService.isLoggedIn = true;
    
  }

  signOut(): void{
    this.authService.signOut();
    this.userService.isLoggedIn = false;
  }

/*
  getProducts() {
    this.products = [];
    this.service.getCocktails().subscribe((data: {}) => {
      console.log(data);
      this.products = data;
      this.cocktails = JSON.parse(JSON.stringify(this.products));
    });
  }

  createCocktail(){
    this.service.createCocktailInDB().subscribe(data =>{});
    console.log("added");
  }*/

}
export interface Cocktail{
  name:String;
}