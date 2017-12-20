(function(angular){
  "use strict";

  var controllers = angular.module('Smart.controllers');

  SegnalationDetailController.$inject = ['$scope', '$state', 'AdminService', 'UtilService', 'SegnalazioniService'];
  controllers.controller('SegnalationDetailController', SegnalationDetailController);

  function SegnalationDetailController($scope, $state, AdminService, UtilService, SegnalazioniService){

    var _this = this;
    _this.user = AdminService.user;
    _this.city = AdminService.user.citySelected();
    _this.current_state = $state.current;
    _this.current = {};
    _this.scope = $scope;

    _this.categories = [
      {label: 'Tutte le categorie', value: ''},
      {label: 'Lettera aperta', value: 'Lettera aperta'},
      {label: 'Incidente stradale', value: 'Incidente stradale'},
      {label: 'Foto e curiosità', value: 'Foto e curiosità'},
      {label: 'Disservizi', value: 'Disservizi'},
      {label: 'Evento', value: 'Evento'},
      {label: 'Altro', value: 'Altro'}
    ];

    _this.current = {};

    // fixme : get to segnalazioni service list of repos
    _this.reports = [];

    _this.categorySelected = _this.categories[0];
    _this.adminService = AdminService;

    _this.getMediaUrl = _getMediaUrl;
    _getReports();

    function _getReports(){

      SegnalazioniService
        .get()
        .then(
          function(results){

            _this.reports = results;
            //_this.options.pager.count = Math.ceil(_this.alerts.length / _this.options.pager.limit);

            if($state.current == $state.ROUTING.segnalationdetail){
              _initStatics(_.find(_this.reports, {_id: $state.params.id}));
            }

          },
          function(){
            console.error("ERROR GETTING CHANNELS");
          }
        );
    }

    function _getMediaUrl(_id){
      return UtilService.imageUrl(_id, 's');
    }

    function _initStatics(toEdit){
      _this.current = {
        _id: toEdit._id,
        ds_name: toEdit.ds_name,
        ds_surname: toEdit.ds_surname,
        ds_category: toEdit.ds_category,
        ds_place: toEdit.ds_place,
        ds_description: toEdit.ds_description,
        id_image: toEdit.id_image,
        is_handled: toEdit.is_handled,
        dt_createdAt: toEdit.timeInfo.dt_creationDate
      };

      _this.scope.$apply();
    }

  }

})(window.angular);