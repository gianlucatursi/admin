(function(angular){
  "use strict";

  var controllers = angular.module('Smart.controllers');

  CanaliController.$inject = ['$state', 'EventBus', 'AdminService', 'ChannelService'];
  controllers.controller('CanaliController', CanaliController);

  function CanaliController($state, EventBus, AdminService, ChannelService){

    var _this = this;
    _this.user = AdminService.user;
    _this.city = AdminService.user.citySelected();
    _this.current_state = $state.current;
    _this.channelService = ChannelService;
    _this.channels = [];

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

    _getChannels();

    function _getChannels(){

      ChannelService
        .get()
        .then(
          function(results){

            _this.channels = ChannelService.toArray();
            _this.options.pager.count = Math.ceil(_this.channels.length / _this.options.pager.limit);

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