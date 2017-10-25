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
      },
      canali:{
        title: 'Gestisci Canali',
        name: 'home.canali',
        url: '/canali',
        templateUrl: 'app/features/Canali/canali.view.html'
      },
      media:{
        title: 'Media',
        name: 'home.media',
        url: '/media',
        templateUrl: 'app/features/Media/media.view.html'
      },
      iscritti:{
        title: 'Gestisci Iscritti',
        name: 'home.iscritti',
        url: '/iscritti',
        templateUrl: 'app/features/Iscritti/iscritti.view.html'
      },
      edizioni:{
        title: 'Gestisci Edizioni',
        name: 'home.edizioni',
        url: '/edizioni',
        templateUrl: 'app/features/Edizioni/edizioni.view.html'
      },
      contenuti:{
        title: 'Tutti i post',
        name: 'home.contenuti',
        url: '/contenuti',
        templateUrl: 'app/features/Contenuti/contenuti.view.html'
      }

  });

})(window.angular);