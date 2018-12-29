/**
 * @namespace Justicar.WebClient.Auth
 * handles login and checking permissions
 */
let moduleAuth = angular.module("Justicar.WebClient.Auth", ['ngResource', 'Justicar.WebClient.API']);

/**
 *
 */

moduleAuth.service("JusticarAuth", ['$http', '$resource', '$log', '$q', '$mdPanel', 'JusticarAPI',
  function($http, $resource, $log, $q, $mdPanel, JusticarAPI) {
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
      JusticarAuth.openLoginPanel = function($event) {
        let deferred = $q.defer();

        let panelPosition = $mdPanel.newPanelPosition()
          .absolute()
          .top('50%')
          .left('50%');

        let panelAnimation = $mdPanel.newPanelAnimation()
          .openFrom($event)
          .duration(200)
          .closeTo('.justicar-login')
          .withAnimation($mdPanel.animation.SCALE);

        let panelConfig = {
          attachTo: angular.element(document.body),
          controller: 'LoginCtrl',
          disableParentScroll: true,
          templateUrl: '/views/panels/login',
          panelClass: "justicar-panel",
          zIndex: 150,
          locals: {
            deferred: deferred
          },
          trapFocus: true,
          clickOutsideToClose: true,
          clickEscapeToClose: true,
          hasBackdrop: true
        }

        $mdPanel.open(panelConfig);

        return deferred.promise;
      };

      /**
       * Open registration panel
       */
      JusticarAuth.openRegisterPanel = function() {
        let deferred = $q.defer();

        let panelPosition = $mdPanel.newPanelPosition()
          .absolute()
          .center();

        let panelAnimation = $mdPanel.newPanelAnimation()
          .openFrom($event)
          .duration(200)
          .closeTo('.justicar-login')
          .withAnimation($mdPanel.animation.SCALE);

        let panelConfig = {
          attachTo: angular.element(document.body),
          controller: 'RegisterCtrl',
          disableParentScroll: true,
          templateUrl: '/views/panels/register',
          panelClass: "justicar-panel",
          zIndex: 150,
          locals: {
            deferred: deferred
          },
          trapFocus: true,
          clickOutsideToClose: true,
          clickEscapeToClose: true,
          hasBackdrop: true
        }

        $mdPanel.open(panelConfig);

        return deferred.promise;
      };

      /**
       * Check permissions based on a string
       */
      JusticarAuth.checkPermissions = function(permission) {

      };


      return JusticarAuth;
  }
]);

moduleAuth.controller('LoginCtrl', [
  function($mdPanel) {

  }
])


moduleAuth.controller('RegisterCtrl', [
  function($mdPanel) {

  }
])
