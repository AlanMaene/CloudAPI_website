import { Component, OnInit } from '@angular/core';
import { CocktailApiService } from '../cocktail-api.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-cocktails',
  templateUrl: './view-cocktails.component.html',
  styleUrls: ['./view-cocktails.component.css']
})
export class ViewCocktailsComponent implements OnInit {

  

  title = 'cloudAPI-website';
  cocktails :JSON;
  products:any = [];
  

  constructor(private service: CocktailApiService, private userService: UserService,private router: Router,){
    
  }

  ngOnInit() {
    if(this.userService.isLoggedIn == false){
      this.router.navigate(['/login-component']);
    }
    this.getProducts();
  }

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
  }
  test(name){
    console.log(name);
  }

}
export interface Cocktail{
  name:String;
}
