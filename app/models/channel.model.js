(function(angular){
    "use strict";

  var models = angular.module('Smart.models');

  ChannelModel.$inject = ['API', '$q', 'Restangular', 'IMAGE_BASEURL', '$state']; // 'Restangular', '$q', 'AuthServices'
  models.factory('ChannelModel', ChannelModel);

  function ChannelModel(API, $q ,Restangular, IMAGE_BASEURL, $state) { //Restangular, $q, API, Images, AuthServices

    /////////// CONSTRUCTOR ///////////
    function Channel(channelData) {
      if (channelData) {
        channelData.isWorking = false;
        this.set(channelData);
        return this;
      } else {
        throw new Error("CHANNEL DATA IS MANDATORY");
      }
    }

    //////////////////////////////////
    /////////// PROTOTYPES ///////////
    //////////////////////////////////

    Channel.prototype.set = _set;
    Channel.prototype.id = _identifier;
    Channel.prototype.name = _name;
    Channel.prototype.authorList = _authorList;
    Channel.prototype.openHours = _openHours;
    Channel.prototype.category = _category;
    Channel.prototype.iconImageUrl = _iconImageUrl;
    Channel.prototype.address = _address;
    Channel.prototype.website = _website;
    Channel.prototype.email = _email;
    Channel.prototype.username = _username;
    Channel.prototype.password = _password;
    Channel.prototype.isAdvertiser = _isAdvertiser;
    Channel.prototype.isLocked = _isLocked;
    Channel.prototype.openingHours = _openingHours;
    Channel.prototype.phonenumber = _phonenumber;
    Channel.prototype.activeFrom = _activeFrom;
    Channel.prototype.showDetail = _showDetail;

    /** stats **/
    Channel.prototype.statistics = _getStats;
    Channel.prototype.reportCount = _reportCount;
    Channel.prototype.articleCount = _articleCount;

    //////////////////////////////////
    /////////// FUNCTIONS ////////////
    //////////////////////////////////

    /**
     * Set data of user
     * @param uData
     * @private
     */
    function _set(uData) {
      this.stats = {
        articles: 0,
        reports: 0
      };

      angular.extend(this, uData);
    }

    /**
     * Get _id
     * @private
     */
    function _identifier(){
      return this._id;
    }
    /**
     * Get name of the channel
     * @return {string}
     * @private
     */
    function _name(){
      return this.ds_name;
    }

    /**
     * Get Author list
     * @return {String[]}
     * @private
     */
    function _authorList(){
      return this.authors || [];
    }

    /**
     * Get Opening Hours
     * @return {*|{}}
     * @private
     */
    function _openHours(){
      return this.opening_hours || {};
    }

    /**
     * Get Category
     * @return {*}
     * @private
     */
    function _category(){
      return this.ds_category;
    }

    /**
     * Get icon image url
     * @return {string}
     * @private
     */
    function _iconImageUrl(){
      if(this.id_icon){
        return IMAGE_BASEURL + this.id_icon;
      }
      return 'app/assets/images/c_icon.jpg';
    }

    /**
     * Address
     * @return {*|string}
     * @private
     */
    function _address(){
      return this.ds_address || '';
    }
    /**
     * Get website
     * @return {*}
     * @private
     */
    function _website(){
      return this.ds_website || '';
    }

    /**
     * Email
     * @return {*|string}
     * @private
     */
    function _email(){
      return this.ds_email || '';
    }

    /**
     * Username
     * @return {*|string|string}
     * @private
     */
    function _username(){
      return this.cd_username || '';
    }

    /**
     * Password
     * @return {string}
     * @private
     */
    function _password(){
      return '';
    }

    /**
     *
     * @private
     */
    function _isAdvertiser(){
      return this.is_advertiser;
    }

    /**
     *
     * @private
     */
    function _isLocked(){
      return this.is_locked;
    }

    /**
     * Get phone number
     * @return {*}
     * @private
     */
    function _phonenumber(){
      return this.ds_phone;
    }

    /**
     * Get opening hours
     * @return {*|Array}
     * @private
     */
    function _openingHours(){
      return this.opening_hours || [];
    }

    /**
     *  active form
     * @return {*}
     * @private
     */
    function _activeFrom(){

      if(this.dt_activation){
        var date = new Date((this.dt_activation || "").replace(/-/g,"/").replace(/[TZ]/g," "));

        if(_.isInvalidDate(date)){
          date = new Date((this.dt_activation || ""));
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
     * Go to detail
     */
    function _showDetail(){
      $state.go($state.ROUTING.detailchannel.name, {id: this._id});
    }

    /**
     * Get stats of this channel
     * @private
     */
    function _getStats(){

      var _this = this;

      Restangular
        .one(API.channels.stats({}, {id_channel: this._id}))
        .get()
        .then(function(result){
          _this.stats.articles = result.articles;
          _this.stats.reports = result.reports;
        }, function(error){
          console.error("STATS CHANNEL FAILED");
        });

      return true;

      /**
       * this.stats = {
        articles: 0,
        reports: 0
      };
       */
    }

    /**
     * Count of reports for this channel
     * @return {number}
     */
    function _reportCount(){
      return this.stats.reports;
    }

    /**
     * Count of article for this channel
     * @return {number}
     */
    function _articleCount(){
      return this.stats.articles;
    }
    /** return User ***/
    return Channel;
  }




})(window.angular);