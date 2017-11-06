(function(angular){
  "use strict";

  var models = angular.module('Smart.models');

  EdizioneModel.$inject = ['API', '$q', 'Restangular', 'IMAGE_BASEURL']; // 'Restangular', '$q', 'AuthServices'
  models.factory('EdizioneModel', EdizioneModel);

  function EdizioneModel(API, $q ,Restangular, IMAGE_BASEURL) { //Restangular, $q, API, Images, AuthServices

    /////////// CONSTRUCTOR ///////////
    function Edizione(edizioneData) {
      if (edizioneData) {
        edizioneData.isWorking = false;
        this.set(edizioneData);
        return this;
      } else {
        throw new Error("EDIZIONE DATA IS MANDATORY");
      }
    }

    //////////////////////////////////
    /////////// PROTOTYPES ///////////
    //////////////////////////////////

    Edizione.prototype.set = _set;
    Edizione.prototype.name = _name;
    Edizione.prototype.postNumber = _postNumber;
    Edizione.prototype.status = _getStatus;

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

    /**
     * Get name of the channel
     * @return {string}
     * @private
     */
    function _name(){
      return this.ds_title;
      /*
       if(this.dt_activation){
       return new Date((this.dt_activation || "").replace(/-/g,"/").replace(/[TZ]/g," "));
       }
       return undefined;
       */
    }


    /**
     * Get post number
     * @private
     */
    function _postNumber(){
      return (this.articles || []).length;
    }

    /**
     * Get status of edizione
     * @private
     */
    function _getStatus(){
      return !!this.authorized;
    }
    /** return User ***/
    return Edizione;
  }




})(window.angular);