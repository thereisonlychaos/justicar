/**
 * @namespace Justicar.WebClient.Auth
 * handles login and checking permissions
 */
let moduleAPI = angular.module("Justicar.WebClient.Auth", ['ngResource', 'Justicar.WebClient.API']);

/**
 * Stores base URL for api
 */

moduleAPI.service("JusticarAuth", ['$http', '$resource', '$log', '$q', 'JusticarAPI',
  function($http, $resource, $log, $q, JusticarAPI) {
      let JusticarAuth = {};

      /**
       * Login to system
       */
      JusticarAuth.login = function(email, password) {
        // @TODO
      }

      /**
       * Logout of system
       */
      JusticarAuth.logout = function() {
        // @TODO
      }

      /**
       * Register new user
       */
      JusticarAuth.register = function(email, password, userDetails) {

      }

      /**
       * Open modal panel for logging inspect
       */
      JusticarAuth.openLoginPanel = function() {

      }

      /**
       * Open registration panel
       */
      JusticarAuth.openRegisterPanel = function() {

      }

      /**
       * Check permissions based on a string
       */
      JusticarAuth.checkPermissions = function(permission) {

      }


      return JusticarAPI;
  }
]);
