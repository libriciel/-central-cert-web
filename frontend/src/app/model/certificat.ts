import { Mail } from './mail';
import { DistinguishedNumber } from './DistinguishedNumber';

export class Certificat {
  id: number;
  notBefore: Date; //Not after
  notAfter: Date; //Not after
  favoris: boolean;
  dn: string; // Distinguished Name
  additionnalMails: Mail[]; //Mails
  notifyAll: boolean;
  notified: boolean;
}
