/**
 * @namespace Justicar.WebClient.States.Landing
 * Stores all the states for the Angular UI router state machine and associates controllers
 */
let stateLanding = angular.module("Justicar.WebClient.States.Player.Profile", [
  'ui.router'
]);

/**
 * State name for this state
 */
stateLanding.constant("PLAYER_PROFILE_STATE", "player.profile");

/**
 * Sub-URL for this state
 */
stateLanding.constant("PLAYER_PROFILE_STATE_URL", "/player/profile");

/**
 * Location to load view from
 */
stateLanding.constant("PLAYER_PROFILE_TEMPLATE_URL", "/partials/states/player/profile");

/**
 * Config action that sets up this module
 */
stateLanding.config([
  '$stateProvider',
  'LANDING_STATE',
  'LANDING_STATE_URL',
  'LANDING_TEMPLATE_URL',
  function($stateProvider, LANDING_STATE, LANDING_STATE_URL, LANDING_TEMPLATE_URL) {

    /**
     * Set up state in application state machine.
     */
    $stateProvider
      .state(LANDING_STATE, {
        url: LANDING_STATE_URL,
        params: {},
        controller: "StateLandingCtrl",
        templateUrl: LANDING_TEMPLATE_URL
      })
    ;
  }
]);

/**
 * Controller for state
 */
stateLanding.controller("StateLandingCtrl", [
  function() {

  }
]);
