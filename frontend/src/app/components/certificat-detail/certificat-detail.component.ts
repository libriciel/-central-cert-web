import { Component, OnInit, Input } from '@angular/core';
import { Certificat } from '../../model/certificat';
import { CertificatService } from '../../service/certificat.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-certificat-detail',
  templateUrl: './certificat-detail.component.html',
  styleUrls: ['./certificat-detail.component.css']
})
export class CertificatDetailComponent implements OnInit {
  certificat: Certificat;

  constructor(private certificatService: CertificatService, private route: ActivatedRoute) { }

  ngOnInit() {
    /*let id = this.route.snapshot.params['id'] * 1;
    console.log(id);
    this.certificatService.select(id).subscribe(data => {
      console.log(data);
      this.certificat = data;
    });*/

    this.certificat = {
      id: 1,
      notBefore: new Date("March 13, 1995 03:24:00"),
      notAfter: new Date("November 19, 2022 03:22:00"),
      favoris: true,
      dn: {
        cn: "cn",
        mail: "mail",
        o: "o",
        ou: "ou",
        l: "l",
        st: "st",
        c: "c",
        t: "t",
        dc: "dc",
        street: "street",
        pc: "pc"
      },
      additionnalMails: [
        {
          adresse: "test0@test.test",
          notifiable: true
        },
        {
          adresse: "test1@test.test",
          notifiable: false
        },
        {
          adresse: "test2@test.test",
          notifiable: true
        }
      ],
      notifications: []
    }
  }
}
