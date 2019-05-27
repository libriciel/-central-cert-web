import { Component, OnInit, Input } from '@angular/core';
import { Certificat } from '../../model/certificat';
import { CertificatService } from '../../service/certificat.service';
import { ActivatedRoute } from '@angular/router';
import { DateService } from '../../service/date.service';
import { ToastrService } from 'ngx-toastr';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-certificats-contacts',
  templateUrl: './certificats-contacts.component.html',
  styleUrls: ['./certificats-contacts.component.css']
})
export class CertificatsContactsComponent implements OnInit {
  //certificat du détail
  @Input() certificat: Certificat;

  //permet de communiquer un event au parent
  @Output() event: EventEmitter<any> = new EventEmitter();

  constructor(private toastr: ToastrService, private dateService: DateService, private certificatService: CertificatService, private route: ActivatedRoute) { }

  ngOnInit() {}

  //récupère la date formatée du certificat
  getDate(d: Date){
    return this.dateService.format(d);
  }

  //ajoute un contact au certificat
  addContact(form){
    if(form.status === "VALID"){
      let notif = false;
      if(form.value.notifiable === true){
        notif = true;
      }
      let mail = {
        adresse: form.value.contactEmail,
        notifiable: notif
      }

      if(!this.exists(mail)){
        this.certificat.additionnalMails.push(mail);
        this.certificatService.save(this.certificat).subscribe();
        this.toastr.success('Un contact ajouté avec succès !!!');
      }else{
        this.toastr.error('Le contact existe déjà !');
      }
    }
  }

  //supprime un contact du certificat
  deleteContact(index){
    this.certificat.additionnalMails.splice(index, 1);
    this.certificatService.save(this.certificat).subscribe();
    this.toastr.success('Un contact supprimé avec succès !!!');
  }

  //alterne l'attribut booléen notifiable du certificat
  changeNotifiable(index){
    this.certificat.additionnalMails[index].notifiable = !this.certificat.additionnalMails[index].notifiable;
    this.certificatService.save(this.certificat).subscribe();
  }


  //alterne l'attribut booléen notifyAll du certificat
  changeNotifiableAll(){
    this.certificat.notifyAll = !this.certificat.notifyAll;
    this.certificatService.save(this.certificat).subscribe();
  }

  //récupère les informations du certificat
  getInformations(certificat: Certificat){
    return this.certificatService.getInformations(certificat);
  }

  //ferme la fenêtre de contacts
  closeSelf(){
    this.callParent();
  }

  //actualise l'event pour le parent
  callParent() {
    this.event.emit(null);
  }

  //vérifie si le conatct entré en paramètres existe déjà dans le certificat
  exists(contact){
    for(let i = 0; i < this.certificat.additionnalMails.length; i++) {
      if(this.certificat.additionnalMails[i].adresse == contact.adresse){
        return true;
      }
    }
    return false;
  }
}
