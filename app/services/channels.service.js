(function (angular) {
  "use strict";

  var services = angular.module('Smart.services');

  ChannelService.$inject = ['Restangular', 'ChannelModel', 'AdminService', '$q', 'API', 'toastr', 'UtilService'];
  services.service('ChannelService', ChannelService);

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
  function ChannelService(Restangular, ChannelModel, AdminService, $q, API, toastr, UtilService) {

    var channels = {};
    var _that = this;
    _that.isWorking = false;

    _that._selected = {};

    //////////////////////////////////
    /////////// PROTOTYPES ///////////
    //////////////////////////////////

    _that.retriveInstance = _retriveInstance;
    _that.pager = _getPager;
    _that.get  = _get;
    _that.byId  = _byId;
    _that.local  = _local;
    _that.selected = _getSelected;
    _that.toArray = _toArray;
    _that.working = function(){ return _that.isWorking; };
    _that.validate = _validate;


    /////// CRUD /////////
    _that.create = _createChannel;
    _that.update = _updateChannel;
    _that.delete = _deleteChannel;
    _that.lock = _lockChannel;
    _that.unlock = _unlockChannel;

    //////////////////////////////////
    /////////// FUNCTIONS ////////////
    //////////////////////////////////
    /**
     * Retrive instance of a article with _id
     * @param _id Identifier of Article
     * @param data Data of article
     * @private
     */
    function _retriveInstance(_id, data) {
      var channel = channels[_id];
      if (channel) {
        channel.set(data);
      } else {
        channel = new ChannelModel(data);
      }

      channels[_id] = channel;
      return channel;
    }

    /**
     * Get Pager
     * @return {{total: number, start: number, end: number, offset: number, limit: number, last_offset: number, query: null, order_by: string}}
     * @private
     */
    function _getPager(){
      return _pager;
    }

    /**
     * Get Method
     * @private
     */
    function _get(){
      var defer = $q.defer();
      var _this = this;

      _this.isWorking = true;

      var filters = {cd_privilege: 'CMS-ACCESS-CHANNEL'};

      channels = {};

      if(!AdminService.user.isRedazione()){
        //filters['id_channel']
        filters.id_channel = AdminService.user.channelId();
      }else{
        filters.id_city = AdminService.user.citySelected()._id;
      }

      Restangular
        .one(API.channels.get({}, filters))
        .getList()
        .then(function(data){

          _this.isWorking = false;

          _.each(data, function (channel) {
            // init articles
            _retriveInstance(channel._id, channel);
          });

          if(channels.length > 0){
            _that._selected = channels[0];
          }

          defer.resolve(channels || []);

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
      return channels[_id];
    }

    /**
     * Get local list
     * @return {{}}
     * @private
     */
    function _local(){
      if(!channels){
        this.get();
      }

      return channels;
    }

    /**
     * Get selected
     * @return {{}|*}
     * @private
     */
    function _getSelected(){
      return this._selected;
    }

    /**
     * To Array
     * @return {Array}
     * @private
     */
    function _toArray(){
      if(!channels){
        return [];
      }

      var list = [];
      _.each(channels, function(value, key){
        list.push(value);
      });

      return list;
    }

    /**
     * Validate channel to post
     * @param channel
     * @private
     */
    function _validate(channel,isNew){
      // check name
      if(channel.name == ''){
        toastr.error('E\' necessario inserire il nome del canale per poter proseguire','Controlla i dati', { closeButton: true});
        return false;
      }

      // check username
      if(channel.username == ''){
        toastr.error('E\' necessario inserire l\'username del canale per poter proseguire','Controlla i dati', { closeButton: true});
        return false;
      }

      // check password
      if(isNew && channel.password == ''){
        toastr.error('E\' necessario inserire la password del canale per poter proseguire','Controlla i dati', { closeButton: true});
        return false;
      }

      // check category
      if(channel.category == ''){
        toastr.error('E\' necessario inserire la categoria del canale per poter proseguire','Controlla i dati', { closeButton: true});
        return false;
      }

      // check authors
      if(!channel.authors || channel.authors.length == 0){
        toastr.error('E\' necessario inserire almeno un autore del canale per poter proseguire','Controlla i dati', { closeButton: true});
        return false;
      }

      return true
    }

    /**
     * Create Channel
     * @param channel
     */
    function _createChannel(channel){

      var _this = this;
      var defer = $q.defer();
      var password = UtilService.generatePassword(channel.password);

      var opening_hours = [];
      if(channel.orari_specifici && channel.days){
        opening_hours = channel.days;
      }

      var toCreate = {
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
      };

      _this.isWorking = true;

      Restangular
        .one(API.channels.create())
        .customPOST(toCreate)
        .then(function(success){
          // get new channels
          toastr.success('Il nuovo canale è stato creato');
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
          toastr.error('Ops! Qualcosa è andato storto. Controlla i dati inseriti', 'Nuovo canale', {closeButton: true});
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
    function _updateChannel(_id, channel){


      var _this = this;
      var defer = $q.defer();

      var opening_hours = [];
      if(channel.orari_specifici && channel.days){
        opening_hours = channel.days;
      }

      var toCreate = {
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
      };

      _this.isWorking = true;

      Restangular
        .one(API.channels.update({id: _id}))
        .customPUT(toCreate)
        .then(function(success){
          // get new channels
          toastr.success('Il canale è stato aggiornato');
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
          toastr.error('Ops! Qualcosa è andato storto. Controlla i dati inseriti', 'Aggiornata canale', {closeButton: true});
          _this.isWorking = false;
          console.error(error);
          defer.reject(error);
        });

      return defer.promise;
    }


    function _deleteChannel(_id){

      var _this = this;
      var defer = $q.defer();

      _this.isWorking = true;
      Restangular
        .one(API.channels.update({id: _id}))
        .customDELETE()
        .then(function(success){
          // get new channels
          toastr.success('Il canale è stato eliminato');
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
          toastr.error('Ops! Qualcosa è andato storto', 'Elimina canale', {closeButton: true});
          _this.isWorking = false;
          console.error(error);
          defer.reject(error);
        });

      return defer.promise;

    }

    function _lockChannel(channelToLock){

      channelToLock.isLocked = true;
      return this.update(channelToLock._id, channelToLock);
    }

    function _unlockChannel(channelToUnlock){
      channelToUnlock.isLocked = false;
      return this.update(channelToUnlock._id, channelToUnlock);
    }

    /** return service **/
    return this;

  }

})(window.angular);