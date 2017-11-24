(function(angular){
  "use strict";

  var controllers = angular.module('Smart.controllers');

  DashboardController.$inject = ['$state', 'ChannelService', 'AdminService', 'DashboardService'];
  controllers.controller('DashboardController', DashboardController);

  function DashboardController($state, ChannelService, AdminService, DashboardService){

    var _this = this;
    _this.user = AdminService.user;
    _this.city = AdminService.user.citySelected();
    _this.current_state = $state.current;
    _this.adminService = AdminService;
    _this.stats = {};
    _this.options = {
      platformLoaded: false,
      channelLoaded: false
    };

    _this.channels = [];
    _this.channelSelected = {};

    _this.channelChanged = _channelChanged;

    if(AdminService.user.isRedazione()){
      _stats({}, true);
      //_stats(false);
    }/*else{
      _stats(false);
    }*/

    _getChannels();

    function _stats(filters, forPlatform){

      DashboardService
        .get(filters, forPlatform)
        .then(
          function(result){
            console.info(result);
            _this.stats = DashboardService.allStats();
            _this.options[forPlatform ? 'platformLoaded' : 'channelLoaded'] = true;
          },
          function(error){
            console.error(error);
          }
        )
    }

    function _channelChanged(){

      if(_this.stats.channel){
        _.each(_this.stats.channel || [], function(val, key){
          _this.stats.channel[key] = "-";
        });
      }

      _stats({
        id_channel : _this.channelSelected.id()
      },false);

    }

    /**
     * Get channels
     * @private
     */
    function _getChannels(){

      ChannelService
        .get()
        .then(
          function(results){

            _this.channels = ChannelService.toArray();

            if(!AdminService.user.isRedazione()){
              _this.channelSelected = ChannelService.byId(AdminService.user.channelId());
              _this.channels = [_this.channelSelected];
            }else{
              _this.channelSelected = _this.channels[0];
            }

            _stats({
              id_channel : _this.channelSelected.id()
            },false);
          },
          function(){
            console.error("ERROR GETTING CHANNELS");
          }
        );
    }

  }

})(window.angular);