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
    $scope.bShowAccount = function() {
      // is there a valid account?
      return false;
    };

    $scope.onClickLogin = function() {
      JusticarAuth.openLoginPanel();
    };

    $scope.onClickAccount = function() {
      // @TODO
    };

    $scope.getAccountName = function() {

    };
  }
]);
