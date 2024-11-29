import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {map, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiMarvelService {

  constructor(
    public _http:HttpClient
  ) { }

  public getComics(){
    let PUBLIC_KEY = '0a2afee85ec52df1f4876fbf810b127b';
    let HASH = '10c05813bf02852c89c74bfd3d6368a4';
    let URL_API = `https:gateway.marvel.com/v1/public/comics?ts=1&apikey=${PUBLIC_KEY}&hash=${HASH}`

    return this._http.get(URL_API).pipe(
      map((res: any) => {
        console.log("response", res);
        return res;
      }),
      retry(0)
    );
  }
}
