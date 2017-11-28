(function(angular){
    "use strict";

  var models = angular.module('Smart.models');

  ArticleModel.$inject = ['API', '$q', 'Restangular', '$state', 'UtilService', '$sce']; // 'Restangular', '$q', 'AuthServices'
  models.factory('ArticleModel', ArticleModel);

  function ArticleModel(API, $q ,Restangular, $state, UtilService, $sce) { //Restangular, $q, API, Images, AuthServices

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
    Article.prototype.authorName = _authorName;
    Article.prototype.eventInfos = _eventInfos;
    Article.prototype.coverMedia = _coverMedia;
    Article.prototype.coverUrl = _coverUrl;
    Article.prototype.gallery = _gallery;
    Article.prototype.galleryUrls = _galleryUrls;
    Article.prototype.commentList = _commentList;
    Article.prototype.showAlertIcon = _showAlertIcon;
    Article.prototype.likeList = _likesList;
    Article.prototype.likeCount = _likesCount;
    Article.prototype.views = _viewsCounter;
    Article.prototype.isPublished = _isPublished;
    Article.prototype.showDetail = _showDetail;

    Article.prototype.isReported = _isReported;
    Article.prototype.commentsReportedCount = _commentsReportedCount;
    Article.prototype.commentsCount = _commentsCount;


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
      _analyzeComments.call(this);
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

      delete data.isNew;
      delete data.isReported;

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
        var date = new Date((this.dt_publication_date || "").replace(/-/g,"/").replace(/[TZ]/g," "));

        if(_.isInvalidDate(date)){
          date = new Date((this.dt_publication_date || ""));
          if(_.isInvalidDate(date)){
            return undefined;
          }
          return date;
        }else{
          return date
        }

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

    function _authorName(){
      return this.ds_author || '';
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

    function _showDetail(){
      $state.go($state.ROUTING.detailarticle.name, {id: this.identifier()});
    }

    /**
     * Cover media object
     * @return {string}
     * @private
     */
    function _coverMedia(){
      return this.image_cover;
    }

    /**
     * Get cover image url. Can be IMAGE or VIDEO
     * @return {*}
     * @private
     */
    function _coverUrl(size){

      if(this.image_cover.type == 'IMAGE'){
        return UtilService.imageUrl(this.image_cover.id_image, size);
      }else{
        return $sce.trustAsResourceUrl(this.image_cover.video_url);
      }

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

      return list;
    }

    /**
     * Get comments list
     * @return {RegExp|*|string|Array}
     * @private
     */
    function _commentList(){

      return this.__commentsList || [];

    }


    function _showAlertIcon(){

      return this.__toAlert;

    }
    /**
     * Get like list
     * @return {string|Array}
     * @private
     */
    function _likesList(){
      return this.likes || [];
    }

    /**
     * Number of likes
     * @return {Number|number}
     * @private
     */
    function _likesCount(){
      return (this.likes || []).length;
    }

    /**
     * Number of views
     * @return {number|Number}
     * @private
     */
    function _viewsCounter(){
      return (this.views || []).length;
    }

    function _isPublished(){
      return this.is_published == true ? this.is_published : false;
    }
    //////////////////// COMMENTS FUNCTIONS ////////////////////

    /**
     * Analyze comments
     * @private
     */
    function _analyzeComments(){
      var _this = this;

      _this.__toAlert = false;
      _this.__commentsCount = 0;
      _this.__reportedCount = 0;
      _this.__commentsList = [];

      if(_this.comments && _this.comments.length > 0){

        _.each(_this.comments, function(comm){

          _this.__commentsCount++;
          _this.__commentsList.push(comm);

          if(comm.is_handled != true){
            _this.__reportedCount += (comm.reports && comm.reports.length > 0 ? 1 : 0);
          }

          _.each((comm.replies || []), function(rep){

            _this.__commentsCount++;
            _this.__commentsList.push(rep);

            if(rep.is_handled != true){
              _this.__reportedCount += (rep.reports && rep.reports.length > 0 ? 1 : 0);
            }

          });
        });

      }

      this.__toAlert = _this.__reportedCount > 0;

    }

    /**
     * Return true if exist a comment with report
     * @return {boolean|*}
     * @private
     */
    function _isReported(){
      return this.__toAlert;
    }

    /**
     * Return counter of reported comments
     * @return {number|*}
     * @private
     */
    function _commentsReportedCount(){
      return this.__reportedCount;
    }

    /**
     * Return counter of comments (also replies)
     * @return {number}
     * @private
     */
    function _commentsCount(){
      return this.__commentsCount;
    }


    /** return User ***/
    return Article;
  }




})(window.angular);