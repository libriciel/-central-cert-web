import { Mail } from './mail';
import { Notification } from './notification';
import { DistinguishedNumber } from './DistinguishedNumber';

export class Certificat {
  id: number;
  notBefore: Date; //Not after
  notAfter: Date; //Not after
  favoris: boolean;
  dn: string; // Distinguished Name
  additionnalMails: Mail[]; //Mails
  notifications: Notification[];
  notifyAll: boolean;
}
