(function(angular){
  "use strict";

  var controllers = angular.module('Smart.controllers');

  ContenutiController.$inject = ['$state', 'EventBus', 'AdminService', 'ArticleService', 'ChannelService'];
  controllers.controller('ContenutiController', ContenutiController);

  function ContenutiController($state, EventBus, AdminService, ArticleService, ChannelService){

    var _this = this;
    _this.user = AdminService.user;
    _this.city = AdminService.user.citySelected();
    _this.current_state = $state.current;
    _this.articles = [];

    _this.channels = ChannelService.local();

    ArticleService
      .get()
      .then(
        function(results){
          _this.articles = results;
        },
        function(){
          console.error("ERROR GETTING ARTICLES");
        }
      );

    /*
    Event
    EventBus.subscribe({
      channel: EventBus.MESSAGES.ROUTING.CHANNEL,
      topic: 'home.contenuti',
      callback: function (){
        alert('Home contenuti appear');
     }
    });
    */

  }

})(window.angular);