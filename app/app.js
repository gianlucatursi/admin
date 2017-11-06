(function() {
  'use strict';

  var app = angular.module('Community');

  app.run(function($trace) {
    $trace.enable('TRANSITION');
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

  app.config(function($mdDateLocaleProvider) {

    $mdDateLocaleProvider.firstDayOfWeek = 1;

    $mdDateLocaleProvider.months = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
    $mdDateLocaleProvider.shortMonths = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'];
    $mdDateLocaleProvider.days = ['Domenica', 'Lunedì', 'Martedì', 'Mercoedì', 'Giovedì', 'Venerdì', 'Sabato'];
    $mdDateLocaleProvider.shortDays = ['Do', 'Lu', 'Ma', 'Me', 'Gi', 'Ve', 'Sa'];

    $mdDateLocaleProvider.msgCalendar = 'Calendario';
    $mdDateLocaleProvider.msgOpenCalendar = 'Apri il calendario';

    $mdDateLocaleProvider.formatDate = function(date) {
      if(date == null || date == undefined) return '';

      return moment(date).format('DD-MM-YYYY');
    };

  });
  app.config(function (laddaProvider) {
    laddaProvider.setOption({ /* optional */
      style: 'expand-right',
      spinnerSize: 35,
      spinnerColor: '#939393'
    });
  });

})();