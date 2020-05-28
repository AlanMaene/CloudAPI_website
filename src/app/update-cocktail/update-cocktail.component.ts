import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { CurrentCocktailService } from '../current-cocktail.service';
import { Router } from '@angular/router';
import { CocktailApiService } from '../cocktail-api.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-update-cocktail',
  templateUrl: './update-cocktail.component.html',
  styleUrls: ['./update-cocktail.component.css'],
  template : 'test',
})
export class UpdateCocktailComponent implements OnInit {

  cocktail :JSON ;
  p:any = [];
  checkoutForm;

  constructor(
    private formBuilder: FormBuilder,
    private userService : UserService,
    private currentCocktailService : CurrentCocktailService,
    private router: Router,
    private service: CocktailApiService) { 
      this.checkoutForm = this.formBuilder.group({
        name: "waarom",
        address: '',
        bartender:'',
        instructions:'',
        ingredient1:'',
        measurements1:'',
        ingredient2:'',
        measurements2:'',
        ingredient3:'',
        measurements3:'',
        ingredient4:'',
        measurements4:'',
        ingredient5:'',
        measurements5:'',
        ingredient6:'',
        measurements6:'',
        ingredient7:'',
        measurements7:'',
        ingredient8:'',
        measurements8:'',
        ingredient9:'',
        measurements9:'',
        ingredient10:'',
        measurements10:'',
        ingredient11:'',
        measurements11:'',
        ingredient12:'',
        measurements12:'',
      });
    }

  ngOnInit(): void {
    if(this.userService.getIsLoggedIn() == false){
      this.router.navigate(['/login-component']);
    }
    console.log(this.currentCocktailService.getCurrentCocktail());
    this.service.getCocktail(this.currentCocktailService.getCurrentCocktail().toString()).subscribe((data: {}) => {
      this.p=data;
      console.log(this.p);
      this.cocktail = JSON.parse(JSON.stringify(data));
      console.log(this.cocktail);
    });
    this.checkoutForm.reset();
  }

  deleteCocktail(){
    this.service.deleteCocktail(this.currentCocktailService.cocktailId.toString()).subscribe((data: {}) => {});
  }

  onSubmit(customerData) {
        // Process checkout data here
    //this.items = this.cartService.clearCart();
    var temp = {
      "id": this.currentCocktailService.cocktailId,
      "name": customerData['name'],
    "instructions": customerData['instructions'],
    "inventor": {
      "name":customerData['bartender']
    },
    "measurements": [
    ]
    };

    for( var i = 1 ; i <= 12 ; i++){
        if(customerData['ingredient' + i.toString()] != null && customerData['measurements' + i.toString()] != null){
          console.log("ingredient: " +customerData['ingredient' + i.toString()] + "measurements: " + customerData['measurements' + i.toString()]);
          temp["measurements"].push(
            {
              ingredient:{
                name : customerData['ingredient' + i.toString()]
              },
              measurements : Number.parseInt( customerData['measurements' + i.toString()])
            }
          )
        }
    }

    

    var newtemp = JSON.stringify(temp);
    console.log(newtemp);    
    this.service.updateCocktail(newtemp).subscribe(data =>{});
    this.checkoutForm.reset();

    console.warn('Your order has been submitted', customerData);
  }

}
