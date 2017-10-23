(function() {
  'use strict';

  var required = ['LocalStorageModule', 'restangular', 'ui.router','Smart.controllers', 'Smart.services', 'Smart.models', 'Smart.directives'];

  var app = angular.module('Community', required);


  app.config(function($urlRouterProvider) {
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

})();