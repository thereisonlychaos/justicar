(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/**
 * @namespace Justicar.WebClient
 */
'use strict';

// Local Angular Modules Only. Plugins and other libraries go in the lib.js folder to make for quicker compiling.

require('./modules/api/index.js');
require('./modules/auth/index.js');

// Mixins

// Local State Modules
require('./states/index.js');

// Define main module


angular.module('Justicar.WebClient', [
// Angular Libraries
'ngMaterial', // angular-material
'ngSanitize', // angular-sanitize
'ngResource', // angular-resource
'ngAnimate', // angular-animate
'ngMessages', // angular-messages
'angularMoment', 'angular.filter', 'LocalStorageModule', // angular-local-storage
'ui.router',

// Local modules
'Justicar.WebClient.API', 'Justicar.WebClient.Auth', 'Justicar.WebClient.States']).config(['$locationProvider', '$mdThemingProvider', '$urlRouterProvider', function ($locationProvider, $mdThemingProvider, $urlRouterProvider) {

  /**
   * $locationProvider settings
   */
  $locationProvider.hashPrefix('');
  $locationProvider.html5Mode(false);

  /**
   * Theming
   */

  $mdThemingProvider.definePalette('justicarPrimary', {
    '50': 'ede3e3',
    '100': 'd3baba',
    '200': 'b68c8c',
    '300': '995e5e',
    '400': '833c3c',
    '500': '6d1919',
    '600': '651616',
    '700': '5a1212',
    '800': '500e0e',
    '900': '3e0808',
    'A100': 'ff7575',
    'A200': 'ff4242',
    'A400': 'b80c0c',
    'A700': '970000',
    'contrastDefaultColor': 'light',
    'contrastDarkColors': ['50', '100', '200', 'A100', 'A200'],
    'contrastLightColors': ['300', '400', '500', '600', '700', '800', '900', 'A400', 'A700']
  });
  $mdThemingProvider.definePalette('justicarAccent', {
    '50': 'fcf2e7',
    '100': 'f8dec3',
    '200': 'f3c89c',
    '300': 'eeb274',
    '400': 'eaa256',
    '500': 'e69138',
    '600': 'e38932',
    '700': 'df7e2b',
    '800': 'db7424',
    '900': 'd56217',
    'A100': 'f9daba',
    'A200': 'f2cda7',
    'A400': 'ffc3a1',
    'A700': 'ffb287',
    'contrastDefaultColor': 'light',
    'contrastDarkColors': ['50', '100', '200', '300', '400', '500', '600', '700', '800', 'A100', 'A200', 'A400', 'A700'],
    'contrastLightColors': ['900']
  });
  $mdThemingProvider.definePalette('justicarWarn', {
    '50': 'fffaed',
    '100': 'fff4d1',
    '200': 'ffecb3',
    '300': 'ffe494',
    '400': 'ffdf7d',
    '500': 'ffd966',
    '600': 'ffd55e',
    '700': 'ffcf53',
    '800': 'ffca49',
    '900': 'ffc038',
    'A100': 'ffffff',
    'A200': 'ffffff',
    'A400': 'fff5e1',
    'A700': 'ffedc8',
    'contrastDefaultColor': 'light',
    'contrastDarkColors': ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', 'A100', 'A200', 'A400', 'A700'],
    'contrastLightColors': []
  });
  $mdThemingProvider.definePalette('justicarBackground', {
    '50': 'e0e0e0',
    '100': 'b3b3b3',
    '200': '808080',
    '300': '4d4d4d',
    '400': '262626',
    '500': '000000',
    '600': '000000',
    '700': '000000',
    '800': '000000',
    '900': '000000',
    'A100': 'a6a6a6',
    'A200': '8c8c8c',
    'A400': '737373',
    'A700': '666666',
    'contrastDefaultColor': 'light',
    'contrastDarkColors': ['50', '100', '200', 'A100', 'A200'],
    'contrastLightColors': ['300', '400', '500', '600', '700', '800', '900', 'A400', 'A700']
  });

  $mdThemingProvider.theme('justicar').primaryPalette('justicarPrimary').accentPalette('justicarAccent').warnPalette('justicarWarn').backgroundPalette('justicarBackground');

  // setting it as default theme
  $mdThemingProvider.setDefaultTheme('justicar');

  /**
   * Setting up state machine
   */
  $urlRouterProvider.otherwise("/start");
}]).run(['$rootScope', '$log', '$transitions', 'JusticarAPI', function ($rootScope, $log, $transitions, JusticarAPI) {}]);

angular.module("Justicar.WebClient").controller("MainCtrl", ['$scope', '$log', '$mdSidenav', 'JusticarAuth', function ($scope, $log, $mdSidenav, JusticarAuth) {
  /**
   * Toggle sidenav on button click
   */
  $scope.toggleSidenav = function () {
    $mdSidenav("sidenav").toggle();
  };

  JusticarAuth.init();
}]);

},{"./modules/api/index.js":2,"./modules/auth/index.js":3,"./states/index.js":5}],2:[function(require,module,exports){
"use strict";

/**
 * @namespace Justicar.WebClient.API
 * sets up the API configuration
 */
var moduleAPI = angular.module("Justicar.WebClient.API", ['ngResource']);

/**
 * Stores base URL for api
 */
moduleAPI.constant("API_URL", "http://127.0.0.1:3000/api");

moduleAPI.service("JusticarAPI", ['$http', '$resource', '$log', '$q', 'API_URL', function ($http, $resource, $log, $q, API_URL) {
  var JusticarAPI = {};

  /**
   * Auth functions used for auth and user management
   */
  JusticarAPI.auth = {};

  JusticarAPI.auth.login = function (email, password) {
    return $http.post(API_URL + "/user/login", {
      email: email,
      password: password
    });
  };

  JusticarAPI.auth.logout = function () {
    return $http.post(API_URL + "/user/logout");
  };

  JusticarAPI.auth.current = function () {
    return $http.get(API_URL + "/user/current");
  };

  JusticarAPI.auth.register = function (email, password) {
    return $http.post(API_URL + "/user/register", {
      email: email,
      password: password
    });
  };

  return JusticarAPI;
}]);

},{}],3:[function(require,module,exports){
'use strict';

/**
 * @namespace Justicar.WebClient.Auth
 * handles login and checking permissions
 */
var moduleAuth = angular.module("Justicar.WebClient.Auth", ['ngResource', 'Justicar.WebClient.API']);

/**
 *
 */

moduleAuth.service("JusticarAuth", ['$http', '$resource', '$log', '$q', '$mdPanel', 'JusticarAPI', function ($http, $resource, $log, $q, $mdPanel, JusticarAPI) {
  var JusticarAuth = {};

  JusticarAuth.currentUser = null;

  /**
   * Login to system
   */
  JusticarAuth.init = function () {
    JusticarAPI.auth.current().then(function (response) {
      JusticarAuth.currentUser = response.data.user;
    }).catch(function (err) {
      JusticarAuth.currentUser = null;
      JusticarAuth.openLoginPanel();
    });
  };

  /**
   * Login to system
   */
  JusticarAuth.login = function (email, password) {
    JusticarAPI.auth.login(email, password).then(function (response) {
      JusticarAuth.currentUser = response.data.user;
    }).catch(function (err) {
      // @TODO better handling of results, failed login, etc.
      throw new Error(err);
    });
  };

  /**
   * Logout of system
   */
  JusticarAuth.logout = function () {
    JusticarAPI.auth.logout().then(function () {
      JusticarAuth.currentUser = null;
    }).catch(function (err) {
      // @TODO better handling of results, failed login, etc.
      throw new Error(err);
    });
  };

  /**
   * Register new user
   */
  JusticarAuth.register = function (email, password) {
    JusticarAPI.auth.register(email, password).then(function (response) {
      JusticarAuth.currentUser = response.data.user; // this is likely wrong
    }).catch(function (err) {
      // @TODO better handling of results, failed login, etc.
      throw new Error(err);
    });
  };

  /**
   * Open modal panel for logging inspect
   */
  JusticarAuth.openLoginPanel = function ($event) {
    var deferred = $q.defer();

    var panelPosition = $mdPanel.newPanelPosition().absolute().center();

    var panelAnimation = $mdPanel.newPanelAnimation().openFrom({ top: 1, right: 0 }).duration(200).closeTo({ top: 1, right: 0 }).withAnimation($mdPanel.animation.SCALE);

    var panelConfig = {
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
  JusticarAuth.openRegisterPanel = function () {
    var deferred = $q.defer();

    var panelPosition = $mdPanel.newPanelPosition().absolute().center();

    var panelAnimation = $mdPanel.newPanelAnimation().openFrom({ top: 1, left: 1 }).duration(200).closeTo({ top: 1, left: 1 }).withAnimation($mdPanel.animation.SCALE);

    var panelConfig = {
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
  JusticarAuth.checkPermissions = function (permission) {
    // @TODO
  };

  return JusticarAuth;
}]);

moduleAuth.controller('LoginCtrl', [function ($mdPanel) {}]);

moduleAuth.controller('RegisterCtrl', [function ($mdPanel) {}]);

},{}],4:[function(require,module,exports){
"use strict";

/**
 * @namespace Justicar.WebClient.States.Admin
 * Stores all the states for the Angular UI router state machine and associates controllers
 */
var stateAdmin = angular.module("Justicar.WebClient.States.Admin", ['ui.router']);

/**
 * State name for this state
 */
stateAdmin.constant("ADMIN_STATE", "admin");

/**
 * Sub-URL for this state
 */
stateAdmin.constant("ADMIN_STATE_URL", "/admin");

/**
 * Config action that sets up this module
 */
stateAdmin.config(['$stateProvider', 'ADMIN_STATE', 'ADMIN_STATE_URL', function ($stateProvider, ADMIN_STATE, ADMIN_STATE_URL) {

  /**
   * Set up state in application state machine.
   */
  $stateProvider.state(ADMIN_STATE, {
    url: ADMIN_STATE_URL,
    params: {},
    abstract: true
  });
}]);

},{}],5:[function(require,module,exports){
"use strict";

require("./landing/index.js");
require("./player/index.js");
require("./admin/index.js");

/**
 * @namespace Justicar.WebClient.States
 * Stores all the states for the Angular UI router state machine and associates controllers
 */
angular.module("Justicar.WebClient.States", ['Justicar.WebClient.States.Landing', 'Justicar.WebClient.States.Player', 'Justicar.WebClient.States.Admin']);

},{"./admin/index.js":4,"./landing/index.js":6,"./player/index.js":7}],6:[function(require,module,exports){
"use strict";

/**
 * @namespace Justicar.WebClient.States.Landing
 * Stores all the states for the Angular UI router state machine and associates controllers
 */
var stateLanding = angular.module("Justicar.WebClient.States.Landing", ['ui.router']);

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
stateLanding.config(['$stateProvider', 'LANDING_STATE', 'LANDING_STATE_URL', 'LANDING_TEMPLATE_URL', function ($stateProvider, LANDING_STATE, LANDING_STATE_URL, LANDING_TEMPLATE_URL) {

  /**
   * Set up state in application state machine.
   */
  $stateProvider.state(LANDING_STATE, {
    url: LANDING_STATE_URL,
    params: {},
    controller: "StateLandingCtrl",
    templateUrl: LANDING_TEMPLATE_URL
  });
}]);

/**
 * Controller for state
 */
stateLanding.controller("StateLandingCtrl", [function () {}]);

},{}],7:[function(require,module,exports){
"use strict";

/**
 * @namespace Justicar.WebClient.States.Player
 * Stores all the states for the Angular UI router state machine and associates controllers
 */
var statePlayer = angular.module("Justicar.WebClient.States.Player", ['ui.router']);

/**
 * State name for this state
 */
statePlayer.constant("PLAYER_STATE", "player");

/**
 * Sub-URL for this state
 */
statePlayer.constant("PLAYER_STATE_URL", "/player");

/**
 * Config action that sets up this module
 */
statePlayer.config(['$stateProvider', 'PLAYER_STATE', 'PLAYER_STATE_URL', function ($stateProvider, PLAYER_STATE, PLAYER_STATE_URL) {

  /**
   * Set up state in application state machine.
   */
  $stateProvider.state(PLAYER_STATE, {
    url: PLAYER_STATE_URL,
    params: {},
    abstract: true
  });
}]);

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvY2xpZW50LmpzIiwiY2xpZW50L21vZHVsZXMvYXBpL2luZGV4LmpzIiwiY2xpZW50L21vZHVsZXMvYXV0aC9pbmRleC5qcyIsImNsaWVudC9zdGF0ZXMvYWRtaW4vaW5kZXguanMiLCJjbGllbnQvc3RhdGVzL2luZGV4LmpzIiwiY2xpZW50L3N0YXRlcy9sYW5kaW5nL2luZGV4LmpzIiwiY2xpZW50L3N0YXRlcy9wbGF5ZXIvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7O0FBR0E7O0FBRUE7O0FBQ0EsUUFBUSx3QkFBUjtBQUNBLFFBQVEseUJBQVI7O0FBRUE7O0FBRUE7QUFDQSxRQUFRLG1CQUFSOztBQUVBOzs7QUFHQSxRQUFRLE1BQVIsQ0FBZSxvQkFBZixFQUFxQztBQUNqQztBQUNBLFlBRmlDLEVBRW5CO0FBQ2QsWUFIaUMsRUFHbkI7QUFDZCxZQUppQyxFQUluQjtBQUNkLFdBTGlDLEVBS3BCO0FBQ2IsWUFOaUMsRUFNbkI7QUFDZCxlQVBpQyxFQVFqQyxnQkFSaUMsRUFTakMsb0JBVGlDLEVBU1g7QUFDdEIsV0FWaUM7O0FBWWpDO0FBQ0Esd0JBYmlDLEVBY2pDLHlCQWRpQyxFQWVqQywyQkFmaUMsQ0FBckMsRUFnQkcsTUFoQkgsQ0FnQlUsQ0FDTixtQkFETSxFQUVOLG9CQUZNLEVBR04sb0JBSE0sRUFJTixVQUFTLGlCQUFULEVBQTRCLGtCQUE1QixFQUFnRCxrQkFBaEQsRUFBb0U7O0FBR2hFOzs7QUFHQSxvQkFBa0IsVUFBbEIsQ0FBNkIsRUFBN0I7QUFDQSxvQkFBa0IsU0FBbEIsQ0FBNEIsS0FBNUI7O0FBRUE7Ozs7QUFJQyxxQkFBbUIsYUFBbkIsQ0FBaUMsaUJBQWpDLEVBQW9EO0FBQ2xELFVBQU0sUUFENEM7QUFFbEQsV0FBTyxRQUYyQztBQUdsRCxXQUFPLFFBSDJDO0FBSWxELFdBQU8sUUFKMkM7QUFLbEQsV0FBTyxRQUwyQztBQU1sRCxXQUFPLFFBTjJDO0FBT2xELFdBQU8sUUFQMkM7QUFRbEQsV0FBTyxRQVIyQztBQVNsRCxXQUFPLFFBVDJDO0FBVWxELFdBQU8sUUFWMkM7QUFXbEQsWUFBUSxRQVgwQztBQVlsRCxZQUFRLFFBWjBDO0FBYWxELFlBQVEsUUFiMEM7QUFjbEQsWUFBUSxRQWQwQztBQWVsRCw0QkFBd0IsT0FmMEI7QUFnQmxELDBCQUFzQixDQUNwQixJQURvQixFQUVwQixLQUZvQixFQUdwQixLQUhvQixFQUlwQixNQUpvQixFQUtwQixNQUxvQixDQWhCNEI7QUF1QmxELDJCQUF1QixDQUNyQixLQURxQixFQUVyQixLQUZxQixFQUdyQixLQUhxQixFQUlyQixLQUpxQixFQUtyQixLQUxxQixFQU1yQixLQU5xQixFQU9yQixLQVBxQixFQVFyQixNQVJxQixFQVNyQixNQVRxQjtBQXZCMkIsR0FBcEQ7QUFtQ0EscUJBQW1CLGFBQW5CLENBQWlDLGdCQUFqQyxFQUFtRDtBQUNqRCxVQUFNLFFBRDJDO0FBRWpELFdBQU8sUUFGMEM7QUFHakQsV0FBTyxRQUgwQztBQUlqRCxXQUFPLFFBSjBDO0FBS2pELFdBQU8sUUFMMEM7QUFNakQsV0FBTyxRQU4wQztBQU9qRCxXQUFPLFFBUDBDO0FBUWpELFdBQU8sUUFSMEM7QUFTakQsV0FBTyxRQVQwQztBQVVqRCxXQUFPLFFBVjBDO0FBV2pELFlBQVEsUUFYeUM7QUFZakQsWUFBUSxRQVp5QztBQWFqRCxZQUFRLFFBYnlDO0FBY2pELFlBQVEsUUFkeUM7QUFlakQsNEJBQXdCLE9BZnlCO0FBZ0JqRCwwQkFBc0IsQ0FDcEIsSUFEb0IsRUFFcEIsS0FGb0IsRUFHcEIsS0FIb0IsRUFJcEIsS0FKb0IsRUFLcEIsS0FMb0IsRUFNcEIsS0FOb0IsRUFPcEIsS0FQb0IsRUFRcEIsS0FSb0IsRUFTcEIsS0FUb0IsRUFVcEIsTUFWb0IsRUFXcEIsTUFYb0IsRUFZcEIsTUFab0IsRUFhcEIsTUFib0IsQ0FoQjJCO0FBK0JqRCwyQkFBdUIsQ0FDckIsS0FEcUI7QUEvQjBCLEdBQW5EO0FBbUNBLHFCQUFtQixhQUFuQixDQUFpQyxjQUFqQyxFQUFpRDtBQUMvQyxVQUFNLFFBRHlDO0FBRS9DLFdBQU8sUUFGd0M7QUFHL0MsV0FBTyxRQUh3QztBQUkvQyxXQUFPLFFBSndDO0FBSy9DLFdBQU8sUUFMd0M7QUFNL0MsV0FBTyxRQU53QztBQU8vQyxXQUFPLFFBUHdDO0FBUS9DLFdBQU8sUUFSd0M7QUFTL0MsV0FBTyxRQVR3QztBQVUvQyxXQUFPLFFBVndDO0FBVy9DLFlBQVEsUUFYdUM7QUFZL0MsWUFBUSxRQVp1QztBQWEvQyxZQUFRLFFBYnVDO0FBYy9DLFlBQVEsUUFkdUM7QUFlL0MsNEJBQXdCLE9BZnVCO0FBZ0IvQywwQkFBc0IsQ0FDcEIsSUFEb0IsRUFFcEIsS0FGb0IsRUFHcEIsS0FIb0IsRUFJcEIsS0FKb0IsRUFLcEIsS0FMb0IsRUFNcEIsS0FOb0IsRUFPcEIsS0FQb0IsRUFRcEIsS0FSb0IsRUFTcEIsS0FUb0IsRUFVcEIsS0FWb0IsRUFXcEIsTUFYb0IsRUFZcEIsTUFab0IsRUFhcEIsTUFib0IsRUFjcEIsTUFkb0IsQ0FoQnlCO0FBZ0MvQywyQkFBdUI7QUFoQ3dCLEdBQWpEO0FBa0NBLHFCQUFtQixhQUFuQixDQUFpQyxvQkFBakMsRUFBdUQ7QUFDckQsVUFBTSxRQUQrQztBQUVyRCxXQUFPLFFBRjhDO0FBR3JELFdBQU8sUUFIOEM7QUFJckQsV0FBTyxRQUo4QztBQUtyRCxXQUFPLFFBTDhDO0FBTXJELFdBQU8sUUFOOEM7QUFPckQsV0FBTyxRQVA4QztBQVFyRCxXQUFPLFFBUjhDO0FBU3JELFdBQU8sUUFUOEM7QUFVckQsV0FBTyxRQVY4QztBQVdyRCxZQUFRLFFBWDZDO0FBWXJELFlBQVEsUUFaNkM7QUFhckQsWUFBUSxRQWI2QztBQWNyRCxZQUFRLFFBZDZDO0FBZXJELDRCQUF3QixPQWY2QjtBQWdCckQsMEJBQXNCLENBQ3BCLElBRG9CLEVBRXBCLEtBRm9CLEVBR3BCLEtBSG9CLEVBSXBCLE1BSm9CLEVBS3BCLE1BTG9CLENBaEIrQjtBQXVCckQsMkJBQXVCLENBQ3JCLEtBRHFCLEVBRXJCLEtBRnFCLEVBR3JCLEtBSHFCLEVBSXJCLEtBSnFCLEVBS3JCLEtBTHFCLEVBTXJCLEtBTnFCLEVBT3JCLEtBUHFCLEVBUXJCLE1BUnFCLEVBU3JCLE1BVHFCO0FBdkI4QixHQUF2RDs7QUFvQ0QscUJBQW1CLEtBQW5CLENBQXlCLFVBQXpCLEVBQ0ssY0FETCxDQUNvQixpQkFEcEIsRUFFSyxhQUZMLENBRW1CLGdCQUZuQixFQUdLLFdBSEwsQ0FHaUIsY0FIakIsRUFJSyxpQkFKTCxDQUl1QixvQkFKdkI7O0FBTUE7QUFDQSxxQkFBbUIsZUFBbkIsQ0FBbUMsVUFBbkM7O0FBRUE7OztBQUdBLHFCQUFtQixTQUFuQixDQUE2QixRQUE3QjtBQUdILENBNUtLLENBaEJWLEVBNkxHLEdBN0xILENBNkxPLENBQ0gsWUFERyxFQUVILE1BRkcsRUFHSCxjQUhHLEVBSUgsYUFKRyxFQUtILFVBQVMsVUFBVCxFQUFxQixJQUFyQixFQUEyQixZQUEzQixFQUF5QyxXQUF6QyxFQUFzRCxDQUVyRCxDQVBFLENBN0xQOztBQXVNQSxRQUFRLE1BQVIsQ0FBZSxvQkFBZixFQUFxQyxVQUFyQyxDQUFnRCxVQUFoRCxFQUE0RCxDQUFDLFFBQUQsRUFBVyxNQUFYLEVBQW1CLFlBQW5CLEVBQWlDLGNBQWpDLEVBQzFELFVBQVMsTUFBVCxFQUFpQixJQUFqQixFQUF1QixVQUF2QixFQUFtQyxZQUFuQyxFQUFpRDtBQUMvQzs7O0FBR0EsU0FBTyxhQUFQLEdBQXVCLFlBQVc7QUFDaEMsZUFBVyxTQUFYLEVBQXNCLE1BQXRCO0FBQ0QsR0FGRDs7QUFJQSxlQUFhLElBQWI7QUFDRCxDQVZ5RCxDQUE1RDs7Ozs7QUN4TkE7Ozs7QUFJQSxJQUFJLFlBQVksUUFBUSxNQUFSLENBQWUsd0JBQWYsRUFBeUMsQ0FBQyxZQUFELENBQXpDLENBQWhCOztBQUVBOzs7QUFHQSxVQUFVLFFBQVYsQ0FBbUIsU0FBbkIsRUFBOEIsMkJBQTlCOztBQUVBLFVBQVUsT0FBVixDQUFrQixhQUFsQixFQUFpQyxDQUFDLE9BQUQsRUFBVSxXQUFWLEVBQXVCLE1BQXZCLEVBQStCLElBQS9CLEVBQXFDLFNBQXJDLEVBQy9CLFVBQVMsS0FBVCxFQUFnQixTQUFoQixFQUEyQixJQUEzQixFQUFpQyxFQUFqQyxFQUFxQyxPQUFyQyxFQUE4QztBQUMxQyxNQUFJLGNBQWMsRUFBbEI7O0FBRUE7OztBQUdBLGNBQVksSUFBWixHQUFtQixFQUFuQjs7QUFFQSxjQUFZLElBQVosQ0FBaUIsS0FBakIsR0FBeUIsVUFBUyxLQUFULEVBQWdCLFFBQWhCLEVBQTBCO0FBQ2pELFdBQU8sTUFBTSxJQUFOLENBQVcsVUFBVSxhQUFyQixFQUFvQztBQUN6QyxhQUFPLEtBRGtDO0FBRXpDLGdCQUFVO0FBRitCLEtBQXBDLENBQVA7QUFJRCxHQUxEOztBQU9BLGNBQVksSUFBWixDQUFpQixNQUFqQixHQUEwQixZQUFXO0FBQ25DLFdBQU8sTUFBTSxJQUFOLENBQVcsVUFBVSxjQUFyQixDQUFQO0FBQ0QsR0FGRDs7QUFJQSxjQUFZLElBQVosQ0FBaUIsT0FBakIsR0FBMkIsWUFBVztBQUNwQyxXQUFPLE1BQU0sR0FBTixDQUFVLFVBQVUsZUFBcEIsQ0FBUDtBQUNELEdBRkQ7O0FBSUEsY0FBWSxJQUFaLENBQWlCLFFBQWpCLEdBQTRCLFVBQVMsS0FBVCxFQUFnQixRQUFoQixFQUEwQjtBQUNwRCxXQUFPLE1BQU0sSUFBTixDQUFXLFVBQVUsZ0JBQXJCLEVBQXVDO0FBQzVDLGFBQU8sS0FEcUM7QUFFNUMsZ0JBQVU7QUFGa0MsS0FBdkMsQ0FBUDtBQUlELEdBTEQ7O0FBT0EsU0FBTyxXQUFQO0FBQ0gsQ0FoQzhCLENBQWpDOzs7OztBQ1hBOzs7O0FBSUEsSUFBSSxhQUFhLFFBQVEsTUFBUixDQUFlLHlCQUFmLEVBQTBDLENBQUMsWUFBRCxFQUFlLHdCQUFmLENBQTFDLENBQWpCOztBQUVBOzs7O0FBSUEsV0FBVyxPQUFYLENBQW1CLGNBQW5CLEVBQW1DLENBQUMsT0FBRCxFQUFVLFdBQVYsRUFBdUIsTUFBdkIsRUFBK0IsSUFBL0IsRUFBcUMsVUFBckMsRUFBaUQsYUFBakQsRUFDakMsVUFBUyxLQUFULEVBQWdCLFNBQWhCLEVBQTJCLElBQTNCLEVBQWlDLEVBQWpDLEVBQXFDLFFBQXJDLEVBQStDLFdBQS9DLEVBQTREO0FBQ3hELE1BQUksZUFBZSxFQUFuQjs7QUFFQSxlQUFhLFdBQWIsR0FBMkIsSUFBM0I7O0FBRUE7OztBQUdBLGVBQWEsSUFBYixHQUFvQixZQUFXO0FBQzdCLGdCQUFZLElBQVosQ0FBaUIsT0FBakIsR0FBMkIsSUFBM0IsQ0FDRSxVQUFTLFFBQVQsRUFBbUI7QUFDakIsbUJBQWEsV0FBYixHQUEyQixTQUFTLElBQVQsQ0FBYyxJQUF6QztBQUVELEtBSkgsRUFLRSxLQUxGLENBTUUsVUFBUyxHQUFULEVBQWM7QUFDWixtQkFBYSxXQUFiLEdBQTJCLElBQTNCO0FBQ0EsbUJBQWEsY0FBYjtBQUNELEtBVEg7QUFXRCxHQVpEOztBQWNBOzs7QUFHQSxlQUFhLEtBQWIsR0FBcUIsVUFBUyxLQUFULEVBQWdCLFFBQWhCLEVBQTBCO0FBQzdDLGdCQUFZLElBQVosQ0FBaUIsS0FBakIsQ0FBdUIsS0FBdkIsRUFBOEIsUUFBOUIsRUFBd0MsSUFBeEMsQ0FDRSxVQUFTLFFBQVQsRUFBbUI7QUFDakIsbUJBQWEsV0FBYixHQUEyQixTQUFTLElBQVQsQ0FBYyxJQUF6QztBQUNELEtBSEgsRUFJRSxLQUpGLENBS0UsVUFBUyxHQUFULEVBQWM7QUFDWjtBQUNBLFlBQU0sSUFBSSxLQUFKLENBQVUsR0FBVixDQUFOO0FBQ0QsS0FSSDtBQVVELEdBWEQ7O0FBYUE7OztBQUdBLGVBQWEsTUFBYixHQUFzQixZQUFXO0FBQy9CLGdCQUFZLElBQVosQ0FBaUIsTUFBakIsR0FBMEIsSUFBMUIsQ0FDRSxZQUFXO0FBQ1QsbUJBQWEsV0FBYixHQUEyQixJQUEzQjtBQUNELEtBSEgsRUFJRSxLQUpGLENBS0UsVUFBUyxHQUFULEVBQWM7QUFDWjtBQUNBLFlBQU0sSUFBSSxLQUFKLENBQVUsR0FBVixDQUFOO0FBQ0QsS0FSSDtBQVVELEdBWEQ7O0FBYUE7OztBQUdBLGVBQWEsUUFBYixHQUF3QixVQUFTLEtBQVQsRUFBZ0IsUUFBaEIsRUFBMEI7QUFDaEQsZ0JBQVksSUFBWixDQUFpQixRQUFqQixDQUEwQixLQUExQixFQUFpQyxRQUFqQyxFQUEyQyxJQUEzQyxDQUNFLFVBQVMsUUFBVCxFQUFtQjtBQUNqQixtQkFBYSxXQUFiLEdBQTJCLFNBQVMsSUFBVCxDQUFjLElBQXpDLENBRGlCLENBQzhCO0FBQ2hELEtBSEgsRUFJRSxLQUpGLENBS0UsVUFBUyxHQUFULEVBQWM7QUFDWjtBQUNBLFlBQU0sSUFBSSxLQUFKLENBQVUsR0FBVixDQUFOO0FBQ0QsS0FSSDtBQVVELEdBWEQ7O0FBYUE7OztBQUdBLGVBQWEsY0FBYixHQUE4QixVQUFTLE1BQVQsRUFBaUI7QUFDN0MsUUFBSSxXQUFXLEdBQUcsS0FBSCxFQUFmOztBQUVBLFFBQUksZ0JBQWdCLFNBQVMsZ0JBQVQsR0FDakIsUUFEaUIsR0FFakIsTUFGaUIsRUFBcEI7O0FBSUEsUUFBSSxpQkFBaUIsU0FBUyxpQkFBVCxHQUNsQixRQURrQixDQUNULEVBQUUsS0FBSyxDQUFQLEVBQVUsT0FBTSxDQUFoQixFQURTLEVBRWxCLFFBRmtCLENBRVQsR0FGUyxFQUdsQixPQUhrQixDQUdWLEVBQUUsS0FBSyxDQUFQLEVBQVUsT0FBTSxDQUFoQixFQUhVLEVBSWxCLGFBSmtCLENBSUosU0FBUyxTQUFULENBQW1CLEtBSmYsQ0FBckI7O0FBTUEsUUFBSSxjQUFjO0FBQ2hCLGdCQUFVLFFBQVEsT0FBUixDQUFnQixTQUFTLElBQXpCLENBRE07QUFFaEIsa0JBQVksV0FGSTtBQUdoQiwyQkFBcUIsSUFITDtBQUloQixtQkFBYSx3QkFKRztBQUtoQixrQkFBWSxnQkFMSTtBQU1oQixjQUFRLEdBTlE7QUFPaEIsY0FBUTtBQUNOLGtCQUFVO0FBREosT0FQUTtBQVVoQixpQkFBVyxJQVZLO0FBV2hCLDJCQUFxQixJQVhMO0FBWWhCLDBCQUFvQixJQVpKO0FBYWhCLG1CQUFhLElBYkc7QUFjaEIsZ0JBQVUsYUFkTTtBQWVoQixpQkFBVztBQWZLLEtBQWxCOztBQWtCQSxhQUFTLElBQVQsQ0FBYyxXQUFkOztBQUVBLFdBQU8sU0FBUyxPQUFoQjtBQUNELEdBbENEOztBQW9DQTs7O0FBR0EsZUFBYSxpQkFBYixHQUFpQyxZQUFXO0FBQzFDLFFBQUksV0FBVyxHQUFHLEtBQUgsRUFBZjs7QUFFQSxRQUFJLGdCQUFnQixTQUFTLGdCQUFULEdBQ2pCLFFBRGlCLEdBRWpCLE1BRmlCLEVBQXBCOztBQUlBLFFBQUksaUJBQWlCLFNBQVMsaUJBQVQsR0FDbEIsUUFEa0IsQ0FDVCxFQUFDLEtBQUssQ0FBTixFQUFTLE1BQU0sQ0FBZixFQURTLEVBRWxCLFFBRmtCLENBRVQsR0FGUyxFQUdsQixPQUhrQixDQUdWLEVBQUMsS0FBSyxDQUFOLEVBQVMsTUFBTSxDQUFmLEVBSFUsRUFJbEIsYUFKa0IsQ0FJSixTQUFTLFNBQVQsQ0FBbUIsS0FKZixDQUFyQjs7QUFNQSxRQUFJLGNBQWM7QUFDaEIsZ0JBQVUsUUFBUSxPQUFSLENBQWdCLFNBQVMsSUFBekIsQ0FETTtBQUVoQixrQkFBWSxjQUZJO0FBR2hCLDJCQUFxQixJQUhMO0FBSWhCLG1CQUFhLDJCQUpHO0FBS2hCLGtCQUFZLGdCQUxJO0FBTWhCLGNBQVEsR0FOUTtBQU9oQixjQUFRO0FBQ04sa0JBQVU7QUFESixPQVBRO0FBVWhCLGlCQUFXLElBVks7QUFXaEIsMkJBQXFCLElBWEw7QUFZaEIsMEJBQW9CLElBWko7QUFhaEIsbUJBQWEsSUFiRztBQWNoQixnQkFBVSxhQWRNO0FBZWhCLGlCQUFXO0FBZkssS0FBbEI7O0FBa0JBLGFBQVMsSUFBVCxDQUFjLFdBQWQ7O0FBRUEsV0FBTyxTQUFTLE9BQWhCO0FBQ0QsR0FsQ0Q7O0FBb0NBOzs7QUFHQSxlQUFhLGdCQUFiLEdBQWdDLFVBQVMsVUFBVCxFQUFxQjtBQUNuRDtBQUNELEdBRkQ7O0FBS0EsU0FBTyxZQUFQO0FBQ0gsQ0E5SmdDLENBQW5DOztBQWlLQSxXQUFXLFVBQVgsQ0FBc0IsV0FBdEIsRUFBbUMsQ0FDakMsVUFBUyxRQUFULEVBQW1CLENBRWxCLENBSGdDLENBQW5DOztBQU9BLFdBQVcsVUFBWCxDQUFzQixjQUF0QixFQUFzQyxDQUNwQyxVQUFTLFFBQVQsRUFBbUIsQ0FFbEIsQ0FIbUMsQ0FBdEM7Ozs7O0FDbExBOzs7O0FBSUEsSUFBSSxhQUFhLFFBQVEsTUFBUixDQUFlLGlDQUFmLEVBQWtELENBQ2pFLFdBRGlFLENBQWxELENBQWpCOztBQUlBOzs7QUFHQSxXQUFXLFFBQVgsQ0FBb0IsYUFBcEIsRUFBbUMsT0FBbkM7O0FBRUE7OztBQUdBLFdBQVcsUUFBWCxDQUFvQixpQkFBcEIsRUFBdUMsUUFBdkM7O0FBRUE7OztBQUdBLFdBQVcsTUFBWCxDQUFrQixDQUNoQixnQkFEZ0IsRUFFaEIsYUFGZ0IsRUFHaEIsaUJBSGdCLEVBSWhCLFVBQVMsY0FBVCxFQUF5QixXQUF6QixFQUFzQyxlQUF0QyxFQUF1RDs7QUFFckQ7OztBQUdBLGlCQUNHLEtBREgsQ0FDUyxXQURULEVBQ3NCO0FBQ2xCLFNBQUssZUFEYTtBQUVsQixZQUFRLEVBRlU7QUFHbEIsY0FBVTtBQUhRLEdBRHRCO0FBT0QsQ0FoQmUsQ0FBbEI7Ozs7O0FDckJBLFFBQVEsb0JBQVI7QUFDQSxRQUFRLG1CQUFSO0FBQ0EsUUFBUSxrQkFBUjs7QUFFQTs7OztBQUlBLFFBQVEsTUFBUixDQUFlLDJCQUFmLEVBQTRDLENBQzFDLG1DQUQwQyxFQUUxQyxrQ0FGMEMsRUFHMUMsaUNBSDBDLENBQTVDOzs7OztBQ1JBOzs7O0FBSUEsSUFBSSxlQUFlLFFBQVEsTUFBUixDQUFlLG1DQUFmLEVBQW9ELENBQ3JFLFdBRHFFLENBQXBELENBQW5COztBQUlBOzs7QUFHQSxhQUFhLFFBQWIsQ0FBc0IsZUFBdEIsRUFBdUMsU0FBdkM7O0FBRUE7OztBQUdBLGFBQWEsUUFBYixDQUFzQixtQkFBdEIsRUFBMkMsUUFBM0M7O0FBRUE7OztBQUdBLGFBQWEsUUFBYixDQUFzQixzQkFBdEIsRUFBOEMsMEJBQTlDOztBQUVBOzs7QUFHQSxhQUFhLE1BQWIsQ0FBb0IsQ0FDbEIsZ0JBRGtCLEVBRWxCLGVBRmtCLEVBR2xCLG1CQUhrQixFQUlsQixzQkFKa0IsRUFLbEIsVUFBUyxjQUFULEVBQXlCLGFBQXpCLEVBQXdDLGlCQUF4QyxFQUEyRCxvQkFBM0QsRUFBaUY7O0FBRS9FOzs7QUFHQSxpQkFDRyxLQURILENBQ1MsYUFEVCxFQUN3QjtBQUNwQixTQUFLLGlCQURlO0FBRXBCLFlBQVEsRUFGWTtBQUdwQixnQkFBWSxrQkFIUTtBQUlwQixpQkFBYTtBQUpPLEdBRHhCO0FBUUQsQ0FsQmlCLENBQXBCOztBQXFCQTs7O0FBR0EsYUFBYSxVQUFiLENBQXdCLGtCQUF4QixFQUE0QyxDQUMxQyxZQUFXLENBRVYsQ0FIeUMsQ0FBNUM7Ozs7O0FDbERBOzs7O0FBSUEsSUFBSSxjQUFjLFFBQVEsTUFBUixDQUFlLGtDQUFmLEVBQW1ELENBQ25FLFdBRG1FLENBQW5ELENBQWxCOztBQUlBOzs7QUFHQSxZQUFZLFFBQVosQ0FBcUIsY0FBckIsRUFBcUMsUUFBckM7O0FBRUE7OztBQUdBLFlBQVksUUFBWixDQUFxQixrQkFBckIsRUFBeUMsU0FBekM7O0FBRUE7OztBQUdBLFlBQVksTUFBWixDQUFtQixDQUNqQixnQkFEaUIsRUFFakIsY0FGaUIsRUFHakIsa0JBSGlCLEVBSWpCLFVBQVMsY0FBVCxFQUF5QixZQUF6QixFQUF1QyxnQkFBdkMsRUFBeUQ7O0FBRXZEOzs7QUFHQSxpQkFDRyxLQURILENBQ1MsWUFEVCxFQUN1QjtBQUNuQixTQUFLLGdCQURjO0FBRW5CLFlBQVEsRUFGVztBQUduQixjQUFVO0FBSFMsR0FEdkI7QUFPRCxDQWhCZ0IsQ0FBbkIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvKipcbiAqIEBuYW1lc3BhY2UgSnVzdGljYXIuV2ViQ2xpZW50XG4gKi9cbid1c2Ugc3RyaWN0JztcblxuLy8gTG9jYWwgQW5ndWxhciBNb2R1bGVzIE9ubHkuIFBsdWdpbnMgYW5kIG90aGVyIGxpYnJhcmllcyBnbyBpbiB0aGUgbGliLmpzIGZvbGRlciB0byBtYWtlIGZvciBxdWlja2VyIGNvbXBpbGluZy5cbnJlcXVpcmUoJy4vbW9kdWxlcy9hcGkvaW5kZXguanMnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9hdXRoL2luZGV4LmpzJyk7XG5cbi8vIE1peGluc1xuXG4vLyBMb2NhbCBTdGF0ZSBNb2R1bGVzXG5yZXF1aXJlKCcuL3N0YXRlcy9pbmRleC5qcycpO1xuXG4vLyBEZWZpbmUgbWFpbiBtb2R1bGVcblxuXG5hbmd1bGFyLm1vZHVsZSgnSnVzdGljYXIuV2ViQ2xpZW50JywgW1xuICAgIC8vIEFuZ3VsYXIgTGlicmFyaWVzXG4gICAgJ25nTWF0ZXJpYWwnLCAvLyBhbmd1bGFyLW1hdGVyaWFsXG4gICAgJ25nU2FuaXRpemUnLCAvLyBhbmd1bGFyLXNhbml0aXplXG4gICAgJ25nUmVzb3VyY2UnLCAvLyBhbmd1bGFyLXJlc291cmNlXG4gICAgJ25nQW5pbWF0ZScsIC8vIGFuZ3VsYXItYW5pbWF0ZVxuICAgICduZ01lc3NhZ2VzJywgLy8gYW5ndWxhci1tZXNzYWdlc1xuICAgICdhbmd1bGFyTW9tZW50JyxcbiAgICAnYW5ndWxhci5maWx0ZXInLFxuICAgICdMb2NhbFN0b3JhZ2VNb2R1bGUnLCAvLyBhbmd1bGFyLWxvY2FsLXN0b3JhZ2VcbiAgICAndWkucm91dGVyJyxcblxuICAgIC8vIExvY2FsIG1vZHVsZXNcbiAgICAnSnVzdGljYXIuV2ViQ2xpZW50LkFQSScsXG4gICAgJ0p1c3RpY2FyLldlYkNsaWVudC5BdXRoJyxcbiAgICAnSnVzdGljYXIuV2ViQ2xpZW50LlN0YXRlcycsXG5dKS5jb25maWcoW1xuICAgICckbG9jYXRpb25Qcm92aWRlcicsXG4gICAgJyRtZFRoZW1pbmdQcm92aWRlcicsXG4gICAgJyR1cmxSb3V0ZXJQcm92aWRlcicsXG4gICAgZnVuY3Rpb24oJGxvY2F0aW9uUHJvdmlkZXIsICRtZFRoZW1pbmdQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogJGxvY2F0aW9uUHJvdmlkZXIgc2V0dGluZ3NcbiAgICAgICAgICovXG4gICAgICAgICRsb2NhdGlvblByb3ZpZGVyLmhhc2hQcmVmaXgoJycpO1xuICAgICAgICAkbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUoZmFsc2UpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGVtaW5nXG4gICAgICAgICAqL1xuXG4gICAgICAgICAkbWRUaGVtaW5nUHJvdmlkZXIuZGVmaW5lUGFsZXR0ZSgnanVzdGljYXJQcmltYXJ5Jywge1xuICAgICAgICAgICAnNTAnOiAnZWRlM2UzJyxcbiAgICAgICAgICAgJzEwMCc6ICdkM2JhYmEnLFxuICAgICAgICAgICAnMjAwJzogJ2I2OGM4YycsXG4gICAgICAgICAgICczMDAnOiAnOTk1ZTVlJyxcbiAgICAgICAgICAgJzQwMCc6ICc4MzNjM2MnLFxuICAgICAgICAgICAnNTAwJzogJzZkMTkxOScsXG4gICAgICAgICAgICc2MDAnOiAnNjUxNjE2JyxcbiAgICAgICAgICAgJzcwMCc6ICc1YTEyMTInLFxuICAgICAgICAgICAnODAwJzogJzUwMGUwZScsXG4gICAgICAgICAgICc5MDAnOiAnM2UwODA4JyxcbiAgICAgICAgICAgJ0ExMDAnOiAnZmY3NTc1JyxcbiAgICAgICAgICAgJ0EyMDAnOiAnZmY0MjQyJyxcbiAgICAgICAgICAgJ0E0MDAnOiAnYjgwYzBjJyxcbiAgICAgICAgICAgJ0E3MDAnOiAnOTcwMDAwJyxcbiAgICAgICAgICAgJ2NvbnRyYXN0RGVmYXVsdENvbG9yJzogJ2xpZ2h0JyxcbiAgICAgICAgICAgJ2NvbnRyYXN0RGFya0NvbG9ycyc6IFtcbiAgICAgICAgICAgICAnNTAnLFxuICAgICAgICAgICAgICcxMDAnLFxuICAgICAgICAgICAgICcyMDAnLFxuICAgICAgICAgICAgICdBMTAwJyxcbiAgICAgICAgICAgICAnQTIwMCdcbiAgICAgICAgICAgXSxcbiAgICAgICAgICAgJ2NvbnRyYXN0TGlnaHRDb2xvcnMnOiBbXG4gICAgICAgICAgICAgJzMwMCcsXG4gICAgICAgICAgICAgJzQwMCcsXG4gICAgICAgICAgICAgJzUwMCcsXG4gICAgICAgICAgICAgJzYwMCcsXG4gICAgICAgICAgICAgJzcwMCcsXG4gICAgICAgICAgICAgJzgwMCcsXG4gICAgICAgICAgICAgJzkwMCcsXG4gICAgICAgICAgICAgJ0E0MDAnLFxuICAgICAgICAgICAgICdBNzAwJ1xuICAgICAgICAgICBdXG4gICAgICAgICB9KTtcbiAgICAgICAgICRtZFRoZW1pbmdQcm92aWRlci5kZWZpbmVQYWxldHRlKCdqdXN0aWNhckFjY2VudCcsIHtcbiAgICAgICAgICAgJzUwJzogJ2ZjZjJlNycsXG4gICAgICAgICAgICcxMDAnOiAnZjhkZWMzJyxcbiAgICAgICAgICAgJzIwMCc6ICdmM2M4OWMnLFxuICAgICAgICAgICAnMzAwJzogJ2VlYjI3NCcsXG4gICAgICAgICAgICc0MDAnOiAnZWFhMjU2JyxcbiAgICAgICAgICAgJzUwMCc6ICdlNjkxMzgnLFxuICAgICAgICAgICAnNjAwJzogJ2UzODkzMicsXG4gICAgICAgICAgICc3MDAnOiAnZGY3ZTJiJyxcbiAgICAgICAgICAgJzgwMCc6ICdkYjc0MjQnLFxuICAgICAgICAgICAnOTAwJzogJ2Q1NjIxNycsXG4gICAgICAgICAgICdBMTAwJzogJ2Y5ZGFiYScsXG4gICAgICAgICAgICdBMjAwJzogJ2YyY2RhNycsXG4gICAgICAgICAgICdBNDAwJzogJ2ZmYzNhMScsXG4gICAgICAgICAgICdBNzAwJzogJ2ZmYjI4NycsXG4gICAgICAgICAgICdjb250cmFzdERlZmF1bHRDb2xvcic6ICdsaWdodCcsXG4gICAgICAgICAgICdjb250cmFzdERhcmtDb2xvcnMnOiBbXG4gICAgICAgICAgICAgJzUwJyxcbiAgICAgICAgICAgICAnMTAwJyxcbiAgICAgICAgICAgICAnMjAwJyxcbiAgICAgICAgICAgICAnMzAwJyxcbiAgICAgICAgICAgICAnNDAwJyxcbiAgICAgICAgICAgICAnNTAwJyxcbiAgICAgICAgICAgICAnNjAwJyxcbiAgICAgICAgICAgICAnNzAwJyxcbiAgICAgICAgICAgICAnODAwJyxcbiAgICAgICAgICAgICAnQTEwMCcsXG4gICAgICAgICAgICAgJ0EyMDAnLFxuICAgICAgICAgICAgICdBNDAwJyxcbiAgICAgICAgICAgICAnQTcwMCdcbiAgICAgICAgICAgXSxcbiAgICAgICAgICAgJ2NvbnRyYXN0TGlnaHRDb2xvcnMnOiBbXG4gICAgICAgICAgICAgJzkwMCdcbiAgICAgICAgICAgXVxuICAgICAgICAgfSk7XG4gICAgICAgICAkbWRUaGVtaW5nUHJvdmlkZXIuZGVmaW5lUGFsZXR0ZSgnanVzdGljYXJXYXJuJywge1xuICAgICAgICAgICAnNTAnOiAnZmZmYWVkJyxcbiAgICAgICAgICAgJzEwMCc6ICdmZmY0ZDEnLFxuICAgICAgICAgICAnMjAwJzogJ2ZmZWNiMycsXG4gICAgICAgICAgICczMDAnOiAnZmZlNDk0JyxcbiAgICAgICAgICAgJzQwMCc6ICdmZmRmN2QnLFxuICAgICAgICAgICAnNTAwJzogJ2ZmZDk2NicsXG4gICAgICAgICAgICc2MDAnOiAnZmZkNTVlJyxcbiAgICAgICAgICAgJzcwMCc6ICdmZmNmNTMnLFxuICAgICAgICAgICAnODAwJzogJ2ZmY2E0OScsXG4gICAgICAgICAgICc5MDAnOiAnZmZjMDM4JyxcbiAgICAgICAgICAgJ0ExMDAnOiAnZmZmZmZmJyxcbiAgICAgICAgICAgJ0EyMDAnOiAnZmZmZmZmJyxcbiAgICAgICAgICAgJ0E0MDAnOiAnZmZmNWUxJyxcbiAgICAgICAgICAgJ0E3MDAnOiAnZmZlZGM4JyxcbiAgICAgICAgICAgJ2NvbnRyYXN0RGVmYXVsdENvbG9yJzogJ2xpZ2h0JyxcbiAgICAgICAgICAgJ2NvbnRyYXN0RGFya0NvbG9ycyc6IFtcbiAgICAgICAgICAgICAnNTAnLFxuICAgICAgICAgICAgICcxMDAnLFxuICAgICAgICAgICAgICcyMDAnLFxuICAgICAgICAgICAgICczMDAnLFxuICAgICAgICAgICAgICc0MDAnLFxuICAgICAgICAgICAgICc1MDAnLFxuICAgICAgICAgICAgICc2MDAnLFxuICAgICAgICAgICAgICc3MDAnLFxuICAgICAgICAgICAgICc4MDAnLFxuICAgICAgICAgICAgICc5MDAnLFxuICAgICAgICAgICAgICdBMTAwJyxcbiAgICAgICAgICAgICAnQTIwMCcsXG4gICAgICAgICAgICAgJ0E0MDAnLFxuICAgICAgICAgICAgICdBNzAwJ1xuICAgICAgICAgICBdLFxuICAgICAgICAgICAnY29udHJhc3RMaWdodENvbG9ycyc6IFtdXG4gICAgICAgICB9KTtcbiAgICAgICAgICRtZFRoZW1pbmdQcm92aWRlci5kZWZpbmVQYWxldHRlKCdqdXN0aWNhckJhY2tncm91bmQnLCB7XG4gICAgICAgICAgICc1MCc6ICdlMGUwZTAnLFxuICAgICAgICAgICAnMTAwJzogJ2IzYjNiMycsXG4gICAgICAgICAgICcyMDAnOiAnODA4MDgwJyxcbiAgICAgICAgICAgJzMwMCc6ICc0ZDRkNGQnLFxuICAgICAgICAgICAnNDAwJzogJzI2MjYyNicsXG4gICAgICAgICAgICc1MDAnOiAnMDAwMDAwJyxcbiAgICAgICAgICAgJzYwMCc6ICcwMDAwMDAnLFxuICAgICAgICAgICAnNzAwJzogJzAwMDAwMCcsXG4gICAgICAgICAgICc4MDAnOiAnMDAwMDAwJyxcbiAgICAgICAgICAgJzkwMCc6ICcwMDAwMDAnLFxuICAgICAgICAgICAnQTEwMCc6ICdhNmE2YTYnLFxuICAgICAgICAgICAnQTIwMCc6ICc4YzhjOGMnLFxuICAgICAgICAgICAnQTQwMCc6ICc3MzczNzMnLFxuICAgICAgICAgICAnQTcwMCc6ICc2NjY2NjYnLFxuICAgICAgICAgICAnY29udHJhc3REZWZhdWx0Q29sb3InOiAnbGlnaHQnLFxuICAgICAgICAgICAnY29udHJhc3REYXJrQ29sb3JzJzogW1xuICAgICAgICAgICAgICc1MCcsXG4gICAgICAgICAgICAgJzEwMCcsXG4gICAgICAgICAgICAgJzIwMCcsXG4gICAgICAgICAgICAgJ0ExMDAnLFxuICAgICAgICAgICAgICdBMjAwJ1xuICAgICAgICAgICBdLFxuICAgICAgICAgICAnY29udHJhc3RMaWdodENvbG9ycyc6IFtcbiAgICAgICAgICAgICAnMzAwJyxcbiAgICAgICAgICAgICAnNDAwJyxcbiAgICAgICAgICAgICAnNTAwJyxcbiAgICAgICAgICAgICAnNjAwJyxcbiAgICAgICAgICAgICAnNzAwJyxcbiAgICAgICAgICAgICAnODAwJyxcbiAgICAgICAgICAgICAnOTAwJyxcbiAgICAgICAgICAgICAnQTQwMCcsXG4gICAgICAgICAgICAgJ0E3MDAnXG4gICAgICAgICAgIF1cbiAgICAgICAgIH0pO1xuXG4gICAgICAgICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnanVzdGljYXInKVxuICAgICAgICAgICAgLnByaW1hcnlQYWxldHRlKCdqdXN0aWNhclByaW1hcnknKVxuICAgICAgICAgICAgLmFjY2VudFBhbGV0dGUoJ2p1c3RpY2FyQWNjZW50JylcbiAgICAgICAgICAgIC53YXJuUGFsZXR0ZSgnanVzdGljYXJXYXJuJylcbiAgICAgICAgICAgIC5iYWNrZ3JvdW5kUGFsZXR0ZSgnanVzdGljYXJCYWNrZ3JvdW5kJyk7XG5cbiAgICAgICAgLy8gc2V0dGluZyBpdCBhcyBkZWZhdWx0IHRoZW1lXG4gICAgICAgICRtZFRoZW1pbmdQcm92aWRlci5zZXREZWZhdWx0VGhlbWUoJ2p1c3RpY2FyJyk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNldHRpbmcgdXAgc3RhdGUgbWFjaGluZVxuICAgICAgICAgKi9cbiAgICAgICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZShcIi9zdGFydFwiKTtcblxuXG4gICAgfVxuXSkucnVuKFtcbiAgICAnJHJvb3RTY29wZScsXG4gICAgJyRsb2cnLFxuICAgICckdHJhbnNpdGlvbnMnLFxuICAgICdKdXN0aWNhckFQSScsXG4gICAgZnVuY3Rpb24oJHJvb3RTY29wZSwgJGxvZywgJHRyYW5zaXRpb25zLCBKdXN0aWNhckFQSSkge1xuXG4gICAgfVxuXSk7XG5cbmFuZ3VsYXIubW9kdWxlKFwiSnVzdGljYXIuV2ViQ2xpZW50XCIpLmNvbnRyb2xsZXIoXCJNYWluQ3RybFwiLCBbJyRzY29wZScsICckbG9nJywgJyRtZFNpZGVuYXYnLCAnSnVzdGljYXJBdXRoJyxcbiAgZnVuY3Rpb24oJHNjb3BlLCAkbG9nLCAkbWRTaWRlbmF2LCBKdXN0aWNhckF1dGgpIHtcbiAgICAvKipcbiAgICAgKiBUb2dnbGUgc2lkZW5hdiBvbiBidXR0b24gY2xpY2tcbiAgICAgKi9cbiAgICAkc2NvcGUudG9nZ2xlU2lkZW5hdiA9IGZ1bmN0aW9uKCkge1xuICAgICAgJG1kU2lkZW5hdihcInNpZGVuYXZcIikudG9nZ2xlKCk7XG4gICAgfTtcblxuICAgIEp1c3RpY2FyQXV0aC5pbml0KCk7XG4gIH1cbl0pO1xuIiwiLyoqXG4gKiBAbmFtZXNwYWNlIEp1c3RpY2FyLldlYkNsaWVudC5BUElcbiAqIHNldHMgdXAgdGhlIEFQSSBjb25maWd1cmF0aW9uXG4gKi9cbmxldCBtb2R1bGVBUEkgPSBhbmd1bGFyLm1vZHVsZShcIkp1c3RpY2FyLldlYkNsaWVudC5BUElcIiwgWyduZ1Jlc291cmNlJ10pO1xuXG4vKipcbiAqIFN0b3JlcyBiYXNlIFVSTCBmb3IgYXBpXG4gKi9cbm1vZHVsZUFQSS5jb25zdGFudChcIkFQSV9VUkxcIiwgXCJodHRwOi8vMTI3LjAuMC4xOjMwMDAvYXBpXCIpO1xuXG5tb2R1bGVBUEkuc2VydmljZShcIkp1c3RpY2FyQVBJXCIsIFsnJGh0dHAnLCAnJHJlc291cmNlJywgJyRsb2cnLCAnJHEnLCAnQVBJX1VSTCcsXG4gIGZ1bmN0aW9uKCRodHRwLCAkcmVzb3VyY2UsICRsb2csICRxLCBBUElfVVJMKSB7XG4gICAgICBsZXQgSnVzdGljYXJBUEkgPSB7fTtcblxuICAgICAgLyoqXG4gICAgICAgKiBBdXRoIGZ1bmN0aW9ucyB1c2VkIGZvciBhdXRoIGFuZCB1c2VyIG1hbmFnZW1lbnRcbiAgICAgICAqL1xuICAgICAgSnVzdGljYXJBUEkuYXV0aCA9IHt9O1xuXG4gICAgICBKdXN0aWNhckFQSS5hdXRoLmxvZ2luID0gZnVuY3Rpb24oZW1haWwsIHBhc3N3b3JkKSB7XG4gICAgICAgIHJldHVybiAkaHR0cC5wb3N0KEFQSV9VUkwgKyBcIi91c2VyL2xvZ2luXCIsIHtcbiAgICAgICAgICBlbWFpbDogZW1haWwsXG4gICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkXG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgSnVzdGljYXJBUEkuYXV0aC5sb2dvdXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoQVBJX1VSTCArIFwiL3VzZXIvbG9nb3V0XCIpO1xuICAgICAgfTtcblxuICAgICAgSnVzdGljYXJBUEkuYXV0aC5jdXJyZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAkaHR0cC5nZXQoQVBJX1VSTCArIFwiL3VzZXIvY3VycmVudFwiKTtcbiAgICAgIH07XG5cbiAgICAgIEp1c3RpY2FyQVBJLmF1dGgucmVnaXN0ZXIgPSBmdW5jdGlvbihlbWFpbCwgcGFzc3dvcmQpIHtcbiAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoQVBJX1VSTCArIFwiL3VzZXIvcmVnaXN0ZXJcIiwge1xuICAgICAgICAgIGVtYWlsOiBlbWFpbCxcbiAgICAgICAgICBwYXNzd29yZDogcGFzc3dvcmRcbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gSnVzdGljYXJBUEk7XG4gIH1cbl0pO1xuIiwiLyoqXG4gKiBAbmFtZXNwYWNlIEp1c3RpY2FyLldlYkNsaWVudC5BdXRoXG4gKiBoYW5kbGVzIGxvZ2luIGFuZCBjaGVja2luZyBwZXJtaXNzaW9uc1xuICovXG5sZXQgbW9kdWxlQXV0aCA9IGFuZ3VsYXIubW9kdWxlKFwiSnVzdGljYXIuV2ViQ2xpZW50LkF1dGhcIiwgWyduZ1Jlc291cmNlJywgJ0p1c3RpY2FyLldlYkNsaWVudC5BUEknXSk7XG5cbi8qKlxuICpcbiAqL1xuXG5tb2R1bGVBdXRoLnNlcnZpY2UoXCJKdXN0aWNhckF1dGhcIiwgWyckaHR0cCcsICckcmVzb3VyY2UnLCAnJGxvZycsICckcScsICckbWRQYW5lbCcsICdKdXN0aWNhckFQSScsXG4gIGZ1bmN0aW9uKCRodHRwLCAkcmVzb3VyY2UsICRsb2csICRxLCAkbWRQYW5lbCwgSnVzdGljYXJBUEkpIHtcbiAgICAgIGxldCBKdXN0aWNhckF1dGggPSB7fTtcblxuICAgICAgSnVzdGljYXJBdXRoLmN1cnJlbnRVc2VyID0gbnVsbDtcblxuICAgICAgLyoqXG4gICAgICAgKiBMb2dpbiB0byBzeXN0ZW1cbiAgICAgICAqL1xuICAgICAgSnVzdGljYXJBdXRoLmluaXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgSnVzdGljYXJBUEkuYXV0aC5jdXJyZW50KCkudGhlbihcbiAgICAgICAgICBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgSnVzdGljYXJBdXRoLmN1cnJlbnRVc2VyID0gcmVzcG9uc2UuZGF0YS51c2VyO1xuXG4gICAgICAgICAgfVxuICAgICAgICApLmNhdGNoKFxuICAgICAgICAgIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgSnVzdGljYXJBdXRoLmN1cnJlbnRVc2VyID0gbnVsbDtcbiAgICAgICAgICAgIEp1c3RpY2FyQXV0aC5vcGVuTG9naW5QYW5lbCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH07XG5cbiAgICAgIC8qKlxuICAgICAgICogTG9naW4gdG8gc3lzdGVtXG4gICAgICAgKi9cbiAgICAgIEp1c3RpY2FyQXV0aC5sb2dpbiA9IGZ1bmN0aW9uKGVtYWlsLCBwYXNzd29yZCkge1xuICAgICAgICBKdXN0aWNhckFQSS5hdXRoLmxvZ2luKGVtYWlsLCBwYXNzd29yZCkudGhlbihcbiAgICAgICAgICBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgSnVzdGljYXJBdXRoLmN1cnJlbnRVc2VyID0gcmVzcG9uc2UuZGF0YS51c2VyO1xuICAgICAgICAgIH1cbiAgICAgICAgKS5jYXRjaChcbiAgICAgICAgICBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIC8vIEBUT0RPIGJldHRlciBoYW5kbGluZyBvZiByZXN1bHRzLCBmYWlsZWQgbG9naW4sIGV0Yy5cbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnIpO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH07XG5cbiAgICAgIC8qKlxuICAgICAgICogTG9nb3V0IG9mIHN5c3RlbVxuICAgICAgICovXG4gICAgICBKdXN0aWNhckF1dGgubG9nb3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIEp1c3RpY2FyQVBJLmF1dGgubG9nb3V0KCkudGhlbihcbiAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIEp1c3RpY2FyQXV0aC5jdXJyZW50VXNlciA9IG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICApLmNhdGNoKFxuICAgICAgICAgIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgLy8gQFRPRE8gYmV0dGVyIGhhbmRsaW5nIG9mIHJlc3VsdHMsIGZhaWxlZCBsb2dpbiwgZXRjLlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycik7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfTtcblxuICAgICAgLyoqXG4gICAgICAgKiBSZWdpc3RlciBuZXcgdXNlclxuICAgICAgICovXG4gICAgICBKdXN0aWNhckF1dGgucmVnaXN0ZXIgPSBmdW5jdGlvbihlbWFpbCwgcGFzc3dvcmQpIHtcbiAgICAgICAgSnVzdGljYXJBUEkuYXV0aC5yZWdpc3RlcihlbWFpbCwgcGFzc3dvcmQpLnRoZW4oXG4gICAgICAgICAgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIEp1c3RpY2FyQXV0aC5jdXJyZW50VXNlciA9IHJlc3BvbnNlLmRhdGEudXNlcjsgLy8gdGhpcyBpcyBsaWtlbHkgd3JvbmdcbiAgICAgICAgICB9XG4gICAgICAgICkuY2F0Y2goXG4gICAgICAgICAgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAvLyBAVE9ETyBiZXR0ZXIgaGFuZGxpbmcgb2YgcmVzdWx0cywgZmFpbGVkIGxvZ2luLCBldGMuXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICB9O1xuXG4gICAgICAvKipcbiAgICAgICAqIE9wZW4gbW9kYWwgcGFuZWwgZm9yIGxvZ2dpbmcgaW5zcGVjdFxuICAgICAgICovXG4gICAgICBKdXN0aWNhckF1dGgub3BlbkxvZ2luUGFuZWwgPSBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0gJHEuZGVmZXIoKTtcblxuICAgICAgICBsZXQgcGFuZWxQb3NpdGlvbiA9ICRtZFBhbmVsLm5ld1BhbmVsUG9zaXRpb24oKVxuICAgICAgICAgIC5hYnNvbHV0ZSgpXG4gICAgICAgICAgLmNlbnRlcigpO1xuXG4gICAgICAgIGxldCBwYW5lbEFuaW1hdGlvbiA9ICRtZFBhbmVsLm5ld1BhbmVsQW5pbWF0aW9uKClcbiAgICAgICAgICAub3BlbkZyb20oeyB0b3A6IDEsIHJpZ2h0OjAgfSlcbiAgICAgICAgICAuZHVyYXRpb24oMjAwKVxuICAgICAgICAgIC5jbG9zZVRvKHsgdG9wOiAxLCByaWdodDowIH0pXG4gICAgICAgICAgLndpdGhBbmltYXRpb24oJG1kUGFuZWwuYW5pbWF0aW9uLlNDQUxFKTtcblxuICAgICAgICBsZXQgcGFuZWxDb25maWcgPSB7XG4gICAgICAgICAgYXR0YWNoVG86IGFuZ3VsYXIuZWxlbWVudChkb2N1bWVudC5ib2R5KSxcbiAgICAgICAgICBjb250cm9sbGVyOiAnTG9naW5DdHJsJyxcbiAgICAgICAgICBkaXNhYmxlUGFyZW50U2Nyb2xsOiB0cnVlLFxuICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL3BhcnRpYWxzL3BhbmVscy9sb2dpbicsXG4gICAgICAgICAgcGFuZWxDbGFzczogXCJqdXN0aWNhci1wYW5lbFwiLFxuICAgICAgICAgIHpJbmRleDogMTUwLFxuICAgICAgICAgIGxvY2Fsczoge1xuICAgICAgICAgICAgZGVmZXJyZWQ6IGRlZmVycmVkXG4gICAgICAgICAgfSxcbiAgICAgICAgICB0cmFwRm9jdXM6IHRydWUsXG4gICAgICAgICAgY2xpY2tPdXRzaWRlVG9DbG9zZTogdHJ1ZSxcbiAgICAgICAgICBjbGlja0VzY2FwZVRvQ2xvc2U6IHRydWUsXG4gICAgICAgICAgaGFzQmFja2Ryb3A6IHRydWUsXG4gICAgICAgICAgcG9zaXRpb246IHBhbmVsUG9zaXRpb24sXG4gICAgICAgICAgYW5pbWF0aW9uOiBwYW5lbEFuaW1hdGlvblxuICAgICAgICB9O1xuXG4gICAgICAgICRtZFBhbmVsLm9wZW4ocGFuZWxDb25maWcpO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgfTtcblxuICAgICAgLyoqXG4gICAgICAgKiBPcGVuIHJlZ2lzdHJhdGlvbiBwYW5lbFxuICAgICAgICovXG4gICAgICBKdXN0aWNhckF1dGgub3BlblJlZ2lzdGVyUGFuZWwgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0gJHEuZGVmZXIoKTtcblxuICAgICAgICBsZXQgcGFuZWxQb3NpdGlvbiA9ICRtZFBhbmVsLm5ld1BhbmVsUG9zaXRpb24oKVxuICAgICAgICAgIC5hYnNvbHV0ZSgpXG4gICAgICAgICAgLmNlbnRlcigpO1xuXG4gICAgICAgIGxldCBwYW5lbEFuaW1hdGlvbiA9ICRtZFBhbmVsLm5ld1BhbmVsQW5pbWF0aW9uKClcbiAgICAgICAgICAub3BlbkZyb20oe3RvcDogMSwgbGVmdDogMX0pXG4gICAgICAgICAgLmR1cmF0aW9uKDIwMClcbiAgICAgICAgICAuY2xvc2VUbyh7dG9wOiAxLCBsZWZ0OiAxfSlcbiAgICAgICAgICAud2l0aEFuaW1hdGlvbigkbWRQYW5lbC5hbmltYXRpb24uU0NBTEUpO1xuXG4gICAgICAgIGxldCBwYW5lbENvbmZpZyA9IHtcbiAgICAgICAgICBhdHRhY2hUbzogYW5ndWxhci5lbGVtZW50KGRvY3VtZW50LmJvZHkpLFxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdSZWdpc3RlckN0cmwnLFxuICAgICAgICAgIGRpc2FibGVQYXJlbnRTY3JvbGw6IHRydWUsXG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICcvcGFydGlhbHMvcGFuZWxzL3JlZ2lzdGVyJyxcbiAgICAgICAgICBwYW5lbENsYXNzOiBcImp1c3RpY2FyLXBhbmVsXCIsXG4gICAgICAgICAgekluZGV4OiAxNzUsXG4gICAgICAgICAgbG9jYWxzOiB7XG4gICAgICAgICAgICBkZWZlcnJlZDogZGVmZXJyZWRcbiAgICAgICAgICB9LFxuICAgICAgICAgIHRyYXBGb2N1czogdHJ1ZSxcbiAgICAgICAgICBjbGlja091dHNpZGVUb0Nsb3NlOiB0cnVlLFxuICAgICAgICAgIGNsaWNrRXNjYXBlVG9DbG9zZTogdHJ1ZSxcbiAgICAgICAgICBoYXNCYWNrZHJvcDogdHJ1ZSxcbiAgICAgICAgICBwb3NpdGlvbjogcGFuZWxQb3NpdGlvbixcbiAgICAgICAgICBhbmltYXRpb246IHBhbmVsQW5pbWF0aW9uXG4gICAgICAgIH07XG5cbiAgICAgICAgJG1kUGFuZWwub3BlbihwYW5lbENvbmZpZyk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICB9O1xuXG4gICAgICAvKipcbiAgICAgICAqIENoZWNrIHBlcm1pc3Npb25zIGJhc2VkIG9uIGEgc3RyaW5nXG4gICAgICAgKi9cbiAgICAgIEp1c3RpY2FyQXV0aC5jaGVja1Blcm1pc3Npb25zID0gZnVuY3Rpb24ocGVybWlzc2lvbikge1xuICAgICAgICAvLyBAVE9ET1xuICAgICAgfTtcblxuXG4gICAgICByZXR1cm4gSnVzdGljYXJBdXRoO1xuICB9XG5dKTtcblxubW9kdWxlQXV0aC5jb250cm9sbGVyKCdMb2dpbkN0cmwnLCBbXG4gIGZ1bmN0aW9uKCRtZFBhbmVsKSB7XG5cbiAgfVxuXSk7XG5cblxubW9kdWxlQXV0aC5jb250cm9sbGVyKCdSZWdpc3RlckN0cmwnLCBbXG4gIGZ1bmN0aW9uKCRtZFBhbmVsKSB7XG5cbiAgfVxuXSk7XG4iLCIvKipcbiAqIEBuYW1lc3BhY2UgSnVzdGljYXIuV2ViQ2xpZW50LlN0YXRlcy5BZG1pblxuICogU3RvcmVzIGFsbCB0aGUgc3RhdGVzIGZvciB0aGUgQW5ndWxhciBVSSByb3V0ZXIgc3RhdGUgbWFjaGluZSBhbmQgYXNzb2NpYXRlcyBjb250cm9sbGVyc1xuICovXG5sZXQgc3RhdGVBZG1pbiA9IGFuZ3VsYXIubW9kdWxlKFwiSnVzdGljYXIuV2ViQ2xpZW50LlN0YXRlcy5BZG1pblwiLCBbXG4gICd1aS5yb3V0ZXInXG5dKTtcblxuLyoqXG4gKiBTdGF0ZSBuYW1lIGZvciB0aGlzIHN0YXRlXG4gKi9cbnN0YXRlQWRtaW4uY29uc3RhbnQoXCJBRE1JTl9TVEFURVwiLCBcImFkbWluXCIpO1xuXG4vKipcbiAqIFN1Yi1VUkwgZm9yIHRoaXMgc3RhdGVcbiAqL1xuc3RhdGVBZG1pbi5jb25zdGFudChcIkFETUlOX1NUQVRFX1VSTFwiLCBcIi9hZG1pblwiKTtcblxuLyoqXG4gKiBDb25maWcgYWN0aW9uIHRoYXQgc2V0cyB1cCB0aGlzIG1vZHVsZVxuICovXG5zdGF0ZUFkbWluLmNvbmZpZyhbXG4gICckc3RhdGVQcm92aWRlcicsXG4gICdBRE1JTl9TVEFURScsXG4gICdBRE1JTl9TVEFURV9VUkwnLFxuICBmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgQURNSU5fU1RBVEUsIEFETUlOX1NUQVRFX1VSTCkge1xuXG4gICAgLyoqXG4gICAgICogU2V0IHVwIHN0YXRlIGluIGFwcGxpY2F0aW9uIHN0YXRlIG1hY2hpbmUuXG4gICAgICovXG4gICAgJHN0YXRlUHJvdmlkZXJcbiAgICAgIC5zdGF0ZShBRE1JTl9TVEFURSwge1xuICAgICAgICB1cmw6IEFETUlOX1NUQVRFX1VSTCxcbiAgICAgICAgcGFyYW1zOiB7fSxcbiAgICAgICAgYWJzdHJhY3Q6IHRydWVcbiAgICAgIH0pXG4gICAgO1xuICB9XG5dKTtcbiIsInJlcXVpcmUoXCIuL2xhbmRpbmcvaW5kZXguanNcIik7XG5yZXF1aXJlKFwiLi9wbGF5ZXIvaW5kZXguanNcIik7XG5yZXF1aXJlKFwiLi9hZG1pbi9pbmRleC5qc1wiKTtcblxuLyoqXG4gKiBAbmFtZXNwYWNlIEp1c3RpY2FyLldlYkNsaWVudC5TdGF0ZXNcbiAqIFN0b3JlcyBhbGwgdGhlIHN0YXRlcyBmb3IgdGhlIEFuZ3VsYXIgVUkgcm91dGVyIHN0YXRlIG1hY2hpbmUgYW5kIGFzc29jaWF0ZXMgY29udHJvbGxlcnNcbiAqL1xuYW5ndWxhci5tb2R1bGUoXCJKdXN0aWNhci5XZWJDbGllbnQuU3RhdGVzXCIsIFtcbiAgJ0p1c3RpY2FyLldlYkNsaWVudC5TdGF0ZXMuTGFuZGluZycsXG4gICdKdXN0aWNhci5XZWJDbGllbnQuU3RhdGVzLlBsYXllcicsXG4gICdKdXN0aWNhci5XZWJDbGllbnQuU3RhdGVzLkFkbWluJyxcbl0pO1xuIiwiLyoqXG4gKiBAbmFtZXNwYWNlIEp1c3RpY2FyLldlYkNsaWVudC5TdGF0ZXMuTGFuZGluZ1xuICogU3RvcmVzIGFsbCB0aGUgc3RhdGVzIGZvciB0aGUgQW5ndWxhciBVSSByb3V0ZXIgc3RhdGUgbWFjaGluZSBhbmQgYXNzb2NpYXRlcyBjb250cm9sbGVyc1xuICovXG5sZXQgc3RhdGVMYW5kaW5nID0gYW5ndWxhci5tb2R1bGUoXCJKdXN0aWNhci5XZWJDbGllbnQuU3RhdGVzLkxhbmRpbmdcIiwgW1xuICAndWkucm91dGVyJ1xuXSk7XG5cbi8qKlxuICogU3RhdGUgbmFtZSBmb3IgdGhpcyBzdGF0ZVxuICovXG5zdGF0ZUxhbmRpbmcuY29uc3RhbnQoXCJMQU5ESU5HX1NUQVRFXCIsIFwibGFuZGluZ1wiKTtcblxuLyoqXG4gKiBTdWItVVJMIGZvciB0aGlzIHN0YXRlXG4gKi9cbnN0YXRlTGFuZGluZy5jb25zdGFudChcIkxBTkRJTkdfU1RBVEVfVVJMXCIsIFwiL3N0YXJ0XCIpO1xuXG4vKipcbiAqIExvY2F0aW9uIHRvIGxvYWQgdmlldyBmcm9tXG4gKi9cbnN0YXRlTGFuZGluZy5jb25zdGFudChcIkxBTkRJTkdfVEVNUExBVEVfVVJMXCIsIFwiL3BhcnRpYWxzL3N0YXRlcy9sYW5kaW5nXCIpO1xuXG4vKipcbiAqIENvbmZpZyBhY3Rpb24gdGhhdCBzZXRzIHVwIHRoaXMgbW9kdWxlXG4gKi9cbnN0YXRlTGFuZGluZy5jb25maWcoW1xuICAnJHN0YXRlUHJvdmlkZXInLFxuICAnTEFORElOR19TVEFURScsXG4gICdMQU5ESU5HX1NUQVRFX1VSTCcsXG4gICdMQU5ESU5HX1RFTVBMQVRFX1VSTCcsXG4gIGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCBMQU5ESU5HX1NUQVRFLCBMQU5ESU5HX1NUQVRFX1VSTCwgTEFORElOR19URU1QTEFURV9VUkwpIHtcblxuICAgIC8qKlxuICAgICAqIFNldCB1cCBzdGF0ZSBpbiBhcHBsaWNhdGlvbiBzdGF0ZSBtYWNoaW5lLlxuICAgICAqL1xuICAgICRzdGF0ZVByb3ZpZGVyXG4gICAgICAuc3RhdGUoTEFORElOR19TVEFURSwge1xuICAgICAgICB1cmw6IExBTkRJTkdfU1RBVEVfVVJMLFxuICAgICAgICBwYXJhbXM6IHt9LFxuICAgICAgICBjb250cm9sbGVyOiBcIlN0YXRlTGFuZGluZ0N0cmxcIixcbiAgICAgICAgdGVtcGxhdGVVcmw6IExBTkRJTkdfVEVNUExBVEVfVVJMXG4gICAgICB9KVxuICAgIDtcbiAgfVxuXSk7XG5cbi8qKlxuICogQ29udHJvbGxlciBmb3Igc3RhdGVcbiAqL1xuc3RhdGVMYW5kaW5nLmNvbnRyb2xsZXIoXCJTdGF0ZUxhbmRpbmdDdHJsXCIsIFtcbiAgZnVuY3Rpb24oKSB7XG5cbiAgfVxuXSk7XG4iLCIvKipcbiAqIEBuYW1lc3BhY2UgSnVzdGljYXIuV2ViQ2xpZW50LlN0YXRlcy5QbGF5ZXJcbiAqIFN0b3JlcyBhbGwgdGhlIHN0YXRlcyBmb3IgdGhlIEFuZ3VsYXIgVUkgcm91dGVyIHN0YXRlIG1hY2hpbmUgYW5kIGFzc29jaWF0ZXMgY29udHJvbGxlcnNcbiAqL1xubGV0IHN0YXRlUGxheWVyID0gYW5ndWxhci5tb2R1bGUoXCJKdXN0aWNhci5XZWJDbGllbnQuU3RhdGVzLlBsYXllclwiLCBbXG4gICd1aS5yb3V0ZXInXG5dKTtcblxuLyoqXG4gKiBTdGF0ZSBuYW1lIGZvciB0aGlzIHN0YXRlXG4gKi9cbnN0YXRlUGxheWVyLmNvbnN0YW50KFwiUExBWUVSX1NUQVRFXCIsIFwicGxheWVyXCIpO1xuXG4vKipcbiAqIFN1Yi1VUkwgZm9yIHRoaXMgc3RhdGVcbiAqL1xuc3RhdGVQbGF5ZXIuY29uc3RhbnQoXCJQTEFZRVJfU1RBVEVfVVJMXCIsIFwiL3BsYXllclwiKTtcblxuLyoqXG4gKiBDb25maWcgYWN0aW9uIHRoYXQgc2V0cyB1cCB0aGlzIG1vZHVsZVxuICovXG5zdGF0ZVBsYXllci5jb25maWcoW1xuICAnJHN0YXRlUHJvdmlkZXInLFxuICAnUExBWUVSX1NUQVRFJyxcbiAgJ1BMQVlFUl9TVEFURV9VUkwnLFxuICBmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgUExBWUVSX1NUQVRFLCBQTEFZRVJfU1RBVEVfVVJMKSB7XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdXAgc3RhdGUgaW4gYXBwbGljYXRpb24gc3RhdGUgbWFjaGluZS5cbiAgICAgKi9cbiAgICAkc3RhdGVQcm92aWRlclxuICAgICAgLnN0YXRlKFBMQVlFUl9TVEFURSwge1xuICAgICAgICB1cmw6IFBMQVlFUl9TVEFURV9VUkwsXG4gICAgICAgIHBhcmFtczoge30sXG4gICAgICAgIGFic3RyYWN0OiB0cnVlXG4gICAgICB9KVxuICAgIDtcbiAgfVxuXSk7XG4iXX0=
