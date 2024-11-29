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
  public answer: any;
  
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
    console.log("form => Enviado", this.loginForm);
    this._conectionsService.authenticate(this.loginForm.get('username')?.value, this.loginForm.get('password')?.value).subscribe({
      next: ((response)=>{
        console.log('Linea 34 de login',response);
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