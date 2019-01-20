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
}]).run(['$rootScope', '$log', '$transitions', 'JusticarAuth', function ($rootScope, $log, $transitions, JusticarAuth) {
  /**
   * Initialize user credentials
   */
  JusticarAuth.init();
}]);

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

moduleAuth.service("JusticarAuth", ['$http', '$localStorage', '$log', '$q', '$mdPanel', 'JusticarAPI', function ($http, $localStorage, $log, $q, $mdPanel, JusticarAPI) {
  var JusticarAuth = {};

  /**
   * Login to system
   */
  JusticarAuth.init = function () {
    if ($localStorage.currentUser && $localStorage.currentUser.token) {
      JusticarAuth.setToken($localStorage.currentUser.token);
    } else {
      JusticarAuth.clearToken();
    }

    JusticarAPI.auth.current().then(function (response) {
      $localStorage.currentUser.user = response.data.user;
    }).catch(function (err) {
      delete $localStorage.currentUser;
      JusticarAuth.openLoginPanel();
    });
  };

  /**
   * Login to system
   */
  JusticarAuth.login = function (email, password) {
    JusticarAPI.auth.login(email, password).then(function (response) {
      $localStorage.currentUser = { user: response.data.user, token: response.data.token };
      JusticarAuth.setToken(response.data.token);
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
      delete $localStorage.currentUser;
      JusticarAuth.clearToken();
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
      $localStorage.currentUser = { user: response.data.user, token: response.data.token };
      JusticarAuth.setToken(response.data.token);
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

  JusticarAuth.setToken = function (token) {
    $http.defaults.headers.common.Authorization = 'Bearer ' + token;
  };

  JusticarAuth.clearToken = function () {
    $http.defaults.headers.common.Authorization = '';
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
widgetToolbar.controller("WidgetToolbarCtrl", ['$scope', 'JusticarAuth', function ($scope, JusticarAuth) {
  $scope.bShowAccount = function () {
    // is there a valid account?
    return false;
  };

  $scope.onClickLogin = function () {
    JusticarAuth.openLoginPanel();
  };

  $scope.onClickAccount = function () {
    // @TODO
  };

  $scope.getAccountName = function () {};
}]);

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvY2xpZW50LmpzIiwiY2xpZW50L21vZHVsZXMvYXBpL2luZGV4LmpzIiwiY2xpZW50L21vZHVsZXMvYXV0aC9pbmRleC5qcyIsImNsaWVudC9zdGF0ZXMvYWRtaW4vaW5kZXguanMiLCJjbGllbnQvc3RhdGVzL2luZGV4LmpzIiwiY2xpZW50L3N0YXRlcy9sYW5kaW5nL2luZGV4LmpzIiwiY2xpZW50L3N0YXRlcy9wbGF5ZXIvaW5kZXguanMiLCJjbGllbnQvd2lkZ2V0cy9zaWRlYmFyLmpzIiwiY2xpZW50L3dpZGdldHMvdG9vbGJhci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOzs7QUFHQTs7QUFFQTs7QUFDQSxRQUFRLHdCQUFSO0FBQ0EsUUFBUSx5QkFBUjs7QUFFQTtBQUNBLFFBQVEsc0JBQVI7QUFDQSxRQUFRLHNCQUFSOztBQUVBOztBQUVBO0FBQ0EsUUFBUSxtQkFBUjs7QUFFQTs7O0FBR0EsUUFBUSxNQUFSLENBQWUsb0JBQWYsRUFBcUM7QUFDakM7QUFDQSxZQUZpQyxFQUVuQjtBQUNkLFlBSGlDLEVBR25CO0FBQ2QsWUFKaUMsRUFJbkI7QUFDZCxXQUxpQyxFQUtwQjtBQUNiLFlBTmlDLEVBTW5CO0FBQ2QsZUFQaUMsRUFRakMsZ0JBUmlDLEVBU2pDLG9CQVRpQyxFQVNYO0FBQ3RCLFdBVmlDOztBQVlqQztBQUNBLHdCQWJpQyxFQWNqQyx5QkFkaUMsRUFlakMsMkJBZmlDOztBQWlCakM7QUFDQSxvQ0FsQmlDLEVBbUJqQyxvQ0FuQmlDLENBQXJDLEVBb0JHLE1BcEJILENBb0JVLENBQ04sbUJBRE0sRUFFTixvQkFGTSxFQUdOLG9CQUhNLEVBSU4sVUFBUyxpQkFBVCxFQUE0QixrQkFBNUIsRUFBZ0Qsa0JBQWhELEVBQW9FOztBQUdoRTs7O0FBR0Esb0JBQWtCLFVBQWxCLENBQTZCLEVBQTdCO0FBQ0Esb0JBQWtCLFNBQWxCLENBQTRCLEtBQTVCOztBQUVBOzs7O0FBSUMscUJBQW1CLGFBQW5CLENBQWlDLGNBQWpDLEVBQWlEO0FBQy9DLFVBQU0sUUFEeUM7QUFFL0MsV0FBTyxRQUZ3QztBQUcvQyxXQUFPLFFBSHdDO0FBSS9DLFdBQU8sUUFKd0M7QUFLL0MsV0FBTyxRQUx3QztBQU0vQyxXQUFPLFFBTndDO0FBTy9DLFdBQU8sUUFQd0M7QUFRL0MsV0FBTyxRQVJ3QztBQVMvQyxXQUFPLFFBVHdDO0FBVS9DLFdBQU8sUUFWd0M7QUFXL0MsWUFBUSxRQVh1QztBQVkvQyxZQUFRLFFBWnVDO0FBYS9DLFlBQVEsUUFidUM7QUFjL0MsWUFBUSxRQWR1QztBQWUvQyw0QkFBd0IsT0FmdUI7QUFnQi9DLDBCQUFzQixDQUNwQixJQURvQixFQUVwQixLQUZvQixFQUdwQixLQUhvQixFQUlwQixNQUpvQixFQUtwQixNQUxvQixDQWhCeUI7QUF1Qi9DLDJCQUF1QixDQUNyQixLQURxQixFQUVyQixLQUZxQixFQUdyQixLQUhxQixFQUlyQixLQUpxQixFQUtyQixLQUxxQixFQU1yQixLQU5xQixFQU9yQixLQVBxQixFQVFyQixNQVJxQixFQVNyQixNQVRxQjtBQXZCd0IsR0FBakQ7QUFtQ0EscUJBQW1CLGFBQW5CLENBQWlDLGdCQUFqQyxFQUFtRDtBQUNqRCxVQUFNLFFBRDJDO0FBRWpELFdBQU8sUUFGMEM7QUFHakQsV0FBTyxRQUgwQztBQUlqRCxXQUFPLFFBSjBDO0FBS2pELFdBQU8sUUFMMEM7QUFNakQsV0FBTyxRQU4wQztBQU9qRCxXQUFPLFFBUDBDO0FBUWpELFdBQU8sUUFSMEM7QUFTakQsV0FBTyxRQVQwQztBQVVqRCxXQUFPLFFBVjBDO0FBV2pELFlBQVEsUUFYeUM7QUFZakQsWUFBUSxRQVp5QztBQWFqRCxZQUFRLFFBYnlDO0FBY2pELFlBQVEsUUFkeUM7QUFlakQsNEJBQXdCLE9BZnlCO0FBZ0JqRCwwQkFBc0IsQ0FDcEIsSUFEb0IsRUFFcEIsS0FGb0IsRUFHcEIsS0FIb0IsRUFJcEIsS0FKb0IsRUFLcEIsS0FMb0IsRUFNcEIsS0FOb0IsRUFPcEIsS0FQb0IsRUFRcEIsS0FSb0IsRUFTcEIsS0FUb0IsRUFVcEIsTUFWb0IsRUFXcEIsTUFYb0IsRUFZcEIsTUFab0IsRUFhcEIsTUFib0IsQ0FoQjJCO0FBK0JqRCwyQkFBdUIsQ0FDckIsS0FEcUI7QUEvQjBCLEdBQW5EO0FBbUNBLHFCQUFtQixhQUFuQixDQUFpQyxpQkFBakMsRUFBb0Q7QUFDbEQsVUFBTSxRQUQ0QztBQUVsRCxXQUFPLFFBRjJDO0FBR2xELFdBQU8sUUFIMkM7QUFJbEQsV0FBTyxRQUoyQztBQUtsRCxXQUFPLFFBTDJDO0FBTWxELFdBQU8sUUFOMkM7QUFPbEQsV0FBTyxRQVAyQztBQVFsRCxXQUFPLFFBUjJDO0FBU2xELFdBQU8sUUFUMkM7QUFVbEQsV0FBTyxRQVYyQztBQVdsRCxZQUFRLFFBWDBDO0FBWWxELFlBQVEsUUFaMEM7QUFhbEQsWUFBUSxRQWIwQztBQWNsRCxZQUFRLFFBZDBDO0FBZWxELDRCQUF3QixPQWYwQjtBQWdCbEQsMEJBQXNCLENBQ3BCLElBRG9CLEVBRXBCLEtBRm9CLEVBR3BCLEtBSG9CLEVBSXBCLEtBSm9CLEVBS3BCLE1BTG9CLEVBTXBCLE1BTm9CLEVBT3BCLE1BUG9CLENBaEI0QjtBQXlCbEQsMkJBQXVCLENBQ3JCLEtBRHFCLEVBRXJCLEtBRnFCLEVBR3JCLEtBSHFCLEVBSXJCLEtBSnFCLEVBS3JCLEtBTHFCLEVBTXJCLEtBTnFCLEVBT3JCLE1BUHFCO0FBekIyQixHQUFwRDtBQW1DQSxxQkFBbUIsYUFBbkIsQ0FBaUMsb0JBQWpDLEVBQXVEO0FBQ3JELFVBQU0sUUFEK0M7QUFFckQsV0FBTyxRQUY4QztBQUdyRCxXQUFPLFFBSDhDO0FBSXJELFdBQU8sUUFKOEM7QUFLckQsV0FBTyxRQUw4QztBQU1yRCxXQUFPLFFBTjhDO0FBT3JELFdBQU8sUUFQOEM7QUFRckQsV0FBTyxRQVI4QztBQVNyRCxXQUFPLFFBVDhDO0FBVXJELFdBQU8sUUFWOEM7QUFXckQsWUFBUSxRQVg2QztBQVlyRCxZQUFRLFFBWjZDO0FBYXJELFlBQVEsUUFiNkM7QUFjckQsWUFBUSxRQWQ2QztBQWVyRCw0QkFBd0IsTUFmNkI7QUFnQnJELDBCQUFzQixDQUNwQixJQURvQixFQUVwQixLQUZvQixFQUdwQixLQUhvQixFQUlwQixLQUpvQixFQUtwQixLQUxvQixFQU1wQixLQU5vQixFQU9wQixLQVBvQixFQVFwQixLQVJvQixFQVNwQixLQVRvQixFQVVwQixLQVZvQixFQVdwQixNQVhvQixFQVlwQixNQVpvQixFQWFwQixNQWJvQixFQWNwQixNQWRvQixDQWhCK0I7QUFnQ3JELDJCQUF1QjtBQWhDOEIsR0FBdkQ7O0FBbUNELHFCQUFtQixLQUFuQixDQUF5QixVQUF6QixFQUNLLGNBREwsQ0FDb0IsaUJBRHBCLEVBRUssYUFGTCxDQUVtQixnQkFGbkIsRUFHSyxXQUhMLENBR2lCLGNBSGpCLEVBSUssaUJBSkwsQ0FJdUIsb0JBSnZCOztBQU1BO0FBQ0EscUJBQW1CLGVBQW5CLENBQW1DLFVBQW5DOztBQUVBOzs7QUFHQSxxQkFBbUIsU0FBbkIsQ0FBNkIsUUFBN0I7QUFHSCxDQTVLSyxDQXBCVixFQWlNRyxHQWpNSCxDQWlNTyxDQUNILFlBREcsRUFFSCxNQUZHLEVBR0gsY0FIRyxFQUlILGNBSkcsRUFLSCxVQUFTLFVBQVQsRUFBcUIsSUFBckIsRUFBMkIsWUFBM0IsRUFBeUMsWUFBekMsRUFBdUQ7QUFDckQ7OztBQUdDLGVBQWEsSUFBYjtBQUNGLENBVkUsQ0FqTVA7O0FBOE1BLFFBQVEsTUFBUixDQUFlLG9CQUFmLEVBQXFDLFVBQXJDLENBQWdELFVBQWhELEVBQTRELENBQUMsUUFBRCxFQUFXLE1BQVgsRUFBbUIsWUFBbkIsRUFBaUMsY0FBakMsRUFDMUQsVUFBUyxNQUFULEVBQWlCLElBQWpCLEVBQXVCLFVBQXZCLEVBQW1DLFlBQW5DLEVBQWlEO0FBQy9DOzs7QUFHQSxTQUFPLGFBQVAsR0FBdUIsWUFBVztBQUNoQyxlQUFXLFNBQVgsRUFBc0IsTUFBdEI7QUFDRCxHQUZEOztBQUlBLGVBQWEsSUFBYjtBQUNELENBVnlELENBQTVEOzs7OztBQ25PQTs7OztBQUlBLElBQUksWUFBWSxRQUFRLE1BQVIsQ0FBZSx3QkFBZixFQUF5QyxDQUFDLFlBQUQsQ0FBekMsQ0FBaEI7O0FBRUE7OztBQUdBLFVBQVUsUUFBVixDQUFtQixTQUFuQixFQUE4QiwyQkFBOUI7O0FBRUEsVUFBVSxPQUFWLENBQWtCLGFBQWxCLEVBQWlDLENBQUMsT0FBRCxFQUFVLFdBQVYsRUFBdUIsTUFBdkIsRUFBK0IsSUFBL0IsRUFBcUMsU0FBckMsRUFDL0IsVUFBUyxLQUFULEVBQWdCLFNBQWhCLEVBQTJCLElBQTNCLEVBQWlDLEVBQWpDLEVBQXFDLE9BQXJDLEVBQThDO0FBQzFDLE1BQUksY0FBYyxFQUFsQjs7QUFFQTs7O0FBR0EsY0FBWSxJQUFaLEdBQW1CLEVBQW5COztBQUVBLGNBQVksSUFBWixDQUFpQixLQUFqQixHQUF5QixVQUFTLEtBQVQsRUFBZ0IsUUFBaEIsRUFBMEI7QUFDakQsV0FBTyxNQUFNLElBQU4sQ0FBVyxVQUFVLGFBQXJCLEVBQW9DO0FBQ3ZDLGdCQUFVLEtBRDZCO0FBRXZDLGdCQUFVOztBQUY2QixLQUFwQyxDQUFQO0FBS0QsR0FORDs7QUFRQSxjQUFZLElBQVosQ0FBaUIsTUFBakIsR0FBMEIsWUFBVztBQUNuQyxXQUFPLE1BQU0sSUFBTixDQUFXLFVBQVUsY0FBckIsQ0FBUDtBQUNELEdBRkQ7O0FBSUEsY0FBWSxJQUFaLENBQWlCLE9BQWpCLEdBQTJCLFlBQVc7QUFDcEMsV0FBTyxNQUFNLEdBQU4sQ0FBVSxVQUFVLGVBQXBCLENBQVA7QUFDRCxHQUZEOztBQUlBLGNBQVksSUFBWixDQUFpQixRQUFqQixHQUE0QixVQUFTLEtBQVQsRUFBZ0IsUUFBaEIsRUFBMEI7QUFDcEQsV0FBTyxNQUFNLElBQU4sQ0FBVyxVQUFVLGdCQUFyQixFQUF1QztBQUM1QyxZQUFNO0FBQ0osZUFBTyxLQURIO0FBRUosa0JBQVU7QUFGTjtBQURzQyxLQUF2QyxDQUFQO0FBTUQsR0FQRDs7QUFTQSxTQUFPLFdBQVA7QUFDSCxDQW5DOEIsQ0FBakM7Ozs7O0FDWEE7Ozs7QUFJQSxJQUFJLGFBQWEsUUFBUSxNQUFSLENBQWUseUJBQWYsRUFBMEMsQ0FBQyxZQUFELEVBQWUsd0JBQWYsQ0FBMUMsQ0FBakI7O0FBRUE7Ozs7QUFJQSxXQUFXLE9BQVgsQ0FBbUIsY0FBbkIsRUFBbUMsQ0FBQyxPQUFELEVBQVUsZUFBVixFQUEyQixNQUEzQixFQUFtQyxJQUFuQyxFQUF5QyxVQUF6QyxFQUFxRCxhQUFyRCxFQUNqQyxVQUFTLEtBQVQsRUFBZ0IsYUFBaEIsRUFBK0IsSUFBL0IsRUFBcUMsRUFBckMsRUFBeUMsUUFBekMsRUFBbUQsV0FBbkQsRUFBZ0U7QUFDNUQsTUFBSSxlQUFlLEVBQW5COztBQUlBOzs7QUFHQSxlQUFhLElBQWIsR0FBb0IsWUFBVztBQUM3QixRQUFJLGNBQWMsV0FBZCxJQUE2QixjQUFjLFdBQWQsQ0FBMEIsS0FBM0QsRUFBa0U7QUFDaEUsbUJBQWEsUUFBYixDQUFzQixjQUFjLFdBQWQsQ0FBMEIsS0FBaEQ7QUFDRCxLQUZELE1BRU87QUFDTCxtQkFBYSxVQUFiO0FBQ0Q7O0FBRUQsZ0JBQVksSUFBWixDQUFpQixPQUFqQixHQUEyQixJQUEzQixDQUNFLFVBQVMsUUFBVCxFQUFtQjtBQUNqQixvQkFBYyxXQUFkLENBQTBCLElBQTFCLEdBQWlDLFNBQVMsSUFBVCxDQUFjLElBQS9DO0FBQ0QsS0FISCxFQUlFLEtBSkYsQ0FLRSxVQUFTLEdBQVQsRUFBYztBQUNaLGFBQU8sY0FBYyxXQUFyQjtBQUNBLG1CQUFhLGNBQWI7QUFDRCxLQVJIO0FBVUQsR0FqQkQ7O0FBbUJBOzs7QUFHQSxlQUFhLEtBQWIsR0FBcUIsVUFBUyxLQUFULEVBQWdCLFFBQWhCLEVBQTBCO0FBQzdDLGdCQUFZLElBQVosQ0FBaUIsS0FBakIsQ0FBdUIsS0FBdkIsRUFBOEIsUUFBOUIsRUFBd0MsSUFBeEMsQ0FDRSxVQUFTLFFBQVQsRUFBbUI7QUFDakIsb0JBQWMsV0FBZCxHQUE0QixFQUFFLE1BQU0sU0FBUyxJQUFULENBQWMsSUFBdEIsRUFBNEIsT0FBTyxTQUFTLElBQVQsQ0FBYyxLQUFqRCxFQUE1QjtBQUNBLG1CQUFhLFFBQWIsQ0FBc0IsU0FBUyxJQUFULENBQWMsS0FBcEM7QUFDRCxLQUpILEVBS0UsS0FMRixDQU1FLFVBQVMsR0FBVCxFQUFjO0FBQ1o7QUFDQSxZQUFNLElBQUksS0FBSixDQUFVLEdBQVYsQ0FBTjtBQUNELEtBVEg7QUFXRCxHQVpEOztBQWNBOzs7QUFHQSxlQUFhLE1BQWIsR0FBc0IsWUFBVztBQUMvQixnQkFBWSxJQUFaLENBQWlCLE1BQWpCLEdBQTBCLElBQTFCLENBQ0UsWUFBVztBQUNULGFBQU8sY0FBYyxXQUFyQjtBQUNBLG1CQUFhLFVBQWI7QUFDRCxLQUpILEVBS0UsS0FMRixDQU1FLFVBQVMsR0FBVCxFQUFjO0FBQ1o7QUFDQSxZQUFNLElBQUksS0FBSixDQUFVLEdBQVYsQ0FBTjtBQUNELEtBVEg7QUFXRCxHQVpEOztBQWNBOzs7QUFHQSxlQUFhLFFBQWIsR0FBd0IsVUFBUyxLQUFULEVBQWdCLFFBQWhCLEVBQTBCO0FBQ2hELGdCQUFZLElBQVosQ0FBaUIsUUFBakIsQ0FBMEIsS0FBMUIsRUFBaUMsUUFBakMsRUFBMkMsSUFBM0MsQ0FDRSxVQUFTLFFBQVQsRUFBbUI7QUFDakIsb0JBQWMsV0FBZCxHQUE0QixFQUFFLE1BQU0sU0FBUyxJQUFULENBQWMsSUFBdEIsRUFBNEIsT0FBTyxTQUFTLElBQVQsQ0FBYyxLQUFqRCxFQUE1QjtBQUNBLG1CQUFhLFFBQWIsQ0FBc0IsU0FBUyxJQUFULENBQWMsS0FBcEM7QUFDRCxLQUpILEVBS0UsS0FMRixDQU1FLFVBQVMsR0FBVCxFQUFjO0FBQ1o7QUFDQSxZQUFNLElBQUksS0FBSixDQUFVLEdBQVYsQ0FBTjtBQUNELEtBVEg7QUFXRCxHQVpEOztBQWNBOzs7QUFHQSxlQUFhLGNBQWIsR0FBOEIsVUFBUyxNQUFULEVBQWlCO0FBQzdDLFFBQUksV0FBVyxHQUFHLEtBQUgsRUFBZjs7QUFFQSxRQUFJLGdCQUFnQixTQUFTLGdCQUFULEdBQ2pCLFFBRGlCLEdBRWpCLE1BRmlCLEVBQXBCOztBQUlBLFFBQUksaUJBQWlCLFNBQVMsaUJBQVQsR0FDbEIsUUFEa0IsQ0FDVCxFQUFFLEtBQUssQ0FBUCxFQUFVLE9BQU0sQ0FBaEIsRUFEUyxFQUVsQixRQUZrQixDQUVULEdBRlMsRUFHbEIsT0FIa0IsQ0FHVixFQUFFLEtBQUssQ0FBUCxFQUFVLE9BQU0sQ0FBaEIsRUFIVSxFQUlsQixhQUprQixDQUlKLFNBQVMsU0FBVCxDQUFtQixLQUpmLENBQXJCOztBQU1BLFFBQUksY0FBYztBQUNoQixnQkFBVSxRQUFRLE9BQVIsQ0FBZ0IsU0FBUyxJQUF6QixDQURNO0FBRWhCLGtCQUFZLFdBRkk7QUFHaEIsMkJBQXFCLElBSEw7QUFJaEIsbUJBQWEsd0JBSkc7QUFLaEIsa0JBQVksZ0JBTEk7QUFNaEIsY0FBUSxHQU5RO0FBT2hCLGNBQVE7QUFDTixrQkFBVTtBQURKLE9BUFE7QUFVaEIsaUJBQVcsSUFWSztBQVdoQiwyQkFBcUIsSUFYTDtBQVloQiwwQkFBb0IsSUFaSjtBQWFoQixtQkFBYSxJQWJHO0FBY2hCLGdCQUFVLGFBZE07QUFlaEIsaUJBQVc7QUFmSyxLQUFsQjs7QUFrQkEsYUFBUyxJQUFULENBQWMsV0FBZDs7QUFFQSxXQUFPLFNBQVMsT0FBaEI7QUFDRCxHQWxDRDs7QUFvQ0E7OztBQUdBLGVBQWEsaUJBQWIsR0FBaUMsWUFBVztBQUMxQyxRQUFJLFdBQVcsR0FBRyxLQUFILEVBQWY7O0FBRUEsUUFBSSxnQkFBZ0IsU0FBUyxnQkFBVCxHQUNqQixRQURpQixHQUVqQixNQUZpQixFQUFwQjs7QUFJQSxRQUFJLGlCQUFpQixTQUFTLGlCQUFULEdBQ2xCLFFBRGtCLENBQ1QsRUFBQyxLQUFLLENBQU4sRUFBUyxNQUFNLENBQWYsRUFEUyxFQUVsQixRQUZrQixDQUVULEdBRlMsRUFHbEIsT0FIa0IsQ0FHVixFQUFDLEtBQUssQ0FBTixFQUFTLE1BQU0sQ0FBZixFQUhVLEVBSWxCLGFBSmtCLENBSUosU0FBUyxTQUFULENBQW1CLEtBSmYsQ0FBckI7O0FBTUEsUUFBSSxjQUFjO0FBQ2hCLGdCQUFVLFFBQVEsT0FBUixDQUFnQixTQUFTLElBQXpCLENBRE07QUFFaEIsa0JBQVksY0FGSTtBQUdoQiwyQkFBcUIsSUFITDtBQUloQixtQkFBYSwyQkFKRztBQUtoQixrQkFBWSxnQkFMSTtBQU1oQixjQUFRLEdBTlE7QUFPaEIsY0FBUTtBQUNOLGtCQUFVO0FBREosT0FQUTtBQVVoQixpQkFBVyxJQVZLO0FBV2hCLDJCQUFxQixJQVhMO0FBWWhCLDBCQUFvQixJQVpKO0FBYWhCLG1CQUFhLElBYkc7QUFjaEIsZ0JBQVUsYUFkTTtBQWVoQixpQkFBVztBQWZLLEtBQWxCOztBQWtCQSxhQUFTLElBQVQsQ0FBYyxXQUFkOztBQUVBLFdBQU8sU0FBUyxPQUFoQjtBQUNELEdBbENEOztBQW9DQTs7O0FBR0EsZUFBYSxnQkFBYixHQUFnQyxVQUFTLFVBQVQsRUFBcUI7QUFDbkQ7QUFDRCxHQUZEOztBQUlBLGVBQWEsUUFBYixHQUF3QixVQUFTLEtBQVQsRUFBZ0I7QUFDdEMsVUFBTSxRQUFOLENBQWUsT0FBZixDQUF1QixNQUF2QixDQUE4QixhQUE5QixHQUE4QyxZQUFZLEtBQTFEO0FBQ0QsR0FGRDs7QUFJQSxlQUFhLFVBQWIsR0FBMEIsWUFBVztBQUNuQyxVQUFNLFFBQU4sQ0FBZSxPQUFmLENBQXVCLE1BQXZCLENBQThCLGFBQTlCLEdBQStDLEVBQS9DO0FBQ0QsR0FGRDs7QUFJQSxTQUFPLFlBQVA7QUFDSCxDQTdLZ0MsQ0FBbkM7O0FBZ0xBLFdBQVcsVUFBWCxDQUFzQixXQUF0QixFQUFtQyxDQUFDLFlBQUQsRUFBZSxRQUFmLEVBQXlCLE1BQXpCLEVBQWlDLGFBQWpDLEVBQWdELGNBQWhELEVBQ2pDLFVBQVMsVUFBVCxFQUFxQixNQUFyQixFQUE2QixJQUE3QixFQUFtQyxXQUFuQyxFQUFnRCxZQUFoRCxFQUE4RDtBQUM1RCxTQUFPLE9BQVAsR0FBaUIsS0FBakI7QUFDQSxTQUFPLFNBQVAsR0FBbUIsRUFBbkI7QUFDQTs7O0FBR0EsU0FBTyxZQUFQLEdBQXNCLFlBQVc7QUFDL0I7QUFDQSxXQUFPLE9BQVAsR0FBaUIsSUFBakI7O0FBRUEsZ0JBQVksSUFBWixDQUFpQixLQUFqQixDQUF1QixPQUFPLFNBQTlCLEVBQXlDLE9BQU8sWUFBaEQsRUFBOEQsSUFBOUQsQ0FDRSxZQUFXO0FBQ1QsYUFBTyxPQUFQLEdBQWlCLEtBQWpCO0FBQ0EsaUJBQVcsS0FBWDtBQUNELEtBSkgsRUFLRSxLQUxGLENBTUUsVUFBUyxHQUFULEVBQWM7QUFDWixXQUFLLEtBQUwsQ0FBVyxHQUFYO0FBQ0EsYUFBTyxTQUFQLEdBQW1CLG1CQUFuQjtBQUNBLGFBQU8sT0FBUCxHQUFpQixLQUFqQjtBQUNBO0FBQ0QsS0FYSDtBQWFELEdBakJEOztBQW1CQTs7O0FBR0EsU0FBTyxlQUFQLEdBQXlCLFlBQVc7QUFDbEMsaUJBQWEsaUJBQWI7QUFDQSxlQUFXLEtBQVg7QUFDRCxHQUhEOztBQUtBLFNBQU8sWUFBUCxHQUFzQixZQUFXO0FBQy9CLGVBQVcsS0FBWDtBQUNELEdBRkQ7QUFHRCxDQXJDZ0MsQ0FBbkM7O0FBeUNBLFdBQVcsVUFBWCxDQUFzQixjQUF0QixFQUFzQyxDQUFDLFlBQUQsRUFBZSxRQUFmLEVBQXlCLE1BQXpCLEVBQWlDLGFBQWpDLEVBQWdELGNBQWhELEVBQ3BDLFVBQVMsVUFBVCxFQUFxQixNQUFyQixFQUE2QixJQUE3QixFQUFtQyxXQUFuQyxFQUFnRCxZQUFoRCxFQUE4RDtBQUM1RCxTQUFPLE9BQVAsR0FBaUIsS0FBakI7QUFDQSxTQUFPLFNBQVAsR0FBbUIsRUFBbkI7QUFDQTs7O0FBR0EsU0FBTyxlQUFQLEdBQXlCLFlBQVc7QUFDbEM7QUFDQSxXQUFPLE9BQVAsR0FBaUIsSUFBakI7O0FBRUEsZ0JBQVksSUFBWixDQUFpQixRQUFqQixDQUEwQixPQUFPLFNBQWpDLEVBQTRDLE9BQU8sWUFBbkQsRUFBaUUsSUFBakUsQ0FDRSxZQUFXO0FBQ1QsYUFBTyxPQUFQLEdBQWlCLEtBQWpCO0FBQ0EsaUJBQVcsS0FBWDtBQUNELEtBSkgsRUFLRSxLQUxGLENBTUUsVUFBUyxHQUFULEVBQWM7QUFDWixXQUFLLEtBQUwsQ0FBVyxHQUFYO0FBQ0EsYUFBTyxTQUFQLEdBQW1CLG9CQUFuQjtBQUNBLGFBQU8sT0FBUCxHQUFpQixLQUFqQjtBQUNBO0FBQ0QsS0FYSDtBQWFELEdBakJEOztBQW1CQTs7O0FBR0EsU0FBTyxZQUFQLEdBQXNCLFlBQVc7QUFDL0IsaUJBQWEsY0FBYjtBQUNBLGVBQVcsS0FBWDtBQUNELEdBSEQ7O0FBS0EsU0FBTyxZQUFQLEdBQXNCLFlBQVc7QUFDL0IsZUFBVyxLQUFYO0FBQ0QsR0FGRDtBQUdELENBckNtQyxDQUF0Qzs7Ozs7QUNuT0E7Ozs7QUFJQSxJQUFJLGFBQWEsUUFBUSxNQUFSLENBQWUsaUNBQWYsRUFBa0QsQ0FDakUsV0FEaUUsQ0FBbEQsQ0FBakI7O0FBSUE7OztBQUdBLFdBQVcsUUFBWCxDQUFvQixhQUFwQixFQUFtQyxPQUFuQzs7QUFFQTs7O0FBR0EsV0FBVyxRQUFYLENBQW9CLGlCQUFwQixFQUF1QyxRQUF2Qzs7QUFFQTs7O0FBR0EsV0FBVyxNQUFYLENBQWtCLENBQ2hCLGdCQURnQixFQUVoQixhQUZnQixFQUdoQixpQkFIZ0IsRUFJaEIsVUFBUyxjQUFULEVBQXlCLFdBQXpCLEVBQXNDLGVBQXRDLEVBQXVEOztBQUVyRDs7O0FBR0EsaUJBQ0csS0FESCxDQUNTLFdBRFQsRUFDc0I7QUFDbEIsU0FBSyxlQURhO0FBRWxCLFlBQVEsRUFGVTtBQUdsQixjQUFVO0FBSFEsR0FEdEI7QUFPRCxDQWhCZSxDQUFsQjs7Ozs7QUNyQkEsUUFBUSxvQkFBUjtBQUNBLFFBQVEsbUJBQVI7QUFDQSxRQUFRLGtCQUFSOztBQUVBOzs7O0FBSUEsUUFBUSxNQUFSLENBQWUsMkJBQWYsRUFBNEMsQ0FDMUMsbUNBRDBDLEVBRTFDLGtDQUYwQyxFQUcxQyxpQ0FIMEMsQ0FBNUM7Ozs7O0FDUkE7Ozs7QUFJQSxJQUFJLGVBQWUsUUFBUSxNQUFSLENBQWUsbUNBQWYsRUFBb0QsQ0FDckUsV0FEcUUsQ0FBcEQsQ0FBbkI7O0FBSUE7OztBQUdBLGFBQWEsUUFBYixDQUFzQixlQUF0QixFQUF1QyxTQUF2Qzs7QUFFQTs7O0FBR0EsYUFBYSxRQUFiLENBQXNCLG1CQUF0QixFQUEyQyxRQUEzQzs7QUFFQTs7O0FBR0EsYUFBYSxRQUFiLENBQXNCLHNCQUF0QixFQUE4QywwQkFBOUM7O0FBRUE7OztBQUdBLGFBQWEsTUFBYixDQUFvQixDQUNsQixnQkFEa0IsRUFFbEIsZUFGa0IsRUFHbEIsbUJBSGtCLEVBSWxCLHNCQUprQixFQUtsQixVQUFTLGNBQVQsRUFBeUIsYUFBekIsRUFBd0MsaUJBQXhDLEVBQTJELG9CQUEzRCxFQUFpRjs7QUFFL0U7OztBQUdBLGlCQUNHLEtBREgsQ0FDUyxhQURULEVBQ3dCO0FBQ3BCLFNBQUssaUJBRGU7QUFFcEIsWUFBUSxFQUZZO0FBR3BCLGdCQUFZLGtCQUhRO0FBSXBCLGlCQUFhO0FBSk8sR0FEeEI7QUFRRCxDQWxCaUIsQ0FBcEI7O0FBcUJBOzs7QUFHQSxhQUFhLFVBQWIsQ0FBd0Isa0JBQXhCLEVBQTRDLENBQzFDLFlBQVcsQ0FFVixDQUh5QyxDQUE1Qzs7Ozs7QUNsREE7Ozs7QUFJQSxJQUFJLGNBQWMsUUFBUSxNQUFSLENBQWUsa0NBQWYsRUFBbUQsQ0FDbkUsV0FEbUUsQ0FBbkQsQ0FBbEI7O0FBSUE7OztBQUdBLFlBQVksUUFBWixDQUFxQixjQUFyQixFQUFxQyxRQUFyQzs7QUFFQTs7O0FBR0EsWUFBWSxRQUFaLENBQXFCLGtCQUFyQixFQUF5QyxTQUF6Qzs7QUFFQTs7O0FBR0EsWUFBWSxNQUFaLENBQW1CLENBQ2pCLGdCQURpQixFQUVqQixjQUZpQixFQUdqQixrQkFIaUIsRUFJakIsVUFBUyxjQUFULEVBQXlCLFlBQXpCLEVBQXVDLGdCQUF2QyxFQUF5RDs7QUFFdkQ7OztBQUdBLGlCQUNHLEtBREgsQ0FDUyxZQURULEVBQ3VCO0FBQ25CLFNBQUssZ0JBRGM7QUFFbkIsWUFBUSxFQUZXO0FBR25CLGNBQVU7QUFIUyxHQUR2QjtBQU9ELENBaEJnQixDQUFuQjs7Ozs7QUNyQkE7Ozs7QUFJQSxJQUFJLGdCQUFnQixRQUFRLE1BQVIsQ0FBZSxvQ0FBZixFQUFxRCxDQUN2RSxXQUR1RSxFQUV2RSx3QkFGdUUsRUFHdkUseUJBSHVFLENBQXJELENBQXBCOztBQU9BOzs7QUFHQSxjQUFjLFVBQWQsQ0FBeUIsbUJBQXpCLEVBQThDLENBQzVDLFlBQVcsQ0FFVixDQUgyQyxDQUE5Qzs7Ozs7QUNkQTs7OztBQUlBLElBQUksZ0JBQWdCLFFBQVEsTUFBUixDQUFlLG9DQUFmLEVBQXFELENBQ3ZFLFdBRHVFLEVBRXZFLHdCQUZ1RSxFQUd2RSx5QkFIdUUsQ0FBckQsQ0FBcEI7O0FBTUE7OztBQUdBLGNBQWMsVUFBZCxDQUF5QixtQkFBekIsRUFBOEMsQ0FBQyxRQUFELEVBQVcsY0FBWCxFQUM1QyxVQUFTLE1BQVQsRUFBaUIsWUFBakIsRUFBK0I7QUFDN0IsU0FBTyxZQUFQLEdBQXNCLFlBQVc7QUFDL0I7QUFDQSxXQUFPLEtBQVA7QUFDRCxHQUhEOztBQUtBLFNBQU8sWUFBUCxHQUFzQixZQUFXO0FBQy9CLGlCQUFhLGNBQWI7QUFDRCxHQUZEOztBQUlBLFNBQU8sY0FBUCxHQUF3QixZQUFXO0FBQ2pDO0FBQ0QsR0FGRDs7QUFJQSxTQUFPLGNBQVAsR0FBd0IsWUFBVyxDQUVsQyxDQUZEO0FBR0QsQ0FsQjJDLENBQTlDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLyoqXG4gKiBAbmFtZXNwYWNlIEp1c3RpY2FyLldlYkNsaWVudFxuICovXG4ndXNlIHN0cmljdCc7XG5cbi8vIExvY2FsIEFuZ3VsYXIgTW9kdWxlcyBPbmx5LiBQbHVnaW5zIGFuZCBvdGhlciBsaWJyYXJpZXMgZ28gaW4gdGhlIGxpYi5qcyBmb2xkZXIgdG8gbWFrZSBmb3IgcXVpY2tlciBjb21waWxpbmcuXG5yZXF1aXJlKCcuL21vZHVsZXMvYXBpL2luZGV4LmpzJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvYXV0aC9pbmRleC5qcycpO1xuXG4vLyBXaWRnZXRzXG5yZXF1aXJlKCcuL3dpZGdldHMvdG9vbGJhci5qcycpO1xucmVxdWlyZSgnLi93aWRnZXRzL3NpZGViYXIuanMnKTtcblxuLy8gTWl4aW5zXG5cbi8vIExvY2FsIFN0YXRlIE1vZHVsZXNcbnJlcXVpcmUoJy4vc3RhdGVzL2luZGV4LmpzJyk7XG5cbi8vIERlZmluZSBtYWluIG1vZHVsZVxuXG5cbmFuZ3VsYXIubW9kdWxlKCdKdXN0aWNhci5XZWJDbGllbnQnLCBbXG4gICAgLy8gQW5ndWxhciBMaWJyYXJpZXNcbiAgICAnbmdNYXRlcmlhbCcsIC8vIGFuZ3VsYXItbWF0ZXJpYWxcbiAgICAnbmdTYW5pdGl6ZScsIC8vIGFuZ3VsYXItc2FuaXRpemVcbiAgICAnbmdSZXNvdXJjZScsIC8vIGFuZ3VsYXItcmVzb3VyY2VcbiAgICAnbmdBbmltYXRlJywgLy8gYW5ndWxhci1hbmltYXRlXG4gICAgJ25nTWVzc2FnZXMnLCAvLyBhbmd1bGFyLW1lc3NhZ2VzXG4gICAgJ2FuZ3VsYXJNb21lbnQnLFxuICAgICdhbmd1bGFyLmZpbHRlcicsXG4gICAgJ0xvY2FsU3RvcmFnZU1vZHVsZScsIC8vIGFuZ3VsYXItbG9jYWwtc3RvcmFnZVxuICAgICd1aS5yb3V0ZXInLFxuXG4gICAgLy8gTG9jYWwgbW9kdWxlc1xuICAgICdKdXN0aWNhci5XZWJDbGllbnQuQVBJJyxcbiAgICAnSnVzdGljYXIuV2ViQ2xpZW50LkF1dGgnLFxuICAgICdKdXN0aWNhci5XZWJDbGllbnQuU3RhdGVzJyxcblxuICAgIC8vIFdpZGdldHNcbiAgICAnSnVzdGljYXIuV2ViQ2xpZW50LldpZGdldHMuVG9vbGJhcicsXG4gICAgJ0p1c3RpY2FyLldlYkNsaWVudC5XaWRnZXRzLlNpZGViYXInXG5dKS5jb25maWcoW1xuICAgICckbG9jYXRpb25Qcm92aWRlcicsXG4gICAgJyRtZFRoZW1pbmdQcm92aWRlcicsXG4gICAgJyR1cmxSb3V0ZXJQcm92aWRlcicsXG4gICAgZnVuY3Rpb24oJGxvY2F0aW9uUHJvdmlkZXIsICRtZFRoZW1pbmdQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogJGxvY2F0aW9uUHJvdmlkZXIgc2V0dGluZ3NcbiAgICAgICAgICovXG4gICAgICAgICRsb2NhdGlvblByb3ZpZGVyLmhhc2hQcmVmaXgoJycpO1xuICAgICAgICAkbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUoZmFsc2UpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGVtaW5nXG4gICAgICAgICAqL1xuXG4gICAgICAgICAkbWRUaGVtaW5nUHJvdmlkZXIuZGVmaW5lUGFsZXR0ZSgnanVzdGljYXJXYXJuJywge1xuICAgICAgICAgICAnNTAnOiAnZWRlM2UzJyxcbiAgICAgICAgICAgJzEwMCc6ICdkM2JhYmEnLFxuICAgICAgICAgICAnMjAwJzogJ2I2OGM4YycsXG4gICAgICAgICAgICczMDAnOiAnOTk1ZTVlJyxcbiAgICAgICAgICAgJzQwMCc6ICc4MzNjM2MnLFxuICAgICAgICAgICAnNTAwJzogJzZkMTkxOScsXG4gICAgICAgICAgICc2MDAnOiAnNjUxNjE2JyxcbiAgICAgICAgICAgJzcwMCc6ICc1YTEyMTInLFxuICAgICAgICAgICAnODAwJzogJzUwMGUwZScsXG4gICAgICAgICAgICc5MDAnOiAnM2UwODA4JyxcbiAgICAgICAgICAgJ0ExMDAnOiAnZmY3NTc1JyxcbiAgICAgICAgICAgJ0EyMDAnOiAnZmY0MjQyJyxcbiAgICAgICAgICAgJ0E0MDAnOiAnYjgwYzBjJyxcbiAgICAgICAgICAgJ0E3MDAnOiAnOTcwMDAwJyxcbiAgICAgICAgICAgJ2NvbnRyYXN0RGVmYXVsdENvbG9yJzogJ2xpZ2h0JyxcbiAgICAgICAgICAgJ2NvbnRyYXN0RGFya0NvbG9ycyc6IFtcbiAgICAgICAgICAgICAnNTAnLFxuICAgICAgICAgICAgICcxMDAnLFxuICAgICAgICAgICAgICcyMDAnLFxuICAgICAgICAgICAgICdBMTAwJyxcbiAgICAgICAgICAgICAnQTIwMCdcbiAgICAgICAgICAgXSxcbiAgICAgICAgICAgJ2NvbnRyYXN0TGlnaHRDb2xvcnMnOiBbXG4gICAgICAgICAgICAgJzMwMCcsXG4gICAgICAgICAgICAgJzQwMCcsXG4gICAgICAgICAgICAgJzUwMCcsXG4gICAgICAgICAgICAgJzYwMCcsXG4gICAgICAgICAgICAgJzcwMCcsXG4gICAgICAgICAgICAgJzgwMCcsXG4gICAgICAgICAgICAgJzkwMCcsXG4gICAgICAgICAgICAgJ0E0MDAnLFxuICAgICAgICAgICAgICdBNzAwJ1xuICAgICAgICAgICBdXG4gICAgICAgICB9KTtcbiAgICAgICAgICRtZFRoZW1pbmdQcm92aWRlci5kZWZpbmVQYWxldHRlKCdqdXN0aWNhckFjY2VudCcsIHtcbiAgICAgICAgICAgJzUwJzogJ2ZjZjJlNycsXG4gICAgICAgICAgICcxMDAnOiAnZjhkZWMzJyxcbiAgICAgICAgICAgJzIwMCc6ICdmM2M4OWMnLFxuICAgICAgICAgICAnMzAwJzogJ2VlYjI3NCcsXG4gICAgICAgICAgICc0MDAnOiAnZWFhMjU2JyxcbiAgICAgICAgICAgJzUwMCc6ICdlNjkxMzgnLFxuICAgICAgICAgICAnNjAwJzogJ2UzODkzMicsXG4gICAgICAgICAgICc3MDAnOiAnZGY3ZTJiJyxcbiAgICAgICAgICAgJzgwMCc6ICdkYjc0MjQnLFxuICAgICAgICAgICAnOTAwJzogJ2Q1NjIxNycsXG4gICAgICAgICAgICdBMTAwJzogJ2Y5ZGFiYScsXG4gICAgICAgICAgICdBMjAwJzogJ2YyY2RhNycsXG4gICAgICAgICAgICdBNDAwJzogJ2ZmYzNhMScsXG4gICAgICAgICAgICdBNzAwJzogJ2ZmYjI4NycsXG4gICAgICAgICAgICdjb250cmFzdERlZmF1bHRDb2xvcic6ICdsaWdodCcsXG4gICAgICAgICAgICdjb250cmFzdERhcmtDb2xvcnMnOiBbXG4gICAgICAgICAgICAgJzUwJyxcbiAgICAgICAgICAgICAnMTAwJyxcbiAgICAgICAgICAgICAnMjAwJyxcbiAgICAgICAgICAgICAnMzAwJyxcbiAgICAgICAgICAgICAnNDAwJyxcbiAgICAgICAgICAgICAnNTAwJyxcbiAgICAgICAgICAgICAnNjAwJyxcbiAgICAgICAgICAgICAnNzAwJyxcbiAgICAgICAgICAgICAnODAwJyxcbiAgICAgICAgICAgICAnQTEwMCcsXG4gICAgICAgICAgICAgJ0EyMDAnLFxuICAgICAgICAgICAgICdBNDAwJyxcbiAgICAgICAgICAgICAnQTcwMCdcbiAgICAgICAgICAgXSxcbiAgICAgICAgICAgJ2NvbnRyYXN0TGlnaHRDb2xvcnMnOiBbXG4gICAgICAgICAgICAgJzkwMCdcbiAgICAgICAgICAgXVxuICAgICAgICAgfSk7XG4gICAgICAgICAkbWRUaGVtaW5nUHJvdmlkZXIuZGVmaW5lUGFsZXR0ZSgnanVzdGljYXJQcmltYXJ5Jywge1xuICAgICAgICAgICAnNTAnOiAnZjBlOGY2JyxcbiAgICAgICAgICAgJzEwMCc6ICdkYWM1ZTknLFxuICAgICAgICAgICAnMjAwJzogJ2MyOWZkYScsXG4gICAgICAgICAgICczMDAnOiAnYWE3OWNiJyxcbiAgICAgICAgICAgJzQwMCc6ICc5NzVjYzAnLFxuICAgICAgICAgICAnNTAwJzogJzg1M2ZiNScsXG4gICAgICAgICAgICc2MDAnOiAnN2QzOWFlJyxcbiAgICAgICAgICAgJzcwMCc6ICc3MjMxYTUnLFxuICAgICAgICAgICAnODAwJzogJzY4Mjk5ZCcsXG4gICAgICAgICAgICc5MDAnOiAnNTUxYjhkJyxcbiAgICAgICAgICAgJ0ExMDAnOiAnZTFjNmZmJyxcbiAgICAgICAgICAgJ0EyMDAnOiAnYzc5M2ZmJyxcbiAgICAgICAgICAgJ0E0MDAnOiAnYWM2MGZmJyxcbiAgICAgICAgICAgJ0E3MDAnOiAnOWY0N2ZmJyxcbiAgICAgICAgICAgJ2NvbnRyYXN0RGVmYXVsdENvbG9yJzogJ2xpZ2h0JyxcbiAgICAgICAgICAgJ2NvbnRyYXN0RGFya0NvbG9ycyc6IFtcbiAgICAgICAgICAgICAnNTAnLFxuICAgICAgICAgICAgICcxMDAnLFxuICAgICAgICAgICAgICcyMDAnLFxuICAgICAgICAgICAgICczMDAnLFxuICAgICAgICAgICAgICdBMTAwJyxcbiAgICAgICAgICAgICAnQTIwMCcsXG4gICAgICAgICAgICAgJ0E0MDAnXG4gICAgICAgICAgIF0sXG4gICAgICAgICAgICdjb250cmFzdExpZ2h0Q29sb3JzJzogW1xuICAgICAgICAgICAgICc0MDAnLFxuICAgICAgICAgICAgICc1MDAnLFxuICAgICAgICAgICAgICc2MDAnLFxuICAgICAgICAgICAgICc3MDAnLFxuICAgICAgICAgICAgICc4MDAnLFxuICAgICAgICAgICAgICc5MDAnLFxuICAgICAgICAgICAgICdBNzAwJ1xuICAgICAgICAgICBdXG4gICAgICAgICB9KTtcbiAgICAgICAgICRtZFRoZW1pbmdQcm92aWRlci5kZWZpbmVQYWxldHRlKCdqdXN0aWNhckJhY2tncm91bmQnLCB7XG4gICAgICAgICAgICc1MCc6ICdmYWZhZmMnLFxuICAgICAgICAgICAnMTAwJzogJ2Y0ZjJmOCcsXG4gICAgICAgICAgICcyMDAnOiAnZWNlOWY0JyxcbiAgICAgICAgICAgJzMwMCc6ICdlNGUwZjAnLFxuICAgICAgICAgICAnNDAwJzogJ2RmZDllYycsXG4gICAgICAgICAgICc1MDAnOiAnZDlkMmU5JyxcbiAgICAgICAgICAgJzYwMCc6ICdkNWNkZTYnLFxuICAgICAgICAgICAnNzAwJzogJ2NmYzdlMycsXG4gICAgICAgICAgICc4MDAnOiAnY2FjMWRmJyxcbiAgICAgICAgICAgJzkwMCc6ICdjMGI2ZDknLFxuICAgICAgICAgICAnQTEwMCc6ICdmZmZmZmYnLFxuICAgICAgICAgICAnQTIwMCc6ICdmZmZmZmYnLFxuICAgICAgICAgICAnQTQwMCc6ICdmZmZmZmYnLFxuICAgICAgICAgICAnQTcwMCc6ICdmZmZmZmYnLFxuICAgICAgICAgICAnY29udHJhc3REZWZhdWx0Q29sb3InOiAnZGFyaycsXG4gICAgICAgICAgICdjb250cmFzdERhcmtDb2xvcnMnOiBbXG4gICAgICAgICAgICAgJzUwJyxcbiAgICAgICAgICAgICAnMTAwJyxcbiAgICAgICAgICAgICAnMjAwJyxcbiAgICAgICAgICAgICAnMzAwJyxcbiAgICAgICAgICAgICAnNDAwJyxcbiAgICAgICAgICAgICAnNTAwJyxcbiAgICAgICAgICAgICAnNjAwJyxcbiAgICAgICAgICAgICAnNzAwJyxcbiAgICAgICAgICAgICAnODAwJyxcbiAgICAgICAgICAgICAnOTAwJyxcbiAgICAgICAgICAgICAnQTEwMCcsXG4gICAgICAgICAgICAgJ0EyMDAnLFxuICAgICAgICAgICAgICdBNDAwJyxcbiAgICAgICAgICAgICAnQTcwMCdcbiAgICAgICAgICAgXSxcbiAgICAgICAgICAgJ2NvbnRyYXN0TGlnaHRDb2xvcnMnOiBbXVxuICAgICAgICAgfSk7XG5cbiAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdqdXN0aWNhcicpXG4gICAgICAgICAgICAucHJpbWFyeVBhbGV0dGUoJ2p1c3RpY2FyUHJpbWFyeScpXG4gICAgICAgICAgICAuYWNjZW50UGFsZXR0ZSgnanVzdGljYXJBY2NlbnQnKVxuICAgICAgICAgICAgLndhcm5QYWxldHRlKCdqdXN0aWNhcldhcm4nKVxuICAgICAgICAgICAgLmJhY2tncm91bmRQYWxldHRlKCdqdXN0aWNhckJhY2tncm91bmQnKTtcblxuICAgICAgICAvLyBzZXR0aW5nIGl0IGFzIGRlZmF1bHQgdGhlbWVcbiAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLnNldERlZmF1bHRUaGVtZSgnanVzdGljYXInKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogU2V0dGluZyB1cCBzdGF0ZSBtYWNoaW5lXG4gICAgICAgICAqL1xuICAgICAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKFwiL3N0YXJ0XCIpO1xuXG5cbiAgICB9XG5dKS5ydW4oW1xuICAgICckcm9vdFNjb3BlJyxcbiAgICAnJGxvZycsXG4gICAgJyR0cmFuc2l0aW9ucycsXG4gICAgJ0p1c3RpY2FyQXV0aCcsXG4gICAgZnVuY3Rpb24oJHJvb3RTY29wZSwgJGxvZywgJHRyYW5zaXRpb25zLCBKdXN0aWNhckF1dGgpIHtcbiAgICAgIC8qKlxuICAgICAgICogSW5pdGlhbGl6ZSB1c2VyIGNyZWRlbnRpYWxzXG4gICAgICAgKi9cbiAgICAgICBKdXN0aWNhckF1dGguaW5pdCgpO1xuICAgIH1cbl0pO1xuXG5hbmd1bGFyLm1vZHVsZShcIkp1c3RpY2FyLldlYkNsaWVudFwiKS5jb250cm9sbGVyKFwiTWFpbkN0cmxcIiwgWyckc2NvcGUnLCAnJGxvZycsICckbWRTaWRlbmF2JywgJ0p1c3RpY2FyQXV0aCcsXG4gIGZ1bmN0aW9uKCRzY29wZSwgJGxvZywgJG1kU2lkZW5hdiwgSnVzdGljYXJBdXRoKSB7XG4gICAgLyoqXG4gICAgICogVG9nZ2xlIHNpZGVuYXYgb24gYnV0dG9uIGNsaWNrXG4gICAgICovXG4gICAgJHNjb3BlLnRvZ2dsZVNpZGVuYXYgPSBmdW5jdGlvbigpIHtcbiAgICAgICRtZFNpZGVuYXYoXCJzaWRlbmF2XCIpLnRvZ2dsZSgpO1xuICAgIH07XG5cbiAgICBKdXN0aWNhckF1dGguaW5pdCgpO1xuICB9XG5dKTtcbiIsIi8qKlxuICogQG5hbWVzcGFjZSBKdXN0aWNhci5XZWJDbGllbnQuQVBJXG4gKiBzZXRzIHVwIHRoZSBBUEkgY29uZmlndXJhdGlvblxuICovXG5sZXQgbW9kdWxlQVBJID0gYW5ndWxhci5tb2R1bGUoXCJKdXN0aWNhci5XZWJDbGllbnQuQVBJXCIsIFsnbmdSZXNvdXJjZSddKTtcblxuLyoqXG4gKiBTdG9yZXMgYmFzZSBVUkwgZm9yIGFwaVxuICovXG5tb2R1bGVBUEkuY29uc3RhbnQoXCJBUElfVVJMXCIsIFwiaHR0cDovLzEyNy4wLjAuMTozMDAwL2FwaVwiKTtcblxubW9kdWxlQVBJLnNlcnZpY2UoXCJKdXN0aWNhckFQSVwiLCBbJyRodHRwJywgJyRyZXNvdXJjZScsICckbG9nJywgJyRxJywgJ0FQSV9VUkwnLFxuICBmdW5jdGlvbigkaHR0cCwgJHJlc291cmNlLCAkbG9nLCAkcSwgQVBJX1VSTCkge1xuICAgICAgbGV0IEp1c3RpY2FyQVBJID0ge307XG5cbiAgICAgIC8qKlxuICAgICAgICogQXV0aCBmdW5jdGlvbnMgdXNlZCBmb3IgYXV0aCBhbmQgdXNlciBtYW5hZ2VtZW50XG4gICAgICAgKi9cbiAgICAgIEp1c3RpY2FyQVBJLmF1dGggPSB7fTtcblxuICAgICAgSnVzdGljYXJBUEkuYXV0aC5sb2dpbiA9IGZ1bmN0aW9uKGVtYWlsLCBwYXNzd29yZCkge1xuICAgICAgICByZXR1cm4gJGh0dHAucG9zdChBUElfVVJMICsgXCIvdXNlci9sb2dpblwiLCB7XG4gICAgICAgICAgICB1c2VybmFtZTogZW1haWwsXG4gICAgICAgICAgICBwYXNzd29yZDogcGFzc3dvcmRcblxuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIEp1c3RpY2FyQVBJLmF1dGgubG9nb3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAkaHR0cC5wb3N0KEFQSV9VUkwgKyBcIi91c2VyL2xvZ291dFwiKTtcbiAgICAgIH07XG5cbiAgICAgIEp1c3RpY2FyQVBJLmF1dGguY3VycmVudCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KEFQSV9VUkwgKyBcIi91c2VyL2N1cnJlbnRcIik7XG4gICAgICB9O1xuXG4gICAgICBKdXN0aWNhckFQSS5hdXRoLnJlZ2lzdGVyID0gZnVuY3Rpb24oZW1haWwsIHBhc3N3b3JkKSB7XG4gICAgICAgIHJldHVybiAkaHR0cC5wb3N0KEFQSV9VUkwgKyBcIi91c2VyL3JlZ2lzdGVyXCIsIHtcbiAgICAgICAgICB1c2VyOiB7XG4gICAgICAgICAgICBlbWFpbDogZW1haWwsXG4gICAgICAgICAgICBwYXNzd29yZDogcGFzc3dvcmRcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIEp1c3RpY2FyQVBJO1xuICB9XG5dKTtcbiIsIi8qKlxuICogQG5hbWVzcGFjZSBKdXN0aWNhci5XZWJDbGllbnQuQXV0aFxuICogaGFuZGxlcyBsb2dpbiBhbmQgY2hlY2tpbmcgcGVybWlzc2lvbnNcbiAqL1xubGV0IG1vZHVsZUF1dGggPSBhbmd1bGFyLm1vZHVsZShcIkp1c3RpY2FyLldlYkNsaWVudC5BdXRoXCIsIFsnbmdSZXNvdXJjZScsICdKdXN0aWNhci5XZWJDbGllbnQuQVBJJ10pO1xuXG4vKipcbiAqXG4gKi9cblxubW9kdWxlQXV0aC5zZXJ2aWNlKFwiSnVzdGljYXJBdXRoXCIsIFsnJGh0dHAnLCAnJGxvY2FsU3RvcmFnZScsICckbG9nJywgJyRxJywgJyRtZFBhbmVsJywgJ0p1c3RpY2FyQVBJJyxcbiAgZnVuY3Rpb24oJGh0dHAsICRsb2NhbFN0b3JhZ2UsICRsb2csICRxLCAkbWRQYW5lbCwgSnVzdGljYXJBUEkpIHtcbiAgICAgIGxldCBKdXN0aWNhckF1dGggPSB7fTtcblxuXG5cbiAgICAgIC8qKlxuICAgICAgICogTG9naW4gdG8gc3lzdGVtXG4gICAgICAgKi9cbiAgICAgIEp1c3RpY2FyQXV0aC5pbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICgkbG9jYWxTdG9yYWdlLmN1cnJlbnRVc2VyICYmICRsb2NhbFN0b3JhZ2UuY3VycmVudFVzZXIudG9rZW4pIHtcbiAgICAgICAgICBKdXN0aWNhckF1dGguc2V0VG9rZW4oJGxvY2FsU3RvcmFnZS5jdXJyZW50VXNlci50b2tlbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgSnVzdGljYXJBdXRoLmNsZWFyVG9rZW4oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIEp1c3RpY2FyQVBJLmF1dGguY3VycmVudCgpLnRoZW4oXG4gICAgICAgICAgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICRsb2NhbFN0b3JhZ2UuY3VycmVudFVzZXIudXNlciA9IHJlc3BvbnNlLmRhdGEudXNlcjtcbiAgICAgICAgICB9XG4gICAgICAgICkuY2F0Y2goXG4gICAgICAgICAgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICBkZWxldGUgJGxvY2FsU3RvcmFnZS5jdXJyZW50VXNlcjtcbiAgICAgICAgICAgIEp1c3RpY2FyQXV0aC5vcGVuTG9naW5QYW5lbCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH07XG5cbiAgICAgIC8qKlxuICAgICAgICogTG9naW4gdG8gc3lzdGVtXG4gICAgICAgKi9cbiAgICAgIEp1c3RpY2FyQXV0aC5sb2dpbiA9IGZ1bmN0aW9uKGVtYWlsLCBwYXNzd29yZCkge1xuICAgICAgICBKdXN0aWNhckFQSS5hdXRoLmxvZ2luKGVtYWlsLCBwYXNzd29yZCkudGhlbihcbiAgICAgICAgICBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgJGxvY2FsU3RvcmFnZS5jdXJyZW50VXNlciA9IHsgdXNlcjogcmVzcG9uc2UuZGF0YS51c2VyLCB0b2tlbjogcmVzcG9uc2UuZGF0YS50b2tlbiB9O1xuICAgICAgICAgICAgSnVzdGljYXJBdXRoLnNldFRva2VuKHJlc3BvbnNlLmRhdGEudG9rZW4pO1xuICAgICAgICAgIH1cbiAgICAgICAgKS5jYXRjaChcbiAgICAgICAgICBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIC8vIEBUT0RPIGJldHRlciBoYW5kbGluZyBvZiByZXN1bHRzLCBmYWlsZWQgbG9naW4sIGV0Yy5cbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnIpO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH07XG5cbiAgICAgIC8qKlxuICAgICAgICogTG9nb3V0IG9mIHN5c3RlbVxuICAgICAgICovXG4gICAgICBKdXN0aWNhckF1dGgubG9nb3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIEp1c3RpY2FyQVBJLmF1dGgubG9nb3V0KCkudGhlbihcbiAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGRlbGV0ZSAkbG9jYWxTdG9yYWdlLmN1cnJlbnRVc2VyO1xuICAgICAgICAgICAgSnVzdGljYXJBdXRoLmNsZWFyVG9rZW4oKTtcbiAgICAgICAgICB9XG4gICAgICAgICkuY2F0Y2goXG4gICAgICAgICAgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAvLyBAVE9ETyBiZXR0ZXIgaGFuZGxpbmcgb2YgcmVzdWx0cywgZmFpbGVkIGxvZ2luLCBldGMuXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICB9O1xuXG4gICAgICAvKipcbiAgICAgICAqIFJlZ2lzdGVyIG5ldyB1c2VyXG4gICAgICAgKi9cbiAgICAgIEp1c3RpY2FyQXV0aC5yZWdpc3RlciA9IGZ1bmN0aW9uKGVtYWlsLCBwYXNzd29yZCkge1xuICAgICAgICBKdXN0aWNhckFQSS5hdXRoLnJlZ2lzdGVyKGVtYWlsLCBwYXNzd29yZCkudGhlbihcbiAgICAgICAgICBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgJGxvY2FsU3RvcmFnZS5jdXJyZW50VXNlciA9IHsgdXNlcjogcmVzcG9uc2UuZGF0YS51c2VyLCB0b2tlbjogcmVzcG9uc2UuZGF0YS50b2tlbiB9O1xuICAgICAgICAgICAgSnVzdGljYXJBdXRoLnNldFRva2VuKHJlc3BvbnNlLmRhdGEudG9rZW4pO1xuICAgICAgICAgIH1cbiAgICAgICAgKS5jYXRjaChcbiAgICAgICAgICBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIC8vIEBUT0RPIGJldHRlciBoYW5kbGluZyBvZiByZXN1bHRzLCBmYWlsZWQgbG9naW4sIGV0Yy5cbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnIpO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH07XG5cbiAgICAgIC8qKlxuICAgICAgICogT3BlbiBtb2RhbCBwYW5lbCBmb3IgbG9nZ2luZyBpbnNwZWN0XG4gICAgICAgKi9cbiAgICAgIEp1c3RpY2FyQXV0aC5vcGVuTG9naW5QYW5lbCA9IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuXG4gICAgICAgIGxldCBwYW5lbFBvc2l0aW9uID0gJG1kUGFuZWwubmV3UGFuZWxQb3NpdGlvbigpXG4gICAgICAgICAgLmFic29sdXRlKClcbiAgICAgICAgICAuY2VudGVyKCk7XG5cbiAgICAgICAgbGV0IHBhbmVsQW5pbWF0aW9uID0gJG1kUGFuZWwubmV3UGFuZWxBbmltYXRpb24oKVxuICAgICAgICAgIC5vcGVuRnJvbSh7IHRvcDogMSwgcmlnaHQ6MCB9KVxuICAgICAgICAgIC5kdXJhdGlvbigyMDApXG4gICAgICAgICAgLmNsb3NlVG8oeyB0b3A6IDEsIHJpZ2h0OjAgfSlcbiAgICAgICAgICAud2l0aEFuaW1hdGlvbigkbWRQYW5lbC5hbmltYXRpb24uU0NBTEUpO1xuXG4gICAgICAgIGxldCBwYW5lbENvbmZpZyA9IHtcbiAgICAgICAgICBhdHRhY2hUbzogYW5ndWxhci5lbGVtZW50KGRvY3VtZW50LmJvZHkpLFxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdMb2dpbkN0cmwnLFxuICAgICAgICAgIGRpc2FibGVQYXJlbnRTY3JvbGw6IHRydWUsXG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICcvcGFydGlhbHMvcGFuZWxzL2xvZ2luJyxcbiAgICAgICAgICBwYW5lbENsYXNzOiBcImp1c3RpY2FyLXBhbmVsXCIsXG4gICAgICAgICAgekluZGV4OiAxNTAsXG4gICAgICAgICAgbG9jYWxzOiB7XG4gICAgICAgICAgICBkZWZlcnJlZDogZGVmZXJyZWRcbiAgICAgICAgICB9LFxuICAgICAgICAgIHRyYXBGb2N1czogdHJ1ZSxcbiAgICAgICAgICBjbGlja091dHNpZGVUb0Nsb3NlOiB0cnVlLFxuICAgICAgICAgIGNsaWNrRXNjYXBlVG9DbG9zZTogdHJ1ZSxcbiAgICAgICAgICBoYXNCYWNrZHJvcDogdHJ1ZSxcbiAgICAgICAgICBwb3NpdGlvbjogcGFuZWxQb3NpdGlvbixcbiAgICAgICAgICBhbmltYXRpb246IHBhbmVsQW5pbWF0aW9uXG4gICAgICAgIH07XG5cbiAgICAgICAgJG1kUGFuZWwub3BlbihwYW5lbENvbmZpZyk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICB9O1xuXG4gICAgICAvKipcbiAgICAgICAqIE9wZW4gcmVnaXN0cmF0aW9uIHBhbmVsXG4gICAgICAgKi9cbiAgICAgIEp1c3RpY2FyQXV0aC5vcGVuUmVnaXN0ZXJQYW5lbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuXG4gICAgICAgIGxldCBwYW5lbFBvc2l0aW9uID0gJG1kUGFuZWwubmV3UGFuZWxQb3NpdGlvbigpXG4gICAgICAgICAgLmFic29sdXRlKClcbiAgICAgICAgICAuY2VudGVyKCk7XG5cbiAgICAgICAgbGV0IHBhbmVsQW5pbWF0aW9uID0gJG1kUGFuZWwubmV3UGFuZWxBbmltYXRpb24oKVxuICAgICAgICAgIC5vcGVuRnJvbSh7dG9wOiAxLCBsZWZ0OiAxfSlcbiAgICAgICAgICAuZHVyYXRpb24oMjAwKVxuICAgICAgICAgIC5jbG9zZVRvKHt0b3A6IDEsIGxlZnQ6IDF9KVxuICAgICAgICAgIC53aXRoQW5pbWF0aW9uKCRtZFBhbmVsLmFuaW1hdGlvbi5TQ0FMRSk7XG5cbiAgICAgICAgbGV0IHBhbmVsQ29uZmlnID0ge1xuICAgICAgICAgIGF0dGFjaFRvOiBhbmd1bGFyLmVsZW1lbnQoZG9jdW1lbnQuYm9keSksXG4gICAgICAgICAgY29udHJvbGxlcjogJ1JlZ2lzdGVyQ3RybCcsXG4gICAgICAgICAgZGlzYWJsZVBhcmVudFNjcm9sbDogdHJ1ZSxcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9wYXJ0aWFscy9wYW5lbHMvcmVnaXN0ZXInLFxuICAgICAgICAgIHBhbmVsQ2xhc3M6IFwianVzdGljYXItcGFuZWxcIixcbiAgICAgICAgICB6SW5kZXg6IDE3NSxcbiAgICAgICAgICBsb2NhbHM6IHtcbiAgICAgICAgICAgIGRlZmVycmVkOiBkZWZlcnJlZFxuICAgICAgICAgIH0sXG4gICAgICAgICAgdHJhcEZvY3VzOiB0cnVlLFxuICAgICAgICAgIGNsaWNrT3V0c2lkZVRvQ2xvc2U6IHRydWUsXG4gICAgICAgICAgY2xpY2tFc2NhcGVUb0Nsb3NlOiB0cnVlLFxuICAgICAgICAgIGhhc0JhY2tkcm9wOiB0cnVlLFxuICAgICAgICAgIHBvc2l0aW9uOiBwYW5lbFBvc2l0aW9uLFxuICAgICAgICAgIGFuaW1hdGlvbjogcGFuZWxBbmltYXRpb25cbiAgICAgICAgfTtcblxuICAgICAgICAkbWRQYW5lbC5vcGVuKHBhbmVsQ29uZmlnKTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgIH07XG5cbiAgICAgIC8qKlxuICAgICAgICogQ2hlY2sgcGVybWlzc2lvbnMgYmFzZWQgb24gYSBzdHJpbmdcbiAgICAgICAqL1xuICAgICAgSnVzdGljYXJBdXRoLmNoZWNrUGVybWlzc2lvbnMgPSBmdW5jdGlvbihwZXJtaXNzaW9uKSB7XG4gICAgICAgIC8vIEBUT0RPXG4gICAgICB9O1xuXG4gICAgICBKdXN0aWNhckF1dGguc2V0VG9rZW4gPSBmdW5jdGlvbih0b2tlbikge1xuICAgICAgICAkaHR0cC5kZWZhdWx0cy5oZWFkZXJzLmNvbW1vbi5BdXRob3JpemF0aW9uID0gJ0JlYXJlciAnICsgdG9rZW47XG4gICAgICB9O1xuXG4gICAgICBKdXN0aWNhckF1dGguY2xlYXJUb2tlbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAkaHR0cC5kZWZhdWx0cy5oZWFkZXJzLmNvbW1vbi5BdXRob3JpemF0aW9uID0gICcnO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIEp1c3RpY2FyQXV0aDtcbiAgfVxuXSk7XG5cbm1vZHVsZUF1dGguY29udHJvbGxlcignTG9naW5DdHJsJywgWydtZFBhbmVsUmVmJywgJyRzY29wZScsICckbG9nJywgJ0p1c3RpY2FyQVBJJywgJ0p1c3RpY2FyQXV0aCcsXG4gIGZ1bmN0aW9uKG1kUGFuZWxSZWYsICRzY29wZSwgJGxvZywgSnVzdGljYXJBUEksIEp1c3RpY2FyQXV0aCkge1xuICAgICRzY29wZS53YWl0aW5nID0gZmFsc2U7XG4gICAgJHNjb3BlLmVycm9yTXNzZyA9IFwiXCI7XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGNsaWNraW5nIGxvZ2luIGJ1dHRvbiwgdXNpbmcgJHNjb3BlLnVzZXJFbWFpbCAmICRzY29wZS51c2VyUGFzc3dvcmRcbiAgICAgKi9cbiAgICAkc2NvcGUub25DbGlja0xvZ2luID0gZnVuY3Rpb24oKSB7XG4gICAgICAvLyBsb2dpbiBhbmQgY2xvc2UgaWYgc3VjY2Vzc2Z1bFxuICAgICAgJHNjb3BlLndhaXRpbmcgPSB0cnVlO1xuXG4gICAgICBKdXN0aWNhckFQSS5hdXRoLmxvZ2luKCRzY29wZS51c2VyRW1haWwsICRzY29wZS51c2VyUGFzc3dvcmQpLnRoZW4oXG4gICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICRzY29wZS53YWl0aW5nID0gZmFsc2U7XG4gICAgICAgICAgbWRQYW5lbFJlZi5jbG9zZSgpO1xuICAgICAgICB9XG4gICAgICApLmNhdGNoKFxuICAgICAgICBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAkbG9nLmVycm9yKGVycik7XG4gICAgICAgICAgJHNjb3BlLmVycm9yTXNzZyA9IFwiRXJyb3IgbG9nZ2luZyBpbi5cIjtcbiAgICAgICAgICAkc2NvcGUud2FpdGluZyA9IGZhbHNlO1xuICAgICAgICAgIC8vIEBUT0RPIGJldHRlciBtZXNzYWdpbmdcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogSGFuZGxlIGNsaWNraW5nIHJlZ2lzdGVyIGJ1dHRvblxuICAgICAqL1xuICAgICRzY29wZS5vbkNsaWNrUmVnaXN0ZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgIEp1c3RpY2FyQXV0aC5vcGVuUmVnaXN0ZXJQYW5lbCgpO1xuICAgICAgbWRQYW5lbFJlZi5jbG9zZSgpO1xuICAgIH07XG5cbiAgICAkc2NvcGUub25DbGlja0Nsb3NlID0gZnVuY3Rpb24oKSB7XG4gICAgICBtZFBhbmVsUmVmLmNsb3NlKCk7XG4gICAgfTtcbiAgfVxuXSk7XG5cblxubW9kdWxlQXV0aC5jb250cm9sbGVyKCdSZWdpc3RlckN0cmwnLCBbJ21kUGFuZWxSZWYnLCAnJHNjb3BlJywgJyRsb2cnLCAnSnVzdGljYXJBUEknLCAnSnVzdGljYXJBdXRoJyxcbiAgZnVuY3Rpb24obWRQYW5lbFJlZiwgJHNjb3BlLCAkbG9nLCBKdXN0aWNhckFQSSwgSnVzdGljYXJBdXRoKSB7XG4gICAgJHNjb3BlLndhaXRpbmcgPSBmYWxzZTtcbiAgICAkc2NvcGUuZXJyb3JNc3NnID0gXCJcIjtcbiAgICAvKipcbiAgICAgKiBIYW5kbGUgY2xpY2tpbmcgcmVnaXN0ZXIgYnV0dG9uXG4gICAgICovXG4gICAgJHNjb3BlLm9uQ2xpY2tSZWdpc3RlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgLy8gbG9naW4gYW5kIGNsb3NlIGlmIHN1Y2Nlc3NmdWxcbiAgICAgICRzY29wZS53YWl0aW5nID0gdHJ1ZTtcblxuICAgICAgSnVzdGljYXJBUEkuYXV0aC5yZWdpc3Rlcigkc2NvcGUudXNlckVtYWlsLCAkc2NvcGUudXNlclBhc3N3b3JkKS50aGVuKFxuICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAkc2NvcGUud2FpdGluZyA9IGZhbHNlO1xuICAgICAgICAgIG1kUGFuZWxSZWYuY2xvc2UoKTtcbiAgICAgICAgfVxuICAgICAgKS5jYXRjaChcbiAgICAgICAgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgJGxvZy5lcnJvcihlcnIpO1xuICAgICAgICAgICRzY29wZS5lcnJvck1zc2cgPSBcIkVycm9yIHJlZ2lzdGVyaW5nLlwiO1xuICAgICAgICAgICRzY29wZS53YWl0aW5nID0gZmFsc2U7XG4gICAgICAgICAgLy8gQFRPRE8gYmV0dGVyIG1lc3NhZ2luZ1xuICAgICAgICB9XG4gICAgICApO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgY2xpY2tpbmcgbG9naW4gYnV0dG9uXG4gICAgICovXG4gICAgJHNjb3BlLm9uQ2xpY2tMb2dpbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgSnVzdGljYXJBdXRoLm9wZW5Mb2dpblBhbmVsKCk7XG4gICAgICBtZFBhbmVsUmVmLmNsb3NlKCk7XG4gICAgfTtcblxuICAgICRzY29wZS5vbkNsaWNrQ2xvc2UgPSBmdW5jdGlvbigpIHtcbiAgICAgIG1kUGFuZWxSZWYuY2xvc2UoKTtcbiAgICB9O1xuICB9XG5dKTtcbiIsIi8qKlxuICogQG5hbWVzcGFjZSBKdXN0aWNhci5XZWJDbGllbnQuU3RhdGVzLkFkbWluXG4gKiBTdG9yZXMgYWxsIHRoZSBzdGF0ZXMgZm9yIHRoZSBBbmd1bGFyIFVJIHJvdXRlciBzdGF0ZSBtYWNoaW5lIGFuZCBhc3NvY2lhdGVzIGNvbnRyb2xsZXJzXG4gKi9cbmxldCBzdGF0ZUFkbWluID0gYW5ndWxhci5tb2R1bGUoXCJKdXN0aWNhci5XZWJDbGllbnQuU3RhdGVzLkFkbWluXCIsIFtcbiAgJ3VpLnJvdXRlcidcbl0pO1xuXG4vKipcbiAqIFN0YXRlIG5hbWUgZm9yIHRoaXMgc3RhdGVcbiAqL1xuc3RhdGVBZG1pbi5jb25zdGFudChcIkFETUlOX1NUQVRFXCIsIFwiYWRtaW5cIik7XG5cbi8qKlxuICogU3ViLVVSTCBmb3IgdGhpcyBzdGF0ZVxuICovXG5zdGF0ZUFkbWluLmNvbnN0YW50KFwiQURNSU5fU1RBVEVfVVJMXCIsIFwiL2FkbWluXCIpO1xuXG4vKipcbiAqIENvbmZpZyBhY3Rpb24gdGhhdCBzZXRzIHVwIHRoaXMgbW9kdWxlXG4gKi9cbnN0YXRlQWRtaW4uY29uZmlnKFtcbiAgJyRzdGF0ZVByb3ZpZGVyJyxcbiAgJ0FETUlOX1NUQVRFJyxcbiAgJ0FETUlOX1NUQVRFX1VSTCcsXG4gIGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCBBRE1JTl9TVEFURSwgQURNSU5fU1RBVEVfVVJMKSB7XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdXAgc3RhdGUgaW4gYXBwbGljYXRpb24gc3RhdGUgbWFjaGluZS5cbiAgICAgKi9cbiAgICAkc3RhdGVQcm92aWRlclxuICAgICAgLnN0YXRlKEFETUlOX1NUQVRFLCB7XG4gICAgICAgIHVybDogQURNSU5fU1RBVEVfVVJMLFxuICAgICAgICBwYXJhbXM6IHt9LFxuICAgICAgICBhYnN0cmFjdDogdHJ1ZVxuICAgICAgfSlcbiAgICA7XG4gIH1cbl0pO1xuIiwicmVxdWlyZShcIi4vbGFuZGluZy9pbmRleC5qc1wiKTtcbnJlcXVpcmUoXCIuL3BsYXllci9pbmRleC5qc1wiKTtcbnJlcXVpcmUoXCIuL2FkbWluL2luZGV4LmpzXCIpO1xuXG4vKipcbiAqIEBuYW1lc3BhY2UgSnVzdGljYXIuV2ViQ2xpZW50LlN0YXRlc1xuICogU3RvcmVzIGFsbCB0aGUgc3RhdGVzIGZvciB0aGUgQW5ndWxhciBVSSByb3V0ZXIgc3RhdGUgbWFjaGluZSBhbmQgYXNzb2NpYXRlcyBjb250cm9sbGVyc1xuICovXG5hbmd1bGFyLm1vZHVsZShcIkp1c3RpY2FyLldlYkNsaWVudC5TdGF0ZXNcIiwgW1xuICAnSnVzdGljYXIuV2ViQ2xpZW50LlN0YXRlcy5MYW5kaW5nJyxcbiAgJ0p1c3RpY2FyLldlYkNsaWVudC5TdGF0ZXMuUGxheWVyJyxcbiAgJ0p1c3RpY2FyLldlYkNsaWVudC5TdGF0ZXMuQWRtaW4nLFxuXSk7XG4iLCIvKipcbiAqIEBuYW1lc3BhY2UgSnVzdGljYXIuV2ViQ2xpZW50LlN0YXRlcy5MYW5kaW5nXG4gKiBTdG9yZXMgYWxsIHRoZSBzdGF0ZXMgZm9yIHRoZSBBbmd1bGFyIFVJIHJvdXRlciBzdGF0ZSBtYWNoaW5lIGFuZCBhc3NvY2lhdGVzIGNvbnRyb2xsZXJzXG4gKi9cbmxldCBzdGF0ZUxhbmRpbmcgPSBhbmd1bGFyLm1vZHVsZShcIkp1c3RpY2FyLldlYkNsaWVudC5TdGF0ZXMuTGFuZGluZ1wiLCBbXG4gICd1aS5yb3V0ZXInXG5dKTtcblxuLyoqXG4gKiBTdGF0ZSBuYW1lIGZvciB0aGlzIHN0YXRlXG4gKi9cbnN0YXRlTGFuZGluZy5jb25zdGFudChcIkxBTkRJTkdfU1RBVEVcIiwgXCJsYW5kaW5nXCIpO1xuXG4vKipcbiAqIFN1Yi1VUkwgZm9yIHRoaXMgc3RhdGVcbiAqL1xuc3RhdGVMYW5kaW5nLmNvbnN0YW50KFwiTEFORElOR19TVEFURV9VUkxcIiwgXCIvc3RhcnRcIik7XG5cbi8qKlxuICogTG9jYXRpb24gdG8gbG9hZCB2aWV3IGZyb21cbiAqL1xuc3RhdGVMYW5kaW5nLmNvbnN0YW50KFwiTEFORElOR19URU1QTEFURV9VUkxcIiwgXCIvcGFydGlhbHMvc3RhdGVzL2xhbmRpbmdcIik7XG5cbi8qKlxuICogQ29uZmlnIGFjdGlvbiB0aGF0IHNldHMgdXAgdGhpcyBtb2R1bGVcbiAqL1xuc3RhdGVMYW5kaW5nLmNvbmZpZyhbXG4gICckc3RhdGVQcm92aWRlcicsXG4gICdMQU5ESU5HX1NUQVRFJyxcbiAgJ0xBTkRJTkdfU1RBVEVfVVJMJyxcbiAgJ0xBTkRJTkdfVEVNUExBVEVfVVJMJyxcbiAgZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsIExBTkRJTkdfU1RBVEUsIExBTkRJTkdfU1RBVEVfVVJMLCBMQU5ESU5HX1RFTVBMQVRFX1VSTCkge1xuXG4gICAgLyoqXG4gICAgICogU2V0IHVwIHN0YXRlIGluIGFwcGxpY2F0aW9uIHN0YXRlIG1hY2hpbmUuXG4gICAgICovXG4gICAgJHN0YXRlUHJvdmlkZXJcbiAgICAgIC5zdGF0ZShMQU5ESU5HX1NUQVRFLCB7XG4gICAgICAgIHVybDogTEFORElOR19TVEFURV9VUkwsXG4gICAgICAgIHBhcmFtczoge30sXG4gICAgICAgIGNvbnRyb2xsZXI6IFwiU3RhdGVMYW5kaW5nQ3RybFwiLFxuICAgICAgICB0ZW1wbGF0ZVVybDogTEFORElOR19URU1QTEFURV9VUkxcbiAgICAgIH0pXG4gICAgO1xuICB9XG5dKTtcblxuLyoqXG4gKiBDb250cm9sbGVyIGZvciBzdGF0ZVxuICovXG5zdGF0ZUxhbmRpbmcuY29udHJvbGxlcihcIlN0YXRlTGFuZGluZ0N0cmxcIiwgW1xuICBmdW5jdGlvbigpIHtcblxuICB9XG5dKTtcbiIsIi8qKlxuICogQG5hbWVzcGFjZSBKdXN0aWNhci5XZWJDbGllbnQuU3RhdGVzLlBsYXllclxuICogU3RvcmVzIGFsbCB0aGUgc3RhdGVzIGZvciB0aGUgQW5ndWxhciBVSSByb3V0ZXIgc3RhdGUgbWFjaGluZSBhbmQgYXNzb2NpYXRlcyBjb250cm9sbGVyc1xuICovXG5sZXQgc3RhdGVQbGF5ZXIgPSBhbmd1bGFyLm1vZHVsZShcIkp1c3RpY2FyLldlYkNsaWVudC5TdGF0ZXMuUGxheWVyXCIsIFtcbiAgJ3VpLnJvdXRlcidcbl0pO1xuXG4vKipcbiAqIFN0YXRlIG5hbWUgZm9yIHRoaXMgc3RhdGVcbiAqL1xuc3RhdGVQbGF5ZXIuY29uc3RhbnQoXCJQTEFZRVJfU1RBVEVcIiwgXCJwbGF5ZXJcIik7XG5cbi8qKlxuICogU3ViLVVSTCBmb3IgdGhpcyBzdGF0ZVxuICovXG5zdGF0ZVBsYXllci5jb25zdGFudChcIlBMQVlFUl9TVEFURV9VUkxcIiwgXCIvcGxheWVyXCIpO1xuXG4vKipcbiAqIENvbmZpZyBhY3Rpb24gdGhhdCBzZXRzIHVwIHRoaXMgbW9kdWxlXG4gKi9cbnN0YXRlUGxheWVyLmNvbmZpZyhbXG4gICckc3RhdGVQcm92aWRlcicsXG4gICdQTEFZRVJfU1RBVEUnLFxuICAnUExBWUVSX1NUQVRFX1VSTCcsXG4gIGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCBQTEFZRVJfU1RBVEUsIFBMQVlFUl9TVEFURV9VUkwpIHtcblxuICAgIC8qKlxuICAgICAqIFNldCB1cCBzdGF0ZSBpbiBhcHBsaWNhdGlvbiBzdGF0ZSBtYWNoaW5lLlxuICAgICAqL1xuICAgICRzdGF0ZVByb3ZpZGVyXG4gICAgICAuc3RhdGUoUExBWUVSX1NUQVRFLCB7XG4gICAgICAgIHVybDogUExBWUVSX1NUQVRFX1VSTCxcbiAgICAgICAgcGFyYW1zOiB7fSxcbiAgICAgICAgYWJzdHJhY3Q6IHRydWVcbiAgICAgIH0pXG4gICAgO1xuICB9XG5dKTtcbiIsIi8qKlxuICogQG5hbWVzcGFjZSBKdXN0aWNhci5XZWJDbGllbnQuV2lkZ2V0cy5TaWRlYmFyXG4gKiBTdG9yZXMgYWxsIHRoZSBzdGF0ZXMgZm9yIHRoZSBBbmd1bGFyIFVJIHJvdXRlciBzdGF0ZSBtYWNoaW5lIGFuZCBhc3NvY2lhdGVzIGNvbnRyb2xsZXJzXG4gKi9cbmxldCB3aWRnZXRTaWRlYmFyID0gYW5ndWxhci5tb2R1bGUoXCJKdXN0aWNhci5XZWJDbGllbnQuV2lkZ2V0cy5TaWRlYmFyXCIsIFtcbiAgJ3VpLnJvdXRlcicsXG4gICdKdXN0aWNhci5XZWJDbGllbnQuQVBJJyxcbiAgJ0p1c3RpY2FyLldlYkNsaWVudC5BdXRoJ1xuXSk7XG5cblxuLyoqXG4gKiBDb250cm9sbGVyIGZvciB3aWRnZXRcbiAqL1xud2lkZ2V0U2lkZWJhci5jb250cm9sbGVyKFwiV2lkZ2V0U2lkZWJhckN0cmxcIiwgW1xuICBmdW5jdGlvbigpIHtcblxuICB9XG5dKTtcbiIsIi8qKlxuICogQG5hbWVzcGFjZSBKdXN0aWNhci5XZWJDbGllbnQuV2lkZ2V0cy5Ub29sYmFyXG4gKiBTdG9yZXMgYWxsIHRoZSBzdGF0ZXMgZm9yIHRoZSBBbmd1bGFyIFVJIHJvdXRlciBzdGF0ZSBtYWNoaW5lIGFuZCBhc3NvY2lhdGVzIGNvbnRyb2xsZXJzXG4gKi9cbmxldCB3aWRnZXRUb29sYmFyID0gYW5ndWxhci5tb2R1bGUoXCJKdXN0aWNhci5XZWJDbGllbnQuV2lkZ2V0cy5Ub29sYmFyXCIsIFtcbiAgJ3VpLnJvdXRlcicsXG4gICdKdXN0aWNhci5XZWJDbGllbnQuQVBJJyxcbiAgJ0p1c3RpY2FyLldlYkNsaWVudC5BdXRoJ1xuXSk7XG5cbi8qKlxuICogQ29udHJvbGxlciBmb3Igd2lkZ2V0XG4gKi9cbndpZGdldFRvb2xiYXIuY29udHJvbGxlcihcIldpZGdldFRvb2xiYXJDdHJsXCIsIFsnJHNjb3BlJywgJ0p1c3RpY2FyQXV0aCcsXG4gIGZ1bmN0aW9uKCRzY29wZSwgSnVzdGljYXJBdXRoKSB7XG4gICAgJHNjb3BlLmJTaG93QWNjb3VudCA9IGZ1bmN0aW9uKCkge1xuICAgICAgLy8gaXMgdGhlcmUgYSB2YWxpZCBhY2NvdW50P1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICAkc2NvcGUub25DbGlja0xvZ2luID0gZnVuY3Rpb24oKSB7XG4gICAgICBKdXN0aWNhckF1dGgub3BlbkxvZ2luUGFuZWwoKTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLm9uQ2xpY2tBY2NvdW50ID0gZnVuY3Rpb24oKSB7XG4gICAgICAvLyBAVE9ET1xuICAgIH07XG5cbiAgICAkc2NvcGUuZ2V0QWNjb3VudE5hbWUgPSBmdW5jdGlvbigpIHtcblxuICAgIH07XG4gIH1cbl0pO1xuIl19
