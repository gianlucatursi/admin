(function (angular) {
  "use strict";

  var services = angular.module('Smart.services');

  SegnalazioniService.$inject = ['Restangular', 'ChannelModel', 'AdminService', '$q', 'API', 'toastr', 'UtilService'];
  services.service('SegnalazioniService', SegnalazioniService);

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
  function SegnalazioniService(Restangular, ChannelModel, AdminService, $q, API, toastr, UtilService) {

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
    _that.create = _createUtilita;
    _that.update = _updateUtilita;

    //////////////////////////////////
    /////////// FUNCTIONS ////////////
    //////////////////////////////////


    /**
     * Get Method
     * @private
     */
    function _get(){
      var defer = $q.defer();
      var _this = this;

      _this.isWorking = true;

      var filters = {};

      utilitaList = [];

      filters.id_city = AdminService.user.citySelected()._id;

      Restangular
        .one(API.segnalazioni.get({}, filters))
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
     * Create Channel
     * @param channel
     */
    function _createUtilita(channel){

      var _this = this;
      var defer = $q.defer();

      var toCreate = {
        /*
        "ds_name": channel.name,
        "cd_username": channel.username,
        "pw_password": password,
        "ds_address": channel.address || '',
        "id_city": AdminService.user.cityId(),
        "ds_phone": channel.phone || '',
        "ds_email": channel.email || '',
        "ds_website": channel.website || '',
        "id_icon": channel.icon || '',
        "dt_activation": new Date(),
        "ds_category": channel.category || '',
        "is_advertiser": channel.isInserzionista,
        "is_locked": false,
        "authors": channel.authors || [],
        "opening_hours": opening_hours
        */
      };

      _this.isWorking = true;

      Restangular
        .one(API.segnalazioni.create())
        .customPOST(toCreate)
        .then(function(success){
          // get new channels
          toastr.success('La nuova utilità è stato creato');
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
          toastr.error('Ops! Qualcosa è andato storto. Controlla i dati inseriti', 'Nuova utilità', {closeButton: true});
          _this.isWorking = false;
          console.error(error);
          defer.reject(error);
        });

      return defer.promise;
    }

    /**
     * Update channel
     * @param _id
     * @param channel to update
     * @return {Promise}
     * @private
     */
    function _updateUtilita(_id, channel){


      var _this = this;
      var defer = $q.defer();

      var toCreate = {
        /*
        "ds_name": channel.name,
        "cd_username": channel.username,
        "ds_address": channel.address || '',
        "id_city": AdminService.user.cityId(),
        "ds_phone": channel.phone || '',
        "ds_email": channel.email || '',
        "ds_website": channel.website || '',
        "id_icon": channel.icon || '',
        "ds_category": channel.category || '',
        "is_advertiser": channel.isInserzionista,
        "is_locked": channel.isLocked,
        "authors": channel.authors || [],
        "opening_hours": opening_hours
        */
      };

      _this.isWorking = true;

      Restangular
        .one(API.segnalazioni.update({id: _id}))
        .customPUT(toCreate)
        .then(function(success){
          // get new channels
          toastr.success('L\'utilità è stata aggiornata');
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
          toastr.error('Ops! Qualcosa è andato storto. Controlla i dati inseriti', 'Aggiornata utilità', {closeButton: true});
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