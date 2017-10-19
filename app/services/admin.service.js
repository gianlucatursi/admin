(function (angular) {
  "use strict";

  var services = angular.module('nembol.services');

  AdminServices.$inject = ['Restangular', 'AdminModel', 'API'];
  services.service('ArticleServices', AdminServices);

  /**
   * Product manager
   * @param Restangular
   * @param Product Model
   * @param $q
   * @param API
   */
  function AdminServices(Restangular, AdminModel, API) {

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

      return  Restangular
        .one(API.admin.login())
        .customPOST({
          "username":"mobile@digitalx.it",
          "password":"k+6TSe6NRR0D2uT1q1Sabj/p7irb+6VifWqMnNRUCi4="
        });
    }

    /** return service **/
    return this;

  }

})(window.angular);