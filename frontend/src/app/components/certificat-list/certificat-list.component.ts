import { Component, OnInit } from '@angular/core';
import { Certificat } from '../../model/certificat';
import { CertificatService } from '../../service/certificat.service';
import { DateService } from '../../service/date.service';
@Component({
  selector: 'app-certificat-list',
  templateUrl: './certificat-list.component.html',
  styleUrls: ['./certificat-list.component.css']
})
export class CertificatListComponent implements OnInit {

  certificats: Certificat[];

  constructor(private certificatService: CertificatService, private dateService: DateService) { }

  ngOnInit() {
    /*this.certificatService.selectAll().subscribe(data => {
      console.log(data);
      this.certificats = data;
    });*/

    this.certificats = [
      {
        id: 1,
        notBefore: new Date("March 13, 1995 03:24:00"),
        notAfter: new Date("November 19, 2022 03:22:00"),
        favoris: false,
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
        additionnalMails:
          [
            {adresse: "test0@test.test", notifiable: true},
            {adresse: "test1@test.test", notifiable: false},
            {adresse: "test2@test.test", notifiable: true}
          ],
        notifications: []
      },
      {
        id: 2,
        notBefore: new Date("March 13, 1995 03:24:00"),
        notAfter: new Date("November 18, 2022 03:22:00"),
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
        additionnalMails:
          [
            {adresse: "test0@test.test", notifiable: true},
            {adresse: "test1@test.test", notifiable: false},
            {adresse: "test2@test.test", notifiable: true}
          ],
        notifications: []
      },
      {
        id: 3,
        notBefore: new Date("March 13, 1995 03:24:00"),
        notAfter: new Date("November 15, 2022 03:22:00"),
        favoris: false,
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
        additionnalMails:
          [
            {adresse: "test0@test.test", notifiable: true},
            {adresse: "test1@test.test", notifiable: false},
            {adresse: "test2@test.test", notifiable: true}
          ],
        notifications: []
      },
      {
        id: 4,
        notBefore: new Date("November 17, 1995 03:24:00"),
        notAfter: new Date("December 15, 1995 03:22:00"),
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
        additionnalMails:
          [
            {adresse: "test3@test.test", notifiable: true}
          ],
        notifications: []
      }
    ]

    this.orderByNotAfter();
    this.orderByFavoris();
  }

  orderByNotAfter(){
    this.certificats.sort(function(a, b){
      return (a.notAfter.getTime() - b.notAfter.getTime());
    });
  }

  orderByFavoris(){
    let notSortedArray = this.certificats;
    let sortedArray = new Array();
    let index = 0;
    notSortedArray.forEach(function(certificat){
      if(certificat.favoris === true){
        sortedArray.push(certificat);
        notSortedArray.splice(index, 1);
      }
      index ++;
    });
    notSortedArray.forEach(function(certificat){
      sortedArray.push(certificat);
    });
    this.certificats = sortedArray;
  }

  getDate(d: Date){
    return this.dateService.format(d);
  }

  getRemTime(c: Certificat){
    return this.dateService.getRemainingTime(c);
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

  favorize(certificat){
    if(certificat.favoris === true){
      certificat.favoris = false;
    }else{
      certificat.favoris = true;
    }
    this.orderByFavoris();
    this.certificatService.save(certificat).subscribe();
  }
}
