import { Component, OnInit } from '@angular/core';
import { Certificat } from '../../model/certificat';
import { CertificatService } from '../../service/certificat.service';
import { ActivatedRoute } from '@angular/router';
import { DateService } from '../../service/date.service';

@Component({
  selector: 'app-certificats-contacts',
  templateUrl: './certificats-contacts.component.html',
  styleUrls: ['./certificats-contacts.component.css']
})
export class CertificatsContactsComponent implements OnInit {
  certificat: Certificat;
  formOpen: boolean;

  constructor(private dateService: DateService, private certificatService: CertificatService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.formOpen = false;
    let id = this.route.snapshot.params['id'] * 1;
    this.certificat = {
      id: id,
      notBefore: new Date(),
      notAfter: new Date(),
      favoris: false,
      dn: "",
      additionnalMails: [],
      notifications: [],
      notifyAll: false
    }
    this.certificatService.select(id).subscribe(data => {
      this.certificat = data;
    });

    /*this.certificat = {
      id: 1,
      notBefore: new Date("March 13, 1995 03:24:00"),
      notAfter: new Date("November 19, 2022 03:22:00"),
      favoris: true,
      dn: {
        cn: "cn",
        mail: "mail",
        o: "o",
        ou: "ou",
        l: "l",
        st: "st",
        c: "c",
        t: "t",
        dc: "dc",
        street: "street",
        pc: "pc"
      },
      additionnalMails: [
        {
          adresse: "test0@test.test",
          notifiable: true
        },
        {
          adresse: "test1@test.test",
          notifiable: false
        },
        {
          adresse: "test1@test.test",
          notifiable: false
        },
        {
          adresse: "test1@test.test",
          notifiable: false
        },
        {
          adresse: "test1@test.test",
          notifiable: false
        },
        {
          adresse: "test1@test.test",
          notifiable: false
        },
        {
          adresse: "test1@test.test",
          notifiable: false
        },
        {
          adresse: "test1@test.test",
          notifiable: false
        },

        {
          adresse: "test1@test.test",
          notifiable: false
        },
        {
          adresse: "test1@test.test",
          notifiable: false
        },
        {
          adresse: "test1@test.test",
          notifiable: false
        },
        {
          adresse: "test1@test.test",
          notifiable: false
        },

        {
          adresse: "test1@test.test",
          notifiable: false
        },
        {
          adresse: "test1@test.test",
          notifiable: false
        },
        {
          adresse: "test1@test.test",
          notifiable: false
        },
        {
          adresse: "test1@test.test",
          notifiable: false
        },

        {
          adresse: "test1@test.test",
          notifiable: false
        },
        {
          adresse: "test1@test.test",
          notifiable: false
        },
        {
          adresse: "test1@test.test",
          notifiable: false
        },
        {
          adresse: "test1@test.test",
          notifiable: false
        },

        {
          adresse: "test1@test.test",
          notifiable: false
        },
        {
          adresse: "test1@test.test",
          notifiable: false
        },
        {
          adresse: "test1@test.test",
          notifiable: false
        },
        {
          adresse: "test1@test.test",
          notifiable: false
        },

        {
          adresse: "test1@test.test",
          notifiable: false
        },
        {
          adresse: "test1@test.test",
          notifiable: false
        },
        {
          adresse: "test1@test.test",
          notifiable: false
        },
        {
          adresse: "test1@test.test",
          notifiable: false
        },
        {
          adresse: "test2@test.test",
          notifiable: true
        }
      ],
      notifications: [],
      notifyAll: true
    }*/
  }

  getDate(d: Date){
    return this.dateService.format(d);
  }

  addContact(){

  }

  deleteContact(index){

  }

  changeNotifiable(index){
    this.certificat.additionnalMails[index].notifiable = !this.certificat.additionnalMails[index].notifiable;
    this.certificatService.save(this.certificat).subscribe();
  }

  changeNotifiableAll(){
    this.certificat.notifyAll = !this.certificat.notifyAll;
    this.certificatService.save(this.certificat).subscribe();
  }

  saveAll(){

  }

  getInformations(certificat: Certificat){
    return this.certificatService.getInformations(certificat);
  }

  openCloseForm(){
    let shadow = document.getElementsByClassName("shadow")[0];
    let contactForm = document.getElementsByClassName("add-contact")[0];

    if(this.formOpen === false){
      shadow.setAttribute("style", "display:inline");
      contactForm.setAttribute("style", "display:flex");
      this.formOpen = true;
    }else{
      shadow.setAttribute("style", "display:none");
      contactForm.setAttribute("style", "display:none");
      this.formOpen = false;
    }

  }

}
