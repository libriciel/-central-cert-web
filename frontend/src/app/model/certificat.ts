import { Mail } from './mail';
import { Notification } from './notification';
import { DistinguishedNumber } from './distinguishedNumber';

export class Certificat {
  id: number;
  notBefore: Date; //Not after
  notAfter: Date; //Not after
  favoris: boolean;
  dn: DistinguishedNumber; // Distinguished Name
  additionnalMails: Mail[]; //Mails
  notifications: Notification[];
}
