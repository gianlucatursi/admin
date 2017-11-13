(function (angular) {
  "use strict";

  var services = angular.module('Smart.services');

  MediaService.$inject = ['Restangular', 'MediaModel', 'AdminService', '$q', 'API'];
  services.service('MediaService', MediaService);

  /**
   * Media manager
   * @param Restangular
   * @param ArticleModel Model
   * @param AdminService Model
   * @param $q
   * @param API
   */
  function MediaService(Restangular, MediaModal, AdminService, $q, API) {

    var medias = {};
    var _that = this;
    _that.isWorking = false;
    var _selected = {};

    //////////////////////////////////
    /////////// PROTOTYPES ///////////
    //////////////////////////////////

    _that.retriveInstance = _retriveInstance;

    _that.get  = _get;
    _that.byId = _byId;
    _that.toArray = _toArray;
    _that.search = _search;
    _that.working = function(){ return _that.isWorking };
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
      var media = medias[_id];
      if (media) {
        media.set(data);
      } else {
        media = new MediaModal(data);
      }

      medias[_id] = media;
      return media;
    }


    /**
     * Get by id
     * @param _id to find
     * @private
     */
    function _byId(_id){
      return medias[_id];
    }
    /**
     * Get Method
     * @private
     */
    function _get(options){
      var defer = $q.defer();
      var _this = this;

      medias = [];

      _this.isWorking = true;

      options = options == undefined ? {} : options;

      var filters = { id_city: AdminService.user.citySelected()._id };

      if(options.id_category){
        filters.id_category = options.id_category;
      }

      if(options.id_channel){
        filters.id_channel = options.id_channel;
      }

      if(options.dt_start && _.isDate(options.dt_start)){
        filters.dt_start = options.dt_start.getTime();
      }

      Restangular
        .one(API.media.get({}, filters))
        .getList()
        .then(function(data){

          _this.isWorking = false;

          _.each(data, function (media) {
            // init articles
            _retriveInstance(media._id, media);
          });

          defer.resolve(medias || []);

        }, function(error){
          _this.isWorking = false;
          defer.reject(error);
        });

      return defer.promise;
    }

    /**
     * To array list
     * @return {Array}
     * @private
     */
    function _toArray(){
      var list = [];

      _.each(Object.keys(medias), function(key){
        list.push(articles[key]);
      });

      return list;
    }

    /**
     * Search text
     * @param text
     * @return {Promise}
     * @private
     */
    function _search(text){
      var defer = $q.defer();
      var _this = this;

      medias = [];

      var filters = {
        id_city: AdminService.user.citySelected()._id,
        text: text
      };

      if(!AdminService.user.isRedazione()){
        filters.id_channel = AdminService.user.channelId();
      }

      Restangular
        .one(API.media.search({}, filters))
        .getList()
        .then(function(data){

          //_this.isWorking = false;

          _.each(data, function (media) {
            // init articles
            _retriveInstance(media._id, media);
          });

          defer.resolve(medias || []);

        }, function(error){
          //_this.isWorking = false;
          defer.reject(error);
        });

      return defer.promise;
    }
    /** return service **/
    return this;

  }

})(window.angular);