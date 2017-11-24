(function(angular){
  "use strict";

  var controllers = angular.module('Smart.controllers');

  NewEditionController.$inject = ['$state', 'AdminService', 'ChannelService', 'CategoryService', 'MediaService', '$sce', 'UtilService'];
  controllers.controller('NewEditionController', NewEditionController);

  function NewEditionController($state, AdminService, ChannelService, CategoryService, MediaService, $sce, UtilService){

    var _this = this;
    _this.user = AdminService.user;
    _this.city = AdminService.user.citySelected();
    _this.current_state = $state.current;
    _this.aToAdd = '';
    _this.categories = [];
    _this.channelSelected = {};
    _this.categorySelected = {};
    _this.categoryToBe = {};

    _this.current = {};

    _this.options = {
      saveWorking: ChannelService.working,
      deleteWorking: ChannelService.working,
    };

    _initializeCollections();

    if($state.current == $state.ROUTING.detailchannel){
      _initStatics(ChannelService.byId($state.params.id));
    }else{
      // new channel
      _initStatics();
    }

    _this.save = _save;
    _this.delete = _delete;
    _this.getMediaUrl = _getMediaUrl;

    _getChannels();
    /**
     * Save channel
     * @private
     */
    function _save(){

      /*
      if(_this.imagesOptions.icon){
        if(_this.imagesOptions.icon.type == 'IMAGE'){
          _this.new_channel.id_icon = _this.imagesOptions.icon.id_image;
        }
      }

      if(ChannelService.validate(_this.new_channel, _this.new_channel.isNew)){
        //valid
        if(_this.new_channel.isNew){
          //create
          ChannelService
            .create(_this.new_channel)
            .then(function(){
              $state.go($state.ROUTING.canali.name);
            }, function(){});
        }else{
          //update
          ChannelService
            .update(_this.new_channel._id, _this.new_channel)
            .then(function(){
              $state.go($state.ROUTING.canali.name);
            }, function(){});
        }

      }else{
        //not valid
      }
      */
    }

    /**
     * Delete channel
     * @private
     */
    function _delete(){

      ChannelService
        .delete(_this.current._id)
        .then(function(){
          $state.go($state.ROUTING.canali.name);
        }, function(){});

    }

    /**
     * Init statics
     * @private
     */
    function _initStatics(toEdit){

      _this.periodi = ['Ultimo giorno', 'Ultimo 3 giorni', 'Ultima settimana', 'Ultimo mese'];

      if(toEdit){
        _initEditChannel(toEdit);
      }else{
        _initNewChannel();
      }
    }

    /**
     * Init new channel
     * @private
     */
    function _initNewChannel(){
      _this.current = {
        isNew: true
      };
    }

    /**
     * init edit channel
     * @param channelToEdit
     * @private
     */
    function _initEditChannel(channelToEdit){


      _this.current = {
        isNew: false
      };

    }

    function _getMediaUrl(media, s){
      if(media.type == 'IMAGE'){
        return UtilService.imageUrl(media.id_image, s);
      }else{
        return $sce.trustAsResourceUrl(media.video_url);
      }
    }

    function _deleteIcon(){
      _this.imagesOptions.icon = null;
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
            (_this.channels || []).unshift({
              ds_name: 'Tutti i canali',
              _id: ''
            });

            if(!AdminService.user.isRedazione()){
              _this.channelSelected = ChannelService.byId(AdminService.user.channelId());
              _this.channels = [_this.channelSelected];
            }else{
              _this.channelSelected = _this.channels[0];
            }
          },
          function(){
            console.error("ERROR GETTING CHANNELS");
          }
        );
    }

    function _initializeCollections(){

      CategoryService
        .get()
        .then(
          function(results){
            _this.categories = results;
            if(_this.categories.length > 0){
              _this.categorySelected = _this.categories[0];
            }
          },
          function(){
            console.error("ERROR GETTING CHANNELS");
          }
        );

      _getChannels();

      /*
      if(AdminService.user.isRedazione()){
        _getArticles();
      }else{
        _getArticles({id_channel: AdminService.user.channelId()});
      }
      */

    }


  }

})(window.angular);