/**
 * @namespace Justicar.WebClient.States.Admin
 * Stores all the states for the Angular UI router state machine and associates controllers
 */
let stateAdmin = angular.module("Justicar.WebClient.States.Admin", [
  'ui.router'
]);

/**
 * State name for this state
 */
stateAdmin.constant("ADMIN_STATE", "admin");

/**
 * Sub-URL for this state
 */
stateAdmin.constant("ADMIN_STATE_URL", "/admin");

/**
 * Config action that sets up this module
 */
stateAdmin.config([
  '$stateProvider',
  'ADMIN_STATE',
  'ADMIN_STATE_URL',
  function($stateProvider, ADMIN_STATE, ADMIN_STATE_URL) {

    /**
     * Set up state in application state machine.
     */
    $stateProvider
      .state(ADMIN_STATE, {
        url: ADMIN_STATE_URL,
        params: {},
        abstract: true
      })
    ;
  }
]);
