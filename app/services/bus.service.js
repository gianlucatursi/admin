(function (angular) {
  "use strict";

  var services = angular.module('Smart.services');

  var _MESSAGES = {

    AUTH: {
      CHANNEL: 'auth',
      TOPICS: {
        USER:{
          LOGIN: 'user.login'
        }
      }
    },
    ROUTING:{
      CHANNEL: '$routing'
    }

  };

  EventBus.$inject = [];
  services.service('EventBus', EventBus);

  /**
   * Product manager
   */
  function EventBus() {

    /** return service **/
    postal.MESSAGES = _MESSAGES;
    return postal;

  }

})(window.angular);