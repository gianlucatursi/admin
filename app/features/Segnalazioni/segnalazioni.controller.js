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

    /*
    _getUtilita();

    function _getUtilita(){

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
*/

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