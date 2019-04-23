import { Certificat } from './certificat';

export class Notification {
  id: number;
  certificat: Certificat;
  objet: string;
  message: string;
  Date: notBefore;
  activated: boolean;
  seen: boolean;
}
