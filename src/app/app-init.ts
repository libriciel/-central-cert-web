/*
 * Central Cert Web
 * Copyright (C) 2018-2019 Libriciel-SCOP
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

import {KeycloakConfig, KeycloakService} from 'keycloak-angular';

export function initializer(keycloak: KeycloakService): () => Promise<any> {
    const keycloakConfig: KeycloakConfig = {
        url: '/auth',
        clientId: 'frontend',
        realm: 'CentralCert'
    };

    return (): Promise<any> => keycloak.init({
        config: keycloakConfig,
        initOptions: {
            onLoad: 'login-required'
        },
    });
}
