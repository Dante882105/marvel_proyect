import { ConectionsService } from './../../service/conections.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormControl, AsyncValidatorFn } from '@angular/forms';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  singnUpForm!: FormGroup<any>;
  public info!:any;
  public mailInfo!:any;
  public userInfo!:any;

  constructor(
    private readonly fb: FormBuilder,
    private _conectionsService: ConectionsService,
  ){
    this.mailInfo = {message: "Verify your email"};
    this.userInfo = {message: "Username is invalid, please do not use special characters (#, $, *, etc.) or type more than 4 and less than 15 characters"}
  }

  ngOnInit():void {
    this.singnUpForm = this.initForm();
  }

  get nameValidation(){
    return this.singnUpForm.get('firstName')?.invalid && this.singnUpForm.get('firstName')?.touched;
  }

  get lastNameValidation(){
    return this.singnUpForm.get('lastName')?.invalid && this.singnUpForm.get('lastName')?.touched;
  }

  get identificationValidation(){
    return this.singnUpForm.get('identification')?.invalid && this.singnUpForm.get('identification')?.touched;
  }

  get mailValidation(){
    return this.singnUpForm.get('email')?.invalid && this.singnUpForm.get('email')?.touched;
  }

  get usernameValidation(){
    return this.singnUpForm.get('username')?.invalid && this.singnUpForm.get('username')?.touched;
  }

  get passwordValidation(){
    return this.singnUpForm.get('password')?.invalid && this.singnUpForm.get('password')?.touched;
  }

  get confPasswordValidation(){
    return this.singnUpForm.get('confPassword')?.invalid && this.singnUpForm.get('confPassword')?.touched;
  }

  initForm():FormGroup {
    return this.fb.group(
      {
        firstName: ['', {
          validators:[Validators.required, Validators.pattern(/^[a-zA-ZÁ-ÿ\s]{4,40}$/)]}],
        lastName: ['', {
          validators:[Validators.required, Validators.pattern(/^[a-zA-ZÁ-ÿ\s]{4,40}$/)]}],
          identification: ['', {
          validators:[Validators.required, Validators.pattern(/^[a-zA-ZÁ-ÿ0-9\.\ ]{2,15}$/)]}],
        email: ['', {
          validators: [Validators.required, Validators.pattern(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)],
          asyncValidators: [this.checkMail(this._conectionsService)]}],
        username: ['', {
          validators: [Validators.required, Validators.pattern(/^[a-zA-Z0-9\_\-]{4,15}$/)], asyncValidators: [this.checkUser(this._conectionsService)]}],
        password: ['',{
          validators:[Validators.required, Validators.pattern(/^[a-zA-Z0-9\_\-\#\.\*\@]{4,15}$/)]}],
        confPassword: ['', {validators:[Validators.required, this.samePasswords('password', 'confPassword')]}]
      },
      {
        updateOn: 'blur',
        validators: [this.samePasswords('password', 'confPassword')]
      }
    )
  };

  samePasswords(passOne: string, passTow: string){
    return ((formGroup:FormControl)=>{
      const passOneControl = formGroup.get(passOne);
      const passTowControl = formGroup.get(passTow);
      if(passOneControl?.value === passTowControl?.value){
        return passTowControl?.setErrors(null);
      }else{
        return passTowControl?.setErrors({noEsIgual:true});
      }
    })
  };

  checkMail(conectionsService:ConectionsService):AsyncValidatorFn{
    return((control: AbstractControl)=>{
      const value = control.value;
      return conectionsService.findMail(value)
      .pipe(
        map(response => {
          this.mailInfo.message = response.message
          return response.exist ? {notAvailable: true}: null;
        })
      )
    });
  }

  checkUser(conectionsService:ConectionsService):AsyncValidatorFn{
    return((control: AbstractControl)=>{
      const value = control.value;
      return conectionsService.findUser(value)
      .pipe(
        map(response=>{
          this.userInfo.message = response.message;
          return response.exist === true ? {inUse: true}: null;
        })
      )
    })
  }

  onSubmit():void{

    if(this.singnUpForm.invalid){
      return Object.values(this.singnUpForm.controls).forEach(control=>{
        control.markAllAsTouched()
      })
    }

    this._conectionsService.singnUp(this.singnUpForm.value).subscribe({
      next: ((response)=>{
        this.info = response;
        this.singnUpForm.reset();
      }),
      error: ((error)=>{
        console.log('error linea 69 registro', error);
      })
    })
  };
}
