(function(angular){
  "use strict";

  MediaModalController.$inject = ['$scope', 'AdminService', 'ChannelService'];

  angular
    .module('Smart.directives')
    .component('mediaModal', {
      templateUrl: 'app/components/mediamodal/mediamodal.view.html',
      bindings: {
        resolve: '<',
        close: '&',
        dismiss: '&'
      },
      controller: MediaModalController
    });

  function MediaModalController($scope, AdminService, ChannelService){
    var _this = this;
    var _scope = $scope;

    _scope.channelsUpload = [];
    _scope.channels = [];

    _scope.channelService = ChannelService;
    _scope.channelUploadSelected = {};
    _scope.channelViewSelected = {};
    _scope.dateSelected = null;
    _scope.textToSearch = '';
    _scope.medias = [];

    _scope.mediaTypes = ['Immagini e Video', 'Immagini', 'Video'];
    _scope.mediaTypeSelected = _scope.mediaTypes[0];

    _scope.applyFilters = _applyFilters;
    _scope.$onInit = _onInit;

    _scope.ok = function () {
      _this.close({$value: _scope.selected.item});
    };

    _scope.cancel = function () {
      _this.dismiss({$value: 'cancel'});
    };

    _scope.title = 'Suca title';

    _getChannels();

    function _onInit() {
      console.log("[init media modal]");
    }

    function _applyFilters(){

    }

    /**
     * Get Channels
     * @private
     */
    function _getChannels(){

      ChannelService
        .get()
        .then(
          function(results){

            _scope.channels = ChannelService.toArray();
            (_scope.channels || []).unshift({
              ds_name: 'Tutti i canali',
              _id: ''
            });

            if(!AdminService.user.isRedazione()){
              _scope.channelUploadSelected = ChannelService.byId(AdminService.user.channelId());
              _scope.channelViewSelected = ChannelService.byId(AdminService.user.channelId());
              _scope.channels = [_scope.channelSelected];
            }else{
              _scope.channelUploadSelected = _scope.channels[0];
              _scope.channelViewSelected = _scope.channels[0];
            }
          },
          function(){
            console.error("ERROR GETTING CHANNELS");
          }
        );
    }

  }

})(window.angular);