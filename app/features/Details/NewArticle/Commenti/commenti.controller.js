(function(angular){
  "use strict";

  var controllers = angular.module('Smart.controllers');

  CommentiController.$inject = ['$state', 'EventBus', 'AdminService', 'ArticleService'];
  controllers.controller('CommentiController', CommentiController);

  function CommentiController($state, EventBus, AdminService, ArticleService){

    var _this = this;
    _this.user = AdminService.user;
    _this.city = AdminService.user.citySelected();
    _this.current_state = $state.current;
    _this.comments = [];
    _this.articleSelected = {};

    if($state.current == $state.ROUTING.commenti){
      _initStatics(ArticleService.byId($state.params.id));
    }else{
      $state.go($state.ROUTING.contenuti);
    }


    function _initStatics(article){
      _this.articleSelected = article;
    }
  }

})(window.angular);