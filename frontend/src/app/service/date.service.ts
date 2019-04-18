import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  private englishMonths: string[];
  private frenchMonths: string[];
  private englishDays: string[];
  private frenchDays: string[];

  constructor() {
    this.englishMonths = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ]

    this.frenchMonths = [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Aout",
      "Septembre",
      "Octobre",
      "Novembre",
      "Decembre"
    ]

    this.englishDays = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ]

    this.frenchDays = [
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi",
      "Dimanche"
    ]
  }

  formatEnglish(d: Date){
    let numJour = d.getDate();
    let jour = this.englishDays[d.getDay()];
    let mois = this.englishMonths[d.getMonth()];
    let annee = d.getFullYear();
    let heure = d.getHours();
    let minute = d.getMinutes();

    return numJour + " " + mois + " " + " " + annee + " at " + heure + ":" + minute + ".";
  }

  formatFrench(d: Date){
    let numJour = d.getDate();
    let jour = this.frenchDays[d.getDay()];
    let mois = this.frenchMonths[d.getMonth()];
    let annee = d.getFullYear();
    let heure = d.getHours();
    let minute = d.getMinutes();

    return jour + " " + numJour + " " + mois + " " + annee + " à " + heure + "h" + minute + ".";
  }

  isBissextile(annee: number){
    if((annee % 400 === 0) || (annee % 4 === 0 && annee % 100 != 0)){
      return true;
    }else{
      return false;
    }
  }

  getRemainingTime(d1: Date, d2: Date){
    if(d2.getTime() >= d1.getTime() && new Date().getTime() < d2.getTime()){
      let d1_annee = d1.getFullYear();
      let d2_annee = d2.getFullYear();

      let d1_mois = d1.getMonth() + 1;
      let d2_mois = d2.getMonth() + 1;

      let d1_jour = d1.getDate();
      let d2_jour = d2.getDate();

      let d1_heure = d1.getHours();
      let d2_heure = d2.getHours();

      let d1_minute = d1.getMinutes();
      let d2_minute = d2.getMinutes();

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

      let heures;
      if(d2_heure >= d1_heure){
        heures = d2_heure - d1_heure;
      }else{
        heures = 24 + d2_heure - d1_heure;
      }

      let minutes;
      if(d2_minute >= d1_minute){
        minutes = d2_minute - d1_minute;
      }else{
        minutes = 60 + d2_minute - d1_minute;
      }
      let res = "";
      if(annees > 0){
        res += annees + " ans ";
      }
      if(mois > 0){
        res += mois + " mois ";
      }
      if(jours > 0){
        res += jours + " jours ";
      }
      if(heures > 0){
        res += heures + " heures ";
      }
      if(minutes > 0){
        res += minutes + " minutes";
      }
      return res;
    }else{
      return "Out of date";
    }

  }
}
