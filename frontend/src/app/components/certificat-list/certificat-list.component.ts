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

  selectAllCerts: boolean;

  searchText: string;

  constructor(private toastr: ToastrService, private certificatService: CertificatService, private dateService: DateService) { }

  ngOnInit() {
    this.searchText = undefined;
    this.selectAllCerts = false;
    this.certificats = [];
    this.selectedCertificats = [];
    this.inDeletion = undefined;
    this.certificatService.selectAll().subscribe(data => {
      this.certificats = data;
      this.dateDesc();
      this.orderByFavoris();
    });
    this.actualiseCertList();
  }

  actualiseCertList(){
    this.certificatService.selectAll().subscribe(data => {
      this.certificats = data;
      this.dateAsc();
      this.orderByFavoris();
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
      this.selectedCertificats.push(certificat);
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
    if(event === true){
      this.selectAllCerts = true;
      for(let i = 0; i < this.certificats.length; i++){
        this.selectedCertificats.push(this.certificats[i]);
      }
    }else{
      this.selectAllCerts = false;
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
  }

  showCross(searchBar){
    if(searchBar.value == "" || searchBar.value == undefined){
      return false;
    }else{
      return true;
    }
  }

  closeSearch(searchBar){
    this.searchText = undefined;
  }
}
