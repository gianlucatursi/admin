(function(angular){
  "use strict";

  var controllers = angular.module('Smart.controllers');

  NewUtilityController.$inject = ['$state', 'AdminService', 'UtilitaService', 'toastr'];
  controllers.controller('NewUtilityController', NewUtilityController);

  function NewUtilityController($state, AdminService, UtilitaService, toastr){

    var _this = this;
    _this.user = AdminService.user;
    _this.city = AdminService.user.citySelected();
    _this.current_state = $state.current;
    _this.aToAdd = '';
    _this.hours_m = [];
    _this.hours_a = [];
    _this.categories = [];
    _this.new_util = {};
    _this.options = {
      saveWorking: UtilitaService.working,
      deleteWorking: UtilitaService.working,
      pswType: 'password'
    };

    if($state.current == $state.ROUTING.utilita_detail){
      _initStatics(UtilitaService.byId($state.params.id));
    }else{
      // new channel
      _initStatics();
    }

    _this.save = _save;
    _this.delete = _delete;
    _this.changePSWType = _changePSWType;

      /**
     * Save channel
     * @private
     */
    function _save(){

      if(UtilitaService.validate(_this.new_util, _this.new_util.isNew)){
        //valid
        if(_this.new_util.isNew){
          //create
          UtilitaService
            .create(_this.new_util)
            .then(function(){
              $state.go($state.ROUTING.utilita.name);
            }, function(){});
        }else{
          //update
          UtilitaService
            .update(_this.new_util._id, _this.new_util)
            .then(function(){
              $state.go($state.ROUTING.utilita.name);
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

      UtilitaService
        .delete(_this.new_util._id)
        .then(function(){
          $state.go($state.ROUTING.utilita.name);
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
        'Farmacia',
        'Ufficio pubblico'
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
      _this.new_util = {
        isNew : true,
        name: '',
        phone : '',
        category: '',
        website: '',
        email: '',
        address: '',
        di_turno: false,
        orari_specifici: false,
        days: _defaultDays()
      };
    }

    /**
     * init edit channel
     * @param channelToEdit
     * @private
     */
    function _initEditChannel(channelToEdit){

      var opening_hours = channelToEdit.opening_hours;
      var orari_specifici =  false;
      if(opening_hours && opening_hours.length > 0) {
        orari_specifici = true;
      }

      _this.new_util = {
        _id: channelToEdit._id,
        isNew : false,
        name: channelToEdit.ds_name,
        phone : channelToEdit.ds_phone,
        category: channelToEdit.ds_category,
        website: channelToEdit.ds_website,
        email: channelToEdit.ds_email,
        address: channelToEdit.ds_address,
        di_turno: channelToEdit.di_turno,
        orari_specifici: orari_specifici,
        days: channelToEdit.opening_hours || _defaultDays()
      };
    }

    function _defaultDays(){
      return [ {
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
      ];
    }
  }

})(window.angular);