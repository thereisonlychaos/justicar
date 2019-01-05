/**
 * @namespace Justicar.WebClient.States.Player
 * Stores all the states for the Angular UI router state machine and associates controllers
 */
let statePlayer = angular.module("Justicar.WebClient.States.Player", [
  'ui.router'
]);

/**
 * State name for this state
 */
statePlayer.constant("PLAYER_STATE", "player");

/**
 * Sub-URL for this state
 */
statePlayer.constant("PLAYER_STATE_URL", "/player");

/**
 * Config action that sets up this module
 */
statePlayer.config([
  '$stateProvider',
  'PLAYER_STATE',
  'PLAYER_STATE_URL',
  function($stateProvider, PLAYER_STATE, PLAYER_STATE_URL) {

    /**
     * Set up state in application state machine.
     */
    $stateProvider
      .state(PLAYER_STATE, {
        url: PLAYER_STATE_URL,
        params: {},
        abstract: true
      })
    ;
  }
]);
