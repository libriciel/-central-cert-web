import { Mail } from './mail';

export class Certificat {
  id: number;
  notBefore: Date; //Not after
  notAfter: Date; //Not after
  cn: string; //Common Name
  o: string; //Organization
  ou: string; //Organizational Unit
  l: string; //Locality
  st: string; //State
  c: string; //Country
  t: string;
  dc: string;
  street: string;
  pc: string;
  mails: Mail[]; //Mails
  additionnalMails: Mail[]; //Mails
}
