(function(angular){
  "use strict";

  var controllers = angular.module('Smart.controllers');

  MediaController.$inject = ['$scope', '$state', 'EventBus', 'AdminService', 'ChannelService', 'toastr', 'MediaService', 'UtilService', '$sce', '$uibModal'];
  controllers.controller('MediaController', MediaController);

  function MediaController($scope, $state, EventBus, AdminService, ChannelService, toastr, MediaService, UtilService, $sce, $uibModal){

    var _this = this;
    _this.user = AdminService.user;
    _this.city = AdminService.user.citySelected();
    _this.current_state = $state.current;
    _this.medias = MediaService.toArray();
    _this.adminService = AdminService;

    _this.channelsUpload = [];
    _this.channels = [];
    _this.options = {
      laddaVideo: false,
      laddaImages: false,
      pager:{
        isopen: false,
        active: 1,
        count: 1,
        limit: 20
      }
    };

    _getMedia();

    _this.isGallery = MediaService._modalOptions.isGallery;
    //alert(MediaService._modalOptions.isGallery);

    _this.channelService = ChannelService;
    _this.channelUploadSelected = {};
    _this.channelViewSelected = {};
    _this.dateSelected = null;
    _this.textToSearch = '';

    _this.mediaTypes = ['Immagini e Video', 'Immagini', 'Video'];
    _this.mediaTypeSelected = _this.mediaTypes[0];

    _this.applyFilters = _applyFilters;
    _this.$onInit = _onInit;
    _this.getMediaUrl = _getMediaUrl;

    _this.generatePages = _generatePages;
    _this.changePage = _changePage;

    _this.fileSelect = _fileSelect;
    _this.videoSelect = _videoSelect;
    _this.selectImage = _selectImage;
    _this.selectVideo = _selectVideo;

    _getChannels();

    function _onInit() {
      console.log("[init media modal]");
    }

    function _applyFilters(){
      //article
      var filter = {};
      if(_this.channelViewSelected._id != ''){
        filter.id_channel = _this.channelViewSelected._id;
      }
      if(_this.mediaTypeSelected != ''){
        if(_this.mediaTypeSelected == _this.mediaTypes[1]){
          filter.type = 'IMAGE';
        }else if(_this.mediaTypeSelected == _this.mediaTypes[2]){
          filter.type = 'VIDEO';
        }
      }

      if(_.isDate(_this.dateSelected)){
        filter.dt_insert = _this.dateSelected;
        filter.dt_insert.setHours(0, 0, 1, 0);
      }
      _this.medias = [];

      _getMedia(filter);
    }

    /**
     * Upload images
     * @param files
     * @private
     */
    function _fileSelect(files) {

      var photofile = files[0];
      var reader = new FileReader();
      _this.options.laddaImages = true;
      reader.onload = function(e) {
        // handle onload
        MediaService
          .uploadImage(e.target.result, _this.channelUploadSelected._id)
          .then(function(){
            _this.options.laddaImages = false;
            toastr.success('Caricamento completato', 'Upload Media');
            _this.medias = MediaService.toArray();
          }, function(){
            _this.options.laddaImages = false;
            toastr.error('Ops! Qualcosa è andato storto. Si prega di riprovare più tardi', 'Upload Video')
          });
      };
      reader.readAsDataURL(photofile);

    }

    function _generatePages(){
      return _.range(1,_this.options.pager.count+1);
    }

    /**
     * Upload video
     * @param video
     * @private
     */
    function _videoSelect(video) {

      var file = video;

      _this.options.laddaVideo = true;

      var uploader = new VimeoUpload({

        name: _this.channelUploadSelected.ds_name  + " " + (new Date()).toISOString(),
        description: 'vimeo description',
        file: file,
        private: true,
        token: '034ea8145a609e99ee0d9f01e8ab4b73',
        onError: function(data) {
          //showMessage('<strong>Error</strong>: ' + JSON.parse(data).error, 'danger')
          toastr.error('Ops! Qualcosa è andato storto. Si prega di riprovare più tardi', 'Upload Video')
        },
        onProgress: function(data) {
          _this.options.laddaVideo = (data.loaded / data.total);
          _this.$apply();
        },
        onComplete: function(videoId, index) {
          var url = 'https://vimeo.com/' + videoId;

          MediaService.createMedia({
            type: 'VIDEO',
            id_channel: _this.channelUploadSelected._id,
            "ds_tags" : '',
            "ds_description" : '',
            "video_url" : url
          }).then(
            function(){
              toastr.success('Caricamento completato', 'Upload Video');
              _this.options.laddaVideo = false;
            }, function(){
              toastr.error('Ops! Qualcosa è andato storto. Si prega di riprovare più tardi', 'Upload Video')
              _this.options.laddaVideo = false;
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
      MediaService._modalOptions.isMediaView = true;
      MediaService._modalOptions.isGallery = false;

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
      MediaService._modalOptions.isMediaView = true;
      MediaService._modalOptions.isGallery = false;

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
        return UtilService.imageUrl(media.id_image, 'm');
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

            _this.channels = ChannelService.toArray();
            _this.channelsUpload = JSON.parse(JSON.stringify(_this.channels));

            (_this.channels || []).unshift({
              ds_name: 'Tutti i canali',
              _id: ''
            });

            if(!AdminService.user.isRedazione()){
              _this.channelUploadSelected = ChannelService.byId(AdminService.user.channelId());
              _this.channelViewSelected = ChannelService.byId(AdminService.user.channelId());
              _this.channels = [_this.channelSelected];
              _this.channelsUpload = [_this.channelUploadSelected];
            }else{
              _this.channelUploadSelected = _this.channelsUpload[0];
              _this.channelViewSelected = _this.channels[0];
            }
          },
          function(){
            console.error("ERROR GETTING CHANNELS");
          }
        );
    }

    function _getMedia(filters){

      MediaService
        .get(filters || {})
        .then(
          function(results){
            _this.medias = MediaService.toArray();
            _this.options.pager.count = Math.ceil(_this.medias.length / _this.options.pager.limit);
            $scope.$apply();
          },
          function(){
            console.error("ERROR GETTING ARTICLES");
          }
        );

    }

    function _changePage(pnum){
      _this.options.pager.active = pnum;
    }

  }

})(window.angular);