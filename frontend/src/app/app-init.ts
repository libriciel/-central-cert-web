import {KeycloakConfig, KeycloakService } from 'keycloak-angular';

export function initializer(keycloak: KeycloakService): () => Promise<any> {
  var keycloakConfig: KeycloakConfig = {
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
