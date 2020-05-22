import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'angularx-social-login';
import { Router } from '@angular/router';
import { CocktailApiService } from '../cocktail-api.service';

@Component({
  selector: 'app-add-cocktail',
  templateUrl: './add-cocktail.component.html',
  styleUrls: ['./add-cocktail.component.css']
})
export class AddCocktailComponent implements OnInit {

  checkoutForm;
  numberOfMeasurements: Array<Array<String>> = [["",""],[]];
  cocktail :any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private service: CocktailApiService
  ) {
    this.checkoutForm = this.formBuilder.group({
      name: '',
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

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
        if(user == null){
          this.router.navigate(['/login-component'])
        }
    });
    this.checkoutForm.reset();
  }

  onSubmit(customerData) {
    // Process checkout data here
    //this.items = this.cartService.clearCart();
    var temp = {
      
      "name": customerData['name'],
    "instructions": customerData['instructions'],
    "inventor": {
      "name":customerData['bartender']
    },
    "measurements": [
      {
        "ingredient":{
          "name": "passionfruit syrup"
        },
        "measurements": 15
      }
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
    this.service.createCocktailTest(newtemp).subscribe(data =>{});
    this.checkoutForm.reset();

    console.warn('Your order has been submitted', customerData);
  }

  addIngredient(){
    this.numberOfMeasurements.push([]);
  }

}
