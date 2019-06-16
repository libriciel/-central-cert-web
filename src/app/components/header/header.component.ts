import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userName: string;

  constructor(private keycloakService: KeycloakService) { }

  async ngOnInit() {
    //récupère les informations de l'utilisateur Keycloak à l'initialisation
    await this.keycloakService.loadUserProfile().then(data => {
      this.userName = data.username;
    });
  }

  //déconnecte l'utilisateur
  logout(){
    this.keycloakService.logout();
  }

  onHover(element){
    element.src = "/assets/images/logos/logo_centralcert_white_color.svg"
  }

  onQuitHover(element){
    element.src = "/assets/images/logos/logo_centralcert_white.svg"
  }
}
