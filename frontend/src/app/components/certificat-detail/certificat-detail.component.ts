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
  @Input() certificat: Certificat;
  @Input() contactCertificat: Certificat;
  @Output() event: EventEmitter<any> = new EventEmitter();

  inEdit: boolean;

  constructor(private toastr: ToastrService, private dateService: DateService, private certificatService: CertificatService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.inEdit = false;
  }

  edit(){
    this.inEdit = true;
  }

  annulerEdit(){
    this.inEdit = false;
  }

  changeDetail(form){
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
    this.inEdit = false;
    this.toastr.success("Le certificat a été modifié avec succès !!!");
  }

  getDate(d: Date){
    return this.dateService.format(d);
  }

  getRemTime(c: Certificat){
    return this.dateService.getRemainingTime(c);
  }

  delete(){
    this.certificatService.delete(this.certificat.id).subscribe(data => {
      this.closeSelf();
    });
  }

  getInformations(certificat: Certificat){
    return this.certificatService.getInformations(certificat);
  }

  contactWindow(){
    this.contactCertificat = this.certificat;
  }

  closeContactWindows(){
    this.contactCertificat = undefined;
  }

  closeSelf(){
    this.callParent();
  }

  callParent() {
    this.event.emit(null);
  }

  detVerifySelectDelete(){
    let shadow = document.getElementsByClassName("supprshadow")[0];
    let verifySuppr = document.getElementsByClassName("det-verify-suppr")[0];

    shadow.setAttribute("style", "display:inline");
    verifySuppr.setAttribute("style", "display:flex");
  }

  detCloseVerifySuppr(){
    let shadow = document.getElementsByClassName("supprshadow")[0];
    let verifySuppr = document.getElementsByClassName("det-verify-suppr")[0];

    shadow.setAttribute("style", "display:none");
    verifySuppr.setAttribute("style", "display:none");
  }



  detVerifySupprDelete(){
    let shadow = document.getElementsByClassName("supprshadow")[0];
    let verifySuppr = document.getElementsByClassName("det-verify-suppr")[0];
    shadow.setAttribute("style", "display:none");
    verifySuppr.setAttribute("style", "display:none");
    this.delete();
  }

}
