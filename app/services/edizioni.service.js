(function (angular) {
  "use strict";

  var services = angular.module('Smart.services');

  EdizioniService.$inject = ['Restangular', 'EdizioneModel', 'AdminService', '$q', 'API'];
  services.service('EdizioniService', EdizioniService);

  /**
   * Product manager
   * @param Restangular
   * @param ChannelModel Model
   * @param AdminService Model
   * @param $q
   * @param API
   */
  function EdizioniService(Restangular, EdizioneModel, AdminService, $q, API) {

    var edizioni = {};
    var _that = this;
    _that.isWorking = false;

    _that._selected = {};

    //////////////////////////////////
    /////////// PROTOTYPES ///////////
    //////////////////////////////////

    _that.retriveInstance = _retriveInstance;
    _that.get  = _get;
    _that.getByDay  = _get;
    _that.byId  = _byId;
    _that.local  = _local;
    _that.selected = _getSelected;
    _that.toArray = _toArray;

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
      var edizione = edizioni[_id];
      if (edizione) {
        edizione.set(data);
      } else {
        edizione = new EdizioneModel(data);
      }

      edizioni[_id] = edizione;
      return edizione;
    }

    /**
     * Get Method
     * @private
     */
    function _get(timestamp){
      var defer = $q.defer();
      var _this = this;

      _this.isWorking = true;

      var filters = {};

      edizioni = {};

      if(!AdminService.user.isRedazione()){
        //filters['id_channel']
        filters.id_channel = AdminService.user.channelId();
      }else{
        filters.id_city = AdminService.user.citySelected()._id;
      }

      var url = API.edizioni.get({}, filters);

      if(timestamp){
        filters.dt_edition = timestamp;
        url = API.edizioni.getByDay({}, filters)
      }

      Restangular
        .one(url)
        .getList()
        .then(function(data){

          _this.isWorking = false;

          _.each(data, function (edition) {
            // init articles
            _retriveInstance(edition._id, edition);
          });

          if(edizioni.length > 0){
            _that._selected = edizioni[0];
          }

          defer.resolve(edizioni || []);

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
      return edizioni[_id];
    }

    /**
     * Get local list
     * @return {{}}
     * @private
     */
    function _local(){
      if(!edizioni){
        this.get();
      }

      return edizioni;
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
      if(!edizioni){
        return [];
      }

      var list = [];
      _.each(edizioni, function(value, key){
        list.push(value);
      });

      return list;
    }
    /** return service **/
    return this;

  }

})(window.angular);