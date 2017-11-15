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
    },
    MEDIAMODAL:{
      CHANNEL: 'mediamodal',
      GALLERY: 'gallery',
      SEND_IS_GALLERY: 'is_gallery',
      GET_IS_GALLERY: 'get_is_gallery'
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