import { Component, OnInit } from '@angular/core';
import { Certificat } from '../../model/certificat';
import { CertificatService } from '../../service/certificat.service';
import { Mail } from '../../model/mail';

@Component({
  selector: 'app-url-form',
  templateUrl: './url-form.component.html',
  styleUrls: ['./url-form.component.css']
})
export class UrlFormComponent implements OnInit {
  certificats: Certificat[];
  submitted = false;
  urlString: string;
  subcerts: Certificat[];
  constructor(private certificatService: CertificatService) { }

  ngOnInit() {}

  onSubmit(form){
    this.submitted = true;
    this.urlString = form.urlString;
    this.certificatService.selectFromUrl(this.urlString).subscribe(data => {
      this.certificats = data;
    });
  }

  saveOnSubmit(form){
    let checks = Object.values(form.value);
    let res = new Array();
    for(let i = 0; i < checks.length; i ++){
      if(checks[i] === true){
        res.push(this.certificats[i]);
      }
    }
    this.certificatService.saveAll(res).subscribe();
  }
}
