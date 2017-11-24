(function(angular){
  "use strict";

  var controllers = angular.module('Smart.controllers');

  NewChannelController.$inject = ['$state', 'AdminService', 'ChannelService', '$uibModal', 'MediaService', '$sce', 'UtilService'];
  controllers.controller('NewChannelController', NewChannelController);

  function NewChannelController($state, AdminService, ChannelService, $uibModal, MediaService, $sce, UtilService){

    var _this = this;
    _this.user = AdminService.user;
    _this.city = AdminService.user.citySelected();
    _this.current_state = $state.current;
    _this.aToAdd = '';
    _this.hours_m = [];
    _this.hours_a = [];
    _this.categories = [];
    _this.new_channel = {};
    _this.imagesOptions = {
      icon: null
    };

    _this.options = {
      saveWorking: ChannelService.working,
      deleteWorking: ChannelService.working,
      pswType: 'password'
    };

    var _mediaModalInstance;

    if($state.current == $state.ROUTING.detailchannel){
      _initStatics(ChannelService.byId($state.params.id));
    }else{
      // new channel
      _initStatics();
    }

    _this.addAuthor = _addAuthor;
    _this.save = _save;
    _this.delete = _delete;
    _this.unlock = _unlock;
    _this.lock = _lock;
    _this.changePSWType = _changePSWType;
    _this.openChannelImage = _openChannelImage;
    _this.getMediaUrl = _getMediaUrl;
    _this.deleteIcon = _deleteIcon;

    /**
     * Add author
     * @param a
     * @private
     */
    function _addAuthor(a){
      if(a == '') return;

      _this.new_channel.authors.push(a);
      _this.aToAdd = '';
    }

    /**
     * Save channel
     * @private
     */
    function _save(){

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
    }

    /**
     * Delete channel
     * @private
     */
    function _delete(){

      ChannelService
        .delete(_this.new_channel._id)
        .then(function(){
          $state.go($state.ROUTING.canali.name);
        }, function(){});

    }

    /**
     * Unlock channel
     * @private
     */
    function _unlock(){
      ChannelService
        .unlock(_this.new_channel)
        .then(function(){
          $state.go($state.ROUTING.canali.name);
        }, function(){});
    }

    /**
     * Lock channel
     * @private
     */
    function _lock(){
      ChannelService
        .lock(_this.new_channel)
        .then(function(){
          $state.go($state.ROUTING.canali.name);
        }, function(){});
    }

    /**
     * Change input type
     * @private
     */
    function _changePSWType(){
      _this.options.pswType = _this.options.pswType == 'password' ? 'text' : 'password';
    }

    /**
     * Init statics
     * @private
     */
    function _initStatics(toEdit){

      /** MORNING **/
      _this.hours_m = [
        "04:30",
        "05:00",
        "05:30",
        "06:00",
        "06:30",
        "07:00",
        "07:30",
        "08:00",
        "08:30",
        "09:00",
        "09:30",
        "10:00",
        "10:30",
        "11:00",
        "11:30",
        "12:00",
        "12:30",
        "13:00",
        "13:30",
        "14:00",
        "14:30",
      ];

      /** AFTERNOON **/
      _this.hours_a = [
        "15:00",
        "15:30",
        "16:00",
        "16:30",
        "17:00",
        "17:30",
        "18:00",
        "18:30",
        "19:00",
        "19:30",
        "20:00",
        "20:30",
        "21:00",
        "21:30",
        "22:00",
        "22:30",
        "23:00",
        "23:30",
        "00:00",
        "00:30",
        "01:00",
        "01:30",
        "02:00",
        "02:30",
        "03:00",
        "03:30",
        "04:00",
      ];

      _this.categories = [
        'Commerciale - Locale',
        'Istruzione comunale',
        'Associzione sportiva',
        'Associazione privata'
      ];

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
      _this.new_channel = {
        isNew : true,
        isLocked: false,
        name: '',
        authors: [],
        phone : '',
        category: '',
        website: '',
        email: '',
        username: '',
        password: '',
        address: '',
        isInserzionista: false,
        orari_specifici: false,
        days: [ {
          label: 'Lunedì',
          open: false,
          morning:{
            start: '',
            end: ''
          },
          afternoon:{
            start: '',
            end: ''
          }
        }, {
          open: false,
          label: 'Martedì',
          morning:{
            start: '',
            end: ''
          },
          afternoon:{
            start: '',
            end: ''
          }
        },
          {
            open: false,
            label: 'Mercoledì',
            morning:{
              start: '',
              end: ''
            },
            afternoon:{
              start: '',
              end: ''
            }
          },
          {
            open: false,
            label: 'Giovedì',
            morning:{
              start: '',
              end: ''
            },
            afternoon:{
              start: '',
              end: ''
            }
          },
          {
            open: false,
            label: 'Venerdì',
            morning:{
              start: '',
              end: ''
            },
            afternoon:{
              start: '',
              end: ''
            }
          },
          {
            open: false,
            label: 'Sabato',
            morning:{
              start: '',
              end: ''
            },
            afternoon:{
              start: '',
              end: ''
            }
          },
          {
            open: false,
            label: 'Domenica',
            morning:{
              start: '',
              end: ''
            },
            afternoon:{
              start: '',
              end: ''
            }
          }
        ]
      };
    }

    /**
     * init edit channel
     * @param channelToEdit
     * @private
     */
    function _initEditChannel(channelToEdit){

      var opening_hours = channelToEdit.openingHours();
      var orari_specifici =  false;
      if(opening_hours && opening_hours.length > 0) {
        orari_specifici = true;
      }

      _this.new_channel = {
        _id: channelToEdit.id(),
        isNew : false,
        isLocked: channelToEdit.isLocked(),
        name: channelToEdit.name(),
        authors: channelToEdit.authorList(),
        phone : channelToEdit.phonenumber(),
        category: channelToEdit.category(),
        website: channelToEdit.website(),
        email: channelToEdit.email(),
        username: channelToEdit.username(),
        password: channelToEdit.password(),
        address: channelToEdit.address(),
        isInserzionista: channelToEdit.isAdvertiser(),
        orari_specifici: orari_specifici,
        days: channelToEdit.openingHours()
      };
    }

    function _openChannelImage(){

      MediaService._modalOptions.isGallery = true;
      MediaService._modalOptions.isMediaView = false;

      _mediaModalInstance = $uibModal.open({
        animation: true,
        component: 'mediaModal',
        size: 'lg'
      });

      _mediaModalInstance.result.then(function (selectedItem) {
        //_this.selected = selectedItem;
        _this.imagesOptions.icon = selectedItem;
      }, function () {
        console.log('modal-component dismissed at: ' + new Date());
      });
    }

    function _getMediaUrl(media, s){
      if(media.type == 'IMAGE'){
        return UtilService.imageUrl(media.id_image, s);
      }else{
        return $sce.trustAsResourceUrl(media.video_url);
      }
    }

    function _deleteIcon(){
      _this.imagesOptions.cover = null;
    }


  }

})(window.angular);