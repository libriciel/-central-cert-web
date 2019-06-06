import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpEvent} from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  changePassURL: string;
  token: string;

  constructor(private keycloakService: KeycloakService, private http: HttpClient) {
  }

  ngOnInit() {
  }
}
