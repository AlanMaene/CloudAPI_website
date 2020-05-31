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
  randomCocktailData: JSON;
  randomCocktail:JSON;
  canSave:Boolean = false;
  error: String = "";

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
              measurements :  customerData['measurements' + i.toString()].toString()
            }
          )
        }
    }

    

    var newtemp = JSON.stringify(temp);
    console.log(newtemp);    
    this.service.createCocktailTest(newtemp).subscribe(data =>{
      this.router.navigate(['']);
    }, err => {
      
      console.log("raar" + err); 
      this.error = JSON.stringify(err.error);  
    });
    this.checkoutForm.reset();

    console.warn('Your cocktail has been submitted', customerData);
    
  }

  addIngredient(){
    this.numberOfMeasurements.push([]);
  }

  generateRandomcocktail(){
    this.service.getRandomCocktail().subscribe(data =>{
      
      this.randomCocktailData = JSON.parse(JSON.stringify(data));
      this.canSave = true;
      this.convert();
      
    })
    
  }

  convert(){
    var temp = {      
      "name": this.randomCocktailData["drinks"][0]["strDrink"],
      "instructions": this.randomCocktailData["drinks"][0]["strInstructions"],
      "inventor": {
        "name":"unknown"
      },
      "measurements": [
      ]
      };

      for( var i = 1 ; i <= 12 ; i++){
        if(this.randomCocktailData["drinks"][0]['strIngredient' + i.toString()] != null && this.randomCocktailData["drinks"][0]['strMeasure' + i.toString()] != null){
          console.log("ingredient: " +this.randomCocktailData["drinks"][0]['strIngredient' + i.toString()] + "measurements: " + this.randomCocktailData["drinks"][0]['strMeasure' + i.toString()]);
          temp["measurements"].push(
            {
              ingredient:{
                name : this.randomCocktailData["drinks"][0]['strIngredient' + i.toString()]
              },
              measurements : this.randomCocktailData["drinks"][0]['strMeasure' + i.toString()]
            }
          )
        }
    }
    this.randomCocktail = JSON.parse(JSON.stringify(temp));
    console.log(this.randomCocktail); 
  }

  saveRandomCocktail(){
    this.service.createCocktailTest(JSON.stringify(this.randomCocktail)).subscribe(data =>{});
  }

}
