export const environment = {
  production: false,
  backendUrl: "http://localhost:3000",
  keycloak: {
    authority: "http://localhost:8080",
    redirectUri: "http://localhost:4200",
    postLogoutRedirectUri: "http://localhost:4200",
    realm: "loteria-do-esdras",
    clientId: "loteria-front",
  },
};
