(function(angular){
  "use strict";

  var controllers = angular.module('Smart.controllers');

  SegnalazioniController.$inject = ['$state', 'SegnalazioniService', 'AdminService'];
  controllers.controller('SegnalazioniController', SegnalazioniController);

  function SegnalazioniController($state, SegnalazioniService, AdminService){

    var _this = this;
    _this.user = AdminService.user;
    _this.city = AdminService.user.citySelected();
    _this.current_state = $state.current;
    _this.categories = ['Tutte le categorie', 'Lettera aperta', 'Incidente stradale', 'Foto e curiosità', 'Disservizi', 'Evento', 'Altro'];
    _this.categorySelected = _this.categories[0];
    _this.adminService = AdminService;

    _this.alerts = [];

    _this.options = {
      pager:{
        isopen: false,
        active: 1,
        count: 1,
        limit: 5
      }
    };

    _this.changePage = _changePage;
    _this.generatePages = _generatePages;

    _getUtilita();

    function _getUtilita(){

      SegnalazioniService
        .get()
        .then(
          function(results){

            _this.alerts = results;
            _this.options.pager.count = Math.ceil(_this.alerts.length / _this.options.pager.limit);

          },
          function(){
            console.error("ERROR GETTING CHANNELS");
          }
        );
    }

    function _changePage(pnum){
      _this.options.pager.active = pnum;
    }

    function _generatePages(){
      return _.range(1,_this.options.pager.count+1);
    }

  }

})(window.angular);