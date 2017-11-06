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

    _getEditions();

    function _getEditions(){

      EdizioniService
        .get()
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

    function _changePage(pnum){
      _this.options.pager.active = pnum;
    }

    function _generatePages(){
      return _.range(1,_this.options.pager.count+1);
    }

  }

})(window.angular);