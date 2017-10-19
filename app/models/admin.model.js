(function(angular){
  "use strict";

  var models = angular.module('Smart.models');

  var _PRIVILEGES = {
    'CMS-ACCESS-ADMIN': 0,
    'CMS-ACCESS-USER': 1
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


    /** return User ***/
    return Admin;
  }




})(window.angular);