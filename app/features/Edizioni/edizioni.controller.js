(function(angular){
  "use strict";

  var controllers = angular.module('Smart.controllers');

  EdizioniController.$inject = ['$state', 'EventBus', 'AdminService'];
  controllers.controller('EdizioniController', EdizioniController);

  function EdizioniController($state, EventBus, AdminService){

    var _this = this;
    _this.user = AdminService.user;
    _this.city = AdminService.user.citySelected();
    _this.current_state = $state.current;

  }

})(window.angular);