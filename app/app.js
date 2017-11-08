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

  /**
   *
   * TOASTR
   *
   * //Solo titolo
   * toastr.success('I don\'t need a title to live');
   *
   * //titolo + subtitle + close button
   *  toastr.success('What a nice button', 'Button spree', {
     *    closeButton: true
     *  });
   *
   *
   * // tipi : SUCCESS / INFO / WARNING / ERROR
   *
   *
   */

  app.config(function(toastrConfig) {
    angular.extend(toastrConfig, {
      allowHtml: false,
      closeButton: false,
      autoDismiss: true,
      iconClasses: {
        error: 'toast-error',
        info: 'toast-info',
        success: 'toast-success',
        warning: 'toast-warning'
      },
      messageClass: 'toast-message',
      tapToDismiss: true,
      timeOut: 5000,
      titleClass: 'toast-title',
      toastClass: 'toast',
      containerId: 'toast-container',
      maxOpened: 1,
      newestOnTop: true,
      positionClass: 'toast-top-right',
      target: 'body'
    });
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

  /** underscore extension **/
  _.mixin({
    // Invalid date predicate. The invalid dates are still `Date` instances, however their time is `NaN`.
    isInvalidDate: function(obj) {
      return _.isDate(obj) && _.isNaN(obj.getTime());
    }
  });
})();