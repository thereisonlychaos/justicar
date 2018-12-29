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
    'angularMoment',
    'angular.filter',
    'LocalStorageModule', // angular-local-storage
    'ui.router',

    // Local modules
    'Justicar.WebClient.API',
    'Justicar.WebClient.Auth',

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
        $urlRouterProvider.otherwise("/");


    }
]).run([
    '$rootScope',
    '$log',
    '$transitions',
    'JusticarAPI',
    function($rootScope, $log, $transitions, JusticarAPI) {

    }

]);
