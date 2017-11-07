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
    _this.new_channel = {
      authors: []
    };

    _this.addAuthor = _addAuthor;

    /**
     * Add author
     * @param a
     * @private
     */
    function _addAuthor(a){
      _this.new_channel.authors.push(a);
      _this.aToAdd = '';
    }

  }

})(window.angular);