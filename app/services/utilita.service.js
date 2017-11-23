(function (angular) {
  "use strict";

  var services = angular.module('Smart.services');

  UtilitaService.$inject = ['Restangular', 'ChannelModel', 'AdminService', '$q', 'API', 'toastr', 'UtilService'];
  services.service('UtilitaService', UtilitaService);

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
  function UtilitaService(Restangular, ChannelModel, AdminService, $q, API, toastr, UtilService) {

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
    _that.validate = _validate;
    _that.create = _createUtilita;
    _that.update = _updateUtilita;
    _that.delete = _delete;

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
        .one(API.utilita.get({}, filters))
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


    function _validate(util , isNew){
      // check name
      if(util.name == ''){
        toastr.error('E\' necessario inserire il nome dell\'utilità per poter proseguire','Controlla i dati', { closeButton: true});
        return false;
      }

      // check category
      if(util.category == ''){
        toastr.error('E\' necessario inserire la categoria dell\'utilità per poter proseguire','Controlla i dati', { closeButton: true});
        return false;
      }

      // check category
      if(util.phone == ''){
        toastr.error('E\' necessario inserire il numero di telefono dell\'utilità per poter proseguire','Controlla i dati', { closeButton: true});
        return false;
      }

      return true
    }

    /**
     * Create Channel
     * @param channel
     */
    function _createUtilita(uti){

      var _this = this;
      var defer = $q.defer();

      var toCreate = {
        "ds_name" : uti.name,
        "ds_address" : uti.address,
        "ds_phone" : uti.phone,
        "id_city" : AdminService.user.cityId(),
        "ds_category" : uti.category,
        "opening_hours" : uti.days || [],
        "di_turno" : uti.di_turno
      };

      _this.isWorking = true;

      Restangular
        .one(API.utilita.create())
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
    function _updateUtilita(_id, uti){


      var _this = this;
      var defer = $q.defer();

      var toCreate = {
        "ds_name" : uti.name,
        "ds_address" : uti.address,
        "ds_phone" : uti.phone,
        "id_city" : AdminService.user.cityId(),
        "ds_category" : uti.category,
        "opening_hours" : uti.days ||[],
        "di_turno" : uti.di_turno
      };


      _this.isWorking = true;

      Restangular
        .one(API.utilita.update({id: _id}))
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

    function _delete(_id){

      var _this = this;
      var defer = $q.defer();

      _this.isWorking = true;
      Restangular
        .one(API.utilita.update({id: _id}))
        .customDELETE()
        .then(function(success){
          // get new channels
          toastr.success('L\'utilità è stata eliminata');
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
          toastr.error('Ops! Qualcosa è andato storto', 'Elimina utilità', {closeButton: true});
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