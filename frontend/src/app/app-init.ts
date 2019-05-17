import {KeycloakConfig, KeycloakService } from 'keycloak-angular';

export function initializer(keycloak: KeycloakService): () => Promise<any> {
  var keycloakConfig: KeycloakConfig = {
    url: 'http://localhost/auth',
    clientId: 'frontend',
    realm: 'Atteste'
  };

  return (): Promise<any> => keycloak.init({
    config: keycloakConfig,
    initOptions: {
      onLoad: 'login-required'
    },
  });
}
