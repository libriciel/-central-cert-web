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

    d1 = new Date(c.notBefore);
    d2 = new Date(c.notAfter);

    if(d2.getTime() >= d1.getTime() && new Date().getTime() < d2.getTime()){
      let d1_annee = d1.getFullYear();
      let d2_annee = d2.getFullYear();

      let d1_mois = d1.getMonth() + 1;
      let d2_mois = d2.getMonth() + 1;

      let d1_jour = d1.getDate();
      let d2_jour = d2.getDate();

      let annees = d2_annee - d1_annee;

      let mois;
      if(d2_mois >= d1_mois){
        mois = d2_mois - d1_mois;
      }else{
        mois = 12 + d2_mois - d1_mois;
      }

      let jours;
      if(d2_jour >= d1_jour){
        jours = d2_jour - d1_jour;
      }else{
        if(d1_mois === 1){
          if(this.isBissextile(d1_annee) === true){
            jours = 29 + d2_jour - d1_jour;
          }else{
            jours = 28 + d2_jour - d1_jour;
          }
        }else if(d1_mois === 0
          || d1_mois === 2
          || d1_mois === 4
          || d1_mois === 6
          || d1_mois === 7
          || d1_mois === 9
          || d1_mois === 11){
            jours = 31 + d2_jour - d1_jour;
        }else{
          jours = 30 + d2_jour - d1_jour;
        }
      }

      return {annees: annees, mois: mois, jours: jours};
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
        dateTab.push(" et ");
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
      if(remTime.annees >= 1){
        return false;
      }else if(remTime.mois >= 3){
        return false;
      }else{
        return true;
      }
    }
  }

  isRed(c: Certificat){
    let remTime = this.getRem(c);
    if(remTime != undefined){
      if(this.isOrange(c) === false){
        return false;
      }else{
        if(remTime.mois === 1 && remTime.jours === 0){
          return true;
        }else if(remTime.mois === 0){
          return true;
        }else{
          return false;
        }
      }
    }
  }
}
