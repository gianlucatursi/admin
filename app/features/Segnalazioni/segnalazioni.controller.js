(function(angular){
  "use strict";

  var controllers = angular.module('Smart.controllers');

  SegnalazioniController.$inject = ['$state', 'EventBus', 'AdminService'];
  controllers.controller('SegnalazioniController', SegnalazioniController);

  function SegnalazioniController($state, EventBus, AdminService){

    var _this = this;
    _this.user = AdminService.user;
    _this.city = AdminService.user.citySelected();
    _this.current_state = $state.current;
    _this.categories = ['Tutte le categorie', 'Lettera aperta', 'Incidente stradale', 'Foto e curiosità', 'Disservizi', 'Evento', 'Altro'];
    _this.categorySelected = _this.categories[0];
  }

})(window.angular);