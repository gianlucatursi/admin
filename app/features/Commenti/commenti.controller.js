(function(angular){
  "use strict";

  var controllers = angular.module('Smart.controllers');

  CommentiController.$inject = ['$state', 'EventBus', 'AdminService'];
  controllers.controller('CommentiController', CommentiController);

  function CommentiController($state, EventBus, AdminService){

    var _this = this;
    _this.user = AdminService.user;
    _this.city = AdminService.user.citySelected();
    _this.current_state = $state.current;

  }

})(window.angular);