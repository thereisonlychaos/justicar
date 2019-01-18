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

      username: email,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvY2xpZW50LmpzIiwiY2xpZW50L21vZHVsZXMvYXBpL2luZGV4LmpzIiwiY2xpZW50L21vZHVsZXMvYXV0aC9pbmRleC5qcyIsImNsaWVudC9zdGF0ZXMvYWRtaW4vaW5kZXguanMiLCJjbGllbnQvc3RhdGVzL2luZGV4LmpzIiwiY2xpZW50L3N0YXRlcy9sYW5kaW5nL2luZGV4LmpzIiwiY2xpZW50L3N0YXRlcy9wbGF5ZXIvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7O0FBR0E7O0FBRUE7O0FBQ0EsUUFBUSx3QkFBUjtBQUNBLFFBQVEseUJBQVI7O0FBRUE7O0FBRUE7QUFDQSxRQUFRLG1CQUFSOztBQUVBOzs7QUFHQSxRQUFRLE1BQVIsQ0FBZSxvQkFBZixFQUFxQztBQUNqQztBQUNBLFlBRmlDLEVBRW5CO0FBQ2QsWUFIaUMsRUFHbkI7QUFDZCxZQUppQyxFQUluQjtBQUNkLFdBTGlDLEVBS3BCO0FBQ2IsWUFOaUMsRUFNbkI7QUFDZCxlQVBpQyxFQVFqQyxnQkFSaUMsRUFTakMsb0JBVGlDLEVBU1g7QUFDdEIsV0FWaUM7O0FBWWpDO0FBQ0Esd0JBYmlDLEVBY2pDLHlCQWRpQyxFQWVqQywyQkFmaUMsQ0FBckMsRUFnQkcsTUFoQkgsQ0FnQlUsQ0FDTixtQkFETSxFQUVOLG9CQUZNLEVBR04sb0JBSE0sRUFJTixVQUFTLGlCQUFULEVBQTRCLGtCQUE1QixFQUFnRCxrQkFBaEQsRUFBb0U7O0FBR2hFOzs7QUFHQSxvQkFBa0IsVUFBbEIsQ0FBNkIsRUFBN0I7QUFDQSxvQkFBa0IsU0FBbEIsQ0FBNEIsS0FBNUI7O0FBRUE7Ozs7QUFJQyxxQkFBbUIsYUFBbkIsQ0FBaUMsY0FBakMsRUFBaUQ7QUFDL0MsVUFBTSxRQUR5QztBQUUvQyxXQUFPLFFBRndDO0FBRy9DLFdBQU8sUUFId0M7QUFJL0MsV0FBTyxRQUp3QztBQUsvQyxXQUFP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LGNBRmlCLEVBR2pCLGtCQUhpQixFQUlqQixVQUFTLGNBQVQsRUFBeUIsWUFBekIsRUFBdUMsZ0JBQXZDLEVBQXlEOztBQUV2RDs7O0FBR0EsaUJBQ0csS0FESCxDQUNTLFlBRFQsRUFDdUI7QUFDbkIsU0FBSyxnQkFEYztBQUVuQixZQUFRLEVBRlc7QUFHbkIsY0FBVTtBQUhTLEdBRHZCO0FBT0QsQ0FoQmdCLENBQW5CIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLyoqXG4gKiBAbmFtZXNwYWNlIEp1c3RpY2FyLldlYkNsaWVudFxuICovXG4ndXNlIHN0cmljdCc7XG5cbi8vIExvY2FsIEFuZ3VsYXIgTW9kdWxlcyBPbmx5LiBQbHVnaW5zIGFuZCBvdGhlciBsaWJyYXJpZXMgZ28gaW4gdGhlIGxpYi5qcyBmb2xkZXIgdG8gbWFrZSBmb3IgcXVpY2tlciBjb21waWxpbmcuXG5yZXF1aXJlKCcuL21vZHVsZXMvYXBpL2luZGV4LmpzJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvYXV0aC9pbmRleC5qcycpO1xuXG4vLyBNaXhpbnNcblxuLy8gTG9jYWwgU3RhdGUgTW9kdWxlc1xucmVxdWlyZSgnLi9zdGF0ZXMvaW5kZXguanMnKTtcblxuLy8gRGVmaW5lIG1haW4gbW9kdWxlXG5cblxuYW5ndWxhci5tb2R1bGUoJ0p1c3RpY2FyLldlYkNsaWVudCcsIFtcbiAgICAvLyBBbmd1bGFyIExpYnJhcmllc1xuICAgICduZ01hdGVyaWFsJywgLy8gYW5ndWxhci1tYXRlcmlhbFxuICAgICduZ1Nhbml0aXplJywgLy8gYW5ndWxhci1zYW5pdGl6ZVxuICAgICduZ1Jlc291cmNlJywgLy8gYW5ndWxhci1yZXNvdXJjZVxuICAgICduZ0FuaW1hdGUnLCAvLyBhbmd1bGFyLWFuaW1hdGVcbiAgICAnbmdNZXNzYWdlcycsIC8vIGFuZ3VsYXItbWVzc2FnZXNcbiAgICAnYW5ndWxhck1vbWVudCcsXG4gICAgJ2FuZ3VsYXIuZmlsdGVyJyxcbiAgICAnTG9jYWxTdG9yYWdlTW9kdWxlJywgLy8gYW5ndWxhci1sb2NhbC1zdG9yYWdlXG4gICAgJ3VpLnJvdXRlcicsXG5cbiAgICAvLyBMb2NhbCBtb2R1bGVzXG4gICAgJ0p1c3RpY2FyLldlYkNsaWVudC5BUEknLFxuICAgICdKdXN0aWNhci5XZWJDbGllbnQuQXV0aCcsXG4gICAgJ0p1c3RpY2FyLldlYkNsaWVudC5TdGF0ZXMnLFxuXSkuY29uZmlnKFtcbiAgICAnJGxvY2F0aW9uUHJvdmlkZXInLFxuICAgICckbWRUaGVtaW5nUHJvdmlkZXInLFxuICAgICckdXJsUm91dGVyUHJvdmlkZXInLFxuICAgIGZ1bmN0aW9uKCRsb2NhdGlvblByb3ZpZGVyLCAkbWRUaGVtaW5nUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICRsb2NhdGlvblByb3ZpZGVyIHNldHRpbmdzXG4gICAgICAgICAqL1xuICAgICAgICAkbG9jYXRpb25Qcm92aWRlci5oYXNoUHJlZml4KCcnKTtcbiAgICAgICAgJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKGZhbHNlKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlbWluZ1xuICAgICAgICAgKi9cblxuICAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLmRlZmluZVBhbGV0dGUoJ2p1c3RpY2FyV2FybicsIHtcbiAgICAgICAgICAgJzUwJzogJ2VkZTNlMycsXG4gICAgICAgICAgICcxMDAnOiAnZDNiYWJhJyxcbiAgICAgICAgICAgJzIwMCc6ICdiNjhjOGMnLFxuICAgICAgICAgICAnMzAwJzogJzk5NWU1ZScsXG4gICAgICAgICAgICc0MDAnOiAnODMzYzNjJyxcbiAgICAgICAgICAgJzUwMCc6ICc2ZDE5MTknLFxuICAgICAgICAgICAnNjAwJzogJzY1MTYxNicsXG4gICAgICAgICAgICc3MDAnOiAnNWExMjEyJyxcbiAgICAgICAgICAgJzgwMCc6ICc1MDBlMGUnLFxuICAgICAgICAgICAnOTAwJzogJzNlMDgwOCcsXG4gICAgICAgICAgICdBMTAwJzogJ2ZmNzU3NScsXG4gICAgICAgICAgICdBMjAwJzogJ2ZmNDI0MicsXG4gICAgICAgICAgICdBNDAwJzogJ2I4MGMwYycsXG4gICAgICAgICAgICdBNzAwJzogJzk3MDAwMCcsXG4gICAgICAgICAgICdjb250cmFzdERlZmF1bHRDb2xvcic6ICdsaWdodCcsXG4gICAgICAgICAgICdjb250cmFzdERhcmtDb2xvcnMnOiBbXG4gICAgICAgICAgICAgJzUwJyxcbiAgICAgICAgICAgICAnMTAwJyxcbiAgICAgICAgICAgICAnMjAwJyxcbiAgICAgICAgICAgICAnQTEwMCcsXG4gICAgICAgICAgICAgJ0EyMDAnXG4gICAgICAgICAgIF0sXG4gICAgICAgICAgICdjb250cmFzdExpZ2h0Q29sb3JzJzogW1xuICAgICAgICAgICAgICczMDAnLFxuICAgICAgICAgICAgICc0MDAnLFxuICAgICAgICAgICAgICc1MDAnLFxuICAgICAgICAgICAgICc2MDAnLFxuICAgICAgICAgICAgICc3MDAnLFxuICAgICAgICAgICAgICc4MDAnLFxuICAgICAgICAgICAgICc5MDAnLFxuICAgICAgICAgICAgICdBNDAwJyxcbiAgICAgICAgICAgICAnQTcwMCdcbiAgICAgICAgICAgXVxuICAgICAgICAgfSk7XG4gICAgICAgICAkbWRUaGVtaW5nUHJvdmlkZXIuZGVmaW5lUGFsZXR0ZSgnanVzdGljYXJBY2NlbnQnLCB7XG4gICAgICAgICAgICc1MCc6ICdmY2YyZTcnLFxuICAgICAgICAgICAnMTAwJzogJ2Y4ZGVjMycsXG4gICAgICAgICAgICcyMDAnOiAnZjNjODljJyxcbiAgICAgICAgICAgJzMwMCc6ICdlZWIyNzQnLFxuICAgICAgICAgICAnNDAwJzogJ2VhYTI1NicsXG4gICAgICAgICAgICc1MDAnOiAnZTY5MTM4JyxcbiAgICAgICAgICAgJzYwMCc6ICdlMzg5MzInLFxuICAgICAgICAgICAnNzAwJzogJ2RmN2UyYicsXG4gICAgICAgICAgICc4MDAnOiAnZGI3NDI0JyxcbiAgICAgICAgICAgJzkwMCc6ICdkNTYyMTcnLFxuICAgICAgICAgICAnQTEwMCc6ICdmOWRhYmEnLFxuICAgICAgICAgICAnQTIwMCc6ICdmMmNkYTcnLFxuICAgICAgICAgICAnQTQwMCc6ICdmZmMzYTEnLFxuICAgICAgICAgICAnQTcwMCc6ICdmZmIyODcnLFxuICAgICAgICAgICAnY29udHJhc3REZWZhdWx0Q29sb3InOiAnbGlnaHQnLFxuICAgICAgICAgICAnY29udHJhc3REYXJrQ29sb3JzJzogW1xuICAgICAgICAgICAgICc1MCcsXG4gICAgICAgICAgICAgJzEwMCcsXG4gICAgICAgICAgICAgJzIwMCcsXG4gICAgICAgICAgICAgJzMwMCcsXG4gICAgICAgICAgICAgJzQwMCcsXG4gICAgICAgICAgICAgJzUwMCcsXG4gICAgICAgICAgICAgJzYwMCcsXG4gICAgICAgICAgICAgJzcwMCcsXG4gICAgICAgICAgICAgJzgwMCcsXG4gICAgICAgICAgICAgJ0ExMDAnLFxuICAgICAgICAgICAgICdBMjAwJyxcbiAgICAgICAgICAgICAnQTQwMCcsXG4gICAgICAgICAgICAgJ0E3MDAnXG4gICAgICAgICAgIF0sXG4gICAgICAgICAgICdjb250cmFzdExpZ2h0Q29sb3JzJzogW1xuICAgICAgICAgICAgICc5MDAnXG4gICAgICAgICAgIF1cbiAgICAgICAgIH0pO1xuICAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLmRlZmluZVBhbGV0dGUoJ2p1c3RpY2FyUHJpbWFyeScsIHtcbiAgICAgICAgICAgJzUwJzogJ2YwZThmNicsXG4gICAgICAgICAgICcxMDAnOiAnZGFjNWU5JyxcbiAgICAgICAgICAgJzIwMCc6ICdjMjlmZGEnLFxuICAgICAgICAgICAnMzAwJzogJ2FhNzljYicsXG4gICAgICAgICAgICc0MDAnOiAnOTc1Y2MwJyxcbiAgICAgICAgICAgJzUwMCc6ICc4NTNmYjUnLFxuICAgICAgICAgICAnNjAwJzogJzdkMzlhZScsXG4gICAgICAgICAgICc3MDAnOiAnNzIzMWE1JyxcbiAgICAgICAgICAgJzgwMCc6ICc2ODI5OWQnLFxuICAgICAgICAgICAnOTAwJzogJzU1MWI4ZCcsXG4gICAgICAgICAgICdBMTAwJzogJ2UxYzZmZicsXG4gICAgICAgICAgICdBMjAwJzogJ2M3OTNmZicsXG4gICAgICAgICAgICdBNDAwJzogJ2FjNjBmZicsXG4gICAgICAgICAgICdBNzAwJzogJzlmNDdmZicsXG4gICAgICAgICAgICdjb250cmFzdERlZmF1bHRDb2xvcic6ICdsaWdodCcsXG4gICAgICAgICAgICdjb250cmFzdERhcmtDb2xvcnMnOiBbXG4gICAgICAgICAgICAgJzUwJyxcbiAgICAgICAgICAgICAnMTAwJyxcbiAgICAgICAgICAgICAnMjAwJyxcbiAgICAgICAgICAgICAnMzAwJyxcbiAgICAgICAgICAgICAnQTEwMCcsXG4gICAgICAgICAgICAgJ0EyMDAnLFxuICAgICAgICAgICAgICdBNDAwJ1xuICAgICAgICAgICBdLFxuICAgICAgICAgICAnY29udHJhc3RMaWdodENvbG9ycyc6IFtcbiAgICAgICAgICAgICAnNDAwJyxcbiAgICAgICAgICAgICAnNTAwJyxcbiAgICAgICAgICAgICAnNjAwJyxcbiAgICAgICAgICAgICAnNzAwJyxcbiAgICAgICAgICAgICAnODAwJyxcbiAgICAgICAgICAgICAnOTAwJyxcbiAgICAgICAgICAgICAnQTcwMCdcbiAgICAgICAgICAgXVxuICAgICAgICAgfSk7XG4gICAgICAgICAkbWRUaGVtaW5nUHJvdmlkZXIuZGVmaW5lUGFsZXR0ZSgnanVzdGljYXJCYWNrZ3JvdW5kJywge1xuICAgICAgICAgICAnNTAnOiAnZmFmYWZjJyxcbiAgICAgICAgICAgJzEwMCc6ICdmNGYyZjgnLFxuICAgICAgICAgICAnMjAwJzogJ2VjZTlmNCcsXG4gICAgICAgICAgICczMDAnOiAnZTRlMGYwJyxcbiAgICAgICAgICAgJzQwMCc6ICdkZmQ5ZWMnLFxuICAgICAgICAgICAnNTAwJzogJ2Q5ZDJlOScsXG4gICAgICAgICAgICc2MDAnOiAnZDVjZGU2JyxcbiAgICAgICAgICAgJzcwMCc6ICdjZmM3ZTMnLFxuICAgICAgICAgICAnODAwJzogJ2NhYzFkZicsXG4gICAgICAgICAgICc5MDAnOiAnYzBiNmQ5JyxcbiAgICAgICAgICAgJ0ExMDAnOiAnZmZmZmZmJyxcbiAgICAgICAgICAgJ0EyMDAnOiAnZmZmZmZmJyxcbiAgICAgICAgICAgJ0E0MDAnOiAnZmZmZmZmJyxcbiAgICAgICAgICAgJ0E3MDAnOiAnZmZmZmZmJyxcbiAgICAgICAgICAgJ2NvbnRyYXN0RGVmYXVsdENvbG9yJzogJ2RhcmsnLFxuICAgICAgICAgICAnY29udHJhc3REYXJrQ29sb3JzJzogW1xuICAgICAgICAgICAgICc1MCcsXG4gICAgICAgICAgICAgJzEwMCcsXG4gICAgICAgICAgICAgJzIwMCcsXG4gICAgICAgICAgICAgJzMwMCcsXG4gICAgICAgICAgICAgJzQwMCcsXG4gICAgICAgICAgICAgJzUwMCcsXG4gICAgICAgICAgICAgJzYwMCcsXG4gICAgICAgICAgICAgJzcwMCcsXG4gICAgICAgICAgICAgJzgwMCcsXG4gICAgICAgICAgICAgJzkwMCcsXG4gICAgICAgICAgICAgJ0ExMDAnLFxuICAgICAgICAgICAgICdBMjAwJyxcbiAgICAgICAgICAgICAnQTQwMCcsXG4gICAgICAgICAgICAgJ0E3MDAnXG4gICAgICAgICAgIF0sXG4gICAgICAgICAgICdjb250cmFzdExpZ2h0Q29sb3JzJzogW11cbiAgICAgICAgIH0pO1xuXG4gICAgICAgICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnanVzdGljYXInKVxuICAgICAgICAgICAgLnByaW1hcnlQYWxldHRlKCdqdXN0aWNhclByaW1hcnknKVxuICAgICAgICAgICAgLmFjY2VudFBhbGV0dGUoJ2p1c3RpY2FyQWNjZW50JylcbiAgICAgICAgICAgIC53YXJuUGFsZXR0ZSgnanVzdGljYXJXYXJuJylcbiAgICAgICAgICAgIC5iYWNrZ3JvdW5kUGFsZXR0ZSgnanVzdGljYXJCYWNrZ3JvdW5kJyk7XG5cbiAgICAgICAgLy8gc2V0dGluZyBpdCBhcyBkZWZhdWx0IHRoZW1lXG4gICAgICAgICRtZFRoZW1pbmdQcm92aWRlci5zZXREZWZhdWx0VGhlbWUoJ2p1c3RpY2FyJyk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNldHRpbmcgdXAgc3RhdGUgbWFjaGluZVxuICAgICAgICAgKi9cbiAgICAgICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZShcIi9zdGFydFwiKTtcblxuXG4gICAgfVxuXSkucnVuKFtcbiAgICAnJHJvb3RTY29wZScsXG4gICAgJyRsb2cnLFxuICAgICckdHJhbnNpdGlvbnMnLFxuICAgICdKdXN0aWNhckFQSScsXG4gICAgZnVuY3Rpb24oJHJvb3RTY29wZSwgJGxvZywgJHRyYW5zaXRpb25zLCBKdXN0aWNhckFQSSkge1xuXG4gICAgfVxuXSk7XG5cbmFuZ3VsYXIubW9kdWxlKFwiSnVzdGljYXIuV2ViQ2xpZW50XCIpLmNvbnRyb2xsZXIoXCJNYWluQ3RybFwiLCBbJyRzY29wZScsICckbG9nJywgJyRtZFNpZGVuYXYnLCAnSnVzdGljYXJBdXRoJyxcbiAgZnVuY3Rpb24oJHNjb3BlLCAkbG9nLCAkbWRTaWRlbmF2LCBKdXN0aWNhckF1dGgpIHtcbiAgICAvKipcbiAgICAgKiBUb2dnbGUgc2lkZW5hdiBvbiBidXR0b24gY2xpY2tcbiAgICAgKi9cbiAgICAkc2NvcGUudG9nZ2xlU2lkZW5hdiA9IGZ1bmN0aW9uKCkge1xuICAgICAgJG1kU2lkZW5hdihcInNpZGVuYXZcIikudG9nZ2xlKCk7XG4gICAgfTtcblxuICAgIEp1c3RpY2FyQXV0aC5pbml0KCk7XG4gIH1cbl0pO1xuIiwiLyoqXG4gKiBAbmFtZXNwYWNlIEp1c3RpY2FyLldlYkNsaWVudC5BUElcbiAqIHNldHMgdXAgdGhlIEFQSSBjb25maWd1cmF0aW9uXG4gKi9cbmxldCBtb2R1bGVBUEkgPSBhbmd1bGFyLm1vZHVsZShcIkp1c3RpY2FyLldlYkNsaWVudC5BUElcIiwgWyduZ1Jlc291cmNlJ10pO1xuXG4vKipcbiAqIFN0b3JlcyBiYXNlIFVSTCBmb3IgYXBpXG4gKi9cbm1vZHVsZUFQSS5jb25zdGFudChcIkFQSV9VUkxcIiwgXCJodHRwOi8vMTI3LjAuMC4xOjMwMDAvYXBpXCIpO1xuXG5tb2R1bGVBUEkuc2VydmljZShcIkp1c3RpY2FyQVBJXCIsIFsnJGh0dHAnLCAnJHJlc291cmNlJywgJyRsb2cnLCAnJHEnLCAnQVBJX1VSTCcsXG4gIGZ1bmN0aW9uKCRodHRwLCAkcmVzb3VyY2UsICRsb2csICRxLCBBUElfVVJMKSB7XG4gICAgICBsZXQgSnVzdGljYXJBUEkgPSB7fTtcblxuICAgICAgLyoqXG4gICAgICAgKiBBdXRoIGZ1bmN0aW9ucyB1c2VkIGZvciBhdXRoIGFuZCB1c2VyIG1hbmFnZW1lbnRcbiAgICAgICAqL1xuICAgICAgSnVzdGljYXJBUEkuYXV0aCA9IHt9O1xuXG4gICAgICBKdXN0aWNhckFQSS5hdXRoLmxvZ2luID0gZnVuY3Rpb24oZW1haWwsIHBhc3N3b3JkKSB7XG4gICAgICAgIHJldHVybiAkaHR0cC5wb3N0KEFQSV9VUkwgKyBcIi91c2VyL2xvZ2luXCIsIHtcblxuICAgICAgICAgICAgdXNlcm5hbWU6IGVtYWlsLFxuICAgICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkXG4gICAgICAgICAgXG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgSnVzdGljYXJBUEkuYXV0aC5sb2dvdXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoQVBJX1VSTCArIFwiL3VzZXIvbG9nb3V0XCIpO1xuICAgICAgfTtcblxuICAgICAgSnVzdGljYXJBUEkuYXV0aC5jdXJyZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAkaHR0cC5nZXQoQVBJX1VSTCArIFwiL3VzZXIvY3VycmVudFwiKTtcbiAgICAgIH07XG5cbiAgICAgIEp1c3RpY2FyQVBJLmF1dGgucmVnaXN0ZXIgPSBmdW5jdGlvbihlbWFpbCwgcGFzc3dvcmQpIHtcbiAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoQVBJX1VSTCArIFwiL3VzZXIvcmVnaXN0ZXJcIiwge1xuICAgICAgICAgIHVzZXI6IHtcbiAgICAgICAgICAgIGVtYWlsOiBlbWFpbCxcbiAgICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZFxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gSnVzdGljYXJBUEk7XG4gIH1cbl0pO1xuIiwiLyoqXG4gKiBAbmFtZXNwYWNlIEp1c3RpY2FyLldlYkNsaWVudC5BdXRoXG4gKiBoYW5kbGVzIGxvZ2luIGFuZCBjaGVja2luZyBwZXJtaXNzaW9uc1xuICovXG5sZXQgbW9kdWxlQXV0aCA9IGFuZ3VsYXIubW9kdWxlKFwiSnVzdGljYXIuV2ViQ2xpZW50LkF1dGhcIiwgWyduZ1Jlc291cmNlJywgJ0p1c3RpY2FyLldlYkNsaWVudC5BUEknXSk7XG5cbi8qKlxuICpcbiAqL1xuXG5tb2R1bGVBdXRoLnNlcnZpY2UoXCJKdXN0aWNhckF1dGhcIiwgWyckaHR0cCcsICckcmVzb3VyY2UnLCAnJGxvZycsICckcScsICckbWRQYW5lbCcsICdKdXN0aWNhckFQSScsXG4gIGZ1bmN0aW9uKCRodHRwLCAkcmVzb3VyY2UsICRsb2csICRxLCAkbWRQYW5lbCwgSnVzdGljYXJBUEkpIHtcbiAgICAgIGxldCBKdXN0aWNhckF1dGggPSB7fTtcblxuICAgICAgSnVzdGljYXJBdXRoLmN1cnJlbnRVc2VyID0gbnVsbDtcblxuICAgICAgLyoqXG4gICAgICAgKiBMb2dpbiB0byBzeXN0ZW1cbiAgICAgICAqL1xuICAgICAgSnVzdGljYXJBdXRoLmluaXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgSnVzdGljYXJBUEkuYXV0aC5jdXJyZW50KCkudGhlbihcbiAgICAgICAgICBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgSnVzdGljYXJBdXRoLmN1cnJlbnRVc2VyID0gcmVzcG9uc2UuZGF0YS51c2VyO1xuXG4gICAgICAgICAgfVxuICAgICAgICApLmNhdGNoKFxuICAgICAgICAgIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgSnVzdGljYXJBdXRoLmN1cnJlbnRVc2VyID0gbnVsbDtcbiAgICAgICAgICAgIEp1c3RpY2FyQXV0aC5vcGVuTG9naW5QYW5lbCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH07XG5cbiAgICAgIC8qKlxuICAgICAgICogTG9naW4gdG8gc3lzdGVtXG4gICAgICAgKi9cbiAgICAgIEp1c3RpY2FyQXV0aC5sb2dpbiA9IGZ1bmN0aW9uKGVtYWlsLCBwYXNzd29yZCkge1xuICAgICAgICBKdXN0aWNhckFQSS5hdXRoLmxvZ2luKGVtYWlsLCBwYXNzd29yZCkudGhlbihcbiAgICAgICAgICBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgSnVzdGljYXJBdXRoLmN1cnJlbnRVc2VyID0gcmVzcG9uc2UuZGF0YS51c2VyO1xuICAgICAgICAgIH1cbiAgICAgICAgKS5jYXRjaChcbiAgICAgICAgICBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIC8vIEBUT0RPIGJldHRlciBoYW5kbGluZyBvZiByZXN1bHRzLCBmYWlsZWQgbG9naW4sIGV0Yy5cbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnIpO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH07XG5cbiAgICAgIC8qKlxuICAgICAgICogTG9nb3V0IG9mIHN5c3RlbVxuICAgICAgICovXG4gICAgICBKdXN0aWNhckF1dGgubG9nb3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIEp1c3RpY2FyQVBJLmF1dGgubG9nb3V0KCkudGhlbihcbiAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIEp1c3RpY2FyQXV0aC5jdXJyZW50VXNlciA9IG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICApLmNhdGNoKFxuICAgICAgICAgIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgLy8gQFRPRE8gYmV0dGVyIGhhbmRsaW5nIG9mIHJlc3VsdHMsIGZhaWxlZCBsb2dpbiwgZXRjLlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycik7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfTtcblxuICAgICAgLyoqXG4gICAgICAgKiBSZWdpc3RlciBuZXcgdXNlclxuICAgICAgICovXG4gICAgICBKdXN0aWNhckF1dGgucmVnaXN0ZXIgPSBmdW5jdGlvbihlbWFpbCwgcGFzc3dvcmQpIHtcbiAgICAgICAgSnVzdGljYXJBUEkuYXV0aC5yZWdpc3RlcihlbWFpbCwgcGFzc3dvcmQpLnRoZW4oXG4gICAgICAgICAgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIEp1c3RpY2FyQXV0aC5jdXJyZW50VXNlciA9IHJlc3BvbnNlLmRhdGEudXNlcjsgLy8gdGhpcyBpcyBsaWtlbHkgd3JvbmdcbiAgICAgICAgICB9XG4gICAgICAgICkuY2F0Y2goXG4gICAgICAgICAgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAvLyBAVE9ETyBiZXR0ZXIgaGFuZGxpbmcgb2YgcmVzdWx0cywgZmFpbGVkIGxvZ2luLCBldGMuXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICB9O1xuXG4gICAgICAvKipcbiAgICAgICAqIE9wZW4gbW9kYWwgcGFuZWwgZm9yIGxvZ2dpbmcgaW5zcGVjdFxuICAgICAgICovXG4gICAgICBKdXN0aWNhckF1dGgub3BlbkxvZ2luUGFuZWwgPSBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0gJHEuZGVmZXIoKTtcblxuICAgICAgICBsZXQgcGFuZWxQb3NpdGlvbiA9ICRtZFBhbmVsLm5ld1BhbmVsUG9zaXRpb24oKVxuICAgICAgICAgIC5hYnNvbHV0ZSgpXG4gICAgICAgICAgLmNlbnRlcigpO1xuXG4gICAgICAgIGxldCBwYW5lbEFuaW1hdGlvbiA9ICRtZFBhbmVsLm5ld1BhbmVsQW5pbWF0aW9uKClcbiAgICAgICAgICAub3BlbkZyb20oeyB0b3A6IDEsIHJpZ2h0OjAgfSlcbiAgICAgICAgICAuZHVyYXRpb24oMjAwKVxuICAgICAgICAgIC5jbG9zZVRvKHsgdG9wOiAxLCByaWdodDowIH0pXG4gICAgICAgICAgLndpdGhBbmltYXRpb24oJG1kUGFuZWwuYW5pbWF0aW9uLlNDQUxFKTtcblxuICAgICAgICBsZXQgcGFuZWxDb25maWcgPSB7XG4gICAgICAgICAgYXR0YWNoVG86IGFuZ3VsYXIuZWxlbWVudChkb2N1bWVudC5ib2R5KSxcbiAgICAgICAgICBjb250cm9sbGVyOiAnTG9naW5DdHJsJyxcbiAgICAgICAgICBkaXNhYmxlUGFyZW50U2Nyb2xsOiB0cnVlLFxuICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL3BhcnRpYWxzL3BhbmVscy9sb2dpbicsXG4gICAgICAgICAgcGFuZWxDbGFzczogXCJqdXN0aWNhci1wYW5lbFwiLFxuICAgICAgICAgIHpJbmRleDogMTUwLFxuICAgICAgICAgIGxvY2Fsczoge1xuICAgICAgICAgICAgZGVmZXJyZWQ6IGRlZmVycmVkXG4gICAgICAgICAgfSxcbiAgICAgICAgICB0cmFwRm9jdXM6IHRydWUsXG4gICAgICAgICAgY2xpY2tPdXRzaWRlVG9DbG9zZTogdHJ1ZSxcbiAgICAgICAgICBjbGlja0VzY2FwZVRvQ2xvc2U6IHRydWUsXG4gICAgICAgICAgaGFzQmFja2Ryb3A6IHRydWUsXG4gICAgICAgICAgcG9zaXRpb246IHBhbmVsUG9zaXRpb24sXG4gICAgICAgICAgYW5pbWF0aW9uOiBwYW5lbEFuaW1hdGlvblxuICAgICAgICB9O1xuXG4gICAgICAgICRtZFBhbmVsLm9wZW4ocGFuZWxDb25maWcpO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgfTtcblxuICAgICAgLyoqXG4gICAgICAgKiBPcGVuIHJlZ2lzdHJhdGlvbiBwYW5lbFxuICAgICAgICovXG4gICAgICBKdXN0aWNhckF1dGgub3BlblJlZ2lzdGVyUGFuZWwgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0gJHEuZGVmZXIoKTtcblxuICAgICAgICBsZXQgcGFuZWxQb3NpdGlvbiA9ICRtZFBhbmVsLm5ld1BhbmVsUG9zaXRpb24oKVxuICAgICAgICAgIC5hYnNvbHV0ZSgpXG4gICAgICAgICAgLmNlbnRlcigpO1xuXG4gICAgICAgIGxldCBwYW5lbEFuaW1hdGlvbiA9ICRtZFBhbmVsLm5ld1BhbmVsQW5pbWF0aW9uKClcbiAgICAgICAgICAub3BlbkZyb20oe3RvcDogMSwgbGVmdDogMX0pXG4gICAgICAgICAgLmR1cmF0aW9uKDIwMClcbiAgICAgICAgICAuY2xvc2VUbyh7dG9wOiAxLCBsZWZ0OiAxfSlcbiAgICAgICAgICAud2l0aEFuaW1hdGlvbigkbWRQYW5lbC5hbmltYXRpb24uU0NBTEUpO1xuXG4gICAgICAgIGxldCBwYW5lbENvbmZpZyA9IHtcbiAgICAgICAgICBhdHRhY2hUbzogYW5ndWxhci5lbGVtZW50KGRvY3VtZW50LmJvZHkpLFxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdSZWdpc3RlckN0cmwnLFxuICAgICAgICAgIGRpc2FibGVQYXJlbnRTY3JvbGw6IHRydWUsXG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICcvcGFydGlhbHMvcGFuZWxzL3JlZ2lzdGVyJyxcbiAgICAgICAgICBwYW5lbENsYXNzOiBcImp1c3RpY2FyLXBhbmVsXCIsXG4gICAgICAgICAgekluZGV4OiAxNzUsXG4gICAgICAgICAgbG9jYWxzOiB7XG4gICAgICAgICAgICBkZWZlcnJlZDogZGVmZXJyZWRcbiAgICAgICAgICB9LFxuICAgICAgICAgIHRyYXBGb2N1czogdHJ1ZSxcbiAgICAgICAgICBjbGlja091dHNpZGVUb0Nsb3NlOiB0cnVlLFxuICAgICAgICAgIGNsaWNrRXNjYXBlVG9DbG9zZTogdHJ1ZSxcbiAgICAgICAgICBoYXNCYWNrZHJvcDogdHJ1ZSxcbiAgICAgICAgICBwb3NpdGlvbjogcGFuZWxQb3NpdGlvbixcbiAgICAgICAgICBhbmltYXRpb246IHBhbmVsQW5pbWF0aW9uXG4gICAgICAgIH07XG5cbiAgICAgICAgJG1kUGFuZWwub3BlbihwYW5lbENvbmZpZyk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICB9O1xuXG4gICAgICAvKipcbiAgICAgICAqIENoZWNrIHBlcm1pc3Npb25zIGJhc2VkIG9uIGEgc3RyaW5nXG4gICAgICAgKi9cbiAgICAgIEp1c3RpY2FyQXV0aC5jaGVja1Blcm1pc3Npb25zID0gZnVuY3Rpb24ocGVybWlzc2lvbikge1xuICAgICAgICAvLyBAVE9ET1xuICAgICAgfTtcblxuXG4gICAgICByZXR1cm4gSnVzdGljYXJBdXRoO1xuICB9XG5dKTtcblxubW9kdWxlQXV0aC5jb250cm9sbGVyKCdMb2dpbkN0cmwnLCBbJ21kUGFuZWxSZWYnLCAnJHNjb3BlJywgJyRsb2cnLCAnSnVzdGljYXJBUEknLCAnSnVzdGljYXJBdXRoJyxcbiAgZnVuY3Rpb24obWRQYW5lbFJlZiwgJHNjb3BlLCAkbG9nLCBKdXN0aWNhckFQSSwgSnVzdGljYXJBdXRoKSB7XG4gICAgJHNjb3BlLndhaXRpbmcgPSBmYWxzZTtcbiAgICAkc2NvcGUuZXJyb3JNc3NnID0gXCJcIjtcbiAgICAvKipcbiAgICAgKiBIYW5kbGUgY2xpY2tpbmcgbG9naW4gYnV0dG9uLCB1c2luZyAkc2NvcGUudXNlckVtYWlsICYgJHNjb3BlLnVzZXJQYXNzd29yZFxuICAgICAqL1xuICAgICRzY29wZS5vbkNsaWNrTG9naW4gPSBmdW5jdGlvbigpIHtcbiAgICAgIC8vIGxvZ2luIGFuZCBjbG9zZSBpZiBzdWNjZXNzZnVsXG4gICAgICAkc2NvcGUud2FpdGluZyA9IHRydWU7XG5cbiAgICAgIEp1c3RpY2FyQVBJLmF1dGgubG9naW4oJHNjb3BlLnVzZXJFbWFpbCwgJHNjb3BlLnVzZXJQYXNzd29yZCkudGhlbihcbiAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJHNjb3BlLndhaXRpbmcgPSBmYWxzZTtcbiAgICAgICAgICBtZFBhbmVsUmVmLmNsb3NlKCk7XG4gICAgICAgIH1cbiAgICAgICkuY2F0Y2goXG4gICAgICAgIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICRsb2cuZXJyb3IoZXJyKTtcbiAgICAgICAgICAkc2NvcGUuZXJyb3JNc3NnID0gXCJFcnJvciBsb2dnaW5nIGluLlwiO1xuICAgICAgICAgICRzY29wZS53YWl0aW5nID0gZmFsc2U7XG4gICAgICAgICAgLy8gQFRPRE8gYmV0dGVyIG1lc3NhZ2luZ1xuICAgICAgICB9XG4gICAgICApO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgY2xpY2tpbmcgcmVnaXN0ZXIgYnV0dG9uXG4gICAgICovXG4gICAgJHNjb3BlLm9uQ2xpY2tSZWdpc3RlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgSnVzdGljYXJBdXRoLm9wZW5SZWdpc3RlclBhbmVsKCk7XG4gICAgICBtZFBhbmVsUmVmLmNsb3NlKCk7XG4gICAgfTtcblxuICAgICRzY29wZS5vbkNsaWNrQ2xvc2UgPSBmdW5jdGlvbigpIHtcbiAgICAgIG1kUGFuZWxSZWYuY2xvc2UoKTtcbiAgICB9O1xuICB9XG5dKTtcblxuXG5tb2R1bGVBdXRoLmNvbnRyb2xsZXIoJ1JlZ2lzdGVyQ3RybCcsIFsnbWRQYW5lbFJlZicsICckc2NvcGUnLCAnJGxvZycsICdKdXN0aWNhckFQSScsICdKdXN0aWNhckF1dGgnLFxuICBmdW5jdGlvbihtZFBhbmVsUmVmLCAkc2NvcGUsICRsb2csIEp1c3RpY2FyQVBJLCBKdXN0aWNhckF1dGgpIHtcbiAgICAkc2NvcGUud2FpdGluZyA9IGZhbHNlO1xuICAgICRzY29wZS5lcnJvck1zc2cgPSBcIlwiO1xuICAgIC8qKlxuICAgICAqIEhhbmRsZSBjbGlja2luZyByZWdpc3RlciBidXR0b25cbiAgICAgKi9cbiAgICAkc2NvcGUub25DbGlja1JlZ2lzdGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAvLyBsb2dpbiBhbmQgY2xvc2UgaWYgc3VjY2Vzc2Z1bFxuICAgICAgJHNjb3BlLndhaXRpbmcgPSB0cnVlO1xuXG4gICAgICBKdXN0aWNhckFQSS5hdXRoLnJlZ2lzdGVyKCRzY29wZS51c2VyRW1haWwsICRzY29wZS51c2VyUGFzc3dvcmQpLnRoZW4oXG4gICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICRzY29wZS53YWl0aW5nID0gZmFsc2U7XG4gICAgICAgICAgbWRQYW5lbFJlZi5jbG9zZSgpO1xuICAgICAgICB9XG4gICAgICApLmNhdGNoKFxuICAgICAgICBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAkbG9nLmVycm9yKGVycik7XG4gICAgICAgICAgJHNjb3BlLmVycm9yTXNzZyA9IFwiRXJyb3IgcmVnaXN0ZXJpbmcuXCI7XG4gICAgICAgICAgJHNjb3BlLndhaXRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAvLyBAVE9ETyBiZXR0ZXIgbWVzc2FnaW5nXG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBjbGlja2luZyBsb2dpbiBidXR0b25cbiAgICAgKi9cbiAgICAkc2NvcGUub25DbGlja0xvZ2luID0gZnVuY3Rpb24oKSB7XG4gICAgICBKdXN0aWNhckF1dGgub3BlbkxvZ2luUGFuZWwoKTtcbiAgICAgIG1kUGFuZWxSZWYuY2xvc2UoKTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLm9uQ2xpY2tDbG9zZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgbWRQYW5lbFJlZi5jbG9zZSgpO1xuICAgIH07XG4gIH1cbl0pO1xuIiwiLyoqXG4gKiBAbmFtZXNwYWNlIEp1c3RpY2FyLldlYkNsaWVudC5TdGF0ZXMuQWRtaW5cbiAqIFN0b3JlcyBhbGwgdGhlIHN0YXRlcyBmb3IgdGhlIEFuZ3VsYXIgVUkgcm91dGVyIHN0YXRlIG1hY2hpbmUgYW5kIGFzc29jaWF0ZXMgY29udHJvbGxlcnNcbiAqL1xubGV0IHN0YXRlQWRtaW4gPSBhbmd1bGFyLm1vZHVsZShcIkp1c3RpY2FyLldlYkNsaWVudC5TdGF0ZXMuQWRtaW5cIiwgW1xuICAndWkucm91dGVyJ1xuXSk7XG5cbi8qKlxuICogU3RhdGUgbmFtZSBmb3IgdGhpcyBzdGF0ZVxuICovXG5zdGF0ZUFkbWluLmNvbnN0YW50KFwiQURNSU5fU1RBVEVcIiwgXCJhZG1pblwiKTtcblxuLyoqXG4gKiBTdWItVVJMIGZvciB0aGlzIHN0YXRlXG4gKi9cbnN0YXRlQWRtaW4uY29uc3RhbnQoXCJBRE1JTl9TVEFURV9VUkxcIiwgXCIvYWRtaW5cIik7XG5cbi8qKlxuICogQ29uZmlnIGFjdGlvbiB0aGF0IHNldHMgdXAgdGhpcyBtb2R1bGVcbiAqL1xuc3RhdGVBZG1pbi5jb25maWcoW1xuICAnJHN0YXRlUHJvdmlkZXInLFxuICAnQURNSU5fU1RBVEUnLFxuICAnQURNSU5fU1RBVEVfVVJMJyxcbiAgZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsIEFETUlOX1NUQVRFLCBBRE1JTl9TVEFURV9VUkwpIHtcblxuICAgIC8qKlxuICAgICAqIFNldCB1cCBzdGF0ZSBpbiBhcHBsaWNhdGlvbiBzdGF0ZSBtYWNoaW5lLlxuICAgICAqL1xuICAgICRzdGF0ZVByb3ZpZGVyXG4gICAgICAuc3RhdGUoQURNSU5fU1RBVEUsIHtcbiAgICAgICAgdXJsOiBBRE1JTl9TVEFURV9VUkwsXG4gICAgICAgIHBhcmFtczoge30sXG4gICAgICAgIGFic3RyYWN0OiB0cnVlXG4gICAgICB9KVxuICAgIDtcbiAgfVxuXSk7XG4iLCJyZXF1aXJlKFwiLi9sYW5kaW5nL2luZGV4LmpzXCIpO1xucmVxdWlyZShcIi4vcGxheWVyL2luZGV4LmpzXCIpO1xucmVxdWlyZShcIi4vYWRtaW4vaW5kZXguanNcIik7XG5cbi8qKlxuICogQG5hbWVzcGFjZSBKdXN0aWNhci5XZWJDbGllbnQuU3RhdGVzXG4gKiBTdG9yZXMgYWxsIHRoZSBzdGF0ZXMgZm9yIHRoZSBBbmd1bGFyIFVJIHJvdXRlciBzdGF0ZSBtYWNoaW5lIGFuZCBhc3NvY2lhdGVzIGNvbnRyb2xsZXJzXG4gKi9cbmFuZ3VsYXIubW9kdWxlKFwiSnVzdGljYXIuV2ViQ2xpZW50LlN0YXRlc1wiLCBbXG4gICdKdXN0aWNhci5XZWJDbGllbnQuU3RhdGVzLkxhbmRpbmcnLFxuICAnSnVzdGljYXIuV2ViQ2xpZW50LlN0YXRlcy5QbGF5ZXInLFxuICAnSnVzdGljYXIuV2ViQ2xpZW50LlN0YXRlcy5BZG1pbicsXG5dKTtcbiIsIi8qKlxuICogQG5hbWVzcGFjZSBKdXN0aWNhci5XZWJDbGllbnQuU3RhdGVzLkxhbmRpbmdcbiAqIFN0b3JlcyBhbGwgdGhlIHN0YXRlcyBmb3IgdGhlIEFuZ3VsYXIgVUkgcm91dGVyIHN0YXRlIG1hY2hpbmUgYW5kIGFzc29jaWF0ZXMgY29udHJvbGxlcnNcbiAqL1xubGV0IHN0YXRlTGFuZGluZyA9IGFuZ3VsYXIubW9kdWxlKFwiSnVzdGljYXIuV2ViQ2xpZW50LlN0YXRlcy5MYW5kaW5nXCIsIFtcbiAgJ3VpLnJvdXRlcidcbl0pO1xuXG4vKipcbiAqIFN0YXRlIG5hbWUgZm9yIHRoaXMgc3RhdGVcbiAqL1xuc3RhdGVMYW5kaW5nLmNvbnN0YW50KFwiTEFORElOR19TVEFURVwiLCBcImxhbmRpbmdcIik7XG5cbi8qKlxuICogU3ViLVVSTCBmb3IgdGhpcyBzdGF0ZVxuICovXG5zdGF0ZUxhbmRpbmcuY29uc3RhbnQoXCJMQU5ESU5HX1NUQVRFX1VSTFwiLCBcIi9zdGFydFwiKTtcblxuLyoqXG4gKiBMb2NhdGlvbiB0byBsb2FkIHZpZXcgZnJvbVxuICovXG5zdGF0ZUxhbmRpbmcuY29uc3RhbnQoXCJMQU5ESU5HX1RFTVBMQVRFX1VSTFwiLCBcIi9wYXJ0aWFscy9zdGF0ZXMvbGFuZGluZ1wiKTtcblxuLyoqXG4gKiBDb25maWcgYWN0aW9uIHRoYXQgc2V0cyB1cCB0aGlzIG1vZHVsZVxuICovXG5zdGF0ZUxhbmRpbmcuY29uZmlnKFtcbiAgJyRzdGF0ZVByb3ZpZGVyJyxcbiAgJ0xBTkRJTkdfU1RBVEUnLFxuICAnTEFORElOR19TVEFURV9VUkwnLFxuICAnTEFORElOR19URU1QTEFURV9VUkwnLFxuICBmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgTEFORElOR19TVEFURSwgTEFORElOR19TVEFURV9VUkwsIExBTkRJTkdfVEVNUExBVEVfVVJMKSB7XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdXAgc3RhdGUgaW4gYXBwbGljYXRpb24gc3RhdGUgbWFjaGluZS5cbiAgICAgKi9cbiAgICAkc3RhdGVQcm92aWRlclxuICAgICAgLnN0YXRlKExBTkRJTkdfU1RBVEUsIHtcbiAgICAgICAgdXJsOiBMQU5ESU5HX1NUQVRFX1VSTCxcbiAgICAgICAgcGFyYW1zOiB7fSxcbiAgICAgICAgY29udHJvbGxlcjogXCJTdGF0ZUxhbmRpbmdDdHJsXCIsXG4gICAgICAgIHRlbXBsYXRlVXJsOiBMQU5ESU5HX1RFTVBMQVRFX1VSTFxuICAgICAgfSlcbiAgICA7XG4gIH1cbl0pO1xuXG4vKipcbiAqIENvbnRyb2xsZXIgZm9yIHN0YXRlXG4gKi9cbnN0YXRlTGFuZGluZy5jb250cm9sbGVyKFwiU3RhdGVMYW5kaW5nQ3RybFwiLCBbXG4gIGZ1bmN0aW9uKCkge1xuXG4gIH1cbl0pO1xuIiwiLyoqXG4gKiBAbmFtZXNwYWNlIEp1c3RpY2FyLldlYkNsaWVudC5TdGF0ZXMuUGxheWVyXG4gKiBTdG9yZXMgYWxsIHRoZSBzdGF0ZXMgZm9yIHRoZSBBbmd1bGFyIFVJIHJvdXRlciBzdGF0ZSBtYWNoaW5lIGFuZCBhc3NvY2lhdGVzIGNvbnRyb2xsZXJzXG4gKi9cbmxldCBzdGF0ZVBsYXllciA9IGFuZ3VsYXIubW9kdWxlKFwiSnVzdGljYXIuV2ViQ2xpZW50LlN0YXRlcy5QbGF5ZXJcIiwgW1xuICAndWkucm91dGVyJ1xuXSk7XG5cbi8qKlxuICogU3RhdGUgbmFtZSBmb3IgdGhpcyBzdGF0ZVxuICovXG5zdGF0ZVBsYXllci5jb25zdGFudChcIlBMQVlFUl9TVEFURVwiLCBcInBsYXllclwiKTtcblxuLyoqXG4gKiBTdWItVVJMIGZvciB0aGlzIHN0YXRlXG4gKi9cbnN0YXRlUGxheWVyLmNvbnN0YW50KFwiUExBWUVSX1NUQVRFX1VSTFwiLCBcIi9wbGF5ZXJcIik7XG5cbi8qKlxuICogQ29uZmlnIGFjdGlvbiB0aGF0IHNldHMgdXAgdGhpcyBtb2R1bGVcbiAqL1xuc3RhdGVQbGF5ZXIuY29uZmlnKFtcbiAgJyRzdGF0ZVByb3ZpZGVyJyxcbiAgJ1BMQVlFUl9TVEFURScsXG4gICdQTEFZRVJfU1RBVEVfVVJMJyxcbiAgZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsIFBMQVlFUl9TVEFURSwgUExBWUVSX1NUQVRFX1VSTCkge1xuXG4gICAgLyoqXG4gICAgICogU2V0IHVwIHN0YXRlIGluIGFwcGxpY2F0aW9uIHN0YXRlIG1hY2hpbmUuXG4gICAgICovXG4gICAgJHN0YXRlUHJvdmlkZXJcbiAgICAgIC5zdGF0ZShQTEFZRVJfU1RBVEUsIHtcbiAgICAgICAgdXJsOiBQTEFZRVJfU1RBVEVfVVJMLFxuICAgICAgICBwYXJhbXM6IHt9LFxuICAgICAgICBhYnN0cmFjdDogdHJ1ZVxuICAgICAgfSlcbiAgICA7XG4gIH1cbl0pO1xuIl19
