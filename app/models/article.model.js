(function(angular){
    "use strict";

  var models = angular.module('Smart.models');

  ArticleModel.$inject = ['API', '$q', 'Restangular', 'IMAGE_BASEURL']; // 'Restangular', '$q', 'AuthServices'
  models.factory('ArticleModel', ArticleModel);

  function ArticleModel(API, $q ,Restangular, IMAGE_BASEURL) { //Restangular, $q, API, Images, AuthServices

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


    /////////// CRUD ///////////
    Article.prototype.delete = _delete;
    Article.prototype.update = _update;
    Article.prototype.publish = _publish;


    /////////// ARTICLE DATA FOR VIEW ///////////

    Article.prototype.identifier = _identifier;
    Article.prototype.abstract = _abstract;
    Article.prototype.title = _title;
    Article.prototype.description = _description;
    Article.prototype.publishDate = _publishDate;
    Article.prototype.categoryId = _categoryId;
    Article.prototype.channelId = _channelId;
    Article.prototype.cityId = _cityId;
    Article.prototype.isDeleted = _isDeleted;
    Article.prototype.isEvent = _isEvent;
    Article.prototype.eventInfos = _eventInfos;
    Article.prototype.coverMedia = _coverMedia;
    Article.prototype.coverUrl = _coverUrl;
    Article.prototype.gallery = _gallery;
    Article.prototype.galleryUrls = _galleryUrls;
    Article.prototype.commentList = _commentList;
    Article.prototype.likeList = _likesList;

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

    /////////// CRUD IMPLEMENTATION ///////////

    /**
     * TODO
     * @private
     */
    function _delete(){

    }

    /**
     * TODO
     * @private
     */
    function _update(data){

      var defer = $q.defer();
      var _this = this;

      Restangular
        .one(API.articles.update({id: _this.identifier()}))
        .customPUT(data).then(
          function(result){
            _this.set(data);
            defer.reject({success: true, article: _this});
          },
          function(error){
            alert("FAILD -> FAKE UPDATE");
            _this.set(data);
            defer.reject(error);
          }
      );

      return defer.promise;
    }

    function _publish(){

    }

    /////////// ARTICLE DATA ///////////

    /**
     * Get article _id
     * @return {string}
     * @private
     */
    function _identifier(){
      return this._id;
    }

    /**
     * Get article abstract
     * @return {string}
     * @private
     */
    function _abstract(){
      return this.ds_abstract;
    }

    /**
     * Get article title
     * @return {string}
     * @private
     */
    function _title(){
      return this.ds_title;
    }

    /**
     * Get article description
     * @return {string}
     * @private
     */
    function _description(){
      return this.ds_description;
    }

    /**
     * Get article published date
     * @return {*}
     * @private
     */
    function _publishDate(){
      if(this.dt_publication_date){
        return new Date(this.dt_publication_date);
      }
      return undefined;
    }

    /**
     * Get article category id
     * @return {string}
     * @private
     */
    function _categoryId(){
      return this.id_category;
    }

    /**
     * Get article channel id
     * @return {string}
     * @private
     */
    function _channelId(){
      return this.id_channel;
    }

    /**
     * Get article city id
     * @return {*|string}
     * @private
     */
    function _cityId(){
      return this.id_city;
    }

    /**
     * True if is an article trashed
     * @return {string}
     * @private
     */
    function _isDeleted(){
      return this.is_deleted;
    }

    /**
     * Check if is an event
     * @return {boolean}
     * @private
     */
    function _isEvent(){
      return !!this.event;
    }

    /**
     * Get event if exist
     * @return {*}
     * @private
     */
    function _eventInfos(){
      if(this.isEvent()){
        return this.event;
      }

      return { dates: [] };
    }

    /**
     * Cover media object
     * @return {string}
     * @private
     */
    function _coverMedia(){
      return this.cover_media;
    }

    /**
     * Get cover image url. Can be IMAGE or VIDEO
     * @return {*}
     * @private
     */
    function _coverUrl(){
      if(this.cover_media && this.cover_media.type == 'IMAGE'){
        return IMAGE_BASEURL + this.cover_media.id_image;
      }

      return '';
    }

    /**
     * Get gallery list id
     * @return {string|Array}
     * @private
     */
    function _gallery(){
      return this.image_gallery || [];
    }

    /**
     * Get gallery image urls
     * @return {Array}
     * @private
     */
    function _galleryUrls(){
      var list = [];

      _.each(this.image_gallery || [], function(img){
        list.push(IMAGE_BASEURL + img)
      });

      return list;
    }

    /**
     * Get comments list
     * @return {RegExp|*|string|Array}
     * @private
     */
    function _commentList(){

      return this.comments || [];

    }

    /**
     * Get like list
     * @return {string|Array}
     * @private
     */
    function _likesList(){
      return this.likes || [];
    }

    /** return User ***/
    return Article;
  }




})(window.angular);