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

      JusticarAuth.currentUser = null;

      /**
       * Login to system
       */
      JusticarAuth.login = function(email, password) {
        JusticarAPI.auth.login(email, password).then(
          function(response) {
            JusticarAuth.currentUser = response.data.user; // this is likely wrong
          }
        ).catch(
          function(err) {
            // @TODO better handling of results, failed login, etc.
            throw new Error(err);
          }
        )
      };

      /**
       * Logout of system
       */
      JusticarAuth.logout = function() {
        JusticarAPI.auth.logout().then(
          function() {
            JusticarAuth.currentUser = null; // this is likely wrong
          }
        ).catch(
          function(err) {
            // @TODO better handling of results, failed login, etc.
            throw new Error(err);
          }
        )
      };

      /**
       * Register new user
       */
      JusticarAuth.register = function(email, password) {
        JusticarAPI.auth.register(email, password).then(
          function(response) {
            JusticarAuth.currentUser = response.data.user; // this is likely wrong
          }
        ).catch(
          function(err) {
            // @TODO better handling of results, failed login, etc.
            throw new Error(err);
          }
        )
      };

      /**
       * Open modal panel for logging inspect
       */
      JusticarAuth.openLoginPanel = function() {

      };

      /**
       * Open registration panel
       */
      JusticarAuth.openRegisterPanel = function() {

      };

      /**
       * Check permissions based on a string
       */
      JusticarAuth.checkPermissions = function(permission) {

      };


      return JusticarAuth;
  }
]);
