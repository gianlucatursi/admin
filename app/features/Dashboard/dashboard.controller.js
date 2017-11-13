(function(angular){
  "use strict";

  var controllers = angular.module('Smart.controllers');

  DashboardController.$inject = ['$state', 'EventBus', 'AdminService', '$uibModal'];
  controllers.controller('DashboardController', DashboardController);

  function DashboardController($state, EventBus, AdminService, $uibModal){

    var _this = this;
    _this.user = AdminService.user;
    _this.city = AdminService.user.citySelected();
    _this.current_state = $state.current;


    var modalInstance = $uibModal.open({
      animation: true,
      component: 'mediaModal',
      size: 'lg'
    });

    modalInstance.result.then(function (selectedItem) {
      _this.selected = selectedItem;
    }, function () {
      $log.info('modal-component dismissed at: ' + new Date());
    });
  }

})(window.angular);