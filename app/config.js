(function(angular) {
  'use strict';

  angular.module('Smart.controllers', []);
  angular.module('Smart.services', []);
  angular.module('Smart.models', []);
  angular.module('Smart.directives', []);
  angular.module('Smart.routing', [])
    .constant('ROUTING', {

      login: {
        title: 'Login',
        name: 'login',
        url: '/login',
        templateUrl: 'app/features/Login/login.view.html'
      },
      choose_city:{
        title: 'Choose City',
        name: 'choose_city',
        url: '/choose_city',
        templateUrl: 'app/features/ChooseCity/choose_city.view.html'
      },
      home: {
        title: 'Home',
        name: 'home',
        url: '/home',
        abstract: true,
        templateUrl: 'app/features/Home/home.view.html'
      },
      home_dashboard: {
        title: 'Dashboard',
        name: 'home.dashboard',
        url: '/dashboard',
        templateUrl: 'app/features/Dashboard/dashboard.view.html'
      }

  });

})(window.angular);