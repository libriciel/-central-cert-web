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

import {Component, OnInit} from '@angular/core';
import {Certificat} from '../../model/certificat';
import {CertificatService} from '../../service/certificat.service';
import {DateService} from '../../service/date.service';
import {ToastrService} from 'ngx-toastr';
import {KeystoreService} from '../../service/keystore.service';

@Component({
    selector: 'app-certificat-list',
    templateUrl: './certificat-list.component.html',
    styleUrls: ['./certificat-list.component.css']
})
export class CertificatListComponent implements OnInit {

    // liste des certificats de la base de données
    certificats: Certificat[];

    // liste des certificats sélectionnés dans la liste
    selectedCertificats: Certificat[];

    // Certificat dans le détail
    detailledCertificat: Certificat;

    // certificat en suppression
    inDeletion: Certificat;

    // certificat en contact
    contactPressed: Certificat;

    // tous les certificats sélectionnés ou non
    selectAllCerts: boolean;

    // Contenu de la barre de recherche
    searchText: string;

    // résultats de la recherche
    searchCerts: Certificat[];

    constructor(private keystoreService: KeystoreService, private toastr: ToastrService, private certificatService: CertificatService, private dateService: DateService) {
    }

    ngOnInit() {
        // initialisation des variables
        this.searchText = undefined;
        this.selectAllCerts = false;
        this.certificats = [];
        this.selectedCertificats = [];
        this.inDeletion = undefined;
        this.searchCerts = [];

        // récuparation des certifications dans la base de données et actualisation de la liste
        this.actualiseCertList();
    }


    // actualise la liste des certificats avec les donénes de la base de données
    // Effectue un tri
    actualiseCertList() {
        this.selectedCertificats = [];
        this.selectAllCerts = false;
        this.certificatService.selectAll().subscribe(data => {
            this.certificats = data;
            this.clearTri();
            this.dateAsc();
            this.orderByFavoris();
        });
    }

    // trie les certificats par favoris (favoris en haut de liste)
    orderByFavoris() {
        const notSortedArray = this.certificats;
        const sortedArray = new Array();
        const index = 0;
        notSortedArray.forEach(function(certificat) {
            if (certificat.favoris === true) {
                sortedArray.push(certificat);
            }
        });
        notSortedArray.forEach(function(certificat) {
            if (certificat.favoris === false) {
                sortedArray.push(certificat);
            }
        });
        this.certificats = sortedArray;
    }

    // Ajoute un certificat au détail
    toDetail(certificat) {
        this.detailledCertificat = certificat;
    }

    // retire un certificat du détail
    removeDetailled(data) {
        if (data == true) {
            this.toastr.success(this.getInformations(this.detailledCertificat).cn + ' a été supprimé avec succès !');
        }
        this.contactPressed = undefined;
        this.detailledCertificat = undefined;
        this.actualiseCertList();
    }

    // ajoute un certificat au contact
    toContact(certificat: Certificat) {
        this.detailledCertificat = certificat;
        this.contactPressed = certificat;
    }

    // récupère la date formatée depuis une date
    getDate(d: Date) {
        return this.dateService.format(d);
    }

    // récupère le temps restant d'un certificat
    getRemTime(c: Certificat) {
        return this.dateService.getRemainingTime(c);
    }

    // supprime un certificat avec son ID
    delete(id: number) {
        let cert;
        for (let i = 0; i < this.certificats.length; i++) {
            if (this.certificats[i].id === id) {
                cert = this.certificats.splice(i, 1)[0];
                this.toastr.success('\"' + this.getInformations(cert).cn + '\" supprimé avec succès !!!');
            }
        }
        this.certificatService.delete(id).subscribe(data => {
            this.actualiseCertList();
        });
    }

    // permet de demander vérification (popup) avant suppression
    verifyDelete(certificat: Certificat) {
        this.inDeletion = certificat;

        const shadow = document.getElementsByClassName('shadow')[0];
        const verifySuppr = document.getElementsByClassName('verify-suppr')[0];

        shadow.setAttribute('style', 'display:inline');
        verifySuppr.setAttribute('style', 'display:flex');
    }

    // permet de demander vérification (popup) avant suppression multiple
    verifySelectDelete() {
        const shadow = document.getElementsByClassName('shadow')[0];
        const verifySuppr = document.getElementsByClassName('verify-suppr')[0];

        shadow.setAttribute('style', 'display:inline');
        verifySuppr.setAttribute('style', 'display:flex');
    }

    // ferme le popup de suppression sans supprimer de certificats
    closeVerifySuppr() {
        const shadow = document.getElementsByClassName('shadow')[0];
        const verifySuppr = document.getElementsByClassName('verify-suppr')[0];

        shadow.setAttribute('style', 'display:none');
        verifySuppr.setAttribute('style', 'display:none');
        this.inDeletion = undefined;
    }

    // valide la suppression d'un certificat
    verifySupprDelete() {
        const shadow = document.getElementsByClassName('shadow')[0];
        const verifySuppr = document.getElementsByClassName('verify-suppr')[0];
        shadow.setAttribute('style', 'display:none');
        verifySuppr.setAttribute('style', 'display:none');

        if (this.inDeletion != undefined) {
            const id = this.inDeletion.id;
            this.delete(id);
            this.inDeletion = undefined;
        } else {
            this.selectedToDelete();
        }
    }

    // supprime un certificat sans toasters
    deleteWithoutToastr(id: number) {
        const certs = [];
        let idx = 0;
        for (let i = 0; i < this.certificats.length; i++) {
            if (this.certificats[i].id != id) {
                certs[idx] = this.certificats[i];
                idx++;
            }
        }
        this.certificats = certs;
        this.certificatService.delete(id).subscribe(data => {
            this.actualiseCertList();
        });
    }

    // supprime tous les certificats
    deleteAll() {
        this.certificatService.deleteAll().subscribe(data => {
            this.actualiseCertList();
        });
        this.certificats = [];
    }

    // ajoute un certificat aux favoris
    favorize(certificat) {
        if (certificat.favoris === true) {
            certificat.favoris = false;
        } else {
            certificat.favoris = true;
        }
        this.certificatService.save(certificat).subscribe();
    }

    // gestion des cases à cocher de sélection
    checkBoxHandler(certificat, event, j) {
        if (event === true) {
            document.getElementById('checkTr' + j).classList.add('selected');
            this.selectedCertificats.push(certificat);
        } else {
            document.getElementById('checkTr' + j).classList.remove('selected');
            let exit = false;
            let i = 0;
            while (i < this.selectedCertificats.length && exit === false) {
                if (this.selectedCertificats[i].id === certificat.id) {
                    this.selectedCertificats.splice(i, 1);
                    exit = true;
                }
                i++;
            }
        }
    }

    // sélectionne tous les certificats
    toggleAll(event) {
        if (event === true) {
            this.selectAllCerts = true;
            for (let i = 0; i < this.certificats.length; i++) {
                document.getElementById('checkTr' + i).classList.add('selected');
                this.selectedCertificats.push(this.certificats[i]);
            }
        } else {
            this.selectAllCerts = false;
            this.selectedCertificats = [];
            for (let i = 0; i < this.certificats.length; i++) {
                document.getElementById('checkTr' + i).classList.remove('selected');
            }
        }
    }

    // ajoute la sélection aux favoris
    selectedToFavoris() {
        this.selectedCertificats.forEach(function(cert) {
            cert.favoris = true;
        });
        this.certificatService.saveAll(this.selectedCertificats).subscribe();
        this.toastr.success(this.selectedCertificats.length + ' certificats ont été ajouéts aux favoris');
    }

    // supprime la sélection des favoris
    selectedToNotFavoris() {
        this.selectedCertificats.forEach(function(cert) {
            cert.favoris = false;
        });
        this.certificatService.saveAll(this.selectedCertificats).subscribe();
        this.toastr.success(this.selectedCertificats.length + ' certificats ont été retirés des favoris');
    }

    // supprime la sélection
    selectedToDelete() {
        let nbr = 0;
        for (let i = 0; i < this.selectedCertificats.length; i++) {
            this.deleteWithoutToastr(this.selectedCertificats[i].id);
            nbr++;
        }
        this.selectedCertificats = [];
        this.toastr.success(nbr + ' certificat supprimé avec succès !!!');
    }

    // récupère les informations du certificat
    getInformations(certificat: Certificat) {
        return this.certificatService.getInformations(certificat);
    }

    // vérifie si le certificat est en code GREEN
    isGreen(certificat) {
        return !this.isOrange(certificat) && !this.isRed(certificat) && !this.isExpired(certificat);
    }

    // vérifie si le certificat est en code ORANGE
    isOrange(certificat) {
        return this.dateService.isOrange(certificat);
    }

    // vérifie si le certificat est en code RED
    isRed(certificat) {
        return this.dateService.isRed(certificat);
    }

    isExpired(certificat) {
        return this.dateService.isExpired(certificat);
    }

    // effectue une recherche et filtre les résultats
    search(form) {
        if (form.value === undefined || form.value === null || form.value === '') {
            this.searchCerts = [];
        } else {
            const results = new Array();
            for (let i = 0; i < this.certificats.length; i++) {
                if (this.certificats[i].dn.toLowerCase().includes(form.value.toLowerCase())
                    || this.getDate(this.certificats[i].notBefore).toLowerCase().includes(form.value.toLowerCase())
                    || this.getDate(this.certificats[i].notAfter).toLowerCase().includes(form.value.toLowerCase())
                    || this.getRemTime(this.certificats[i]).toLowerCase().includes(form.value.toLowerCase())) {
                    results.push(this.certificats[i]);
                } else {
                    let mail = false;
                    for (let j = 0; j < this.certificats[i].additionnalMails.length; j++) {
                        if (this.certificats[i].additionnalMails[j].adresse.toLowerCase().includes(form.value.toLowerCase())) {
                            mail = true;
                        }
                    }
                    if (mail === true) {
                        results.push(this.certificats[i]);
                    }
                }
            }
            this.searchCerts = results;
        }
    }

    clearTri() {
        const dateAsc = document.getElementsByClassName('sort-date-asc')[0];
        const dateDesc = document.getElementsByClassName('sort-date-desc')[0];
        const objAsc = document.getElementsByClassName('sort-obj-asc')[0];
        const objDesc = document.getElementsByClassName('sort-obj-desc')[0];

        if (dateAsc != undefined) {
            dateAsc.classList.remove('selectedTri');
        }

        if (dateDesc != undefined) {
            dateDesc.classList.remove('selectedTri');
        }

        if (objAsc != undefined) {
            objAsc.classList.remove('selectedTri');
        }

        if (objDesc != undefined) {
            objDesc.classList.remove('selectedTri');
        }
    }

    // trie par objet décroissant
    objDesc() {
        let buffer;
        for (let i = 0; i < this.certificats.length; i++) {
            for (let j = i; j < this.certificats.length; j++) {
                if (this.getInformations(this.certificats[j]).cn.localeCompare(this.getInformations(this.certificats[i]).cn) === 1) {
                    buffer = this.certificats[i];
                    this.certificats[i] = this.certificats[j];
                    this.certificats[j] = buffer;
                }
            }
        }
    }

    // filtre par objet croissant
    objAsc() {
        this.objDesc();
        this.certificats = this.certificats.reverse();
    }

    // filtre par date croissante
    dateAsc() {
        let buffer;
        for (let i = 0; i < this.certificats.length; i++) {
            for (let j = i; j < this.certificats.length; j++) {
                if (new Date(this.certificats[j].notAfter).getTime() < new Date(this.certificats[i].notAfter).getTime()) {
                    buffer = this.certificats[i];
                    this.certificats[i] = this.certificats[j];
                    this.certificats[j] = buffer;
                }
            }
        }
    }

    // filtre par date décroissante
    dateDesc() {
        this.dateAsc();
        this.certificats = this.certificats.reverse();
    }

    // change le tri de date
    switchTriDate() {
        const dateAsc = document.getElementsByClassName('sort-date-asc')[0];
        const dateDesc = document.getElementsByClassName('sort-date-desc')[0];
        const objAsc = document.getElementsByClassName('sort-obj-asc')[0].classList.remove('selectedTri');
        const objDesc = document.getElementsByClassName('sort-obj-desc')[0].classList.remove('selectedTri');

        if (dateDesc.classList.contains('selectedTri')) {
            dateAsc.classList.add('selectedTri');
            dateDesc.classList.remove('selectedTri');
            this.dateAsc();
        } else if (dateAsc.classList.contains('selectedTri')) {
            dateDesc.classList.add('selectedTri');
            dateAsc.classList.remove('selectedTri');
            this.dateDesc();
        } else {
            dateAsc.classList.add('selectedTri');
            this.dateAsc();
        }
    }

    // change le tri d'objet
    switchTriObjet() {
        const dateAsc = document.getElementsByClassName('sort-date-asc')[0].classList.remove('selectedTri');
        const dateDesc = document.getElementsByClassName('sort-date-desc')[0].classList.remove('selectedTri');
        const objAsc = document.getElementsByClassName('sort-obj-asc')[0];
        const objDesc = document.getElementsByClassName('sort-obj-desc')[0];

        if (objDesc.classList.contains('selectedTri')) {
            objAsc.classList.add('selectedTri');
            objDesc.classList.remove('selectedTri');
            this.objAsc();
        } else if (objAsc.classList.contains('selectedTri')) {
            objDesc.classList.add('selectedTri');
            objAsc.classList.remove('selectedTri');
            this.objDesc();
        } else {
            objAsc.classList.add('selectedTri');
            this.objAsc();
        }
    }

    // permet de vérifier si l'on doit afficher la croix dans la barre de recherche (barre vide ou non)
    showCross(searchBar) {
        if (searchBar.value == '' || searchBar.value == undefined) {
            return false;
        } else {
            return true;
        }
    }

    // ferme la recherche
    closeSearch(searchBar) {
        this.searchText = undefined;
        this.searchCerts = [];
    }
}
