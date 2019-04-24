import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  dropMenu(){
    let dropdown_content = document.getElementsByClassName("dropdown_content")[0];
    if(dropdown_content.classList.contains("show") === true){
      dropdown_content.classList.remove("show");
    }else{
      dropdown_content.className += " show";
    }
  }
}
