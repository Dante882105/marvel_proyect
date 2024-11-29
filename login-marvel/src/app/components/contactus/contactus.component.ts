import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ConectionsService } from 'src/app/service/conections.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit{
  contactUsForm!: FormGroup<any>;
  public info!:any;

  constructor(
    private readonly fb:FormBuilder,
    private _conectionsService: ConectionsService
  ){}

  ngOnInit(): void {
      this.contactUsForm = this.initForm();
  };

  onSubmit(){
    console.log("Hola Mundo");
    this._conectionsService.contactUs(this.contactUsForm.value).subscribe({
      next: ((response)=>{
        this.info = response;
        this.contactUsForm.reset();
      }),
      error: ((error)=>{
        console.log('error linea 30 contactus', error)
      })
    })
  }

  get nameValidation(){
    return this.contactUsForm.get('name')?.invalid && this.contactUsForm.get('name')?.touched;
  };

  get identificationValidation(){
    return this.contactUsForm.get('identification')?.invalid && this.contactUsForm.get('identification')?.touched;
  };

  get countryValidation(){
    return this.contactUsForm.get('country')?.invalid && this.contactUsForm.get('country')?.touched;
  };

  get mailValidation(){
    return this.contactUsForm.get('mail')?.invalid && this.contactUsForm.get('mail')?.touched;
  };

  get messageValidation(){
    return this.contactUsForm.get('message')?.invalid && this.contactUsForm.get('message')?.touched
  };

  initForm():FormGroup{
    return this.fb.group(
      {
        name: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÁ-ÿ\s]{4,40}$/)]],
        identification: ['', [Validators.pattern(/^[a-zA-ZÁ-ÿ\s]{4,40}$/)]],
        country: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÁ-ÿ\.\ ]{2,15}$/)]],
        mail: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)]],
        message: ['', [Validators.pattern(/^[a-zA-ZÁ-ÿ0-9\.\¿\?\,\¡\!\'\ ]{1,150}$/)]]
      }
    )
  };
}
