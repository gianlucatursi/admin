(function(angular){
  "use strict";

  var controllers = angular.module('Smart.controllers');

  SegnalationDetailController.$inject = ['$state', 'AdminService', 'ChannelService', 'toastr'];
  controllers.controller('SegnalationDetailController', SegnalationDetailController);

  function SegnalationDetailController($state, AdminService, ChannelService, toastr){

      var _this = this;
      _this.user = AdminService.user;
      _this.ROUTING = $state.ROUTING;
      _this.current_state = $state.current;

  }

})(window.angular);