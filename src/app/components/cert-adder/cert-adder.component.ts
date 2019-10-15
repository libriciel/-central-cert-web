/*
 * Central Cert Web
 * Copyright (C) 2019 Libriciel-SCOP
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

import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CertificatService} from '../../service/certificat.service';
import {Certificat} from '../../model/certificat';
import {DateService} from '../../service/date.service';
import {ToastrService} from 'ngx-toastr';
import {KeystoreService} from '../../service/keystore.service';

declare var LiberSign: any;

@Component({
    selector: 'app-cert-adder',
    templateUrl: './cert-adder.component.html',
    styleUrls: ['./cert-adder.component.css']
})
export class CertAdderComponent implements OnInit {
    // Envoi d'event au parent
    @Output() event: EventEmitter<any> = new EventEmitter();

    // Fichiers importés
    fileTab: File[];

    // Certificats importés
    uplodedCerts: Certificat[];

    // Mode d'importation
    mode: number;

    constructor(private keystore: KeystoreService, private toastr: ToastrService, private dateService: DateService, private certificatService: CertificatService) {
    }

    ngOnInit() {
        this.uplodedCerts = [];
        this.fileTab = [];
    }

    // Ouvre la fenetre d'import des certificats
    open() {
        document.getElementsByClassName('add-cert-container')[0].classList.add('active');
        document.getElementsByClassName('add-cert-shadow')[0].classList.add('active');
    }

    // Ferme la fenetre d'import des certificats
    close() {
        const containers = document.getElementsByClassName('add-cert-container');
        const shadow = document.getElementsByClassName('add-cert-shadow')[0];

        for (let i = 0; i < containers.length; i++) {
            containers[i].classList.remove('active');
        }
        shadow.classList.remove('active');
    }

    // Passe au stage d'importation suivant
    nextStage() {
        const containers = document.getElementsByClassName('add-cert-container');
        let index = undefined;
        let i = 0;
        while (index === undefined && i < containers.length) {
            if (containers[i].classList.contains('active')) {
                index = i;
            }
            i++;
        }
        if (index < containers.length - 1) {
            containers[index].classList.remove('active');
            containers[index + 1].classList.add('active');
        }
    }

    // Retourne au stage d'importation précédent
    previousStage() {
        const containers = document.getElementsByClassName('add-cert-container');
        let index = undefined;
        let i = 0;
        while (index === undefined && i < containers.length) {
            if (containers[i].classList.contains('active')) {
                index = i;
            }
            i++;
        }
        if (this.mode === 4) {
            containers[index].classList.remove('active');
            containers[0].classList.add('active');
        } else {
            if (index > 0) {
                containers[index].classList.remove('active');
                containers[index - 1].classList.add('active');
            }
        }
    }

    // Passe au mode URL et change de stage
    nextStageURL() {
        this.mode = 1;
        this.nextStage();
    }

    // Passe au mode Formulaire et change de stage
    nextStageFORM() {
        this.mode = 2;
        this.nextStage();
    }

    // Passe au mode token et change de srage
    nextStageTOKEN() {
        this.mode = 3;
        this.nextStage();
    }

    // Passe au mode keystore et change de stage
    nextStageKEYSTORE() {
        this.mode = 4;
        this.nextStage();
        this.getFromExtension();
    }

    // Récupère les certificats via URL
    addByURL(url) {
        if (url.status === 'VALID') {
            this.certificatService.selectFromUrl(url.value.urlAdder).subscribe(data => {
                this.uplodedCerts = data;
                this.nextStage();
            });
        }
    }

    // Ferme la fenetre d'improtation
    closeSelf() {
        this.close();
        this.callParent();
    }

    // Envoi l'event au parent
    callParent() {
        this.event.emit(this.uplodedCerts);
    }

    // Créer un certificat via formulaire
    createCert(form) {
        if (form.status === 'VALID'
            && new Date(form.value.notbefore).getTime() <= new Date(form.value.notafter).getTime()) {
            this.uplodedCerts = [];
            let cert = {
                id: undefined,
                notBefore: new Date(form.value.notbefore),
                notAfter: new Date(form.value.notafter),
                favoris: false,
                dn: 'CN=' + form.value.cn,
                additionnalMails: [],
                notified: 'GREEN',
                notifyAll: false,
            };
            this.uplodedCerts.push(cert);
            this.nextStage();
        }
    }

    deleteFile(l) {
        this.fileTab.splice(l, 1);
    }

    // Ajoute les fichiers
    onFileChange(event) {
        let test = false;
        for (let i = 0; i < event.target.files.length; i++) {
            for (let j = 0; j < this.fileTab.length; j++) {
                if (this.fileTab[j].name == event.target.files[i].name) {
                    test = true;
                }
            }

            if (test === false) {
                if (event.target.files[i].name.includes('.cer')
                    || event.target.files[i].name.includes('.crt')
                    || event.target.files[i].name.includes('.pem')
                    || event.target.files[i].name.includes('.key')
                    || event.target.files[i].name.includes('.der')
                    || event.target.files[i].name.includes('.p7b')
                    || event.target.files[i].name.includes('.p7c')
                    || event.target.files[i].name.includes('.pfx')
                    || event.target.files[i].name.includes('.p12')) {
                    this.fileTab.push(event.target.files[i]);
                }
            }
            test = false;
        }
    }

    // Montre les erreurs de fichiers
    showFileError() {
        let test = false;
        if (this.fileTab !== undefined) {
            for (let i = 0; i < this.fileTab.length; i++) {
                if (!this.fileTab[i].name.includes('.cer')
                    && !this.fileTab[i].name.includes('.crt')
                    && !this.fileTab[i].name.includes('.pem')
                    && !this.fileTab[i].name.includes('.key')
                    && !this.fileTab[i].name.includes('.der')
                    && !this.fileTab[i].name.includes('.p7b')
                    && !this.fileTab[i].name.includes('.p7c')
                    && !this.fileTab[i].name.includes('.pfx')
                    && !this.fileTab[i].name.includes('.p12')) {
                    test = true;
                }
            }
        }
        return test;
    }

    // Vérifie que le format du fichier est correct
    isCorrectFile() {
        let test = true;
        if (this.fileTab !== undefined) {
            for (let i = 0; i < this.fileTab.length; i++) {
                if (!this.fileTab[i].name.includes('.cer')
                    && !this.fileTab[i].name.includes('.crt')
                    && !this.fileTab[i].name.includes('.pem')
                    && !this.fileTab[i].name.includes('.key')
                    && !this.fileTab[i].name.includes('.der')
                    && !this.fileTab[i].name.includes('.p7b')
                    && !this.fileTab[i].name.includes('.p7c')
                    && !this.fileTab[i].name.includes('.pfx')
                    && !this.fileTab[i].name.includes('.p12')) {
                    test = false;
                }
            }
        }
        return test;
    }

    // Ajoute le certificat par fichier
    addByFile() {
        if (this.fileTab !== undefined && this.isCorrectFile() === true) {
            this.uplodedCerts = [];
            for (let i = 0; i < this.fileTab.length; i++) {
                this.certificatService.selectFromFile(this.fileTab[i]).subscribe(data => {
                    if (data != null && data != undefined) {
                        this.uplodedCerts.push(data);
                    }
                    this.nextStage();
                });
            }
        }
    }

    // valide le formulaire et ajoute les certificats à la liste
    validate(form) {
        const certs = [];
        const existingCerts = [];
        const checks = Object.values(form.value);
        this.certificatService.selectAll().subscribe(data => {
            for (let i = 0; i < checks.length; i++) {
                console.log('Adrien check');
                if (checks[i] === 'true') {
                    console.log('Adrien true...');
                    if (!this.certificatService.exists(this.uplodedCerts[i], data)) {
                        console.log('Adrien 1...');
                        certs.push(this.uplodedCerts[i]);
                    } else if (this.certificatService.exists(this.uplodedCerts[i], data)) {
                        console.log('Adrien 2...');
                        existingCerts.push(this.uplodedCerts[i]);
                    }
                }
            }
            this.close();
            this.certificatService.saveAll(certs).subscribe(_ => {
                this.closeSelf();
                this.uplodedCerts = [];
                this.fileTab = [];
            });

            if (certs.length === 1) {
                this.toastr.success('Un certificat ajouté avec succès !');
            } else if (certs.length > 1) {
                this.toastr.success(certs.length + ' certificats ajoutés avec succès !');
            }

            if (existingCerts.length === 1) {
                this.toastr.error('Un certificat sélectionné existe déjà !');
            } else if (existingCerts.length > 1) {
                this.toastr.error(existingCerts.length + ' certificats sélectionnés existent déjà !');
            }
        });
    }

    // Récupère les informations des certificats
    getInformations(certificat: Certificat) {
        return this.certificatService.getInformations(certificat);
    }

    // Récupère la date formatée
    getDate(d: Date) {
        return this.dateService.format(d);
    }

    // Récupère le temps restant
    getRemTime(c: Certificat) {
        return this.dateService.getRemainingTime(c);
    }

    canGoNextURL(form) {
        return form.status === 'VALID';
    }

    canGoNextFile(form) {
        return this.fileTab.length > 0 && this.isCorrectFile() === true;
    }

    canGoNextForm(form) {
        return form.status === 'VALID' && new Date(form.value.notbefore).getTime() <= new Date(form.value.notafter).getTime();
    }

    haveExtension() {
        return typeof LiberSign === 'object';
    }

    isCompatible() {
        return this.keystore.isCompatible();
    }

    getFromExtension() {
        if (this.haveExtension() === true) {
            this.uplodedCerts = [];
            const config = {
                appletUrl: '/applets/',
                extensionUpdateUrl: '../../../assets/libersign/',
                height: 140,
                width: '100%',
                iconType: 'fa'
            };
            LiberSign.setUpdateUrl(config.extensionUpdateUrl.replace(/\/?$/, '/'));
            LiberSign.getCertificates().then(certs => {
                for (let i = 0; i < certs.length; i++) {
                    const cert = {
                        id: undefined,
                        notBefore: new Date(certs[i].NOTBEFORE),
                        notAfter: new Date(certs[i].NOTAFTER),
                        favoris: false,
                        dn: 'CN=' + certs[i].CN + ',' + certs[i].ISSUERDN + ',MAIL=' + certs[i].EMAILADDRESS,
                        additionnalMails: [],
                        notified: 'GREEN',
                        notifyAll: false,
                    };
                    this.uplodedCerts.push(cert);
                }
                this.nextStage();
            });
        }
    }
}
