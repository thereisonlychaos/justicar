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
  $urlRouterProvider.otherwise("/landing");
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
angular.module("Justicar.WebClient.States.Admin", []);

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
angular.module("Justicar.WebClient.States.Landing", []);

},{}],7:[function(require,module,exports){
"use strict";

/**
 * @namespace Justicar.WebClient.States.Player
 * Stores all the states for the Angular UI router state machine and associates controllers
 */
angular.module("Justicar.WebClient.States.Player", []);

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvY2xpZW50LmpzIiwiY2xpZW50L21vZHVsZXMvYXBpL2luZGV4LmpzIiwiY2xpZW50L21vZHVsZXMvYXV0aC9pbmRleC5qcyIsImNsaWVudC9zdGF0ZXMvYWRtaW4vaW5kZXguanMiLCJjbGllbnQvc3RhdGVzL2luZGV4LmpzIiwiY2xpZW50L3N0YXRlcy9sYW5kaW5nL2luZGV4LmpzIiwiY2xpZW50L3N0YXRlcy9wbGF5ZXIvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7O0FBR0E7O0FBRUE7O0FBQ0EsUUFBUSx3QkFBUjtBQUNBLFFBQVEseUJBQVI7O0FBRUE7O0FBRUE7QUFDQSxRQUFRLG1CQUFSOztBQUVBOzs7QUFHQSxRQUFRLE1BQVIsQ0FBZSxvQkFBZixFQUFxQztBQUNqQztBQUNBLFlBRmlDLEVBRW5CO0FBQ2QsWUFIaUMsRUFHbkI7QUFDZCxZQUppQyxFQUluQjtBQUNkLFdBTGlDLEVBS3BCO0FBQ2IsZUFOaUMsRUFPakMsZ0JBUGlDLEVBUWpDLG9CQVJpQyxFQVFYO0FBQ3RCLFdBVGlDOztBQVdqQztBQUNBLHdCQVppQyxFQWFqQyx5QkFiaUMsRUFjakMsMkJBZGlDLENBQXJDLEVBZUcsTUFmSCxDQWVVLENBQ04sbUJBRE0sRUFFTixvQkFGTSxFQUdOLG9CQUhNLEVBSU4sVUFBUyxpQkFBVCxFQUE0QixrQkFBNUIsRUFBZ0Qsa0JBQWhELEVBQW9FO0FBQ2hFOzs7QUFHQSxvQkFBa0IsVUFBbEIsQ0FBNkIsRUFBN0I7QUFDQSxvQkFBa0IsU0FBbEIsQ0FBNEIsS0FBNUI7O0FBRUE7Ozs7QUFJQyxxQkFBbUIsYUFBbkIsQ0FBaUMsaUJBQWpDLEVBQW9EO0FBQ2xELFVBQU0sUUFENEM7QUFFbEQsV0FBTyxRQUYyQztBQUdsRCxXQUFPLFFBSDJDO0FBSWxELFdBQU8sUUFKMkM7QUFLbEQsV0FBTyxRQUwyQztBQU1sRCxXQUFPLFFB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IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvKipcbiAqIEBuYW1lc3BhY2UgSnVzdGljYXIuV2ViQ2xpZW50XG4gKi9cbid1c2Ugc3RyaWN0JztcblxuLy8gTG9jYWwgQW5ndWxhciBNb2R1bGVzIE9ubHkuIFBsdWdpbnMgYW5kIG90aGVyIGxpYnJhcmllcyBnbyBpbiB0aGUgbGliLmpzIGZvbGRlciB0byBtYWtlIGZvciBxdWlja2VyIGNvbXBpbGluZy5cbnJlcXVpcmUoJy4vbW9kdWxlcy9hcGkvaW5kZXguanMnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9hdXRoL2luZGV4LmpzJyk7XG5cbi8vIE1peGluc1xuXG4vLyBMb2NhbCBTdGF0ZSBNb2R1bGVzXG5yZXF1aXJlKCcuL3N0YXRlcy9pbmRleC5qcycpO1xuXG4vLyBEZWZpbmUgbWFpbiBtb2R1bGVcblxuXG5hbmd1bGFyLm1vZHVsZSgnSnVzdGljYXIuV2ViQ2xpZW50JywgW1xuICAgIC8vIEFuZ3VsYXIgTGlicmFyaWVzXG4gICAgJ25nTWF0ZXJpYWwnLCAvLyBhbmd1bGFyLW1hdGVyaWFsXG4gICAgJ25nU2FuaXRpemUnLCAvLyBhbmd1bGFyLXNhbml0aXplXG4gICAgJ25nUmVzb3VyY2UnLCAvLyBhbmd1bGFyLXJlc291cmNlXG4gICAgJ25nQW5pbWF0ZScsIC8vIGFuZ3VsYXItYW5pbWF0ZVxuICAgICdhbmd1bGFyTW9tZW50JyxcbiAgICAnYW5ndWxhci5maWx0ZXInLFxuICAgICdMb2NhbFN0b3JhZ2VNb2R1bGUnLCAvLyBhbmd1bGFyLWxvY2FsLXN0b3JhZ2VcbiAgICAndWkucm91dGVyJyxcblxuICAgIC8vIExvY2FsIG1vZHVsZXNcbiAgICAnSnVzdGljYXIuV2ViQ2xpZW50LkFQSScsXG4gICAgJ0p1c3RpY2FyLldlYkNsaWVudC5BdXRoJyxcbiAgICAnSnVzdGljYXIuV2ViQ2xpZW50LlN0YXRlcycsXG5dKS5jb25maWcoW1xuICAgICckbG9jYXRpb25Qcm92aWRlcicsXG4gICAgJyRtZFRoZW1pbmdQcm92aWRlcicsXG4gICAgJyR1cmxSb3V0ZXJQcm92aWRlcicsXG4gICAgZnVuY3Rpb24oJGxvY2F0aW9uUHJvdmlkZXIsICRtZFRoZW1pbmdQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiAkbG9jYXRpb25Qcm92aWRlciBzZXR0aW5nc1xuICAgICAgICAgKi9cbiAgICAgICAgJGxvY2F0aW9uUHJvdmlkZXIuaGFzaFByZWZpeCgnJyk7XG4gICAgICAgICRsb2NhdGlvblByb3ZpZGVyLmh0bWw1TW9kZShmYWxzZSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZW1pbmdcbiAgICAgICAgICovXG5cbiAgICAgICAgICRtZFRoZW1pbmdQcm92aWRlci5kZWZpbmVQYWxldHRlKCdqdXN0aWNhclByaW1hcnknLCB7XG4gICAgICAgICAgICc1MCc6ICdlZGUzZTMnLFxuICAgICAgICAgICAnMTAwJzogJ2QzYmFiYScsXG4gICAgICAgICAgICcyMDAnOiAnYjY4YzhjJyxcbiAgICAgICAgICAgJzMwMCc6ICc5OTVlNWUnLFxuICAgICAgICAgICAnNDAwJzogJzgzM2MzYycsXG4gICAgICAgICAgICc1MDAnOiAnNmQxOTE5JyxcbiAgICAgICAgICAgJzYwMCc6ICc2NTE2MTYnLFxuICAgICAgICAgICAnNzAwJzogJzVhMTIxMicsXG4gICAgICAgICAgICc4MDAnOiAnNTAwZTBlJyxcbiAgICAgICAgICAgJzkwMCc6ICczZTA4MDgnLFxuICAgICAgICAgICAnQTEwMCc6ICdmZjc1NzUnLFxuICAgICAgICAgICAnQTIwMCc6ICdmZjQyNDInLFxuICAgICAgICAgICAnQTQwMCc6ICdiODBjMGMnLFxuICAgICAgICAgICAnQTcwMCc6ICc5NzAwMDAnLFxuICAgICAgICAgICAnY29udHJhc3REZWZhdWx0Q29sb3InOiAnbGlnaHQnLFxuICAgICAgICAgICAnY29udHJhc3REYXJrQ29sb3JzJzogW1xuICAgICAgICAgICAgICc1MCcsXG4gICAgICAgICAgICAgJzEwMCcsXG4gICAgICAgICAgICAgJzIwMCcsXG4gICAgICAgICAgICAgJ0ExMDAnLFxuICAgICAgICAgICAgICdBMjAwJ1xuICAgICAgICAgICBdLFxuICAgICAgICAgICAnY29udHJhc3RMaWdodENvbG9ycyc6IFtcbiAgICAgICAgICAgICAnMzAwJyxcbiAgICAgICAgICAgICAnNDAwJyxcbiAgICAgICAgICAgICAnNTAwJyxcbiAgICAgICAgICAgICAnNjAwJyxcbiAgICAgICAgICAgICAnNzAwJyxcbiAgICAgICAgICAgICAnODAwJyxcbiAgICAgICAgICAgICAnOTAwJyxcbiAgICAgICAgICAgICAnQTQwMCcsXG4gICAgICAgICAgICAgJ0E3MDAnXG4gICAgICAgICAgIF1cbiAgICAgICAgIH0pO1xuICAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLmRlZmluZVBhbGV0dGUoJ2p1c3RpY2FyQWNjZW50Jywge1xuICAgICAgICAgICAnNTAnOiAnZmNmMmU3JyxcbiAgICAgICAgICAgJzEwMCc6ICdmOGRlYzMnLFxuICAgICAgICAgICAnMjAwJzogJ2YzYzg5YycsXG4gICAgICAgICAgICczMDAnOiAnZWViMjc0JyxcbiAgICAgICAgICAgJzQwMCc6ICdlYWEyNTYnLFxuICAgICAgICAgICAnNTAwJzogJ2U2OTEzOCcsXG4gICAgICAgICAgICc2MDAnOiAnZTM4OTMyJyxcbiAgICAgICAgICAgJzcwMCc6ICdkZjdlMmInLFxuICAgICAgICAgICAnODAwJzogJ2RiNzQyNCcsXG4gICAgICAgICAgICc5MDAnOiAnZDU2MjE3JyxcbiAgICAgICAgICAgJ0ExMDAnOiAnZjlkYWJhJyxcbiAgICAgICAgICAgJ0EyMDAnOiAnZjJjZGE3JyxcbiAgICAgICAgICAgJ0E0MDAnOiAnZmZjM2ExJyxcbiAgICAgICAgICAgJ0E3MDAnOiAnZmZiMjg3JyxcbiAgICAgICAgICAgJ2NvbnRyYXN0RGVmYXVsdENvbG9yJzogJ2xpZ2h0JyxcbiAgICAgICAgICAgJ2NvbnRyYXN0RGFya0NvbG9ycyc6IFtcbiAgICAgICAgICAgICAnNTAnLFxuICAgICAgICAgICAgICcxMDAnLFxuICAgICAgICAgICAgICcyMDAnLFxuICAgICAgICAgICAgICczMDAnLFxuICAgICAgICAgICAgICc0MDAnLFxuICAgICAgICAgICAgICc1MDAnLFxuICAgICAgICAgICAgICc2MDAnLFxuICAgICAgICAgICAgICc3MDAnLFxuICAgICAgICAgICAgICc4MDAnLFxuICAgICAgICAgICAgICdBMTAwJyxcbiAgICAgICAgICAgICAnQTIwMCcsXG4gICAgICAgICAgICAgJ0E0MDAnLFxuICAgICAgICAgICAgICdBNzAwJ1xuICAgICAgICAgICBdLFxuICAgICAgICAgICAnY29udHJhc3RMaWdodENvbG9ycyc6IFtcbiAgICAgICAgICAgICAnOTAwJ1xuICAgICAgICAgICBdXG4gICAgICAgICB9KTtcbiAgICAgICAgICRtZFRoZW1pbmdQcm92aWRlci5kZWZpbmVQYWxldHRlKCdqdXN0aWNhcldhcm4nLCB7XG4gICAgICAgICAgICc1MCc6ICdmZmZhZWQnLFxuICAgICAgICAgICAnMTAwJzogJ2ZmZjRkMScsXG4gICAgICAgICAgICcyMDAnOiAnZmZlY2IzJyxcbiAgICAgICAgICAgJzMwMCc6ICdmZmU0OTQnLFxuICAgICAgICAgICAnNDAwJzogJ2ZmZGY3ZCcsXG4gICAgICAgICAgICc1MDAnOiAnZmZkOTY2JyxcbiAgICAgICAgICAgJzYwMCc6ICdmZmQ1NWUnLFxuICAgICAgICAgICAnNzAwJzogJ2ZmY2Y1MycsXG4gICAgICAgICAgICc4MDAnOiAnZmZjYTQ5JyxcbiAgICAgICAgICAgJzkwMCc6ICdmZmMwMzgnLFxuICAgICAgICAgICAnQTEwMCc6ICdmZmZmZmYnLFxuICAgICAgICAgICAnQTIwMCc6ICdmZmZmZmYnLFxuICAgICAgICAgICAnQTQwMCc6ICdmZmY1ZTEnLFxuICAgICAgICAgICAnQTcwMCc6ICdmZmVkYzgnLFxuICAgICAgICAgICAnY29udHJhc3REZWZhdWx0Q29sb3InOiAnbGlnaHQnLFxuICAgICAgICAgICAnY29udHJhc3REYXJrQ29sb3JzJzogW1xuICAgICAgICAgICAgICc1MCcsXG4gICAgICAgICAgICAgJzEwMCcsXG4gICAgICAgICAgICAgJzIwMCcsXG4gICAgICAgICAgICAgJzMwMCcsXG4gICAgICAgICAgICAgJzQwMCcsXG4gICAgICAgICAgICAgJzUwMCcsXG4gICAgICAgICAgICAgJzYwMCcsXG4gICAgICAgICAgICAgJzcwMCcsXG4gICAgICAgICAgICAgJzgwMCcsXG4gICAgICAgICAgICAgJzkwMCcsXG4gICAgICAgICAgICAgJ0ExMDAnLFxuICAgICAgICAgICAgICdBMjAwJyxcbiAgICAgICAgICAgICAnQTQwMCcsXG4gICAgICAgICAgICAgJ0E3MDAnXG4gICAgICAgICAgIF0sXG4gICAgICAgICAgICdjb250cmFzdExpZ2h0Q29sb3JzJzogW11cbiAgICAgICAgIH0pO1xuICAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLmRlZmluZVBhbGV0dGUoJ2p1c3RpY2FyQmFja2dyb3VuZCcsIHtcbiAgICAgICAgICAgJzUwJzogJ2UwZTBlMCcsXG4gICAgICAgICAgICcxMDAnOiAnYjNiM2IzJyxcbiAgICAgICAgICAgJzIwMCc6ICc4MDgwODAnLFxuICAgICAgICAgICAnMzAwJzogJzRkNGQ0ZCcsXG4gICAgICAgICAgICc0MDAnOiAnMjYyNjI2JyxcbiAgICAgICAgICAgJzUwMCc6ICcwMDAwMDAnLFxuICAgICAgICAgICAnNjAwJzogJzAwMDAwMCcsXG4gICAgICAgICAgICc3MDAnOiAnMDAwMDAwJyxcbiAgICAgICAgICAgJzgwMCc6ICcwMDAwMDAnLFxuICAgICAgICAgICAnOTAwJzogJzAwMDAwMCcsXG4gICAgICAgICAgICdBMTAwJzogJ2E2YTZhNicsXG4gICAgICAgICAgICdBMjAwJzogJzhjOGM4YycsXG4gICAgICAgICAgICdBNDAwJzogJzczNzM3MycsXG4gICAgICAgICAgICdBNzAwJzogJzY2NjY2NicsXG4gICAgICAgICAgICdjb250cmFzdERlZmF1bHRDb2xvcic6ICdsaWdodCcsXG4gICAgICAgICAgICdjb250cmFzdERhcmtDb2xvcnMnOiBbXG4gICAgICAgICAgICAgJzUwJyxcbiAgICAgICAgICAgICAnMTAwJyxcbiAgICAgICAgICAgICAnMjAwJyxcbiAgICAgICAgICAgICAnQTEwMCcsXG4gICAgICAgICAgICAgJ0EyMDAnXG4gICAgICAgICAgIF0sXG4gICAgICAgICAgICdjb250cmFzdExpZ2h0Q29sb3JzJzogW1xuICAgICAgICAgICAgICczMDAnLFxuICAgICAgICAgICAgICc0MDAnLFxuICAgICAgICAgICAgICc1MDAnLFxuICAgICAgICAgICAgICc2MDAnLFxuICAgICAgICAgICAgICc3MDAnLFxuICAgICAgICAgICAgICc4MDAnLFxuICAgICAgICAgICAgICc5MDAnLFxuICAgICAgICAgICAgICdBNDAwJyxcbiAgICAgICAgICAgICAnQTcwMCdcbiAgICAgICAgICAgXVxuICAgICAgICAgfSk7XG5cbiAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdqdXN0aWNhcicpXG4gICAgICAgICAgICAucHJpbWFyeVBhbGV0dGUoJ2p1c3RpY2FyUHJpbWFyeScpXG4gICAgICAgICAgICAuYWNjZW50UGFsZXR0ZSgnanVzdGljYXJBY2NlbnQnKVxuICAgICAgICAgICAgLndhcm5QYWxldHRlKCdqdXN0aWNhcldhcm4nKVxuICAgICAgICAgICAgLmJhY2tncm91bmRQYWxldHRlKCdqdXN0aWNhckJhY2tncm91bmQnKTtcblxuICAgICAgICAvLyBzZXR0aW5nIGl0IGFzIGRlZmF1bHQgdGhlbWVcbiAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLnNldERlZmF1bHRUaGVtZSgnanVzdGljYXInKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogU2V0dGluZyB1cCBzdGF0ZSBtYWNoaW5lXG4gICAgICAgICAqL1xuICAgICAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKFwiL2xhbmRpbmdcIik7XG5cblxuICAgIH1cbl0pLnJ1bihbXG4gICAgJyRyb290U2NvcGUnLFxuICAgICckbG9nJyxcbiAgICAnJHRyYW5zaXRpb25zJyxcbiAgICAnSnVzdGljYXJBUEknLFxuICAgIGZ1bmN0aW9uKCRyb290U2NvcGUsICRsb2csICR0cmFuc2l0aW9ucywgSnVzdGljYXJBUEkpIHtcblxuICAgIH1cbl0pO1xuXG5hbmd1bGFyLm1vZHVsZShcIkp1c3RpY2FyLldlYkNsaWVudFwiKS5jb250cm9sbGVyKFwiTWFpbkN0cmxcIiwgWyckc2NvcGUnLCAnJGxvZycsICckbWRTaWRlbmF2JyxcbiAgZnVuY3Rpb24oJHNjb3BlLCAkbG9nLCAkbWRTaWRlbmF2KSB7XG4gICAgLyoqXG4gICAgICogVG9nZ2xlIHNpZGVuYXYgb24gYnV0dG9uIGNsaWNrXG4gICAgICovXG4gICAgJHNjb3BlLnRvZ2dsZVNpZGVuYXYgPSBmdW5jdGlvbigpIHtcbiAgICAgICRtZFNpZGVuYXYoXCJzaWRlbmF2XCIpLnRvZ2dsZSgpO1xuICAgIH07XG5cbiAgfVxuXSk7XG4iLCIvKipcbiAqIEBuYW1lc3BhY2UgSnVzdGljYXIuV2ViQ2xpZW50LkFQSVxuICogc2V0cyB1cCB0aGUgQVBJIGNvbmZpZ3VyYXRpb25cbiAqL1xubGV0IG1vZHVsZUFQSSA9IGFuZ3VsYXIubW9kdWxlKFwiSnVzdGljYXIuV2ViQ2xpZW50LkFQSVwiLCBbJ25nUmVzb3VyY2UnXSk7XG5cbi8qKlxuICogU3RvcmVzIGJhc2UgVVJMIGZvciBhcGlcbiAqL1xubW9kdWxlQVBJLmNvbnN0YW50KFwiQVBJX1VSTFwiLCBcImh0dHA6Ly8xMjcuMC4wLjEvYXBpXCIpO1xuXG5tb2R1bGVBUEkuc2VydmljZShcIkp1c3RpY2FyQVBJXCIsIFsnJGh0dHAnLCAnJHJlc291cmNlJywgJyRsb2cnLCAnJHEnLCAnQVBJX1VSTCcsXG4gIGZ1bmN0aW9uKCRodHRwLCAkcmVzb3VyY2UsICRsb2csICRxLCBBUElfVVJMKSB7XG4gICAgICBsZXQgSnVzdGljYXJBUEkgPSB7fTtcblxuICAgICAgLyoqXG4gICAgICAgKiBBdXRoIGZ1bmN0aW9ucyB1c2VkIGZvciBhdXRoIGFuZCB1c2VyIG1hbmFnZW1lbnRcbiAgICAgICAqL1xuICAgICAgSnVzdGljYXJBUEkuYXV0aCA9IHt9O1xuXG4gICAgICBKdXN0aWNhckFQSS5hdXRoLmxvZ2luID0gZnVuY3Rpb24oZW1haWwsIHBhc3N3b3JkKSB7XG4gICAgICAgIHJldHVybiAkaHR0cC5wb3N0KEFQSV9VUkwgKyBcIi91c2VyL2xvZ2luXCIsIHtcbiAgICAgICAgICBlbWFpbDogZW1haWwsXG4gICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkXG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgSnVzdGljYXJBUEkuYXV0aC5sb2dvdXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoQVBJX1VSTCArIFwiL3VzZXIvbG9nb3V0XCIpO1xuICAgICAgfTtcblxuICAgICAgSnVzdGljYXJBUEkuYXV0aC5jdXJyZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAkaHR0cC5nZXQoQVBJX1VSTCArIFwiL3VzZXIvY3VycmVudFwiKTtcbiAgICAgIH07XG5cbiAgICAgIEp1c3RpY2FyQVBJLmF1dGgucmVnaXN0ZXIgPSBmdW5jdGlvbihlbWFpbCwgcGFzc3dvcmQpIHtcbiAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoQVBJX1VSTCArIFwiL3VzZXIvcmVnaXN0ZXJcIiwge1xuICAgICAgICAgIGVtYWlsOiBlbWFpbCxcbiAgICAgICAgICBwYXNzd29yZDogcGFzc3dvcmRcbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gSnVzdGljYXJBUEk7XG4gIH1cbl0pO1xuIiwiLyoqXG4gKiBAbmFtZXNwYWNlIEp1c3RpY2FyLldlYkNsaWVudC5BdXRoXG4gKiBoYW5kbGVzIGxvZ2luIGFuZCBjaGVja2luZyBwZXJtaXNzaW9uc1xuICovXG5sZXQgbW9kdWxlQXV0aCA9IGFuZ3VsYXIubW9kdWxlKFwiSnVzdGljYXIuV2ViQ2xpZW50LkF1dGhcIiwgWyduZ1Jlc291cmNlJywgJ0p1c3RpY2FyLldlYkNsaWVudC5BUEknXSk7XG5cbi8qKlxuICpcbiAqL1xuXG5tb2R1bGVBdXRoLnNlcnZpY2UoXCJKdXN0aWNhckF1dGhcIiwgWyckaHR0cCcsICckcmVzb3VyY2UnLCAnJGxvZycsICckcScsICckbWRQYW5lbCcsICdKdXN0aWNhckFQSScsXG4gIGZ1bmN0aW9uKCRodHRwLCAkcmVzb3VyY2UsICRsb2csICRxLCAkbWRQYW5lbCwgSnVzdGljYXJBUEkpIHtcbiAgICAgIGxldCBKdXN0aWNhckF1dGggPSB7fTtcblxuICAgICAgSnVzdGljYXJBdXRoLmN1cnJlbnRVc2VyID0gbnVsbDtcblxuICAgICAgLyoqXG4gICAgICAgKiBMb2dpbiB0byBzeXN0ZW1cbiAgICAgICAqL1xuICAgICAgSnVzdGljYXJBdXRoLmxvZ2luID0gZnVuY3Rpb24oZW1haWwsIHBhc3N3b3JkKSB7XG4gICAgICAgIEp1c3RpY2FyQVBJLmF1dGgubG9naW4oZW1haWwsIHBhc3N3b3JkKS50aGVuKFxuICAgICAgICAgIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBKdXN0aWNhckF1dGguY3VycmVudFVzZXIgPSByZXNwb25zZS5kYXRhLnVzZXI7IC8vIHRoaXMgaXMgbGlrZWx5IHdyb25nXG4gICAgICAgICAgfVxuICAgICAgICApLmNhdGNoKFxuICAgICAgICAgIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgLy8gQFRPRE8gYmV0dGVyIGhhbmRsaW5nIG9mIHJlc3VsdHMsIGZhaWxlZCBsb2dpbiwgZXRjLlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycik7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfTtcblxuICAgICAgLyoqXG4gICAgICAgKiBMb2dvdXQgb2Ygc3lzdGVtXG4gICAgICAgKi9cbiAgICAgIEp1c3RpY2FyQXV0aC5sb2dvdXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgSnVzdGljYXJBUEkuYXV0aC5sb2dvdXQoKS50aGVuKFxuICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgSnVzdGljYXJBdXRoLmN1cnJlbnRVc2VyID0gbnVsbDsgLy8gdGhpcyBpcyBsaWtlbHkgd3JvbmdcbiAgICAgICAgICB9XG4gICAgICAgICkuY2F0Y2goXG4gICAgICAgICAgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAvLyBAVE9ETyBiZXR0ZXIgaGFuZGxpbmcgb2YgcmVzdWx0cywgZmFpbGVkIGxvZ2luLCBldGMuXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICB9O1xuXG4gICAgICAvKipcbiAgICAgICAqIFJlZ2lzdGVyIG5ldyB1c2VyXG4gICAgICAgKi9cbiAgICAgIEp1c3RpY2FyQXV0aC5yZWdpc3RlciA9IGZ1bmN0aW9uKGVtYWlsLCBwYXNzd29yZCkge1xuICAgICAgICBKdXN0aWNhckFQSS5hdXRoLnJlZ2lzdGVyKGVtYWlsLCBwYXNzd29yZCkudGhlbihcbiAgICAgICAgICBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgSnVzdGljYXJBdXRoLmN1cnJlbnRVc2VyID0gcmVzcG9uc2UuZGF0YS51c2VyOyAvLyB0aGlzIGlzIGxpa2VseSB3cm9uZ1xuICAgICAgICAgIH1cbiAgICAgICAgKS5jYXRjaChcbiAgICAgICAgICBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIC8vIEBUT0RPIGJldHRlciBoYW5kbGluZyBvZiByZXN1bHRzLCBmYWlsZWQgbG9naW4sIGV0Yy5cbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnIpO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH07XG5cbiAgICAgIC8qKlxuICAgICAgICogT3BlbiBtb2RhbCBwYW5lbCBmb3IgbG9nZ2luZyBpbnNwZWN0XG4gICAgICAgKi9cbiAgICAgIEp1c3RpY2FyQXV0aC5vcGVuTG9naW5QYW5lbCA9IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuXG4gICAgICAgIGxldCBwYW5lbFBvc2l0aW9uID0gJG1kUGFuZWwubmV3UGFuZWxQb3NpdGlvbigpXG4gICAgICAgICAgLmFic29sdXRlKClcbiAgICAgICAgICAudG9wKCc1MCUnKVxuICAgICAgICAgIC5sZWZ0KCc1MCUnKTtcblxuICAgICAgICBsZXQgcGFuZWxBbmltYXRpb24gPSAkbWRQYW5lbC5uZXdQYW5lbEFuaW1hdGlvbigpXG4gICAgICAgICAgLm9wZW5Gcm9tKCRldmVudClcbiAgICAgICAgICAuZHVyYXRpb24oMjAwKVxuICAgICAgICAgIC5jbG9zZVRvKCcuanVzdGljYXItbG9naW4nKVxuICAgICAgICAgIC53aXRoQW5pbWF0aW9uKCRtZFBhbmVsLmFuaW1hdGlvbi5TQ0FMRSk7XG5cbiAgICAgICAgbGV0IHBhbmVsQ29uZmlnID0ge1xuICAgICAgICAgIGF0dGFjaFRvOiBhbmd1bGFyLmVsZW1lbnQoZG9jdW1lbnQuYm9keSksXG4gICAgICAgICAgY29udHJvbGxlcjogJ0xvZ2luQ3RybCcsXG4gICAgICAgICAgZGlzYWJsZVBhcmVudFNjcm9sbDogdHJ1ZSxcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJy92aWV3cy9wYW5lbHMvbG9naW4nLFxuICAgICAgICAgIHBhbmVsQ2xhc3M6IFwianVzdGljYXItcGFuZWxcIixcbiAgICAgICAgICB6SW5kZXg6IDE1MCxcbiAgICAgICAgICBsb2NhbHM6IHtcbiAgICAgICAgICAgIGRlZmVycmVkOiBkZWZlcnJlZFxuICAgICAgICAgIH0sXG4gICAgICAgICAgdHJhcEZvY3VzOiB0cnVlLFxuICAgICAgICAgIGNsaWNrT3V0c2lkZVRvQ2xvc2U6IHRydWUsXG4gICAgICAgICAgY2xpY2tFc2NhcGVUb0Nsb3NlOiB0cnVlLFxuICAgICAgICAgIGhhc0JhY2tkcm9wOiB0cnVlXG4gICAgICAgIH07XG5cbiAgICAgICAgJG1kUGFuZWwub3BlbihwYW5lbENvbmZpZyk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICB9O1xuXG4gICAgICAvKipcbiAgICAgICAqIE9wZW4gcmVnaXN0cmF0aW9uIHBhbmVsXG4gICAgICAgKi9cbiAgICAgIEp1c3RpY2FyQXV0aC5vcGVuUmVnaXN0ZXJQYW5lbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuXG4gICAgICAgIGxldCBwYW5lbFBvc2l0aW9uID0gJG1kUGFuZWwubmV3UGFuZWxQb3NpdGlvbigpXG4gICAgICAgICAgLmFic29sdXRlKClcbiAgICAgICAgICAuY2VudGVyKCk7XG5cbiAgICAgICAgbGV0IHBhbmVsQW5pbWF0aW9uID0gJG1kUGFuZWwubmV3UGFuZWxBbmltYXRpb24oKVxuICAgICAgICAgIC5vcGVuRnJvbSgkZXZlbnQpXG4gICAgICAgICAgLmR1cmF0aW9uKDIwMClcbiAgICAgICAgICAuY2xvc2VUbygnLmp1c3RpY2FyLWxvZ2luJylcbiAgICAgICAgICAud2l0aEFuaW1hdGlvbigkbWRQYW5lbC5hbmltYXRpb24uU0NBTEUpO1xuXG4gICAgICAgIGxldCBwYW5lbENvbmZpZyA9IHtcbiAgICAgICAgICBhdHRhY2hUbzogYW5ndWxhci5lbGVtZW50KGRvY3VtZW50LmJvZHkpLFxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdSZWdpc3RlckN0cmwnLFxuICAgICAgICAgIGRpc2FibGVQYXJlbnRTY3JvbGw6IHRydWUsXG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICcvdmlld3MvcGFuZWxzL3JlZ2lzdGVyJyxcbiAgICAgICAgICBwYW5lbENsYXNzOiBcImp1c3RpY2FyLXBhbmVsXCIsXG4gICAgICAgICAgekluZGV4OiAxNTAsXG4gICAgICAgICAgbG9jYWxzOiB7XG4gICAgICAgICAgICBkZWZlcnJlZDogZGVmZXJyZWRcbiAgICAgICAgICB9LFxuICAgICAgICAgIHRyYXBGb2N1czogdHJ1ZSxcbiAgICAgICAgICBjbGlja091dHNpZGVUb0Nsb3NlOiB0cnVlLFxuICAgICAgICAgIGNsaWNrRXNjYXBlVG9DbG9zZTogdHJ1ZSxcbiAgICAgICAgICBoYXNCYWNrZHJvcDogdHJ1ZVxuICAgICAgICB9O1xuXG4gICAgICAgICRtZFBhbmVsLm9wZW4ocGFuZWxDb25maWcpO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgfTtcblxuICAgICAgLyoqXG4gICAgICAgKiBDaGVjayBwZXJtaXNzaW9ucyBiYXNlZCBvbiBhIHN0cmluZ1xuICAgICAgICovXG4gICAgICBKdXN0aWNhckF1dGguY2hlY2tQZXJtaXNzaW9ucyA9IGZ1bmN0aW9uKHBlcm1pc3Npb24pIHtcblxuICAgICAgfTtcblxuXG4gICAgICByZXR1cm4gSnVzdGljYXJBdXRoO1xuICB9XG5dKTtcblxubW9kdWxlQXV0aC5jb250cm9sbGVyKCdMb2dpbkN0cmwnLCBbXG4gIGZ1bmN0aW9uKCRtZFBhbmVsKSB7XG5cbiAgfVxuXSk7XG5cblxubW9kdWxlQXV0aC5jb250cm9sbGVyKCdSZWdpc3RlckN0cmwnLCBbXG4gIGZ1bmN0aW9uKCRtZFBhbmVsKSB7XG5cbiAgfVxuXSk7XG4iLCIvKipcbiAqIEBuYW1lc3BhY2UgSnVzdGljYXIuV2ViQ2xpZW50LlN0YXRlcy5BZG1pblxuICogU3RvcmVzIGFsbCB0aGUgc3RhdGVzIGZvciB0aGUgQW5ndWxhciBVSSByb3V0ZXIgc3RhdGUgbWFjaGluZSBhbmQgYXNzb2NpYXRlcyBjb250cm9sbGVyc1xuICovXG5hbmd1bGFyLm1vZHVsZShcIkp1c3RpY2FyLldlYkNsaWVudC5TdGF0ZXMuQWRtaW5cIiwgW1xuXSk7XG4iLCJyZXF1aXJlKFwiLi9sYW5kaW5nL2luZGV4LmpzXCIpO1xucmVxdWlyZShcIi4vcGxheWVyL2luZGV4LmpzXCIpO1xucmVxdWlyZShcIi4vYWRtaW4vaW5kZXguanNcIik7XG5cbi8qKlxuICogQG5hbWVzcGFjZSBKdXN0aWNhci5XZWJDbGllbnQuU3RhdGVzXG4gKiBTdG9yZXMgYWxsIHRoZSBzdGF0ZXMgZm9yIHRoZSBBbmd1bGFyIFVJIHJvdXRlciBzdGF0ZSBtYWNoaW5lIGFuZCBhc3NvY2lhdGVzIGNvbnRyb2xsZXJzXG4gKi9cbmFuZ3VsYXIubW9kdWxlKFwiSnVzdGljYXIuV2ViQ2xpZW50LlN0YXRlc1wiLCBbXG4gICdKdXN0aWNhci5XZWJDbGllbnQuU3RhdGVzLkxhbmRpbmcnLFxuICAnSnVzdGljYXIuV2ViQ2xpZW50LlN0YXRlcy5QbGF5ZXInLFxuICAnSnVzdGljYXIuV2ViQ2xpZW50LlN0YXRlcy5BZG1pbicsXG5dKTtcbiIsIi8qKlxuICogQG5hbWVzcGFjZSBKdXN0aWNhci5XZWJDbGllbnQuU3RhdGVzLkxhbmRpbmdcbiAqIFN0b3JlcyBhbGwgdGhlIHN0YXRlcyBmb3IgdGhlIEFuZ3VsYXIgVUkgcm91dGVyIHN0YXRlIG1hY2hpbmUgYW5kIGFzc29jaWF0ZXMgY29udHJvbGxlcnNcbiAqL1xuYW5ndWxhci5tb2R1bGUoXCJKdXN0aWNhci5XZWJDbGllbnQuU3RhdGVzLkxhbmRpbmdcIiwgW1xuXSk7XG4iLCIvKipcbiAqIEBuYW1lc3BhY2UgSnVzdGljYXIuV2ViQ2xpZW50LlN0YXRlcy5QbGF5ZXJcbiAqIFN0b3JlcyBhbGwgdGhlIHN0YXRlcyBmb3IgdGhlIEFuZ3VsYXIgVUkgcm91dGVyIHN0YXRlIG1hY2hpbmUgYW5kIGFzc29jaWF0ZXMgY29udHJvbGxlcnNcbiAqL1xuYW5ndWxhci5tb2R1bGUoXCJKdXN0aWNhci5XZWJDbGllbnQuU3RhdGVzLlBsYXllclwiLCBbXG5dKTtcbiJdfQ==
