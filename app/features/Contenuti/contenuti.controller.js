(function(angular){
  "use strict";

  var controllers = angular.module('Smart.controllers');

  ContenutiController.$inject = ['$state', 'EventBus', 'AdminService'];
  controllers.controller('ContenutiController', ContenutiController);

  function ContenutiController($state, EventBus, AdminService){

    var _this = this;
    _this.user = AdminService.user;
    _this.city = AdminService.user.citySelected();
    _this.current_state = $state.current;

  }

})(window.angular);