# Back Nodejs
## Librerías
* express (Generación del servidor)
* mongoose (Conexión a base de datos de MongoDB)
* cors (Para proceso de autenticación y permisos)
* body-parser (tomar las peticiones http)
## Rutas de navegación con Nodejs

```
'use strict'
var express = require("express");//Se requiere express
var controller = require("../controllers/controller.js");//Se requiere el controlador


var router = express.Router();//Se usa Router de express para crearlas

router.post('/register-user', controller.registerUser);
router.get('/find-user/:username?', controller.findUser);
router.get('/find-mail/:mail', controller.findMail);
router.post('/contact-us', controller.contact);
router.get('/authenticate/:username/:password', controller.authenticate);//Debe ser Post para no mostrar info sensible del usuario

module.exports = router;
```
## Servidor en Node
```
'use strict'
const Route = require("url_de_las_rutas");
var routerLink = Route.data.dataCors;//Uso de cors
const express = require("express")//librería usada para generar el servidor con Node;
const bodyParser = require("body-parser");
const cors = require("cors");//Usado para autenticación o permisos según se requiera

const app = express();

const Routes = require('url_importación_de_las_rutas');

//middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//CORS
app.use(cors(routerLink));

//rutas
app.use('/api', Routes);

module.exports = app;
```
## Conectar a MongoDB
```
'use strict'
const Route = require("ruta_donde_se_almacenan_las_rutas");
var app = require('url_del_servidor_creado_en_node');
var port = puerto_para_nodejs;
const uri = "mongodb://url_mongo:puerto/nombre_de_la_base";

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(uri)
    .then(()=> {
        console.log('CONECTADO A MONGO');
        app.listen(port, ()=>{
            console.log("servidor corriendo correctamente en: " + uri)
        });
    })
    .catch((err)=> console.log("Error "+err))
```
## Modelos para MongoDB
```
"use strict"
var mongoose = require("mongoose");
var Schema = mongoose.Schema;//Crear un Schema de mongoose

var dataSchema = new Schema(
    {
        firstName: String,
        lastName:String,
        password:String,
        identification:String,
        email:String,
        username:String
    },
    {
        //Nombre de la collección en Mongo DB
        collection: "userDirectory",
        versionKey: false
    }
);

module.exports = mongoose.model('User', nuxeoSchema);
```
## Controlador
```
'use strict'
const Route = require("url_de_constantes_para_navegación");
var User = require("ruta_de_los_modelos");
var Client = require("ruta_de_los_modelos");
var controller = {

    registerUser: async (req, res)=>{
        var user = new User();
        var params = req.body;

        user.firstName = params.firstName;
        user.lastName = params.lastName;
        user.identification = params.identification;
        user.email = params.email;
        user.username = params.username;
        user.password = params.password;
        user.save((err, userStored)=>{
            if(err) return res.status(500).send({
                message: 'Se presentó un error',
                status: res.status
            });
            if(!userStored) res.status(400).send({ 
                message: "Failed to save user",
                status: res.status
            });
            res.status(200).send({
                message: "Your registration was successful",
                status: res.status
            })
        })
    },
    authenticate: async function(req,res){
        let username = req.params.username;
        let password = req.params.password;

        User.findOne({username: username}, function (err, user){

            if(!user){
                res.status(404).send({
                    message: "User not found, try again",
                    exist: false,
                    data: user
                })
            }else if(err){
                res.status(500).send({
                    exist: false,
                    message: "An error occurred, please try again late",
                    data: err
                });
            }else{
                if(user.password === password){
                    return res.status(200).send({
                        message: "Welcome "+user.username,
                        user: user.username,
                        exist: true
                    })
                }else if(user.password != password){
                    return res.status(404).send({
                        message: "Could not login, please check your password",
                        exist: false
                    })
                }
            }
        });
    }
}
```
# Front Angular
## Servicios
Utilizados para manejo de información y alimentación de los componentes con ellas.
```
//librerías usadas para el manejo de las peticiones y promesas
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from 'url_de_conexión_al_back';//Normalmente almacenada en una constante
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
};
```
## Manejo de información en los componentes
```
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConectionsService } from 'src/app/service/conections.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup<any>;
  public info: any;
  
  constructor(
    private readonly fb: FormBuilder,
    private _conectionsService: ConectionsService
  ){
    this.info = {
      exist: false
    }
   }

  ngOnInit():void {
    this.loginForm = this.initForm();
  }

  get usernameValidation(){
    return this.loginForm.get('username')?.invalid && this.loginForm.get('username')?.touched;
  }

  get passwordValidation(){
    return this.loginForm.get('password')?.invalid && this.loginForm.get('password')?.touched;
  }

  onSubmit():void{
    this._conectionsService.authenticate(this.loginForm.get('username')?.value, this.loginForm.get('password')?.value).subscribe({
      next: ((response)=>{
        this.info = response;
        localStorage.setItem('username', this.info.user)
        this.loginForm.reset();
      }),
      error: ((response)=>{
        this.info = response.error
      })
    });
  };

  initForm():FormGroup {
    return this.fb.group(
      {
        username: ['',[Validators.required, Validators.pattern(/^[a-zA-Z0-9\_\-]{4,15}$/)]],
        password: ['',[Validators.required, Validators.pattern(/^[a-zA-Z0-9\_\-\#\.\*\@]{4,15}$/)]]
      }
    )
  };
}
```
## Sistema de Rutas Angular
```
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactusComponent } from './components/contactus/contactus.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PersonalSideComponent } from './components/personal-side/personal-side.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'singn-up', component: RegisterComponent},
  {path: 'contact-us', component: ContactusComponent},
  {path: 'personal-site', component: PersonalSideComponent},
  {path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```
## Manejo de Modulos (Hasta Angular 16)
```
import { ApiMarvelService } from './service/api-marvel.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { RegisterComponent } from './components/register/register.component';
import { PersonalSideComponent } from './components/personal-side/personal-side.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    ContactusComponent,
    RegisterComponent,
    PersonalSideComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```