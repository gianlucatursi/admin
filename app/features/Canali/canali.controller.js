(function(angular){
  "use strict";

  var controllers = angular.module('Smart.controllers');

  CanaliController.$inject = ['$state', 'EventBus', 'AdminService'];
  controllers.controller('CanaliController', CanaliController);

  function CanaliController($state, EventBus, AdminService){

    var _this = this;
    _this.user = AdminService.user;
    _this.city = AdminService.user.citySelected();
    _this.current_state = $state.current;

  }

})(window.angular);