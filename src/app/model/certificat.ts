import { Mail } from './mail';
import { DistinguishedNumber } from './DistinguishedNumber';

export class Certificat {
  id: number; //ID du certificat auto générée par la base de données
  notBefore: Date; //Date de mise en validité du certificat
  notAfter: Date; //Date d'expiration du certificat
  favoris: boolean; //Certificat en favoris ou non
  dn: string; //Informations détaillées du certificat
  additionnalMails: Mail[]; //Adresses mails ajoutées par l'utilisateur au certificat
  notifyAll: boolean; //Notifier toutes les adresses additionnelles ou non
  notified: string; //Code de la dernière notification envoyée (GREEN, RED, ORANGE ou EXPIRED)
}
