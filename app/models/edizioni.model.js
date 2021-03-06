(function(angular){
  "use strict";

  var models = angular.module('Smart.models');

  EdizioneModel.$inject = ['API', '$q', 'Restangular', '$state']; // 'Restangular', '$q', 'AuthServices'
  models.factory('EdizioneModel', EdizioneModel);

  function EdizioneModel(API, $q ,Restangular, $state) { //Restangular, $q, API, Images, AuthServices

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
    Edizione.prototype.showDetail = _showDetail;

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
      var sum = 0;
      sum += _.reduce((this.articles || []), function(memo, elem){
          return memo + (elem.ids || []).length;
      }, 0);

      return sum;
    }

    /**
     * Get status of edizione
     * @private
     */
    function _getStatus(){
      return !!this.authorized;
    }

    function _showDetail(){
      $state.go($state.ROUTING.modifica_edizione.name, {id: this._id});
    }
    /** return User ***/
    return Edizione;
  }




})(window.angular);