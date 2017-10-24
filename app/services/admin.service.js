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
    _that.options = {
      isWorking: false
    };

    _that.user = new AdminModel({});

    setTimeout(_checkUser.bind(_that), 300);
    //////////////////////////////////
    /////////// PROTOTYPES ///////////
    //////////////////////////////////

    _that.retriveInstance = _retriveInstance;
    _that.cities = _getCity;
    _that.isWorking = _isWorking;
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
     * Get if is working
     * @return {boolean}
     * @private
     */
    function _isWorking(){
      return _that.options.isWorking;
    }

    /**
     * Do A Login
     * @param username
     * @param password
     * @return {*}
     * @private
     */
    function _login(username, password){

      var _this = _that;
      var defer = $q.defer();

      _that.options.isWorking = true;

      var hashed = CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64);

      Restangular
        .one(API.admin.login())
        .customPOST({
           "username":username,
           "password":hashed
        })
        .then(function(data){

          _that.options.isWorking = false;

          _that.user.set(data.user);
          Restangular.setDefaultHeaders({'x-access-token': data.token});

          _getCity()
            .then(function(result){

              if(_that.user.isRedazione()){
                _that.user.set({cities : result});

                if(result.length == 1){
                  _this.user.choose_city(result[0]);
                }

                _that.options.isWorking = false;

                defer.resolve(data);

              }else{
                _this.user.choose_city(_(result).find({_id: _this.user.id_city}));
                defer.resolve(data);
              }

            }, function(error){
              _that.options.isWorking = false;
              defer.reject(error);
            });

          localStorageService.set('user_login', {username: username, password: password});

        }, function(error){
          _that.options.isWorking = false;
          defer.reject(error);
        });

      return defer.promise;
    }


    //////////////////////////////////
    /////////// PRIVATES ////////////
    //////////////////////////////////

    /**
     * Check if user is in session and try to login
     * if not exist then send event on bus for notify all that user is not logged
     * @private
     */
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

    /**
     * Get city list
     * @private
     */
    function _getCity(){

      return Restangular
        .one(API.city())
        .get();

    }

    /** return service **/
    return this;

  }

})(window.angular);