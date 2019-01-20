/**
 * @namespace Justicar.WebClient
 */
'use strict';

// Local Angular Modules Only. Plugins and other libraries go in the lib.js folder to make for quicker compiling.
require('./modules/api/index.js');
require('./modules/auth/index.js');

// Widgets
require('./widgets/toolbar.js');
require('./widgets/sidebar.js');

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
    'angularMoment',
    'angular.filter',
    'ngStorage', // ngstorage
    'ui.router',

    // Local modules
    'Justicar.WebClient.API',
    'Justicar.WebClient.Auth',
    'Justicar.WebClient.States',

    // Widgets
    'Justicar.WebClient.Widgets.Toolbar',
    'Justicar.WebClient.Widgets.Sidebar'
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
           'contrastDarkColors': [
             '50',
             '100',
             '200',
             'A100',
             'A200'
           ],
           'contrastLightColors': [
             '300',
             '400',
             '500',
             '600',
             '700',
             '800',
             '900',
             'A400',
             'A700'
           ]
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
           'contrastDarkColors': [
             '50',
             '100',
             '200',
             '300',
             '400',
             '500',
             '600',
             '700',
             '800',
             'A100',
             'A200',
             'A400',
             'A700'
           ],
           'contrastLightColors': [
             '900'
           ]
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
           'contrastDarkColors': [
             '50',
             '100',
             '200',
             '300',
             'A100',
             'A200',
             'A400'
           ],
           'contrastLightColors': [
             '400',
             '500',
             '600',
             '700',
             '800',
             '900',
             'A700'
           ]
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
           'contrastDarkColors': [
             '50',
             '100',
             '200',
             '300',
             '400',
             '500',
             '600',
             '700',
             '800',
             '900',
             'A100',
             'A200',
             'A400',
             'A700'
           ],
           'contrastLightColors': []
         });

        $mdThemingProvider.theme('justicar')
            .primaryPalette('justicarPrimary')
            .accentPalette('justicarAccent')
            .warnPalette('justicarWarn')
            .backgroundPalette('justicarBackground');

        // setting it as default theme
        $mdThemingProvider.setDefaultTheme('justicar');

        /**
         * Setting up state machine
         */
        $urlRouterProvider.otherwise("/start");


    }
]).run([
    '$rootScope',
    '$log',
    '$transitions',
    'JusticarAuth',
    function($rootScope, $log, $transitions, JusticarAuth) {
      /**
       * Initialize user credentials
       */
       JusticarAuth.init();
    }
]);

angular.module("Justicar.WebClient").controller("MainCtrl", ['$scope', '$log', '$mdSidenav', 'JusticarAuth',
  function($scope, $log, $mdSidenav, JusticarAuth) {
    /**
     * Toggle sidenav on button click
     */
    $scope.toggleSidenav = function() {
      $mdSidenav("sidenav").toggle();
    };
  }
]);
