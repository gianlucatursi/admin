(function(angular){
  "use strict";

  MediaModalController.$inject = ['$scope', 'AdminService', 'ChannelService', 'toastr', 'MediaService', 'UtilService', '$sce', '$uibModal'];

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

  function MediaModalController($scope, AdminService, ChannelService, toastr, MediaService, UtilService, $sce, $uibModal){
    var _this = this;
    var _scope = $scope;

    _scope.channelsUpload = [];
    _scope.channels = [];
    _scope.options = {
      laddaVideo: false,
      laddaImages: false
    };

    MediaService
      .get()
      .then(function(__medias){
        _scope.medias = MediaService.toArray();
      }, function(){

      });

    _scope.isGallery = MediaService._modalOptions.isGallery;
    //alert(MediaService._modalOptions.isGallery);

    _scope.channelService = ChannelService;
    _scope.channelUploadSelected = {};
    _scope.channelViewSelected = {};
    _scope.dateSelected = null;
    _scope.textToSearch = '';
    _scope.medias = MediaService.toArray();

    _scope.mediaTypes = ['Immagini e Video', 'Immagini', 'Video'];
    _scope.mediaTypeSelected = _scope.mediaTypes[0];

    _scope.applyFilters = _applyFilters;
    _scope.$onInit = _onInit;
    _scope.getMediaUrl = _getMediaUrl;

    _scope.fileSelect = _fileSelect;
    _scope.videoSelect = _videoSelect;
    _scope.selectImage = _selectImage;
    _scope.selectVideo = _selectVideo;

    _scope.ok = function () {
      _this.close({$value: _scope.selected.item});
    };

    _scope.cancel = function () {
      _this.dismiss({$value: 'cancel'});
    };


    _getChannels();

    function _onInit() {
      console.log("[init media modal]");
    }

    function _applyFilters(){

    }

    /**
     * Upload images
     * @param files
     * @private
     */
    function _fileSelect(files) {

      var photofile = files[0];
      var reader = new FileReader();
      _scope.options.laddaImages = true;
      reader.onload = function(e) {
        // handle onload
        MediaService
          .uploadImage(e.target.result, _scope.channelUploadSelected._id)
          .then(function(){
            _scope.options.laddaImages = false;
            toastr.success('Caricamento completato', 'Upload Media');
            _scope.medias = MediaService.toArray();
          }, function(){
            _scope.options.laddaImages = false;
            toastr.error('Ops! Qualcosa è andato storto. Si prega di riprovare più tardi', 'Upload Video')
          });
      };
      reader.readAsDataURL(photofile);

    }

    /**
     * Upload video
     * @param video
     * @private
     */
    function _videoSelect(video) {

       var file = video;

      _scope.options.laddaVideo = true;

       var uploader = new VimeoUpload({

         name: _scope.channelUploadSelected.ds_name  + " " + (new Date()).toISOString(),
         description: 'vimeo description',
         file: file,
         private: true,
         token: '034ea8145a609e99ee0d9f01e8ab4b73',
         onError: function(data) {
            //showMessage('<strong>Error</strong>: ' + JSON.parse(data).error, 'danger')
            toastr.error('Ops! Qualcosa è andato storto. Si prega di riprovare più tardi', 'Upload Video')
         },
         onProgress: function(data) {
            _scope.options.laddaVideo = (data.loaded / data.total);
            _scope.$apply();
          },
         onComplete: function(videoId, index) {
            var url = 'https://vimeo.com/' + videoId;

            MediaService.createMedia({
              type: 'VIDEO',
              id_channel: _scope.channelUploadSelected._id,
              "ds_tags" : '',
              "ds_description" : '',
              "video_url" : url
            }).then(
              function(){
                toastr.success('Caricamento completato', 'Upload Video');
                _scope.options.laddaVideo = false;
              }, function(){
                toastr.error('Ops! Qualcosa è andato storto. Si prega di riprovare più tardi', 'Upload Video')
                _scope.options.laddaVideo = false;
              }
            );
         }
       });

       uploader.upload();

    }

    /**
     * Open modal select image
     * @param m
     * @private
     */
    function _selectImage(m){
      MediaService._modalOptions.mediaSelected = m;
      var _mediaModalInstance = $uibModal.open({
        animation: true,
        component: 'selectmediaModal',
        size: 'lg'
      });

      _mediaModalInstance.result.then(function (selectedItem) {
        //_this.selected = selectedItem;
        _this.close({$value: selectedItem});
      }, function () {
        console.log('modal-component dismissed at: ' + new Date());
      });

    }

    /**
     * Open Modal select video
     * @param m
     * @private
     */
    function  _selectVideo(m){
      MediaService._modalOptions.mediaSelected = m;

      var _mediaModalInstance = $uibModal.open({
        animation: true,
        component: 'selectmediaModal',
        size: 'lg'
      });

      _mediaModalInstance.result.then(function (selectedItem) {
        //_this.selected = selectedItem;
        _this.close({$value: selectedItem});
      }, function () {
        console.log('modal-component dismissed at: ' + new Date());
      });

    };

    /**
     * Get media url
     * @param media
     * @return {*}
     * @private
     */
    function _getMediaUrl(media){
      if(media.type == 'IMAGE'){
        return UtilService.imageUrl(media.id_image);
      }else{
        return $sce.trustAsResourceUrl(media.video_url);
      }
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
            _scope.channelsUpload = JSON.parse(JSON.stringify(_scope.channels));

            (_scope.channels || []).unshift({
              ds_name: 'Tutti i canali',
              _id: ''
            });

            if(!AdminService.user.isRedazione()){
              _scope.channelUploadSelected = ChannelService.byId(AdminService.user.channelId());
              _scope.channelViewSelected = ChannelService.byId(AdminService.user.channelId());
              _scope.channels = [_scope.channelSelected];
              _scope.channelsUpload = [_scope.channelUploadSelected];
            }else{
              _scope.channelUploadSelected = _scope.channelsUpload[0];
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