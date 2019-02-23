/**
 * @namespace Justicar.WebClient.States.Admin.Weather
 * Stores all the states for the Angular UI router state machine and associates controllers
 */
let stateAdminWeather = angular.module("Justicar.WebClient.States.Admin.Weather", [
  'ui.router'
]);

/**
 * State name for this state
 */
stateAdminWeather.constant("WEATHER_STATE", "admin.weather");

/**
 * Sub-URL for this state
 */
stateAdminWeather.constant("WEATHER_STATE_URL", "/weather");

/**
 * Location to load view from
 */
stateAdminWeather.constant("WEATHER_TEMPLATE_URL", "/partials/states/admin/weather");

/**
 * Config action that sets up this module
 */
stateAdminWeather.config([
  '$stateProvider',
  'WEATHER_STATE',
  'WEATHER_STATE_URL',
  'WEATHER_TEMPLATE_URL',
  function($stateProvider, WEATHER_STATE, WEATHER_STATE_URL, WEATHER_TEMPLATE_URL) {

    /**
     * Set up state in application state machine.
     */
    $stateProvider
      .state(WEATHER_STATE, {
        url: WEATHER_STATE_URL,
        params: {},
        controller: "StateAdminWeatherCtrl",
        templateUrl: WEATHER_TEMPLATE_URL
      })
    ;
  }
]);

/**
 * Controller for state
 */
stateAdminWeather.controller("StateAdminWeatherCtrl", ['JusticarAPI', '$scope', '$mdPanel', '$mdDialog', '$q', '$log',
  function(JusticarAPI, $scope, $mdPanel, $mdDialog, $q, $log) {
    $scope.loading = true;
    $scope.channels = [];

    function load() {
      $scope.loading = true;
      $scope.weather = JusticarAPI.resources.weather.query();

      $scope.weather.$promise.then(function() {
        $scope.loading = false;
      });
    }


    /**
     * Open registration panel
     */
    function openWeatherPanel(record) {
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
        controller: 'PanelWeatherCtrl',
        disableParentScroll: true,
        templateUrl: '/partials/panels/records/weather',
        panelClass: "justicar-panel",
        zIndex: 175,
        locals: {
          record: record,
          deferred: deferred
        },
        trapFocus: true,
        clickOutsideToClose: false,
        clickEscapeToClose: true,
        hasBackdrop: true,
        position: panelPosition,
        animation: panelAnimation
      };

      $mdPanel.open(panelConfig);

      return deferred.promise;
    }

    load();

    /**
     * Open up panel with blank record
     */
    $scope.clickAdd = function() {
      openWeatherPanel().then(
        function() {
          load();
        },
        function(err) {
          $log.error(err);
        }
      );
    };

    /**
     * Open up panel with a resource record
     */
    $scope.clickEdit = function(record) {
      openWeatherPanel(angular.copy(record)).then(
        function() {
          load();
        },
        function(err) {
          $log.error(err);
        }
      );
    };

    /**
     * Delete record
     */
    $scope.clickDelete = function(record) {
      let confirm = $mdDialog.confirm()
        .title("Are you sure you want to delete this?")
        .textContent("Confirm that you want to delete this.")
        .ariaLabel("Confirm delete")
        .ok('Yes, delete this')
        .cancel("No, don't delete");

      $mdDialog.show(confirm).then(
        function() {
          return record.$delete().$promise;
        },
        function() {
          return null;
        }
      ).then(
        function() {
          load();
        }
      ).catch(
        function(err) {
          $log.error(err);
        }
      );
    };
  }
]);


stateAdminWeather.controller('PanelWeatherCtrl', ['mdPanelRef', '$scope', '$log', 'JusticarAPI', 'deferred', 'record',
  function(mdPanelRef, $scope, $log, JusticarAPI, deferred, record) {
    $scope.waiting = true;
    $scope.errorMssg = "";

    function init() {
      if (!record) {
        $scope.record = new JusticarAPI.resources.weather({
          summary: "",
          description: "",
          season: {
        		spring: false,
        		summer: false,
        		autumn: false,
        		winter: false
        	}
        });
      } else {
        $scope.record = record;
      }

      $scope.waiting = false; // @TODO finish
    }
    /**
     * Handle clicking login button, using $scope.userEmail & $scope.userPassword
     */
    $scope.onClickSave = function() {
      $scope.record.$save().then(
        function() {
          deferred.resolve();
          mdPanelRef.close();
        },
        function(err) {
          $log.error(err);
        }
      );
      mdPanelRef.close();
    };

    $scope.onClickCancel = function() {
      deferred.resolve();
      mdPanelRef.close();
    };

    init();
  }
]);
