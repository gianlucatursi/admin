(function (angular) {
  "use strict";

  var services = angular.module('Smart.services');

  ArticleService.$inject = ['Restangular', 'ArticleModel', 'AdminService', '$q', 'API', 'toastr'];
  services.service('ArticleService', ArticleService);

  /**
   * Product manager
   * @param Restangular
   * @param ArticleModel Model
   * @param AdminService Model
   * @param $q
   * @param API
   */
  function ArticleService(Restangular, ArticleModel, AdminService, $q, API, toastr) {

    var articles = {};
    var _that = this;
    _that.isWorking = false;

    var _pager = {
      total: 0,
      start: 0,
      end: 0,
      offset: 0,
      limit: 50,
      last_offset: 0,
      query: null,
      order_by: '-updated_at'
    };

    var _selected = {};
    _that._modalOptions = {
      programSelected: null
    };


    //////////////////////////////////
    /////////// PROTOTYPES ///////////
    //////////////////////////////////

    _that.retriveInstance = _retriveInstance;
    _that.pager = _getPager;
    _that.get  = _get;
    _that.byId = _byId;
    _that.toArray = _toArray;
    _that.search = _search;
    _that.working = function(){ return _that.isWorking };

    _that.validate = _validateArticle;
    _that.create = _createArticle;
    _that.update = _updateArticle;
    //////////////////////////////////
    /////////// FUNCTIONS ////////////
    //////////////////////////////////


    function _validateArticle(){
      return true;
    }

    function _createArticle(article){

      var _this = this;
      var defer = $q.defer();

      var toCreate = {
        "ds_abstract" : article.ds_abstract,
        "ds_title" : article.ds_title,
        "ds_description" : article.ds_description,
        "ds_author": article.ds_author,
        "dt_publication_date" : null,
        "id_category" : article.id_category,
        "id_channel" : article.id_channel,
        "id_city" : AdminService.user.cityId(),
        "is_deleted" : false,
        "image_cover" : article.image_cover,
        "image_gallery" : article.image_gallery,
        "comments" : [],
        "likes" : []
      };

      toCreate["is_event"] = article.is_event == true;

      if(article.is_event == true){
        toCreate["event"] = article.event;
      }

      _this.isWorking = true;

      Restangular
        .one(API.articles.create())
        .customPOST(toCreate)
        .then(function(success){
          // get new channels
          toastr.success('L\' articolo è stato salvato');
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

          defer.resolve();
        }, function(error){
          toastr.error('Ops! Qualcosa è andato storto. Controlla i dati inseriti', 'Salva articolo', {closeButton: true});
          _this.isWorking = false;
          console.error(error);
          defer.reject(error);
        });

      return defer.promise;

    }

    function  _updateArticle(toUpdate, data){

      var defer = $q.defer();
      var _this = this;

      delete data.isNew;
      delete data.isReported;

      Restangular
        .one(API.articles.update({id: toUpdate}))
        .customPUT(data)
        .then(function(success){
          // get new channels
          toastr.success('L\' articolo è stato aggiornato');
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

          defer.resolve();
        }, function(error){
          toastr.error('Ops! Qualcosa è andato storto. Controlla i dati inseriti', 'Aggiorna articolo', {closeButton: true});
          _this.isWorking = false;
          console.error(error);
          defer.reject(error);
        });

      return defer.promise;
    }

    /**
     * Retrive instance of a article with _id
     * @param _id Identifier of Article
     * @param data Data of article
     * @private
     */
    function _retriveInstance(_id, data) {
      var article = articles[_id];
      if (article) {
        article.set(data);
      } else {
        article = new ArticleModel(data);
      }

      articles[_id] = article;
      return article;
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
     * Get by id
     * @param _id to find
     * @private
     */
    function _byId(_id){
      return articles[_id];
    }
    /**
     * Get Method
     * @private
     */
    function _get(options){
      var defer = $q.defer();
      var _this = this;

      articles = [];

      _this.isWorking = true;

      options = options == undefined ? {} : options;

      var filters = { id_city: AdminService.user.citySelected()._id };

      if(options.id_category){
        filters.id_category = options.id_category;
      }

      if(options.is_published){
        filters.is_published = options.is_published;
      }

      if(options.id_channel){
        filters.id_channel = options.id_channel;
      }

      if(options.dt_start && _.isDate(options.dt_start)){
        filters.dt_start = options.dt_start.getTime();
      }

      Restangular
        .one(API.articles.get({}, filters))
        .getList()
        .then(function(data){

          _this.isWorking = false;

          _.each(data, function (article) {
            // init articles
            _retriveInstance(article._id, article);
          });

          if (articles.length > 0) {
            _pager.start = (_pager.limit * _pager.offset) + 1;
            _pager.end = _pager.start + (articles.length - 1);
          }

          defer.resolve(articles || []);

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

      _.each(Object.keys(articles), function(key){
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

      articles = [];

      var filters = {
        id_city: AdminService.user.citySelected()._id,
        text: text
      };

      if(!AdminService.user.isRedazione()){
        filters.id_channel = AdminService.user.channelId();
      }

      Restangular
        .one(API.articles.search({}, filters))
        .getList()
        .then(function(data){

          //_this.isWorking = false;

          _.each(data, function (article) {
            // init articles
            _retriveInstance(article._id, article);
          });

          if (articles.length > 0) {
            _pager.start = (_pager.limit * _pager.offset) + 1;
            _pager.end = _pager.start + (articles.length - 1);
          }

          defer.resolve(articles || []);

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