import { Component, OnInit } from '@angular/core';
import { Certificat } from '../../model/certificat';
import { CertificatService } from '../../service/certificat.service';

@Component({
  selector: 'app-url-form',
  templateUrl: './url-form.component.html',
  styleUrls: ['./url-form.component.css']
})
export class UrlFormComponent implements OnInit {
  certificats: Certificat[];
  submitted = false;
  urlString: String;

  constructor() { }

  ngOnInit() {
  }

  onSubmit(url){
    this.submitted = true;
    this.urlString = url;
    this.certificatService.getFromUrl(url).subscribe(data => {
      this.certificats = data;
    });
  }
}
