import { Component, OnInit } from '@angular/core';
import { Certificat } from '../../model/certificat';
import { CertificatService } from '../../service/certificat.service';
import { DateService } from '../../service/date.service';
import { ToastrService } from 'ngx-toastr';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-certificat-list',
  templateUrl: './certificat-list.component.html',
  styleUrls: ['./certificat-list.component.css']
})
export class CertificatListComponent implements OnInit {

  certificats: Certificat[];

  selectedCertificats: Certificat[];

  detailledCertificat: Certificat;

  inDeletion: Certificat;

  contactPressed: Certificat;

  page: Certificat[];

  pageNumber: number;

  constructor(private toastr: ToastrService, private certificatService: CertificatService, private dateService: DateService) { }

  ngOnInit() {
    this.certificats = [];
    this.certificats = [
      {
        id: 1,
        notBefore: new Date("December 17, 1800"),
        notAfter: new Date("December 17, 2027"),
        favoris: false,
        dn: "CN=Libriciel COOP1",
        additionnalMails: [],
        notifyAll: false,
        notified: false,
      },
      {
        id: 2,
        notBefore: new Date("April 8, 2019"),
        notAfter: new Date("September 6, 2019"),
        favoris: false,
        dn: "CN=Libriciel COOP2",
        additionnalMails: [],
        notifyAll: false,
        notified: false,
      },
      {
        id: 3,
        notBefore: new Date("April 8, 2019"),
        notAfter: new Date("June 9, 2019"),
        favoris: false,
        dn: "CN=Libriciel COOP3",
        additionnalMails: [],
        notifyAll: false,
        notified: false,
      },
      {
        id: 4,
        notBefore: new Date(),
        notAfter: new Date(),
        favoris: false,
        dn: "CN=Libriciel COOP4",
        additionnalMails: [],
        notifyAll: false,
        notified: false,
      },
      {
        id: 5,
        notBefore: new Date(),
        notAfter: new Date(),
        favoris: false,
        dn: "CN=Libriciel COOP5",
        additionnalMails: [],
        notifyAll: false,
        notified: false,
      },
      {
        id: 6,
        notBefore: new Date(),
        notAfter: new Date(),
        favoris: false,
        dn: "CN=Libriciel COOP6",
        additionnalMails: [],
        notifyAll: false,
        notified: false,
      },
      {
        id: 7,
        notBefore: new Date(),
        notAfter: new Date(),
        favoris: false,
        dn: "CN=Libriciel COOP7",
        additionnalMails: [],
        notifyAll: false,
        notified: false,
      },
      {
        id: 8,
        notBefore: new Date(),
        notAfter: new Date(),
        favoris: false,
        dn: "CN=Libriciel COOP8",
        additionnalMails: [],
        notifyAll: false,
        notified: false,
      },
      {
        id: 9,
        notBefore: new Date(),
        notAfter: new Date(),
        favoris: false,
        dn: "CN=Libriciel COOP9",
        additionnalMails: [],
        notifyAll: false,
        notified: false,
      },
      {
        id: 10,
        notBefore: new Date(),
        notAfter: new Date(),
        favoris: false,
        dn: "CN=Libriciel COOP10",
        additionnalMails: [],
        notifyAll: false,
        notified: false,
      },
      {
        id: 11,
        notBefore: new Date(),
        notAfter: new Date(),
        favoris: false,
        dn: "CN=Libriciel COOP11",
        additionnalMails: [],
        notifyAll: false,
        notified: false,
      },
      {
        id: 12,
        notBefore: new Date(),
        notAfter: new Date(),
        favoris: false,
        dn: "CN=Libriciel COOP12",
        additionnalMails: [],
        notifyAll: false,
        notified: false,
      },
      {
        id: 13,
        notBefore: new Date(),
        notAfter: new Date(),
        favoris: false,
        dn: "CN=Libriciel COOP13",
        additionnalMails: [],
        notifyAll: false,
        notified: false,
      },
    ];
    this.selectedCertificats = [];
    this.inDeletion = undefined;
    this.pageNumber = 1;
    this.actualiseCertList();
  }

  actualiseCertList(){
    this.certificatService.selectAll().subscribe(data => {
      //this.certificats = data;
      this.dateDesc();
      this.orderByFavoris();
      this.page = this.getActualPage();
      this.actualisePageIndication();
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

  toDetail(certificat){
    this.detailledCertificat = certificat;
  }

  removeDetailled(){
    this.contactPressed = undefined;
    this.detailledCertificat = undefined;
    this.actualiseCertList();
  }

  toContact(certificat: Certificat){
    this.detailledCertificat = certificat;
    this.contactPressed = certificat;
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
    this.certificatService.delete(id).subscribe(data => {
      this.actualiseCertList();
    });
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
    this.certificatService.delete(id).subscribe(data => {
      this.actualiseCertList();
    });
  }

  deleteAll(){
    this.certificatService.deleteAll().subscribe(data => {
      this.actualiseCertList();
    });
    this.certificats = [];
  }

  favorize(certificat){
    if(certificat.favoris === true){
      certificat.favoris = false;
    }else{
      certificat.favoris = true;
    }
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

  toggleAll(event){
    let checks = document.getElementsByClassName('selectingCheckbox');

    if(event === true){
      for(let i = 0; i < checks.length; i++){
        checks[i].checked = true;
      }
      this.selectedCertificats = this.certificats;
    }else{
      for(let i = 0; i < checks.length; i++){
        checks[i].checked = false;
      }
      this.selectedCertificats = [];
    }
  }

  selectedToFavoris(){
    this.selectedCertificats.forEach(function(cert){
      cert.favoris = true;
    });
    this.certificatService.saveAll(this.selectedCertificats).subscribe();
    this.toastr.success(this.selectedCertificats.length + ' certificats ont été ajouéts aux favoris');
  }

  selectedToNotFavoris(){
    this.selectedCertificats.forEach(function(cert){
      cert.favoris = false;
    });
    this.certificatService.saveAll(this.selectedCertificats).subscribe();
    this.toastr.success(this.selectedCertificats.length + ' certificats ont été retirés des favoris');
  }

  selectedToDelete(){
    let nbr = 0;
    for(let i = 0; i < this.selectedCertificats.length; i++){
      this.deleteWithoutToastr(this.selectedCertificats[i].id);
      nbr ++;
    }
    this.selectedCertificats = [];
    this.toastr.success(nbr + ' certificat supprimé avec succès !!!');
  }

  getInformations(certificat: Certificat){
    return this.certificatService.getInformations(certificat);
  }

  getActualPage(){
    return this.getPage(this.pageNumber);
  }

  getPage(num: number){
    let resPage = new Array();
    let min = num * 10 - 10;
    let max = num * 10;
    if(max > this.certificats.length){
      max = this.certificats.length;
    }
    for(let i = min; i < max; i++){
      resPage.push(this.certificats[i]);
    }
    return resPage;
  }

  canPreviousPage(){
    if(this.pageNumber > 1){
      return true;
    }else{
      return false;
    }
  }

  canNextPage(){
    if(this.pageNumber * 10 < this.certificats.length){
      return true;
    }else{
      return false;
    }
  }

  nextPage(){
    if(this.pageNumber * 10 < this.certificats.length){
      this.pageNumber ++;
      this.page = this.getActualPage();
    }
  }

  previousPage(){
    if(this.pageNumber > 1){
      this.pageNumber --;
      this.page = this.getActualPage();
    }
  }

  actualisePageIndication(){
    let paragraphs = document.getElementsByClassName("pageParagraph");
    let max = this.certificats.length;
    let borneMax = this.pageNumber * 10;
    if(borneMax > max){
      borneMax = max;
    }
    let borneMin = this.pageNumber * 10 - 9;

    for(let i = 0; i < paragraphs.length; i++){
      paragraphs[i].innerHTML = borneMin + "-" + borneMax + " sur " + max;
    }
    return borneMin + "-" + borneMax + " sur " + max;
  }

  isGreen(certificat){
    return !this.isOrange(certificat) && !this.isRed(certificat);
  }

  isOrange(certificat){
    return this.dateService.isOrange(certificat);
  }

  isRed(certificat){
    return this.dateService.isRed(certificat);
  }

  search(form){
    let results = new Array();

    this.certificats.forEach(function(cert){
      if(cert.dn.includes(form.value.research)
        || this.getDate().includes(form.value.research)
        || this.getRemTime().includes(form.value.research)){
        results.push(cert);
      }else{
        let mail = false;
        for(let i = 0; i < cert.additionnalMails.length; i++){
          if(cert.additionnalMails[i].adresse.includes(form.value.research)){
            mail = true;
          }
        }
        if(mail === true){
          results.push(cert);
        }
      }
    });
    return results;
  }


  objDesc(){
    let buffer;
    for(let i = 0; i < this.certificats.length; i++) {
      for(let j = i; j < this.certificats.length; j++) {
        if(this.getInformations(this.certificats[j]).cn.localeCompare(this.getInformations(this.certificats[i]).cn) === 1){
          buffer = this.certificats[i];
          this.certificats[i] = this.certificats[j];
          this.certificats[j] = buffer;
        }
      }
    }
  }

  objAsc(){
    this.objDesc();
    this.certificats = this.certificats.reverse();
  }

  dateAsc(){
    let buffer;
    for(let i = 0; i < this.certificats.length; i++) {
      for(let j = i; j < this.certificats.length; j++) {
        if(new Date(this.certificats[j].notAfter).getTime() < new Date(this.certificats[i].notAfter).getTime()){
          buffer = this.certificats[i];
          this.certificats[i] = this.certificats[j];
          this.certificats[j] = buffer;
        }
      }
    }
  }

  dateDesc(){
    this.dateAsc();
    this.certificats = this.certificats.reverse();
  }

  switchTriDate(){
    let dateAsc = document.getElementsByClassName("sort-date-asc")[0];
    let dateDesc = document.getElementsByClassName("sort-date-desc")[0];
    let objAsc = document.getElementsByClassName("sort-obj-asc")[0].classList.remove("selectedTri");
    let objDesc = document.getElementsByClassName("sort-obj-desc")[0].classList.remove("selectedTri");

    if(dateDesc.classList.contains("selectedTri")){
      dateAsc.classList.add("selectedTri");
      dateDesc.classList.remove("selectedTri");
      this.dateAsc();
    }else if(dateAsc.classList.contains("selectedTri")){
      dateDesc.classList.add("selectedTri");
      dateAsc.classList.remove("selectedTri");
      this.dateDesc();
    }else{
      dateAsc.classList.add("selectedTri");
      this.dateAsc();
    }
    this.page = this.getActualPage();
  }

  switchTriObjet(){
    let dateAsc = document.getElementsByClassName("sort-date-asc")[0].classList.remove("selectedTri");
    let dateDesc = document.getElementsByClassName("sort-date-desc")[0].classList.remove("selectedTri");
    let objAsc = document.getElementsByClassName("sort-obj-asc")[0];
    let objDesc = document.getElementsByClassName("sort-obj-desc")[0];

    if(objDesc.classList.contains("selectedTri")){
      objAsc.classList.add("selectedTri");
      objDesc.classList.remove("selectedTri");
      this.objAsc();
    }else if(objAsc.classList.contains("selectedTri")){
      objDesc.classList.add("selectedTri");
      objAsc.classList.remove("selectedTri");
      this.objDesc();
    }else{
      objAsc.classList.add("selectedTri");
      this.objAsc();
    }
    this.page = this.getActualPage();
  }
}
