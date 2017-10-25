(function(angular){
  "use strict";

  var controllers = angular.module('Smart.controllers');

  MediaController.$inject = ['$state', 'EventBus', 'AdminService'];
  controllers.controller('MediaController', MediaController);

  function MediaController($state, EventBus, AdminService){

    var _this = this;
    _this.user = AdminService.user;
    _this.city = AdminService.user.citySelected();
    _this.current_state = $state.current;

  }

})(window.angular);