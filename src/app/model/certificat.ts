/*
 * Central Cert Web
 * Copyright (C) 2019 Libriciel-SCOP
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import {Mail} from './mail';

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
