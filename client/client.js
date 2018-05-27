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
    'angularMoment',
    'angular.filter',
    'LocalStorageModule', // angular-local-storage
    'ngCookies',
    'ui.router',

    // Local modules
    'Justicar.Webclient.API',

]).config([
    '$locationProvider',
    '$mdThemingProvider',
    '$urlRouterProvider',
    function($locationProvider, $mdThemingProvider, $urlRouterProvider) {
        /**
         * $locationProvider settings
         */
        $locationProvider.hashPrefix('');
        $locationProvider.html5Mode(false);

        /**
         * Theming
         */

        // creating Justicar theme
        $mdThemingProvider.theme('justicar')
            .primaryPalette('primary')
            .accentPalette('accent');

        // setting it as default theme
        $mdThemingProvider.setDefaultTheme('justicar');

        /**
         * Setting up state machine
         */
        $urlRouterProvider.otherwise("/");


    }
]).run([
    '$rootScope',
    '$log',
    '$translate',
    '$transitions',
    'JusticarAPI',
    function($rootScope, $log, $translate, $transitions, JusticarAPI) {

    }

]);
