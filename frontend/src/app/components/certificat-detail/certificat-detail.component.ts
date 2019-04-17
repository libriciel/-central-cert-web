import { Component, OnInit, Input } from '@angular/core';
import { Certificat } from '../../model/certificat';
import { CertificatService } from '../../service/certificat.service';
import { MailService } from '../../service/mail.service';

@Component({
  selector: 'app-certificat-detail',
  templateUrl: './certificat-detail.component.html',
  styleUrls: ['./certificat-detail.component.css']
})
export class CertificatDetailComponent implements OnInit {
  @Input() certificat: Certificat;

  constructor(private certificatService: CertificatService, private mailService: MailService) { }

  ngOnInit() {
  }

  updateOnSubmit(form){
    let newMails = [];
    for(let i = 0; i < this.certificat.mails.length; i++){
      if(this.certificat.mails[i].id === -1){
        this.mailService.create(this.certificat.mails[i].adresseMail).subscribe(data => {
          newMails[i] = data;
        });
      }else{
        newMails[i] = {id: this.certificat.mails[i].id, adresseMail: this.certificat.mails[i].adresseMail};
      }
    }
    this.certificatService.updateAll(newMails).subscribe();
  }

  addMailOnSubmit(form){
    let exists = false;
    for(let i = 0; i < this.certificat.mails.length; i++){
      if(this.certificat.mails[i] === form.addMailInput){
        exists = true;
      }
    }

    if(exists === false){
      this.certificat.mails[this.certificat.mails.length] = {id: -1, adresseMail: form.addMailInput};
    }
  }
}
