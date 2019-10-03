/*
 * Central Cert Web
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

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Certificat} from '../../model/certificat';
import {CertificatService} from '../../service/certificat.service';
import {ActivatedRoute} from '@angular/router';
import {DateService} from '../../service/date.service';
import {ToastrService} from 'ngx-toastr';

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

    constructor(private toastr: ToastrService, private dateService: DateService, private certificatService: CertificatService, private route: ActivatedRoute) {
    }

    ngOnInit() {
    }

    //récupère la date formatée du certificat
    getDate(d: Date) {
        return this.dateService.format(d);
    }

    //ajoute un contact au certificat
    addContact(form) {
        if (form.status === 'VALID') {
            let notif = false;
            if (form.value.notifiable === true) {
                notif = true;
            }
            let mail = {
                adresse: form.value.contactEmail,
                notifiable: notif
            };

            if (!this.exists(mail)) {
                this.certificat.additionnalMails.push(mail);
                this.certificatService.save(this.certificat).subscribe();
                this.toastr.success('Un contact ajouté avec succès !!!');
            } else {
                this.toastr.error('Le contact existe déjà !');
            }
        }
    }

    //supprime un contact du certificat
    deleteContact(index) {
        this.certificat.additionnalMails.splice(index, 1);
        this.certificatService.save(this.certificat).subscribe();
        this.toastr.success('Un contact supprimé avec succès !!!');
    }

    //alterne l'attribut booléen notifiable du certificat
    changeNotifiable(index) {
        this.certificat.additionnalMails[index].notifiable = !this.certificat.additionnalMails[index].notifiable;
        this.certificatService.save(this.certificat).subscribe();
        if (this.certificat.additionnalMails[index].notifiable === true) {
            this.toastr.success('Les notifications sont activées pour ' + this.certificat.additionnalMails[index].adresse + '!');
        } else {
            this.toastr.success('Les notifications sont désactivées pour ' + this.certificat.additionnalMails[index].adresse + '!');
        }
    }


    //alterne l'attribut booléen notifyAll du certificat
    changeNotifiableAll() {
        this.certificat.notifyAll = !this.certificat.notifyAll;
        if (this.certificat.notifyAll === true) {
            this.toastr.success('Les notifications sont activées pour toutes les adresses renseignées !');
        } else {
            this.toastr.success('Les notifications sont désactivées pour toutes les adresses renseignées !');
        }
        this.certificatService.save(this.certificat).subscribe();
    }

    //récupère les informations du certificat
    getInformations(certificat: Certificat) {
        return this.certificatService.getInformations(certificat);
    }

    //ferme la fenêtre de contacts
    closeSelf() {
        this.callParent();
    }

    //actualise l'event pour le parent
    callParent() {
        this.event.emit(null);
    }

    //vérifie si le conatct entré en paramètres existe déjà dans le certificat
    exists(contact) {
        for (let i = 0; i < this.certificat.additionnalMails.length; i++) {
            if (this.certificat.additionnalMails[i].adresse == contact.adresse) {
                return true;
            }
        }
        return false;
    }
}
