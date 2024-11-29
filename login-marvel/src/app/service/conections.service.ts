import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ConectionsService {
  public url: string;
  record!: FormGroup<any>;
  public headers: HttpHeaders;

  constructor(
    private _http: HttpClient
  ) {
    this.url = Global.url;
    this.headers = new HttpHeaders().set('Content-Type', 'application/json')
  }

  singnUp(record:FormGroup):Observable<any>{
    let params = JSON.stringify(record);
    return this._http.post(this.url+'register-user', params, {headers: this.headers});
  };

  contactUs(contact:FormGroup): Observable<any>{
    let params = JSON.stringify(contact);
    return this._http.post(this.url+'contact-us', params, {headers: this.headers})
  };

  findMail(mail:string):Observable<any>{
    return this._http.get(this.url+'find-mail/'+mail, {headers: this.headers})
  };

  findUser(userName:string):Observable<any>{
    return this._http.get(this.url+'find-user/'+userName, {headers: this.headers})
  };

  authenticate(username:string, password:string):Observable<any>{
    return this._http.get(this.url+'authenticate/'+username+'/'+password, {headers: this.headers})
  };
}
