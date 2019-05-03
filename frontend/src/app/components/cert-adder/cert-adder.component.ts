import { Component, OnInit } from '@angular/core';
import { CertificatService } from '../../service/certificat.service';
import { Certificat } from '../../model/certificat';
import { DateService } from '../../service/date.service';
import { ToastrService } from 'ngx-toastr';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cert-adder',
  templateUrl: './cert-adder.component.html',
  styleUrls: ['./cert-adder.component.css']
})
export class CertAdderComponent implements OnInit {
  @Output() event: EventEmitter<any> = new EventEmitter();

  file: File;
  certificats: Certificat[];
  mode: number;

  constructor(private toastr: ToastrService, private dateService: DateService, private certificatService: CertificatService) { }

  ngOnInit() {

  }

  open(){
    document.getElementsByClassName("add-cert-container")[0].classList.add("active");
    document.getElementsByClassName("add-cert-shadow")[0].classList.add("active");
  }

  close(){
    let containers = document.getElementsByClassName("add-cert-container");
    let shadow = document.getElementsByClassName("add-cert-shadow")[0];

    for(let i = 0; i < containers.length; i++){
      containers[i].classList.remove("active");
    }
    shadow.classList.remove("active");
  }

  nextStage(){
    let containers = document.getElementsByClassName("add-cert-container");
    let index = undefined;
    let i = 0;
    while(index == undefined && i < containers.length){
      if(containers[i].classList.contains("active")){
        index = i;
      }
      i ++;
    }
    if(index < containers.length - 1){
      containers[index].classList.remove("active");
      containers[index + 1].classList.add("active");
    }
  }

  previousStage(){
    let containers = document.getElementsByClassName("add-cert-container");
    let index = undefined;
    let i = 0;
    while(index == undefined && i < containers.length){
      if(containers[i].classList.contains("active")){
        index = i;
      }
      i ++;
    }
    if(index > 0){
      containers[index].classList.remove("active");
      containers[index - 1].classList.add("active");
    }
  }

  nextStageURL(){
    this.mode = 1;
    this.nextStage();
  }

  nextStageFORM(){
    this.mode = 2;
    this.nextStage();
  }

  nextStageTOKEN(){
    this.mode = 3;
    this.nextStage();
  }

  nextStageKEYSTORE(){
    this.mode = 4;
    this.nextStage();
  }

  addByURL(url){
    this.certificatService.selectFromUrl(url.value.URL).subscribe(data => {
      this.certificats = data;
    });
    this.nextStage();
  }

  closeSelf(){
    this.close();
    this.callParent();
  }

  callParent() {
    this.event.emit(null);
  }

  createCert(form){
    this.certificats = [];
    let cert = {
      id: undefined,
      notBefore: new Date(form.value.notbefore),
      notAfter: new Date(form.value.notafter),
      favoris: false,
      dn: "",
      additionnalMails: [],
      notified: false,
      notifyAll: false,
    }

    cert.dn = "CN=" + form.value.cn + ","
            + "E=" + form.value.mail + ","
            + "T=" + form.value.t + ","
            + "O=" + form.value.o + ","
            + "OU=" + form.value.ou + ","
            + "L=" + form.value.l + ","
            + "ST=" + form.value.st + ","
            + "C=" + form.value.c + ","
            + "STREET=" + form.value.street + ","
            + "PC=" + form.value.pc + ",";

    this.certificats.push(cert);
    this.nextStage();
  }

  onFileChange(event){
    this.file = <File>event.target.files[0];
    console.log(this.file);
  }

  addByFile(){
    this.certificats = [];
    this.certificatService.selectFromFile(this.file).subscribe(data => {
      this.certificats.push(data);
    });
    this.nextStage();
  }

  validate(form){
    let certs = new Array();

    let checks = Object.values(form.value);

    for(let i = 0; i < checks.length; i++){
        if(checks[i] === "checked"){
          certs.push(this.certificats[i]);
        }
    }
    this.close();
    this.certificatService.saveAll(certs).subscribe(data => {
      this.closeSelf();
    });
    if(certs.length > 0){
      this.toastr.success(certs.length + ' certificat ajoutés avec succès !!!');
    }
  }

  getInformations(certificat: Certificat){
    return this.certificatService.getInformations(certificat);
  }

  getDate(d: Date){
    return this.dateService.format(d);
  }

  getRemTime(c: Certificat){
    return this.dateService.getRemainingTime(c);
  }
}
