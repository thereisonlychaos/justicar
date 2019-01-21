/**
 * @namespace Justicar.WebClient.Widgets.Toolbar
 * Stores all the states for the Angular UI router state machine and associates controllers
 */
let widgetToolbar = angular.module("Justicar.WebClient.Widgets.Toolbar", [
  'ui.router',
  'Justicar.WebClient.API',
  'Justicar.WebClient.Auth'
]);

/**
 * Controller for widget
 */
widgetToolbar.controller("WidgetToolbarCtrl", ['$scope', 'JusticarAuth',
  function($scope, JusticarAuth) {
    $scope.bAuthPending = function() {
      return JusticarAuth.pending;
    };

    $scope.bLoggedIn = function() {
      // is there a valid account?
      return JusticarAuth.bLoggedIn();
    };

    $scope.onClickLogIn = function() {
      JusticarAuth.openLoginPanel();
    };

    $scope.onClickLogOut = function() {
      JusticarAuth.logout();
    };

    $scope.getDisplayName = function() {
      return JusticarAuth.getDisplayName();
    };
  }
]);
