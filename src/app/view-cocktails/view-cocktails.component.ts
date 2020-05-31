import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CocktailApiService } from '../cocktail-api.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { CurrentCocktailService } from '../current-cocktail.service';

@Component({
  selector: 'app-view-cocktails',
  templateUrl: './view-cocktails.component.html',
  styleUrls: ['./view-cocktails.component.css']
})
export class ViewCocktailsComponent implements OnInit {

  

  title = 'cloudAPI-website';
  cocktails :JSON;
  products:any = [];
  search:String = "";
  
  

  constructor(private service: CocktailApiService, private userService: UserService,private router: Router,private currectCocktailService: CurrentCocktailService){
    
  }

  ngOnInit() {
    if(this.userService.isLoggedIn == false){
      this.router.navigate(['/login-component']);
    }
    this.getProducts();
  }

  onSearchChange(searchValue: string): void {  
    console.log(searchValue);
    this.service.getCocktailByName(searchValue).subscribe((data: {}) => {
      console.log(data);
      this.products = data;
      this.cocktails = JSON.parse(JSON.stringify(this.products));
    });
  }

  sortCocktail(value: string): void{
    this.service.getSortedCocktails(value).subscribe((data: {}) => {
      console.log(data);
      this.products = data;
      this.cocktails = JSON.parse(JSON.stringify(this.products));
    });
  }

  changeSorting(value: string){
    this.service.sort = value;
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
  cocktailDetail(name,id){
    this.currectCocktailService.cocktailName = name;
    this.currectCocktailService.cocktailId = id;
    console.log("id: " + id);
    this.router.navigate(['/update-cocktail-component']);
  }

}
export interface Cocktail{
  name:String;
}
