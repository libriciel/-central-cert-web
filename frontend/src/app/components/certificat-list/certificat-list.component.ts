import { Component, OnInit } from '@angular/core';
import { Certificat } from '../../model/certificat';
import { CertificatService } from '../../service/certificat.service';

@Component({
  selector: 'app-certificat-list',
  templateUrl: './certificat-list.component.html',
  styleUrls: ['./certificat-list.component.css']
})
export class CertificatListComponent implements OnInit {

  certificats: Certificat[];
  /*mails1: Mail[];
  mails2: Mail[];
  mails3: Mail[];
  mails4: Mail[];
*/
  selectedCertificat: Certificat;

  constructor(private certificatService: CertificatService) { }

  ngOnInit() {
    this.certificatService.selectAll().subscribe(data => {
      console.log(data);
      this.certificats = data;
    });
    /*
    this.mails1 = [
      {id: 1, adresseMail:"truc1@truc.truc"},
      {id: 2, adresseMail:"truc2@truc.truc"}
    ]

    this.mails2 = [
      {id: 3, adresseMail:"truc3@truc.truc"},
      {id: 4, adresseMail:"truc4@truc.truc"},
      {id: 5, adresseMail:"truc5@truc.truc"}
    ]

    this.mails3 = [
      {id: 6, adresseMail:"truc6@truc.truc"}
    ]

    this.mails4 = [
      {id: 7, adresseMail:"truc7@truc.truc"},
      {id: 8, adresseMail:"truc8@truc.truc"},
      {id: 9, adresseMail:"truc9@truc.truc"}
    ]

    this.certificats = [
      {id: 1, notBefore: new Date("November 16, 1995 03:24:00"), notAfter: new Date("December 16, 1995 03:24:00"), mails: this.mails1},
      {id: 2, notBefore: new Date("November 17, 1995 03:24:00"), notAfter: new Date("December 17, 1995 03:24:00"), mails: this.mails2},
      {id: 3, notBefore: new Date("November 18, 1995 03:24:00"), notAfter: new Date("December 18, 1995 03:24:00"), mails: this.mails3},
      {id: 4, notBefore: new Date("November 19, 1995 03:24:00"), notAfter: new Date("December 19, 1995 03:24:00"), mails: this.mails4}
    ]*/
  }

  onSelect(certificat: Certificat): void {
    this.selectedCertificat = certificat;
  }

  delete(id:number){
    let certs = [];
    let idx = 0;
    for(let i = 0; i < this.certificats.length; i++){
      if(this.certificats[i].id != id){
        certs[idx] = this.certificats[i];
        idx ++;
      }
    }
    this.certificats = certs;
    this.certificatService.delete(id).subscribe();
  }

  deleteAll(){
    this.certificatService.deleteAll().subscribe();
    this.certificats = [];
  }
}
