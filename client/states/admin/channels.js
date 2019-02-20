/**
 * @namespace Justicar.WebClient.States.Admin.Channels
 * Stores all the states for the Angular UI router state machine and associates controllers
 */
let stateAdminChannels = angular.module("Justicar.WebClient.States.Admin.Channels", [
  'ui.router'
]);

/**
 * State name for this state
 */
stateAdminChannels.constant("CHANNELS_STATE", "admin.channels");

/**
 * Sub-URL for this state
 */
stateAdminChannels.constant("CHANNELS_STATE_URL", "/channels");

/**
 * Location to load view from
 */
stateAdminChannels.constant("CHANNELS_TEMPLATE_URL", "/partials/states/admin/channels");

/**
 * Config action that sets up this module
 */
stateAdminChannels.config([
  '$stateProvider',
  'CHANNELS_STATE',
  'CHANNELS_STATE_URL',
  'CHANNELS_TEMPLATE_URL',
  function($stateProvider, CHANNELS_STATE, CHANNELS_STATE_URL, CHANNELS_TEMPLATE_URL) {

    /**
     * Set up state in application state machine.
     */
    $stateProvider
      .state(CHANNELS_STATE, {
        url: CHANNELS_STATE_URL,
        params: {},
        controller: "StateAdminChannelsCtrl",
        templateUrl: CHANNELS_TEMPLATE_URL
      })
    ;
  }
]);

/**
 * Controller for state
 */
stateAdminChannels.controller("StateAdminChannelsCtrl", [
  function() {

  }
]);
