import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  
  ngOnInit(): void {
    this.windowScreen();
  }

  toggleLanguage(){
    let strongs = document.querySelectorAll('#lenguage strong');
    strongs.forEach((strong)=>{
      strong.classList.toggle('d-none')
    })
  }
  
  windowScreen(){
    if(window.screen.width < 600){
      let list = document.querySelectorAll('#navContainer ul li');
      list.forEach((li)=>{
        li.addEventListener("click", ()=>{
          console.log(li)
          let navbar = document.getElementById('navContainer');navbar?.classList.remove('show');
          navbar?.classList.add('collapse');
        })
      })
    }
  }
}
