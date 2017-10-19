(function(angular){
    "use strict";

  var models = angular.module('Smart.models');

  ArticleModel.$inject = []; // 'Restangular', '$q', 'AuthServices'
  models.factory('ArticleModel', ArticleModel);

  function ArticleModel() { //Restangular, $q, API, Images, AuthServices

    /////////// CONSTRUCTOR ///////////
    function Article(articleData) {
      if (articleData) {
        articleData.isWorking = false;
        this.set(articleData);
        return this;
      } else {
        throw new Error("ARTICLE DATA IS MANDATORY");
      }
    }

    //////////////////////////////////
    /////////// PROTOTYPES ///////////
    //////////////////////////////////

    Article.prototype.set = _set;


    //////////////////////////////////
    /////////// FUNCTIONS ////////////
    //////////////////////////////////

    /**
     * Set data of user
     * @param uData
     * @private
     */
    function _set(uData) {
      angular.extend(this, uData);
    }


    /** return User ***/
    return Article;
  }




})(window.angular);