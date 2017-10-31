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
        update: _customRequest.bind(null, 'article/:id'),
        byId: _customRequest.bind(null, 'article/:id'),
        search:_customRequest.bind(null, 'search/article'),
      },
      /************ CITY **************/
      city: _customRequest.bind(null, 'city'),
      channels: {
        get: _customRequest.bind(null, 'getchannel'),
      },
      categories : _customRequest.bind(null, 'category')
    };

    /**
     * Generate url for request
     * @param url Base url
     * @param to_replace params to replace (Es: /article/:id   {id: 'article_id'})
     * @param query params in query string (Es: article?id_city=..  { id_city: 'city_id' }
     * @return {*}
     * @private
     */
    function _customRequest(url, to_replace, query) {

      _.each(to_replace, function(value, key){
        url = url.replace(":" + key, value);
      });

      if(query){
        url += "?";
        _.each(query, function(value, key){
          url += key + "=" + value + "&";
        });
      }

      url = url.replace(/\&$/g, '');

      return url;
    }

  }

})(window.angular);