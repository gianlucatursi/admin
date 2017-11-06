(function (angular) {
  "use strict";

  var services = angular.module('Smart.services');

  ArticleService.$inject = ['Restangular', 'ArticleModel', 'AdminService', '$q', 'API'];
  services.service('ArticleService', ArticleService);

  /**
   * Product manager
   * @param Restangular
   * @param ArticleModel Model
   * @param AdminService Model
   * @param $q
   * @param API
   */
  function ArticleService(Restangular, ArticleModel, AdminService, $q, API) {

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


    //////////////////////////////////
    /////////// PROTOTYPES ///////////
    //////////////////////////////////

    _that.retriveInstance = _retriveInstance;
    _that.pager = _getPager;
    _that.get  = _get;
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