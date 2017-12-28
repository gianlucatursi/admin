(function (angular) {
  "use strict";

  var services = angular.module('Smart.services');

  MediaService.$inject = ['Restangular', 'MediaModel', 'AdminService', '$q', 'API', '$http', 'UtilService'];
  services.service('MediaService', MediaService);

  /**
   * Media manager
   * @param Restangular
   * @param ArticleModel Model
   * @param AdminService Model
   * @param $q
   * @param API
   */
  function MediaService(Restangular, MediaModal, AdminService, $q, API, $http, UtilService) {

    var medias = {};
    var _that = this;
    _that.isWorking = false;
    var _selected = {};
    _that._modalOptions = {
      isGallery: false,
      isMediaView: false,
      mediaSelected: {},
      realSelected: {}
    };

    _that.options = {
      textToSearch: '',
      searchWorking: false,
      pager:{
        isopen: false,
        active: 1,
        count: 1,
        limit: 5
      }
    };

    //////////////////////////////////
    /////////// PROTOTYPES ///////////
    //////////////////////////////////

    _that.retriveInstance = _retriveInstance;

    _that.get  = _get;
    _that.byId = _byId;
    _that.toArray = _toArray;
    _that.search = _search;
    _that.working = function(){ return _that.isWorking };
    _that.modalOptions = function(){ return _that._modalOptions; };

    _that.createMedia = _createMedia;
    _that.uploadImage = _uploadImage;
    _that.updateMedia = _updateMedia;
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


    function _createMedia(media){

      var _this = this;
      var defer = $q.defer();

      var toCreate = {
        "type" : media.type,
        "ds_tags" : media.tags,
        "ds_description" : media.description,
        "id_channel" : media.id_channel,
        "id_city" : AdminService.user.cityId(),
        "id_image" : media.id_image || "",
        "video_url" : media.video_url || "",
        "video_id" : media.video_id || ""
      };

      _this.isWorking = true;

      Restangular
        .one(API.media.create())
        .customPOST(toCreate)
        .then(function(success){
          // get new channels
          //toastr.success('Il nuovo media è stato creato');
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
          //toastr.error('Ops! Qualcosa è andato storto. Controlla i dati inseriti', 'Nuovo media', {closeButton: true});
          _this.isWorking = false;
          console.error(error);
          defer.reject(error);
        });

      return defer.promise;
    }

    /**
     * Upload image
     * @param base64
     * @param id_channel
     * @return {Promise}
     * @private
     */
    function _uploadImage(base64, id_channel){
      var _this = this;
      var defer = $q.defer();

      _this.isWorking = true;

      $http({
        method: 'POST',
        url: UtilService.uploadImageUrl(),
        data: {image: base64}
      }).then(function(success){
        // get new channels
        _this.createMedia({
          "type" : 'IMAGE',
          "ds_tags" : '',
          "ds_description" : '',
          "id_channel" : id_channel,
          "id_city" : AdminService.user.cityId(),
          "id_image" : success.data._id || "",
          "video_url" : ""
        }).then(function(){

          _that
            .get()
            .then(function(){
              defer.resolve();
            }, function(){
              defer.resolve();
            });

        }, function(){

          defer.reject();
        })
      }, function(error){
        //toastr.error('Ops! Qualcosa è andato storto. Controlla i dati inseriti', 'Nuovo media', {closeButton: true});
        _this.isWorking = false;
        console.error(error);
        defer.reject(error);
      });


      return defer.promise;
    }

    /**
     *
     * @private
     */
    function _updateMedia(_data){
      var _this = this;
      var defer = $q.defer();

      _this.isWorking = true;

      var _id = _data._id;

      delete _data._id;

      Restangular
        .one(API.media.update({id: _id}))
        .customPUT(_data)
        .then(
          function(){
            _this.isWorking = false;
            defer.resolve(_data);
          },
          function(){
            _this.isWorking = true;
            defer.reject();
          });

      return defer.promise;
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

      var filters = { /*id_city: AdminService.user.citySelected()._id */};

      if(options.type){
        filters.type = options.type;
      }

      if(options.id_channel){
        filters.id_channel = options.id_channel;
      }

      if(options.dt_insert && _.isDate(options.dt_insert)){
        filters.dt_insert = options.dt_insert.getTime();
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
        list.push(medias[key]);
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