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

angular.module("Justicar.WebClient").controller("MainCtrl", ['$scope', '$log', '$mdSidenav', function ($scope, $log, $mdSidenav) {
  /**
   * Toggle sidenav on button click
   */
  $scope.toggleSidenav = function () {
    $mdSidenav("sidenav").toggle();
  };
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
moduleAPI.constant("API_URL", "http://127.0.0.1/api");

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
  JusticarAuth.login = function (email, password) {
    JusticarAPI.auth.login(email, password).then(function (response) {
      JusticarAuth.currentUser = response.data.user; // this is likely wrong
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
      JusticarAuth.currentUser = null; // this is likely wrong
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

    var panelPosition = $mdPanel.newPanelPosition().absolute().top('50%').left('50%');

    var panelAnimation = $mdPanel.newPanelAnimation().openFrom($event).duration(200).closeTo('.justicar-login').withAnimation($mdPanel.animation.SCALE);

    var panelConfig = {
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

    var panelAnimation = $mdPanel.newPanelAnimation().openFrom($event).duration(200).closeTo('.justicar-login').withAnimation($mdPanel.animation.SCALE);

    var panelConfig = {
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
    };

    $mdPanel.open(panelConfig);

    return deferred.promise;
  };

  /**
   * Check permissions based on a string
   */
  JusticarAuth.checkPermissions = function (permission) {};

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
 * Location to load view from
 */
stateAdmin.constant("ADMIN_TEMPLATE_URL", "/states/admin");

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
stateLanding.constant("LANDING_TEMPLATE_URL", "/states/landing");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvY2xpZW50LmpzIiwiY2xpZW50L21vZHVsZXMvYXBpL2luZGV4LmpzIiwiY2xpZW50L21vZHVsZXMvYXV0aC9pbmRleC5qcyIsImNsaWVudC9zdGF0ZXMvYWRtaW4vaW5kZXguanMiLCJjbGllbnQvc3RhdGVzL2luZGV4LmpzIiwiY2xpZW50L3N0YXRlcy9sYW5kaW5nL2luZGV4LmpzIiwiY2xpZW50L3N0YXRlcy9wbGF5ZXIvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7O0FBR0E7O0FBRUE7O0FBQ0EsUUFBUSx3QkFBUjtBQUNBLFFBQVEseUJBQVI7O0FBRUE7O0FBRUE7QUFDQSxRQUFRLG1CQUFSOztBQUVBOzs7QUFHQSxRQUFRLE1BQVIsQ0FBZSxvQkFBZixFQUFxQztBQUNqQztBQUNBLFlBRmlDLEVBRW5CO0FBQ2QsWUFIaUMsRUFHbkI7QUFDZCxZQUppQyxFQUluQjtBQUNkLFdBTGlDLEVBS3BCO0FBQ2IsZUFOaUMsRUFPakMsZ0JBUGlDLEVBUWpDLG9CQVJpQyxFQVFYO0FBQ3RCLFdBVGlDOztBQVdqQztBQUNBLHdCQVppQyxFQWFqQyx5QkFiaUMsRUFjakMsMkJBZGlDLENBQXJDLEVBZUcsTUFmSCxDQWVVLENBQ04sbUJBRE0sRUFFTixvQkFGTSxFQUdOLG9CQUhNLEVBSU4sVUFBUyxpQkFBVCxFQUE0QixrQkFBNUIsRUFBZ0Qsa0JBQWhELEVBQW9FO0FBQ2hFOzs7QUFHQSxvQkFBa0IsVUFBbEIsQ0FBNkIsRUFBN0I7QUFDQSxvQkFBa0IsU0FBbEIsQ0FBNEIsS0FBNUI7O0FBRUE7Ozs7QUFJQyxxQkFBbUIsYUFBbkIsQ0FBaUMsaUJBQWpDLEVBQW9EO0FBQ2xELFVBQU0sUUFENEM7QUFFbEQsV0FBTyxRQUYyQztBQUdsRCxXQUFPLFFBSDJDO0FBSWxELFdBQU8sUUFKMkM7QUFLbEQsV0FBTyxRQUwyQztBQU1sRCxXQUFPLFFB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LFlBQVksUUFBWixDQUFxQixjQUFyQixFQUFxQyxRQUFyQzs7QUFFQTs7O0FBR0EsWUFBWSxRQUFaLENBQXFCLGtCQUFyQixFQUF5QyxTQUF6Qzs7QUFFQTs7O0FBR0EsWUFBWSxNQUFaLENBQW1CLENBQ2pCLGdCQURpQixFQUVqQixjQUZpQixFQUdqQixrQkFIaUIsRUFJakIsVUFBUyxjQUFULEVBQXlCLFlBQXpCLEVBQXVDLGdCQUF2QyxFQUF5RDs7QUFFdkQ7OztBQUdBLGlCQUNHLEtBREgsQ0FDUyxZQURULEVBQ3VCO0FBQ25CLFNBQUssZ0JBRGM7QUFFbkIsWUFBUSxFQUZXO0FBR25CLGNBQVU7QUFIUyxHQUR2QjtBQU9ELENBaEJnQixDQUFuQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8qKlxuICogQG5hbWVzcGFjZSBKdXN0aWNhci5XZWJDbGllbnRcbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG4vLyBMb2NhbCBBbmd1bGFyIE1vZHVsZXMgT25seS4gUGx1Z2lucyBhbmQgb3RoZXIgbGlicmFyaWVzIGdvIGluIHRoZSBsaWIuanMgZm9sZGVyIHRvIG1ha2UgZm9yIHF1aWNrZXIgY29tcGlsaW5nLlxucmVxdWlyZSgnLi9tb2R1bGVzL2FwaS9pbmRleC5qcycpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2F1dGgvaW5kZXguanMnKTtcblxuLy8gTWl4aW5zXG5cbi8vIExvY2FsIFN0YXRlIE1vZHVsZXNcbnJlcXVpcmUoJy4vc3RhdGVzL2luZGV4LmpzJyk7XG5cbi8vIERlZmluZSBtYWluIG1vZHVsZVxuXG5cbmFuZ3VsYXIubW9kdWxlKCdKdXN0aWNhci5XZWJDbGllbnQnLCBbXG4gICAgLy8gQW5ndWxhciBMaWJyYXJpZXNcbiAgICAnbmdNYXRlcmlhbCcsIC8vIGFuZ3VsYXItbWF0ZXJpYWxcbiAgICAnbmdTYW5pdGl6ZScsIC8vIGFuZ3VsYXItc2FuaXRpemVcbiAgICAnbmdSZXNvdXJjZScsIC8vIGFuZ3VsYXItcmVzb3VyY2VcbiAgICAnbmdBbmltYXRlJywgLy8gYW5ndWxhci1hbmltYXRlXG4gICAgJ2FuZ3VsYXJNb21lbnQnLFxuICAgICdhbmd1bGFyLmZpbHRlcicsXG4gICAgJ0xvY2FsU3RvcmFnZU1vZHVsZScsIC8vIGFuZ3VsYXItbG9jYWwtc3RvcmFnZVxuICAgICd1aS5yb3V0ZXInLFxuXG4gICAgLy8gTG9jYWwgbW9kdWxlc1xuICAgICdKdXN0aWNhci5XZWJDbGllbnQuQVBJJyxcbiAgICAnSnVzdGljYXIuV2ViQ2xpZW50LkF1dGgnLFxuICAgICdKdXN0aWNhci5XZWJDbGllbnQuU3RhdGVzJyxcbl0pLmNvbmZpZyhbXG4gICAgJyRsb2NhdGlvblByb3ZpZGVyJyxcbiAgICAnJG1kVGhlbWluZ1Byb3ZpZGVyJyxcbiAgICAnJHVybFJvdXRlclByb3ZpZGVyJyxcbiAgICBmdW5jdGlvbigkbG9jYXRpb25Qcm92aWRlciwgJG1kVGhlbWluZ1Byb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqICRsb2NhdGlvblByb3ZpZGVyIHNldHRpbmdzXG4gICAgICAgICAqL1xuICAgICAgICAkbG9jYXRpb25Qcm92aWRlci5oYXNoUHJlZml4KCcnKTtcbiAgICAgICAgJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKGZhbHNlKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlbWluZ1xuICAgICAgICAgKi9cblxuICAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLmRlZmluZVBhbGV0dGUoJ2p1c3RpY2FyUHJpbWFyeScsIHtcbiAgICAgICAgICAgJzUwJzogJ2VkZTNlMycsXG4gICAgICAgICAgICcxMDAnOiAnZDNiYWJhJyxcbiAgICAgICAgICAgJzIwMCc6ICdiNjhjOGMnLFxuICAgICAgICAgICAnMzAwJzogJzk5NWU1ZScsXG4gICAgICAgICAgICc0MDAnOiAnODMzYzNjJyxcbiAgICAgICAgICAgJzUwMCc6ICc2ZDE5MTknLFxuICAgICAgICAgICAnNjAwJzogJzY1MTYxNicsXG4gICAgICAgICAgICc3MDAnOiAnNWExMjEyJyxcbiAgICAgICAgICAgJzgwMCc6ICc1MDBlMGUnLFxuICAgICAgICAgICAnOTAwJzogJzNlMDgwOCcsXG4gICAgICAgICAgICdBMTAwJzogJ2ZmNzU3NScsXG4gICAgICAgICAgICdBMjAwJzogJ2ZmNDI0MicsXG4gICAgICAgICAgICdBNDAwJzogJ2I4MGMwYycsXG4gICAgICAgICAgICdBNzAwJzogJzk3MDAwMCcsXG4gICAgICAgICAgICdjb250cmFzdERlZmF1bHRDb2xvcic6ICdsaWdodCcsXG4gICAgICAgICAgICdjb250cmFzdERhcmtDb2xvcnMnOiBbXG4gICAgICAgICAgICAgJzUwJyxcbiAgICAgICAgICAgICAnMTAwJyxcbiAgICAgICAgICAgICAnMjAwJyxcbiAgICAgICAgICAgICAnQTEwMCcsXG4gICAgICAgICAgICAgJ0EyMDAnXG4gICAgICAgICAgIF0sXG4gICAgICAgICAgICdjb250cmFzdExpZ2h0Q29sb3JzJzogW1xuICAgICAgICAgICAgICczMDAnLFxuICAgICAgICAgICAgICc0MDAnLFxuICAgICAgICAgICAgICc1MDAnLFxuICAgICAgICAgICAgICc2MDAnLFxuICAgICAgICAgICAgICc3MDAnLFxuICAgICAgICAgICAgICc4MDAnLFxuICAgICAgICAgICAgICc5MDAnLFxuICAgICAgICAgICAgICdBNDAwJyxcbiAgICAgICAgICAgICAnQTcwMCdcbiAgICAgICAgICAgXVxuICAgICAgICAgfSk7XG4gICAgICAgICAkbWRUaGVtaW5nUHJvdmlkZXIuZGVmaW5lUGFsZXR0ZSgnanVzdGljYXJBY2NlbnQnLCB7XG4gICAgICAgICAgICc1MCc6ICdmY2YyZTcnLFxuICAgICAgICAgICAnMTAwJzogJ2Y4ZGVjMycsXG4gICAgICAgICAgICcyMDAnOiAnZjNjODljJyxcbiAgICAgICAgICAgJzMwMCc6ICdlZWIyNzQnLFxuICAgICAgICAgICAnNDAwJzogJ2VhYTI1NicsXG4gICAgICAgICAgICc1MDAnOiAnZTY5MTM4JyxcbiAgICAgICAgICAgJzYwMCc6ICdlMzg5MzInLFxuICAgICAgICAgICAnNzAwJzogJ2RmN2UyYicsXG4gICAgICAgICAgICc4MDAnOiAnZGI3NDI0JyxcbiAgICAgICAgICAgJzkwMCc6ICdkNTYyMTcnLFxuICAgICAgICAgICAnQTEwMCc6ICdmOWRhYmEnLFxuICAgICAgICAgICAnQTIwMCc6ICdmMmNkYTcnLFxuICAgICAgICAgICAnQTQwMCc6ICdmZmMzYTEnLFxuICAgICAgICAgICAnQTcwMCc6ICdmZmIyODcnLFxuICAgICAgICAgICAnY29udHJhc3REZWZhdWx0Q29sb3InOiAnbGlnaHQnLFxuICAgICAgICAgICAnY29udHJhc3REYXJrQ29sb3JzJzogW1xuICAgICAgICAgICAgICc1MCcsXG4gICAgICAgICAgICAgJzEwMCcsXG4gICAgICAgICAgICAgJzIwMCcsXG4gICAgICAgICAgICAgJzMwMCcsXG4gICAgICAgICAgICAgJzQwMCcsXG4gICAgICAgICAgICAgJzUwMCcsXG4gICAgICAgICAgICAgJzYwMCcsXG4gICAgICAgICAgICAgJzcwMCcsXG4gICAgICAgICAgICAgJzgwMCcsXG4gICAgICAgICAgICAgJ0ExMDAnLFxuICAgICAgICAgICAgICdBMjAwJyxcbiAgICAgICAgICAgICAnQTQwMCcsXG4gICAgICAgICAgICAgJ0E3MDAnXG4gICAgICAgICAgIF0sXG4gICAgICAgICAgICdjb250cmFzdExpZ2h0Q29sb3JzJzogW1xuICAgICAgICAgICAgICc5MDAnXG4gICAgICAgICAgIF1cbiAgICAgICAgIH0pO1xuICAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLmRlZmluZVBhbGV0dGUoJ2p1c3RpY2FyV2FybicsIHtcbiAgICAgICAgICAgJzUwJzogJ2ZmZmFlZCcsXG4gICAgICAgICAgICcxMDAnOiAnZmZmNGQxJyxcbiAgICAgICAgICAgJzIwMCc6ICdmZmVjYjMnLFxuICAgICAgICAgICAnMzAwJzogJ2ZmZTQ5NCcsXG4gICAgICAgICAgICc0MDAnOiAnZmZkZjdkJyxcbiAgICAgICAgICAgJzUwMCc6ICdmZmQ5NjYnLFxuICAgICAgICAgICAnNjAwJzogJ2ZmZDU1ZScsXG4gICAgICAgICAgICc3MDAnOiAnZmZjZjUzJyxcbiAgICAgICAgICAgJzgwMCc6ICdmZmNhNDknLFxuICAgICAgICAgICAnOTAwJzogJ2ZmYzAzOCcsXG4gICAgICAgICAgICdBMTAwJzogJ2ZmZmZmZicsXG4gICAgICAgICAgICdBMjAwJzogJ2ZmZmZmZicsXG4gICAgICAgICAgICdBNDAwJzogJ2ZmZjVlMScsXG4gICAgICAgICAgICdBNzAwJzogJ2ZmZWRjOCcsXG4gICAgICAgICAgICdjb250cmFzdERlZmF1bHRDb2xvcic6ICdsaWdodCcsXG4gICAgICAgICAgICdjb250cmFzdERhcmtDb2xvcnMnOiBbXG4gICAgICAgICAgICAgJzUwJyxcbiAgICAgICAgICAgICAnMTAwJyxcbiAgICAgICAgICAgICAnMjAwJyxcbiAgICAgICAgICAgICAnMzAwJyxcbiAgICAgICAgICAgICAnNDAwJyxcbiAgICAgICAgICAgICAnNTAwJyxcbiAgICAgICAgICAgICAnNjAwJyxcbiAgICAgICAgICAgICAnNzAwJyxcbiAgICAgICAgICAgICAnODAwJyxcbiAgICAgICAgICAgICAnOTAwJyxcbiAgICAgICAgICAgICAnQTEwMCcsXG4gICAgICAgICAgICAgJ0EyMDAnLFxuICAgICAgICAgICAgICdBNDAwJyxcbiAgICAgICAgICAgICAnQTcwMCdcbiAgICAgICAgICAgXSxcbiAgICAgICAgICAgJ2NvbnRyYXN0TGlnaHRDb2xvcnMnOiBbXVxuICAgICAgICAgfSk7XG4gICAgICAgICAkbWRUaGVtaW5nUHJvdmlkZXIuZGVmaW5lUGFsZXR0ZSgnanVzdGljYXJCYWNrZ3JvdW5kJywge1xuICAgICAgICAgICAnNTAnOiAnZTBlMGUwJyxcbiAgICAgICAgICAgJzEwMCc6ICdiM2IzYjMnLFxuICAgICAgICAgICAnMjAwJzogJzgwODA4MCcsXG4gICAgICAgICAgICczMDAnOiAnNGQ0ZDRkJyxcbiAgICAgICAgICAgJzQwMCc6ICcyNjI2MjYnLFxuICAgICAgICAgICAnNTAwJzogJzAwMDAwMCcsXG4gICAgICAgICAgICc2MDAnOiAnMDAwMDAwJyxcbiAgICAgICAgICAgJzcwMCc6ICcwMDAwMDAnLFxuICAgICAgICAgICAnODAwJzogJzAwMDAwMCcsXG4gICAgICAgICAgICc5MDAnOiAnMDAwMDAwJyxcbiAgICAgICAgICAgJ0ExMDAnOiAnYTZhNmE2JyxcbiAgICAgICAgICAgJ0EyMDAnOiAnOGM4YzhjJyxcbiAgICAgICAgICAgJ0E0MDAnOiAnNzM3MzczJyxcbiAgICAgICAgICAgJ0E3MDAnOiAnNjY2NjY2JyxcbiAgICAgICAgICAgJ2NvbnRyYXN0RGVmYXVsdENvbG9yJzogJ2xpZ2h0JyxcbiAgICAgICAgICAgJ2NvbnRyYXN0RGFya0NvbG9ycyc6IFtcbiAgICAgICAgICAgICAnNTAnLFxuICAgICAgICAgICAgICcxMDAnLFxuICAgICAgICAgICAgICcyMDAnLFxuICAgICAgICAgICAgICdBMTAwJyxcbiAgICAgICAgICAgICAnQTIwMCdcbiAgICAgICAgICAgXSxcbiAgICAgICAgICAgJ2NvbnRyYXN0TGlnaHRDb2xvcnMnOiBbXG4gICAgICAgICAgICAgJzMwMCcsXG4gICAgICAgICAgICAgJzQwMCcsXG4gICAgICAgICAgICAgJzUwMCcsXG4gICAgICAgICAgICAgJzYwMCcsXG4gICAgICAgICAgICAgJzcwMCcsXG4gICAgICAgICAgICAgJzgwMCcsXG4gICAgICAgICAgICAgJzkwMCcsXG4gICAgICAgICAgICAgJ0E0MDAnLFxuICAgICAgICAgICAgICdBNzAwJ1xuICAgICAgICAgICBdXG4gICAgICAgICB9KTtcblxuICAgICAgICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ2p1c3RpY2FyJylcbiAgICAgICAgICAgIC5wcmltYXJ5UGFsZXR0ZSgnanVzdGljYXJQcmltYXJ5JylcbiAgICAgICAgICAgIC5hY2NlbnRQYWxldHRlKCdqdXN0aWNhckFjY2VudCcpXG4gICAgICAgICAgICAud2FyblBhbGV0dGUoJ2p1c3RpY2FyV2FybicpXG4gICAgICAgICAgICAuYmFja2dyb3VuZFBhbGV0dGUoJ2p1c3RpY2FyQmFja2dyb3VuZCcpO1xuXG4gICAgICAgIC8vIHNldHRpbmcgaXQgYXMgZGVmYXVsdCB0aGVtZVxuICAgICAgICAkbWRUaGVtaW5nUHJvdmlkZXIuc2V0RGVmYXVsdFRoZW1lKCdqdXN0aWNhcicpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXR0aW5nIHVwIHN0YXRlIG1hY2hpbmVcbiAgICAgICAgICovXG4gICAgICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoXCIvc3RhcnRcIik7XG5cblxuICAgIH1cbl0pLnJ1bihbXG4gICAgJyRyb290U2NvcGUnLFxuICAgICckbG9nJyxcbiAgICAnJHRyYW5zaXRpb25zJyxcbiAgICAnSnVzdGljYXJBUEknLFxuICAgIGZ1bmN0aW9uKCRyb290U2NvcGUsICRsb2csICR0cmFuc2l0aW9ucywgSnVzdGljYXJBUEkpIHtcbiAgICAgIFxuICAgIH1cbl0pO1xuXG5hbmd1bGFyLm1vZHVsZShcIkp1c3RpY2FyLldlYkNsaWVudFwiKS5jb250cm9sbGVyKFwiTWFpbkN0cmxcIiwgWyckc2NvcGUnLCAnJGxvZycsICckbWRTaWRlbmF2JyxcbiAgZnVuY3Rpb24oJHNjb3BlLCAkbG9nLCAkbWRTaWRlbmF2KSB7XG4gICAgLyoqXG4gICAgICogVG9nZ2xlIHNpZGVuYXYgb24gYnV0dG9uIGNsaWNrXG4gICAgICovXG4gICAgJHNjb3BlLnRvZ2dsZVNpZGVuYXYgPSBmdW5jdGlvbigpIHtcbiAgICAgICRtZFNpZGVuYXYoXCJzaWRlbmF2XCIpLnRvZ2dsZSgpO1xuICAgIH07XG4gIH1cbl0pO1xuIiwiLyoqXG4gKiBAbmFtZXNwYWNlIEp1c3RpY2FyLldlYkNsaWVudC5BUElcbiAqIHNldHMgdXAgdGhlIEFQSSBjb25maWd1cmF0aW9uXG4gKi9cbmxldCBtb2R1bGVBUEkgPSBhbmd1bGFyLm1vZHVsZShcIkp1c3RpY2FyLldlYkNsaWVudC5BUElcIiwgWyduZ1Jlc291cmNlJ10pO1xuXG4vKipcbiAqIFN0b3JlcyBiYXNlIFVSTCBmb3IgYXBpXG4gKi9cbm1vZHVsZUFQSS5jb25zdGFudChcIkFQSV9VUkxcIiwgXCJodHRwOi8vMTI3LjAuMC4xL2FwaVwiKTtcblxubW9kdWxlQVBJLnNlcnZpY2UoXCJKdXN0aWNhckFQSVwiLCBbJyRodHRwJywgJyRyZXNvdXJjZScsICckbG9nJywgJyRxJywgJ0FQSV9VUkwnLFxuICBmdW5jdGlvbigkaHR0cCwgJHJlc291cmNlLCAkbG9nLCAkcSwgQVBJX1VSTCkge1xuICAgICAgbGV0IEp1c3RpY2FyQVBJID0ge307XG5cbiAgICAgIC8qKlxuICAgICAgICogQXV0aCBmdW5jdGlvbnMgdXNlZCBmb3IgYXV0aCBhbmQgdXNlciBtYW5hZ2VtZW50XG4gICAgICAgKi9cbiAgICAgIEp1c3RpY2FyQVBJLmF1dGggPSB7fTtcblxuICAgICAgSnVzdGljYXJBUEkuYXV0aC5sb2dpbiA9IGZ1bmN0aW9uKGVtYWlsLCBwYXNzd29yZCkge1xuICAgICAgICByZXR1cm4gJGh0dHAucG9zdChBUElfVVJMICsgXCIvdXNlci9sb2dpblwiLCB7XG4gICAgICAgICAgZW1haWw6IGVtYWlsLFxuICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZFxuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIEp1c3RpY2FyQVBJLmF1dGgubG9nb3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAkaHR0cC5wb3N0KEFQSV9VUkwgKyBcIi91c2VyL2xvZ291dFwiKTtcbiAgICAgIH07XG5cbiAgICAgIEp1c3RpY2FyQVBJLmF1dGguY3VycmVudCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KEFQSV9VUkwgKyBcIi91c2VyL2N1cnJlbnRcIik7XG4gICAgICB9O1xuXG4gICAgICBKdXN0aWNhckFQSS5hdXRoLnJlZ2lzdGVyID0gZnVuY3Rpb24oZW1haWwsIHBhc3N3b3JkKSB7XG4gICAgICAgIHJldHVybiAkaHR0cC5wb3N0KEFQSV9VUkwgKyBcIi91c2VyL3JlZ2lzdGVyXCIsIHtcbiAgICAgICAgICBlbWFpbDogZW1haWwsXG4gICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkXG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIEp1c3RpY2FyQVBJO1xuICB9XG5dKTtcbiIsIi8qKlxuICogQG5hbWVzcGFjZSBKdXN0aWNhci5XZWJDbGllbnQuQXV0aFxuICogaGFuZGxlcyBsb2dpbiBhbmQgY2hlY2tpbmcgcGVybWlzc2lvbnNcbiAqL1xubGV0IG1vZHVsZUF1dGggPSBhbmd1bGFyLm1vZHVsZShcIkp1c3RpY2FyLldlYkNsaWVudC5BdXRoXCIsIFsnbmdSZXNvdXJjZScsICdKdXN0aWNhci5XZWJDbGllbnQuQVBJJ10pO1xuXG4vKipcbiAqXG4gKi9cblxubW9kdWxlQXV0aC5zZXJ2aWNlKFwiSnVzdGljYXJBdXRoXCIsIFsnJGh0dHAnLCAnJHJlc291cmNlJywgJyRsb2cnLCAnJHEnLCAnJG1kUGFuZWwnLCAnSnVzdGljYXJBUEknLFxuICBmdW5jdGlvbigkaHR0cCwgJHJlc291cmNlLCAkbG9nLCAkcSwgJG1kUGFuZWwsIEp1c3RpY2FyQVBJKSB7XG4gICAgICBsZXQgSnVzdGljYXJBdXRoID0ge307XG5cbiAgICAgIEp1c3RpY2FyQXV0aC5jdXJyZW50VXNlciA9IG51bGw7XG5cbiAgICAgIC8qKlxuICAgICAgICogTG9naW4gdG8gc3lzdGVtXG4gICAgICAgKi9cbiAgICAgIEp1c3RpY2FyQXV0aC5sb2dpbiA9IGZ1bmN0aW9uKGVtYWlsLCBwYXNzd29yZCkge1xuICAgICAgICBKdXN0aWNhckFQSS5hdXRoLmxvZ2luKGVtYWlsLCBwYXNzd29yZCkudGhlbihcbiAgICAgICAgICBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgSnVzdGljYXJBdXRoLmN1cnJlbnRVc2VyID0gcmVzcG9uc2UuZGF0YS51c2VyOyAvLyB0aGlzIGlzIGxpa2VseSB3cm9uZ1xuICAgICAgICAgIH1cbiAgICAgICAgKS5jYXRjaChcbiAgICAgICAgICBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIC8vIEBUT0RPIGJldHRlciBoYW5kbGluZyBvZiByZXN1bHRzLCBmYWlsZWQgbG9naW4sIGV0Yy5cbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnIpO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH07XG5cbiAgICAgIC8qKlxuICAgICAgICogTG9nb3V0IG9mIHN5c3RlbVxuICAgICAgICovXG4gICAgICBKdXN0aWNhckF1dGgubG9nb3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIEp1c3RpY2FyQVBJLmF1dGgubG9nb3V0KCkudGhlbihcbiAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIEp1c3RpY2FyQXV0aC5jdXJyZW50VXNlciA9IG51bGw7IC8vIHRoaXMgaXMgbGlrZWx5IHdyb25nXG4gICAgICAgICAgfVxuICAgICAgICApLmNhdGNoKFxuICAgICAgICAgIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgLy8gQFRPRE8gYmV0dGVyIGhhbmRsaW5nIG9mIHJlc3VsdHMsIGZhaWxlZCBsb2dpbiwgZXRjLlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycik7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfTtcblxuICAgICAgLyoqXG4gICAgICAgKiBSZWdpc3RlciBuZXcgdXNlclxuICAgICAgICovXG4gICAgICBKdXN0aWNhckF1dGgucmVnaXN0ZXIgPSBmdW5jdGlvbihlbWFpbCwgcGFzc3dvcmQpIHtcbiAgICAgICAgSnVzdGljYXJBUEkuYXV0aC5yZWdpc3RlcihlbWFpbCwgcGFzc3dvcmQpLnRoZW4oXG4gICAgICAgICAgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIEp1c3RpY2FyQXV0aC5jdXJyZW50VXNlciA9IHJlc3BvbnNlLmRhdGEudXNlcjsgLy8gdGhpcyBpcyBsaWtlbHkgd3JvbmdcbiAgICAgICAgICB9XG4gICAgICAgICkuY2F0Y2goXG4gICAgICAgICAgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAvLyBAVE9ETyBiZXR0ZXIgaGFuZGxpbmcgb2YgcmVzdWx0cywgZmFpbGVkIGxvZ2luLCBldGMuXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICB9O1xuXG4gICAgICAvKipcbiAgICAgICAqIE9wZW4gbW9kYWwgcGFuZWwgZm9yIGxvZ2dpbmcgaW5zcGVjdFxuICAgICAgICovXG4gICAgICBKdXN0aWNhckF1dGgub3BlbkxvZ2luUGFuZWwgPSBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0gJHEuZGVmZXIoKTtcblxuICAgICAgICBsZXQgcGFuZWxQb3NpdGlvbiA9ICRtZFBhbmVsLm5ld1BhbmVsUG9zaXRpb24oKVxuICAgICAgICAgIC5hYnNvbHV0ZSgpXG4gICAgICAgICAgLnRvcCgnNTAlJylcbiAgICAgICAgICAubGVmdCgnNTAlJyk7XG5cbiAgICAgICAgbGV0IHBhbmVsQW5pbWF0aW9uID0gJG1kUGFuZWwubmV3UGFuZWxBbmltYXRpb24oKVxuICAgICAgICAgIC5vcGVuRnJvbSgkZXZlbnQpXG4gICAgICAgICAgLmR1cmF0aW9uKDIwMClcbiAgICAgICAgICAuY2xvc2VUbygnLmp1c3RpY2FyLWxvZ2luJylcbiAgICAgICAgICAud2l0aEFuaW1hdGlvbigkbWRQYW5lbC5hbmltYXRpb24uU0NBTEUpO1xuXG4gICAgICAgIGxldCBwYW5lbENvbmZpZyA9IHtcbiAgICAgICAgICBhdHRhY2hUbzogYW5ndWxhci5lbGVtZW50KGRvY3VtZW50LmJvZHkpLFxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdMb2dpbkN0cmwnLFxuICAgICAgICAgIGRpc2FibGVQYXJlbnRTY3JvbGw6IHRydWUsXG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICcvdmlld3MvcGFuZWxzL2xvZ2luJyxcbiAgICAgICAgICBwYW5lbENsYXNzOiBcImp1c3RpY2FyLXBhbmVsXCIsXG4gICAgICAgICAgekluZGV4OiAxNTAsXG4gICAgICAgICAgbG9jYWxzOiB7XG4gICAgICAgICAgICBkZWZlcnJlZDogZGVmZXJyZWRcbiAgICAgICAgICB9LFxuICAgICAgICAgIHRyYXBGb2N1czogdHJ1ZSxcbiAgICAgICAgICBjbGlja091dHNpZGVUb0Nsb3NlOiB0cnVlLFxuICAgICAgICAgIGNsaWNrRXNjYXBlVG9DbG9zZTogdHJ1ZSxcbiAgICAgICAgICBoYXNCYWNrZHJvcDogdHJ1ZVxuICAgICAgICB9O1xuXG4gICAgICAgICRtZFBhbmVsLm9wZW4ocGFuZWxDb25maWcpO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgfTtcblxuICAgICAgLyoqXG4gICAgICAgKiBPcGVuIHJlZ2lzdHJhdGlvbiBwYW5lbFxuICAgICAgICovXG4gICAgICBKdXN0aWNhckF1dGgub3BlblJlZ2lzdGVyUGFuZWwgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0gJHEuZGVmZXIoKTtcblxuICAgICAgICBsZXQgcGFuZWxQb3NpdGlvbiA9ICRtZFBhbmVsLm5ld1BhbmVsUG9zaXRpb24oKVxuICAgICAgICAgIC5hYnNvbHV0ZSgpXG4gICAgICAgICAgLmNlbnRlcigpO1xuXG4gICAgICAgIGxldCBwYW5lbEFuaW1hdGlvbiA9ICRtZFBhbmVsLm5ld1BhbmVsQW5pbWF0aW9uKClcbiAgICAgICAgICAub3BlbkZyb20oJGV2ZW50KVxuICAgICAgICAgIC5kdXJhdGlvbigyMDApXG4gICAgICAgICAgLmNsb3NlVG8oJy5qdXN0aWNhci1sb2dpbicpXG4gICAgICAgICAgLndpdGhBbmltYXRpb24oJG1kUGFuZWwuYW5pbWF0aW9uLlNDQUxFKTtcblxuICAgICAgICBsZXQgcGFuZWxDb25maWcgPSB7XG4gICAgICAgICAgYXR0YWNoVG86IGFuZ3VsYXIuZWxlbWVudChkb2N1bWVudC5ib2R5KSxcbiAgICAgICAgICBjb250cm9sbGVyOiAnUmVnaXN0ZXJDdHJsJyxcbiAgICAgICAgICBkaXNhYmxlUGFyZW50U2Nyb2xsOiB0cnVlLFxuICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL3ZpZXdzL3BhbmVscy9yZWdpc3RlcicsXG4gICAgICAgICAgcGFuZWxDbGFzczogXCJqdXN0aWNhci1wYW5lbFwiLFxuICAgICAgICAgIHpJbmRleDogMTUwLFxuICAgICAgICAgIGxvY2Fsczoge1xuICAgICAgICAgICAgZGVmZXJyZWQ6IGRlZmVycmVkXG4gICAgICAgICAgfSxcbiAgICAgICAgICB0cmFwRm9jdXM6IHRydWUsXG4gICAgICAgICAgY2xpY2tPdXRzaWRlVG9DbG9zZTogdHJ1ZSxcbiAgICAgICAgICBjbGlja0VzY2FwZVRvQ2xvc2U6IHRydWUsXG4gICAgICAgICAgaGFzQmFja2Ryb3A6IHRydWVcbiAgICAgICAgfTtcblxuICAgICAgICAkbWRQYW5lbC5vcGVuKHBhbmVsQ29uZmlnKTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgIH07XG5cbiAgICAgIC8qKlxuICAgICAgICogQ2hlY2sgcGVybWlzc2lvbnMgYmFzZWQgb24gYSBzdHJpbmdcbiAgICAgICAqL1xuICAgICAgSnVzdGljYXJBdXRoLmNoZWNrUGVybWlzc2lvbnMgPSBmdW5jdGlvbihwZXJtaXNzaW9uKSB7XG5cbiAgICAgIH07XG5cblxuICAgICAgcmV0dXJuIEp1c3RpY2FyQXV0aDtcbiAgfVxuXSk7XG5cbm1vZHVsZUF1dGguY29udHJvbGxlcignTG9naW5DdHJsJywgW1xuICBmdW5jdGlvbigkbWRQYW5lbCkge1xuXG4gIH1cbl0pO1xuXG5cbm1vZHVsZUF1dGguY29udHJvbGxlcignUmVnaXN0ZXJDdHJsJywgW1xuICBmdW5jdGlvbigkbWRQYW5lbCkge1xuXG4gIH1cbl0pO1xuIiwiLyoqXG4gKiBAbmFtZXNwYWNlIEp1c3RpY2FyLldlYkNsaWVudC5TdGF0ZXMuQWRtaW5cbiAqIFN0b3JlcyBhbGwgdGhlIHN0YXRlcyBmb3IgdGhlIEFuZ3VsYXIgVUkgcm91dGVyIHN0YXRlIG1hY2hpbmUgYW5kIGFzc29jaWF0ZXMgY29udHJvbGxlcnNcbiAqL1xubGV0IHN0YXRlQWRtaW4gPSBhbmd1bGFyLm1vZHVsZShcIkp1c3RpY2FyLldlYkNsaWVudC5TdGF0ZXMuQWRtaW5cIiwgW1xuICAndWkucm91dGVyJ1xuXSk7XG5cbi8qKlxuICogU3RhdGUgbmFtZSBmb3IgdGhpcyBzdGF0ZVxuICovXG5zdGF0ZUFkbWluLmNvbnN0YW50KFwiQURNSU5fU1RBVEVcIiwgXCJhZG1pblwiKTtcblxuLyoqXG4gKiBTdWItVVJMIGZvciB0aGlzIHN0YXRlXG4gKi9cbnN0YXRlQWRtaW4uY29uc3RhbnQoXCJBRE1JTl9TVEFURV9VUkxcIiwgXCIvYWRtaW5cIik7XG5cbi8qKlxuICogTG9jYXRpb24gdG8gbG9hZCB2aWV3IGZyb21cbiAqL1xuc3RhdGVBZG1pbi5jb25zdGFudChcIkFETUlOX1RFTVBMQVRFX1VSTFwiLCBcIi9zdGF0ZXMvYWRtaW5cIik7XG5cbi8qKlxuICogQ29uZmlnIGFjdGlvbiB0aGF0IHNldHMgdXAgdGhpcyBtb2R1bGVcbiAqL1xuc3RhdGVBZG1pbi5jb25maWcoW1xuICAnJHN0YXRlUHJvdmlkZXInLFxuICAnQURNSU5fU1RBVEUnLFxuICAnQURNSU5fU1RBVEVfVVJMJyxcbiAgZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsIEFETUlOX1NUQVRFLCBBRE1JTl9TVEFURV9VUkwpIHtcblxuICAgIC8qKlxuICAgICAqIFNldCB1cCBzdGF0ZSBpbiBhcHBsaWNhdGlvbiBzdGF0ZSBtYWNoaW5lLlxuICAgICAqL1xuICAgICRzdGF0ZVByb3ZpZGVyXG4gICAgICAuc3RhdGUoQURNSU5fU1RBVEUsIHtcbiAgICAgICAgdXJsOiBBRE1JTl9TVEFURV9VUkwsXG4gICAgICAgIHBhcmFtczoge30sXG4gICAgICAgIGFic3RyYWN0OiB0cnVlXG4gICAgICB9KVxuICAgIDtcbiAgfVxuXSk7XG4iLCJyZXF1aXJlKFwiLi9sYW5kaW5nL2luZGV4LmpzXCIpO1xucmVxdWlyZShcIi4vcGxheWVyL2luZGV4LmpzXCIpO1xucmVxdWlyZShcIi4vYWRtaW4vaW5kZXguanNcIik7XG5cbi8qKlxuICogQG5hbWVzcGFjZSBKdXN0aWNhci5XZWJDbGllbnQuU3RhdGVzXG4gKiBTdG9yZXMgYWxsIHRoZSBzdGF0ZXMgZm9yIHRoZSBBbmd1bGFyIFVJIHJvdXRlciBzdGF0ZSBtYWNoaW5lIGFuZCBhc3NvY2lhdGVzIGNvbnRyb2xsZXJzXG4gKi9cbmFuZ3VsYXIubW9kdWxlKFwiSnVzdGljYXIuV2ViQ2xpZW50LlN0YXRlc1wiLCBbXG4gICdKdXN0aWNhci5XZWJDbGllbnQuU3RhdGVzLkxhbmRpbmcnLFxuICAnSnVzdGljYXIuV2ViQ2xpZW50LlN0YXRlcy5QbGF5ZXInLFxuICAnSnVzdGljYXIuV2ViQ2xpZW50LlN0YXRlcy5BZG1pbicsXG5dKTtcbiIsIi8qKlxuICogQG5hbWVzcGFjZSBKdXN0aWNhci5XZWJDbGllbnQuU3RhdGVzLkxhbmRpbmdcbiAqIFN0b3JlcyBhbGwgdGhlIHN0YXRlcyBmb3IgdGhlIEFuZ3VsYXIgVUkgcm91dGVyIHN0YXRlIG1hY2hpbmUgYW5kIGFzc29jaWF0ZXMgY29udHJvbGxlcnNcbiAqL1xubGV0IHN0YXRlTGFuZGluZyA9IGFuZ3VsYXIubW9kdWxlKFwiSnVzdGljYXIuV2ViQ2xpZW50LlN0YXRlcy5MYW5kaW5nXCIsIFtcbiAgJ3VpLnJvdXRlcidcbl0pO1xuXG4vKipcbiAqIFN0YXRlIG5hbWUgZm9yIHRoaXMgc3RhdGVcbiAqL1xuc3RhdGVMYW5kaW5nLmNvbnN0YW50KFwiTEFORElOR19TVEFURVwiLCBcImxhbmRpbmdcIik7XG5cbi8qKlxuICogU3ViLVVSTCBmb3IgdGhpcyBzdGF0ZVxuICovXG5zdGF0ZUxhbmRpbmcuY29uc3RhbnQoXCJMQU5ESU5HX1NUQVRFX1VSTFwiLCBcIi9zdGFydFwiKTtcblxuLyoqXG4gKiBMb2NhdGlvbiB0byBsb2FkIHZpZXcgZnJvbVxuICovXG5zdGF0ZUxhbmRpbmcuY29uc3RhbnQoXCJMQU5ESU5HX1RFTVBMQVRFX1VSTFwiLCBcIi9zdGF0ZXMvbGFuZGluZ1wiKTtcblxuLyoqXG4gKiBDb25maWcgYWN0aW9uIHRoYXQgc2V0cyB1cCB0aGlzIG1vZHVsZVxuICovXG5zdGF0ZUxhbmRpbmcuY29uZmlnKFtcbiAgJyRzdGF0ZVByb3ZpZGVyJyxcbiAgJ0xBTkRJTkdfU1RBVEUnLFxuICAnTEFORElOR19TVEFURV9VUkwnLFxuICAnTEFORElOR19URU1QTEFURV9VUkwnLFxuICBmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgTEFORElOR19TVEFURSwgTEFORElOR19TVEFURV9VUkwsIExBTkRJTkdfVEVNUExBVEVfVVJMKSB7XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdXAgc3RhdGUgaW4gYXBwbGljYXRpb24gc3RhdGUgbWFjaGluZS5cbiAgICAgKi9cbiAgICAkc3RhdGVQcm92aWRlclxuICAgICAgLnN0YXRlKExBTkRJTkdfU1RBVEUsIHtcbiAgICAgICAgdXJsOiBMQU5ESU5HX1NUQVRFX1VSTCxcbiAgICAgICAgcGFyYW1zOiB7fSxcbiAgICAgICAgY29udHJvbGxlcjogXCJTdGF0ZUxhbmRpbmdDdHJsXCIsXG4gICAgICAgIHRlbXBsYXRlVXJsOiBMQU5ESU5HX1RFTVBMQVRFX1VSTFxuICAgICAgfSlcbiAgICA7XG4gIH1cbl0pO1xuXG4vKipcbiAqIENvbnRyb2xsZXIgZm9yIHN0YXRlXG4gKi9cbnN0YXRlTGFuZGluZy5jb250cm9sbGVyKFwiU3RhdGVMYW5kaW5nQ3RybFwiLCBbXG4gIGZ1bmN0aW9uKCkge1xuXG4gIH0gIFxuXSlcbiIsIi8qKlxuICogQG5hbWVzcGFjZSBKdXN0aWNhci5XZWJDbGllbnQuU3RhdGVzLlBsYXllclxuICogU3RvcmVzIGFsbCB0aGUgc3RhdGVzIGZvciB0aGUgQW5ndWxhciBVSSByb3V0ZXIgc3RhdGUgbWFjaGluZSBhbmQgYXNzb2NpYXRlcyBjb250cm9sbGVyc1xuICovXG5sZXQgc3RhdGVQbGF5ZXIgPSBhbmd1bGFyLm1vZHVsZShcIkp1c3RpY2FyLldlYkNsaWVudC5TdGF0ZXMuUGxheWVyXCIsIFtcbiAgJ3VpLnJvdXRlcidcbl0pO1xuXG4vKipcbiAqIFN0YXRlIG5hbWUgZm9yIHRoaXMgc3RhdGVcbiAqL1xuc3RhdGVQbGF5ZXIuY29uc3RhbnQoXCJQTEFZRVJfU1RBVEVcIiwgXCJwbGF5ZXJcIik7XG5cbi8qKlxuICogU3ViLVVSTCBmb3IgdGhpcyBzdGF0ZVxuICovXG5zdGF0ZVBsYXllci5jb25zdGFudChcIlBMQVlFUl9TVEFURV9VUkxcIiwgXCIvcGxheWVyXCIpO1xuXG4vKipcbiAqIENvbmZpZyBhY3Rpb24gdGhhdCBzZXRzIHVwIHRoaXMgbW9kdWxlXG4gKi9cbnN0YXRlUGxheWVyLmNvbmZpZyhbXG4gICckc3RhdGVQcm92aWRlcicsXG4gICdQTEFZRVJfU1RBVEUnLFxuICAnUExBWUVSX1NUQVRFX1VSTCcsXG4gIGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCBQTEFZRVJfU1RBVEUsIFBMQVlFUl9TVEFURV9VUkwpIHtcblxuICAgIC8qKlxuICAgICAqIFNldCB1cCBzdGF0ZSBpbiBhcHBsaWNhdGlvbiBzdGF0ZSBtYWNoaW5lLlxuICAgICAqL1xuICAgICRzdGF0ZVByb3ZpZGVyXG4gICAgICAuc3RhdGUoUExBWUVSX1NUQVRFLCB7XG4gICAgICAgIHVybDogUExBWUVSX1NUQVRFX1VSTCxcbiAgICAgICAgcGFyYW1zOiB7fSxcbiAgICAgICAgYWJzdHJhY3Q6IHRydWVcbiAgICAgIH0pXG4gICAgO1xuICB9XG5dKTtcbiJdfQ==
