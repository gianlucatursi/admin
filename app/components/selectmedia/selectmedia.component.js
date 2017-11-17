(function(angular){
  "use strict";

  SelectMediaController.$inject = ['$scope', 'AdminService', 'ChannelService', 'toastr', 'MediaService', 'UtilService', '$sce'];

  angular
    .module('Smart.directives')
    .component('selectmediaModal', {
      templateUrl: 'app/components/selectmedia/selectmedia.view.html',
      bindings: {
        resolve: '<',
        close: '&',
        dismiss: '&'
      },
      controller: SelectMediaController
    });

  function SelectMediaController($scope, AdminService, ChannelService, toastr, MediaService, UtilService, $sce){
    var _this = this;
    var _scope = $scope;
    _scope.data = {
      newdesc: '',
      newtags: '',
      channelSelected :{},
      laddaUpdate: false
    };

    _scope.channels = [];
    _scope.getMediaUrl = _getMediaUrl;
    _scope.selectMedia = _selectMedia;
    _scope.saveMedia = _saveMedia;

    _scope.mediaSelected = MediaService._modalOptions.mediaSelected;
    _scope.data.newdesc = _scope.mediaSelected.description || '';
    _scope.data.newtags = _scope.mediaSelected.tags || '';
    _scope.data.channelSelected = ChannelService.byId(_scope.mediaSelected.id_channel);

    _getChannels();

    _scope.cancelSelection = function () {
      _this.dismiss({$value: 'cancel'});
    };

    function _getMediaUrl(media){
      if(media.type == 'IMAGE'){
        return UtilService.imageUrl(media.id_image);
      }else{
        return $sce.trustAsResourceUrl(media.video_url);
      }
    }

    function _selectMedia(){
      MediaService._modalOptions.realSelected = _scope.mediaSelected;
      _this.close({$value: _scope.mediaSelected});
    }


    function _saveMedia(){

      _scope.data.laddaUpdate = true;

      MediaService.updateMedia({
        _id: _scope.mediaSelected._id,
        description: _scope.data.newdesc,
        tags: _scope.data.newtags,
        id_channel:  _scope.data.channelSelected._id
      })
        .then(function(){
          toastr.success('Aggiornamento completato', 'Aggiornamento Media');
          _scope.mediaSelected.tags = _scope.data.newtags;
          _scope.mediaSelected.description = _scope.data.newdesc;
          _scope.mediaSelected.id_channel = _scope.data.channelSelected._id;
          _scope.data.laddaUpdate = false;
          _this.dismiss({$value: 'cancel'});
        }, function(){
          toastr.error('Aggiornamento fallito', 'Aggiornamento Media');
          _scope.data.laddaUpdate = false;
        });
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

            if(!AdminService.user.isRedazione()){
              _scope.data.channelSelected = ChannelService.byId(AdminService.user.channelId());
              _scope.channels = [_scope.data.channelSelected];
            }else{
              _scope.data.channelSelected = _scope.channels[0];
            }

            _scope.data.channelSelected = ChannelService.byId(_scope.mediaSelected.id_channel);
          },
          function(){
            console.error("ERROR GETTING CHANNELS");
          }
        );
    }

  }

})(window.angular);