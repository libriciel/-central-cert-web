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
  @Input() certificat: Certificat;
  @Output() event: EventEmitter<any> = new EventEmitter();

  constructor(private toastr: ToastrService, private dateService: DateService, private certificatService: CertificatService, private route: ActivatedRoute) { }

  ngOnInit() {}

  getDate(d: Date){
    return this.dateService.format(d);
  }

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

  deleteContact(index){
    this.certificat.additionnalMails.splice(index, 1);
    this.certificatService.save(this.certificat).subscribe();
    this.toastr.success('Un contact supprimé avec succès !!!');
  }

  changeNotifiable(index){
    this.certificat.additionnalMails[index].notifiable = !this.certificat.additionnalMails[index].notifiable;
    this.certificatService.save(this.certificat).subscribe();
  }

  changeNotifiableAll(){
    this.certificat.notifyAll = !this.certificat.notifyAll;
    this.certificatService.save(this.certificat).subscribe();
  }

  getInformations(certificat: Certificat){
    return this.certificatService.getInformations(certificat);
  }

  closeSelf(){
    this.callParent();
  }

  callParent() {
    this.event.emit(null);
  }

  exists(contact){
    for(let i = 0; i < this.certificat.additionnalMails.length; i++) {
      if(this.certificat.additionnalMails[i].adresse == contact.adresse){
        return true;
      }
    }
    return false;
  }
}
