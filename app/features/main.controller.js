(function(angular){
  "use strict";

  var controllers = angular.module('Smart.controllers');

  MainController.$inject = ['$scope', 'EventBus', 'AdminService'];
  controllers.controller('MainController', MainController);

  function MainController($scope, EventBus, AdminService){

    var _this = this;
    _this.admin = AdminService;

    setTimeout(function(){
      AdminService.login('mobile@digitalx.it', 'digitalx');
    }, 1000);

    EventBus.subscribe({
      channel: EventBus.MESSAGES.AUTH.CHANNEL,
      topic: EventBus.MESSAGES.AUTH.TOPICS.USER.LOGIN,
      callback: _loginEvent
    });


    function _loginEvent(data, env){
      if(data.error){

        alert('REDIRECT TO LOGIN');
        return;
      }

      console.log(AdminService.user);

      $('.loading').hide();
      $('.maincontent').show();
    }
  }

})(window.angular);