(function(angular){
  "use strict";

  var controllers = angular.module('Smart.controllers');

  UtilitaController.$inject = ['$state', 'UtilitaService', 'AdminService', 'ChannelService'];
  controllers.controller('UtilitaController', UtilitaController);

  function UtilitaController($state, UtilitaService, AdminService, ChannelService){

    var _this = this;
    _this.user = AdminService.user;
    _this.city = AdminService.user.citySelected();
    _this.current_state = $state.current;
    _this.channelService = ChannelService;
    _this.adminService = AdminService;

    _this.utilities = [];

    _this.options = {
      pager:{
        isopen: false,
        active: 1,
        count: 1,
        limit: 5
      }
    };

    _this.changePage = _changePage;
    _this.generatePages = _generatePages;

    _getUtilita();

    function _getUtilita(){

      UtilitaService
        .get()
        .then(
          function(results){

            _this.utilities = results;
            _this.options.pager.count = Math.ceil(_this.utilities.length / _this.options.pager.limit);

          },
          function(){
            console.error("ERROR GETTING CHANNELS");
          }
        );
    }

    function _changePage(pnum){
      _this.options.pager.active = pnum;
    }

    function _generatePages(){
      return _.range(1,_this.options.pager.count+1);
    }

  }

})(window.angular);