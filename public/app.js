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
'angularMoment', 'angular.filter', 'ngStorage', // ngstorage
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

  JusticarAuth.pending = true;

  /**
   * Login to system
   */
  JusticarAuth.init = function () {
    if ($localStorage.currentUser && $localStorage.currentUser.token) {
      JusticarAuth.setUser($localStorage.currentUser.user, $localStorage.currentUser.token);
    } else {
      JusticarAuth.clearUser();
    }

    return JusticarAPI.auth.current().then(function (response) {
      JusticarAuth.pending = false;
      JusticarAuth.setUser(response.data.user);
    }).catch(function (err) {
      delete $localStorage.currentUser;
      JusticarAuth.openLoginPanel();
    });
  };

  JusticarAuth.bLoggedIn = function () {
    if (JusticarAuth.pending) return false;
    if ($localStorage.currentUser) return true;

    return false;
  };

  /**
   * Login to system
   */
  JusticarAuth.login = function (email, password) {
    JusticarAuth.pending = true;
    return JusticarAPI.auth.login(email, password).then(function (response) {
      JusticarAuth.setUser(response.data.user, response.data.token);
    }).catch(function (err) {
      // @TODO better handling of results, failed login, etc.
      throw new Error(err);
    });
  };

  /**
   * Logout of system
   */
  JusticarAuth.logout = function () {
    return JusticarAPI.auth.logout().then(function () {
      JusticarAuth.clearUser();
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
      JusticarAuth.setUser(response.data.user, response.data.token);
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

  /**
   * Set token in headers
   */
  JusticarAuth.setUser = function (user, optionalToken) {
    var token = optionalToken || false;
    $localStorage.currentUser = { user: user, token: token };
    if (token) {
      $http.defaults.headers.common.Authorization = 'Bearer ' + token;
    }
  };

  /**
   * Remove local token
   */
  JusticarAuth.clearUser = function () {
    delete $localStorage.currentUser;
    $http.defaults.headers.common.Authorization = '';
  };

  /**
   * Get user details
   */
  JusticarAuth.getDisplayName = function () {
    if (JusticarAuth.pending) {
      return "Loading...";
    }

    if ($localStorage.currentUser) {
      if ($localStorage.currentUser.user.name) {
        return $localStorage.currentUser.user.name;
      }

      return $localStorage.currentUser.user.email;
    }

    return "";
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

    JusticarAuth.login($scope.userEmail, $scope.userPassword).then(function () {
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

    JusticarAuth.register($scope.userEmail, $scope.userPassword).then(function () {
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
  $scope.bAuthPending = function () {
    return JusticarAuth.pending;
  };

  $scope.bLoggedIn = function () {
    // is there a valid account?
    return JusticarAuth.bLoggedIn();
  };

  $scope.onClickLogIn = function () {
    JusticarAuth.openLoginPanel();
  };

  $scope.onClickLogOut = function () {
    JusticarAuth.logout();
  };

  $scope.getDisplayName = function () {
    return JusticarAuth.getDisplayName();
  };
}]);

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvY2xpZW50LmpzIiwiY2xpZW50L21vZHVsZXMvYXBpL2luZGV4LmpzIiwiY2xpZW50L21vZHVsZXMvYXV0aC9pbmRleC5qcyIsImNsaWVudC9zdGF0ZXMvYWRtaW4vaW5kZXguanMiLCJjbGllbnQvc3RhdGVzL2luZGV4LmpzIiwiY2xpZW50L3N0YXRlcy9sYW5kaW5nL2luZGV4LmpzIiwiY2xpZW50L3N0YXRlcy9wbGF5ZXIvaW5kZXguanMiLCJjbGllbnQvd2lkZ2V0cy9zaWRlYmFyLmpzIiwiY2xpZW50L3dpZGdldHMvdG9vbGJhci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOzs7QUFHQTs7QUFFQTs7QUFDQSxRQUFRLHdCQUFSO0FBQ0EsUUFBUSx5QkFBUjs7QUFFQTtBQUNBLFFBQVEsc0JBQVI7QUFDQSxRQUFRLHNCQUFSOztBQUVBOztBQUVBO0FBQ0EsUUFBUSxtQkFBUjs7QUFFQTs7O0FBR0EsUUFBUSxNQUFSLENBQWUsb0JBQWYsRUFBcUM7QUFDakM7QUFDQSxZQUZpQyxFQUVuQjtBQUNkLFlBSGlDLEVBR25CO0FBQ2QsWUFKaUMsRUFJbkI7QUFDZCxXQUxpQyxFQUtwQjtBQUNiLFlBTmlDLEVBTW5CO0FBQ2QsZUFQaUMsRUFRakMsZ0JBUmlDLEVBU2pDLFdBVGlDLEVBU3BCO0FBQ2IsV0FWaUM7O0FBWWpDO0FBQ0Esd0JBYmlDLEVBY2pDLHlCQWRpQyxFQWVqQywyQkFmaUM7O0FBaUJqQztBQUNBLG9DQWxCaUMsRUFtQmpDLG9DQW5CaUMsQ0FBckMsRUFvQkcsTUFwQkgsQ0FvQlUsQ0FDTixtQkFETSxFQUVOLG9CQUZNLEVBR04sb0JBSE0sRUFJTixVQUFTLGlCQUFULEVBQTRCLGtCQUE1QixFQUFnRCxrQkFBaEQsRUFBb0U7O0FBR2hFOzs7QUFHQSxvQkFBa0IsVUFBbEIsQ0FBNkIsRUFBN0I7QUFDQSxvQkFBa0IsU0FBbEIsQ0FBNEIs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LFlBQVc7QUFDNUI7QUFDQSxXQUFPLGFBQWEsU0FBYixFQUFQO0FBQ0QsR0FIRDs7QUFLQSxTQUFPLFlBQVAsR0FBc0IsWUFBVztBQUMvQixpQkFBYSxjQUFiO0FBQ0QsR0FGRDs7QUFJQSxTQUFPLGFBQVAsR0FBdUIsWUFBVztBQUNoQyxpQkFBYSxNQUFiO0FBQ0QsR0FGRDs7QUFJQSxTQUFPLGNBQVAsR0FBd0IsWUFBVztBQUNqQyxXQUFPLGFBQWEsY0FBYixFQUFQO0FBQ0QsR0FGRDtBQUdELENBdEIyQyxDQUE5QyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8qKlxuICogQG5hbWVzcGFjZSBKdXN0aWNhci5XZWJDbGllbnRcbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG4vLyBMb2NhbCBBbmd1bGFyIE1vZHVsZXMgT25seS4gUGx1Z2lucyBhbmQgb3RoZXIgbGlicmFyaWVzIGdvIGluIHRoZSBsaWIuanMgZm9sZGVyIHRvIG1ha2UgZm9yIHF1aWNrZXIgY29tcGlsaW5nLlxucmVxdWlyZSgnLi9tb2R1bGVzL2FwaS9pbmRleC5qcycpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2F1dGgvaW5kZXguanMnKTtcblxuLy8gV2lkZ2V0c1xucmVxdWlyZSgnLi93aWRnZXRzL3Rvb2xiYXIuanMnKTtcbnJlcXVpcmUoJy4vd2lkZ2V0cy9zaWRlYmFyLmpzJyk7XG5cbi8vIE1peGluc1xuXG4vLyBMb2NhbCBTdGF0ZSBNb2R1bGVzXG5yZXF1aXJlKCcuL3N0YXRlcy9pbmRleC5qcycpO1xuXG4vLyBEZWZpbmUgbWFpbiBtb2R1bGVcblxuXG5hbmd1bGFyLm1vZHVsZSgnSnVzdGljYXIuV2ViQ2xpZW50JywgW1xuICAgIC8vIEFuZ3VsYXIgTGlicmFyaWVzXG4gICAgJ25nTWF0ZXJpYWwnLCAvLyBhbmd1bGFyLW1hdGVyaWFsXG4gICAgJ25nU2FuaXRpemUnLCAvLyBhbmd1bGFyLXNhbml0aXplXG4gICAgJ25nUmVzb3VyY2UnLCAvLyBhbmd1bGFyLXJlc291cmNlXG4gICAgJ25nQW5pbWF0ZScsIC8vIGFuZ3VsYXItYW5pbWF0ZVxuICAgICduZ01lc3NhZ2VzJywgLy8gYW5ndWxhci1tZXNzYWdlc1xuICAgICdhbmd1bGFyTW9tZW50JyxcbiAgICAnYW5ndWxhci5maWx0ZXInLFxuICAgICduZ1N0b3JhZ2UnLCAvLyBuZ3N0b3JhZ2VcbiAgICAndWkucm91dGVyJyxcblxuICAgIC8vIExvY2FsIG1vZHVsZXNcbiAgICAnSnVzdGljYXIuV2ViQ2xpZW50LkFQSScsXG4gICAgJ0p1c3RpY2FyLldlYkNsaWVudC5BdXRoJyxcbiAgICAnSnVzdGljYXIuV2ViQ2xpZW50LlN0YXRlcycsXG5cbiAgICAvLyBXaWRnZXRzXG4gICAgJ0p1c3RpY2FyLldlYkNsaWVudC5XaWRnZXRzLlRvb2xiYXInLFxuICAgICdKdXN0aWNhci5XZWJDbGllbnQuV2lkZ2V0cy5TaWRlYmFyJ1xuXSkuY29uZmlnKFtcbiAgICAnJGxvY2F0aW9uUHJvdmlkZXInLFxuICAgICckbWRUaGVtaW5nUHJvdmlkZXInLFxuICAgICckdXJsUm91dGVyUHJvdmlkZXInLFxuICAgIGZ1bmN0aW9uKCRsb2NhdGlvblByb3ZpZGVyLCAkbWRUaGVtaW5nUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICRsb2NhdGlvblByb3ZpZGVyIHNldHRpbmdzXG4gICAgICAgICAqL1xuICAgICAgICAkbG9jYXRpb25Qcm92aWRlci5oYXNoUHJlZml4KCcnKTtcbiAgICAgICAgJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKGZhbHNlKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlbWluZ1xuICAgICAgICAgKi9cblxuICAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLmRlZmluZVBhbGV0dGUoJ2p1c3RpY2FyV2FybicsIHtcbiAgICAgICAgICAgJzUwJzogJ2VkZTNlMycsXG4gICAgICAgICAgICcxMDAnOiAnZDNiYWJhJyxcbiAgICAgICAgICAgJzIwMCc6ICdiNjhjOGMnLFxuICAgICAgICAgICAnMzAwJzogJzk5NWU1ZScsXG4gICAgICAgICAgICc0MDAnOiAnODMzYzNjJyxcbiAgICAgICAgICAgJzUwMCc6ICc2ZDE5MTknLFxuICAgICAgICAgICAnNjAwJzogJzY1MTYxNicsXG4gICAgICAgICAgICc3MDAnOiAnNWExMjEyJyxcbiAgICAgICAgICAgJzgwMCc6ICc1MDBlMGUnLFxuICAgICAgICAgICAnOTAwJzogJzNlMDgwOCcsXG4gICAgICAgICAgICdBMTAwJzogJ2ZmNzU3NScsXG4gICAgICAgICAgICdBMjAwJzogJ2ZmNDI0MicsXG4gICAgICAgICAgICdBNDAwJzogJ2I4MGMwYycsXG4gICAgICAgICAgICdBNzAwJzogJzk3MDAwMCcsXG4gICAgICAgICAgICdjb250cmFzdERlZmF1bHRDb2xvcic6ICdsaWdodCcsXG4gICAgICAgICAgICdjb250cmFzdERhcmtDb2xvcnMnOiBbXG4gICAgICAgICAgICAgJzUwJyxcbiAgICAgICAgICAgICAnMTAwJyxcbiAgICAgICAgICAgICAnMjAwJyxcbiAgICAgICAgICAgICAnQTEwMCcsXG4gICAgICAgICAgICAgJ0EyMDAnXG4gICAgICAgICAgIF0sXG4gICAgICAgICAgICdjb250cmFzdExpZ2h0Q29sb3JzJzogW1xuICAgICAgICAgICAgICczMDAnLFxuICAgICAgICAgICAgICc0MDAnLFxuICAgICAgICAgICAgICc1MDAnLFxuICAgICAgICAgICAgICc2MDAnLFxuICAgICAgICAgICAgICc3MDAnLFxuICAgICAgICAgICAgICc4MDAnLFxuICAgICAgICAgICAgICc5MDAnLFxuICAgICAgICAgICAgICdBNDAwJyxcbiAgICAgICAgICAgICAnQTcwMCdcbiAgICAgICAgICAgXVxuICAgICAgICAgfSk7XG4gICAgICAgICAkbWRUaGVtaW5nUHJvdmlkZXIuZGVmaW5lUGFsZXR0ZSgnanVzdGljYXJBY2NlbnQnLCB7XG4gICAgICAgICAgICc1MCc6ICdmY2YyZTcnLFxuICAgICAgICAgICAnMTAwJzogJ2Y4ZGVjMycsXG4gICAgICAgICAgICcyMDAnOiAnZjNjODljJyxcbiAgICAgICAgICAgJzMwMCc6ICdlZWIyNzQnLFxuICAgICAgICAgICAnNDAwJzogJ2VhYTI1NicsXG4gICAgICAgICAgICc1MDAnOiAnZTY5MTM4JyxcbiAgICAgICAgICAgJzYwMCc6ICdlMzg5MzInLFxuICAgICAgICAgICAnNzAwJzogJ2RmN2UyYicsXG4gICAgICAgICAgICc4MDAnOiAnZGI3NDI0JyxcbiAgICAgICAgICAgJzkwMCc6ICdkNTYyMTcnLFxuICAgICAgICAgICAnQTEwMCc6ICdmOWRhYmEnLFxuICAgICAgICAgICAnQTIwMCc6ICdmMmNkYTcnLFxuICAgICAgICAgICAnQTQwMCc6ICdmZmMzYTEnLFxuICAgICAgICAgICAnQTcwMCc6ICdmZmIyODcnLFxuICAgICAgICAgICAnY29udHJhc3REZWZhdWx0Q29sb3InOiAnbGlnaHQnLFxuICAgICAgICAgICAnY29udHJhc3REYXJrQ29sb3JzJzogW1xuICAgICAgICAgICAgICc1MCcsXG4gICAgICAgICAgICAgJzEwMCcsXG4gICAgICAgICAgICAgJzIwMCcsXG4gICAgICAgICAgICAgJzMwMCcsXG4gICAgICAgICAgICAgJzQwMCcsXG4gICAgICAgICAgICAgJzUwMCcsXG4gICAgICAgICAgICAgJzYwMCcsXG4gICAgICAgICAgICAgJzcwMCcsXG4gICAgICAgICAgICAgJzgwMCcsXG4gICAgICAgICAgICAgJ0ExMDAnLFxuICAgICAgICAgICAgICdBMjAwJyxcbiAgICAgICAgICAgICAnQTQwMCcsXG4gICAgICAgICAgICAgJ0E3MDAnXG4gICAgICAgICAgIF0sXG4gICAgICAgICAgICdjb250cmFzdExpZ2h0Q29sb3JzJzogW1xuICAgICAgICAgICAgICc5MDAnXG4gICAgICAgICAgIF1cbiAgICAgICAgIH0pO1xuICAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLmRlZmluZVBhbGV0dGUoJ2p1c3RpY2FyUHJpbWFyeScsIHtcbiAgICAgICAgICAgJzUwJzogJ2YwZThmNicsXG4gICAgICAgICAgICcxMDAnOiAnZGFjNWU5JyxcbiAgICAgICAgICAgJzIwMCc6ICdjMjlmZGEnLFxuICAgICAgICAgICAnMzAwJzogJ2FhNzljYicsXG4gICAgICAgICAgICc0MDAnOiAnOTc1Y2MwJyxcbiAgICAgICAgICAgJzUwMCc6ICc4NTNmYjUnLFxuICAgICAgICAgICAnNjAwJzogJzdkMzlhZScsXG4gICAgICAgICAgICc3MDAnOiAnNzIzMWE1JyxcbiAgICAgICAgICAgJzgwMCc6ICc2ODI5OWQnLFxuICAgICAgICAgICAnOTAwJzogJzU1MWI4ZCcsXG4gICAgICAgICAgICdBMTAwJzogJ2UxYzZmZicsXG4gICAgICAgICAgICdBMjAwJzogJ2M3OTNmZicsXG4gICAgICAgICAgICdBNDAwJzogJ2FjNjBmZicsXG4gICAgICAgICAgICdBNzAwJzogJzlmNDdmZicsXG4gICAgICAgICAgICdjb250cmFzdERlZmF1bHRDb2xvcic6ICdsaWdodCcsXG4gICAgICAgICAgICdjb250cmFzdERhcmtDb2xvcnMnOiBbXG4gICAgICAgICAgICAgJzUwJyxcbiAgICAgICAgICAgICAnMTAwJyxcbiAgICAgICAgICAgICAnMjAwJyxcbiAgICAgICAgICAgICAnMzAwJyxcbiAgICAgICAgICAgICAnQTEwMCcsXG4gICAgICAgICAgICAgJ0EyMDAnLFxuICAgICAgICAgICAgICdBNDAwJ1xuICAgICAgICAgICBdLFxuICAgICAgICAgICAnY29udHJhc3RMaWdodENvbG9ycyc6IFtcbiAgICAgICAgICAgICAnNDAwJyxcbiAgICAgICAgICAgICAnNTAwJyxcbiAgICAgICAgICAgICAnNjAwJyxcbiAgICAgICAgICAgICAnNzAwJyxcbiAgICAgICAgICAgICAnODAwJyxcbiAgICAgICAgICAgICAnOTAwJyxcbiAgICAgICAgICAgICAnQTcwMCdcbiAgICAgICAgICAgXVxuICAgICAgICAgfSk7XG4gICAgICAgICAkbWRUaGVtaW5nUHJvdmlkZXIuZGVmaW5lUGFsZXR0ZSgnanVzdGljYXJCYWNrZ3JvdW5kJywge1xuICAgICAgICAgICAnNTAnOiAnZmFmYWZjJyxcbiAgICAgICAgICAgJzEwMCc6ICdmNGYyZjgnLFxuICAgICAgICAgICAnMjAwJzogJ2VjZTlmNCcsXG4gICAgICAgICAgICczMDAnOiAnZTRlMGYwJyxcbiAgICAgICAgICAgJzQwMCc6ICdkZmQ5ZWMnLFxuICAgICAgICAgICAnNTAwJzogJ2Q5ZDJlOScsXG4gICAgICAgICAgICc2MDAnOiAnZDVjZGU2JyxcbiAgICAgICAgICAgJzcwMCc6ICdjZmM3ZTMnLFxuICAgICAgICAgICAnODAwJzogJ2NhYzFkZicsXG4gICAgICAgICAgICc5MDAnOiAnYzBiNmQ5JyxcbiAgICAgICAgICAgJ0ExMDAnOiAnZmZmZmZmJyxcbiAgICAgICAgICAgJ0EyMDAnOiAnZmZmZmZmJyxcbiAgICAgICAgICAgJ0E0MDAnOiAnZmZmZmZmJyxcbiAgICAgICAgICAgJ0E3MDAnOiAnZmZmZmZmJyxcbiAgICAgICAgICAgJ2NvbnRyYXN0RGVmYXVsdENvbG9yJzogJ2RhcmsnLFxuICAgICAgICAgICAnY29udHJhc3REYXJrQ29sb3JzJzogW1xuICAgICAgICAgICAgICc1MCcsXG4gICAgICAgICAgICAgJzEwMCcsXG4gICAgICAgICAgICAgJzIwMCcsXG4gICAgICAgICAgICAgJzMwMCcsXG4gICAgICAgICAgICAgJzQwMCcsXG4gICAgICAgICAgICAgJzUwMCcsXG4gICAgICAgICAgICAgJzYwMCcsXG4gICAgICAgICAgICAgJzcwMCcsXG4gICAgICAgICAgICAgJzgwMCcsXG4gICAgICAgICAgICAgJzkwMCcsXG4gICAgICAgICAgICAgJ0ExMDAnLFxuICAgICAgICAgICAgICdBMjAwJyxcbiAgICAgICAgICAgICAnQTQwMCcsXG4gICAgICAgICAgICAgJ0E3MDAnXG4gICAgICAgICAgIF0sXG4gICAgICAgICAgICdjb250cmFzdExpZ2h0Q29sb3JzJzogW11cbiAgICAgICAgIH0pO1xuXG4gICAgICAgICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnanVzdGljYXInKVxuICAgICAgICAgICAgLnByaW1hcnlQYWxldHRlKCdqdXN0aWNhclByaW1hcnknKVxuICAgICAgICAgICAgLmFjY2VudFBhbGV0dGUoJ2p1c3RpY2FyQWNjZW50JylcbiAgICAgICAgICAgIC53YXJuUGFsZXR0ZSgnanVzdGljYXJXYXJuJylcbiAgICAgICAgICAgIC5iYWNrZ3JvdW5kUGFsZXR0ZSgnanVzdGljYXJCYWNrZ3JvdW5kJyk7XG5cbiAgICAgICAgLy8gc2V0dGluZyBpdCBhcyBkZWZhdWx0IHRoZW1lXG4gICAgICAgICRtZFRoZW1pbmdQcm92aWRlci5zZXREZWZhdWx0VGhlbWUoJ2p1c3RpY2FyJyk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNldHRpbmcgdXAgc3RhdGUgbWFjaGluZVxuICAgICAgICAgKi9cbiAgICAgICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZShcIi9zdGFydFwiKTtcblxuXG4gICAgfVxuXSkucnVuKFtcbiAgICAnJHJvb3RTY29wZScsXG4gICAgJyRsb2cnLFxuICAgICckdHJhbnNpdGlvbnMnLFxuICAgICdKdXN0aWNhckF1dGgnLFxuICAgIGZ1bmN0aW9uKCRyb290U2NvcGUsICRsb2csICR0cmFuc2l0aW9ucywgSnVzdGljYXJBdXRoKSB7XG4gICAgICAvKipcbiAgICAgICAqIEluaXRpYWxpemUgdXNlciBjcmVkZW50aWFsc1xuICAgICAgICovXG4gICAgICAgSnVzdGljYXJBdXRoLmluaXQoKTtcbiAgICB9XG5dKTtcblxuYW5ndWxhci5tb2R1bGUoXCJKdXN0aWNhci5XZWJDbGllbnRcIikuY29udHJvbGxlcihcIk1haW5DdHJsXCIsIFsnJHNjb3BlJywgJyRsb2cnLCAnJG1kU2lkZW5hdicsICdKdXN0aWNhckF1dGgnLFxuICBmdW5jdGlvbigkc2NvcGUsICRsb2csICRtZFNpZGVuYXYsIEp1c3RpY2FyQXV0aCkge1xuICAgIC8qKlxuICAgICAqIFRvZ2dsZSBzaWRlbmF2IG9uIGJ1dHRvbiBjbGlja1xuICAgICAqL1xuICAgICRzY29wZS50b2dnbGVTaWRlbmF2ID0gZnVuY3Rpb24oKSB7XG4gICAgICAkbWRTaWRlbmF2KFwic2lkZW5hdlwiKS50b2dnbGUoKTtcbiAgICB9O1xuICB9XG5dKTtcbiIsIi8qKlxuICogQG5hbWVzcGFjZSBKdXN0aWNhci5XZWJDbGllbnQuQVBJXG4gKiBzZXRzIHVwIHRoZSBBUEkgY29uZmlndXJhdGlvblxuICovXG5sZXQgbW9kdWxlQVBJID0gYW5ndWxhci5tb2R1bGUoXCJKdXN0aWNhci5XZWJDbGllbnQuQVBJXCIsIFsnbmdSZXNvdXJjZSddKTtcblxuLyoqXG4gKiBTdG9yZXMgYmFzZSBVUkwgZm9yIGFwaVxuICovXG5tb2R1bGVBUEkuY29uc3RhbnQoXCJBUElfVVJMXCIsIFwiaHR0cDovLzEyNy4wLjAuMTozMDAwL2FwaVwiKTtcblxubW9kdWxlQVBJLnNlcnZpY2UoXCJKdXN0aWNhckFQSVwiLCBbJyRodHRwJywgJyRyZXNvdXJjZScsICckbG9nJywgJyRxJywgJ0FQSV9VUkwnLFxuICBmdW5jdGlvbigkaHR0cCwgJHJlc291cmNlLCAkbG9nLCAkcSwgQVBJX1VSTCkge1xuICAgICAgbGV0IEp1c3RpY2FyQVBJID0ge307XG5cbiAgICAgIC8qKlxuICAgICAgICogQXV0aCBmdW5jdGlvbnMgdXNlZCBmb3IgYXV0aCBhbmQgdXNlciBtYW5hZ2VtZW50XG4gICAgICAgKi9cbiAgICAgIEp1c3RpY2FyQVBJLmF1dGggPSB7fTtcblxuICAgICAgSnVzdGljYXJBUEkuYXV0aC5sb2dpbiA9IGZ1bmN0aW9uKGVtYWlsLCBwYXNzd29yZCkge1xuICAgICAgICByZXR1cm4gJGh0dHAucG9zdChBUElfVVJMICsgXCIvdXNlci9sb2dpblwiLCB7XG4gICAgICAgICAgICB1c2VybmFtZTogZW1haWwsXG4gICAgICAgICAgICBwYXNzd29yZDogcGFzc3dvcmRcblxuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIEp1c3RpY2FyQVBJLmF1dGgubG9nb3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAkaHR0cC5wb3N0KEFQSV9VUkwgKyBcIi91c2VyL2xvZ291dFwiKTtcbiAgICAgIH07XG5cbiAgICAgIEp1c3RpY2FyQVBJLmF1dGguY3VycmVudCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KEFQSV9VUkwgKyBcIi91c2VyL2N1cnJlbnRcIik7XG4gICAgICB9O1xuXG4gICAgICBKdXN0aWNhckFQSS5hdXRoLnJlZ2lzdGVyID0gZnVuY3Rpb24oZW1haWwsIHBhc3N3b3JkKSB7XG4gICAgICAgIHJldHVybiAkaHR0cC5wb3N0KEFQSV9VUkwgKyBcIi91c2VyL3JlZ2lzdGVyXCIsIHtcbiAgICAgICAgICB1c2VyOiB7XG4gICAgICAgICAgICBlbWFpbDogZW1haWwsXG4gICAgICAgICAgICBwYXNzd29yZDogcGFzc3dvcmRcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIEp1c3RpY2FyQVBJO1xuICB9XG5dKTtcbiIsIi8qKlxuICogQG5hbWVzcGFjZSBKdXN0aWNhci5XZWJDbGllbnQuQXV0aFxuICogaGFuZGxlcyBsb2dpbiBhbmQgY2hlY2tpbmcgcGVybWlzc2lvbnNcbiAqL1xubGV0IG1vZHVsZUF1dGggPSBhbmd1bGFyLm1vZHVsZShcIkp1c3RpY2FyLldlYkNsaWVudC5BdXRoXCIsIFsnbmdSZXNvdXJjZScsICdKdXN0aWNhci5XZWJDbGllbnQuQVBJJ10pO1xuXG4vKipcbiAqXG4gKi9cblxubW9kdWxlQXV0aC5zZXJ2aWNlKFwiSnVzdGljYXJBdXRoXCIsIFsnJGh0dHAnLCAnJGxvY2FsU3RvcmFnZScsICckbG9nJywgJyRxJywgJyRtZFBhbmVsJywgJ0p1c3RpY2FyQVBJJyxcbiAgZnVuY3Rpb24oJGh0dHAsICRsb2NhbFN0b3JhZ2UsICRsb2csICRxLCAkbWRQYW5lbCwgSnVzdGljYXJBUEkpIHtcbiAgICAgIGxldCBKdXN0aWNhckF1dGggPSB7fTtcblxuICAgICAgSnVzdGljYXJBdXRoLnBlbmRpbmcgPSB0cnVlO1xuXG5cbiAgICAgIC8qKlxuICAgICAgICogTG9naW4gdG8gc3lzdGVtXG4gICAgICAgKi9cbiAgICAgIEp1c3RpY2FyQXV0aC5pbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICgkbG9jYWxTdG9yYWdlLmN1cnJlbnRVc2VyICYmICRsb2NhbFN0b3JhZ2UuY3VycmVudFVzZXIudG9rZW4pIHtcbiAgICAgICAgICBKdXN0aWNhckF1dGguc2V0VXNlcigkbG9jYWxTdG9yYWdlLmN1cnJlbnRVc2VyLnVzZXIsICRsb2NhbFN0b3JhZ2UuY3VycmVudFVzZXIudG9rZW4pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIEp1c3RpY2FyQXV0aC5jbGVhclVzZXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBKdXN0aWNhckFQSS5hdXRoLmN1cnJlbnQoKS50aGVuKFxuICAgICAgICAgIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBKdXN0aWNhckF1dGgucGVuZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgSnVzdGljYXJBdXRoLnNldFVzZXIocmVzcG9uc2UuZGF0YS51c2VyKTtcbiAgICAgICAgICB9XG4gICAgICAgICkuY2F0Y2goXG4gICAgICAgICAgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICBkZWxldGUgJGxvY2FsU3RvcmFnZS5jdXJyZW50VXNlcjtcbiAgICAgICAgICAgIEp1c3RpY2FyQXV0aC5vcGVuTG9naW5QYW5lbCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH07XG5cbiAgICAgIEp1c3RpY2FyQXV0aC5iTG9nZ2VkSW4gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKEp1c3RpY2FyQXV0aC5wZW5kaW5nKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmICgkbG9jYWxTdG9yYWdlLmN1cnJlbnRVc2VyKSByZXR1cm4gdHJ1ZTtcblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIC8qKlxuICAgICAgICogTG9naW4gdG8gc3lzdGVtXG4gICAgICAgKi9cbiAgICAgIEp1c3RpY2FyQXV0aC5sb2dpbiA9IGZ1bmN0aW9uKGVtYWlsLCBwYXNzd29yZCkge1xuICAgICAgICBKdXN0aWNhckF1dGgucGVuZGluZyA9IHRydWU7XG4gICAgICAgIHJldHVybiBKdXN0aWNhckFQSS5hdXRoLmxvZ2luKGVtYWlsLCBwYXNzd29yZCkudGhlbihcbiAgICAgICAgICBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgSnVzdGljYXJBdXRoLnNldFVzZXIocmVzcG9uc2UuZGF0YS51c2VyLCByZXNwb25zZS5kYXRhLnRva2VuKTtcbiAgICAgICAgICB9XG4gICAgICAgICkuY2F0Y2goXG4gICAgICAgICAgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAvLyBAVE9ETyBiZXR0ZXIgaGFuZGxpbmcgb2YgcmVzdWx0cywgZmFpbGVkIGxvZ2luLCBldGMuXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICB9O1xuXG4gICAgICAvKipcbiAgICAgICAqIExvZ291dCBvZiBzeXN0ZW1cbiAgICAgICAqL1xuICAgICAgSnVzdGljYXJBdXRoLmxvZ291dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gSnVzdGljYXJBUEkuYXV0aC5sb2dvdXQoKS50aGVuKFxuICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgSnVzdGljYXJBdXRoLmNsZWFyVXNlcigpO1xuICAgICAgICAgIH1cbiAgICAgICAgKS5jYXRjaChcbiAgICAgICAgICBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIC8vIEBUT0RPIGJldHRlciBoYW5kbGluZyBvZiByZXN1bHRzLCBmYWlsZWQgbG9naW4sIGV0Yy5cbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnIpO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH07XG5cbiAgICAgIC8qKlxuICAgICAgICogUmVnaXN0ZXIgbmV3IHVzZXJcbiAgICAgICAqL1xuICAgICAgSnVzdGljYXJBdXRoLnJlZ2lzdGVyID0gZnVuY3Rpb24oZW1haWwsIHBhc3N3b3JkKSB7XG4gICAgICAgIEp1c3RpY2FyQVBJLmF1dGgucmVnaXN0ZXIoZW1haWwsIHBhc3N3b3JkKS50aGVuKFxuICAgICAgICAgIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBKdXN0aWNhckF1dGguc2V0VXNlcihyZXNwb25zZS5kYXRhLnVzZXIsIHJlc3BvbnNlLmRhdGEudG9rZW4pO1xuICAgICAgICAgIH1cbiAgICAgICAgKS5jYXRjaChcbiAgICAgICAgICBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIC8vIEBUT0RPIGJldHRlciBoYW5kbGluZyBvZiByZXN1bHRzLCBmYWlsZWQgbG9naW4sIGV0Yy5cbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnIpO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH07XG5cbiAgICAgIC8qKlxuICAgICAgICogT3BlbiBtb2RhbCBwYW5lbCBmb3IgbG9nZ2luZyBpbnNwZWN0XG4gICAgICAgKi9cbiAgICAgIEp1c3RpY2FyQXV0aC5vcGVuTG9naW5QYW5lbCA9IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuXG4gICAgICAgIGxldCBwYW5lbFBvc2l0aW9uID0gJG1kUGFuZWwubmV3UGFuZWxQb3NpdGlvbigpXG4gICAgICAgICAgLmFic29sdXRlKClcbiAgICAgICAgICAuY2VudGVyKCk7XG5cbiAgICAgICAgbGV0IHBhbmVsQW5pbWF0aW9uID0gJG1kUGFuZWwubmV3UGFuZWxBbmltYXRpb24oKVxuICAgICAgICAgIC5vcGVuRnJvbSh7IHRvcDogMSwgcmlnaHQ6MCB9KVxuICAgICAgICAgIC5kdXJhdGlvbigyMDApXG4gICAgICAgICAgLmNsb3NlVG8oeyB0b3A6IDEsIHJpZ2h0OjAgfSlcbiAgICAgICAgICAud2l0aEFuaW1hdGlvbigkbWRQYW5lbC5hbmltYXRpb24uU0NBTEUpO1xuXG4gICAgICAgIGxldCBwYW5lbENvbmZpZyA9IHtcbiAgICAgICAgICBhdHRhY2hUbzogYW5ndWxhci5lbGVtZW50KGRvY3VtZW50LmJvZHkpLFxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdMb2dpbkN0cmwnLFxuICAgICAgICAgIGRpc2FibGVQYXJlbnRTY3JvbGw6IHRydWUsXG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICcvcGFydGlhbHMvcGFuZWxzL2xvZ2luJyxcbiAgICAgICAgICBwYW5lbENsYXNzOiBcImp1c3RpY2FyLXBhbmVsXCIsXG4gICAgICAgICAgekluZGV4OiAxNTAsXG4gICAgICAgICAgbG9jYWxzOiB7XG4gICAgICAgICAgICBkZWZlcnJlZDogZGVmZXJyZWRcbiAgICAgICAgICB9LFxuICAgICAgICAgIHRyYXBGb2N1czogdHJ1ZSxcbiAgICAgICAgICBjbGlja091dHNpZGVUb0Nsb3NlOiB0cnVlLFxuICAgICAgICAgIGNsaWNrRXNjYXBlVG9DbG9zZTogdHJ1ZSxcbiAgICAgICAgICBoYXNCYWNrZHJvcDogdHJ1ZSxcbiAgICAgICAgICBwb3NpdGlvbjogcGFuZWxQb3NpdGlvbixcbiAgICAgICAgICBhbmltYXRpb246IHBhbmVsQW5pbWF0aW9uXG4gICAgICAgIH07XG5cbiAgICAgICAgJG1kUGFuZWwub3BlbihwYW5lbENvbmZpZyk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICB9O1xuXG4gICAgICAvKipcbiAgICAgICAqIE9wZW4gcmVnaXN0cmF0aW9uIHBhbmVsXG4gICAgICAgKi9cbiAgICAgIEp1c3RpY2FyQXV0aC5vcGVuUmVnaXN0ZXJQYW5lbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuXG4gICAgICAgIGxldCBwYW5lbFBvc2l0aW9uID0gJG1kUGFuZWwubmV3UGFuZWxQb3NpdGlvbigpXG4gICAgICAgICAgLmFic29sdXRlKClcbiAgICAgICAgICAuY2VudGVyKCk7XG5cbiAgICAgICAgbGV0IHBhbmVsQW5pbWF0aW9uID0gJG1kUGFuZWwubmV3UGFuZWxBbmltYXRpb24oKVxuICAgICAgICAgIC5vcGVuRnJvbSh7dG9wOiAxLCBsZWZ0OiAxfSlcbiAgICAgICAgICAuZHVyYXRpb24oMjAwKVxuICAgICAgICAgIC5jbG9zZVRvKHt0b3A6IDEsIGxlZnQ6IDF9KVxuICAgICAgICAgIC53aXRoQW5pbWF0aW9uKCRtZFBhbmVsLmFuaW1hdGlvbi5TQ0FMRSk7XG5cbiAgICAgICAgbGV0IHBhbmVsQ29uZmlnID0ge1xuICAgICAgICAgIGF0dGFjaFRvOiBhbmd1bGFyLmVsZW1lbnQoZG9jdW1lbnQuYm9keSksXG4gICAgICAgICAgY29udHJvbGxlcjogJ1JlZ2lzdGVyQ3RybCcsXG4gICAgICAgICAgZGlzYWJsZVBhcmVudFNjcm9sbDogdHJ1ZSxcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9wYXJ0aWFscy9wYW5lbHMvcmVnaXN0ZXInLFxuICAgICAgICAgIHBhbmVsQ2xhc3M6IFwianVzdGljYXItcGFuZWxcIixcbiAgICAgICAgICB6SW5kZXg6IDE3NSxcbiAgICAgICAgICBsb2NhbHM6IHtcbiAgICAgICAgICAgIGRlZmVycmVkOiBkZWZlcnJlZFxuICAgICAgICAgIH0sXG4gICAgICAgICAgdHJhcEZvY3VzOiB0cnVlLFxuICAgICAgICAgIGNsaWNrT3V0c2lkZVRvQ2xvc2U6IHRydWUsXG4gICAgICAgICAgY2xpY2tFc2NhcGVUb0Nsb3NlOiB0cnVlLFxuICAgICAgICAgIGhhc0JhY2tkcm9wOiB0cnVlLFxuICAgICAgICAgIHBvc2l0aW9uOiBwYW5lbFBvc2l0aW9uLFxuICAgICAgICAgIGFuaW1hdGlvbjogcGFuZWxBbmltYXRpb25cbiAgICAgICAgfTtcblxuICAgICAgICAkbWRQYW5lbC5vcGVuKHBhbmVsQ29uZmlnKTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgIH07XG5cbiAgICAgIC8qKlxuICAgICAgICogQ2hlY2sgcGVybWlzc2lvbnMgYmFzZWQgb24gYSBzdHJpbmdcbiAgICAgICAqL1xuICAgICAgSnVzdGljYXJBdXRoLmNoZWNrUGVybWlzc2lvbnMgPSBmdW5jdGlvbihwZXJtaXNzaW9uKSB7XG4gICAgICAgIC8vIEBUT0RPXG4gICAgICB9O1xuXG4gICAgICAvKipcbiAgICAgICAqIFNldCB0b2tlbiBpbiBoZWFkZXJzXG4gICAgICAgKi9cbiAgICAgIEp1c3RpY2FyQXV0aC5zZXRVc2VyID0gZnVuY3Rpb24odXNlciwgb3B0aW9uYWxUb2tlbikge1xuICAgICAgICBsZXQgdG9rZW4gPSBvcHRpb25hbFRva2VuIHx8IGZhbHNlO1xuICAgICAgICAkbG9jYWxTdG9yYWdlLmN1cnJlbnRVc2VyID0geyB1c2VyLCB0b2tlbiB9O1xuICAgICAgICBpZiAodG9rZW4pIHtcbiAgICAgICAgICAkaHR0cC5kZWZhdWx0cy5oZWFkZXJzLmNvbW1vbi5BdXRob3JpemF0aW9uID0gJ0JlYXJlciAnICsgdG9rZW47XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIC8qKlxuICAgICAgICogUmVtb3ZlIGxvY2FsIHRva2VuXG4gICAgICAgKi9cbiAgICAgIEp1c3RpY2FyQXV0aC5jbGVhclVzZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgZGVsZXRlICRsb2NhbFN0b3JhZ2UuY3VycmVudFVzZXI7XG4gICAgICAgICRodHRwLmRlZmF1bHRzLmhlYWRlcnMuY29tbW9uLkF1dGhvcml6YXRpb24gPSAgJyc7XG4gICAgICB9O1xuXG4gICAgICAvKipcbiAgICAgICAqIEdldCB1c2VyIGRldGFpbHNcbiAgICAgICAqL1xuICAgICAgSnVzdGljYXJBdXRoLmdldERpc3BsYXlOYW1lID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChKdXN0aWNhckF1dGgucGVuZGluZykge1xuICAgICAgICAgIHJldHVybiBcIkxvYWRpbmcuLi5cIjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgkbG9jYWxTdG9yYWdlLmN1cnJlbnRVc2VyKSB7XG4gICAgICAgICAgICBpZiAoJGxvY2FsU3RvcmFnZS5jdXJyZW50VXNlci51c2VyLm5hbWUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuICRsb2NhbFN0b3JhZ2UuY3VycmVudFVzZXIudXNlci5uYW1lO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gJGxvY2FsU3RvcmFnZS5jdXJyZW50VXNlci51c2VyLmVtYWlsO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gSnVzdGljYXJBdXRoO1xuICB9XG5dKTtcblxubW9kdWxlQXV0aC5jb250cm9sbGVyKCdMb2dpbkN0cmwnLCBbJ21kUGFuZWxSZWYnLCAnJHNjb3BlJywgJyRsb2cnLCAnSnVzdGljYXJBUEknLCAnSnVzdGljYXJBdXRoJyxcbiAgZnVuY3Rpb24obWRQYW5lbFJlZiwgJHNjb3BlLCAkbG9nLCBKdXN0aWNhckFQSSwgSnVzdGljYXJBdXRoKSB7XG4gICAgJHNjb3BlLndhaXRpbmcgPSBmYWxzZTtcbiAgICAkc2NvcGUuZXJyb3JNc3NnID0gXCJcIjtcbiAgICAvKipcbiAgICAgKiBIYW5kbGUgY2xpY2tpbmcgbG9naW4gYnV0dG9uLCB1c2luZyAkc2NvcGUudXNlckVtYWlsICYgJHNjb3BlLnVzZXJQYXNzd29yZFxuICAgICAqL1xuICAgICRzY29wZS5vbkNsaWNrTG9naW4gPSBmdW5jdGlvbigpIHtcbiAgICAgIC8vIGxvZ2luIGFuZCBjbG9zZSBpZiBzdWNjZXNzZnVsXG4gICAgICAkc2NvcGUud2FpdGluZyA9IHRydWU7XG5cbiAgICAgIEp1c3RpY2FyQXV0aC5sb2dpbigkc2NvcGUudXNlckVtYWlsLCAkc2NvcGUudXNlclBhc3N3b3JkKS50aGVuKFxuICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAkc2NvcGUud2FpdGluZyA9IGZhbHNlO1xuICAgICAgICAgIG1kUGFuZWxSZWYuY2xvc2UoKTtcbiAgICAgICAgfVxuICAgICAgKS5jYXRjaChcbiAgICAgICAgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgJGxvZy5lcnJvcihlcnIpO1xuICAgICAgICAgICRzY29wZS5lcnJvck1zc2cgPSBcIkVycm9yIGxvZ2dpbmcgaW4uXCI7XG4gICAgICAgICAgJHNjb3BlLndhaXRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAvLyBAVE9ETyBiZXR0ZXIgbWVzc2FnaW5nXG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBjbGlja2luZyByZWdpc3RlciBidXR0b25cbiAgICAgKi9cbiAgICAkc2NvcGUub25DbGlja1JlZ2lzdGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICBKdXN0aWNhckF1dGgub3BlblJlZ2lzdGVyUGFuZWwoKTtcbiAgICAgIG1kUGFuZWxSZWYuY2xvc2UoKTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLm9uQ2xpY2tDbG9zZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgbWRQYW5lbFJlZi5jbG9zZSgpO1xuICAgIH07XG4gIH1cbl0pO1xuXG5cbm1vZHVsZUF1dGguY29udHJvbGxlcignUmVnaXN0ZXJDdHJsJywgWydtZFBhbmVsUmVmJywgJyRzY29wZScsICckbG9nJywgJ0p1c3RpY2FyQVBJJywgJ0p1c3RpY2FyQXV0aCcsXG4gIGZ1bmN0aW9uKG1kUGFuZWxSZWYsICRzY29wZSwgJGxvZywgSnVzdGljYXJBUEksIEp1c3RpY2FyQXV0aCkge1xuICAgICRzY29wZS53YWl0aW5nID0gZmFsc2U7XG4gICAgJHNjb3BlLmVycm9yTXNzZyA9IFwiXCI7XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGNsaWNraW5nIHJlZ2lzdGVyIGJ1dHRvblxuICAgICAqL1xuICAgICRzY29wZS5vbkNsaWNrUmVnaXN0ZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgIC8vIGxvZ2luIGFuZCBjbG9zZSBpZiBzdWNjZXNzZnVsXG4gICAgICAkc2NvcGUud2FpdGluZyA9IHRydWU7XG5cbiAgICAgIEp1c3RpY2FyQXV0aC5yZWdpc3Rlcigkc2NvcGUudXNlckVtYWlsLCAkc2NvcGUudXNlclBhc3N3b3JkKS50aGVuKFxuICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAkc2NvcGUud2FpdGluZyA9IGZhbHNlO1xuICAgICAgICAgIG1kUGFuZWxSZWYuY2xvc2UoKTtcbiAgICAgICAgfVxuICAgICAgKS5jYXRjaChcbiAgICAgICAgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgJGxvZy5lcnJvcihlcnIpO1xuICAgICAgICAgICRzY29wZS5lcnJvck1zc2cgPSBcIkVycm9yIHJlZ2lzdGVyaW5nLlwiO1xuICAgICAgICAgICRzY29wZS53YWl0aW5nID0gZmFsc2U7XG4gICAgICAgICAgLy8gQFRPRE8gYmV0dGVyIG1lc3NhZ2luZ1xuICAgICAgICB9XG4gICAgICApO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgY2xpY2tpbmcgbG9naW4gYnV0dG9uXG4gICAgICovXG4gICAgJHNjb3BlLm9uQ2xpY2tMb2dpbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgSnVzdGljYXJBdXRoLm9wZW5Mb2dpblBhbmVsKCk7XG4gICAgICBtZFBhbmVsUmVmLmNsb3NlKCk7XG4gICAgfTtcblxuICAgICRzY29wZS5vbkNsaWNrQ2xvc2UgPSBmdW5jdGlvbigpIHtcbiAgICAgIG1kUGFuZWxSZWYuY2xvc2UoKTtcbiAgICB9O1xuICB9XG5dKTtcbiIsIi8qKlxuICogQG5hbWVzcGFjZSBKdXN0aWNhci5XZWJDbGllbnQuU3RhdGVzLkFkbWluXG4gKiBTdG9yZXMgYWxsIHRoZSBzdGF0ZXMgZm9yIHRoZSBBbmd1bGFyIFVJIHJvdXRlciBzdGF0ZSBtYWNoaW5lIGFuZCBhc3NvY2lhdGVzIGNvbnRyb2xsZXJzXG4gKi9cbmxldCBzdGF0ZUFkbWluID0gYW5ndWxhci5tb2R1bGUoXCJKdXN0aWNhci5XZWJDbGllbnQuU3RhdGVzLkFkbWluXCIsIFtcbiAgJ3VpLnJvdXRlcidcbl0pO1xuXG4vKipcbiAqIFN0YXRlIG5hbWUgZm9yIHRoaXMgc3RhdGVcbiAqL1xuc3RhdGVBZG1pbi5jb25zdGFudChcIkFETUlOX1NUQVRFXCIsIFwiYWRtaW5cIik7XG5cbi8qKlxuICogU3ViLVVSTCBmb3IgdGhpcyBzdGF0ZVxuICovXG5zdGF0ZUFkbWluLmNvbnN0YW50KFwiQURNSU5fU1RBVEVfVVJMXCIsIFwiL2FkbWluXCIpO1xuXG4vKipcbiAqIENvbmZpZyBhY3Rpb24gdGhhdCBzZXRzIHVwIHRoaXMgbW9kdWxlXG4gKi9cbnN0YXRlQWRtaW4uY29uZmlnKFtcbiAgJyRzdGF0ZVByb3ZpZGVyJyxcbiAgJ0FETUlOX1NUQVRFJyxcbiAgJ0FETUlOX1NUQVRFX1VSTCcsXG4gIGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCBBRE1JTl9TVEFURSwgQURNSU5fU1RBVEVfVVJMKSB7XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdXAgc3RhdGUgaW4gYXBwbGljYXRpb24gc3RhdGUgbWFjaGluZS5cbiAgICAgKi9cbiAgICAkc3RhdGVQcm92aWRlclxuICAgICAgLnN0YXRlKEFETUlOX1NUQVRFLCB7XG4gICAgICAgIHVybDogQURNSU5fU1RBVEVfVVJMLFxuICAgICAgICBwYXJhbXM6IHt9LFxuICAgICAgICBhYnN0cmFjdDogdHJ1ZVxuICAgICAgfSlcbiAgICA7XG4gIH1cbl0pO1xuIiwicmVxdWlyZShcIi4vbGFuZGluZy9pbmRleC5qc1wiKTtcbnJlcXVpcmUoXCIuL3BsYXllci9pbmRleC5qc1wiKTtcbnJlcXVpcmUoXCIuL2FkbWluL2luZGV4LmpzXCIpO1xuXG4vKipcbiAqIEBuYW1lc3BhY2UgSnVzdGljYXIuV2ViQ2xpZW50LlN0YXRlc1xuICogU3RvcmVzIGFsbCB0aGUgc3RhdGVzIGZvciB0aGUgQW5ndWxhciBVSSByb3V0ZXIgc3RhdGUgbWFjaGluZSBhbmQgYXNzb2NpYXRlcyBjb250cm9sbGVyc1xuICovXG5hbmd1bGFyLm1vZHVsZShcIkp1c3RpY2FyLldlYkNsaWVudC5TdGF0ZXNcIiwgW1xuICAnSnVzdGljYXIuV2ViQ2xpZW50LlN0YXRlcy5MYW5kaW5nJyxcbiAgJ0p1c3RpY2FyLldlYkNsaWVudC5TdGF0ZXMuUGxheWVyJyxcbiAgJ0p1c3RpY2FyLldlYkNsaWVudC5TdGF0ZXMuQWRtaW4nLFxuXSk7XG4iLCIvKipcbiAqIEBuYW1lc3BhY2UgSnVzdGljYXIuV2ViQ2xpZW50LlN0YXRlcy5MYW5kaW5nXG4gKiBTdG9yZXMgYWxsIHRoZSBzdGF0ZXMgZm9yIHRoZSBBbmd1bGFyIFVJIHJvdXRlciBzdGF0ZSBtYWNoaW5lIGFuZCBhc3NvY2lhdGVzIGNvbnRyb2xsZXJzXG4gKi9cbmxldCBzdGF0ZUxhbmRpbmcgPSBhbmd1bGFyLm1vZHVsZShcIkp1c3RpY2FyLldlYkNsaWVudC5TdGF0ZXMuTGFuZGluZ1wiLCBbXG4gICd1aS5yb3V0ZXInXG5dKTtcblxuLyoqXG4gKiBTdGF0ZSBuYW1lIGZvciB0aGlzIHN0YXRlXG4gKi9cbnN0YXRlTGFuZGluZy5jb25zdGFudChcIkxBTkRJTkdfU1RBVEVcIiwgXCJsYW5kaW5nXCIpO1xuXG4vKipcbiAqIFN1Yi1VUkwgZm9yIHRoaXMgc3RhdGVcbiAqL1xuc3RhdGVMYW5kaW5nLmNvbnN0YW50KFwiTEFORElOR19TVEFURV9VUkxcIiwgXCIvc3RhcnRcIik7XG5cbi8qKlxuICogTG9jYXRpb24gdG8gbG9hZCB2aWV3IGZyb21cbiAqL1xuc3RhdGVMYW5kaW5nLmNvbnN0YW50KFwiTEFORElOR19URU1QTEFURV9VUkxcIiwgXCIvcGFydGlhbHMvc3RhdGVzL2xhbmRpbmdcIik7XG5cbi8qKlxuICogQ29uZmlnIGFjdGlvbiB0aGF0IHNldHMgdXAgdGhpcyBtb2R1bGVcbiAqL1xuc3RhdGVMYW5kaW5nLmNvbmZpZyhbXG4gICckc3RhdGVQcm92aWRlcicsXG4gICdMQU5ESU5HX1NUQVRFJyxcbiAgJ0xBTkRJTkdfU1RBVEVfVVJMJyxcbiAgJ0xBTkRJTkdfVEVNUExBVEVfVVJMJyxcbiAgZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsIExBTkRJTkdfU1RBVEUsIExBTkRJTkdfU1RBVEVfVVJMLCBMQU5ESU5HX1RFTVBMQVRFX1VSTCkge1xuXG4gICAgLyoqXG4gICAgICogU2V0IHVwIHN0YXRlIGluIGFwcGxpY2F0aW9uIHN0YXRlIG1hY2hpbmUuXG4gICAgICovXG4gICAgJHN0YXRlUHJvdmlkZXJcbiAgICAgIC5zdGF0ZShMQU5ESU5HX1NUQVRFLCB7XG4gICAgICAgIHVybDogTEFORElOR19TVEFURV9VUkwsXG4gICAgICAgIHBhcmFtczoge30sXG4gICAgICAgIGNvbnRyb2xsZXI6IFwiU3RhdGVMYW5kaW5nQ3RybFwiLFxuICAgICAgICB0ZW1wbGF0ZVVybDogTEFORElOR19URU1QTEFURV9VUkxcbiAgICAgIH0pXG4gICAgO1xuICB9XG5dKTtcblxuLyoqXG4gKiBDb250cm9sbGVyIGZvciBzdGF0ZVxuICovXG5zdGF0ZUxhbmRpbmcuY29udHJvbGxlcihcIlN0YXRlTGFuZGluZ0N0cmxcIiwgW1xuICBmdW5jdGlvbigpIHtcblxuICB9XG5dKTtcbiIsIi8qKlxuICogQG5hbWVzcGFjZSBKdXN0aWNhci5XZWJDbGllbnQuU3RhdGVzLlBsYXllclxuICogU3RvcmVzIGFsbCB0aGUgc3RhdGVzIGZvciB0aGUgQW5ndWxhciBVSSByb3V0ZXIgc3RhdGUgbWFjaGluZSBhbmQgYXNzb2NpYXRlcyBjb250cm9sbGVyc1xuICovXG5sZXQgc3RhdGVQbGF5ZXIgPSBhbmd1bGFyLm1vZHVsZShcIkp1c3RpY2FyLldlYkNsaWVudC5TdGF0ZXMuUGxheWVyXCIsIFtcbiAgJ3VpLnJvdXRlcidcbl0pO1xuXG4vKipcbiAqIFN0YXRlIG5hbWUgZm9yIHRoaXMgc3RhdGVcbiAqL1xuc3RhdGVQbGF5ZXIuY29uc3RhbnQoXCJQTEFZRVJfU1RBVEVcIiwgXCJwbGF5ZXJcIik7XG5cbi8qKlxuICogU3ViLVVSTCBmb3IgdGhpcyBzdGF0ZVxuICovXG5zdGF0ZVBsYXllci5jb25zdGFudChcIlBMQVlFUl9TVEFURV9VUkxcIiwgXCIvcGxheWVyXCIpO1xuXG4vKipcbiAqIENvbmZpZyBhY3Rpb24gdGhhdCBzZXRzIHVwIHRoaXMgbW9kdWxlXG4gKi9cbnN0YXRlUGxheWVyLmNvbmZpZyhbXG4gICckc3RhdGVQcm92aWRlcicsXG4gICdQTEFZRVJfU1RBVEUnLFxuICAnUExBWUVSX1NUQVRFX1VSTCcsXG4gIGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCBQTEFZRVJfU1RBVEUsIFBMQVlFUl9TVEFURV9VUkwpIHtcblxuICAgIC8qKlxuICAgICAqIFNldCB1cCBzdGF0ZSBpbiBhcHBsaWNhdGlvbiBzdGF0ZSBtYWNoaW5lLlxuICAgICAqL1xuICAgICRzdGF0ZVByb3ZpZGVyXG4gICAgICAuc3RhdGUoUExBWUVSX1NUQVRFLCB7XG4gICAgICAgIHVybDogUExBWUVSX1NUQVRFX1VSTCxcbiAgICAgICAgcGFyYW1zOiB7fSxcbiAgICAgICAgYWJzdHJhY3Q6IHRydWVcbiAgICAgIH0pXG4gICAgO1xuICB9XG5dKTtcbiIsIi8qKlxuICogQG5hbWVzcGFjZSBKdXN0aWNhci5XZWJDbGllbnQuV2lkZ2V0cy5TaWRlYmFyXG4gKiBTdG9yZXMgYWxsIHRoZSBzdGF0ZXMgZm9yIHRoZSBBbmd1bGFyIFVJIHJvdXRlciBzdGF0ZSBtYWNoaW5lIGFuZCBhc3NvY2lhdGVzIGNvbnRyb2xsZXJzXG4gKi9cbmxldCB3aWRnZXRTaWRlYmFyID0gYW5ndWxhci5tb2R1bGUoXCJKdXN0aWNhci5XZWJDbGllbnQuV2lkZ2V0cy5TaWRlYmFyXCIsIFtcbiAgJ3VpLnJvdXRlcicsXG4gICdKdXN0aWNhci5XZWJDbGllbnQuQVBJJyxcbiAgJ0p1c3RpY2FyLldlYkNsaWVudC5BdXRoJ1xuXSk7XG5cblxuLyoqXG4gKiBDb250cm9sbGVyIGZvciB3aWRnZXRcbiAqL1xud2lkZ2V0U2lkZWJhci5jb250cm9sbGVyKFwiV2lkZ2V0U2lkZWJhckN0cmxcIiwgW1xuICBmdW5jdGlvbigpIHtcblxuICB9XG5dKTtcbiIsIi8qKlxuICogQG5hbWVzcGFjZSBKdXN0aWNhci5XZWJDbGllbnQuV2lkZ2V0cy5Ub29sYmFyXG4gKiBTdG9yZXMgYWxsIHRoZSBzdGF0ZXMgZm9yIHRoZSBBbmd1bGFyIFVJIHJvdXRlciBzdGF0ZSBtYWNoaW5lIGFuZCBhc3NvY2lhdGVzIGNvbnRyb2xsZXJzXG4gKi9cbmxldCB3aWRnZXRUb29sYmFyID0gYW5ndWxhci5tb2R1bGUoXCJKdXN0aWNhci5XZWJDbGllbnQuV2lkZ2V0cy5Ub29sYmFyXCIsIFtcbiAgJ3VpLnJvdXRlcicsXG4gICdKdXN0aWNhci5XZWJDbGllbnQuQVBJJyxcbiAgJ0p1c3RpY2FyLldlYkNsaWVudC5BdXRoJ1xuXSk7XG5cbi8qKlxuICogQ29udHJvbGxlciBmb3Igd2lkZ2V0XG4gKi9cbndpZGdldFRvb2xiYXIuY29udHJvbGxlcihcIldpZGdldFRvb2xiYXJDdHJsXCIsIFsnJHNjb3BlJywgJ0p1c3RpY2FyQXV0aCcsXG4gIGZ1bmN0aW9uKCRzY29wZSwgSnVzdGljYXJBdXRoKSB7XG4gICAgJHNjb3BlLmJBdXRoUGVuZGluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIEp1c3RpY2FyQXV0aC5wZW5kaW5nO1xuICAgIH1cblxuICAgICRzY29wZS5iTG9nZ2VkSW4gPSBmdW5jdGlvbigpIHtcbiAgICAgIC8vIGlzIHRoZXJlIGEgdmFsaWQgYWNjb3VudD9cbiAgICAgIHJldHVybiBKdXN0aWNhckF1dGguYkxvZ2dlZEluKCk7XG4gICAgfTtcblxuICAgICRzY29wZS5vbkNsaWNrTG9nSW4gPSBmdW5jdGlvbigpIHtcbiAgICAgIEp1c3RpY2FyQXV0aC5vcGVuTG9naW5QYW5lbCgpO1xuICAgIH07XG5cbiAgICAkc2NvcGUub25DbGlja0xvZ091dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgSnVzdGljYXJBdXRoLmxvZ291dCgpO1xuICAgIH07XG5cbiAgICAkc2NvcGUuZ2V0RGlzcGxheU5hbWUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBKdXN0aWNhckF1dGguZ2V0RGlzcGxheU5hbWUoKTtcbiAgICB9O1xuICB9XG5dKTtcbiJdfQ==
