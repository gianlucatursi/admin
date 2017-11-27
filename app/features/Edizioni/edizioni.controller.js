(function(angular){
  "use strict";

  var controllers = angular.module('Smart.controllers');

  EdizioniController.$inject = ['$state', 'UtilService', 'AdminService', 'EdizioniService', 'toastr'];
  controllers.controller('EdizioniController', EdizioniController);

  function EdizioniController($state, UtilService, AdminService, EdizioniService, toastr){

    var _this = this;
    _this.user = AdminService.user;
    _this.city = AdminService.user.citySelected();
    _this.current_state = $state.current;
    _this.edizioni = [];
    _this.dateSelected = null;
    _this.adminService = AdminService;

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
    _this.dateChanged = _dateChanged;
    _this.createNew = _createNew;

    _getEditions();

    /**
     * Get editions
     * @private
     */
    function _getEditions(timestamp){

      _this.edizioni = [];

      EdizioniService
        .getByDay(timestamp)
        .then(
          function(results){

            _this.edizioni = EdizioniService.toArray();
            _this.options.pager.count = Math.ceil(_this.edizioni.length / _this.options.pager.limit);

          },
          function(err){
            console.error("ERROR GETTING EDIZIONI");
          }
        );
    }

    /**
     * Change page
     * @param pnum
     * @private
     */
    function _changePage(pnum){
      _this.options.pager.active = pnum;
    }

    /**
     * Generate pages
     * @return {*}
     * @private
     */
    function _generatePages(){
      return _.range(1,_this.options.pager.count+1);
    }

    /**
     * Called when date is changed
     * @private
     */
    function _dateChanged(){

      if(_.isDate(_this.dateSelected)){
        _this.dateSelected.setHours(2, 0, 1, 0);
        _getEditions(_this.dateSelected.getTime());
      }
    }

    /**
     * Create new
     * @private
     */
    function _createNew(){

      if(_.isDate(_this.dateSelected)){
        _this.dateSelected.setHours(2, 0, 1, 0);
        //_getEditions(_this.dateSelected.getTime());
        UtilService.options.newEditionDate = _this.dateSelected;
        $state.go($state.ROUTING.nuova_edizione.name);
      }else{
        toastr.error('Devi selezionare una data per poter creare un\'edizione');
      }

    }

  }

})(window.angular);