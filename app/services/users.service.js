(function (angular) {
  "use strict";

  var services = angular.module('Smart.services');

  UsersService.$inject = ['Restangular', 'ChannelModel', 'AdminService', '$q', 'API', 'toastr', 'UtilService'];
  services.service('UsersService', UsersService);

  /**
   * Product manager
   * @param Restangular
   * @param ChannelModel Model
   * @param AdminService Model
   * @param $q
   * @param API
   * @param toastr
   * @param UtilService
   */
  function UsersService(Restangular, ChannelModel, AdminService, $q, API, toastr, UtilService) {

    var utilitaList = [];
    var _that = this;
    _that.isWorking = false;

    _that._selected = {};

    //////////////////////////////////
    /////////// PROTOTYPES ///////////
    //////////////////////////////////

    _that.get  = _get;
    _that.byId  = _byId;
    _that.working = function(){ return _that.isWorking; };

    /////// CRUD /////////
    _that.update = _updateUtilita;

    //////////////////////////////////
    /////////// FUNCTIONS ////////////
    //////////////////////////////////


    /**
     * Get Method
     * @private
     */
    function _get(options){
      var defer = $q.defer();
      var _this = this;

      _this.isWorking = true;

      var filters = {};

      utilitaList = [];

      filters.id_city = AdminService.user.citySelected()._id;

      if(options){
        if('is_blocked' in options){
          filters['is_blocked'] = options.is_blocked;
        }
      }

      Restangular
        .one(API.iscritti.get({}, filters))
        .getList()
        .then(function(data){

          _this.isWorking = false;

          angular.copy(data, utilitaList);

          defer.resolve(utilitaList || []);

        }, function(error){

          _this.isWorking = false;
          defer.reject(error);

        });

      return defer.promise;
    }

    /**
     * Get by id
     * @param _id
     * @return {*}
     * @private
     */
    function _byId(_id){
      return _.find(utilitaList, {_id: _id});
    }


    /**
     * Update channel
     * @param _id
     * @param channel to update
     * @return {Promise}
     * @private
     */
    function _updateUtilita(_id, uti){


      var _this = this;
      var defer = $q.defer();

      var toCreate = {
        is_blocked: uti.is_blocked
      };


      _this.isWorking = true;

      Restangular
        .one(API.iscritti.update({id: _id}))
        .customPUT(toCreate)
        .then(function(success){
          // get new channels
          toastr.success('L\'utente è stata aggiorato');
          _this.get()
            .then(
              function(){
                _this.isWorking = false;
                defer.resolve();
              },
              function(){
                _this.isWorking = false;
                defer.resolve();
              }
            );
        }, function(error){
          toastr.error('Ops! Qualcosa è andato storto.', 'Aggiornata utente', {closeButton: true});
          _this.isWorking = false;
          console.error(error);
          defer.reject(error);
        });

      return defer.promise;
    }

    /** return service **/
    return this;

  }

})(window.angular);