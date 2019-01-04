require("./landing/index.js");
require("./player/index.js");
require("./admin/index.js");

/**
 * @namespace Justicar.WebClient.States
 * Stores all the states for the Angular UI router state machine and associates controllers
 */
angular.module("Justicar.WebClient.States", [
  'Justicar.WebClient.States.Landing',
  'Justicar.WebClient.States.Player',
  'Justicar.WebClient.States.Admin',
]);
