(function(angular){
  "use strict";

  var controllers = angular.module('Smart.controllers');

  LoginController.$inject = ['$state', 'EventBus', 'AdminService'];
  controllers.controller('LoginController', LoginController);

  function LoginController($state, EventBus, AdminService){

    var _this = this;
    _this.userdata = {
      email: '',
      password: '',
      invalid: false,
      isWorking : AdminService.isWorking
    };

    _this.login = _login;


    /**
     * Login method
     * @private
     */
    function _login(){

      AdminService
        .login(_this.userdata.email, _this.userdata.password)
        .then(function(success){

          if(AdminService.user.citySelected()){
            $state.go($state.ROUTING.home.name);
          }else{
            $state.go($state.ROUTING.choose_city.name);
          }

        }, function (error){
          _this.userdata.invalid = true;
        });

    }
  }

})(window.angular);