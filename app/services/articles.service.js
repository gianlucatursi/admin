(function (angular) {
  "use strict";

  var services = angular.module('Smart.services');

  ArticleService.$inject = ['Restangular', 'ArticleModel', 'UserModel', '$q', 'API'];
  services.service('ArticleService', ArticleService);

  /**
   * Product manager
   * @param Restangular
   * @param Product Model
   * @param $q
   * @param API
   */
  function ArticleService(Restangular, ArticleModel, UserModel, $q, API) {

    var articles = {};
    var _that = this;

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
        articles[_id] = article;
      }

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

    /** return service **/
    return this;

  }

})(window.angular);