/**
 * @namespace Justicar.WebClient.API
 * sets up the API configuration
 */
let moduleAPI = angular.module("Justicar.WebClient.API", ['ngResource']);

/**
 * Stores base URL for api
 */
moduleAPI.constant("API_URL", "http://127.0.0.1:3000/api");

moduleAPI.service("JusticarAPI", ['$http', '$resource', '$log', '$q', 'API_URL',
  function($http, $resource, $log, $q, API_URL) {
      let JusticarAPI = {};

      /**
       * Auth functions used for auth and user management
       */
      JusticarAPI.auth = {};

      JusticarAPI.auth.login = function(email, password) {
        return $http.post(API_URL + "/user/login", {
            username: email,
            password: password

        });
      };

      JusticarAPI.auth.logout = function() {
        return $http.post(API_URL + "/user/logout");
      };

      JusticarAPI.auth.current = function() {
        return $http.get(API_URL + "/user/current");
      };

      JusticarAPI.auth.register = function(email, password) {
        return $http.post(API_URL + "/user/register", {
          user: {
            email: email,
            password: password
          }
        });
      };

      /**
       * Resources API
       */
      JusticarAPI.resources = {
        channel: $resource("/api/game/channel/:_id", {_id: '@_id'}),
        character: $resource("/api/character/character/:_id", {_id: '@_id'}),
        weather: $resource("/api/game/weather/:_id", {_id: '@_id'},
          {
            "makeCurrent": {
              method: "POST",
              url: "/api/game/weather/:_id/function/makeCurrent"
            }
          }
        )
      };

      return JusticarAPI;
  }
]);
