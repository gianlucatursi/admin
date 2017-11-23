(function(angular){
  "use strict";

  var controllers = angular.module('Smart.controllers');

  IscrittiController.$inject = ['$state', 'UsersService', 'AdminService'];
  controllers.controller('IscrittiController', IscrittiController);

  function IscrittiController($state, UsersService, AdminService){

    var _this = this;
    _this.user = AdminService.user;
    _this.city = AdminService.user.citySelected();
    _this.current_state = $state.current;
    _this.adminService = AdminService;

    _this.users = [];

    _this.filterOptions = {
      status: 'Tutti',
      textToSearch: '',
      dateSelected: null
    };

    _this.options = {
      laddaApply: false,
      laddaSearch: false,
      laddaLockUnlock:false,
      pager:{
        isopen: false,
        active: 1,
        count: 1,
        limit: 5
      }
    };

    _this.changePage = _changePage;
    _this.generatePages = _generatePages;
    _this.sblocca = _sblocca;
    _this.blocca = _blocca;
    _this.applyFilters = _applyFilters;

    _getUtilita();

    function _getUtilita(_filters){

      _this.options.laddaLockUnlock = false;
      _this.options.laddaApply = true;

      UsersService
        .get(_filters)
        .then(
          function(results){
            _this.options.laddaApply = false;
            _this.users = results;
            _this.options.pager.count = Math.ceil(_this.users.length / _this.options.pager.limit);

          },
          function(){
            _this.options.laddaApply = false;
            console.error("ERROR GETTING CHANNELS");
          }
        );
    }

    function _applyFilters(){
      //article
      var filter = {};
      if(_this.filterOptions.status != ''){

        switch (_this.filterOptions.status){
          case 'Tutti':
            break;
          case 'Attivo':
            filter['is_blocked'] = false;
            break;
          case 'Bloccato':
            filter['is_blocked'] = true;
            break;
        }
      }

      if(_.isDate(_this.filterOptions.dateSelected)){
        filter['dt_creationDate'] = _this.filterOptions.dateSelected;
        filter.dt_creationDate.setHours(0, 0, 1, 0);
      }

      _this.users = [];

      _getUtilita(filter);

    }

    function _sblocca(_id){
      _this.options.laddaLockUnlock = true;
      UsersService
        .update(_id, {is_blocked: false})
        .then(_getUtilita,
          function(){
            _this.options.laddaLockUnlock = false;
            console.error("ERROR GETTING CHANNELS");
          }
        );
    }

    function _blocca(_id){
      _this.options.laddaLockUnlock = true;
      UsersService
        .update(_id, {is_blocked: true})
        .then(_getUtilita,
          function(){
            _this.options.laddaLockUnlock = false;
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