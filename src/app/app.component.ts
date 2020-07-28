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

  private url: string = "https://www.breakingbadapi.com/api/characters";
  constructor( private http: HttpClient) { }

  getData() {
    this.http.get(this.url)
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
        this.charactersData = data;
        console.log(this.charactersData);
      }
    );
  }
}
