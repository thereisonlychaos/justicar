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

  $mdThemingProvider.definePalette('justicarWarn', {
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
  $mdThemingProvider.definePalette('justicarPrimary', {
    '50': 'f0e8f6',
    '100': 'dac5e9',
    '200': 'c29fda',
    '300': 'aa79cb',
    '400': '975cc0',
    '500': '853fb5',
    '600': '7d39ae',
    '700': '7231a5',
    '800': '68299d',
    '900': '551b8d',
    'A100': 'e1c6ff',
    'A200': 'c793ff',
    'A400': 'ac60ff',
    'A700': '9f47ff',
    'contrastDefaultColor': 'light',
    'contrastDarkColors': ['50', '100', '200', '300', 'A100', 'A200', 'A400'],
    'contrastLightColors': ['400', '500', '600', '700', '800', '900', 'A700']
  });

  $mdThemingProvider.theme('justicar').primaryPalette('justicarPrimary').accentPalette('justicarAccent').warnPalette('justicarWarn');
  //.backgroundPalette('justicarBackground');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvY2xpZW50LmpzIiwiY2xpZW50L21vZHVsZXMvYXBpL2luZGV4LmpzIiwiY2xpZW50L21vZHVsZXMvYXV0aC9pbmRleC5qcyIsImNsaWVudC9zdGF0ZXMvYWRtaW4vaW5kZXguanMiLCJjbGllbnQvc3RhdGVzL2luZGV4LmpzIiwiY2xpZW50L3N0YXRlcy9sYW5kaW5nL2luZGV4LmpzIiwiY2xpZW50L3N0YXRlcy9wbGF5ZXIvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7O0FBR0E7O0FBRUE7O0FBQ0EsUUFBUSx3QkFBUjtBQUNBLFFBQVEseUJBQVI7O0FBRUE7O0FBRUE7QUFDQSxRQUFRLG1CQUFSOztBQUVBOzs7QUFHQSxRQUFRLE1BQVIsQ0FBZSxvQkFBZixFQUFxQztBQUNqQztBQUNBLFlBRmlDLEVBRW5CO0FBQ2QsWUFIaUMsRUFHbkI7QUFDZCxZQUppQyxFQUluQjtBQUNkLFdBTGlDLEVBS3BCO0FBQ2IsWUFOaUMsRUFNbkI7QUFDZCxlQVBpQyxFQVFqQyxnQkFSaUMsRUFTakMsb0JBVGlDLEVBU1g7QUFDdEIsV0FWaUM7O0FBWWpDO0FBQ0Esd0JBYmlDLEVBY2pDLHlCQWRpQyxFQWVqQywyQkFmaUMsQ0FBckMsRUFnQkcsTUFoQkgsQ0FnQlUsQ0FDTixtQkFETSxFQUVOLG9CQUZNLEVBR04sb0JBSE0sRUFJTixVQUFTLGlCQUFULEVBQTRCLGtCQUE1QixFQUFnRCxrQkFBaEQsRUFBb0U7O0FBR2hFOzs7QUFHQSxvQkFBa0IsVUFBbEIsQ0FBNkIsRUFBN0I7QUFDQSxvQkFBa0IsU0FBbEIsQ0FBNEIsS0FBNUI7O0FBRUE7Ozs7QUFJQyxxQkFBbUIsYUFBbkIsQ0FBaUMsY0FBakMsRUFBaUQ7QUFDL0MsVUFBTSxRQUR5QztBQUUvQyxXQUFPLFFBRndDO0FBRy9DLFdBQU8sUUFId0M7QUFJL0MsV0FBTyxRQUp3QztBQUsvQyxXQUFP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LEVBR2pCLGtCQUhpQixFQUlqQixVQUFTLGNBQVQsRUFBeUIsWUFBekIsRUFBdUMsZ0JBQXZDLEVBQXlEOztBQUV2RDs7O0FBR0EsaUJBQ0csS0FESCxDQUNTLFlBRFQsRUFDdUI7QUFDbkIsU0FBSyxnQkFEYztBQUVuQixZQUFRLEVBRlc7QUFHbkIsY0FBVTtBQUhTLEdBRHZCO0FBT0QsQ0FoQmdCLENBQW5CIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLyoqXG4gKiBAbmFtZXNwYWNlIEp1c3RpY2FyLldlYkNsaWVudFxuICovXG4ndXNlIHN0cmljdCc7XG5cbi8vIExvY2FsIEFuZ3VsYXIgTW9kdWxlcyBPbmx5LiBQbHVnaW5zIGFuZCBvdGhlciBsaWJyYXJpZXMgZ28gaW4gdGhlIGxpYi5qcyBmb2xkZXIgdG8gbWFrZSBmb3IgcXVpY2tlciBjb21waWxpbmcuXG5yZXF1aXJlKCcuL21vZHVsZXMvYXBpL2luZGV4LmpzJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvYXV0aC9pbmRleC5qcycpO1xuXG4vLyBNaXhpbnNcblxuLy8gTG9jYWwgU3RhdGUgTW9kdWxlc1xucmVxdWlyZSgnLi9zdGF0ZXMvaW5kZXguanMnKTtcblxuLy8gRGVmaW5lIG1haW4gbW9kdWxlXG5cblxuYW5ndWxhci5tb2R1bGUoJ0p1c3RpY2FyLldlYkNsaWVudCcsIFtcbiAgICAvLyBBbmd1bGFyIExpYnJhcmllc1xuICAgICduZ01hdGVyaWFsJywgLy8gYW5ndWxhci1tYXRlcmlhbFxuICAgICduZ1Nhbml0aXplJywgLy8gYW5ndWxhci1zYW5pdGl6ZVxuICAgICduZ1Jlc291cmNlJywgLy8gYW5ndWxhci1yZXNvdXJjZVxuICAgICduZ0FuaW1hdGUnLCAvLyBhbmd1bGFyLWFuaW1hdGVcbiAgICAnbmdNZXNzYWdlcycsIC8vIGFuZ3VsYXItbWVzc2FnZXNcbiAgICAnYW5ndWxhck1vbWVudCcsXG4gICAgJ2FuZ3VsYXIuZmlsdGVyJyxcbiAgICAnTG9jYWxTdG9yYWdlTW9kdWxlJywgLy8gYW5ndWxhci1sb2NhbC1zdG9yYWdlXG4gICAgJ3VpLnJvdXRlcicsXG5cbiAgICAvLyBMb2NhbCBtb2R1bGVzXG4gICAgJ0p1c3RpY2FyLldlYkNsaWVudC5BUEknLFxuICAgICdKdXN0aWNhci5XZWJDbGllbnQuQXV0aCcsXG4gICAgJ0p1c3RpY2FyLldlYkNsaWVudC5TdGF0ZXMnLFxuXSkuY29uZmlnKFtcbiAgICAnJGxvY2F0aW9uUHJvdmlkZXInLFxuICAgICckbWRUaGVtaW5nUHJvdmlkZXInLFxuICAgICckdXJsUm91dGVyUHJvdmlkZXInLFxuICAgIGZ1bmN0aW9uKCRsb2NhdGlvblByb3ZpZGVyLCAkbWRUaGVtaW5nUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICRsb2NhdGlvblByb3ZpZGVyIHNldHRpbmdzXG4gICAgICAgICAqL1xuICAgICAgICAkbG9jYXRpb25Qcm92aWRlci5oYXNoUHJlZml4KCcnKTtcbiAgICAgICAgJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKGZhbHNlKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlbWluZ1xuICAgICAgICAgKi9cblxuICAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLmRlZmluZVBhbGV0dGUoJ2p1c3RpY2FyV2FybicsIHtcbiAgICAgICAgICAgJzUwJzogJ2VkZTNlMycsXG4gICAgICAgICAgICcxMDAnOiAnZDNiYWJhJyxcbiAgICAgICAgICAgJzIwMCc6ICdiNjhjOGMnLFxuICAgICAgICAgICAnMzAwJzogJzk5NWU1ZScsXG4gICAgICAgICAgICc0MDAnOiAnODMzYzNjJyxcbiAgICAgICAgICAgJzUwMCc6ICc2ZDE5MTknLFxuICAgICAgICAgICAnNjAwJzogJzY1MTYxNicsXG4gICAgICAgICAgICc3MDAnOiAnNWExMjEyJyxcbiAgICAgICAgICAgJzgwMCc6ICc1MDBlMGUnLFxuICAgICAgICAgICAnOTAwJzogJzNlMDgwOCcsXG4gICAgICAgICAgICdBMTAwJzogJ2ZmNzU3NScsXG4gICAgICAgICAgICdBMjAwJzogJ2ZmNDI0MicsXG4gICAgICAgICAgICdBNDAwJzogJ2I4MGMwYycsXG4gICAgICAgICAgICdBNzAwJzogJzk3MDAwMCcsXG4gICAgICAgICAgICdjb250cmFzdERlZmF1bHRDb2xvcic6ICdsaWdodCcsXG4gICAgICAgICAgICdjb250cmFzdERhcmtDb2xvcnMnOiBbXG4gICAgICAgICAgICAgJzUwJyxcbiAgICAgICAgICAgICAnMTAwJyxcbiAgICAgICAgICAgICAnMjAwJyxcbiAgICAgICAgICAgICAnQTEwMCcsXG4gICAgICAgICAgICAgJ0EyMDAnXG4gICAgICAgICAgIF0sXG4gICAgICAgICAgICdjb250cmFzdExpZ2h0Q29sb3JzJzogW1xuICAgICAgICAgICAgICczMDAnLFxuICAgICAgICAgICAgICc0MDAnLFxuICAgICAgICAgICAgICc1MDAnLFxuICAgICAgICAgICAgICc2MDAnLFxuICAgICAgICAgICAgICc3MDAnLFxuICAgICAgICAgICAgICc4MDAnLFxuICAgICAgICAgICAgICc5MDAnLFxuICAgICAgICAgICAgICdBNDAwJyxcbiAgICAgICAgICAgICAnQTcwMCdcbiAgICAgICAgICAgXVxuICAgICAgICAgfSk7XG4gICAgICAgICAkbWRUaGVtaW5nUHJvdmlkZXIuZGVmaW5lUGFsZXR0ZSgnanVzdGljYXJBY2NlbnQnLCB7XG4gICAgICAgICAgICc1MCc6ICdmY2YyZTcnLFxuICAgICAgICAgICAnMTAwJzogJ2Y4ZGVjMycsXG4gICAgICAgICAgICcyMDAnOiAnZjNjODljJyxcbiAgICAgICAgICAgJzMwMCc6ICdlZWIyNzQnLFxuICAgICAgICAgICAnNDAwJzogJ2VhYTI1NicsXG4gICAgICAgICAgICc1MDAnOiAnZTY5MTM4JyxcbiAgICAgICAgICAgJzYwMCc6ICdlMzg5MzInLFxuICAgICAgICAgICAnNzAwJzogJ2RmN2UyYicsXG4gICAgICAgICAgICc4MDAnOiAnZGI3NDI0JyxcbiAgICAgICAgICAgJzkwMCc6ICdkNTYyMTcnLFxuICAgICAgICAgICAnQTEwMCc6ICdmOWRhYmEnLFxuICAgICAgICAgICAnQTIwMCc6ICdmMmNkYTcnLFxuICAgICAgICAgICAnQTQwMCc6ICdmZmMzYTEnLFxuICAgICAgICAgICAnQTcwMCc6ICdmZmIyODcnLFxuICAgICAgICAgICAnY29udHJhc3REZWZhdWx0Q29sb3InOiAnbGlnaHQnLFxuICAgICAgICAgICAnY29udHJhc3REYXJrQ29sb3JzJzogW1xuICAgICAgICAgICAgICc1MCcsXG4gICAgICAgICAgICAgJzEwMCcsXG4gICAgICAgICAgICAgJzIwMCcsXG4gICAgICAgICAgICAgJzMwMCcsXG4gICAgICAgICAgICAgJzQwMCcsXG4gICAgICAgICAgICAgJzUwMCcsXG4gICAgICAgICAgICAgJzYwMCcsXG4gICAgICAgICAgICAgJzcwMCcsXG4gICAgICAgICAgICAgJzgwMCcsXG4gICAgICAgICAgICAgJ0ExMDAnLFxuICAgICAgICAgICAgICdBMjAwJyxcbiAgICAgICAgICAgICAnQTQwMCcsXG4gICAgICAgICAgICAgJ0E3MDAnXG4gICAgICAgICAgIF0sXG4gICAgICAgICAgICdjb250cmFzdExpZ2h0Q29sb3JzJzogW1xuICAgICAgICAgICAgICc5MDAnXG4gICAgICAgICAgIF1cbiAgICAgICAgIH0pO1xuICAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLmRlZmluZVBhbGV0dGUoJ2p1c3RpY2FyUHJpbWFyeScsIHtcbiAgICAgICAgICAgJzUwJzogJ2YwZThmNicsXG4gICAgICAgICAgICcxMDAnOiAnZGFjNWU5JyxcbiAgICAgICAgICAgJzIwMCc6ICdjMjlmZGEnLFxuICAgICAgICAgICAnMzAwJzogJ2FhNzljYicsXG4gICAgICAgICAgICc0MDAnOiAnOTc1Y2MwJyxcbiAgICAgICAgICAgJzUwMCc6ICc4NTNmYjUnLFxuICAgICAgICAgICAnNjAwJzogJzdkMzlhZScsXG4gICAgICAgICAgICc3MDAnOiAnNzIzMWE1JyxcbiAgICAgICAgICAgJzgwMCc6ICc2ODI5OWQnLFxuICAgICAgICAgICAnOTAwJzogJzU1MWI4ZCcsXG4gICAgICAgICAgICdBMTAwJzogJ2UxYzZmZicsXG4gICAgICAgICAgICdBMjAwJzogJ2M3OTNmZicsXG4gICAgICAgICAgICdBNDAwJzogJ2FjNjBmZicsXG4gICAgICAgICAgICdBNzAwJzogJzlmNDdmZicsXG4gICAgICAgICAgICdjb250cmFzdERlZmF1bHRDb2xvcic6ICdsaWdodCcsXG4gICAgICAgICAgICdjb250cmFzdERhcmtDb2xvcnMnOiBbXG4gICAgICAgICAgICAgJzUwJyxcbiAgICAgICAgICAgICAnMTAwJyxcbiAgICAgICAgICAgICAnMjAwJyxcbiAgICAgICAgICAgICAnMzAwJyxcbiAgICAgICAgICAgICAnQTEwMCcsXG4gICAgICAgICAgICAgJ0EyMDAnLFxuICAgICAgICAgICAgICdBNDAwJ1xuICAgICAgICAgICBdLFxuICAgICAgICAgICAnY29udHJhc3RMaWdodENvbG9ycyc6IFtcbiAgICAgICAgICAgICAnNDAwJyxcbiAgICAgICAgICAgICAnNTAwJyxcbiAgICAgICAgICAgICAnNjAwJyxcbiAgICAgICAgICAgICAnNzAwJyxcbiAgICAgICAgICAgICAnODAwJyxcbiAgICAgICAgICAgICAnOTAwJyxcbiAgICAgICAgICAgICAnQTcwMCdcbiAgICAgICAgICAgXVxuICAgICAgICAgfSk7XG5cbiAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdqdXN0aWNhcicpXG4gICAgICAgICAgICAucHJpbWFyeVBhbGV0dGUoJ2p1c3RpY2FyUHJpbWFyeScpXG4gICAgICAgICAgICAuYWNjZW50UGFsZXR0ZSgnanVzdGljYXJBY2NlbnQnKVxuICAgICAgICAgICAgLndhcm5QYWxldHRlKCdqdXN0aWNhcldhcm4nKTtcbiAgICAgICAgICAgIC8vLmJhY2tncm91bmRQYWxldHRlKCdqdXN0aWNhckJhY2tncm91bmQnKTtcblxuICAgICAgICAvLyBzZXR0aW5nIGl0IGFzIGRlZmF1bHQgdGhlbWVcbiAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLnNldERlZmF1bHRUaGVtZSgnanVzdGljYXInKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogU2V0dGluZyB1cCBzdGF0ZSBtYWNoaW5lXG4gICAgICAgICAqL1xuICAgICAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKFwiL3N0YXJ0XCIpO1xuXG5cbiAgICB9XG5dKS5ydW4oW1xuICAgICckcm9vdFNjb3BlJyxcbiAgICAnJGxvZycsXG4gICAgJyR0cmFuc2l0aW9ucycsXG4gICAgJ0p1c3RpY2FyQVBJJyxcbiAgICBmdW5jdGlvbigkcm9vdFNjb3BlLCAkbG9nLCAkdHJhbnNpdGlvbnMsIEp1c3RpY2FyQVBJKSB7XG5cbiAgICB9XG5dKTtcblxuYW5ndWxhci5tb2R1bGUoXCJKdXN0aWNhci5XZWJDbGllbnRcIikuY29udHJvbGxlcihcIk1haW5DdHJsXCIsIFsnJHNjb3BlJywgJyRsb2cnLCAnJG1kU2lkZW5hdicsICdKdXN0aWNhckF1dGgnLFxuICBmdW5jdGlvbigkc2NvcGUsICRsb2csICRtZFNpZGVuYXYsIEp1c3RpY2FyQXV0aCkge1xuICAgIC8qKlxuICAgICAqIFRvZ2dsZSBzaWRlbmF2IG9uIGJ1dHRvbiBjbGlja1xuICAgICAqL1xuICAgICRzY29wZS50b2dnbGVTaWRlbmF2ID0gZnVuY3Rpb24oKSB7XG4gICAgICAkbWRTaWRlbmF2KFwic2lkZW5hdlwiKS50b2dnbGUoKTtcbiAgICB9O1xuXG4gICAgSnVzdGljYXJBdXRoLmluaXQoKTtcbiAgfVxuXSk7XG4iLCIvKipcbiAqIEBuYW1lc3BhY2UgSnVzdGljYXIuV2ViQ2xpZW50LkFQSVxuICogc2V0cyB1cCB0aGUgQVBJIGNvbmZpZ3VyYXRpb25cbiAqL1xubGV0IG1vZHVsZUFQSSA9IGFuZ3VsYXIubW9kdWxlKFwiSnVzdGljYXIuV2ViQ2xpZW50LkFQSVwiLCBbJ25nUmVzb3VyY2UnXSk7XG5cbi8qKlxuICogU3RvcmVzIGJhc2UgVVJMIGZvciBhcGlcbiAqL1xubW9kdWxlQVBJLmNvbnN0YW50KFwiQVBJX1VSTFwiLCBcImh0dHA6Ly8xMjcuMC4wLjE6MzAwMC9hcGlcIik7XG5cbm1vZHVsZUFQSS5zZXJ2aWNlKFwiSnVzdGljYXJBUElcIiwgWyckaHR0cCcsICckcmVzb3VyY2UnLCAnJGxvZycsICckcScsICdBUElfVVJMJyxcbiAgZnVuY3Rpb24oJGh0dHAsICRyZXNvdXJjZSwgJGxvZywgJHEsIEFQSV9VUkwpIHtcbiAgICAgIGxldCBKdXN0aWNhckFQSSA9IHt9O1xuXG4gICAgICAvKipcbiAgICAgICAqIEF1dGggZnVuY3Rpb25zIHVzZWQgZm9yIGF1dGggYW5kIHVzZXIgbWFuYWdlbWVudFxuICAgICAgICovXG4gICAgICBKdXN0aWNhckFQSS5hdXRoID0ge307XG5cbiAgICAgIEp1c3RpY2FyQVBJLmF1dGgubG9naW4gPSBmdW5jdGlvbihlbWFpbCwgcGFzc3dvcmQpIHtcbiAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoQVBJX1VSTCArIFwiL3VzZXIvbG9naW5cIiwge1xuICAgICAgICAgIGVtYWlsOiBlbWFpbCxcbiAgICAgICAgICBwYXNzd29yZDogcGFzc3dvcmRcbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICBKdXN0aWNhckFQSS5hdXRoLmxvZ291dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gJGh0dHAucG9zdChBUElfVVJMICsgXCIvdXNlci9sb2dvdXRcIik7XG4gICAgICB9O1xuXG4gICAgICBKdXN0aWNhckFQSS5hdXRoLmN1cnJlbnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICRodHRwLmdldChBUElfVVJMICsgXCIvdXNlci9jdXJyZW50XCIpO1xuICAgICAgfTtcblxuICAgICAgSnVzdGljYXJBUEkuYXV0aC5yZWdpc3RlciA9IGZ1bmN0aW9uKGVtYWlsLCBwYXNzd29yZCkge1xuICAgICAgICByZXR1cm4gJGh0dHAucG9zdChBUElfVVJMICsgXCIvdXNlci9yZWdpc3RlclwiLCB7XG4gICAgICAgICAgZW1haWw6IGVtYWlsLFxuICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZFxuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBKdXN0aWNhckFQSTtcbiAgfVxuXSk7XG4iLCIvKipcbiAqIEBuYW1lc3BhY2UgSnVzdGljYXIuV2ViQ2xpZW50LkF1dGhcbiAqIGhhbmRsZXMgbG9naW4gYW5kIGNoZWNraW5nIHBlcm1pc3Npb25zXG4gKi9cbmxldCBtb2R1bGVBdXRoID0gYW5ndWxhci5tb2R1bGUoXCJKdXN0aWNhci5XZWJDbGllbnQuQXV0aFwiLCBbJ25nUmVzb3VyY2UnLCAnSnVzdGljYXIuV2ViQ2xpZW50LkFQSSddKTtcblxuLyoqXG4gKlxuICovXG5cbm1vZHVsZUF1dGguc2VydmljZShcIkp1c3RpY2FyQXV0aFwiLCBbJyRodHRwJywgJyRyZXNvdXJjZScsICckbG9nJywgJyRxJywgJyRtZFBhbmVsJywgJ0p1c3RpY2FyQVBJJyxcbiAgZnVuY3Rpb24oJGh0dHAsICRyZXNvdXJjZSwgJGxvZywgJHEsICRtZFBhbmVsLCBKdXN0aWNhckFQSSkge1xuICAgICAgbGV0IEp1c3RpY2FyQXV0aCA9IHt9O1xuXG4gICAgICBKdXN0aWNhckF1dGguY3VycmVudFVzZXIgPSBudWxsO1xuXG4gICAgICAvKipcbiAgICAgICAqIExvZ2luIHRvIHN5c3RlbVxuICAgICAgICovXG4gICAgICBKdXN0aWNhckF1dGguaW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBKdXN0aWNhckFQSS5hdXRoLmN1cnJlbnQoKS50aGVuKFxuICAgICAgICAgIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBKdXN0aWNhckF1dGguY3VycmVudFVzZXIgPSByZXNwb25zZS5kYXRhLnVzZXI7XG5cbiAgICAgICAgICB9XG4gICAgICAgICkuY2F0Y2goXG4gICAgICAgICAgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICBKdXN0aWNhckF1dGguY3VycmVudFVzZXIgPSBudWxsO1xuICAgICAgICAgICAgSnVzdGljYXJBdXRoLm9wZW5Mb2dpblBhbmVsKCk7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfTtcblxuICAgICAgLyoqXG4gICAgICAgKiBMb2dpbiB0byBzeXN0ZW1cbiAgICAgICAqL1xuICAgICAgSnVzdGljYXJBdXRoLmxvZ2luID0gZnVuY3Rpb24oZW1haWwsIHBhc3N3b3JkKSB7XG4gICAgICAgIEp1c3RpY2FyQVBJLmF1dGgubG9naW4oZW1haWwsIHBhc3N3b3JkKS50aGVuKFxuICAgICAgICAgIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBKdXN0aWNhckF1dGguY3VycmVudFVzZXIgPSByZXNwb25zZS5kYXRhLnVzZXI7XG4gICAgICAgICAgfVxuICAgICAgICApLmNhdGNoKFxuICAgICAgICAgIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgLy8gQFRPRE8gYmV0dGVyIGhhbmRsaW5nIG9mIHJlc3VsdHMsIGZhaWxlZCBsb2dpbiwgZXRjLlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycik7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfTtcblxuICAgICAgLyoqXG4gICAgICAgKiBMb2dvdXQgb2Ygc3lzdGVtXG4gICAgICAgKi9cbiAgICAgIEp1c3RpY2FyQXV0aC5sb2dvdXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgSnVzdGljYXJBUEkuYXV0aC5sb2dvdXQoKS50aGVuKFxuICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgSnVzdGljYXJBdXRoLmN1cnJlbnRVc2VyID0gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgICkuY2F0Y2goXG4gICAgICAgICAgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAvLyBAVE9ETyBiZXR0ZXIgaGFuZGxpbmcgb2YgcmVzdWx0cywgZmFpbGVkIGxvZ2luLCBldGMuXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICB9O1xuXG4gICAgICAvKipcbiAgICAgICAqIFJlZ2lzdGVyIG5ldyB1c2VyXG4gICAgICAgKi9cbiAgICAgIEp1c3RpY2FyQXV0aC5yZWdpc3RlciA9IGZ1bmN0aW9uKGVtYWlsLCBwYXNzd29yZCkge1xuICAgICAgICBKdXN0aWNhckFQSS5hdXRoLnJlZ2lzdGVyKGVtYWlsLCBwYXNzd29yZCkudGhlbihcbiAgICAgICAgICBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgSnVzdGljYXJBdXRoLmN1cnJlbnRVc2VyID0gcmVzcG9uc2UuZGF0YS51c2VyOyAvLyB0aGlzIGlzIGxpa2VseSB3cm9uZ1xuICAgICAgICAgIH1cbiAgICAgICAgKS5jYXRjaChcbiAgICAgICAgICBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIC8vIEBUT0RPIGJldHRlciBoYW5kbGluZyBvZiByZXN1bHRzLCBmYWlsZWQgbG9naW4sIGV0Yy5cbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnIpO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH07XG5cbiAgICAgIC8qKlxuICAgICAgICogT3BlbiBtb2RhbCBwYW5lbCBmb3IgbG9nZ2luZyBpbnNwZWN0XG4gICAgICAgKi9cbiAgICAgIEp1c3RpY2FyQXV0aC5vcGVuTG9naW5QYW5lbCA9IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuXG4gICAgICAgIGxldCBwYW5lbFBvc2l0aW9uID0gJG1kUGFuZWwubmV3UGFuZWxQb3NpdGlvbigpXG4gICAgICAgICAgLmFic29sdXRlKClcbiAgICAgICAgICAuY2VudGVyKCk7XG5cbiAgICAgICAgbGV0IHBhbmVsQW5pbWF0aW9uID0gJG1kUGFuZWwubmV3UGFuZWxBbmltYXRpb24oKVxuICAgICAgICAgIC5vcGVuRnJvbSh7IHRvcDogMSwgcmlnaHQ6MCB9KVxuICAgICAgICAgIC5kdXJhdGlvbigyMDApXG4gICAgICAgICAgLmNsb3NlVG8oeyB0b3A6IDEsIHJpZ2h0OjAgfSlcbiAgICAgICAgICAud2l0aEFuaW1hdGlvbigkbWRQYW5lbC5hbmltYXRpb24uU0NBTEUpO1xuXG4gICAgICAgIGxldCBwYW5lbENvbmZpZyA9IHtcbiAgICAgICAgICBhdHRhY2hUbzogYW5ndWxhci5lbGVtZW50KGRvY3VtZW50LmJvZHkpLFxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdMb2dpbkN0cmwnLFxuICAgICAgICAgIGRpc2FibGVQYXJlbnRTY3JvbGw6IHRydWUsXG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICcvcGFydGlhbHMvcGFuZWxzL2xvZ2luJyxcbiAgICAgICAgICBwYW5lbENsYXNzOiBcImp1c3RpY2FyLXBhbmVsXCIsXG4gICAgICAgICAgekluZGV4OiAxNTAsXG4gICAgICAgICAgbG9jYWxzOiB7XG4gICAgICAgICAgICBkZWZlcnJlZDogZGVmZXJyZWRcbiAgICAgICAgICB9LFxuICAgICAgICAgIHRyYXBGb2N1czogdHJ1ZSxcbiAgICAgICAgICBjbGlja091dHNpZGVUb0Nsb3NlOiB0cnVlLFxuICAgICAgICAgIGNsaWNrRXNjYXBlVG9DbG9zZTogdHJ1ZSxcbiAgICAgICAgICBoYXNCYWNrZHJvcDogdHJ1ZSxcbiAgICAgICAgICBwb3NpdGlvbjogcGFuZWxQb3NpdGlvbixcbiAgICAgICAgICBhbmltYXRpb246IHBhbmVsQW5pbWF0aW9uXG4gICAgICAgIH07XG5cbiAgICAgICAgJG1kUGFuZWwub3BlbihwYW5lbENvbmZpZyk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICB9O1xuXG4gICAgICAvKipcbiAgICAgICAqIE9wZW4gcmVnaXN0cmF0aW9uIHBhbmVsXG4gICAgICAgKi9cbiAgICAgIEp1c3RpY2FyQXV0aC5vcGVuUmVnaXN0ZXJQYW5lbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuXG4gICAgICAgIGxldCBwYW5lbFBvc2l0aW9uID0gJG1kUGFuZWwubmV3UGFuZWxQb3NpdGlvbigpXG4gICAgICAgICAgLmFic29sdXRlKClcbiAgICAgICAgICAuY2VudGVyKCk7XG5cbiAgICAgICAgbGV0IHBhbmVsQW5pbWF0aW9uID0gJG1kUGFuZWwubmV3UGFuZWxBbmltYXRpb24oKVxuICAgICAgICAgIC5vcGVuRnJvbSh7dG9wOiAxLCBsZWZ0OiAxfSlcbiAgICAgICAgICAuZHVyYXRpb24oMjAwKVxuICAgICAgICAgIC5jbG9zZVRvKHt0b3A6IDEsIGxlZnQ6IDF9KVxuICAgICAgICAgIC53aXRoQW5pbWF0aW9uKCRtZFBhbmVsLmFuaW1hdGlvbi5TQ0FMRSk7XG5cbiAgICAgICAgbGV0IHBhbmVsQ29uZmlnID0ge1xuICAgICAgICAgIGF0dGFjaFRvOiBhbmd1bGFyLmVsZW1lbnQoZG9jdW1lbnQuYm9keSksXG4gICAgICAgICAgY29udHJvbGxlcjogJ1JlZ2lzdGVyQ3RybCcsXG4gICAgICAgICAgZGlzYWJsZVBhcmVudFNjcm9sbDogdHJ1ZSxcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9wYXJ0aWFscy9wYW5lbHMvcmVnaXN0ZXInLFxuICAgICAgICAgIHBhbmVsQ2xhc3M6IFwianVzdGljYXItcGFuZWxcIixcbiAgICAgICAgICB6SW5kZXg6IDE3NSxcbiAgICAgICAgICBsb2NhbHM6IHtcbiAgICAgICAgICAgIGRlZmVycmVkOiBkZWZlcnJlZFxuICAgICAgICAgIH0sXG4gICAgICAgICAgdHJhcEZvY3VzOiB0cnVlLFxuICAgICAgICAgIGNsaWNrT3V0c2lkZVRvQ2xvc2U6IHRydWUsXG4gICAgICAgICAgY2xpY2tFc2NhcGVUb0Nsb3NlOiB0cnVlLFxuICAgICAgICAgIGhhc0JhY2tkcm9wOiB0cnVlLFxuICAgICAgICAgIHBvc2l0aW9uOiBwYW5lbFBvc2l0aW9uLFxuICAgICAgICAgIGFuaW1hdGlvbjogcGFuZWxBbmltYXRpb25cbiAgICAgICAgfTtcblxuICAgICAgICAkbWRQYW5lbC5vcGVuKHBhbmVsQ29uZmlnKTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgIH07XG5cbiAgICAgIC8qKlxuICAgICAgICogQ2hlY2sgcGVybWlzc2lvbnMgYmFzZWQgb24gYSBzdHJpbmdcbiAgICAgICAqL1xuICAgICAgSnVzdGljYXJBdXRoLmNoZWNrUGVybWlzc2lvbnMgPSBmdW5jdGlvbihwZXJtaXNzaW9uKSB7XG4gICAgICAgIC8vIEBUT0RPXG4gICAgICB9O1xuXG5cbiAgICAgIHJldHVybiBKdXN0aWNhckF1dGg7XG4gIH1cbl0pO1xuXG5tb2R1bGVBdXRoLmNvbnRyb2xsZXIoJ0xvZ2luQ3RybCcsIFtcbiAgZnVuY3Rpb24oJG1kUGFuZWwpIHtcblxuICB9XG5dKTtcblxuXG5tb2R1bGVBdXRoLmNvbnRyb2xsZXIoJ1JlZ2lzdGVyQ3RybCcsIFtcbiAgZnVuY3Rpb24oJG1kUGFuZWwpIHtcblxuICB9XG5dKTtcbiIsIi8qKlxuICogQG5hbWVzcGFjZSBKdXN0aWNhci5XZWJDbGllbnQuU3RhdGVzLkFkbWluXG4gKiBTdG9yZXMgYWxsIHRoZSBzdGF0ZXMgZm9yIHRoZSBBbmd1bGFyIFVJIHJvdXRlciBzdGF0ZSBtYWNoaW5lIGFuZCBhc3NvY2lhdGVzIGNvbnRyb2xsZXJzXG4gKi9cbmxldCBzdGF0ZUFkbWluID0gYW5ndWxhci5tb2R1bGUoXCJKdXN0aWNhci5XZWJDbGllbnQuU3RhdGVzLkFkbWluXCIsIFtcbiAgJ3VpLnJvdXRlcidcbl0pO1xuXG4vKipcbiAqIFN0YXRlIG5hbWUgZm9yIHRoaXMgc3RhdGVcbiAqL1xuc3RhdGVBZG1pbi5jb25zdGFudChcIkFETUlOX1NUQVRFXCIsIFwiYWRtaW5cIik7XG5cbi8qKlxuICogU3ViLVVSTCBmb3IgdGhpcyBzdGF0ZVxuICovXG5zdGF0ZUFkbWluLmNvbnN0YW50KFwiQURNSU5fU1RBVEVfVVJMXCIsIFwiL2FkbWluXCIpO1xuXG4vKipcbiAqIENvbmZpZyBhY3Rpb24gdGhhdCBzZXRzIHVwIHRoaXMgbW9kdWxlXG4gKi9cbnN0YXRlQWRtaW4uY29uZmlnKFtcbiAgJyRzdGF0ZVByb3ZpZGVyJyxcbiAgJ0FETUlOX1NUQVRFJyxcbiAgJ0FETUlOX1NUQVRFX1VSTCcsXG4gIGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCBBRE1JTl9TVEFURSwgQURNSU5fU1RBVEVfVVJMKSB7XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdXAgc3RhdGUgaW4gYXBwbGljYXRpb24gc3RhdGUgbWFjaGluZS5cbiAgICAgKi9cbiAgICAkc3RhdGVQcm92aWRlclxuICAgICAgLnN0YXRlKEFETUlOX1NUQVRFLCB7XG4gICAgICAgIHVybDogQURNSU5fU1RBVEVfVVJMLFxuICAgICAgICBwYXJhbXM6IHt9LFxuICAgICAgICBhYnN0cmFjdDogdHJ1ZVxuICAgICAgfSlcbiAgICA7XG4gIH1cbl0pO1xuIiwicmVxdWlyZShcIi4vbGFuZGluZy9pbmRleC5qc1wiKTtcbnJlcXVpcmUoXCIuL3BsYXllci9pbmRleC5qc1wiKTtcbnJlcXVpcmUoXCIuL2FkbWluL2luZGV4LmpzXCIpO1xuXG4vKipcbiAqIEBuYW1lc3BhY2UgSnVzdGljYXIuV2ViQ2xpZW50LlN0YXRlc1xuICogU3RvcmVzIGFsbCB0aGUgc3RhdGVzIGZvciB0aGUgQW5ndWxhciBVSSByb3V0ZXIgc3RhdGUgbWFjaGluZSBhbmQgYXNzb2NpYXRlcyBjb250cm9sbGVyc1xuICovXG5hbmd1bGFyLm1vZHVsZShcIkp1c3RpY2FyLldlYkNsaWVudC5TdGF0ZXNcIiwgW1xuICAnSnVzdGljYXIuV2ViQ2xpZW50LlN0YXRlcy5MYW5kaW5nJyxcbiAgJ0p1c3RpY2FyLldlYkNsaWVudC5TdGF0ZXMuUGxheWVyJyxcbiAgJ0p1c3RpY2FyLldlYkNsaWVudC5TdGF0ZXMuQWRtaW4nLFxuXSk7XG4iLCIvKipcbiAqIEBuYW1lc3BhY2UgSnVzdGljYXIuV2ViQ2xpZW50LlN0YXRlcy5MYW5kaW5nXG4gKiBTdG9yZXMgYWxsIHRoZSBzdGF0ZXMgZm9yIHRoZSBBbmd1bGFyIFVJIHJvdXRlciBzdGF0ZSBtYWNoaW5lIGFuZCBhc3NvY2lhdGVzIGNvbnRyb2xsZXJzXG4gKi9cbmxldCBzdGF0ZUxhbmRpbmcgPSBhbmd1bGFyLm1vZHVsZShcIkp1c3RpY2FyLldlYkNsaWVudC5TdGF0ZXMuTGFuZGluZ1wiLCBbXG4gICd1aS5yb3V0ZXInXG5dKTtcblxuLyoqXG4gKiBTdGF0ZSBuYW1lIGZvciB0aGlzIHN0YXRlXG4gKi9cbnN0YXRlTGFuZGluZy5jb25zdGFudChcIkxBTkRJTkdfU1RBVEVcIiwgXCJsYW5kaW5nXCIpO1xuXG4vKipcbiAqIFN1Yi1VUkwgZm9yIHRoaXMgc3RhdGVcbiAqL1xuc3RhdGVMYW5kaW5nLmNvbnN0YW50KFwiTEFORElOR19TVEFURV9VUkxcIiwgXCIvc3RhcnRcIik7XG5cbi8qKlxuICogTG9jYXRpb24gdG8gbG9hZCB2aWV3IGZyb21cbiAqL1xuc3RhdGVMYW5kaW5nLmNvbnN0YW50KFwiTEFORElOR19URU1QTEFURV9VUkxcIiwgXCIvcGFydGlhbHMvc3RhdGVzL2xhbmRpbmdcIik7XG5cbi8qKlxuICogQ29uZmlnIGFjdGlvbiB0aGF0IHNldHMgdXAgdGhpcyBtb2R1bGVcbiAqL1xuc3RhdGVMYW5kaW5nLmNvbmZpZyhbXG4gICckc3RhdGVQcm92aWRlcicsXG4gICdMQU5ESU5HX1NUQVRFJyxcbiAgJ0xBTkRJTkdfU1RBVEVfVVJMJyxcbiAgJ0xBTkRJTkdfVEVNUExBVEVfVVJMJyxcbiAgZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsIExBTkRJTkdfU1RBVEUsIExBTkRJTkdfU1RBVEVfVVJMLCBMQU5ESU5HX1RFTVBMQVRFX1VSTCkge1xuXG4gICAgLyoqXG4gICAgICogU2V0IHVwIHN0YXRlIGluIGFwcGxpY2F0aW9uIHN0YXRlIG1hY2hpbmUuXG4gICAgICovXG4gICAgJHN0YXRlUHJvdmlkZXJcbiAgICAgIC5zdGF0ZShMQU5ESU5HX1NUQVRFLCB7XG4gICAgICAgIHVybDogTEFORElOR19TVEFURV9VUkwsXG4gICAgICAgIHBhcmFtczoge30sXG4gICAgICAgIGNvbnRyb2xsZXI6IFwiU3RhdGVMYW5kaW5nQ3RybFwiLFxuICAgICAgICB0ZW1wbGF0ZVVybDogTEFORElOR19URU1QTEFURV9VUkxcbiAgICAgIH0pXG4gICAgO1xuICB9XG5dKTtcblxuLyoqXG4gKiBDb250cm9sbGVyIGZvciBzdGF0ZVxuICovXG5zdGF0ZUxhbmRpbmcuY29udHJvbGxlcihcIlN0YXRlTGFuZGluZ0N0cmxcIiwgW1xuICBmdW5jdGlvbigpIHtcblxuICB9XG5dKTtcbiIsIi8qKlxuICogQG5hbWVzcGFjZSBKdXN0aWNhci5XZWJDbGllbnQuU3RhdGVzLlBsYXllclxuICogU3RvcmVzIGFsbCB0aGUgc3RhdGVzIGZvciB0aGUgQW5ndWxhciBVSSByb3V0ZXIgc3RhdGUgbWFjaGluZSBhbmQgYXNzb2NpYXRlcyBjb250cm9sbGVyc1xuICovXG5sZXQgc3RhdGVQbGF5ZXIgPSBhbmd1bGFyLm1vZHVsZShcIkp1c3RpY2FyLldlYkNsaWVudC5TdGF0ZXMuUGxheWVyXCIsIFtcbiAgJ3VpLnJvdXRlcidcbl0pO1xuXG4vKipcbiAqIFN0YXRlIG5hbWUgZm9yIHRoaXMgc3RhdGVcbiAqL1xuc3RhdGVQbGF5ZXIuY29uc3RhbnQoXCJQTEFZRVJfU1RBVEVcIiwgXCJwbGF5ZXJcIik7XG5cbi8qKlxuICogU3ViLVVSTCBmb3IgdGhpcyBzdGF0ZVxuICovXG5zdGF0ZVBsYXllci5jb25zdGFudChcIlBMQVlFUl9TVEFURV9VUkxcIiwgXCIvcGxheWVyXCIpO1xuXG4vKipcbiAqIENvbmZpZyBhY3Rpb24gdGhhdCBzZXRzIHVwIHRoaXMgbW9kdWxlXG4gKi9cbnN0YXRlUGxheWVyLmNvbmZpZyhbXG4gICckc3RhdGVQcm92aWRlcicsXG4gICdQTEFZRVJfU1RBVEUnLFxuICAnUExBWUVSX1NUQVRFX1VSTCcsXG4gIGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCBQTEFZRVJfU1RBVEUsIFBMQVlFUl9TVEFURV9VUkwpIHtcblxuICAgIC8qKlxuICAgICAqIFNldCB1cCBzdGF0ZSBpbiBhcHBsaWNhdGlvbiBzdGF0ZSBtYWNoaW5lLlxuICAgICAqL1xuICAgICRzdGF0ZVByb3ZpZGVyXG4gICAgICAuc3RhdGUoUExBWUVSX1NUQVRFLCB7XG4gICAgICAgIHVybDogUExBWUVSX1NUQVRFX1VSTCxcbiAgICAgICAgcGFyYW1zOiB7fSxcbiAgICAgICAgYWJzdHJhY3Q6IHRydWVcbiAgICAgIH0pXG4gICAgO1xuICB9XG5dKTtcbiJdfQ==
