import { Component, OnInit } from '@angular/core';
import { Certificat } from '../../model/certificat';
import { CertificatService } from '../../service/certificat.service';
import { DateService } from '../../service/date.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-certificat-list',
  templateUrl: './certificat-list.component.html',
  styleUrls: ['./certificat-list.component.css']
})
export class CertificatListComponent implements OnInit {

  selectedCertificats: Certificat[];

  certificats: Certificat[];

  inDeletion: Certificat;

  constructor(private toastr: ToastrService, private certificatService: CertificatService, private dateService: DateService) { }

  ngOnInit() {
    this.certificats = [];
    this.certificatService.selectAll().subscribe(data => {
      this.certificats = data;
      this.orderByNotAfter();
      this.orderByFavoris();
    });

    this.selectedCertificats = [];
    this.inDeletion = undefined;
    this.certificats = [
      {
        id: 1,
        notBefore: new Date("March 13, 1995 03:24:00"),
        notAfter: new Date("November 19, 2022 03:22:00"),
        favoris: false,
        dn: "",
        additionnalMails:
          [
            {adresse: "test0@test.test", notifiable: true},
            {adresse: "test1@test.test", notifiable: false},
            {adresse: "test2@test.test", notifiable: true}
          ],
        notifications: [],
        notifyAll: true
      },
      {
        id: 2,
        notBefore: new Date("March 13, 1995 03:24:00"),
        notAfter: new Date("November 18, 2022 03:22:00"),
        favoris: true,
        dn: "",
        additionnalMails:
          [
            {adresse: "test0@test.test", notifiable: true},
            {adresse: "test1@test.test", notifiable: false},
            {adresse: "test2@test.test", notifiable: true}
          ],
        notifications: [],
        notifyAll: false
      },
      {
        id: 3,
        notBefore: new Date("March 13, 1995 03:24:00"),
        notAfter: new Date("November 15, 2022 03:22:00"),
        favoris: false,
        dn: "",
        additionnalMails:
          [
            {adresse: "test0@test.test", notifiable: true},
            {adresse: "test1@test.test", notifiable: false},
            {adresse: "test2@test.test", notifiable: true}
          ],
        notifications: [],
        notifyAll: true
      },
      {
        id: 4,
        notBefore: new Date("March 13, 1995 03:24:00"),
        notAfter: new Date("November 15, 2022 03:22:00"),
        favoris: false,
        dn: "",
        additionnalMails:
          [
            {adresse: "test0@test.test", notifiable: true},
            {adresse: "test1@test.test", notifiable: false},
            {adresse: "test2@test.test", notifiable: true}
          ],
        notifications: [],
        notifyAll: true
      },
      {
        id: 5,
        notBefore: new Date("March 13, 1995 03:24:00"),
        notAfter: new Date("November 15, 2022 03:22:00"),
        favoris: false,
        dn: "",
        additionnalMails:
          [
            {adresse: "test0@test.test", notifiable: true},
            {adresse: "test1@test.test", notifiable: false},
            {adresse: "test2@test.test", notifiable: true}
          ],
        notifications: [],
        notifyAll: false
      },
      {
        id: 6,
        notBefore: new Date("November 17, 1995 03:24:00"),
        notAfter: new Date("December 15, 1995 03:22:00"),
        favoris: true,
        dn: "",
        additionnalMails:
          [
            {adresse: "test3@test.test", notifiable: true}
          ],
        notifications: [],
        notifyAll: true
      }
    ];
  }

  orderByNotAfter(){
    this.certificats.sort(function(a, b){
      return (new Date(a.notAfter).getTime() - new Date(b.notAfter).getTime());
    });
  }

  orderByFavoris(){
    let notSortedArray = this.certificats;
    let sortedArray = new Array();
    let index = 0;
    notSortedArray.forEach(function(certificat){
      if(certificat.favoris === true){
        sortedArray.push(certificat);
      }
    });
    notSortedArray.forEach(function(certificat){
      if(certificat.favoris === false){
        sortedArray.push(certificat);
      }
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
    let cert;
    for(let i = 0; i < this.certificats.length; i++){
      if(this.certificats[i].id != id){
        certs[idx] = this.certificats[i];
        idx ++;
        cert = this.certificats[i];
      }
    }
    this.certificats = certs;
    this.certificatService.delete(id).subscribe();
    this.toastr.success('\"' + this.getInformations(cert).cn + '\" supprimé avec succès !!!');
  }

  verifyDelete(certificat: Certificat){
    this.inDeletion = certificat;

    let shadow = document.getElementsByClassName("shadow")[0];
    let verifySuppr = document.getElementsByClassName("verify-suppr")[0];

    shadow.setAttribute("style", "display:inline");
    verifySuppr.setAttribute("style", "display:flex");
  }

  verifySelectDelete(){
    let shadow = document.getElementsByClassName("shadow")[0];
    let verifySuppr = document.getElementsByClassName("verify-suppr")[0];

    shadow.setAttribute("style", "display:inline");
    verifySuppr.setAttribute("style", "display:flex");
  }

  closeVerifySuppr(){
    let shadow = document.getElementsByClassName("shadow")[0];
    let verifySuppr = document.getElementsByClassName("verify-suppr")[0];

    shadow.setAttribute("style", "display:none");
    verifySuppr.setAttribute("style", "display:none");
    this.inDeletion = undefined;
  }

  verifySupprDelete(){
    let shadow = document.getElementsByClassName("shadow")[0];
    let verifySuppr = document.getElementsByClassName("verify-suppr")[0];
    shadow.setAttribute("style", "display:none");
    verifySuppr.setAttribute("style", "display:none");

    if(this.inDeletion != undefined){
      let id = this.inDeletion.id;
      this.delete(id);
      this.inDeletion = undefined;
    }else{
      this.selectedToDelete();
    }
  }

  deleteWithoutToastr(id:number){
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

  checkBoxHandler(certificat, event){
    if(event === true){
      this.selectedCertificats.push(certificat)
    }else{
      let exit = false;
      let i = 0;
      while(i < this.selectedCertificats.length && exit === false){
        if(this.selectedCertificats[i].id === certificat.id){
          this.selectedCertificats.splice(i, 1);
          exit = true;
        }
        i++;
      }
    }
  }

  selectedToFavoris(){
    this.selectedCertificats.forEach(function(cert){
      cert.favoris = true;
    });
    this.certificatService.saveAll(this.selectedCertificats).subscribe();
    this.orderByFavoris();
  }

  selectedToNotFavoris(){
    this.selectedCertificats.forEach(function(cert){
      cert.favoris = false;
    });
    this.certificatService.saveAll(this.selectedCertificats).subscribe();
    this.orderByFavoris();
  }

  selectedToDelete(){
    let nbr = 0;
    for(let i = 0; i < this.selectedCertificats.length; i++){
      this.deleteWithoutToastr(this.selectedCertificats[i].id);
      nbr ++;
    }
    this.toastr.success(nbr + ' certificat supprimé avec succès !!!');
  }

  getInformations(certificat: Certificat){
    return this.certificatService.getInformations(certificat);
  }
}
