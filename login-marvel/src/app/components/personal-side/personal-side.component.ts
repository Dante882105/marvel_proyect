import { Component } from '@angular/core';
import { ApiMarvelService } from 'src/app/service/api-marvel.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-personal-side',
  templateUrl: './personal-side.component.html',
  styleUrls: ['./personal-side.component.css']
})
export class PersonalSideComponent {
  title = 'marvelApp';
  loader = true;

  public comics: Array<any> = [];

  constructor(private ApiMarvelSvc: ApiMarvelService){ }
  allComics?: Observable<any>;

  ngOnInit(): void {
    this.ApiMarvelSvc.getComics().subscribe((res) => {
      console.log('Respuesta', res);
      this.comics = res.data.results;
      this.loader = false;
    });
  }

}
