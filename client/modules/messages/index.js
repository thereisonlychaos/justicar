/**
 * @namespace Justicar.WebClient.Messages
 * handles error and pop-up messages
 */
let moduleMessages = angular.module("Justicar.WebClient.Messages", []);

moduleAPI.service("JusticarMessages", ['$mdToast',
  function($mdToast) {
      let Messages = {};

      /**
       * Show $mdToast alert message, used normally for errors
       * @params {string} message - The message you wish to appear
       */
      Messages.alert = function(message) {

      };

      return Messages;
  }
]);
