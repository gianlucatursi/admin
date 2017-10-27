(function (angular) {
  "use strict";

  var services = angular.module('Smart.services');

  ChannelService.$inject = ['Restangular', 'ChannelModel', 'AdminService', '$q', 'API'];
  services.service('ChannelService', ChannelService);

  /**
   * Product manager
   * @param Restangular
   * @param ChannelModel Model
   * @param AdminService Model
   * @param $q
   * @param API
   */
  function ChannelService(Restangular, ChannelModel, AdminService, $q, API) {

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
    _that.local  = _local;
    _that.selected = _getSelected;

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

    function _local(){
      if(!channels){
        this.get();
      }

      return channels;
    }

    function _getSelected(){
      return this._selected;
    }

    /** return service **/
    return this;

  }

})(window.angular);