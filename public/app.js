(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
'angularMoment', 'angular.filter', 'LocalStorageModule', // angular-local-storage
'ui.router',

// Local modules
'Justicar.WebClient.API', 'Justicar.WebClient.Auth', 'Justicar.WebClient.States',

// Widgets
'Justicar.WebClient.Widgets.Toolbar', 'Justicar.WebClient.Widgets.Sidebar']).config(['$locationProvider', '$mdThemingProvider', '$urlRouterProvider', function ($locationProvider, $mdThemingProvider, $urlRouterProvider) {

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

},{"./modules/api/index.js":2,"./modules/auth/index.js":3,"./states/index.js":5,"./widgets/sidebar.js":8,"./widgets/toolbar.js":9}],2:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
'use strict';

/**
 * @namespace Justicar.WebClient.Widgets.Sidebar
 * Stores all the states for the Angular UI router state machine and associates controllers
 */
var widgetSidebar = angular.module("Justicar.WebClient.Widgets.Sidebar", ['ui.router', 'Justicar.WebClient.API', 'Justicar.WebClient.Auth']);

/**
 * Controller for widget
 */
widgetSidebar.controller("WidgetSidebarCtrl", [function () {}]);

},{}],9:[function(require,module,exports){
'use strict';

/**
 * @namespace Justicar.WebClient.Widgets.Toolbar
 * Stores all the states for the Angular UI router state machine and associates controllers
 */
var widgetToolbar = angular.module("Justicar.WebClient.Widgets.Toolbar", ['ui.router', 'Justicar.WebClient.API', 'Justicar.WebClient.Auth']);

/**
 * Controller for widget
 */
widgetToolbar.controller("WidgetToolbarCtrl", [function () {}]);

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvY2xpZW50LmpzIiwiY2xpZW50L21vZHVsZXMvYXBpL2luZGV4LmpzIiwiY2xpZW50L21vZHVsZXMvYXV0aC9pbmRleC5qcyIsImNsaWVudC9zdGF0ZXMvYWRtaW4vaW5kZXguanMiLCJjbGllbnQvc3RhdGVzL2luZGV4LmpzIiwiY2xpZW50L3N0YXRlcy9sYW5kaW5nL2luZGV4LmpzIiwiY2xpZW50L3N0YXRlcy9wbGF5ZXIvaW5kZXguanMiLCJjbGllbnQvd2lkZ2V0cy9zaWRlYmFyLmpzIiwiY2xpZW50L3dpZGdldHMvdG9vbGJhci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOzs7QUFHQTs7QUFFQTs7QUFDQSxRQUFRLHdCQUFSO0FBQ0EsUUFBUSx5QkFBUjs7QUFFQTtBQUNBLFFBQVEsc0JBQVI7QUFDQSxRQUFRLHNCQUFSOztBQUVBOztBQUVBO0FBQ0EsUUFBUSxtQkFBUjs7QUFFQTs7O0FBR0EsUUFBUSxNQUFSLENBQWUsb0JBQWYsRUFBcUM7QUFDakM7QUFDQSxZQUZpQyxFQUVuQjtBQUNkLFlBSGlDLEVBR25CO0FBQ2QsWUFKaUMsRUFJbkI7QUFDZCxXQUxpQyxFQUtwQjtBQUNiLFlBTmlDLEVBTW5CO0FBQ2QsZUFQaUMsRUFRakMsZ0JBUmlDLEVBU2pDLG9CQVRpQyxFQVNYO0FBQ3RCLFdBVmlDOztBQVlqQztBQUNBLHdCQWJpQyxFQWNqQyx5QkFkaUMsRUFlakMsMkJBZmlDOztBQWlCakM7QUFDQSxvQ0FsQmlDLEVBbUJqQyxvQ0FuQmlDLENBQXJDLEVBb0JHLE1BcEJILENBb0JVLENBQ04sbUJBRE0sRUFFTixvQkFGTSxFQUdOLG9CQUhNLEVBSU4sVUFBUyxpQkFBVCxFQUE0QixrQkFBNUIsRUFBZ0Qsa0JBQWhELEVBQW9FOztBQUdoRTs7O0FBR0Esb0JBQWtCLFVBQWxCLENBQTZCLEVBQTdCO0FBQ0Esb0JBQWtCLFNBQWxCLENBQTRC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WUFBWSxRQUFaLENBQXFCLGNBQXJCLEVBQXFDLFFBQXJDOztBQUVBOzs7QUFHQSxZQUFZLFFBQVosQ0FBcUIsa0JBQXJCLEVBQXlDLFNBQXpDOztBQUVBOzs7QUFHQSxZQUFZLE1BQVosQ0FBbUIsQ0FDakIsZ0JBRGlCLEVBRWpCLGNBRmlCLEVBR2pCLGtCQUhpQixFQUlqQixVQUFTLGNBQVQsRUFBeUIsWUFBekIsRUFBdUMsZ0JBQXZDLEVBQXlEOztBQUV2RDs7O0FBR0EsaUJBQ0csS0FESCxDQUNTLFlBRFQsRUFDdUI7QUFDbkIsU0FBSyxnQkFEYztBQUVuQixZQUFRLEVBRlc7QUFHbkIsY0FBVTtBQUhTLEdBRHZCO0FBT0QsQ0FoQmdCLENBQW5COzs7OztBQ3JCQTs7OztBQUlBLElBQUksZ0JBQWdCLFFBQVEsTUFBUixDQUFlLG9DQUFmLEVBQXFELENBQ3ZFLFdBRHVFLEVBRXZFLHdCQUZ1RSxFQUd2RSx5QkFIdUUsQ0FBckQsQ0FBcEI7O0FBT0E7OztBQUdBLGNBQWMsVUFBZCxDQUF5QixtQkFBekIsRUFBOEMsQ0FDNUMsWUFBVyxDQUVWLENBSDJDLENBQTlDOzs7OztBQ2RBOzs7O0FBSUEsSUFBSSxnQkFBZ0IsUUFBUSxNQUFSLENBQWUsb0NBQWYsRUFBcUQsQ0FDdkUsV0FEdUUsRUFFdkUsd0JBRnVFLEVBR3ZFLHlCQUh1RSxDQUFyRCxDQUFwQjs7QUFNQTs7O0FBR0EsY0FBYyxVQUFkLENBQXlCLG1CQUF6QixFQUE4QyxDQUM1QyxZQUFXLENBRVYsQ0FIMkMsQ0FBOUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvKipcbiAqIEBuYW1lc3BhY2UgSnVzdGljYXIuV2ViQ2xpZW50XG4gKi9cbid1c2Ugc3RyaWN0JztcblxuLy8gTG9jYWwgQW5ndWxhciBNb2R1bGVzIE9ubHkuIFBsdWdpbnMgYW5kIG90aGVyIGxpYnJhcmllcyBnbyBpbiB0aGUgbGliLmpzIGZvbGRlciB0byBtYWtlIGZvciBxdWlja2VyIGNvbXBpbGluZy5cbnJlcXVpcmUoJy4vbW9kdWxlcy9hcGkvaW5kZXguanMnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9hdXRoL2luZGV4LmpzJyk7XG5cbi8vIFdpZGdldHNcbnJlcXVpcmUoJy4vd2lkZ2V0cy90b29sYmFyLmpzJyk7XG5yZXF1aXJlKCcuL3dpZGdldHMvc2lkZWJhci5qcycpO1xuXG4vLyBNaXhpbnNcblxuLy8gTG9jYWwgU3RhdGUgTW9kdWxlc1xucmVxdWlyZSgnLi9zdGF0ZXMvaW5kZXguanMnKTtcblxuLy8gRGVmaW5lIG1haW4gbW9kdWxlXG5cblxuYW5ndWxhci5tb2R1bGUoJ0p1c3RpY2FyLldlYkNsaWVudCcsIFtcbiAgICAvLyBBbmd1bGFyIExpYnJhcmllc1xuICAgICduZ01hdGVyaWFsJywgLy8gYW5ndWxhci1tYXRlcmlhbFxuICAgICduZ1Nhbml0aXplJywgLy8gYW5ndWxhci1zYW5pdGl6ZVxuICAgICduZ1Jlc291cmNlJywgLy8gYW5ndWxhci1yZXNvdXJjZVxuICAgICduZ0FuaW1hdGUnLCAvLyBhbmd1bGFyLWFuaW1hdGVcbiAgICAnbmdNZXNzYWdlcycsIC8vIGFuZ3VsYXItbWVzc2FnZXNcbiAgICAnYW5ndWxhck1vbWVudCcsXG4gICAgJ2FuZ3VsYXIuZmlsdGVyJyxcbiAgICAnTG9jYWxTdG9yYWdlTW9kdWxlJywgLy8gYW5ndWxhci1sb2NhbC1zdG9yYWdlXG4gICAgJ3VpLnJvdXRlcicsXG5cbiAgICAvLyBMb2NhbCBtb2R1bGVzXG4gICAgJ0p1c3RpY2FyLldlYkNsaWVudC5BUEknLFxuICAgICdKdXN0aWNhci5XZWJDbGllbnQuQXV0aCcsXG4gICAgJ0p1c3RpY2FyLldlYkNsaWVudC5TdGF0ZXMnLFxuXG4gICAgLy8gV2lkZ2V0c1xuICAgICdKdXN0aWNhci5XZWJDbGllbnQuV2lkZ2V0cy5Ub29sYmFyJyxcbiAgICAnSnVzdGljYXIuV2ViQ2xpZW50LldpZGdldHMuU2lkZWJhcidcbl0pLmNvbmZpZyhbXG4gICAgJyRsb2NhdGlvblByb3ZpZGVyJyxcbiAgICAnJG1kVGhlbWluZ1Byb3ZpZGVyJyxcbiAgICAnJHVybFJvdXRlclByb3ZpZGVyJyxcbiAgICBmdW5jdGlvbigkbG9jYXRpb25Qcm92aWRlciwgJG1kVGhlbWluZ1Byb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAkbG9jYXRpb25Qcm92aWRlciBzZXR0aW5nc1xuICAgICAgICAgKi9cbiAgICAgICAgJGxvY2F0aW9uUHJvdmlkZXIuaGFzaFByZWZpeCgnJyk7XG4gICAgICAgICRsb2NhdGlvblByb3ZpZGVyLmh0bWw1TW9kZShmYWxzZSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZW1pbmdcbiAgICAgICAgICovXG5cbiAgICAgICAgICRtZFRoZW1pbmdQcm92aWRlci5kZWZpbmVQYWxldHRlKCdqdXN0aWNhcldhcm4nLCB7XG4gICAgICAgICAgICc1MCc6ICdlZGUzZTMnLFxuICAgICAgICAgICAnMTAwJzogJ2QzYmFiYScsXG4gICAgICAgICAgICcyMDAnOiAnYjY4YzhjJyxcbiAgICAgICAgICAgJzMwMCc6ICc5OTVlNWUnLFxuICAgICAgICAgICAnNDAwJzogJzgzM2MzYycsXG4gICAgICAgICAgICc1MDAnOiAnNmQxOTE5JyxcbiAgICAgICAgICAgJzYwMCc6ICc2NTE2MTYnLFxuICAgICAgICAgICAnNzAwJzogJzVhMTIxMicsXG4gICAgICAgICAgICc4MDAnOiAnNTAwZTBlJyxcbiAgICAgICAgICAgJzkwMCc6ICczZTA4MDgnLFxuICAgICAgICAgICAnQTEwMCc6ICdmZjc1NzUnLFxuICAgICAgICAgICAnQTIwMCc6ICdmZjQyNDInLFxuICAgICAgICAgICAnQTQwMCc6ICdiODBjMGMnLFxuICAgICAgICAgICAnQTcwMCc6ICc5NzAwMDAnLFxuICAgICAgICAgICAnY29udHJhc3REZWZhdWx0Q29sb3InOiAnbGlnaHQnLFxuICAgICAgICAgICAnY29udHJhc3REYXJrQ29sb3JzJzogW1xuICAgICAgICAgICAgICc1MCcsXG4gICAgICAgICAgICAgJzEwMCcsXG4gICAgICAgICAgICAgJzIwMCcsXG4gICAgICAgICAgICAgJ0ExMDAnLFxuICAgICAgICAgICAgICdBMjAwJ1xuICAgICAgICAgICBdLFxuICAgICAgICAgICAnY29udHJhc3RMaWdodENvbG9ycyc6IFtcbiAgICAgICAgICAgICAnMzAwJyxcbiAgICAgICAgICAgICAnNDAwJyxcbiAgICAgICAgICAgICAnNTAwJyxcbiAgICAgICAgICAgICAnNjAwJyxcbiAgICAgICAgICAgICAnNzAwJyxcbiAgICAgICAgICAgICAnODAwJyxcbiAgICAgICAgICAgICAnOTAwJyxcbiAgICAgICAgICAgICAnQTQwMCcsXG4gICAgICAgICAgICAgJ0E3MDAnXG4gICAgICAgICAgIF1cbiAgICAgICAgIH0pO1xuICAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLmRlZmluZVBhbGV0dGUoJ2p1c3RpY2FyQWNjZW50Jywge1xuICAgICAgICAgICAnNTAnOiAnZmNmMmU3JyxcbiAgICAgICAgICAgJzEwMCc6ICdmOGRlYzMnLFxuICAgICAgICAgICAnMjAwJzogJ2YzYzg5YycsXG4gICAgICAgICAgICczMDAnOiAnZWViMjc0JyxcbiAgICAgICAgICAgJzQwMCc6ICdlYWEyNTYnLFxuICAgICAgICAgICAnNTAwJzogJ2U2OTEzOCcsXG4gICAgICAgICAgICc2MDAnOiAnZTM4OTMyJyxcbiAgICAgICAgICAgJzcwMCc6ICdkZjdlMmInLFxuICAgICAgICAgICAnODAwJzogJ2RiNzQyNCcsXG4gICAgICAgICAgICc5MDAnOiAnZDU2MjE3JyxcbiAgICAgICAgICAgJ0ExMDAnOiAnZjlkYWJhJyxcbiAgICAgICAgICAgJ0EyMDAnOiAnZjJjZGE3JyxcbiAgICAgICAgICAgJ0E0MDAnOiAnZmZjM2ExJyxcbiAgICAgICAgICAgJ0E3MDAnOiAnZmZiMjg3JyxcbiAgICAgICAgICAgJ2NvbnRyYXN0RGVmYXVsdENvbG9yJzogJ2xpZ2h0JyxcbiAgICAgICAgICAgJ2NvbnRyYXN0RGFya0NvbG9ycyc6IFtcbiAgICAgICAgICAgICAnNTAnLFxuICAgICAgICAgICAgICcxMDAnLFxuICAgICAgICAgICAgICcyMDAnLFxuICAgICAgICAgICAgICczMDAnLFxuICAgICAgICAgICAgICc0MDAnLFxuICAgICAgICAgICAgICc1MDAnLFxuICAgICAgICAgICAgICc2MDAnLFxuICAgICAgICAgICAgICc3MDAnLFxuICAgICAgICAgICAgICc4MDAnLFxuICAgICAgICAgICAgICdBMTAwJyxcbiAgICAgICAgICAgICAnQTIwMCcsXG4gICAgICAgICAgICAgJ0E0MDAnLFxuICAgICAgICAgICAgICdBNzAwJ1xuICAgICAgICAgICBdLFxuICAgICAgICAgICAnY29udHJhc3RMaWdodENvbG9ycyc6IFtcbiAgICAgICAgICAgICAnOTAwJ1xuICAgICAgICAgICBdXG4gICAgICAgICB9KTtcbiAgICAgICAgICRtZFRoZW1pbmdQcm92aWRlci5kZWZpbmVQYWxldHRlKCdqdXN0aWNhclByaW1hcnknLCB7XG4gICAgICAgICAgICc1MCc6ICdmMGU4ZjYnLFxuICAgICAgICAgICAnMTAwJzogJ2RhYzVlOScsXG4gICAgICAgICAgICcyMDAnOiAnYzI5ZmRhJyxcbiAgICAgICAgICAgJzMwMCc6ICdhYTc5Y2InLFxuICAgICAgICAgICAnNDAwJzogJzk3NWNjMCcsXG4gICAgICAgICAgICc1MDAnOiAnODUzZmI1JyxcbiAgICAgICAgICAgJzYwMCc6ICc3ZDM5YWUnLFxuICAgICAgICAgICAnNzAwJzogJzcyMzFhNScsXG4gICAgICAgICAgICc4MDAnOiAnNjgyOTlkJyxcbiAgICAgICAgICAgJzkwMCc6ICc1NTFiOGQnLFxuICAgICAgICAgICAnQTEwMCc6ICdlMWM2ZmYnLFxuICAgICAgICAgICAnQTIwMCc6ICdjNzkzZmYnLFxuICAgICAgICAgICAnQTQwMCc6ICdhYzYwZmYnLFxuICAgICAgICAgICAnQTcwMCc6ICc5ZjQ3ZmYnLFxuICAgICAgICAgICAnY29udHJhc3REZWZhdWx0Q29sb3InOiAnbGlnaHQnLFxuICAgICAgICAgICAnY29udHJhc3REYXJrQ29sb3JzJzogW1xuICAgICAgICAgICAgICc1MCcsXG4gICAgICAgICAgICAgJzEwMCcsXG4gICAgICAgICAgICAgJzIwMCcsXG4gICAgICAgICAgICAgJzMwMCcsXG4gICAgICAgICAgICAgJ0ExMDAnLFxuICAgICAgICAgICAgICdBMjAwJyxcbiAgICAgICAgICAgICAnQTQwMCdcbiAgICAgICAgICAgXSxcbiAgICAgICAgICAgJ2NvbnRyYXN0TGlnaHRDb2xvcnMnOiBbXG4gICAgICAgICAgICAgJzQwMCcsXG4gICAgICAgICAgICAgJzUwMCcsXG4gICAgICAgICAgICAgJzYwMCcsXG4gICAgICAgICAgICAgJzcwMCcsXG4gICAgICAgICAgICAgJzgwMCcsXG4gICAgICAgICAgICAgJzkwMCcsXG4gICAgICAgICAgICAgJ0E3MDAnXG4gICAgICAgICAgIF1cbiAgICAgICAgIH0pO1xuICAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLmRlZmluZVBhbGV0dGUoJ2p1c3RpY2FyQmFja2dyb3VuZCcsIHtcbiAgICAgICAgICAgJzUwJzogJ2ZhZmFmYycsXG4gICAgICAgICAgICcxMDAnOiAnZjRmMmY4JyxcbiAgICAgICAgICAgJzIwMCc6ICdlY2U5ZjQnLFxuICAgICAgICAgICAnMzAwJzogJ2U0ZTBmMCcsXG4gICAgICAgICAgICc0MDAnOiAnZGZkOWVjJyxcbiAgICAgICAgICAgJzUwMCc6ICdkOWQyZTknLFxuICAgICAgICAgICAnNjAwJzogJ2Q1Y2RlNicsXG4gICAgICAgICAgICc3MDAnOiAnY2ZjN2UzJyxcbiAgICAgICAgICAgJzgwMCc6ICdjYWMxZGYnLFxuICAgICAgICAgICAnOTAwJzogJ2MwYjZkOScsXG4gICAgICAgICAgICdBMTAwJzogJ2ZmZmZmZicsXG4gICAgICAgICAgICdBMjAwJzogJ2ZmZmZmZicsXG4gICAgICAgICAgICdBNDAwJzogJ2ZmZmZmZicsXG4gICAgICAgICAgICdBNzAwJzogJ2ZmZmZmZicsXG4gICAgICAgICAgICdjb250cmFzdERlZmF1bHRDb2xvcic6ICdkYXJrJyxcbiAgICAgICAgICAgJ2NvbnRyYXN0RGFya0NvbG9ycyc6IFtcbiAgICAgICAgICAgICAnNTAnLFxuICAgICAgICAgICAgICcxMDAnLFxuICAgICAgICAgICAgICcyMDAnLFxuICAgICAgICAgICAgICczMDAnLFxuICAgICAgICAgICAgICc0MDAnLFxuICAgICAgICAgICAgICc1MDAnLFxuICAgICAgICAgICAgICc2MDAnLFxuICAgICAgICAgICAgICc3MDAnLFxuICAgICAgICAgICAgICc4MDAnLFxuICAgICAgICAgICAgICc5MDAnLFxuICAgICAgICAgICAgICdBMTAwJyxcbiAgICAgICAgICAgICAnQTIwMCcsXG4gICAgICAgICAgICAgJ0E0MDAnLFxuICAgICAgICAgICAgICdBNzAwJ1xuICAgICAgICAgICBdLFxuICAgICAgICAgICAnY29udHJhc3RMaWdodENvbG9ycyc6IFtdXG4gICAgICAgICB9KTtcblxuICAgICAgICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ2p1c3RpY2FyJylcbiAgICAgICAgICAgIC5wcmltYXJ5UGFsZXR0ZSgnanVzdGljYXJQcmltYXJ5JylcbiAgICAgICAgICAgIC5hY2NlbnRQYWxldHRlKCdqdXN0aWNhckFjY2VudCcpXG4gICAgICAgICAgICAud2FyblBhbGV0dGUoJ2p1c3RpY2FyV2FybicpXG4gICAgICAgICAgICAuYmFja2dyb3VuZFBhbGV0dGUoJ2p1c3RpY2FyQmFja2dyb3VuZCcpO1xuXG4gICAgICAgIC8vIHNldHRpbmcgaXQgYXMgZGVmYXVsdCB0aGVtZVxuICAgICAgICAkbWRUaGVtaW5nUHJvdmlkZXIuc2V0RGVmYXVsdFRoZW1lKCdqdXN0aWNhcicpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXR0aW5nIHVwIHN0YXRlIG1hY2hpbmVcbiAgICAgICAgICovXG4gICAgICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoXCIvc3RhcnRcIik7XG5cblxuICAgIH1cbl0pLnJ1bihbXG4gICAgJyRyb290U2NvcGUnLFxuICAgICckbG9nJyxcbiAgICAnJHRyYW5zaXRpb25zJyxcbiAgICAnSnVzdGljYXJBUEknLFxuICAgIGZ1bmN0aW9uKCRyb290U2NvcGUsICRsb2csICR0cmFuc2l0aW9ucywgSnVzdGljYXJBUEkpIHtcblxuICAgIH1cbl0pO1xuXG5hbmd1bGFyLm1vZHVsZShcIkp1c3RpY2FyLldlYkNsaWVudFwiKS5jb250cm9sbGVyKFwiTWFpbkN0cmxcIiwgWyckc2NvcGUnLCAnJGxvZycsICckbWRTaWRlbmF2JywgJ0p1c3RpY2FyQXV0aCcsXG4gIGZ1bmN0aW9uKCRzY29wZSwgJGxvZywgJG1kU2lkZW5hdiwgSnVzdGljYXJBdXRoKSB7XG4gICAgLyoqXG4gICAgICogVG9nZ2xlIHNpZGVuYXYgb24gYnV0dG9uIGNsaWNrXG4gICAgICovXG4gICAgJHNjb3BlLnRvZ2dsZVNpZGVuYXYgPSBmdW5jdGlvbigpIHtcbiAgICAgICRtZFNpZGVuYXYoXCJzaWRlbmF2XCIpLnRvZ2dsZSgpO1xuICAgIH07XG5cbiAgICBKdXN0aWNhckF1dGguaW5pdCgpO1xuICB9XG5dKTtcbiIsIi8qKlxuICogQG5hbWVzcGFjZSBKdXN0aWNhci5XZWJDbGllbnQuQVBJXG4gKiBzZXRzIHVwIHRoZSBBUEkgY29uZmlndXJhdGlvblxuICovXG5sZXQgbW9kdWxlQVBJID0gYW5ndWxhci5tb2R1bGUoXCJKdXN0aWNhci5XZWJDbGllbnQuQVBJXCIsIFsnbmdSZXNvdXJjZSddKTtcblxuLyoqXG4gKiBTdG9yZXMgYmFzZSBVUkwgZm9yIGFwaVxuICovXG5tb2R1bGVBUEkuY29uc3RhbnQoXCJBUElfVVJMXCIsIFwiaHR0cDovLzEyNy4wLjAuMTozMDAwL2FwaVwiKTtcblxubW9kdWxlQVBJLnNlcnZpY2UoXCJKdXN0aWNhckFQSVwiLCBbJyRodHRwJywgJyRyZXNvdXJjZScsICckbG9nJywgJyRxJywgJ0FQSV9VUkwnLFxuICBmdW5jdGlvbigkaHR0cCwgJHJlc291cmNlLCAkbG9nLCAkcSwgQVBJX1VSTCkge1xuICAgICAgbGV0IEp1c3RpY2FyQVBJID0ge307XG5cbiAgICAgIC8qKlxuICAgICAgICogQXV0aCBmdW5jdGlvbnMgdXNlZCBmb3IgYXV0aCBhbmQgdXNlciBtYW5hZ2VtZW50XG4gICAgICAgKi9cbiAgICAgIEp1c3RpY2FyQVBJLmF1dGggPSB7fTtcblxuICAgICAgSnVzdGljYXJBUEkuYXV0aC5sb2dpbiA9IGZ1bmN0aW9uKGVtYWlsLCBwYXNzd29yZCkge1xuICAgICAgICByZXR1cm4gJGh0dHAucG9zdChBUElfVVJMICsgXCIvdXNlci9sb2dpblwiLCB7XG4gICAgICAgICAgICB1c2VybmFtZTogZW1haWwsXG4gICAgICAgICAgICBwYXNzd29yZDogcGFzc3dvcmRcblxuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIEp1c3RpY2FyQVBJLmF1dGgubG9nb3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAkaHR0cC5wb3N0KEFQSV9VUkwgKyBcIi91c2VyL2xvZ291dFwiKTtcbiAgICAgIH07XG5cbiAgICAgIEp1c3RpY2FyQVBJLmF1dGguY3VycmVudCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KEFQSV9VUkwgKyBcIi91c2VyL2N1cnJlbnRcIik7XG4gICAgICB9O1xuXG4gICAgICBKdXN0aWNhckFQSS5hdXRoLnJlZ2lzdGVyID0gZnVuY3Rpb24oZW1haWwsIHBhc3N3b3JkKSB7XG4gICAgICAgIHJldHVybiAkaHR0cC5wb3N0KEFQSV9VUkwgKyBcIi91c2VyL3JlZ2lzdGVyXCIsIHtcbiAgICAgICAgICB1c2VyOiB7XG4gICAgICAgICAgICBlbWFpbDogZW1haWwsXG4gICAgICAgICAgICBwYXNzd29yZDogcGFzc3dvcmRcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIEp1c3RpY2FyQVBJO1xuICB9XG5dKTtcbiIsIi8qKlxuICogQG5hbWVzcGFjZSBKdXN0aWNhci5XZWJDbGllbnQuQXV0aFxuICogaGFuZGxlcyBsb2dpbiBhbmQgY2hlY2tpbmcgcGVybWlzc2lvbnNcbiAqL1xubGV0IG1vZHVsZUF1dGggPSBhbmd1bGFyLm1vZHVsZShcIkp1c3RpY2FyLldlYkNsaWVudC5BdXRoXCIsIFsnbmdSZXNvdXJjZScsICdKdXN0aWNhci5XZWJDbGllbnQuQVBJJ10pO1xuXG4vKipcbiAqXG4gKi9cblxubW9kdWxlQXV0aC5zZXJ2aWNlKFwiSnVzdGljYXJBdXRoXCIsIFsnJGh0dHAnLCAnJHJlc291cmNlJywgJyRsb2cnLCAnJHEnLCAnJG1kUGFuZWwnLCAnSnVzdGljYXJBUEknLFxuICBmdW5jdGlvbigkaHR0cCwgJHJlc291cmNlLCAkbG9nLCAkcSwgJG1kUGFuZWwsIEp1c3RpY2FyQVBJKSB7XG4gICAgICBsZXQgSnVzdGljYXJBdXRoID0ge307XG5cbiAgICAgIEp1c3RpY2FyQXV0aC5jdXJyZW50VXNlciA9IG51bGw7XG5cbiAgICAgIC8qKlxuICAgICAgICogTG9naW4gdG8gc3lzdGVtXG4gICAgICAgKi9cbiAgICAgIEp1c3RpY2FyQXV0aC5pbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIEp1c3RpY2FyQVBJLmF1dGguY3VycmVudCgpLnRoZW4oXG4gICAgICAgICAgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIEp1c3RpY2FyQXV0aC5jdXJyZW50VXNlciA9IHJlc3BvbnNlLmRhdGEudXNlcjtcblxuICAgICAgICAgIH1cbiAgICAgICAgKS5jYXRjaChcbiAgICAgICAgICBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIEp1c3RpY2FyQXV0aC5jdXJyZW50VXNlciA9IG51bGw7XG4gICAgICAgICAgICBKdXN0aWNhckF1dGgub3BlbkxvZ2luUGFuZWwoKTtcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICB9O1xuXG4gICAgICAvKipcbiAgICAgICAqIExvZ2luIHRvIHN5c3RlbVxuICAgICAgICovXG4gICAgICBKdXN0aWNhckF1dGgubG9naW4gPSBmdW5jdGlvbihlbWFpbCwgcGFzc3dvcmQpIHtcbiAgICAgICAgSnVzdGljYXJBUEkuYXV0aC5sb2dpbihlbWFpbCwgcGFzc3dvcmQpLnRoZW4oXG4gICAgICAgICAgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIEp1c3RpY2FyQXV0aC5jdXJyZW50VXNlciA9IHJlc3BvbnNlLmRhdGEudXNlcjtcbiAgICAgICAgICB9XG4gICAgICAgICkuY2F0Y2goXG4gICAgICAgICAgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAvLyBAVE9ETyBiZXR0ZXIgaGFuZGxpbmcgb2YgcmVzdWx0cywgZmFpbGVkIGxvZ2luLCBldGMuXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICB9O1xuXG4gICAgICAvKipcbiAgICAgICAqIExvZ291dCBvZiBzeXN0ZW1cbiAgICAgICAqL1xuICAgICAgSnVzdGljYXJBdXRoLmxvZ291dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBKdXN0aWNhckFQSS5hdXRoLmxvZ291dCgpLnRoZW4oXG4gICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBKdXN0aWNhckF1dGguY3VycmVudFVzZXIgPSBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgKS5jYXRjaChcbiAgICAgICAgICBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIC8vIEBUT0RPIGJldHRlciBoYW5kbGluZyBvZiByZXN1bHRzLCBmYWlsZWQgbG9naW4sIGV0Yy5cbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnIpO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH07XG5cbiAgICAgIC8qKlxuICAgICAgICogUmVnaXN0ZXIgbmV3IHVzZXJcbiAgICAgICAqL1xuICAgICAgSnVzdGljYXJBdXRoLnJlZ2lzdGVyID0gZnVuY3Rpb24oZW1haWwsIHBhc3N3b3JkKSB7XG4gICAgICAgIEp1c3RpY2FyQVBJLmF1dGgucmVnaXN0ZXIoZW1haWwsIHBhc3N3b3JkKS50aGVuKFxuICAgICAgICAgIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBKdXN0aWNhckF1dGguY3VycmVudFVzZXIgPSByZXNwb25zZS5kYXRhLnVzZXI7IC8vIHRoaXMgaXMgbGlrZWx5IHdyb25nXG4gICAgICAgICAgfVxuICAgICAgICApLmNhdGNoKFxuICAgICAgICAgIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgLy8gQFRPRE8gYmV0dGVyIGhhbmRsaW5nIG9mIHJlc3VsdHMsIGZhaWxlZCBsb2dpbiwgZXRjLlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycik7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfTtcblxuICAgICAgLyoqXG4gICAgICAgKiBPcGVuIG1vZGFsIHBhbmVsIGZvciBsb2dnaW5nIGluc3BlY3RcbiAgICAgICAqL1xuICAgICAgSnVzdGljYXJBdXRoLm9wZW5Mb2dpblBhbmVsID0gZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG5cbiAgICAgICAgbGV0IHBhbmVsUG9zaXRpb24gPSAkbWRQYW5lbC5uZXdQYW5lbFBvc2l0aW9uKClcbiAgICAgICAgICAuYWJzb2x1dGUoKVxuICAgICAgICAgIC5jZW50ZXIoKTtcblxuICAgICAgICBsZXQgcGFuZWxBbmltYXRpb24gPSAkbWRQYW5lbC5uZXdQYW5lbEFuaW1hdGlvbigpXG4gICAgICAgICAgLm9wZW5Gcm9tKHsgdG9wOiAxLCByaWdodDowIH0pXG4gICAgICAgICAgLmR1cmF0aW9uKDIwMClcbiAgICAgICAgICAuY2xvc2VUbyh7IHRvcDogMSwgcmlnaHQ6MCB9KVxuICAgICAgICAgIC53aXRoQW5pbWF0aW9uKCRtZFBhbmVsLmFuaW1hdGlvbi5TQ0FMRSk7XG5cbiAgICAgICAgbGV0IHBhbmVsQ29uZmlnID0ge1xuICAgICAgICAgIGF0dGFjaFRvOiBhbmd1bGFyLmVsZW1lbnQoZG9jdW1lbnQuYm9keSksXG4gICAgICAgICAgY29udHJvbGxlcjogJ0xvZ2luQ3RybCcsXG4gICAgICAgICAgZGlzYWJsZVBhcmVudFNjcm9sbDogdHJ1ZSxcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9wYXJ0aWFscy9wYW5lbHMvbG9naW4nLFxuICAgICAgICAgIHBhbmVsQ2xhc3M6IFwianVzdGljYXItcGFuZWxcIixcbiAgICAgICAgICB6SW5kZXg6IDE1MCxcbiAgICAgICAgICBsb2NhbHM6IHtcbiAgICAgICAgICAgIGRlZmVycmVkOiBkZWZlcnJlZFxuICAgICAgICAgIH0sXG4gICAgICAgICAgdHJhcEZvY3VzOiB0cnVlLFxuICAgICAgICAgIGNsaWNrT3V0c2lkZVRvQ2xvc2U6IHRydWUsXG4gICAgICAgICAgY2xpY2tFc2NhcGVUb0Nsb3NlOiB0cnVlLFxuICAgICAgICAgIGhhc0JhY2tkcm9wOiB0cnVlLFxuICAgICAgICAgIHBvc2l0aW9uOiBwYW5lbFBvc2l0aW9uLFxuICAgICAgICAgIGFuaW1hdGlvbjogcGFuZWxBbmltYXRpb25cbiAgICAgICAgfTtcblxuICAgICAgICAkbWRQYW5lbC5vcGVuKHBhbmVsQ29uZmlnKTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgIH07XG5cbiAgICAgIC8qKlxuICAgICAgICogT3BlbiByZWdpc3RyYXRpb24gcGFuZWxcbiAgICAgICAqL1xuICAgICAgSnVzdGljYXJBdXRoLm9wZW5SZWdpc3RlclBhbmVsID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG5cbiAgICAgICAgbGV0IHBhbmVsUG9zaXRpb24gPSAkbWRQYW5lbC5uZXdQYW5lbFBvc2l0aW9uKClcbiAgICAgICAgICAuYWJzb2x1dGUoKVxuICAgICAgICAgIC5jZW50ZXIoKTtcblxuICAgICAgICBsZXQgcGFuZWxBbmltYXRpb24gPSAkbWRQYW5lbC5uZXdQYW5lbEFuaW1hdGlvbigpXG4gICAgICAgICAgLm9wZW5Gcm9tKHt0b3A6IDEsIGxlZnQ6IDF9KVxuICAgICAgICAgIC5kdXJhdGlvbigyMDApXG4gICAgICAgICAgLmNsb3NlVG8oe3RvcDogMSwgbGVmdDogMX0pXG4gICAgICAgICAgLndpdGhBbmltYXRpb24oJG1kUGFuZWwuYW5pbWF0aW9uLlNDQUxFKTtcblxuICAgICAgICBsZXQgcGFuZWxDb25maWcgPSB7XG4gICAgICAgICAgYXR0YWNoVG86IGFuZ3VsYXIuZWxlbWVudChkb2N1bWVudC5ib2R5KSxcbiAgICAgICAgICBjb250cm9sbGVyOiAnUmVnaXN0ZXJDdHJsJyxcbiAgICAgICAgICBkaXNhYmxlUGFyZW50U2Nyb2xsOiB0cnVlLFxuICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL3BhcnRpYWxzL3BhbmVscy9yZWdpc3RlcicsXG4gICAgICAgICAgcGFuZWxDbGFzczogXCJqdXN0aWNhci1wYW5lbFwiLFxuICAgICAgICAgIHpJbmRleDogMTc1LFxuICAgICAgICAgIGxvY2Fsczoge1xuICAgICAgICAgICAgZGVmZXJyZWQ6IGRlZmVycmVkXG4gICAgICAgICAgfSxcbiAgICAgICAgICB0cmFwRm9jdXM6IHRydWUsXG4gICAgICAgICAgY2xpY2tPdXRzaWRlVG9DbG9zZTogdHJ1ZSxcbiAgICAgICAgICBjbGlja0VzY2FwZVRvQ2xvc2U6IHRydWUsXG4gICAgICAgICAgaGFzQmFja2Ryb3A6IHRydWUsXG4gICAgICAgICAgcG9zaXRpb246IHBhbmVsUG9zaXRpb24sXG4gICAgICAgICAgYW5pbWF0aW9uOiBwYW5lbEFuaW1hdGlvblxuICAgICAgICB9O1xuXG4gICAgICAgICRtZFBhbmVsLm9wZW4ocGFuZWxDb25maWcpO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgfTtcblxuICAgICAgLyoqXG4gICAgICAgKiBDaGVjayBwZXJtaXNzaW9ucyBiYXNlZCBvbiBhIHN0cmluZ1xuICAgICAgICovXG4gICAgICBKdXN0aWNhckF1dGguY2hlY2tQZXJtaXNzaW9ucyA9IGZ1bmN0aW9uKHBlcm1pc3Npb24pIHtcbiAgICAgICAgLy8gQFRPRE9cbiAgICAgIH07XG5cblxuICAgICAgcmV0dXJuIEp1c3RpY2FyQXV0aDtcbiAgfVxuXSk7XG5cbm1vZHVsZUF1dGguY29udHJvbGxlcignTG9naW5DdHJsJywgWydtZFBhbmVsUmVmJywgJyRzY29wZScsICckbG9nJywgJ0p1c3RpY2FyQVBJJywgJ0p1c3RpY2FyQXV0aCcsXG4gIGZ1bmN0aW9uKG1kUGFuZWxSZWYsICRzY29wZSwgJGxvZywgSnVzdGljYXJBUEksIEp1c3RpY2FyQXV0aCkge1xuICAgICRzY29wZS53YWl0aW5nID0gZmFsc2U7XG4gICAgJHNjb3BlLmVycm9yTXNzZyA9IFwiXCI7XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGNsaWNraW5nIGxvZ2luIGJ1dHRvbiwgdXNpbmcgJHNjb3BlLnVzZXJFbWFpbCAmICRzY29wZS51c2VyUGFzc3dvcmRcbiAgICAgKi9cbiAgICAkc2NvcGUub25DbGlja0xvZ2luID0gZnVuY3Rpb24oKSB7XG4gICAgICAvLyBsb2dpbiBhbmQgY2xvc2UgaWYgc3VjY2Vzc2Z1bFxuICAgICAgJHNjb3BlLndhaXRpbmcgPSB0cnVlO1xuXG4gICAgICBKdXN0aWNhckFQSS5hdXRoLmxvZ2luKCRzY29wZS51c2VyRW1haWwsICRzY29wZS51c2VyUGFzc3dvcmQpLnRoZW4oXG4gICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICRzY29wZS53YWl0aW5nID0gZmFsc2U7XG4gICAgICAgICAgbWRQYW5lbFJlZi5jbG9zZSgpO1xuICAgICAgICB9XG4gICAgICApLmNhdGNoKFxuICAgICAgICBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAkbG9nLmVycm9yKGVycik7XG4gICAgICAgICAgJHNjb3BlLmVycm9yTXNzZyA9IFwiRXJyb3IgbG9nZ2luZyBpbi5cIjtcbiAgICAgICAgICAkc2NvcGUud2FpdGluZyA9IGZhbHNlO1xuICAgICAgICAgIC8vIEBUT0RPIGJldHRlciBtZXNzYWdpbmdcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogSGFuZGxlIGNsaWNraW5nIHJlZ2lzdGVyIGJ1dHRvblxuICAgICAqL1xuICAgICRzY29wZS5vbkNsaWNrUmVnaXN0ZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgIEp1c3RpY2FyQXV0aC5vcGVuUmVnaXN0ZXJQYW5lbCgpO1xuICAgICAgbWRQYW5lbFJlZi5jbG9zZSgpO1xuICAgIH07XG5cbiAgICAkc2NvcGUub25DbGlja0Nsb3NlID0gZnVuY3Rpb24oKSB7XG4gICAgICBtZFBhbmVsUmVmLmNsb3NlKCk7XG4gICAgfTtcbiAgfVxuXSk7XG5cblxubW9kdWxlQXV0aC5jb250cm9sbGVyKCdSZWdpc3RlckN0cmwnLCBbJ21kUGFuZWxSZWYnLCAnJHNjb3BlJywgJyRsb2cnLCAnSnVzdGljYXJBUEknLCAnSnVzdGljYXJBdXRoJyxcbiAgZnVuY3Rpb24obWRQYW5lbFJlZiwgJHNjb3BlLCAkbG9nLCBKdXN0aWNhckFQSSwgSnVzdGljYXJBdXRoKSB7XG4gICAgJHNjb3BlLndhaXRpbmcgPSBmYWxzZTtcbiAgICAkc2NvcGUuZXJyb3JNc3NnID0gXCJcIjtcbiAgICAvKipcbiAgICAgKiBIYW5kbGUgY2xpY2tpbmcgcmVnaXN0ZXIgYnV0dG9uXG4gICAgICovXG4gICAgJHNjb3BlLm9uQ2xpY2tSZWdpc3RlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgLy8gbG9naW4gYW5kIGNsb3NlIGlmIHN1Y2Nlc3NmdWxcbiAgICAgICRzY29wZS53YWl0aW5nID0gdHJ1ZTtcblxuICAgICAgSnVzdGljYXJBUEkuYXV0aC5yZWdpc3Rlcigkc2NvcGUudXNlckVtYWlsLCAkc2NvcGUudXNlclBhc3N3b3JkKS50aGVuKFxuICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAkc2NvcGUud2FpdGluZyA9IGZhbHNlO1xuICAgICAgICAgIG1kUGFuZWxSZWYuY2xvc2UoKTtcbiAgICAgICAgfVxuICAgICAgKS5jYXRjaChcbiAgICAgICAgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgJGxvZy5lcnJvcihlcnIpO1xuICAgICAgICAgICRzY29wZS5lcnJvck1zc2cgPSBcIkVycm9yIHJlZ2lzdGVyaW5nLlwiO1xuICAgICAgICAgICRzY29wZS53YWl0aW5nID0gZmFsc2U7XG4gICAgICAgICAgLy8gQFRPRE8gYmV0dGVyIG1lc3NhZ2luZ1xuICAgICAgICB9XG4gICAgICApO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgY2xpY2tpbmcgbG9naW4gYnV0dG9uXG4gICAgICovXG4gICAgJHNjb3BlLm9uQ2xpY2tMb2dpbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgSnVzdGljYXJBdXRoLm9wZW5Mb2dpblBhbmVsKCk7XG4gICAgICBtZFBhbmVsUmVmLmNsb3NlKCk7XG4gICAgfTtcblxuICAgICRzY29wZS5vbkNsaWNrQ2xvc2UgPSBmdW5jdGlvbigpIHtcbiAgICAgIG1kUGFuZWxSZWYuY2xvc2UoKTtcbiAgICB9O1xuICB9XG5dKTtcbiIsIi8qKlxuICogQG5hbWVzcGFjZSBKdXN0aWNhci5XZWJDbGllbnQuU3RhdGVzLkFkbWluXG4gKiBTdG9yZXMgYWxsIHRoZSBzdGF0ZXMgZm9yIHRoZSBBbmd1bGFyIFVJIHJvdXRlciBzdGF0ZSBtYWNoaW5lIGFuZCBhc3NvY2lhdGVzIGNvbnRyb2xsZXJzXG4gKi9cbmxldCBzdGF0ZUFkbWluID0gYW5ndWxhci5tb2R1bGUoXCJKdXN0aWNhci5XZWJDbGllbnQuU3RhdGVzLkFkbWluXCIsIFtcbiAgJ3VpLnJvdXRlcidcbl0pO1xuXG4vKipcbiAqIFN0YXRlIG5hbWUgZm9yIHRoaXMgc3RhdGVcbiAqL1xuc3RhdGVBZG1pbi5jb25zdGFudChcIkFETUlOX1NUQVRFXCIsIFwiYWRtaW5cIik7XG5cbi8qKlxuICogU3ViLVVSTCBmb3IgdGhpcyBzdGF0ZVxuICovXG5zdGF0ZUFkbWluLmNvbnN0YW50KFwiQURNSU5fU1RBVEVfVVJMXCIsIFwiL2FkbWluXCIpO1xuXG4vKipcbiAqIENvbmZpZyBhY3Rpb24gdGhhdCBzZXRzIHVwIHRoaXMgbW9kdWxlXG4gKi9cbnN0YXRlQWRtaW4uY29uZmlnKFtcbiAgJyRzdGF0ZVByb3ZpZGVyJyxcbiAgJ0FETUlOX1NUQVRFJyxcbiAgJ0FETUlOX1NUQVRFX1VSTCcsXG4gIGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCBBRE1JTl9TVEFURSwgQURNSU5fU1RBVEVfVVJMKSB7XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdXAgc3RhdGUgaW4gYXBwbGljYXRpb24gc3RhdGUgbWFjaGluZS5cbiAgICAgKi9cbiAgICAkc3RhdGVQcm92aWRlclxuICAgICAgLnN0YXRlKEFETUlOX1NUQVRFLCB7XG4gICAgICAgIHVybDogQURNSU5fU1RBVEVfVVJMLFxuICAgICAgICBwYXJhbXM6IHt9LFxuICAgICAgICBhYnN0cmFjdDogdHJ1ZVxuICAgICAgfSlcbiAgICA7XG4gIH1cbl0pO1xuIiwicmVxdWlyZShcIi4vbGFuZGluZy9pbmRleC5qc1wiKTtcbnJlcXVpcmUoXCIuL3BsYXllci9pbmRleC5qc1wiKTtcbnJlcXVpcmUoXCIuL2FkbWluL2luZGV4LmpzXCIpO1xuXG4vKipcbiAqIEBuYW1lc3BhY2UgSnVzdGljYXIuV2ViQ2xpZW50LlN0YXRlc1xuICogU3RvcmVzIGFsbCB0aGUgc3RhdGVzIGZvciB0aGUgQW5ndWxhciBVSSByb3V0ZXIgc3RhdGUgbWFjaGluZSBhbmQgYXNzb2NpYXRlcyBjb250cm9sbGVyc1xuICovXG5hbmd1bGFyLm1vZHVsZShcIkp1c3RpY2FyLldlYkNsaWVudC5TdGF0ZXNcIiwgW1xuICAnSnVzdGljYXIuV2ViQ2xpZW50LlN0YXRlcy5MYW5kaW5nJyxcbiAgJ0p1c3RpY2FyLldlYkNsaWVudC5TdGF0ZXMuUGxheWVyJyxcbiAgJ0p1c3RpY2FyLldlYkNsaWVudC5TdGF0ZXMuQWRtaW4nLFxuXSk7XG4iLCIvKipcbiAqIEBuYW1lc3BhY2UgSnVzdGljYXIuV2ViQ2xpZW50LlN0YXRlcy5MYW5kaW5nXG4gKiBTdG9yZXMgYWxsIHRoZSBzdGF0ZXMgZm9yIHRoZSBBbmd1bGFyIFVJIHJvdXRlciBzdGF0ZSBtYWNoaW5lIGFuZCBhc3NvY2lhdGVzIGNvbnRyb2xsZXJzXG4gKi9cbmxldCBzdGF0ZUxhbmRpbmcgPSBhbmd1bGFyLm1vZHVsZShcIkp1c3RpY2FyLldlYkNsaWVudC5TdGF0ZXMuTGFuZGluZ1wiLCBbXG4gICd1aS5yb3V0ZXInXG5dKTtcblxuLyoqXG4gKiBTdGF0ZSBuYW1lIGZvciB0aGlzIHN0YXRlXG4gKi9cbnN0YXRlTGFuZGluZy5jb25zdGFudChcIkxBTkRJTkdfU1RBVEVcIiwgXCJsYW5kaW5nXCIpO1xuXG4vKipcbiAqIFN1Yi1VUkwgZm9yIHRoaXMgc3RhdGVcbiAqL1xuc3RhdGVMYW5kaW5nLmNvbnN0YW50KFwiTEFORElOR19TVEFURV9VUkxcIiwgXCIvc3RhcnRcIik7XG5cbi8qKlxuICogTG9jYXRpb24gdG8gbG9hZCB2aWV3IGZyb21cbiAqL1xuc3RhdGVMYW5kaW5nLmNvbnN0YW50KFwiTEFORElOR19URU1QTEFURV9VUkxcIiwgXCIvcGFydGlhbHMvc3RhdGVzL2xhbmRpbmdcIik7XG5cbi8qKlxuICogQ29uZmlnIGFjdGlvbiB0aGF0IHNldHMgdXAgdGhpcyBtb2R1bGVcbiAqL1xuc3RhdGVMYW5kaW5nLmNvbmZpZyhbXG4gICckc3RhdGVQcm92aWRlcicsXG4gICdMQU5ESU5HX1NUQVRFJyxcbiAgJ0xBTkRJTkdfU1RBVEVfVVJMJyxcbiAgJ0xBTkRJTkdfVEVNUExBVEVfVVJMJyxcbiAgZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsIExBTkRJTkdfU1RBVEUsIExBTkRJTkdfU1RBVEVfVVJMLCBMQU5ESU5HX1RFTVBMQVRFX1VSTCkge1xuXG4gICAgLyoqXG4gICAgICogU2V0IHVwIHN0YXRlIGluIGFwcGxpY2F0aW9uIHN0YXRlIG1hY2hpbmUuXG4gICAgICovXG4gICAgJHN0YXRlUHJvdmlkZXJcbiAgICAgIC5zdGF0ZShMQU5ESU5HX1NUQVRFLCB7XG4gICAgICAgIHVybDogTEFORElOR19TVEFURV9VUkwsXG4gICAgICAgIHBhcmFtczoge30sXG4gICAgICAgIGNvbnRyb2xsZXI6IFwiU3RhdGVMYW5kaW5nQ3RybFwiLFxuICAgICAgICB0ZW1wbGF0ZVVybDogTEFORElOR19URU1QTEFURV9VUkxcbiAgICAgIH0pXG4gICAgO1xuICB9XG5dKTtcblxuLyoqXG4gKiBDb250cm9sbGVyIGZvciBzdGF0ZVxuICovXG5zdGF0ZUxhbmRpbmcuY29udHJvbGxlcihcIlN0YXRlTGFuZGluZ0N0cmxcIiwgW1xuICBmdW5jdGlvbigpIHtcblxuICB9XG5dKTtcbiIsIi8qKlxuICogQG5hbWVzcGFjZSBKdXN0aWNhci5XZWJDbGllbnQuU3RhdGVzLlBsYXllclxuICogU3RvcmVzIGFsbCB0aGUgc3RhdGVzIGZvciB0aGUgQW5ndWxhciBVSSByb3V0ZXIgc3RhdGUgbWFjaGluZSBhbmQgYXNzb2NpYXRlcyBjb250cm9sbGVyc1xuICovXG5sZXQgc3RhdGVQbGF5ZXIgPSBhbmd1bGFyLm1vZHVsZShcIkp1c3RpY2FyLldlYkNsaWVudC5TdGF0ZXMuUGxheWVyXCIsIFtcbiAgJ3VpLnJvdXRlcidcbl0pO1xuXG4vKipcbiAqIFN0YXRlIG5hbWUgZm9yIHRoaXMgc3RhdGVcbiAqL1xuc3RhdGVQbGF5ZXIuY29uc3RhbnQoXCJQTEFZRVJfU1RBVEVcIiwgXCJwbGF5ZXJcIik7XG5cbi8qKlxuICogU3ViLVVSTCBmb3IgdGhpcyBzdGF0ZVxuICovXG5zdGF0ZVBsYXllci5jb25zdGFudChcIlBMQVlFUl9TVEFURV9VUkxcIiwgXCIvcGxheWVyXCIpO1xuXG4vKipcbiAqIENvbmZpZyBhY3Rpb24gdGhhdCBzZXRzIHVwIHRoaXMgbW9kdWxlXG4gKi9cbnN0YXRlUGxheWVyLmNvbmZpZyhbXG4gICckc3RhdGVQcm92aWRlcicsXG4gICdQTEFZRVJfU1RBVEUnLFxuICAnUExBWUVSX1NUQVRFX1VSTCcsXG4gIGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCBQTEFZRVJfU1RBVEUsIFBMQVlFUl9TVEFURV9VUkwpIHtcblxuICAgIC8qKlxuICAgICAqIFNldCB1cCBzdGF0ZSBpbiBhcHBsaWNhdGlvbiBzdGF0ZSBtYWNoaW5lLlxuICAgICAqL1xuICAgICRzdGF0ZVByb3ZpZGVyXG4gICAgICAuc3RhdGUoUExBWUVSX1NUQVRFLCB7XG4gICAgICAgIHVybDogUExBWUVSX1NUQVRFX1VSTCxcbiAgICAgICAgcGFyYW1zOiB7fSxcbiAgICAgICAgYWJzdHJhY3Q6IHRydWVcbiAgICAgIH0pXG4gICAgO1xuICB9XG5dKTtcbiIsIi8qKlxuICogQG5hbWVzcGFjZSBKdXN0aWNhci5XZWJDbGllbnQuV2lkZ2V0cy5TaWRlYmFyXG4gKiBTdG9yZXMgYWxsIHRoZSBzdGF0ZXMgZm9yIHRoZSBBbmd1bGFyIFVJIHJvdXRlciBzdGF0ZSBtYWNoaW5lIGFuZCBhc3NvY2lhdGVzIGNvbnRyb2xsZXJzXG4gKi9cbmxldCB3aWRnZXRTaWRlYmFyID0gYW5ndWxhci5tb2R1bGUoXCJKdXN0aWNhci5XZWJDbGllbnQuV2lkZ2V0cy5TaWRlYmFyXCIsIFtcbiAgJ3VpLnJvdXRlcicsXG4gICdKdXN0aWNhci5XZWJDbGllbnQuQVBJJyxcbiAgJ0p1c3RpY2FyLldlYkNsaWVudC5BdXRoJ1xuXSk7XG5cblxuLyoqXG4gKiBDb250cm9sbGVyIGZvciB3aWRnZXRcbiAqL1xud2lkZ2V0U2lkZWJhci5jb250cm9sbGVyKFwiV2lkZ2V0U2lkZWJhckN0cmxcIiwgW1xuICBmdW5jdGlvbigpIHtcblxuICB9XG5dKTtcbiIsIi8qKlxuICogQG5hbWVzcGFjZSBKdXN0aWNhci5XZWJDbGllbnQuV2lkZ2V0cy5Ub29sYmFyXG4gKiBTdG9yZXMgYWxsIHRoZSBzdGF0ZXMgZm9yIHRoZSBBbmd1bGFyIFVJIHJvdXRlciBzdGF0ZSBtYWNoaW5lIGFuZCBhc3NvY2lhdGVzIGNvbnRyb2xsZXJzXG4gKi9cbmxldCB3aWRnZXRUb29sYmFyID0gYW5ndWxhci5tb2R1bGUoXCJKdXN0aWNhci5XZWJDbGllbnQuV2lkZ2V0cy5Ub29sYmFyXCIsIFtcbiAgJ3VpLnJvdXRlcicsXG4gICdKdXN0aWNhci5XZWJDbGllbnQuQVBJJyxcbiAgJ0p1c3RpY2FyLldlYkNsaWVudC5BdXRoJ1xuXSk7XG5cbi8qKlxuICogQ29udHJvbGxlciBmb3Igd2lkZ2V0XG4gKi9cbndpZGdldFRvb2xiYXIuY29udHJvbGxlcihcIldpZGdldFRvb2xiYXJDdHJsXCIsIFtcbiAgZnVuY3Rpb24oKSB7XG5cbiAgfVxuXSk7XG4iXX0=
