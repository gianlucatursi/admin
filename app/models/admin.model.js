(function(angular){
  "use strict";

  var models = angular.module('Smart.models');

  var _PRIVILEGES = {
    'CMS-ACCESS-ADMIN': 0,
    'CMS-ACCESS-CHANNEL': 1
  };

  AdminModel.$inject = []; // 'Restangular', '$q', 'AuthServices'
  models.factory('AdminModel', AdminModel);

  function AdminModel() { //Restangular, $q, API, Images, AuthServices

    /////////// CONSTRUCTOR ///////////
    function Admin(userData) {
      this.logged = false;
      if (userData) {
        this.isWorking = false;
        this.set(userData);
        return this;
      } else {
        throw new Error("USER DATA IS MANDATORY");
      }
    }

    //////////////////////////////////
    /////////// PROTOTYPES ///////////
    //////////////////////////////////

    Admin.prototype.set = _set;
    Admin.prototype.choose_city = _chooseCity;
    Admin.prototype.citySelected = _citySelected;
    Admin.prototype.check = _check;
    Admin.prototype.isLogged = _isLogged;
    Admin.prototype.isRedazione = _isRedazione;
    Admin.prototype.channelId = _channelId;


    //////////////////////////////////
    /////////// FUNCTIONS ////////////
    //////////////////////////////////

    /**
     * Set data of user
     * @param uData
     * @private
     */
    function _set(uData) {

      uData.logged = !_.isEmpty(uData);

      if('cd_privilege' in uData && uData.cd_privilege in _PRIVILEGES){
        uData.isAdmin = _PRIVILEGES[uData.cd_privilege] == 0;
      }

      angular.extend(this, uData);
    }

    /**
     * Select a city
     * @param _city
     * @private
     */
    function _chooseCity(_city){
      this.set({ city_selected: _city });
    }

    /**
     * Get city selected
     * @return {*}
     * @private
     */
    function _citySelected(){
      if(this.city_selected != undefined){
        return this.city_selected;
      }

      return undefined;
    }

    /**
     * Check if exist {@code _property} with {@code value} in this instance
     * @param _property
     * @param value
     * @return {*}
     * @private
     */
    function _check(_property, value){
      if(this[_property]){
        return this[_property] == value ? this : undefined;
      }else{
        return undefined;
      }
    }

    /**
     * Return if user is logged or not
     * @return {*}
     * @private
     */
    function _isLogged(){

      if(this.logged != undefined){
        return this.logged;
      }

      return false;
    }

    /**
     * True if user is Redazione
     * @return {*}
     * @private
     */
    function _isRedazione(){
      if(this.isAdmin != undefined){
        return this.isAdmin;
      }

      return false;
    }

    /**
     * Return channel id (for Channel user)
     * @return {*}
     * @private
     */
    function _channelId(){
      if(!this.isRedazione() && this.id_channel){
        return this._id;
      }

      return undefined;
    }
    /** return User ***/
    return Admin;
  }

})(window.angular);