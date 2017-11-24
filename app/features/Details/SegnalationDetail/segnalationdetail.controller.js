(function(angular){
  "use strict";

  var controllers = angular.module('Smart.controllers');

  SegnalationDetailController.$inject = ['$state', 'AdminService', 'UtilService'];
  controllers.controller('SegnalationDetailController', SegnalationDetailController);

  function SegnalationDetailController($state, AdminService, UtilService){

    var _this = this;
    _this.user = AdminService.user;
    _this.city = AdminService.user.citySelected();
    _this.current_state = $state.current;
    _this.current = {};

    _this.categories = [
      {label: 'Tutte le categorie', value: ''},
      {label: 'Lettera aperta', value: 'Lettera aperta'},
      {label: 'Incidente stradale', value: 'Incidente stradale'},
      {label: 'Foto e curiosità', value: 'Foto e curiosità'},
      {label: 'Disservizi', value: 'Disservizi'},
      {label: 'Evento', value: 'Evento'},
      {label: 'Altro', value: 'Altro'}
    ];

    // fixme : get to segnalazioni service list of repos
    _this.reports = [
      {
        _id: "2",
        ds_name: "Gianluca",
        ds_surname:"Tursi",
        ds_category: "Incidente stradale",
        ds_place: "Incidente Via Savigliano",
        ds_description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.",
        id_image: "5a0ec19e33a95b7428ac93dd",
        is_handled: false,
        dt_createdAt: new Date()
      }
    ];

    _this.categorySelected = _this.categories[0];
    _this.adminService = AdminService;

    _this.getMediaUrl = _getMediaUrl;

    if($state.current == $state.ROUTING.segnalationdetail){
      _initStatics(_.find(_this.reports, {_id: $state.params.id}));
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
        dt_createdAt: toEdit.dt_createdAt
      };
    }

  }

})(window.angular);