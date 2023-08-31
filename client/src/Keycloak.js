/* import Keycloak from "keycloak-js";
const keycloak = new Keycloak({
 url: "https://qarden.drakecore.com/auth",
 realm: "disruptica",
 clientId: "microapp-external-users-3006",
});

export default keycloak;  */
import Keycloak from "keycloak-js";
const keycloak = new Keycloak({
    url: "http://localhost:8080/auth",
    realm: "sofiakeycloak",
    clientId: "React-auth",
   });
   
   export default keycloak;
   