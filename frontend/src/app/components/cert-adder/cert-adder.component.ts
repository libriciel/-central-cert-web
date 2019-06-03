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
  //envoi d'event au parent
  @Output() event: EventEmitter<any> = new EventEmitter();

  //fichiers importés
  file: File[];

  //certificats importés
  uplodedCerts: Certificat[];

  //mode d'importation
  mode: number;

  constructor(private toastr: ToastrService, private dateService: DateService, private certificatService: CertificatService) { }

  ngOnInit() {
    //initialisation des variables
    this.uplodedCerts = [];
  }

  //ouvre la fenetre d'importation des certificats
  open(){
    document.getElementsByClassName("add-cert-container")[0].classList.add("active");
    document.getElementsByClassName("add-cert-shadow")[0].classList.add("active");
  }

  //ferme la fenetre d'importation des certificats
  close(){
    let containers = document.getElementsByClassName("add-cert-container");
    let shadow = document.getElementsByClassName("add-cert-shadow")[0];

    for(let i = 0; i < containers.length; i++){
      containers[i].classList.remove("active");
    }
    shadow.classList.remove("active");
  }

  //passe au stage d'importation suivant
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

  //retourne au stage d'importation précédent
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

  //passe au mode URL et change de stage
  nextStageURL(){
    this.mode = 1;
    this.nextStage();
  }

  //passe au mode Formulaire et change de stage
  nextStageFORM(){
    this.mode = 2;
    this.nextStage();
  }

  //passe au mode token et change de srage
  nextStageTOKEN(){
    this.mode = 3;
    this.nextStage();
  }

  //passe au mode keystore et change de stage
  nextStageKEYSTORE(){
    this.mode = 4;
    this.nextStage();
  }

  //récupère les certificats via URL
  addByURL(url){
    if(url.status === "VALID"){
      this.certificatService.selectFromUrl(url.value.urlAdder).subscribe(data => {
        this.uplodedCerts = data;
        this.nextStage();
      });
    }
  }

  //ferme la fenetre d'improtation
  closeSelf(){
    this.close();
    this.callParent();
  }

  //envoi l'event au parent
  callParent() {
    this.event.emit(this.uplodedCerts);
  }

  // créer un certificat via formulaire
  createCert(form){
    if(form.status === "VALID"){
      this.uplodedCerts = [];
      let cert = {
        id: undefined,
        notBefore: new Date(form.value.notbefore),
        notAfter: new Date(form.value.notafter),
        favoris: false,
        dn: "CN=" + form.value.cn,
        additionnalMails: [],
        notified: "GREEN",
        notifyAll: false,
      }
      this.uplodedCerts.push(cert);
      this.nextStage();
    }
  }

  //ajoute les fichiers
  onFileChange(event){
    this.file = [];
    for(let i = 0; i < event.target.files.length; i++){
      this.file.push(event.target.files[i]);
    }
  }

  //montre les erreurs de fichiers
  showFileError(){
    let test = false;
    if(this.file != undefined){
      for(let i = 0; i < this.file.length; i++){
        if(!this.file[i].name.includes(".cer")
          && !this.file[i].name.includes(".crt")
          && !this.file[i].name.includes(".pem")
          && !this.file[i].name.includes(".key")
          && !this.file[i].name.includes(".der")
          && !this.file[i].name.includes(".p7b")
          && !this.file[i].name.includes(".p7c")
          && !this.file[i].name.includes(".pfx")
          && !this.file[i].name.includes(".p12")){
          test = true;
        }
      }
    }
    return test;
  }

  //vérifie que le format du fichier est correct
  isCorrectFile(){
    let test = true;
    if(this.file != undefined){
      for(let i = 0; i < this.file.length; i++){
        if(!this.file[i].name.includes(".cer")
          && !this.file[i].name.includes(".crt")
          && !this.file[i].name.includes(".pem")
          && !this.file[i].name.includes(".key")
          && !this.file[i].name.includes(".der")
          && !this.file[i].name.includes(".p7b")
          && !this.file[i].name.includes(".p7c")
          && !this.file[i].name.includes(".pfx")
          && !this.file[i].name.includes(".p12")){
            test = false;
        }
      }
    }
    return test;
  }

  //ajoute le certificat par fichier
  addByFile(){
    if(this.file != undefined && this.isCorrectFile() === true){
      this.uplodedCerts = [];
      for(let i = 0; i < this.file.length; i++){
        this.certificatService.selectFromFile(this.file[i]).subscribe(data => {
          this.uplodedCerts.push(data);
          this.nextStage();
        });
      }
    }
  }

  //valide le formulaire et ajoute les certificats à la liste
  validate(form){
    let certs = new Array();
    let existant_certs = new Array();
    let checks = Object.values(form.value);
    this.certificatService.selectAll().subscribe(data => {
      for(let i = 0; i < checks.length; i++){
          if(checks[i] == "true" && !this.certificatService.exists(this.uplodedCerts[i], data)){
            certs.push(this.uplodedCerts[i]);
          }else if(checks[i] == "true" && this.certificatService.exists(this.uplodedCerts[i], data)){
            existant_certs.push(this.uplodedCerts[i]);
          }
      }
      this.close();
      this.certificatService.saveAll(certs).subscribe(data => {
        this.closeSelf();
      });
      if(certs.length > 0){
        this.toastr.success(certs.length + ' certificat ajoutés avec succès !!!');
      }
      if(existant_certs.length > 0){
        this.toastr.error(existant_certs.length + ' certificats sélectionnés existent déjà !')
      }
    });
  }

  //récupère les informations des certificats
  getInformations(certificat: Certificat){
    return this.certificatService.getInformations(certificat);
  }

  //récupère la date formatée
  getDate(d: Date){
    return this.dateService.format(d);
  }

  //récupère le temps restant
  getRemTime(c: Certificat){
    return this.dateService.getRemainingTime(c);
  }

  canGoNextURL(form){
    if(form.status === "VALID"){
      return true;
    }else{
      return false;
    }
  }

  canGoNextFile(form){
    if(this.isCorrectFile() === true){
      return true;
    }else{
      return false;
    }
  }

  canGoNextForm(form){
    if(form.status === "VALID"){
      return true;
    }else{
      return false;
    }
  }
}
