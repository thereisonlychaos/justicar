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
'ngAnimate', // angular-animate
'angularMoment', 'angular.filter', 'LocalStorageModule', // angular-local-storage
'ngCookies', 'ui.router',

// Local modules
'Justicar.Webclient.API']).config(['$locationProvider', '$mdThemingProvider', '$urlRouterProvider', function ($locationProvider, $mdThemingProvider, $urlRouterProvider) {
    /**
     * $locationProvider settings
     */
    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode(false);

    /**
     * Theming
     */

    // creating Justicar theme
    $mdThemingProvider.theme('justicar').primaryPalette('primary').accentPalette('accent');

    // setting it as default theme
    $mdThemingProvider.setDefaultTheme('justicar');

    /**
     * Setting up state machine
     */
    $urlRouterProvider.otherwise("/");
}]).run(['$rootScope', '$log', '$translate', '$transitions', 'JusticarAPI', function ($rootScope, $log, $translate, $transitions, JusticarAPI) {}]);

},{"./modules/api/index.js":2}],2:[function(require,module,exports){
"use strict";

/**
 * @namespace Justicar.WebClient.API
 * sets up the API configuration
 */
var moduleAPI = angular.module("Justicar.WebClient.API", {});

/**
 * Stores base URL for api
 */
moduleAPI.constant("API_URL", "http://127.0.0.1/api");

moduleAPI.service("JusticarAPI", ['$http', '$resource', '$log', '$q', 'API_URL', function ($http, $resource, $log, $rq, API_URL) {
  var JusticarAPI = {};

  return JusticarAPI;
}]);

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvY2xpZW50LmpzIiwiY2xpZW50L21vZHVsZXMvYXBpL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7OztBQUdBOztBQUVBOztBQUNBLFFBQVEsd0JBQVI7O0FBSUE7OztBQUdBLFFBQVEsTUFBUixDQUFlLG9CQUFmLEVBQXFDO0FBQ2pDO0FBQ0EsWUFGaUMsRUFFbkI7QUFDZCxZQUhpQyxFQUduQjtBQUNkLFdBSmlDLEVBSXBCO0FBQ2IsZUFMaUMsRUFNakMsZ0JBTmlDLEVBT2pDLG9CQVBpQyxFQU9YO0FBQ3RCLFdBUmlDLEVBU2pDLFdBVGlDOztBQVdqQztBQUNBLHdCQVppQyxDQUFyQyxFQWNHLE1BZEgsQ0FjVSxDQUNOLG1CQURNLEVBRU4sb0JBRk0sRUFHTixvQkFITSxFQUlOLFVBQVMsaUJBQVQsRUFBNEIsa0JBQTVCLEVBQWdELGtCQUFoRCxFQUFvRTtBQUNoRTs7O0FBR0Esc0JBQWtCLFVBQWxCLENBQTZCLEVBQTdCO0FBQ0Esc0JBQWtCLFNBQWxCLENBQTRCLEtBQTVCOztBQUVBOzs7O0FBSUE7QUFDQSx1QkFBbUIsS0FBbkIsQ0FBeUIsVUFBekIsRUFDSyxjQURMLENBQ29CLFNBRHBCLEVBRUssYUFGTCxDQUVtQixRQUZuQjs7QUFJQTtBQUNBLHVCQUFtQixlQUFuQixDQUFtQyxVQUFuQzs7QUFFQTs7O0FBR0EsdUJBQW1CLFNBQW5CLENBQTZCLEdBQTdCO0FBR0gsQ0E3QkssQ0FkVixFQTRDRyxHQTVDSCxDQTRDTyxDQUNILFlBREcsRUFFSCxNQUZHLEVBR0gsWUFIRyxFQUlILGNBSkcsRUFLSCxhQUxHLEVBTUgsVUFBUyxVQUFULEVBQXFCLElBQXJCLEVBQTJCLFVBQTNCLEVBQXVDLFlBQXZDLEVBQXFELFdBQXJELEVBQWtFLENBRWpFLENBUkUsQ0E1Q1A7Ozs7O0FDYkE7Ozs7QUFJQSxJQUFJLFlBQVksUUFBUSxNQUFSLENBQWUsd0JBQWYsRUFBeUMsRUFBekMsQ0FBaEI7O0FBRUE7OztBQUdBLFVBQVUsUUFBVixDQUFtQixTQUFuQixFQUE4QixzQkFBOUI7O0FBRUEsVUFBVSxPQUFWLENBQWtCLGFBQWxCLEVBQWlDLENBQUMsT0FBRCxFQUFVLFdBQVYsRUFBdUIsTUFBdkIsRUFBK0IsSUFBL0IsRUFBcUMsU0FBckMsRUFDL0IsVUFBUyxLQUFULEVBQWdCLFNBQWhCLEVBQTJCLElBQTNCLEVBQWlDLEdBQWpDLEVBQXNDLE9BQXRDLEVBQStDO0FBQzNDLE1BQUksY0FBYyxFQUFsQjs7QUFNQSxTQUFPLFdBQVA7QUFDSCxDQVQ4QixDQUFqQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8qKlxuICogQG5hbWVzcGFjZSBKdXN0aWNhci5XZWJDbGllbnRcbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG4vLyBMb2NhbCBBbmd1bGFyIE1vZHVsZXMgT25seS4gUGx1Z2lucyBhbmQgb3RoZXIgbGlicmFyaWVzIGdvIGluIHRoZSBsaWIuanMgZm9sZGVyIHRvIG1ha2UgZm9yIHF1aWNrZXIgY29tcGlsaW5nLlxucmVxdWlyZSgnLi9tb2R1bGVzL2FwaS9pbmRleC5qcycpO1xuXG5cblxuLy8gRGVmaW5lIG1haW4gbW9kdWxlXG5cblxuYW5ndWxhci5tb2R1bGUoJ0p1c3RpY2FyLldlYkNsaWVudCcsIFtcbiAgICAvLyBBbmd1bGFyIExpYnJhcmllc1xuICAgICduZ01hdGVyaWFsJywgLy8gYW5ndWxhci1tYXRlcmlhbFxuICAgICduZ1Nhbml0aXplJywgLy8gYW5ndWxhci1zYW5pdGl6ZVxuICAgICduZ0FuaW1hdGUnLCAvLyBhbmd1bGFyLWFuaW1hdGVcbiAgICAnYW5ndWxhck1vbWVudCcsXG4gICAgJ2FuZ3VsYXIuZmlsdGVyJyxcbiAgICAnTG9jYWxTdG9yYWdlTW9kdWxlJywgLy8gYW5ndWxhci1sb2NhbC1zdG9yYWdlXG4gICAgJ25nQ29va2llcycsXG4gICAgJ3VpLnJvdXRlcicsXG5cbiAgICAvLyBMb2NhbCBtb2R1bGVzXG4gICAgJ0p1c3RpY2FyLldlYmNsaWVudC5BUEknLFxuXG5dKS5jb25maWcoW1xuICAgICckbG9jYXRpb25Qcm92aWRlcicsXG4gICAgJyRtZFRoZW1pbmdQcm92aWRlcicsXG4gICAgJyR1cmxSb3V0ZXJQcm92aWRlcicsXG4gICAgZnVuY3Rpb24oJGxvY2F0aW9uUHJvdmlkZXIsICRtZFRoZW1pbmdQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiAkbG9jYXRpb25Qcm92aWRlciBzZXR0aW5nc1xuICAgICAgICAgKi9cbiAgICAgICAgJGxvY2F0aW9uUHJvdmlkZXIuaGFzaFByZWZpeCgnJyk7XG4gICAgICAgICRsb2NhdGlvblByb3ZpZGVyLmh0bWw1TW9kZShmYWxzZSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZW1pbmdcbiAgICAgICAgICovXG5cbiAgICAgICAgLy8gY3JlYXRpbmcgSnVzdGljYXIgdGhlbWVcbiAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdqdXN0aWNhcicpXG4gICAgICAgICAgICAucHJpbWFyeVBhbGV0dGUoJ3ByaW1hcnknKVxuICAgICAgICAgICAgLmFjY2VudFBhbGV0dGUoJ2FjY2VudCcpO1xuXG4gICAgICAgIC8vIHNldHRpbmcgaXQgYXMgZGVmYXVsdCB0aGVtZVxuICAgICAgICAkbWRUaGVtaW5nUHJvdmlkZXIuc2V0RGVmYXVsdFRoZW1lKCdqdXN0aWNhcicpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXR0aW5nIHVwIHN0YXRlIG1hY2hpbmVcbiAgICAgICAgICovXG4gICAgICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoXCIvXCIpO1xuXG5cbiAgICB9XG5dKS5ydW4oW1xuICAgICckcm9vdFNjb3BlJyxcbiAgICAnJGxvZycsXG4gICAgJyR0cmFuc2xhdGUnLFxuICAgICckdHJhbnNpdGlvbnMnLFxuICAgICdKdXN0aWNhckFQSScsXG4gICAgZnVuY3Rpb24oJHJvb3RTY29wZSwgJGxvZywgJHRyYW5zbGF0ZSwgJHRyYW5zaXRpb25zLCBKdXN0aWNhckFQSSkge1xuXG4gICAgfVxuXG5dKTtcbiIsIi8qKlxuICogQG5hbWVzcGFjZSBKdXN0aWNhci5XZWJDbGllbnQuQVBJXG4gKiBzZXRzIHVwIHRoZSBBUEkgY29uZmlndXJhdGlvblxuICovXG5sZXQgbW9kdWxlQVBJID0gYW5ndWxhci5tb2R1bGUoXCJKdXN0aWNhci5XZWJDbGllbnQuQVBJXCIsIHt9KTtcblxuLyoqXG4gKiBTdG9yZXMgYmFzZSBVUkwgZm9yIGFwaVxuICovXG5tb2R1bGVBUEkuY29uc3RhbnQoXCJBUElfVVJMXCIsIFwiaHR0cDovLzEyNy4wLjAuMS9hcGlcIik7XG5cbm1vZHVsZUFQSS5zZXJ2aWNlKFwiSnVzdGljYXJBUElcIiwgWyckaHR0cCcsICckcmVzb3VyY2UnLCAnJGxvZycsICckcScsICdBUElfVVJMJyxcbiAgZnVuY3Rpb24oJGh0dHAsICRyZXNvdXJjZSwgJGxvZywgJHJxLCBBUElfVVJMKSB7XG4gICAgICBsZXQgSnVzdGljYXJBUEkgPSB7fTtcblxuXG5cblxuXG4gICAgICByZXR1cm4gSnVzdGljYXJBUEk7XG4gIH1cbl0pO1xuIl19
