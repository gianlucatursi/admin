(function (angular) {
  "use strict";

  var services = angular.module('Smart.services');

  ChannelService.$inject = ['Restangular', 'ChannelModel', 'AdminService', '$q', 'API', 'toastr'];
  services.service('ChannelService', ChannelService);

  /**
   * Product manager
   * @param Restangular
   * @param ChannelModel Model
   * @param AdminService Model
   * @param $q
   * @param API
   */
  function ChannelService(Restangular, ChannelModel, AdminService, $q, API, toastr) {

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

    _that.validate = _validate;

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
    function _validate(channel){
      // check name
      if(channel.name == ''){
        toastr.error('E\' necessario inserire il nome del canale per poter proseguire','Controlla i dati', { closeButton: true});
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

      // check username
      if(!channel.username == ''){
        toastr.error('E\' necessario inserire l\'username del canale per poter proseguire','Controlla i dati', { closeButton: true});
        return false;
      }

      // check password
      if(!channel.password == ''){
        toastr.error('E\' necessario inserire la password del canale per poter proseguire','Controlla i dati', { closeButton: true});
        return false;
      }

      return true
    }
    /** return service **/
    return this;

  }

})(window.angular);