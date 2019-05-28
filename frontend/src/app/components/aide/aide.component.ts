import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aide',
  templateUrl: './aide.component.html',
  styleUrls: ['./aide.component.css']
})
export class AideComponent implements OnInit {

  tutos: Array<Object>;

  selectedID: number;

  constructor() {
  }

  ngOnInit() {
    this.tutos = [
      {
        id: 0,
        menu: "Ajouter un certificat"
      },
      {
        id: 1,
        menu: "Ajouter un contact"
      },
      {
        id: 2,
        menu: "Modifier un certificat"
      }
    ]
  }
  hideAll(){
    let helpList = document.getElementsByClassName("helpSelected");

    for(let i = 0; i < helpList.length; i++){
      if(helpList[i].classList.contains("helpSelected")){
        helpList[i].classList.remove("helpSelected");
      }
    }
    if(document.getElementsByClassName("help-list-menu")[0].classList.contains("listSelected")){
      document.getElementsByClassName("help-list-menu")[0].classList.remove("listSelected");
    }
    this.selectedID = undefined;
  }

  displayHelp(id){
    this.hideAll();
    if(!document.getElementsByClassName("help-list-menu")[0].classList.contains("listSelected")){
      document.getElementsByClassName("help-list-menu")[0].classList.add("listSelected");
    }
    let item = document.getElementById("help" + id);
    if(!item.classList.contains("helpSelected")){
      item.classList.add("helpSelected");
    }
    this.selectedID = id;
  }


  hideHelp(id){
    let helpList = document.getElementsByClassName("helpSelected");
    let item = document.getElementById("help" + id);

    let isAllDesactivated = true;

    if(item.classList.contains("helpSelected")){
      item.classList.remove("helpSelected");
    }

    for(let i = 0; i < helpList.length; i++){
      if(helpList[i].classList.contains("helpSelected")){
        isAllDesactivated = false;
      }
    }

    if(document.getElementsByClassName("help-list-menu")[0].classList.contains("listSelected")){
      document.getElementsByClassName("help-list-menu")[0].classList.remove("listSelected");
    }
  }
}
