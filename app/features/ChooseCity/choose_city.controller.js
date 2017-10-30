(function(angular){
  "use strict";

  var controllers = angular.module('Smart.controllers');

  ChooseCityController.$inject = ['$state', 'EventBus', 'AdminService'];
  controllers.controller('ChooseCityController', ChooseCityController);

  function ChooseCityController($state, EventBus, AdminService){

    var _this = this;

    _this.user = AdminService.user;
    _this.city_selected = {};

    _this.selectCity = _selectCity;

    function _selectCity(){

      if(_this.city_selected && _this.city_selected._id){
        AdminService.user.choose_city(_this.city_selected);
        $state.go($state.ROUTING.home_dashboard.name);
      }

    }
  }

})(window.angular);