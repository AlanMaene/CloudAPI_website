import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrentCocktailService {

  constructor() { }

  public cocktailId: Number;
  public cocktailName: String;

  getCurrentCocktail(): String {
    return this.cocktailName;
  }

}
