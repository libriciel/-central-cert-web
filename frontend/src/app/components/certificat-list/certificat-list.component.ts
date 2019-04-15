import { Component, OnInit } from '@angular/core';
import { Certificat } from '../../model/certificat';
import { Mail } from '../../model/mail';
import { CertificatService } from '../../service/certificat.service';

@Component({
  selector: 'app-certificat-list',
  templateUrl: './certificat-list.component.html',
  styleUrls: ['./certificat-list.component.css']
})
export class CertificatListComponent implements OnInit {

  certificats: Certificat[];
  mailsTest: Mail[];
  selectedCertificat: Certificat;

  constructor(private certificatService: CertificatService) { }

  ngOnInit() {
    /*this.certificatService.findAll().subscribe(data => {
      this.certificats = data;
    });*/

    this.mailsTest = [
      {id:1, adresseMail:"truc1@truc.truc"},
      {id:2, adresseMail:"truc2@truc.truc"},
      {id:3, adresseMail:"truc3@truc.truc"}
    ]
    this.certificats = [
      {notBefore:new Date("2019-03-15T00:00:00.000+0000"),notAfter:new Date("2020-04-01T12:00:00.000+0000"),id:1,mails:this.mailsTest},
      {notBefore:new Date("2013-03-08T12:00:00.000+0000"),notAfter:new Date("2023-03-08T12:00:00.000+0000"),id:2,mails:this.mailsTest},
      {notBefore:new Date("2018-06-27T00:00:00.000+0000"),notAfter:new Date("2019-06-27T12:00:00.000+0000"),id:3,mails:this.mailsTest},
      {notBefore:new Date("2013-03-08T12:00:00.000+0000"),notAfter:new Date("2023-03-08T12:00:00.000+0000"),id:4,mails:this.mailsTest},
      {notBefore:new Date("2019-03-01T09:43:57.000+0000"),notAfter:new Date("2019-05-24T09:25:00.000+0000"),id:5,mails:this.mailsTest},
      {notBefore:new Date("2017-06-15T00:00:42.000+0000"),notAfter:new Date("2021-12-15T00:00:42.000+0000"),id:6,mails:this.mailsTest}
    ];
  }

  onSelect(certificat: Certificat): void {
    this.selectedCertificat = certificat;
  }

}
