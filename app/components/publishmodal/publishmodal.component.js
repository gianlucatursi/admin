(function(angular){
  "use strict";

  PublishModalController.$inject = ['$scope', 'AdminService', 'ArticleService', 'toastr', 'MediaService', 'UtilService', '$sce', '$uibModal'];

  angular
    .module('Smart.directives')
    .component('publishModal', {
      templateUrl: 'app/components/publishmodal/publishmodal.view.html',
      bindings: {
        resolve: '<',
        close: '&',
        dismiss: '&'
      },
      controller: PublishModalController
    });

  function PublishModalController($scope, AdminService, ArticleService, toastr, MediaService, UtilService, $sce, $uibModal){
    var _this = this;
    var _scope = $scope;

    _scope.channelsUpload = [];
    _scope.channels = [];
    _scope.options = {
      laddaVideo: false,
      laddaImages: false
    };

    var today = new Date();
    var hours = today.getHours() + ":" + today.getMinutes();

    if(ArticleService._modalOptions.programSelected){
      today =  ArticleService._modalOptions.programSelected.dateSelected;
      hours = ArticleService._modalOptions.programSelected.oraSelected;
    }

    _scope.data = {
      oraSelected: hours,
      dateSelected : today
    };


    _scope.checkNumber = function(){
      _scope.data.oraSelected = _scope.data.oraSelected.replace(/[A-z]*/g, '');
    };

    _scope.ok = function () {
      _this.close({$value: _scope.data});
    };

    _scope.cancel = function () {
      _this.dismiss({$value: 'cancel'});
    };

    _scope.deleteProgram = function () {
      _this.dismiss({$value: 'delete'});
    };


  }

})(window.angular);