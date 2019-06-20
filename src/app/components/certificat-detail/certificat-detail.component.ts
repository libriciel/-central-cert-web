/*
 * central cert web
 * Copyright (C) 2018-2019 Libriciel-SCOP
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { Component, OnInit, Input } from '@angular/core';
import { Certificat } from '../../model/certificat';
import { CertificatService } from '../../service/certificat.service';
import { ActivatedRoute } from '@angular/router';
import { DateService } from '../../service/date.service';
import { Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-certificat-detail',
  templateUrl: './certificat-detail.component.html',
  styleUrls: ['./certificat-detail.component.css']
})
export class CertificatDetailComponent implements OnInit {
  //certificat en détail
  @Input() certificat: Certificat;

  //certificat en contact
  @Input() contactCertificat: Certificat;

  //permet d'envoyer un event au parent
  @Output() event: EventEmitter<any> = new EventEmitter();

  //en édition ou non
  inEdit: boolean;

  constructor(private toastr: ToastrService, private dateService: DateService, private certificatService: CertificatService, private route: ActivatedRoute) { }

  ngOnInit() {
    //initialisation des variables
    this.inEdit = undefined;
  }

  //permet d'éditer les informations
  edit(id){
    this.inEdit = id;
  }

  //actualise les détails du certificat
  changeDetail(form){
    console.log(form.value);

    let dn = "";

    if(form.value.cn != "" && form.value.cn != undefined && form.value.cn != "non disponible"){
      dn += "CN=" + form.value.cn + ",";
    }
    if(form.value.ou != "" && form.value.ou != undefined && form.value.ou != "non disponible"){
      dn += "OU=" + form.value.ou + ",";
    }
    if(form.value.t != "" && form.value.t != undefined && form.value.t != "non disponible"){
      dn += "T=" + form.value.t + ",";
    }
    if(form.value.l != "" && form.value.l != undefined && form.value.l != "non disponible"){
      dn += "L=" + form.value.l + ",";
    }
    if(form.value.st != "" && form.value.st != undefined && form.value.st != "non disponible"){
      dn += "ST=" + form.value.st + ",";
    }
    if(form.value.pc != "" && form.value.pc != undefined && form.value.pc != "non disponible"){
      dn += "PC=" + form.value.pc + ",";
    }
    if(form.value.street != "" && form.value.street != undefined && form.value.street != "non disponible"){
      dn += "STREET=" + form.value.street + ",";
    }
    if(form.value.o != "" && form.value.o != undefined && form.value.o != "non disponible"){
      dn += "O=" + form.value.o;
    }

    if(dn.endsWith(",")){
      dn = dn.substring(0, dn.length - 1);
    }

    this.certificat.dn = dn;

    this.certificatService.save(this.certificat).subscribe();
    this.inEdit = undefined;
    this.toastr.success("Le certificat a été modifié avec succès !!!");
  }

  //récupère la date formatée
  getDate(d: Date){
    return this.dateService.format(d);
  }

  //récupère le temps restant
  getRemTime(c: Certificat){
    return this.dateService.getRemainingTime(c);
  }

  //supprime le certificat
  delete(){
    this.certificatService.delete(this.certificat.id).subscribe(data => {
      this.deleteAndCloseSelf();
    });
  }

  //récupère les informations du certificat
  getInformations(certificat: Certificat){
    return this.certificatService.getInformations(certificat);
  }

  //ouvre la fenetre de gestion des contacts
  contactWindow(){
    this.contactCertificat = this.certificat;
  }

  //ferme la fenetre des contacts
  closeContactWindows(){
    this.contactCertificat = undefined;
  }

  //ferme la fentre du détail
  closeSelf(){
    this.callParent(false);
  }

  deleteAndCloseSelf(){
    this.callParent(true);
  }

  //envoit l'event à son parent
  callParent(data) {
    this.event.emit(data);
  }

  //active le popup de validation de suppression
  detVerifySelectDelete(){
    let shadow = document.getElementsByClassName("supprshadow")[0];
    let verifySuppr = document.getElementsByClassName("det-verify-suppr")[0];

    shadow.setAttribute("style", "display:inline");
    verifySuppr.setAttribute("style", "display:flex");
  }

  //ferme le popup de validation de suppression sans supprimer le certificat
  detCloseVerifySuppr(){
    let shadow = document.getElementsByClassName("supprshadow")[0];
    let verifySuppr = document.getElementsByClassName("det-verify-suppr")[0];

    shadow.setAttribute("style", "display:none");
    verifySuppr.setAttribute("style", "display:none");
  }

  //valide le popup et supprime le certificat
  detVerifySupprDelete(){
    let shadow = document.getElementsByClassName("supprshadow")[0];
    let verifySuppr = document.getElementsByClassName("det-verify-suppr")[0];
    shadow.setAttribute("style", "display:none");
    verifySuppr.setAttribute("style", "display:none");
    this.delete();
  }

  //ajoute/supprime le certificat des favoris
  detailFavorize(){
      if(this.certificat.favoris === true){
        this.certificat.favoris = false;
      }else{
        this.certificat.favoris = true;
      }
      this.certificatService.save(this.certificat).subscribe(data => {
        if(this.certificat.favoris === true){
          this.toastr.success("Le certificat " + this.getInformations(this.certificat).cn + " a bien été ajouté aux favoris.");
        }else{
          this.toastr.success("Le certificat " + this.getInformations(this.certificat).cn + " a bien été retiré des favoris.");
        }
      });
  }
}
