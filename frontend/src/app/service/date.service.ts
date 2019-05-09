import { Injectable } from '@angular/core';
import { Certificat } from '../model/certificat';
@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  format(d: Date){
    d = new Date(d);
    let jour = d.getDate();
    let mois = d.getMonth() + 1;
    let annee = d.getFullYear();

    return jour + "/" + mois + "/" + annee;
  }

  isBissextile(annee: number){
    if((annee % 400 === 0) || (annee % 4 === 0 && annee % 100 != 0)){
      return true;
    }else{
      return false;
    }
  }

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

  isRed(c: Certificat){
    let remTime = this.getRem(c);
    if(remTime != undefined){
      if(remTime.annees === 0 && remTime.mois === 0 ){
        return true;
      }else{
        return false;
      }
    }else{
      return true;
    }
  }
}
