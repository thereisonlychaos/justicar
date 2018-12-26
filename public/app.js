(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/**
 * @namespace Justicar.WebClient
 */
'use strict';

// Local Angular Modules Only. Plugins and other libraries go in the lib.js folder to make for quicker compiling.

require('./modules/api/index.js');

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
'Justicar.WebClient.API']).config(['$locationProvider', '$mdThemingProvider', '$urlRouterProvider', function ($locationProvider, $mdThemingProvider, $urlRouterProvider) {
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
  $urlRouterProvider.otherwise("/");
}]).run(['$rootScope', '$log', '$transitions', 'JusticarAPI', function ($rootScope, $log, $transitions, JusticarAPI) {}]);

},{"./modules/api/index.js":2}],2:[function(require,module,exports){
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvY2xpZW50LmpzIiwiY2xpZW50L21vZHVsZXMvYXBpL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7OztBQUdBOztBQUVBOztBQUNBLFFBQVEsd0JBQVI7O0FBSUE7OztBQUdBLFFBQVEsTUFBUixDQUFlLG9CQUFmLEVBQXFDO0FBQ2pDO0FBQ0EsWUFGaUMsRUFFbkI7QUFDZCxZQUhpQyxFQUduQjtBQUNkLFlBSmlDLEVBSW5CO0FBQ2QsV0FMaUMsRUFLcEI7QUFDYixlQU5pQyxFQU9qQyxnQkFQaUMsRUFRakMsb0JBUmlDLEVBUVg7QUFDdEIsV0FUaUM7O0FBV2pDO0FBQ0Esd0JBWmlDLENBQXJDLEVBY0csTUFkSCxDQWNVLENBQ04sbUJBRE0sRUFFTixvQkFGTSxFQUdOLG9CQUhNLEVBSU4sVUFBUyxpQkFBVCxFQUE0QixrQkFBNUIsRUFBZ0Qsa0JBQWhELEVBQW9FO0FBQ2hFOzs7QUFHQSxvQkFBa0IsVUFBbEIsQ0FBNkIsRUFBN0I7QUFDQSxvQkFBa0IsU0FBbEIsQ0FBNEIsS0FBNUI7O0FBRUE7Ozs7QUFJQyxxQkFBbUIsYUFBbkIsQ0FBaUMsaUJBQWpDLEVBQW9EO0FBQ2xELFVBQU0sUUFENEM7QUFFbEQsV0FBTyxRQUYyQztBQUdsRCxXQUFPLFFBSDJDO0FBSWxELFdBQU8sUUFKMkM7QUFLbEQsV0FBTyxRQUwyQztBQU1sRCxXQUFPLFFBTjJDO0FBT2xELFdBQU8sUUFQMkM7QUFRbEQsV0FBTyxRQVIyQztBQVNsRCxXQUFPLFFBVDJDO0FBVWxELFdBQU8sUUFWMkM7QUFXbEQsWUFBUSxRQVgwQztBQVlsRCxZQUFRLFFBWjBDO0FBYWxELFlBQVEsUUFiMEM7QUFjbEQsWUFBUSxRQWQwQztBQWVsRCw0QkFBd0IsT0FmMEI7QUFnQmxELDBCQUFzQixDQUNwQixJQURvQixFQUVwQixLQUZvQixFQUdwQixLQUhvQixFQUlwQixNQUpvQixF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Q0FBUDtBQUNELEdBRkQ7O0FBSUEsY0FBWSxJQUFaLENBQWlCLFFBQWpCLEdBQTRCLFVBQVMsS0FBVCxFQUFnQixRQUFoQixFQUEwQjtBQUNwRCxXQUFPLE1BQU0sSUFBTixDQUFXLFVBQVUsZ0JBQXJCLEVBQXVDO0FBQzVDLGFBQU8sS0FEcUM7QUFFNUMsZ0JBQVU7QUFGa0MsS0FBdkMsQ0FBUDtBQUlELEdBTEQ7O0FBU0EsU0FBTyxXQUFQO0FBQ0gsQ0FsQzhCLENBQWpDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLyoqXG4gKiBAbmFtZXNwYWNlIEp1c3RpY2FyLldlYkNsaWVudFxuICovXG4ndXNlIHN0cmljdCc7XG5cbi8vIExvY2FsIEFuZ3VsYXIgTW9kdWxlcyBPbmx5LiBQbHVnaW5zIGFuZCBvdGhlciBsaWJyYXJpZXMgZ28gaW4gdGhlIGxpYi5qcyBmb2xkZXIgdG8gbWFrZSBmb3IgcXVpY2tlciBjb21waWxpbmcuXG5yZXF1aXJlKCcuL21vZHVsZXMvYXBpL2luZGV4LmpzJyk7XG5cblxuXG4vLyBEZWZpbmUgbWFpbiBtb2R1bGVcblxuXG5hbmd1bGFyLm1vZHVsZSgnSnVzdGljYXIuV2ViQ2xpZW50JywgW1xuICAgIC8vIEFuZ3VsYXIgTGlicmFyaWVzXG4gICAgJ25nTWF0ZXJpYWwnLCAvLyBhbmd1bGFyLW1hdGVyaWFsXG4gICAgJ25nU2FuaXRpemUnLCAvLyBhbmd1bGFyLXNhbml0aXplXG4gICAgJ25nUmVzb3VyY2UnLCAvLyBhbmd1bGFyLXJlc291cmNlXG4gICAgJ25nQW5pbWF0ZScsIC8vIGFuZ3VsYXItYW5pbWF0ZVxuICAgICdhbmd1bGFyTW9tZW50JyxcbiAgICAnYW5ndWxhci5maWx0ZXInLFxuICAgICdMb2NhbFN0b3JhZ2VNb2R1bGUnLCAvLyBhbmd1bGFyLWxvY2FsLXN0b3JhZ2VcbiAgICAndWkucm91dGVyJyxcblxuICAgIC8vIExvY2FsIG1vZHVsZXNcbiAgICAnSnVzdGljYXIuV2ViQ2xpZW50LkFQSScsXG5cbl0pLmNvbmZpZyhbXG4gICAgJyRsb2NhdGlvblByb3ZpZGVyJyxcbiAgICAnJG1kVGhlbWluZ1Byb3ZpZGVyJyxcbiAgICAnJHVybFJvdXRlclByb3ZpZGVyJyxcbiAgICBmdW5jdGlvbigkbG9jYXRpb25Qcm92aWRlciwgJG1kVGhlbWluZ1Byb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqICRsb2NhdGlvblByb3ZpZGVyIHNldHRpbmdzXG4gICAgICAgICAqL1xuICAgICAgICAkbG9jYXRpb25Qcm92aWRlci5oYXNoUHJlZml4KCcnKTtcbiAgICAgICAgJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKGZhbHNlKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlbWluZ1xuICAgICAgICAgKi9cblxuICAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLmRlZmluZVBhbGV0dGUoJ2p1c3RpY2FyUHJpbWFyeScsIHtcbiAgICAgICAgICAgJzUwJzogJ2VkZTNlMycsXG4gICAgICAgICAgICcxMDAnOiAnZDNiYWJhJyxcbiAgICAgICAgICAgJzIwMCc6ICdiNjhjOGMnLFxuICAgICAgICAgICAnMzAwJzogJzk5NWU1ZScsXG4gICAgICAgICAgICc0MDAnOiAnODMzYzNjJyxcbiAgICAgICAgICAgJzUwMCc6ICc2ZDE5MTknLFxuICAgICAgICAgICAnNjAwJzogJzY1MTYxNicsXG4gICAgICAgICAgICc3MDAnOiAnNWExMjEyJyxcbiAgICAgICAgICAgJzgwMCc6ICc1MDBlMGUnLFxuICAgICAgICAgICAnOTAwJzogJzNlMDgwOCcsXG4gICAgICAgICAgICdBMTAwJzogJ2ZmNzU3NScsXG4gICAgICAgICAgICdBMjAwJzogJ2ZmNDI0MicsXG4gICAgICAgICAgICdBNDAwJzogJ2I4MGMwYycsXG4gICAgICAgICAgICdBNzAwJzogJzk3MDAwMCcsXG4gICAgICAgICAgICdjb250cmFzdERlZmF1bHRDb2xvcic6ICdsaWdodCcsXG4gICAgICAgICAgICdjb250cmFzdERhcmtDb2xvcnMnOiBbXG4gICAgICAgICAgICAgJzUwJyxcbiAgICAgICAgICAgICAnMTAwJyxcbiAgICAgICAgICAgICAnMjAwJyxcbiAgICAgICAgICAgICAnQTEwMCcsXG4gICAgICAgICAgICAgJ0EyMDAnXG4gICAgICAgICAgIF0sXG4gICAgICAgICAgICdjb250cmFzdExpZ2h0Q29sb3JzJzogW1xuICAgICAgICAgICAgICczMDAnLFxuICAgICAgICAgICAgICc0MDAnLFxuICAgICAgICAgICAgICc1MDAnLFxuICAgICAgICAgICAgICc2MDAnLFxuICAgICAgICAgICAgICc3MDAnLFxuICAgICAgICAgICAgICc4MDAnLFxuICAgICAgICAgICAgICc5MDAnLFxuICAgICAgICAgICAgICdBNDAwJyxcbiAgICAgICAgICAgICAnQTcwMCdcbiAgICAgICAgICAgXVxuICAgICAgICAgfSk7XG4gICAgICAgICAkbWRUaGVtaW5nUHJvdmlkZXIuZGVmaW5lUGFsZXR0ZSgnanVzdGljYXJBY2NlbnQnLCB7XG4gICAgICAgICAgICc1MCc6ICdmY2YyZTcnLFxuICAgICAgICAgICAnMTAwJzogJ2Y4ZGVjMycsXG4gICAgICAgICAgICcyMDAnOiAnZjNjODljJyxcbiAgICAgICAgICAgJzMwMCc6ICdlZWIyNzQnLFxuICAgICAgICAgICAnNDAwJzogJ2VhYTI1NicsXG4gICAgICAgICAgICc1MDAnOiAnZTY5MTM4JyxcbiAgICAgICAgICAgJzYwMCc6ICdlMzg5MzInLFxuICAgICAgICAgICAnNzAwJzogJ2RmN2UyYicsXG4gICAgICAgICAgICc4MDAnOiAnZGI3NDI0JyxcbiAgICAgICAgICAgJzkwMCc6ICdkNTYyMTcnLFxuICAgICAgICAgICAnQTEwMCc6ICdmOWRhYmEnLFxuICAgICAgICAgICAnQTIwMCc6ICdmMmNkYTcnLFxuICAgICAgICAgICAnQTQwMCc6ICdmZmMzYTEnLFxuICAgICAgICAgICAnQTcwMCc6ICdmZmIyODcnLFxuICAgICAgICAgICAnY29udHJhc3REZWZhdWx0Q29sb3InOiAnbGlnaHQnLFxuICAgICAgICAgICAnY29udHJhc3REYXJrQ29sb3JzJzogW1xuICAgICAgICAgICAgICc1MCcsXG4gICAgICAgICAgICAgJzEwMCcsXG4gICAgICAgICAgICAgJzIwMCcsXG4gICAgICAgICAgICAgJzMwMCcsXG4gICAgICAgICAgICAgJzQwMCcsXG4gICAgICAgICAgICAgJzUwMCcsXG4gICAgICAgICAgICAgJzYwMCcsXG4gICAgICAgICAgICAgJzcwMCcsXG4gICAgICAgICAgICAgJzgwMCcsXG4gICAgICAgICAgICAgJ0ExMDAnLFxuICAgICAgICAgICAgICdBMjAwJyxcbiAgICAgICAgICAgICAnQTQwMCcsXG4gICAgICAgICAgICAgJ0E3MDAnXG4gICAgICAgICAgIF0sXG4gICAgICAgICAgICdjb250cmFzdExpZ2h0Q29sb3JzJzogW1xuICAgICAgICAgICAgICc5MDAnXG4gICAgICAgICAgIF1cbiAgICAgICAgIH0pO1xuICAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLmRlZmluZVBhbGV0dGUoJ2p1c3RpY2FyV2FybicsIHtcbiAgICAgICAgICAgJzUwJzogJ2ZmZmFlZCcsXG4gICAgICAgICAgICcxMDAnOiAnZmZmNGQxJyxcbiAgICAgICAgICAgJzIwMCc6ICdmZmVjYjMnLFxuICAgICAgICAgICAnMzAwJzogJ2ZmZTQ5NCcsXG4gICAgICAgICAgICc0MDAnOiAnZmZkZjdkJyxcbiAgICAgICAgICAgJzUwMCc6ICdmZmQ5NjYnLFxuICAgICAgICAgICAnNjAwJzogJ2ZmZDU1ZScsXG4gICAgICAgICAgICc3MDAnOiAnZmZjZjUzJyxcbiAgICAgICAgICAgJzgwMCc6ICdmZmNhNDknLFxuICAgICAgICAgICAnOTAwJzogJ2ZmYzAzOCcsXG4gICAgICAgICAgICdBMTAwJzogJ2ZmZmZmZicsXG4gICAgICAgICAgICdBMjAwJzogJ2ZmZmZmZicsXG4gICAgICAgICAgICdBNDAwJzogJ2ZmZjVlMScsXG4gICAgICAgICAgICdBNzAwJzogJ2ZmZWRjOCcsXG4gICAgICAgICAgICdjb250cmFzdERlZmF1bHRDb2xvcic6ICdsaWdodCcsXG4gICAgICAgICAgICdjb250cmFzdERhcmtDb2xvcnMnOiBbXG4gICAgICAgICAgICAgJzUwJyxcbiAgICAgICAgICAgICAnMTAwJyxcbiAgICAgICAgICAgICAnMjAwJyxcbiAgICAgICAgICAgICAnMzAwJyxcbiAgICAgICAgICAgICAnNDAwJyxcbiAgICAgICAgICAgICAnNTAwJyxcbiAgICAgICAgICAgICAnNjAwJyxcbiAgICAgICAgICAgICAnNzAwJyxcbiAgICAgICAgICAgICAnODAwJyxcbiAgICAgICAgICAgICAnOTAwJyxcbiAgICAgICAgICAgICAnQTEwMCcsXG4gICAgICAgICAgICAgJ0EyMDAnLFxuICAgICAgICAgICAgICdBNDAwJyxcbiAgICAgICAgICAgICAnQTcwMCdcbiAgICAgICAgICAgXSxcbiAgICAgICAgICAgJ2NvbnRyYXN0TGlnaHRDb2xvcnMnOiBbXVxuICAgICAgICAgfSk7XG4gICAgICAgICAkbWRUaGVtaW5nUHJvdmlkZXIuZGVmaW5lUGFsZXR0ZSgnanVzdGljYXJCYWNrZ3JvdW5kJywge1xuICAgICAgICAgICAnNTAnOiAnZTBlMGUwJyxcbiAgICAgICAgICAgJzEwMCc6ICdiM2IzYjMnLFxuICAgICAgICAgICAnMjAwJzogJzgwODA4MCcsXG4gICAgICAgICAgICczMDAnOiAnNGQ0ZDRkJyxcbiAgICAgICAgICAgJzQwMCc6ICcyNjI2MjYnLFxuICAgICAgICAgICAnNTAwJzogJzAwMDAwMCcsXG4gICAgICAgICAgICc2MDAnOiAnMDAwMDAwJyxcbiAgICAgICAgICAgJzcwMCc6ICcwMDAwMDAnLFxuICAgICAgICAgICAnODAwJzogJzAwMDAwMCcsXG4gICAgICAgICAgICc5MDAnOiAnMDAwMDAwJyxcbiAgICAgICAgICAgJ0ExMDAnOiAnYTZhNmE2JyxcbiAgICAgICAgICAgJ0EyMDAnOiAnOGM4YzhjJyxcbiAgICAgICAgICAgJ0E0MDAnOiAnNzM3MzczJyxcbiAgICAgICAgICAgJ0E3MDAnOiAnNjY2NjY2JyxcbiAgICAgICAgICAgJ2NvbnRyYXN0RGVmYXVsdENvbG9yJzogJ2xpZ2h0JyxcbiAgICAgICAgICAgJ2NvbnRyYXN0RGFya0NvbG9ycyc6IFtcbiAgICAgICAgICAgICAnNTAnLFxuICAgICAgICAgICAgICcxMDAnLFxuICAgICAgICAgICAgICcyMDAnLFxuICAgICAgICAgICAgICdBMTAwJyxcbiAgICAgICAgICAgICAnQTIwMCdcbiAgICAgICAgICAgXSxcbiAgICAgICAgICAgJ2NvbnRyYXN0TGlnaHRDb2xvcnMnOiBbXG4gICAgICAgICAgICAgJzMwMCcsXG4gICAgICAgICAgICAgJzQwMCcsXG4gICAgICAgICAgICAgJzUwMCcsXG4gICAgICAgICAgICAgJzYwMCcsXG4gICAgICAgICAgICAgJzcwMCcsXG4gICAgICAgICAgICAgJzgwMCcsXG4gICAgICAgICAgICAgJzkwMCcsXG4gICAgICAgICAgICAgJ0E0MDAnLFxuICAgICAgICAgICAgICdBNzAwJ1xuICAgICAgICAgICBdXG4gICAgICAgICB9KTtcblxuICAgICAgICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ2p1c3RpY2FyJylcbiAgICAgICAgICAgIC5wcmltYXJ5UGFsZXR0ZSgnanVzdGljYXJQcmltYXJ5JylcbiAgICAgICAgICAgIC5hY2NlbnRQYWxldHRlKCdqdXN0aWNhckFjY2VudCcpXG4gICAgICAgICAgICAud2FyblBhbGV0dGUoJ2p1c3RpY2FyV2FybicpXG4gICAgICAgICAgICAuYmFja2dyb3VuZFBhbGV0dGUoJ2p1c3RpY2FyQmFja2dyb3VuZCcpO1xuXG4gICAgICAgIC8vIHNldHRpbmcgaXQgYXMgZGVmYXVsdCB0aGVtZVxuICAgICAgICAkbWRUaGVtaW5nUHJvdmlkZXIuc2V0RGVmYXVsdFRoZW1lKCdqdXN0aWNhcicpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXR0aW5nIHVwIHN0YXRlIG1hY2hpbmVcbiAgICAgICAgICovXG4gICAgICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoXCIvXCIpO1xuXG5cbiAgICB9XG5dKS5ydW4oW1xuICAgICckcm9vdFNjb3BlJyxcbiAgICAnJGxvZycsXG4gICAgJyR0cmFuc2l0aW9ucycsXG4gICAgJ0p1c3RpY2FyQVBJJyxcbiAgICBmdW5jdGlvbigkcm9vdFNjb3BlLCAkbG9nLCAkdHJhbnNpdGlvbnMsIEp1c3RpY2FyQVBJKSB7XG5cbiAgICB9XG5cbl0pO1xuIiwiLyoqXG4gKiBAbmFtZXNwYWNlIEp1c3RpY2FyLldlYkNsaWVudC5BUElcbiAqIHNldHMgdXAgdGhlIEFQSSBjb25maWd1cmF0aW9uXG4gKi9cbmxldCBtb2R1bGVBUEkgPSBhbmd1bGFyLm1vZHVsZShcIkp1c3RpY2FyLldlYkNsaWVudC5BUElcIiwgWyduZ1Jlc291cmNlJ10pO1xuXG4vKipcbiAqIFN0b3JlcyBiYXNlIFVSTCBmb3IgYXBpXG4gKi9cbm1vZHVsZUFQSS5jb25zdGFudChcIkFQSV9VUkxcIiwgXCJodHRwOi8vMTI3LjAuMC4xL2FwaVwiKTtcblxubW9kdWxlQVBJLnNlcnZpY2UoXCJKdXN0aWNhckFQSVwiLCBbJyRodHRwJywgJyRyZXNvdXJjZScsICckbG9nJywgJyRxJywgJ0FQSV9VUkwnLFxuICBmdW5jdGlvbigkaHR0cCwgJHJlc291cmNlLCAkbG9nLCAkcSwgQVBJX1VSTCkge1xuICAgICAgbGV0IEp1c3RpY2FyQVBJID0ge307XG5cbiAgICAgIC8qKlxuICAgICAgICogQXV0aCBmdW5jdGlvbnMgdXNlZCBmb3IgYXV0aCBhbmQgdXNlciBtYW5hZ2VtZW50XG4gICAgICAgKi9cbiAgICAgIEp1c3RpY2FyQVBJLmF1dGggPSB7fTtcblxuICAgICAgSnVzdGljYXJBUEkuYXV0aC5sb2dpbiA9IGZ1bmN0aW9uKGVtYWlsLCBwYXNzd29yZCkge1xuICAgICAgICByZXR1cm4gJGh0dHAucG9zdChBUElfVVJMICsgXCIvdXNlci9sb2dpblwiLCB7XG4gICAgICAgICAgZW1haWw6IGVtYWlsLFxuICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZFxuICAgICAgICB9KVxuICAgICAgfTtcblxuICAgICAgSnVzdGljYXJBUEkuYXV0aC5sb2dvdXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoQVBJX1VSTCArIFwiL3VzZXIvbG9nb3V0XCIpXG4gICAgICB9O1xuXG4gICAgICBKdXN0aWNhckFQSS5hdXRoLmN1cnJlbnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICRodHRwLmdldChBUElfVVJMICsgXCIvdXNlci9jdXJyZW50XCIpXG4gICAgICB9XG5cbiAgICAgIEp1c3RpY2FyQVBJLmF1dGgucmVnaXN0ZXIgPSBmdW5jdGlvbihlbWFpbCwgcGFzc3dvcmQpIHtcbiAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoQVBJX1VSTCArIFwiL3VzZXIvcmVnaXN0ZXJcIiwge1xuICAgICAgICAgIGVtYWlsOiBlbWFpbCxcbiAgICAgICAgICBwYXNzd29yZDogcGFzc3dvcmRcbiAgICAgICAgfSlcbiAgICAgIH07XG5cblxuXG4gICAgICByZXR1cm4gSnVzdGljYXJBUEk7XG4gIH1cbl0pO1xuIl19
