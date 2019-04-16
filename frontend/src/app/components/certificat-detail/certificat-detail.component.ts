import { Component, OnInit, Input } from '@angular/core';
import { Certificat } from '../../model/certificat';
import { CertificatService } from '../../service/certificat.service';

@Component({
  selector: 'app-certificat-detail',
  templateUrl: './certificat-detail.component.html',
  styleUrls: ['./certificat-detail.component.css']
})
export class CertificatDetailComponent implements OnInit {
  @Input() certificat: Certificat;

  constructor(private certificatService: CertificatService) { }

  ngOnInit() {
  }

  updateOnSubmit(form){
    console.log(form);
  }

  addMailOnSubmit(form){
    let exists = false;
    for(let i = 0; i < this.certificat.mails.length; i++){
      if(this.certificat.mails[i] === form.addMailInput){
        exists = true;
      }
    }
  }
}
