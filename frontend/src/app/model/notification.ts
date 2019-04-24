import { Certificat } from './certificat';

export class Notification {
  id: number;
  certificat: Certificat;
  objet: string;
  message: string;
  notBefore: Date;
  activated: boolean;
  seen: boolean;
}
