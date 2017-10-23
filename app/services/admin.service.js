(function (angular) {
  "use strict";

  var services = angular.module('Smart.services');

  AdminService.$inject = ['Restangular', 'localStorageService', 'EventBus', 'AdminModel', '$q', 'API'];
  services.service('AdminService', AdminService);

  /**
   * Product manager
   * @param Restangular
   * @param localStorageService
   * @param EventBus
   * @param AdminModel Model
   * @param $q
   * @param API
   */
  function AdminService(Restangular, localStorageService, EventBus, AdminModel, $q, API) {

    var _that = this;
    _that.user = new AdminModel({});

    setTimeout(_checkUser.bind(_that), 300);
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
      var admin = _that.user['_id'] == _id ? _that.user['_id'] : undefined;
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

      var _this = this;
      var defer = $q.defer();

      var hashed = CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64);

      Restangular
        .one(API.admin.login())
        .customPOST({
           "username":username,
           "password":hashed
        })
        .then(function(data){
          if(data.user){
            _this.user.set(data.user);
          }

          if(data.token){
            Restangular.setDefaultHeaders({'x-access-token': data.token});
          }

          localStorageService.set('user_login', {username: username, password: password});

          defer.resolve(data);
        }, function(error){
          defer.reject(error);
        });

      return defer.promise;
    }


    //////////////////////////////////
    /////////// PRIVATES ////////////
    //////////////////////////////////
    function _checkUser(){
      var _this = this;
      var user_login = localStorageService.get('user_login');
      if(user_login && user_login['username'] && user_login['password']){

        _this
          .login(user_login.username, user_login.password)
          .then(function(data){

            EventBus.publish({
              channel: EventBus.MESSAGES.AUTH.CHANNEL,
              topic: EventBus.MESSAGES.AUTH.TOPICS.USER.LOGIN,
              data: {
                token: data.token,
                error: null
              }
            });

          }, function(error){

            EventBus.publish({
              channel: EventBus.MESSAGES.AUTH.CHANNEL,
              topic: EventBus.MESSAGES.AUTH.TOPICS.USER.LOGIN,
              data: {
                token: null,
                error: error
              }
            });

          });
      }else{
        EventBus.publish({
          channel: EventBus.MESSAGES.AUTH.CHANNEL,
          topic: EventBus.MESSAGES.AUTH.TOPICS.USER.LOGIN,
          data: {
            token: null,
            error: new Error('User not available')
          }
        });
      }
    }

    /** return service **/
    return this;

  }

})(window.angular);