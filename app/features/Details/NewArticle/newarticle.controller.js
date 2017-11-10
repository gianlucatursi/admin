(function(angular){
  "use strict";

  var controllers = angular.module('Smart.controllers');

  NewArticleController.$inject = ['$state', 'AdminService', 'ArticleService', 'toastr'];
  controllers.controller('NewArticleController', NewArticleController);

  function NewArticleController($state, AdminService, ArticleService, toastr){

    var _this = this;
    _this.user = AdminService.user;
    _this.city = AdminService.user.citySelected();
    _this.current_state = $state.current;
    _this.aToAdd = '';
    _this.hours_m = [];
    _this.hours_a = [];
    _this.categories = [];
    _this.current = {};
    _this.options = {
      saveWorking: ArticleService.working
    };

    if($state.current == $state.ROUTING.detailarticle){
      _initStatics(ArticleService.byId($state.params.id));
    }else{
      // new article
      _initStatics();
    }

    _this.save = _save;
    _this.delete = _delete;
    _this.stripHTMLCount = _stripHTMLCount;
    /**
     * Save channel
     * @private
     */
    function _save(){

      /*
      if(ArticleService.validate(_this.current, _this.current.isNew)){
        //valid
        if(_this.current.isNew){
          //create
       ArticleService
            .create(_this.current)
            .then(function(){
              $state.go($state.ROUTING.canali.name);
            }, function(){});
        }else{
          //update
            ArticleService
            .update(_this.current._id, _this.current)
            .then(function(){
              $state.go($state.ROUTING.canali.name);
            }, function(){});
        }

      }else{
        //not valid
      }
      */
    }

    /**
     * Delete channel
     * @private
     */
    function _delete(){

      /*
       ArticleService
        .delete(_this.current._id)
        .then(function(){
          $state.go($state.ROUTING.canali.name);
        }, function(){});
      */
    }

    /**
     * Init statics
     * @private
     */
    function _initStatics(toEdit){

      if(toEdit){
        _initEditArticle(toEdit);
      }else{
        _initNewArticle();
      }
    }

    /**
     * Init new channel
     * @private
     */
    function _initNewArticle(){
      _this.current = {
        isNew : true,
        abstract: '',
        title: '',
        description:'',
        is_event: false
      };
    }

    /**
     * init edit channel
     * @param channelToEdit
     * @private
     */
    function _initEditArticle(articleToEdit){

      _this.current = {
        _id: articleToEdit.id(),
        isNew : false
        /*
        isLocked: channelToEdit.isLocked(),
        name: channelToEdit.name(),
        authors: channelToEdit.authorList(),
        phone : channelToEdit.phonenumber(),
        category: channelToEdit.category(),
        website: channelToEdit.website(),
        email: channelToEdit.email(),
        username: channelToEdit.username(),
        password: channelToEdit.password(),
        address: channelToEdit.address(),
        isInserzionista: channelToEdit.isAdvertiser(),
        orari_specifici: orari_specifici,
        days: channelToEdit.openingHours()*/
      };
    }

    function _stripHTMLCount(html)
    {
      var tmp = document.createElement("DIV");
      tmp.innerHTML = html;
      return (tmp.textContent || tmp.innerText || "").length;
    }
  }

})(window.angular);