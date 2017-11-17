(function(angular){
    "use strict";

  var models = angular.module('Smart.models');

  MediaModel.$inject = ['API', '$q', 'Restangular', 'IMAGE_BASEURL']; // 'Restangular', '$q', 'AuthServices'
  models.factory('MediaModel', MediaModel);

  function MediaModel(API, $q ,Restangular, IMAGE_BASEURL) { //Restangular, $q, API, Images, AuthServices

    /////////// CONSTRUCTOR ///////////
    function Media(mediaData) {
      if (mediaData) {
        mediaData.isWorking = false;
        this.set(mediaData);
        return this;
      } else {
        throw new Error("MEDIA DATA IS MANDATORY");
      }
    }

    //////////////////////////////////
    /////////// PROTOTYPES ///////////
    //////////////////////////////////

    Media.prototype.set = _set;


    /////////// CRUD ///////////
    Media.prototype.create = _create;
    Media.prototype.delete = _delete;


    /////////// MEDIA DATA FOR VIEW ///////////

    Media.prototype.identifier = _identifier;
    Media.prototype.description = _description;
    Media.prototype.tags = _tags;
    Media.prototype.mediaType = _mediaType;
    Media.prototype.categoryId = _categoryId;
    Media.prototype.channelId = _channelId;
    Media.prototype.cityId = _cityId;
    Media.prototype.uploadedAt = _uploadedAt;
    Media.prototype.mediaUrl = _mediaUrl;

    Media.prototype.isVideo = _isVideo;


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

    function _create(){

    }
    /**
     * TODO
     * @private
     */
    function _delete(){

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
    function _tags(){
      return this.tags;
    }

    /**
     * Get article title
     * @return {string}
     * @private
     */
    function _mediaType(){
      return this.type;
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
    function _uploadedAt(){
      /*
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
      */
      return 'TODO';
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
    function _mediaUrl(){
      return this.url;
    }

    /**
     * Check if is an event
     * @return {boolean}
     * @private
     */
    function _isVideo(){
      return !!this.url;
    }

    /** return User ***/
    return Media;
  }




})(window.angular);