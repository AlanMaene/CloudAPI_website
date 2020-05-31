import { Injectable, Type } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Cocktail} from '../app/app.component';
import { Observable } from 'rxjs';
import { Content } from '@angular/compiler/src/render3/r3_ast';

const endpoint = 'https://the-cocktail-db.p.rapidapi.com//filter.php?i=rum';
const httpOptions = {
  headers: new HttpHeaders({
    'X-RapidAPI-Host':'the-cocktail-db.p.rapidapi.com',
    'X-RapidAPI-Key':'3bc33d089amsh38c06fda1ea7f0cp14c6a3jsn6d16edc70aee'
  })
};




@Injectable({
  providedIn: 'root'
})
export class CocktailApiService {
  cocktail: any;
  test: JSON;
  token: String;
  
  sort: String = "asc";

  httpCredentials = {
    headers: new HttpHeaders({
      'Authorization':'Bearer ' + this.token
    })
  };

  constructor(private http: HttpClient) { 
    
  }

/*

  Cocktails(){
    this.http.get("https://the-cocktail-db.p.rapidapi.com//filter.php?i=rum",{
      headers: {'X-RapidAPI-Host':'the-cocktail-db.p.rapidapi.com','X-RapidAPI-Key':'3bc33d089amsh38c06fda1ea7f0cp14c6a3jsn6d16edc70aee'}}).subscribe((result)=>{
      this.cocktail = result;
      console.log(this.cocktail );
      //this.flag=false;
    },(error)=>{
      //this.flag = true;
    });
  }

  get getCocktails(){
    
    return this.http.get<Cocktail>("https://localhost:5001/api/v1/cocktails");
  }*/

  getProducts(): Observable<any> { 
    return this.http.get(endpoint,{headers: {'X-RapidAPI-Host':'the-cocktail-db.p.rapidapi.com','X-RapidAPI-Key':'3bc33d089amsh38c06fda1ea7f0cp14c6a3jsn6d16edc70aee'}});
  }

  getCocktails(): Observable<any> { 
    console.log(this.httpCredentials);
    return this.http.get("https://cloud-api-277011.appspot.com/api/v1/cocktails",{headers: {'Authorization':'Bearer ' + this.token}});
  }

  getCocktail(name):Observable<any>{
    return this.http.get("https://cloud-api-277011.appspot.com/api/v1/cocktails?name="+name,{headers: {'Authorization':'Bearer ' + this.token}});
  }

  getRandomCocktail():Observable<any>{
    return this.http.get("https://the-cocktail-db.p.rapidapi.com/random.php",{headers: {
    "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
    "x-rapidapi-key": "3bc33d089amsh38c06fda1ea7f0cp14c6a3jsn6d16edc70aee"}})
  }

  createCocktailInDB(): Observable<any>{
    var test = {"name": "testerr",
    "instructions": "test",
    "inventor": {
      "name":"The tester"
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

    const headers = {'Content-Type': 'application/json'};
    const body = {"name": "testerr",
    "instructions": "test",
    "inventor": {
      "name":"The tester"
    },
    "measurements": [
      {
        "ingredient":{
          "name": "passionfruit syrup"
        },
        "measurements": 15
      }
    ]};
    console.log("Post");
    return this.http.post("https://cloud-api-277011.appspot.com/api/v1/cocktails" , body ,{ headers } );
  }

  createCocktailTest(_cocktail): Observable<any>{
    const headers = {'Content-Type': 'application/json'};
    return this.http.post("https://cloud-api-277011.appspot.com/api/v1/cocktails" , _cocktail ,{ headers } );
  }

  updateCocktail(_cocktail): Observable<any>{
    return this.http.put("https://cloud-api-277011.appspot.com/api/v1/cocktails" , _cocktail ,{headers: {'Authorization':'Bearer ' + this.token, 'Content-Type' : 'application/json'}});
  }

  deleteCocktail(id): Observable<any>{
    return this.http.delete("https://cloud-api-277011.appspot.com/api/v1/cocktails/" + id );
  }
  getCocktailByName(name): Observable<any>{
    return this.http.get("https://cloud-api-277011.appspot.com/api/v1/cocktails?name="  + name,{headers: {'Authorization':'Bearer ' + this.token, 'Content-Type' : 'application/json'}});
  }

  requestToken(googleIdToken){
    return this.http.post("https://cloud-api-277011.appspot.com/api/v1/login?idToken=" +googleIdToken,{},{});
  }

  getSortedCocktails(sortingOn): Observable<any>{
    return this.http.get("https://cloud-api-277011.appspot.com/api/v1/cocktails?sort="+sortingOn+"&dir=" + this.sort,{headers: {'Authorization':'Bearer ' + this.token, 'Content-Type' : 'application/json'}});
  }

 

 

}
