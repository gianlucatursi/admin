(function(angular){
  "use strict";

  var controllers = angular.module('Smart.controllers');

  HomeController.$inject = ['$state', 'EventBus', 'AdminService'];
  controllers.controller('HomeController', HomeController);

  function HomeController($state, EventBus, AdminService){

    var _this = this;
    _this.user = AdminService.user;
    _this.ROUTING = $state.ROUTING;
    _this.current_state = $state.current;

  }

})(window.angular);