/**
 * @namespace Justicar.WebClient.States.Landing
 * Stores all the states for the Angular UI router state machine and associates controllers
 */
let stateLanding = angular.module("Justicar.WebClient.States.Landing", [
  'ui.router'
]);

/**
 * State name for this state
 */
stateLanding.constant("LANDING_STATE", "landing");

/**
 * Sub-URL for this state
 */
stateLanding.constant("LANDING_STATE_URL", "/start");

/**
 * Location to load view from
 */
stateLanding.constant("LANDING_TEMPLATE_URL", "/partials/states/landing");

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
