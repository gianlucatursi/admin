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

    _that.listNoAll = [];

    _get();

    //////////////////////////////////
    /////////// PROTOTYPES ///////////
    //////////////////////////////////

    _that.get = _get;
    _that.byId  = _byId;


    //////////////////////////////////
    /////////// FUNCTIONS ////////////
    //////////////////////////////////

    /**
     * Get city list
     * @private
     */
    function _get(noAll){
      var defer = $q.defer();

      if(_that.options.loaded){
        if(noAll == true){
          defer.resolve(_that.listNoAll);
        }else{
          defer.resolve(_that.list);
        }

        return defer.promise;
      }

      Restangular
        .one(API.categories())
        .get()
        .then(
          function(result){

            _that.options.loaded = true;
            _.each(result, function(val){
              if(_byId(val._id) == undefined){
                _that.list.push(val);
                _that.listNoAll.push(val);
              }
            });

            if(noAll == true){
              defer.resolve(_that.listNoAll);
            }else{
              defer.resolve(_that.list);
            }

          },
          function(error){
            defer.reject(new Error("CATEGORIES FAILED"));
          }
        );


      return defer.promise;

    }

    /**
     * Get by id
     * @param _id
     * @return {*}
     * @private
     */
    function _byId(_id){
      return _.find(_that.list, {_id: _id});
    }

    /** return service **/
    return this;

  }

})(window.angular);