(function (angular) {
  "use strict";

  var services = angular.module('nembol.services');

  AdminServices.$inject = ['Restangular', 'AdminModel', '$q', 'API'];
  services.service('ArticleServices', AdminServices);

  /**
   * Product manager
   * @param Restangular
   * @param AdminModel Model
   * @param $q
   * @param API
   */
  function AdminServices(Restangular, AdminModel, $q, API) {

    var _that = this;
    _that.current_user = new AdminModel({});

    //////////////////////////////////
    /////////// PROTOTYPES ///////////
    //////////////////////////////////

    _that.retriveInstance = _retriveInstance;
    _that.login = _login;

    //////////////////////////////////
    /////////// FUNCTIONS ////////////
    //////////////////////////////////
    /**
     * Retrive instance of a article with _id
     * @param _id Identifier of Article
     * @param data Data of article
     * @private
     */
    function _retriveInstance(_id, data) {
      var admin = _that.current_user['_id'] == _id ? _that.current_user['_id'] : undefined;
      admin.set(data);
      return admin;
    }


    /**
     * Do A Login
     * @param username
     * @param password
     * @return {*}
     * @private
     */
    function _login(username, password){

      var hashed = CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64);

      return  Restangular
        .one(API.admin.login())
        .customPOST({
          "username":username,
          "password":hashed
        });
    }

    /** return service **/
    return this;

  }

})(window.angular);