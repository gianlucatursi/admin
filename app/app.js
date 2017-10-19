(function() {
  'use strict';

  var required = ['Smart.controllers', 'Smart.services', 'Smart.models', 'Smart.directives'];

  var app = angular.module('Community', required);


  app.config(function($urlRouterProvider) {
      $urlRouterProvider.otherwise("/");
  });

})();