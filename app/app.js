(function() {
  'use strict';

  var required = ['angular-ladda', 'ngSanitize', 'ui.select', 'LocalStorageModule', 'restangular', 'ui.router',
                  'Smart.controllers', 'Smart.routing', 'Smart.services', 'Smart.models', 'Smart.directives'];

  var app = angular.module('Community', required);

  app.run(function($trace) {
    $trace.enable('TRANSITION');
    //$templateCache.removeAll();
  });

  app.config(function($stateProvider, $urlRouterProvider, $provide, ROUTING) {

    _.each(ROUTING, function(value, key){

      console.info('loading state: ' + key);
      $stateProvider.state(value);

      $provide.decorator('$state', function($delegate, $rootScope) {
        $delegate.ROUTING = ROUTING;
        return $delegate;
      });

    });

    $urlRouterProvider.otherwise("/");
  });

  app.config(function (localStorageServiceProvider) {
    localStorageServiceProvider
      .setPrefix('community')
      .setStorageType('sessionStorage')
      .setStorageCookie(1, '/', false);

  });

  app.config(function(RestangularProvider){
    if(window.location.hostname.indexOf('localhost') >= 0){
      RestangularProvider.setBaseUrl('https://communitysmart-services.azurewebsites.net/api/v1');
    }else{
      RestangularProvider.setBaseUrl('https://communitysmart-services.azurewebsites.net/api/v1');
    }

  });

  app.config(function (laddaProvider) {
    laddaProvider.setOption({ /* optional */
      style: 'zoom-in',
      spinnerSize: 35,
      spinnerColor: '#ffffff'
    });
  })

})();