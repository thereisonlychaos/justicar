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
stateAdminChannels.controller("StateAdminChannelsCtrl", ['JusticarAPI', '$scope', '$mdPanel', '$mdDialog', '$q', '$log',
  function(JusticarAPI, $scope, $mdPanel, $mdDialog, $q, $log) {
    $scope.loading = true;
    $scope.channels = [];

    function load() {
      $scope.loading = true;
      $scope.channels = JusticarAPI.resources.channel.query();

      $scope.channels.$promise.then(function() {
        $scope.loading = false;
      });
    }


    /**
     * Open registration panel
     */
    function openChannelPanel(record) {
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
        controller: 'PanelChannelCtrl',
        disableParentScroll: true,
        templateUrl: '/partials/panels/records/channel',
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
      openChannelPanel({}).then(
        function() {
          load();
        },
        function(err) {
          $log.error(err);
        }
      );
    };

    /**
     * Open up panel with a channel resource record
     */
    $scope.clickEdit = function(record) {
      openChannelPanel(record).then(
        function() {
          load();
        },
        function(err) {
          $log.error(err);
        }
      );
    };

    /**
     * Delete channel
     */
    $scope.clickDelete = function(record) {
      let confirm = $mdDialog.confirm()
        .title("Are you sure you want to delete this?")
        .textContent("Confirm that you want to delete this channel.")
        .ariaLabel("Confirm delete")
        .ok('Yes, delete this')
        .cancel("No, don't delete");

      $mdDialog.show(confirm).then(
        function() {
          return record.delete.$promise;
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


stateAdminChannels.controller('PanelChannelCtrl', ['mdPanelRef', '$scope', '$log', 'JusticarAPI',
  function(mdPanelRef, $scope, $log, JusticarAPI) {
    $scope.waiting = true;
    $scope.errorMssg = "";

    function init() {
      $scope.waiting = false; // @TODO finish
    }
    /**
     * Handle clicking login button, using $scope.userEmail & $scope.userPassword
     */
    $scope.onClickSave = function() {
      mdPanelRef.close();
    };

    $scope.onClickCancel = function() {
      mdPanelRef.close();
    };

    init();
  }
]);
