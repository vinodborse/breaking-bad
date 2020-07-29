import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  charactersData = [];
  fershPage = true;
  isSearchChar = false;
  isLoader = true;
  private baseUrl: string = "https://www.breakingbadapi.com/api/characters";
  constructor( private http: HttpClient) { }

  getAllChars() {
    this.fershPage = true;
    this.isLoader = false;
    this.http.get(this.baseUrl)
    .pipe(
      map(responseData => {
        const postsArray = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postsArray.push({...responseData[key], customId: key});
          }
        }
        return postsArray;
      })
    )
    .subscribe(data => {
        this.fershPage = false; 
        this.isLoader = true;
        this.charactersData = data;
        console.log(this.charactersData);

      }
    );
  }

  searchChar() {
    this.isSearchChar = !this.isSearchChar;
  }

  getChar(charName: string) {
    console.log(charName);
    this.http.get(this.baseUrl + "?name=" + charName)
    .pipe(
      map(responseData => {
        const postsArray = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postsArray.push({...responseData[key], customId: key});
          }
        }
        return postsArray;
      })
    )
    .subscribe(data => {
        this.fershPage = false; 
        this.charactersData = data;
        console.log(this.charactersData);
      }
    );
  }
}
