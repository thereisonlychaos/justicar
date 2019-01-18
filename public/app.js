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
  $mdThemingProvider.definePalette('justicarBackground', {
    '50': 'fafafc',
    '100': 'f4f2f8',
    '200': 'ece9f4',
    '300': 'e4e0f0',
    '400': 'dfd9ec',
    '500': 'd9d2e9',
    '600': 'd5cde6',
    '700': 'cfc7e3',
    '800': 'cac1df',
    '900': 'c0b6d9',
    'A100': 'ffffff',
    'A200': 'ffffff',
    'A400': 'ffffff',
    'A700': 'ffffff',
    'contrastDefaultColor': 'dark',
    'contrastDarkColors': ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', 'A100', 'A200', 'A400', 'A700'],
    'contrastLightColors': []
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
      user: {
        email: email,
        password: password
      }
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
      user: {
        email: email,
        password: password
      }
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

moduleAuth.controller('LoginCtrl', ['mdPanelRef', '$scope', '$log', 'JusticarAPI', 'JusticarAuth', function (mdPanelRef, $scope, $log, JusticarAPI, JusticarAuth) {
  $scope.waiting = false;
  $scope.errorMssg = "";
  /**
   * Handle clicking login button, using $scope.userEmail & $scope.userPassword
   */
  $scope.onClickLogin = function () {
    // login and close if successful
    $scope.waiting = true;

    JusticarAPI.auth.login($scope.userEmail, $scope.userPassword).then(function () {
      $scope.waiting = false;
      mdPanelRef.close();
    }).catch(function (err) {
      $log.error(err);
      $scope.errorMssg = "Error logging in.";
      $scope.waiting = false;
      // @TODO better messaging
    });
  };

  /**
   * Handle clicking register button
   */
  $scope.onClickRegister = function () {
    JusticarAuth.openRegisterPanel();
    mdPanelRef.close();
  };

  $scope.onClickClose = function () {
    mdPanelRef.close();
  };
}]);

moduleAuth.controller('RegisterCtrl', ['mdPanelRef', '$scope', '$log', 'JusticarAPI', 'JusticarAuth', function (mdPanelRef, $scope, $log, JusticarAPI, JusticarAuth) {
  $scope.waiting = false;
  $scope.errorMssg = "";
  /**
   * Handle clicking register button
   */
  $scope.onClickRegister = function () {
    // login and close if successful
    $scope.waiting = true;

    JusticarAPI.auth.register($scope.userEmail, $scope.userPassword).then(function () {
      $scope.waiting = false;
      mdPanelRef.close();
    }).catch(function (err) {
      $log.error(err);
      $scope.errorMssg = "Error registering.";
      $scope.waiting = false;
      // @TODO better messaging
    });
  };

  /**
   * Handle clicking login button
   */
  $scope.onClickLogin = function () {
    JusticarAuth.openLoginPanel();
    mdPanelRef.close();
  };

  $scope.onClickClose = function () {
    mdPanelRef.close();
  };
}]);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvY2xpZW50LmpzIiwiY2xpZW50L21vZHVsZXMvYXBpL2luZGV4LmpzIiwiY2xpZW50L21vZHVsZXMvYXV0aC9pbmRleC5qcyIsImNsaWVudC9zdGF0ZXMvYWRtaW4vaW5kZXguanMiLCJjbGllbnQvc3RhdGVzL2luZGV4LmpzIiwiY2xpZW50L3N0YXRlcy9sYW5kaW5nL2luZGV4LmpzIiwiY2xpZW50L3N0YXRlcy9wbGF5ZXIvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7O0FBR0E7O0FBRUE7O0FBQ0EsUUFBUSx3QkFBUjtBQUNBLFFBQVEseUJBQVI7O0FBRUE7O0FBRUE7QUFDQSxRQUFRLG1CQUFSOztBQUVBOzs7QUFHQSxRQUFRLE1BQVIsQ0FBZSxvQkFBZixFQUFxQztBQUNqQztBQUNBLFlBRmlDLEVBRW5CO0FBQ2QsWUFIaUMsRUFHbkI7QUFDZCxZQUppQyxFQUluQjtBQUNkLFdBTGlDLEVBS3BCO0FBQ2IsWUFOaUMsRUFNbkI7QUFDZCxlQVBpQyxFQVFqQyxnQkFSaUMsRUFTakMsb0JBVGlDLEVBU1g7QUFDdEIsV0FWaUM7O0FBWWpDO0FBQ0Esd0JBYmlDLEVBY2pDLHlCQWRpQyxFQWVqQywyQkFmaUMsQ0FBckMsRUFnQkcsTUFoQkgsQ0FnQlUsQ0FDTixtQkFETSxFQUVOLG9CQUZNLEVBR04sb0JBSE0sRUFJTixVQUFTLGlCQUFULEVBQTRCLGtCQUE1QixFQUFnRCxrQkFBaEQsRUFBb0U7O0FBR2hFOzs7QUFHQSxvQkFBa0IsVUFBbEIsQ0FBNkIsRUFBN0I7QUFDQSxvQkFBa0IsU0FBbEIsQ0FBNEIsS0FBNUI7O0FBRUE7Ozs7QUFJQyxxQkFBbUIsYUFBbkIsQ0FBaUMsY0FBakMsRUFBaUQ7QUFDL0MsVUFBTSxRQUR5QztBQUUvQyxXQUFPLFFBRndDO0FBRy9DLFdBQU8sUUFId0M7QUFJL0MsV0FBTyxRQUp3QztBQUsvQyxXQUFP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QURpQixFQUVqQixjQUZpQixFQUdqQixrQkFIaUIsRUFJakIsVUFBUyxjQUFULEVBQXlCLFlBQXpCLEVBQXVDLGdCQUF2QyxFQUF5RDs7QUFFdkQ7OztBQUdBLGlCQUNHLEtBREgsQ0FDUyxZQURULEVBQ3VCO0FBQ25CLFNBQUssZ0JBRGM7QUFFbkIsWUFBUSxFQUZXO0FBR25CLGNBQVU7QUFIUyxHQUR2QjtBQU9ELENBaEJnQixDQUFuQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8qKlxuICogQG5hbWVzcGFjZSBKdXN0aWNhci5XZWJDbGllbnRcbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG4vLyBMb2NhbCBBbmd1bGFyIE1vZHVsZXMgT25seS4gUGx1Z2lucyBhbmQgb3RoZXIgbGlicmFyaWVzIGdvIGluIHRoZSBsaWIuanMgZm9sZGVyIHRvIG1ha2UgZm9yIHF1aWNrZXIgY29tcGlsaW5nLlxucmVxdWlyZSgnLi9tb2R1bGVzL2FwaS9pbmRleC5qcycpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2F1dGgvaW5kZXguanMnKTtcblxuLy8gTWl4aW5zXG5cbi8vIExvY2FsIFN0YXRlIE1vZHVsZXNcbnJlcXVpcmUoJy4vc3RhdGVzL2luZGV4LmpzJyk7XG5cbi8vIERlZmluZSBtYWluIG1vZHVsZVxuXG5cbmFuZ3VsYXIubW9kdWxlKCdKdXN0aWNhci5XZWJDbGllbnQnLCBbXG4gICAgLy8gQW5ndWxhciBMaWJyYXJpZXNcbiAgICAnbmdNYXRlcmlhbCcsIC8vIGFuZ3VsYXItbWF0ZXJpYWxcbiAgICAnbmdTYW5pdGl6ZScsIC8vIGFuZ3VsYXItc2FuaXRpemVcbiAgICAnbmdSZXNvdXJjZScsIC8vIGFuZ3VsYXItcmVzb3VyY2VcbiAgICAnbmdBbmltYXRlJywgLy8gYW5ndWxhci1hbmltYXRlXG4gICAgJ25nTWVzc2FnZXMnLCAvLyBhbmd1bGFyLW1lc3NhZ2VzXG4gICAgJ2FuZ3VsYXJNb21lbnQnLFxuICAgICdhbmd1bGFyLmZpbHRlcicsXG4gICAgJ0xvY2FsU3RvcmFnZU1vZHVsZScsIC8vIGFuZ3VsYXItbG9jYWwtc3RvcmFnZVxuICAgICd1aS5yb3V0ZXInLFxuXG4gICAgLy8gTG9jYWwgbW9kdWxlc1xuICAgICdKdXN0aWNhci5XZWJDbGllbnQuQVBJJyxcbiAgICAnSnVzdGljYXIuV2ViQ2xpZW50LkF1dGgnLFxuICAgICdKdXN0aWNhci5XZWJDbGllbnQuU3RhdGVzJyxcbl0pLmNvbmZpZyhbXG4gICAgJyRsb2NhdGlvblByb3ZpZGVyJyxcbiAgICAnJG1kVGhlbWluZ1Byb3ZpZGVyJyxcbiAgICAnJHVybFJvdXRlclByb3ZpZGVyJyxcbiAgICBmdW5jdGlvbigkbG9jYXRpb25Qcm92aWRlciwgJG1kVGhlbWluZ1Byb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAkbG9jYXRpb25Qcm92aWRlciBzZXR0aW5nc1xuICAgICAgICAgKi9cbiAgICAgICAgJGxvY2F0aW9uUHJvdmlkZXIuaGFzaFByZWZpeCgnJyk7XG4gICAgICAgICRsb2NhdGlvblByb3ZpZGVyLmh0bWw1TW9kZShmYWxzZSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZW1pbmdcbiAgICAgICAgICovXG5cbiAgICAgICAgICRtZFRoZW1pbmdQcm92aWRlci5kZWZpbmVQYWxldHRlKCdqdXN0aWNhcldhcm4nLCB7XG4gICAgICAgICAgICc1MCc6ICdlZGUzZTMnLFxuICAgICAgICAgICAnMTAwJzogJ2QzYmFiYScsXG4gICAgICAgICAgICcyMDAnOiAnYjY4YzhjJyxcbiAgICAgICAgICAgJzMwMCc6ICc5OTVlNWUnLFxuICAgICAgICAgICAnNDAwJzogJzgzM2MzYycsXG4gICAgICAgICAgICc1MDAnOiAnNmQxOTE5JyxcbiAgICAgICAgICAgJzYwMCc6ICc2NTE2MTYnLFxuICAgICAgICAgICAnNzAwJzogJzVhMTIxMicsXG4gICAgICAgICAgICc4MDAnOiAnNTAwZTBlJyxcbiAgICAgICAgICAgJzkwMCc6ICczZTA4MDgnLFxuICAgICAgICAgICAnQTEwMCc6ICdmZjc1NzUnLFxuICAgICAgICAgICAnQTIwMCc6ICdmZjQyNDInLFxuICAgICAgICAgICAnQTQwMCc6ICdiODBjMGMnLFxuICAgICAgICAgICAnQTcwMCc6ICc5NzAwMDAnLFxuICAgICAgICAgICAnY29udHJhc3REZWZhdWx0Q29sb3InOiAnbGlnaHQnLFxuICAgICAgICAgICAnY29udHJhc3REYXJrQ29sb3JzJzogW1xuICAgICAgICAgICAgICc1MCcsXG4gICAgICAgICAgICAgJzEwMCcsXG4gICAgICAgICAgICAgJzIwMCcsXG4gICAgICAgICAgICAgJ0ExMDAnLFxuICAgICAgICAgICAgICdBMjAwJ1xuICAgICAgICAgICBdLFxuICAgICAgICAgICAnY29udHJhc3RMaWdodENvbG9ycyc6IFtcbiAgICAgICAgICAgICAnMzAwJyxcbiAgICAgICAgICAgICAnNDAwJyxcbiAgICAgICAgICAgICAnNTAwJyxcbiAgICAgICAgICAgICAnNjAwJyxcbiAgICAgICAgICAgICAnNzAwJyxcbiAgICAgICAgICAgICAnODAwJyxcbiAgICAgICAgICAgICAnOTAwJyxcbiAgICAgICAgICAgICAnQTQwMCcsXG4gICAgICAgICAgICAgJ0E3MDAnXG4gICAgICAgICAgIF1cbiAgICAgICAgIH0pO1xuICAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLmRlZmluZVBhbGV0dGUoJ2p1c3RpY2FyQWNjZW50Jywge1xuICAgICAgICAgICAnNTAnOiAnZmNmMmU3JyxcbiAgICAgICAgICAgJzEwMCc6ICdmOGRlYzMnLFxuICAgICAgICAgICAnMjAwJzogJ2YzYzg5YycsXG4gICAgICAgICAgICczMDAnOiAnZWViMjc0JyxcbiAgICAgICAgICAgJzQwMCc6ICdlYWEyNTYnLFxuICAgICAgICAgICAnNTAwJzogJ2U2OTEzOCcsXG4gICAgICAgICAgICc2MDAnOiAnZTM4OTMyJyxcbiAgICAgICAgICAgJzcwMCc6ICdkZjdlMmInLFxuICAgICAgICAgICAnODAwJzogJ2RiNzQyNCcsXG4gICAgICAgICAgICc5MDAnOiAnZDU2MjE3JyxcbiAgICAgICAgICAgJ0ExMDAnOiAnZjlkYWJhJyxcbiAgICAgICAgICAgJ0EyMDAnOiAnZjJjZGE3JyxcbiAgICAgICAgICAgJ0E0MDAnOiAnZmZjM2ExJyxcbiAgICAgICAgICAgJ0E3MDAnOiAnZmZiMjg3JyxcbiAgICAgICAgICAgJ2NvbnRyYXN0RGVmYXVsdENvbG9yJzogJ2xpZ2h0JyxcbiAgICAgICAgICAgJ2NvbnRyYXN0RGFya0NvbG9ycyc6IFtcbiAgICAgICAgICAgICAnNTAnLFxuICAgICAgICAgICAgICcxMDAnLFxuICAgICAgICAgICAgICcyMDAnLFxuICAgICAgICAgICAgICczMDAnLFxuICAgICAgICAgICAgICc0MDAnLFxuICAgICAgICAgICAgICc1MDAnLFxuICAgICAgICAgICAgICc2MDAnLFxuICAgICAgICAgICAgICc3MDAnLFxuICAgICAgICAgICAgICc4MDAnLFxuICAgICAgICAgICAgICdBMTAwJyxcbiAgICAgICAgICAgICAnQTIwMCcsXG4gICAgICAgICAgICAgJ0E0MDAnLFxuICAgICAgICAgICAgICdBNzAwJ1xuICAgICAgICAgICBdLFxuICAgICAgICAgICAnY29udHJhc3RMaWdodENvbG9ycyc6IFtcbiAgICAgICAgICAgICAnOTAwJ1xuICAgICAgICAgICBdXG4gICAgICAgICB9KTtcbiAgICAgICAgICRtZFRoZW1pbmdQcm92aWRlci5kZWZpbmVQYWxldHRlKCdqdXN0aWNhclByaW1hcnknLCB7XG4gICAgICAgICAgICc1MCc6ICdmMGU4ZjYnLFxuICAgICAgICAgICAnMTAwJzogJ2RhYzVlOScsXG4gICAgICAgICAgICcyMDAnOiAnYzI5ZmRhJyxcbiAgICAgICAgICAgJzMwMCc6ICdhYTc5Y2InLFxuICAgICAgICAgICAnNDAwJzogJzk3NWNjMCcsXG4gICAgICAgICAgICc1MDAnOiAnODUzZmI1JyxcbiAgICAgICAgICAgJzYwMCc6ICc3ZDM5YWUnLFxuICAgICAgICAgICAnNzAwJzogJzcyMzFhNScsXG4gICAgICAgICAgICc4MDAnOiAnNjgyOTlkJyxcbiAgICAgICAgICAgJzkwMCc6ICc1NTFiOGQnLFxuICAgICAgICAgICAnQTEwMCc6ICdlMWM2ZmYnLFxuICAgICAgICAgICAnQTIwMCc6ICdjNzkzZmYnLFxuICAgICAgICAgICAnQTQwMCc6ICdhYzYwZmYnLFxuICAgICAgICAgICAnQTcwMCc6ICc5ZjQ3ZmYnLFxuICAgICAgICAgICAnY29udHJhc3REZWZhdWx0Q29sb3InOiAnbGlnaHQnLFxuICAgICAgICAgICAnY29udHJhc3REYXJrQ29sb3JzJzogW1xuICAgICAgICAgICAgICc1MCcsXG4gICAgICAgICAgICAgJzEwMCcsXG4gICAgICAgICAgICAgJzIwMCcsXG4gICAgICAgICAgICAgJzMwMCcsXG4gICAgICAgICAgICAgJ0ExMDAnLFxuICAgICAgICAgICAgICdBMjAwJyxcbiAgICAgICAgICAgICAnQTQwMCdcbiAgICAgICAgICAgXSxcbiAgICAgICAgICAgJ2NvbnRyYXN0TGlnaHRDb2xvcnMnOiBbXG4gICAgICAgICAgICAgJzQwMCcsXG4gICAgICAgICAgICAgJzUwMCcsXG4gICAgICAgICAgICAgJzYwMCcsXG4gICAgICAgICAgICAgJzcwMCcsXG4gICAgICAgICAgICAgJzgwMCcsXG4gICAgICAgICAgICAgJzkwMCcsXG4gICAgICAgICAgICAgJ0E3MDAnXG4gICAgICAgICAgIF1cbiAgICAgICAgIH0pO1xuICAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLmRlZmluZVBhbGV0dGUoJ2p1c3RpY2FyQmFja2dyb3VuZCcsIHtcbiAgICAgICAgICAgJzUwJzogJ2ZhZmFmYycsXG4gICAgICAgICAgICcxMDAnOiAnZjRmMmY4JyxcbiAgICAgICAgICAgJzIwMCc6ICdlY2U5ZjQnLFxuICAgICAgICAgICAnMzAwJzogJ2U0ZTBmMCcsXG4gICAgICAgICAgICc0MDAnOiAnZGZkOWVjJyxcbiAgICAgICAgICAgJzUwMCc6ICdkOWQyZTknLFxuICAgICAgICAgICAnNjAwJzogJ2Q1Y2RlNicsXG4gICAgICAgICAgICc3MDAnOiAnY2ZjN2UzJyxcbiAgICAgICAgICAgJzgwMCc6ICdjYWMxZGYnLFxuICAgICAgICAgICAnOTAwJzogJ2MwYjZkOScsXG4gICAgICAgICAgICdBMTAwJzogJ2ZmZmZmZicsXG4gICAgICAgICAgICdBMjAwJzogJ2ZmZmZmZicsXG4gICAgICAgICAgICdBNDAwJzogJ2ZmZmZmZicsXG4gICAgICAgICAgICdBNzAwJzogJ2ZmZmZmZicsXG4gICAgICAgICAgICdjb250cmFzdERlZmF1bHRDb2xvcic6ICdkYXJrJyxcbiAgICAgICAgICAgJ2NvbnRyYXN0RGFya0NvbG9ycyc6IFtcbiAgICAgICAgICAgICAnNTAnLFxuICAgICAgICAgICAgICcxMDAnLFxuICAgICAgICAgICAgICcyMDAnLFxuICAgICAgICAgICAgICczMDAnLFxuICAgICAgICAgICAgICc0MDAnLFxuICAgICAgICAgICAgICc1MDAnLFxuICAgICAgICAgICAgICc2MDAnLFxuICAgICAgICAgICAgICc3MDAnLFxuICAgICAgICAgICAgICc4MDAnLFxuICAgICAgICAgICAgICc5MDAnLFxuICAgICAgICAgICAgICdBMTAwJyxcbiAgICAgICAgICAgICAnQTIwMCcsXG4gICAgICAgICAgICAgJ0E0MDAnLFxuICAgICAgICAgICAgICdBNzAwJ1xuICAgICAgICAgICBdLFxuICAgICAgICAgICAnY29udHJhc3RMaWdodENvbG9ycyc6IFtdXG4gICAgICAgICB9KTtcblxuICAgICAgICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ2p1c3RpY2FyJylcbiAgICAgICAgICAgIC5wcmltYXJ5UGFsZXR0ZSgnanVzdGljYXJQcmltYXJ5JylcbiAgICAgICAgICAgIC5hY2NlbnRQYWxldHRlKCdqdXN0aWNhckFjY2VudCcpXG4gICAgICAgICAgICAud2FyblBhbGV0dGUoJ2p1c3RpY2FyV2FybicpXG4gICAgICAgICAgICAuYmFja2dyb3VuZFBhbGV0dGUoJ2p1c3RpY2FyQmFja2dyb3VuZCcpO1xuXG4gICAgICAgIC8vIHNldHRpbmcgaXQgYXMgZGVmYXVsdCB0aGVtZVxuICAgICAgICAkbWRUaGVtaW5nUHJvdmlkZXIuc2V0RGVmYXVsdFRoZW1lKCdqdXN0aWNhcicpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXR0aW5nIHVwIHN0YXRlIG1hY2hpbmVcbiAgICAgICAgICovXG4gICAgICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoXCIvc3RhcnRcIik7XG5cblxuICAgIH1cbl0pLnJ1bihbXG4gICAgJyRyb290U2NvcGUnLFxuICAgICckbG9nJyxcbiAgICAnJHRyYW5zaXRpb25zJyxcbiAgICAnSnVzdGljYXJBUEknLFxuICAgIGZ1bmN0aW9uKCRyb290U2NvcGUsICRsb2csICR0cmFuc2l0aW9ucywgSnVzdGljYXJBUEkpIHtcblxuICAgIH1cbl0pO1xuXG5hbmd1bGFyLm1vZHVsZShcIkp1c3RpY2FyLldlYkNsaWVudFwiKS5jb250cm9sbGVyKFwiTWFpbkN0cmxcIiwgWyckc2NvcGUnLCAnJGxvZycsICckbWRTaWRlbmF2JywgJ0p1c3RpY2FyQXV0aCcsXG4gIGZ1bmN0aW9uKCRzY29wZSwgJGxvZywgJG1kU2lkZW5hdiwgSnVzdGljYXJBdXRoKSB7XG4gICAgLyoqXG4gICAgICogVG9nZ2xlIHNpZGVuYXYgb24gYnV0dG9uIGNsaWNrXG4gICAgICovXG4gICAgJHNjb3BlLnRvZ2dsZVNpZGVuYXYgPSBmdW5jdGlvbigpIHtcbiAgICAgICRtZFNpZGVuYXYoXCJzaWRlbmF2XCIpLnRvZ2dsZSgpO1xuICAgIH07XG5cbiAgICBKdXN0aWNhckF1dGguaW5pdCgpO1xuICB9XG5dKTtcbiIsIi8qKlxuICogQG5hbWVzcGFjZSBKdXN0aWNhci5XZWJDbGllbnQuQVBJXG4gKiBzZXRzIHVwIHRoZSBBUEkgY29uZmlndXJhdGlvblxuICovXG5sZXQgbW9kdWxlQVBJID0gYW5ndWxhci5tb2R1bGUoXCJKdXN0aWNhci5XZWJDbGllbnQuQVBJXCIsIFsnbmdSZXNvdXJjZSddKTtcblxuLyoqXG4gKiBTdG9yZXMgYmFzZSBVUkwgZm9yIGFwaVxuICovXG5tb2R1bGVBUEkuY29uc3RhbnQoXCJBUElfVVJMXCIsIFwiaHR0cDovLzEyNy4wLjAuMTozMDAwL2FwaVwiKTtcblxubW9kdWxlQVBJLnNlcnZpY2UoXCJKdXN0aWNhckFQSVwiLCBbJyRodHRwJywgJyRyZXNvdXJjZScsICckbG9nJywgJyRxJywgJ0FQSV9VUkwnLFxuICBmdW5jdGlvbigkaHR0cCwgJHJlc291cmNlLCAkbG9nLCAkcSwgQVBJX1VSTCkge1xuICAgICAgbGV0IEp1c3RpY2FyQVBJID0ge307XG5cbiAgICAgIC8qKlxuICAgICAgICogQXV0aCBmdW5jdGlvbnMgdXNlZCBmb3IgYXV0aCBhbmQgdXNlciBtYW5hZ2VtZW50XG4gICAgICAgKi9cbiAgICAgIEp1c3RpY2FyQVBJLmF1dGggPSB7fTtcblxuICAgICAgSnVzdGljYXJBUEkuYXV0aC5sb2dpbiA9IGZ1bmN0aW9uKGVtYWlsLCBwYXNzd29yZCkge1xuICAgICAgICByZXR1cm4gJGh0dHAucG9zdChBUElfVVJMICsgXCIvdXNlci9sb2dpblwiLCB7XG4gICAgICAgICAgdXNlcjoge1xuICAgICAgICAgICAgZW1haWw6IGVtYWlsLFxuICAgICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIEp1c3RpY2FyQVBJLmF1dGgubG9nb3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAkaHR0cC5wb3N0KEFQSV9VUkwgKyBcIi91c2VyL2xvZ291dFwiKTtcbiAgICAgIH07XG5cbiAgICAgIEp1c3RpY2FyQVBJLmF1dGguY3VycmVudCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KEFQSV9VUkwgKyBcIi91c2VyL2N1cnJlbnRcIik7XG4gICAgICB9O1xuXG4gICAgICBKdXN0aWNhckFQSS5hdXRoLnJlZ2lzdGVyID0gZnVuY3Rpb24oZW1haWwsIHBhc3N3b3JkKSB7XG4gICAgICAgIHJldHVybiAkaHR0cC5wb3N0KEFQSV9VUkwgKyBcIi91c2VyL3JlZ2lzdGVyXCIsIHtcbiAgICAgICAgICB1c2VyOiB7XG4gICAgICAgICAgICBlbWFpbDogZW1haWwsXG4gICAgICAgICAgICBwYXNzd29yZDogcGFzc3dvcmRcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIEp1c3RpY2FyQVBJO1xuICB9XG5dKTtcbiIsIi8qKlxuICogQG5hbWVzcGFjZSBKdXN0aWNhci5XZWJDbGllbnQuQXV0aFxuICogaGFuZGxlcyBsb2dpbiBhbmQgY2hlY2tpbmcgcGVybWlzc2lvbnNcbiAqL1xubGV0IG1vZHVsZUF1dGggPSBhbmd1bGFyLm1vZHVsZShcIkp1c3RpY2FyLldlYkNsaWVudC5BdXRoXCIsIFsnbmdSZXNvdXJjZScsICdKdXN0aWNhci5XZWJDbGllbnQuQVBJJ10pO1xuXG4vKipcbiAqXG4gKi9cblxubW9kdWxlQXV0aC5zZXJ2aWNlKFwiSnVzdGljYXJBdXRoXCIsIFsnJGh0dHAnLCAnJHJlc291cmNlJywgJyRsb2cnLCAnJHEnLCAnJG1kUGFuZWwnLCAnSnVzdGljYXJBUEknLFxuICBmdW5jdGlvbigkaHR0cCwgJHJlc291cmNlLCAkbG9nLCAkcSwgJG1kUGFuZWwsIEp1c3RpY2FyQVBJKSB7XG4gICAgICBsZXQgSnVzdGljYXJBdXRoID0ge307XG5cbiAgICAgIEp1c3RpY2FyQXV0aC5jdXJyZW50VXNlciA9IG51bGw7XG5cbiAgICAgIC8qKlxuICAgICAgICogTG9naW4gdG8gc3lzdGVtXG4gICAgICAgKi9cbiAgICAgIEp1c3RpY2FyQXV0aC5pbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIEp1c3RpY2FyQVBJLmF1dGguY3VycmVudCgpLnRoZW4oXG4gICAgICAgICAgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIEp1c3RpY2FyQXV0aC5jdXJyZW50VXNlciA9IHJlc3BvbnNlLmRhdGEudXNlcjtcblxuICAgICAgICAgIH1cbiAgICAgICAgKS5jYXRjaChcbiAgICAgICAgICBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIEp1c3RpY2FyQXV0aC5jdXJyZW50VXNlciA9IG51bGw7XG4gICAgICAgICAgICBKdXN0aWNhckF1dGgub3BlbkxvZ2luUGFuZWwoKTtcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICB9O1xuXG4gICAgICAvKipcbiAgICAgICAqIExvZ2luIHRvIHN5c3RlbVxuICAgICAgICovXG4gICAgICBKdXN0aWNhckF1dGgubG9naW4gPSBmdW5jdGlvbihlbWFpbCwgcGFzc3dvcmQpIHtcbiAgICAgICAgSnVzdGljYXJBUEkuYXV0aC5sb2dpbihlbWFpbCwgcGFzc3dvcmQpLnRoZW4oXG4gICAgICAgICAgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIEp1c3RpY2FyQXV0aC5jdXJyZW50VXNlciA9IHJlc3BvbnNlLmRhdGEudXNlcjtcbiAgICAgICAgICB9XG4gICAgICAgICkuY2F0Y2goXG4gICAgICAgICAgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAvLyBAVE9ETyBiZXR0ZXIgaGFuZGxpbmcgb2YgcmVzdWx0cywgZmFpbGVkIGxvZ2luLCBldGMuXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICB9O1xuXG4gICAgICAvKipcbiAgICAgICAqIExvZ291dCBvZiBzeXN0ZW1cbiAgICAgICAqL1xuICAgICAgSnVzdGljYXJBdXRoLmxvZ291dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBKdXN0aWNhckFQSS5hdXRoLmxvZ291dCgpLnRoZW4oXG4gICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBKdXN0aWNhckF1dGguY3VycmVudFVzZXIgPSBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgKS5jYXRjaChcbiAgICAgICAgICBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIC8vIEBUT0RPIGJldHRlciBoYW5kbGluZyBvZiByZXN1bHRzLCBmYWlsZWQgbG9naW4sIGV0Yy5cbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnIpO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH07XG5cbiAgICAgIC8qKlxuICAgICAgICogUmVnaXN0ZXIgbmV3IHVzZXJcbiAgICAgICAqL1xuICAgICAgSnVzdGljYXJBdXRoLnJlZ2lzdGVyID0gZnVuY3Rpb24oZW1haWwsIHBhc3N3b3JkKSB7XG4gICAgICAgIEp1c3RpY2FyQVBJLmF1dGgucmVnaXN0ZXIoZW1haWwsIHBhc3N3b3JkKS50aGVuKFxuICAgICAgICAgIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBKdXN0aWNhckF1dGguY3VycmVudFVzZXIgPSByZXNwb25zZS5kYXRhLnVzZXI7IC8vIHRoaXMgaXMgbGlrZWx5IHdyb25nXG4gICAgICAgICAgfVxuICAgICAgICApLmNhdGNoKFxuICAgICAgICAgIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgLy8gQFRPRE8gYmV0dGVyIGhhbmRsaW5nIG9mIHJlc3VsdHMsIGZhaWxlZCBsb2dpbiwgZXRjLlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycik7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfTtcblxuICAgICAgLyoqXG4gICAgICAgKiBPcGVuIG1vZGFsIHBhbmVsIGZvciBsb2dnaW5nIGluc3BlY3RcbiAgICAgICAqL1xuICAgICAgSnVzdGljYXJBdXRoLm9wZW5Mb2dpblBhbmVsID0gZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG5cbiAgICAgICAgbGV0IHBhbmVsUG9zaXRpb24gPSAkbWRQYW5lbC5uZXdQYW5lbFBvc2l0aW9uKClcbiAgICAgICAgICAuYWJzb2x1dGUoKVxuICAgICAgICAgIC5jZW50ZXIoKTtcblxuICAgICAgICBsZXQgcGFuZWxBbmltYXRpb24gPSAkbWRQYW5lbC5uZXdQYW5lbEFuaW1hdGlvbigpXG4gICAgICAgICAgLm9wZW5Gcm9tKHsgdG9wOiAxLCByaWdodDowIH0pXG4gICAgICAgICAgLmR1cmF0aW9uKDIwMClcbiAgICAgICAgICAuY2xvc2VUbyh7IHRvcDogMSwgcmlnaHQ6MCB9KVxuICAgICAgICAgIC53aXRoQW5pbWF0aW9uKCRtZFBhbmVsLmFuaW1hdGlvbi5TQ0FMRSk7XG5cbiAgICAgICAgbGV0IHBhbmVsQ29uZmlnID0ge1xuICAgICAgICAgIGF0dGFjaFRvOiBhbmd1bGFyLmVsZW1lbnQoZG9jdW1lbnQuYm9keSksXG4gICAgICAgICAgY29udHJvbGxlcjogJ0xvZ2luQ3RybCcsXG4gICAgICAgICAgZGlzYWJsZVBhcmVudFNjcm9sbDogdHJ1ZSxcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9wYXJ0aWFscy9wYW5lbHMvbG9naW4nLFxuICAgICAgICAgIHBhbmVsQ2xhc3M6IFwianVzdGljYXItcGFuZWxcIixcbiAgICAgICAgICB6SW5kZXg6IDE1MCxcbiAgICAgICAgICBsb2NhbHM6IHtcbiAgICAgICAgICAgIGRlZmVycmVkOiBkZWZlcnJlZFxuICAgICAgICAgIH0sXG4gICAgICAgICAgdHJhcEZvY3VzOiB0cnVlLFxuICAgICAgICAgIGNsaWNrT3V0c2lkZVRvQ2xvc2U6IHRydWUsXG4gICAgICAgICAgY2xpY2tFc2NhcGVUb0Nsb3NlOiB0cnVlLFxuICAgICAgICAgIGhhc0JhY2tkcm9wOiB0cnVlLFxuICAgICAgICAgIHBvc2l0aW9uOiBwYW5lbFBvc2l0aW9uLFxuICAgICAgICAgIGFuaW1hdGlvbjogcGFuZWxBbmltYXRpb25cbiAgICAgICAgfTtcblxuICAgICAgICAkbWRQYW5lbC5vcGVuKHBhbmVsQ29uZmlnKTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgIH07XG5cbiAgICAgIC8qKlxuICAgICAgICogT3BlbiByZWdpc3RyYXRpb24gcGFuZWxcbiAgICAgICAqL1xuICAgICAgSnVzdGljYXJBdXRoLm9wZW5SZWdpc3RlclBhbmVsID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG5cbiAgICAgICAgbGV0IHBhbmVsUG9zaXRpb24gPSAkbWRQYW5lbC5uZXdQYW5lbFBvc2l0aW9uKClcbiAgICAgICAgICAuYWJzb2x1dGUoKVxuICAgICAgICAgIC5jZW50ZXIoKTtcblxuICAgICAgICBsZXQgcGFuZWxBbmltYXRpb24gPSAkbWRQYW5lbC5uZXdQYW5lbEFuaW1hdGlvbigpXG4gICAgICAgICAgLm9wZW5Gcm9tKHt0b3A6IDEsIGxlZnQ6IDF9KVxuICAgICAgICAgIC5kdXJhdGlvbigyMDApXG4gICAgICAgICAgLmNsb3NlVG8oe3RvcDogMSwgbGVmdDogMX0pXG4gICAgICAgICAgLndpdGhBbmltYXRpb24oJG1kUGFuZWwuYW5pbWF0aW9uLlNDQUxFKTtcblxuICAgICAgICBsZXQgcGFuZWxDb25maWcgPSB7XG4gICAgICAgICAgYXR0YWNoVG86IGFuZ3VsYXIuZWxlbWVudChkb2N1bWVudC5ib2R5KSxcbiAgICAgICAgICBjb250cm9sbGVyOiAnUmVnaXN0ZXJDdHJsJyxcbiAgICAgICAgICBkaXNhYmxlUGFyZW50U2Nyb2xsOiB0cnVlLFxuICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL3BhcnRpYWxzL3BhbmVscy9yZWdpc3RlcicsXG4gICAgICAgICAgcGFuZWxDbGFzczogXCJqdXN0aWNhci1wYW5lbFwiLFxuICAgICAgICAgIHpJbmRleDogMTc1LFxuICAgICAgICAgIGxvY2Fsczoge1xuICAgICAgICAgICAgZGVmZXJyZWQ6IGRlZmVycmVkXG4gICAgICAgICAgfSxcbiAgICAgICAgICB0cmFwRm9jdXM6IHRydWUsXG4gICAgICAgICAgY2xpY2tPdXRzaWRlVG9DbG9zZTogdHJ1ZSxcbiAgICAgICAgICBjbGlja0VzY2FwZVRvQ2xvc2U6IHRydWUsXG4gICAgICAgICAgaGFzQmFja2Ryb3A6IHRydWUsXG4gICAgICAgICAgcG9zaXRpb246IHBhbmVsUG9zaXRpb24sXG4gICAgICAgICAgYW5pbWF0aW9uOiBwYW5lbEFuaW1hdGlvblxuICAgICAgICB9O1xuXG4gICAgICAgICRtZFBhbmVsLm9wZW4ocGFuZWxDb25maWcpO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgfTtcblxuICAgICAgLyoqXG4gICAgICAgKiBDaGVjayBwZXJtaXNzaW9ucyBiYXNlZCBvbiBhIHN0cmluZ1xuICAgICAgICovXG4gICAgICBKdXN0aWNhckF1dGguY2hlY2tQZXJtaXNzaW9ucyA9IGZ1bmN0aW9uKHBlcm1pc3Npb24pIHtcbiAgICAgICAgLy8gQFRPRE9cbiAgICAgIH07XG5cblxuICAgICAgcmV0dXJuIEp1c3RpY2FyQXV0aDtcbiAgfVxuXSk7XG5cbm1vZHVsZUF1dGguY29udHJvbGxlcignTG9naW5DdHJsJywgWydtZFBhbmVsUmVmJywgJyRzY29wZScsICckbG9nJywgJ0p1c3RpY2FyQVBJJywgJ0p1c3RpY2FyQXV0aCcsXG4gIGZ1bmN0aW9uKG1kUGFuZWxSZWYsICRzY29wZSwgJGxvZywgSnVzdGljYXJBUEksIEp1c3RpY2FyQXV0aCkge1xuICAgICRzY29wZS53YWl0aW5nID0gZmFsc2U7XG4gICAgJHNjb3BlLmVycm9yTXNzZyA9IFwiXCI7XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGNsaWNraW5nIGxvZ2luIGJ1dHRvbiwgdXNpbmcgJHNjb3BlLnVzZXJFbWFpbCAmICRzY29wZS51c2VyUGFzc3dvcmRcbiAgICAgKi9cbiAgICAkc2NvcGUub25DbGlja0xvZ2luID0gZnVuY3Rpb24oKSB7XG4gICAgICAvLyBsb2dpbiBhbmQgY2xvc2UgaWYgc3VjY2Vzc2Z1bFxuICAgICAgJHNjb3BlLndhaXRpbmcgPSB0cnVlO1xuXG4gICAgICBKdXN0aWNhckFQSS5hdXRoLmxvZ2luKCRzY29wZS51c2VyRW1haWwsICRzY29wZS51c2VyUGFzc3dvcmQpLnRoZW4oXG4gICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICRzY29wZS53YWl0aW5nID0gZmFsc2U7XG4gICAgICAgICAgbWRQYW5lbFJlZi5jbG9zZSgpO1xuICAgICAgICB9XG4gICAgICApLmNhdGNoKFxuICAgICAgICBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAkbG9nLmVycm9yKGVycik7XG4gICAgICAgICAgJHNjb3BlLmVycm9yTXNzZyA9IFwiRXJyb3IgbG9nZ2luZyBpbi5cIjtcbiAgICAgICAgICAkc2NvcGUud2FpdGluZyA9IGZhbHNlO1xuICAgICAgICAgIC8vIEBUT0RPIGJldHRlciBtZXNzYWdpbmdcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogSGFuZGxlIGNsaWNraW5nIHJlZ2lzdGVyIGJ1dHRvblxuICAgICAqL1xuICAgICRzY29wZS5vbkNsaWNrUmVnaXN0ZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgIEp1c3RpY2FyQXV0aC5vcGVuUmVnaXN0ZXJQYW5lbCgpO1xuICAgICAgbWRQYW5lbFJlZi5jbG9zZSgpO1xuICAgIH07XG5cbiAgICAkc2NvcGUub25DbGlja0Nsb3NlID0gZnVuY3Rpb24oKSB7XG4gICAgICBtZFBhbmVsUmVmLmNsb3NlKCk7XG4gICAgfTtcbiAgfVxuXSk7XG5cblxubW9kdWxlQXV0aC5jb250cm9sbGVyKCdSZWdpc3RlckN0cmwnLCBbJ21kUGFuZWxSZWYnLCAnJHNjb3BlJywgJyRsb2cnLCAnSnVzdGljYXJBUEknLCAnSnVzdGljYXJBdXRoJyxcbiAgZnVuY3Rpb24obWRQYW5lbFJlZiwgJHNjb3BlLCAkbG9nLCBKdXN0aWNhckFQSSwgSnVzdGljYXJBdXRoKSB7XG4gICAgJHNjb3BlLndhaXRpbmcgPSBmYWxzZTtcbiAgICAkc2NvcGUuZXJyb3JNc3NnID0gXCJcIjtcbiAgICAvKipcbiAgICAgKiBIYW5kbGUgY2xpY2tpbmcgcmVnaXN0ZXIgYnV0dG9uXG4gICAgICovXG4gICAgJHNjb3BlLm9uQ2xpY2tSZWdpc3RlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgLy8gbG9naW4gYW5kIGNsb3NlIGlmIHN1Y2Nlc3NmdWxcbiAgICAgICRzY29wZS53YWl0aW5nID0gdHJ1ZTtcblxuICAgICAgSnVzdGljYXJBUEkuYXV0aC5yZWdpc3Rlcigkc2NvcGUudXNlckVtYWlsLCAkc2NvcGUudXNlclBhc3N3b3JkKS50aGVuKFxuICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAkc2NvcGUud2FpdGluZyA9IGZhbHNlO1xuICAgICAgICAgIG1kUGFuZWxSZWYuY2xvc2UoKTtcbiAgICAgICAgfVxuICAgICAgKS5jYXRjaChcbiAgICAgICAgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgJGxvZy5lcnJvcihlcnIpO1xuICAgICAgICAgICRzY29wZS5lcnJvck1zc2cgPSBcIkVycm9yIHJlZ2lzdGVyaW5nLlwiO1xuICAgICAgICAgICRzY29wZS53YWl0aW5nID0gZmFsc2U7XG4gICAgICAgICAgLy8gQFRPRE8gYmV0dGVyIG1lc3NhZ2luZ1xuICAgICAgICB9XG4gICAgICApO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgY2xpY2tpbmcgbG9naW4gYnV0dG9uXG4gICAgICovXG4gICAgJHNjb3BlLm9uQ2xpY2tMb2dpbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgSnVzdGljYXJBdXRoLm9wZW5Mb2dpblBhbmVsKCk7XG4gICAgICBtZFBhbmVsUmVmLmNsb3NlKCk7XG4gICAgfTtcblxuICAgICRzY29wZS5vbkNsaWNrQ2xvc2UgPSBmdW5jdGlvbigpIHtcbiAgICAgIG1kUGFuZWxSZWYuY2xvc2UoKTtcbiAgICB9O1xuICB9XG5dKTtcbiIsIi8qKlxuICogQG5hbWVzcGFjZSBKdXN0aWNhci5XZWJDbGllbnQuU3RhdGVzLkFkbWluXG4gKiBTdG9yZXMgYWxsIHRoZSBzdGF0ZXMgZm9yIHRoZSBBbmd1bGFyIFVJIHJvdXRlciBzdGF0ZSBtYWNoaW5lIGFuZCBhc3NvY2lhdGVzIGNvbnRyb2xsZXJzXG4gKi9cbmxldCBzdGF0ZUFkbWluID0gYW5ndWxhci5tb2R1bGUoXCJKdXN0aWNhci5XZWJDbGllbnQuU3RhdGVzLkFkbWluXCIsIFtcbiAgJ3VpLnJvdXRlcidcbl0pO1xuXG4vKipcbiAqIFN0YXRlIG5hbWUgZm9yIHRoaXMgc3RhdGVcbiAqL1xuc3RhdGVBZG1pbi5jb25zdGFudChcIkFETUlOX1NUQVRFXCIsIFwiYWRtaW5cIik7XG5cbi8qKlxuICogU3ViLVVSTCBmb3IgdGhpcyBzdGF0ZVxuICovXG5zdGF0ZUFkbWluLmNvbnN0YW50KFwiQURNSU5fU1RBVEVfVVJMXCIsIFwiL2FkbWluXCIpO1xuXG4vKipcbiAqIENvbmZpZyBhY3Rpb24gdGhhdCBzZXRzIHVwIHRoaXMgbW9kdWxlXG4gKi9cbnN0YXRlQWRtaW4uY29uZmlnKFtcbiAgJyRzdGF0ZVByb3ZpZGVyJyxcbiAgJ0FETUlOX1NUQVRFJyxcbiAgJ0FETUlOX1NUQVRFX1VSTCcsXG4gIGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCBBRE1JTl9TVEFURSwgQURNSU5fU1RBVEVfVVJMKSB7XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdXAgc3RhdGUgaW4gYXBwbGljYXRpb24gc3RhdGUgbWFjaGluZS5cbiAgICAgKi9cbiAgICAkc3RhdGVQcm92aWRlclxuICAgICAgLnN0YXRlKEFETUlOX1NUQVRFLCB7XG4gICAgICAgIHVybDogQURNSU5fU1RBVEVfVVJMLFxuICAgICAgICBwYXJhbXM6IHt9LFxuICAgICAgICBhYnN0cmFjdDogdHJ1ZVxuICAgICAgfSlcbiAgICA7XG4gIH1cbl0pO1xuIiwicmVxdWlyZShcIi4vbGFuZGluZy9pbmRleC5qc1wiKTtcbnJlcXVpcmUoXCIuL3BsYXllci9pbmRleC5qc1wiKTtcbnJlcXVpcmUoXCIuL2FkbWluL2luZGV4LmpzXCIpO1xuXG4vKipcbiAqIEBuYW1lc3BhY2UgSnVzdGljYXIuV2ViQ2xpZW50LlN0YXRlc1xuICogU3RvcmVzIGFsbCB0aGUgc3RhdGVzIGZvciB0aGUgQW5ndWxhciBVSSByb3V0ZXIgc3RhdGUgbWFjaGluZSBhbmQgYXNzb2NpYXRlcyBjb250cm9sbGVyc1xuICovXG5hbmd1bGFyLm1vZHVsZShcIkp1c3RpY2FyLldlYkNsaWVudC5TdGF0ZXNcIiwgW1xuICAnSnVzdGljYXIuV2ViQ2xpZW50LlN0YXRlcy5MYW5kaW5nJyxcbiAgJ0p1c3RpY2FyLldlYkNsaWVudC5TdGF0ZXMuUGxheWVyJyxcbiAgJ0p1c3RpY2FyLldlYkNsaWVudC5TdGF0ZXMuQWRtaW4nLFxuXSk7XG4iLCIvKipcbiAqIEBuYW1lc3BhY2UgSnVzdGljYXIuV2ViQ2xpZW50LlN0YXRlcy5MYW5kaW5nXG4gKiBTdG9yZXMgYWxsIHRoZSBzdGF0ZXMgZm9yIHRoZSBBbmd1bGFyIFVJIHJvdXRlciBzdGF0ZSBtYWNoaW5lIGFuZCBhc3NvY2lhdGVzIGNvbnRyb2xsZXJzXG4gKi9cbmxldCBzdGF0ZUxhbmRpbmcgPSBhbmd1bGFyLm1vZHVsZShcIkp1c3RpY2FyLldlYkNsaWVudC5TdGF0ZXMuTGFuZGluZ1wiLCBbXG4gICd1aS5yb3V0ZXInXG5dKTtcblxuLyoqXG4gKiBTdGF0ZSBuYW1lIGZvciB0aGlzIHN0YXRlXG4gKi9cbnN0YXRlTGFuZGluZy5jb25zdGFudChcIkxBTkRJTkdfU1RBVEVcIiwgXCJsYW5kaW5nXCIpO1xuXG4vKipcbiAqIFN1Yi1VUkwgZm9yIHRoaXMgc3RhdGVcbiAqL1xuc3RhdGVMYW5kaW5nLmNvbnN0YW50KFwiTEFORElOR19TVEFURV9VUkxcIiwgXCIvc3RhcnRcIik7XG5cbi8qKlxuICogTG9jYXRpb24gdG8gbG9hZCB2aWV3IGZyb21cbiAqL1xuc3RhdGVMYW5kaW5nLmNvbnN0YW50KFwiTEFORElOR19URU1QTEFURV9VUkxcIiwgXCIvcGFydGlhbHMvc3RhdGVzL2xhbmRpbmdcIik7XG5cbi8qKlxuICogQ29uZmlnIGFjdGlvbiB0aGF0IHNldHMgdXAgdGhpcyBtb2R1bGVcbiAqL1xuc3RhdGVMYW5kaW5nLmNvbmZpZyhbXG4gICckc3RhdGVQcm92aWRlcicsXG4gICdMQU5ESU5HX1NUQVRFJyxcbiAgJ0xBTkRJTkdfU1RBVEVfVVJMJyxcbiAgJ0xBTkRJTkdfVEVNUExBVEVfVVJMJyxcbiAgZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsIExBTkRJTkdfU1RBVEUsIExBTkRJTkdfU1RBVEVfVVJMLCBMQU5ESU5HX1RFTVBMQVRFX1VSTCkge1xuXG4gICAgLyoqXG4gICAgICogU2V0IHVwIHN0YXRlIGluIGFwcGxpY2F0aW9uIHN0YXRlIG1hY2hpbmUuXG4gICAgICovXG4gICAgJHN0YXRlUHJvdmlkZXJcbiAgICAgIC5zdGF0ZShMQU5ESU5HX1NUQVRFLCB7XG4gICAgICAgIHVybDogTEFORElOR19TVEFURV9VUkwsXG4gICAgICAgIHBhcmFtczoge30sXG4gICAgICAgIGNvbnRyb2xsZXI6IFwiU3RhdGVMYW5kaW5nQ3RybFwiLFxuICAgICAgICB0ZW1wbGF0ZVVybDogTEFORElOR19URU1QTEFURV9VUkxcbiAgICAgIH0pXG4gICAgO1xuICB9XG5dKTtcblxuLyoqXG4gKiBDb250cm9sbGVyIGZvciBzdGF0ZVxuICovXG5zdGF0ZUxhbmRpbmcuY29udHJvbGxlcihcIlN0YXRlTGFuZGluZ0N0cmxcIiwgW1xuICBmdW5jdGlvbigpIHtcblxuICB9XG5dKTtcbiIsIi8qKlxuICogQG5hbWVzcGFjZSBKdXN0aWNhci5XZWJDbGllbnQuU3RhdGVzLlBsYXllclxuICogU3RvcmVzIGFsbCB0aGUgc3RhdGVzIGZvciB0aGUgQW5ndWxhciBVSSByb3V0ZXIgc3RhdGUgbWFjaGluZSBhbmQgYXNzb2NpYXRlcyBjb250cm9sbGVyc1xuICovXG5sZXQgc3RhdGVQbGF5ZXIgPSBhbmd1bGFyLm1vZHVsZShcIkp1c3RpY2FyLldlYkNsaWVudC5TdGF0ZXMuUGxheWVyXCIsIFtcbiAgJ3VpLnJvdXRlcidcbl0pO1xuXG4vKipcbiAqIFN0YXRlIG5hbWUgZm9yIHRoaXMgc3RhdGVcbiAqL1xuc3RhdGVQbGF5ZXIuY29uc3RhbnQoXCJQTEFZRVJfU1RBVEVcIiwgXCJwbGF5ZXJcIik7XG5cbi8qKlxuICogU3ViLVVSTCBmb3IgdGhpcyBzdGF0ZVxuICovXG5zdGF0ZVBsYXllci5jb25zdGFudChcIlBMQVlFUl9TVEFURV9VUkxcIiwgXCIvcGxheWVyXCIpO1xuXG4vKipcbiAqIENvbmZpZyBhY3Rpb24gdGhhdCBzZXRzIHVwIHRoaXMgbW9kdWxlXG4gKi9cbnN0YXRlUGxheWVyLmNvbmZpZyhbXG4gICckc3RhdGVQcm92aWRlcicsXG4gICdQTEFZRVJfU1RBVEUnLFxuICAnUExBWUVSX1NUQVRFX1VSTCcsXG4gIGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCBQTEFZRVJfU1RBVEUsIFBMQVlFUl9TVEFURV9VUkwpIHtcblxuICAgIC8qKlxuICAgICAqIFNldCB1cCBzdGF0ZSBpbiBhcHBsaWNhdGlvbiBzdGF0ZSBtYWNoaW5lLlxuICAgICAqL1xuICAgICRzdGF0ZVByb3ZpZGVyXG4gICAgICAuc3RhdGUoUExBWUVSX1NUQVRFLCB7XG4gICAgICAgIHVybDogUExBWUVSX1NUQVRFX1VSTCxcbiAgICAgICAgcGFyYW1zOiB7fSxcbiAgICAgICAgYWJzdHJhY3Q6IHRydWVcbiAgICAgIH0pXG4gICAgO1xuICB9XG5dKTtcbiJdfQ==
