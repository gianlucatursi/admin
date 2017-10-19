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
      if (userData) {
        userData.isWorking = false;
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
    Admin.prototype.check = _check;


    //////////////////////////////////
    /////////// FUNCTIONS ////////////
    //////////////////////////////////

    /**
     * Set data of user
     * @param uData
     * @private
     */
    function _set(uData) {
      if('cd_privilege' in uData && uData.cd_privilege in _PRIVILEGES){
        uData.isAdmin = _PRIVILEGES[uData.cd_privilege] == 0;
      }
      angular.extend(this, uData);
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

    /** return User ***/
    return Admin;
  }




})(window.angular);