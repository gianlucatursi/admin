(function(angular){
  "use strict";

  var controllers = angular.module('Smart.controllers');

  SegnalazioniController.$inject = ['$state', 'SegnalazioniService', 'AdminService', 'UtilService'];
  controllers.controller('SegnalazioniController', SegnalazioniController);

  function SegnalazioniController($state, SegnalazioniService, AdminService, UtilService){

    var _this = this;
    _this.user = AdminService.user;
    _this.city = AdminService.user.citySelected();
    _this.current_state = $state.current;
    _this.categories = [
      {label: 'Tutte le categorie', value: ''},
      {label: 'Lettera aperta', value: 'Lettera aperta'},
      {label: 'Incidente stradale', value: 'Incidente stradale'},
      {label: 'Foto e curiosità', value: 'Foto e curiosità'},
      {label: 'Disservizi', value: 'Disservizi'},
      {label: 'Evento', value: 'Evento'},
      {label: 'Altro', value: 'Altro'}
    ];
    _this.categorySelected = _this.categories[0];
    _this.adminService = AdminService;

    _getReports();

    _this.reports = [];

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
    _this.getMediaUrl = _getMediaUrl;
    _this.showDetail = _showDetail;

    function _getReports(){

      SegnalazioniService
        .get()
        .then(
          function(results){

            _this.reports = results;
            _this.options.pager.count = Math.ceil(_this.alerts.length / _this.options.pager.limit);

          },
          function(){
            console.error("ERROR GETTING CHANNELS");
          }
        );
    }


    function _getMediaUrl(_id){
      return UtilService.imageUrl(_id, 's');
    }

    function _changePage(pnum){
      _this.options.pager.active = pnum;
    }

    function _generatePages(){
      return _.range(1,_this.options.pager.count+1);
    }

    function _showDetail(repo){

      $state.go($state.ROUTING.segnalationdetail.name, {id: repo._id});

    }

  }

})(window.angular);