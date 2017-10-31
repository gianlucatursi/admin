(function (angular) {
  "use strict";

  var services = angular.module('Smart.services');

  CategoryService.$inject = ['Restangular', 'EventBus', '$q', 'API', '$transitions', '$state'];
  services.service('CategoryService', CategoryService);

  function CategoryService(Restangular, EventBus, $q, API) {

    var _that = this;
    _that.options = {
      isWorking: false,
      loaded: false
    };
    _that.list = [
      {
        "_id": "",
        "ds_name": "Tutte le categorie"
      }
    ];

    _get();

    //////////////////////////////////
    /////////// PROTOTYPES ///////////
    //////////////////////////////////

    _that.get = _get;

    //////////////////////////////////
    /////////// FUNCTIONS ////////////
    //////////////////////////////////

    /**
     * Get city list
     * @private
     */
    function _get(){
      var defer = $q.defer();

      if(_that.options.loaded){
        defer.resolve(_that.list);
        return defer.promise;
      }

      Restangular
        .one(API.categories())
        .get()
        .then(
          function(result){

            _that.options.loaded = true;
            _.each(result, function(val){
              _that.list.push(val);
            });
            defer.resolve(_that.list);
          },
          function(error){
            defer.reject(new Error("CATEGORIES FAILED"));
          }
        );


      return defer.promise;

    }

    /** return service **/
    return this;

  }

})(window.angular);