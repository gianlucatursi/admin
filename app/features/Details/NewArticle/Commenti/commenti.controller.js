(function(angular){
  "use strict";

  var controllers = angular.module('Smart.controllers');

  CommentiController.$inject = ['$state', '$scope', 'EventBus', 'AdminService', 'ArticleService', 'Restangular', 'API', 'toastr'];
  controllers.controller('CommentiController', CommentiController);

  function CommentiController($state, $scope, EventBus, AdminService, ArticleService, Restangular, API, toastr ){

    var _this = this;
    _this.user = AdminService.user;
    _this.city = AdminService.user.citySelected();
    _this.current_state = $state.current;
    _this.comments = [];
    _this.articleSelected = {};
    _this.options = {
      isopen : false
    };

    _this.inspectComment = _inspectComment;
    _this.showAlert = _showAlert;
    _this.showVisibile = _showVisibile;
    _this.showBlocked = _showBlocked;

    _this.blocca = _blocca;
    _this.visto = _visto;
    _this.visibile = _visible;

    if($state.current == $state.ROUTING.commenti){
      _initStatics(ArticleService.byId($state.params.id));
    }else{
      $state.go($state.ROUTING.contenuti);
    }


    function _initStatics(article){
      _this.articleSelected = article;
    }

    function _inspectComment(comment){
      var text = comment;

      text = (text.slice(0,150) || '') ;

      var toReplace = [];
      _.each(text.replace(',', ' ').replace('.', ' ').split(' '), function(word){

        var result = _.find(window.__BADWORDS, function(e){ return e == word.toLowerCase();});
        if(result){
          toReplace.push(word);
        }

      });

      _.each(toReplace, function(w){
        text = text.replace(w, '<strong class="color-red">' + w + '</strong>');
      });

      return text;

    }

    function _showVisibile(com){
      return com.is_enabled;
    }

    function _showBlocked(com){
      return !com.is_enabled;
    }

    function _showAlert(com){
      return !com.is_handled;
    }

    function _blocca(com){

      var data = {
        "id_article": _this.articleSelected._id,
        "is_enabled":false
      };

      if(com.cd_mastercode){
        data['id_master'] = com.cd_mastercode;
        data['id_child'] = com.cd_internalcode;
      }else{
        data['id_master'] = com.cd_internalcode;
      }

      Restangular
        .one(API.articles.comment.changestatus())
        .customPOST(data)
        .then(function(){

          com.is_enabled = false;
          com.is_handled = true;

          toastr.success('Il commento è stato bloccato');
        }, function(err){
          toastr.success('Il commento non è stato bloccato');
        });


    }
    function _visto(com){
      var data = {
        "id_article": _this.articleSelected._id,
        "is_enabled":com.is_enabled
      };

      if(com.cd_mastercode){
        data['id_master'] = com.cd_mastercode;
        data['id_child'] = com.cd_internalcode;
      }else{
        data['id_master'] = com.cd_internalcode;
      }

      Restangular
        .one(API.articles.comment.changestatus())
        .customPOST(data)
        .then(function(){
          com.is_handled = true;
          toastr.success('Il commento è stato segnato come visto');
        }, function(err){
          toastr.success('Il commento non è stato segnato come visto');
        });

    }
    function _visible(com){

      var data = {
        "id_article": _this.articleSelected._id,
        "is_enabled":true
      };

      if(com.cd_mastercode){
        data['id_master'] = com.cd_mastercode;
        data['id_child'] = com.cd_internalcode;
      }else{
        data['id_master'] = com.cd_internalcode;
      }

      Restangular
        .one(API.articles.comment.changestatus())
        .customPOST(data)
        .then(function(){
          com.is_enabled = true;
          com.is_handled = true;
          toastr.success('Il commento ora è visibile');
        }, function(err){
          toastr.success('Il commento non è stato reso visibile');
        });

    }
  }

})(window.angular);