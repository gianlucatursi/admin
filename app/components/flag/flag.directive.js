(function(angular){

  angular.module('Smart.directives')
    .directive('csFlag', function () {
      return {
        restrict: 'AE',
        transclude: false,
        replace: true,
        scope: {
          title: '@flagString',
          showInfo: '=flagShowInfo',
          selected: '=flagSelected',
          validation:'=flagValidation',
          lineHeight: '@lineHeight',
          fontClass: '@fontClass',
          widthClass: '@widthClass',
          tooltipMessage: '@flagInfoMessage',
          onFlagged: '&'
        },
        templateUrl: "app/components/flag/flag.view.html"
      };
    })

})(window.angular);