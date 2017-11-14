(function(angular){
  "use strict";

  MediaModalController.$inject = ['$scope', 'AdminService', 'ChannelService', 'toastr'];

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

  function MediaModalController($scope, AdminService, ChannelService, toastr){
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
    _this.fileSelect = _fileSelect;
    _this.videoSelect = _videoSelect;

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

    function _fileSelect(files) {

      var photofile = element.files[0];
      var reader = new FileReader();
      reader.onload = function(e) {
        // handle onload
      };
      reader.readAsDataURL(photofile);


    }

    function _videoSelect(video) {

       var file = files[0];

       var uploader = new VimeoUpload({

         name: 'name of video',
         description: 'vimeo description',
         file: file,
         token: 'k2A6rvlgcwmBUZ11CbaSW27dB3oQkANgaHmAxjx1JCs+mIarKemP6Oe72IyocefQGRas4IkOvqwlEFd+FfetnISI/Qp8p0ALwkcivxVhO0nH8IkTlpX8H/cyX1Ii6eWP',
         onError: function(data) {
         //showMessage('<strong>Error</strong>: ' + JSON.parse(data).error, 'danger')
          toastr.error('Ops! Qualcosa è andato storto. Si prega di riprovare più tardi', 'Upload Video')
         },
         onProgress: function(data) {
          console.info('PROGRESS'  +( data.loaded / data.total));
         },
         onComplete: function(videoId, index) {
           var url = 'https://vimeo.com/' + videoId;

           console.log(url);

           if (index > -1) {

           url = this.metadata[index].link;

           var pretty = JSON.stringify(this.metadata[index], null, 2);

           console.log(pretty)
         }

         showMessage('<strong>Upload Successful</strong>: check uploaded video @ <a href="' + url + '">' + url + '</a>. Open the Console for the response details.');
          toastr.success('Caricamento completato', 'Upload Video');
         }
       });

       uploader.upload();

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