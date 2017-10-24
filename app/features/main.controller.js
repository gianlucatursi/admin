(function(angular){
  "use strict";

  var controllers = angular.module('Smart.controllers');

  MainController.$inject = ['$state', 'EventBus', 'AdminService'];
  controllers.controller('MainController', MainController);

  function MainController($state, EventBus, AdminService){

    var _this = this;
    _this.admin = AdminService;

    EventBus.subscribe({
      channel: EventBus.MESSAGES.AUTH.CHANNEL,
      topic: EventBus.MESSAGES.AUTH.TOPICS.USER.LOGIN,
      callback: _loginEvent
    });


    /**
     * Login callback
     * @param data
     * @param env
     * @private
     */
    function _loginEvent(data, env){

      if(data.error){
        $state.go($state.ROUTING.login.name);
      }else{
        $state.go($state.ROUTING.home.name);
      }

      $('.loading').hide();
      $('.maincontent').show();

    }
  }

})(window.angular);