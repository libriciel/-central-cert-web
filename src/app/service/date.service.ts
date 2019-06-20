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
 
import { Injectable } from '@angular/core';
import { Certificat } from '../model/certificat';
@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  //formate la date entrée en paramètre sous la forme jour/mois/année
  format(d: Date){
    d = new Date(d);
    let jour = d.getDate();
    let mois = d.getMonth() + 1;
    let annee = d.getFullYear();

    let stringJour = "" + jour;
    let stringMois = "" + mois;
    let stringAnne = "" + annee;

    if(jour < 10){
      stringJour = "0" + stringJour;
    }

    if(mois < 10){
      stringMois = "0" + stringMois;
    }

    return stringJour + "/" + stringMois + "/" + stringAnne;
  }

  //return true si la date entrée en paramètres est bissextile
  isBissextile(annee: number){
    if((annee % 400 === 0) || (annee % 4 === 0 && annee % 100 != 0)){
      return true;
    }else{
      return false;
    }
  }

  //retourne le temps restant avant expiration du certificat entré en paramètres sous la forme d'un tableau [années restantes, mois restants, jours restants]
  getRem(c: Certificat){
    let d1: Date;
    let d2: Date;

    d1 = new Date();
    d2 = new Date(c.notAfter);

    let res = new Array();

    if(d2.getTime() > d1.getTime()){
      let firstDate = new Date();
      let subDate = new Date(Math.abs(d2.getTime() - d1.getTime()));

      res[0] = subDate.getFullYear() - 1970;
      res[1] = subDate.getMonth();
      res[2] = subDate.getDate();
      return {annees: res[0], mois: res[1], jours: res[2]};
    }else {
      return undefined;
    }
  }

  /*retourne le temps restants avant expiration du certificat sous la forme d'un string
    ex1: 12 ans, 6 mois et 12 jours
    ex2: 3 mois et 2 jours
  */
  getRemainingTime(c: Certificat){
    let tab = this.getRem(c);
    if(tab != undefined){
      let dateTab = new Array();

      if(tab.annees > 0){
        dateTab.push(tab.annees);
        if(tab.annees === 1){
          dateTab.push(" an ");
        }else{
          dateTab.push(" ans ");
        }

        if(tab.mois > 0 && tab.jours === 0){
          dateTab.push(" et ")
        }
      }

      if(tab.mois > 0){
        dateTab.push(tab.mois);
        dateTab.push(" mois " );
      }

      if(tab.jours > 0){
        if(tab.mois > 0 || tab.annees > 0){
          dateTab.push(" et ");
        }
      }

      if(tab.jours > 0){
        dateTab.push(tab.jours);
        if(tab.jours === 1){
          dateTab.push(" jour");
        }else{
          dateTab.push(" jours");
        }
      }

      let res = "";
      for(let i = 0; i < dateTab.length; i++){
        res += dateTab[i];
      }

      return res;
    }else{
      return "expiré";
    }
  }

  //renvoit true si le certificat est en code ORANGE
  isOrange(c: Certificat){
    let remTime = this.getRem(c);
    if(remTime != undefined){
      if(remTime.annees === 0 && remTime.mois <= 3){
        if(remTime.mois >= 1){
          return true;
        }else{
          return false;
        }
      }else{
        return false;
      }
    }else{
      return false;
    }
  }

  //renvoit true si le certificat est en code RED
  isRed(c: Certificat){
    let remTime = this.getRem(c);
    if(remTime != undefined){
      if(remTime.annees === 0 && remTime.mois === 0 ){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }

  isExpired(c: Certificat){
    let remTime = this.getRem(c);
    if(remTime === undefined){
      return true;
    }else{
      return false;
    }
  }
}
