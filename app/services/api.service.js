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
        create: _customRequest.bind(null, 'article'),
        get: _customRequest.bind(null, 'article'),
        update: _customRequest.bind(null, 'article/:id'),
        byId: _customRequest.bind(null, 'article/:id'),
        search:_customRequest.bind(null, 'search/article'),
        comment:{
          changestatus: _customRequest.bind(null, 'comment/changestatus')
        }
      },
      /************ CITY **************/
      city: _customRequest.bind(null, 'city'),
      channels: {
        get: _customRequest.bind(null, 'getchannel'),
        stats: _customRequest.bind(null, 'reports/channel'),
        create: _customRequest.bind(null, 'channel'),
        update: _customRequest.bind(null, 'channel/:id'),
      },
      utilita: {
        get: _customRequest.bind(null, 'pharmacy'),
        create: _customRequest.bind(null, 'pharmacy'),
        update: _customRequest.bind(null, 'pharmacy/:id'),
      },
      segnalazioni: {
        get: _customRequest.bind(null, 'segnalazioni'),
        create: _customRequest.bind(null, 'segnalazioni'),
        update: _customRequest.bind(null, 'segnalazioni/:id'),
      },
      edizioni: {
        get: _customRequest.bind(null, 'alleditions'),
        getByDay: _customRequest.bind(null, 'todayedition'),
      },
      media: {
        get: _customRequest.bind(null, 'media'),
        create: _customRequest.bind(null, 'media'),
        update: _customRequest.bind(null, 'media/:id'),
        search:_customRequest.bind(null, 'search/media')
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