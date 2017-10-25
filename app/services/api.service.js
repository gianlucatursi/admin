(function (angular) {
  "use strict";

  var services = angular.module('Smart.services');

  APIServices.$inject = ['Restangular'];
  services.service('API', APIServices);

  function APIServices(Restangular) {

    return {
      /************ LOGIN **************/
      admin: {
        login: _customRequest.bind(null, '/auth')
      },
      /************ ARTICLE **************/
      articles: {
        get: _customRequest.bind(null, 'article'),
        byId: _customRequest.bind(null, 'article/:id'),
      },
      /************ CITY **************/
      city: _customRequest.bind(null, 'city')
    };

    function _customRequest(url, to_replace) {

      _.each(to_replace, function(value, key){
        url = url.replace(key, value);
      });

      return url;
    }

  }

})(window.angular);