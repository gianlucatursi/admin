(function(angular) {
  'use strict';

  angular.module('Smart.controllers', []);
  angular.module('Smart.services', []);
  angular.module('Smart.models', []);
  angular.module('Smart.directives', []);
  angular.module('Smart.routing', [])
    .constant('ROUTING', {

      login: {
        name: 'login',
        url: '/login',
        templateUrl: 'app/features/Login/login.view.html'
      },
      choose_city:{
        name: 'choose_city',
        url: '/choose_city',
        templateUrl: 'app/features/ChooseCity/choose_city.view.html'
      },
      home: {
        name: 'home',
        url: '/home',
        abstract: true,
        templateUrl: 'app/features/Home/home.view.html'
      },
      home_dashboard: {
        name: 'home.dashboard',
        url: '/dashboard',
        templateUrl: 'app/features/Dashboard/dashboard.view.html'
      }

  });

})(window.angular);