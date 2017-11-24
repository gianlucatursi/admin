(function(angular) {
  'use strict';

  var required = ['angular-ladda', 'ui.bootstrap', 'ngSanitize', 'ui.select', 'LocalStorageModule', 'restangular', 'ui.router',
    'Smart.controllers', 'Smart.routing', 'Smart.services', 'Smart.models', 'Smart.directives', 'videosharing-embed', 'ngAnimate',
    'ngMaterial', 'toastr','monospaced.elastic','ngQuill','ngFileUpload', 'afkl.lazyImage'];

  angular.module('Community', required)
    .constant('IMAGE_BASEURL', 'https://images.google.it/');
  angular.module('Smart.controllers', []);
  angular.module('Smart.services', []);
  angular.module('Smart.models', []);
  angular.module('Smart.directives', []);
  angular.module('Smart.routing', [])
    .constant('ROUTING', _initRouting());

  /**
   * Initialize routing
   * @private
   */
  function _initRouting(){
    var __ROUTING = {
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
      newchannel:{
        title: 'Nuovo canale',
        name: 'home.nuovo_canale',
        url: '/nuovocanale',
        templateUrl: 'app/features/Details/NewChannel/newchannel.view.html'
      },
      detailchannel:{
        title: 'Modifica canale',
        name: 'home.modifica_canale',
        url: '/canale/:id',
        templateUrl: 'app/features/Details/NewChannel/newchannel.view.html'
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
      },
      newarticle:{
        title: 'Nuovo contenuto',
        name: 'home.nuovo_contenuto',
        url: '/nuovocontenuto',
        templateUrl: 'app/features/Details/NewArticle/newarticle.view.html'
      },
      commenti:{
        title: 'Tutti i commenti',
        name: 'home.commenti',
        url: '/commenti/:id',
        templateUrl: 'app/features/Details/NewArticle/Commenti/commenti.view.html'
      },
      detailarticle:{
        title: 'Modifica contenuto',
        name: 'home.modifica_contenuto',
        url: '/modificacontenuto/:id',
        templateUrl: 'app/features/Details/NewArticle/newarticle.view.html'
      },
      segnalazioni:{
        title: 'Tutte le segnalazioni',
        name: 'home.segnalazioni',
        url: '/segnalazioni',
        templateUrl: 'app/features/Segnalazioni/segnalazioni.view.html'
      },
      segnalationdetail:{//segnalazioni_detail:{
        title: 'Dettaglio segnalazione',
        name: 'home.segnalationdetail',//'home.detailsegnalazioni',
        url: '/segnalationdetail/:id',//'/segnalazionidetail/:id',
        templateUrl: 'app/features/Details/SegnalationDetail/segnalationdetail.view.html'
      },
      utilita:{
        title: 'Gestisci utilita\'',
        name: 'home.utilita',
        url: '/utilita',
        templateUrl: 'app/features/Utilita/utilita.view.html'
      },
      utilita_nuova:{
        title: 'Nuova utilità',
        name: 'home.nuovautilita',
        url: '/nuovautilita',
        templateUrl: 'app/features/Details/NewUtility/newutility.view.html'
      },
      utilita_detail:{
        title: 'Modifica utilità',
        name: 'home.modificautilita',
        url: '/modificautilita/:id',
        templateUrl: 'app/features/Details/NewUtility/newutility.view.html'
      }


    };

    _.each(__ROUTING, function(value, key){
      __ROUTING[key]['resolve'] = {
        event: (function(){
          postal.publish({
            channel: '$routing',
            topic: value.name,
            data: {
              state: value,
              error: null
            }
          });
        })
      }
    });

    return __ROUTING;
  };

})(window.angular);