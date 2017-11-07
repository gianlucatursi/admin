(function(angular){
  "use strict";

  var controllers = angular.module('Smart.controllers');

  NewChannelController.$inject = ['$state', 'EventBus', 'AdminService'];
  controllers.controller('NewChannelController', NewChannelController);

  function NewChannelController($state, EventBus, AdminService){

    var _this = this;
    _this.user = AdminService.user;
    _this.city = AdminService.user.citySelected();
    _this.current_state = $state.current;
    _this.aToAdd = '';
    _this.hours = [];
    _this.new_channel = {
      authors: [],
      phone : '',
      website: '',
      email: '',
      address: '',
      isInserzionista: false,
      orari_specifici: false,
      days: [ {
          label: 'Lunedì',
          flag: false
        }, {
          flag: false,
          label: 'Martedì',
        },
        {
          flag: false,
          label: 'Mercoledì',
        },
        {
          flag: false,
          label: 'Giovedì',
        },
        {
          flag: false,
          label: 'Venerdì',
        },
        {
          flag: false,
          label: 'Sabato',
        },
        {
          flag: false,
          label: 'Domenica',
        }
      ]
    };

    _initStatics();

    _this.addAuthor = _addAuthor;

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

    function _initStatics(){
      _this.hours = [
        "00:00",
        "00:30",
        "01:00",
        "01:30",
        "02:00",
        "02:30",
        "03:00",
        "03:30",
        "04:00",
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
        "23:30"
      ]
    }
  }

})(window.angular);