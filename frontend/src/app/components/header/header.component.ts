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
    await this.keycloakService.loadUserProfile().then(data => {
      this.userName = data.username;
    });
  }

  logout(){
    console.log("ok");
    this.keycloakService.logout();
  }
}
