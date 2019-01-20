/**
 * @namespace Justicar.WebClient.Auth
 * handles login and checking permissions
 */
let moduleAuth = angular.module("Justicar.WebClient.Auth", ['ngResource', 'Justicar.WebClient.API']);

/**
 *
 */

moduleAuth.service("JusticarAuth", ['$http', '$localStorage', '$log', '$q', '$mdPanel', 'JusticarAPI',
  function($http, $localStorage, $log, $q, $mdPanel, JusticarAPI) {
      let JusticarAuth = {};



      /**
       * Login to system
       */
      JusticarAuth.init = function() {
        if ($localStorage.currentUser && $localStorage.currentUser.token) {
          JusticarAuth.setToken($localStorage.currentUser.token);
        } else {
          JusticarAuth.clearToken();
        }

        JusticarAPI.auth.current().then(
          function(response) {
            $localStorage.currentUser.user = response.data.user;
          }
        ).catch(
          function(err) {
            delete $localStorage.currentUser;
            JusticarAuth.openLoginPanel();
          }
        );
      };

      /**
       * Login to system
       */
      JusticarAuth.login = function(email, password) {
        JusticarAPI.auth.login(email, password).then(
          function(response) {
            $localStorage.currentUser = { user: response.data.user, token: response.data.token };
            JusticarAuth.setToken(response.data.token);
          }
        ).catch(
          function(err) {
            // @TODO better handling of results, failed login, etc.
            throw new Error(err);
          }
        );
      };

      /**
       * Logout of system
       */
      JusticarAuth.logout = function() {
        JusticarAPI.auth.logout().then(
          function() {
            delete $localStorage.currentUser;
            JusticarAuth.clearToken();
          }
        ).catch(
          function(err) {
            // @TODO better handling of results, failed login, etc.
            throw new Error(err);
          }
        );
      };

      /**
       * Register new user
       */
      JusticarAuth.register = function(email, password) {
        JusticarAPI.auth.register(email, password).then(
          function(response) {
            $localStorage.currentUser = { user: response.data.user, token: response.data.token };
            JusticarAuth.setToken(response.data.token);
          }
        ).catch(
          function(err) {
            // @TODO better handling of results, failed login, etc.
            throw new Error(err);
          }
        );
      };

      /**
       * Open modal panel for logging inspect
       */
      JusticarAuth.openLoginPanel = function($event) {
        let deferred = $q.defer();

        let panelPosition = $mdPanel.newPanelPosition()
          .absolute()
          .center();

        let panelAnimation = $mdPanel.newPanelAnimation()
          .openFrom({ top: 1, right:0 })
          .duration(200)
          .closeTo({ top: 1, right:0 })
          .withAnimation($mdPanel.animation.SCALE);

        let panelConfig = {
          attachTo: angular.element(document.body),
          controller: 'LoginCtrl',
          disableParentScroll: true,
          templateUrl: '/partials/panels/login',
          panelClass: "justicar-panel",
          zIndex: 150,
          locals: {
            deferred: deferred
          },
          trapFocus: true,
          clickOutsideToClose: true,
          clickEscapeToClose: true,
          hasBackdrop: true,
          position: panelPosition,
          animation: panelAnimation
        };

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
          .openFrom({top: 1, left: 1})
          .duration(200)
          .closeTo({top: 1, left: 1})
          .withAnimation($mdPanel.animation.SCALE);

        let panelConfig = {
          attachTo: angular.element(document.body),
          controller: 'RegisterCtrl',
          disableParentScroll: true,
          templateUrl: '/partials/panels/register',
          panelClass: "justicar-panel",
          zIndex: 175,
          locals: {
            deferred: deferred
          },
          trapFocus: true,
          clickOutsideToClose: true,
          clickEscapeToClose: true,
          hasBackdrop: true,
          position: panelPosition,
          animation: panelAnimation
        };

        $mdPanel.open(panelConfig);

        return deferred.promise;
      };

      /**
       * Check permissions based on a string
       */
      JusticarAuth.checkPermissions = function(permission) {
        // @TODO
      };

      JusticarAuth.setToken = function(token) {
        $http.defaults.headers.common.Authorization = 'Bearer ' + token;
      };

      JusticarAuth.clearToken = function() {
        $http.defaults.headers.common.Authorization =  '';
      };

      return JusticarAuth;
  }
]);

moduleAuth.controller('LoginCtrl', ['mdPanelRef', '$scope', '$log', 'JusticarAPI', 'JusticarAuth',
  function(mdPanelRef, $scope, $log, JusticarAPI, JusticarAuth) {
    $scope.waiting = false;
    $scope.errorMssg = "";
    /**
     * Handle clicking login button, using $scope.userEmail & $scope.userPassword
     */
    $scope.onClickLogin = function() {
      // login and close if successful
      $scope.waiting = true;

      JusticarAPI.auth.login($scope.userEmail, $scope.userPassword).then(
        function() {
          $scope.waiting = false;
          mdPanelRef.close();
        }
      ).catch(
        function(err) {
          $log.error(err);
          $scope.errorMssg = "Error logging in.";
          $scope.waiting = false;
          // @TODO better messaging
        }
      );
    };

    /**
     * Handle clicking register button
     */
    $scope.onClickRegister = function() {
      JusticarAuth.openRegisterPanel();
      mdPanelRef.close();
    };

    $scope.onClickClose = function() {
      mdPanelRef.close();
    };
  }
]);


moduleAuth.controller('RegisterCtrl', ['mdPanelRef', '$scope', '$log', 'JusticarAPI', 'JusticarAuth',
  function(mdPanelRef, $scope, $log, JusticarAPI, JusticarAuth) {
    $scope.waiting = false;
    $scope.errorMssg = "";
    /**
     * Handle clicking register button
     */
    $scope.onClickRegister = function() {
      // login and close if successful
      $scope.waiting = true;

      JusticarAPI.auth.register($scope.userEmail, $scope.userPassword).then(
        function() {
          $scope.waiting = false;
          mdPanelRef.close();
        }
      ).catch(
        function(err) {
          $log.error(err);
          $scope.errorMssg = "Error registering.";
          $scope.waiting = false;
          // @TODO better messaging
        }
      );
    };

    /**
     * Handle clicking login button
     */
    $scope.onClickLogin = function() {
      JusticarAuth.openLoginPanel();
      mdPanelRef.close();
    };

    $scope.onClickClose = function() {
      mdPanelRef.close();
    };
  }
]);
