/**
 * @namespace Justicar.WebClient.API
 * sets up the API configuration
 */
let moduleAPI = angular.module("Justicar.WebClient.API", {});

/**
 * Stores base URL for api
 */
moduleAPI.constant("API_URL", "http://127.0.0.1/api");

moduleAPI.service("JusticarAPI", ['$http', '$resource', '$log', '$q', 'API_URL',
  function($http, $resource, $log, $rq, API_URL) {
      let JusticarAPI = {};





      return JusticarAPI;
  }
]);
