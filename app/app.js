(function() {
  'use strict';

  var required = ['angular-ladda', 'LocalStorageModule', 'restangular', 'ui.router','Smart.controllers', 'Smart.routing', 'Smart.services', 'Smart.models', 'Smart.directives'];

  var app = angular.module('Community', required);


  app.config(function($stateProvider, $urlRouterProvider, $provide, ROUTING) {

    _.each(ROUTING, function(value, key){

      console.info('loading state: ' + key);
      $stateProvider.state(value);

      $provide.decorator('$state', function($delegate, $rootScope) {
        $delegate.ROUTING = ROUTING;

        $rootScope.$on('$stateChangeStart', function(event, state, params) {
          if ($delegate.current === "login" || $delegate.current === "register") {
            return;
          }
          console.log("decorator", $delegate);
          $delegate.current.resolve = {
            auth: ['AdminService', '$stateParams', function(AdminService, $stateParams) {
              //how to invoke this function?
              if (AdminService.user.isLogged()) {
                return true;
              } else {
                $delegate.go(ROUTING.login.name);
                return false;
              }
            }]
          };
        });
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