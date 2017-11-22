(function(angular){
  "use strict";

  var controllers = angular.module('Smart.controllers');

  EdizioniController.$inject = ['$state', 'EventBus', 'AdminService', 'EdizioniService'];
  controllers.controller('EdizioniController', EdizioniController);

  function EdizioniController($state, EventBus, AdminService, EdizioniService){

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
  }

})(window.angular);