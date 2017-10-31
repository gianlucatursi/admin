(function(angular){
  "use strict";

  var controllers = angular.module('Smart.controllers');

  ContenutiController.$inject = ['$state', 'EventBus', 'AdminService', 'ArticleService', 'ChannelService', 'CategoryService'];
  controllers.controller('ContenutiController', ContenutiController);

  function ContenutiController($state, EventBus, AdminService, ArticleService, ChannelService, CategoryService){

    var _this = this;
    _this.user = AdminService.user;
    _this.city = AdminService.user.citySelected();

    _this.options = {
      articleWorking: ArticleService.working
    };

    _this.current_state = $state.current;
    _this.articles = [];
    _this.channelSelected = {};
    _this.channels = [];


    _this.categorySelected = {};
    _this.categories = [];

    _this.applyFilters = _applyFilters;

    _initializeCollections();

    /**
     * Filter function
     * @return {*}
     * @private
     */
    function _applyFilters(){
      //article
      var filter = {};
      if(_this.channelSelected._id != ''){
        filter.id_channel = _this.channelSelected._id;
      }
      if(_this.categorySelected._id != ''){
        filter.id_category = _this.categorySelected._id;
      }

      _this.articles = [];

      _getArticles(filter.id_channel, filter.id_category);

    }
    /**
     * Initialize collections
     * @private
     */
    function _initializeCollections(){

      CategoryService
        .get()
        .then(
          function(results){
            _this.categories = results;
            if(_this.categories.length > 0){
              _this.categorySelected = _this.categories[0];
            }
          },
          function(){
            console.error("ERROR GETTING CHANNELS");
          }
        );

      _getChannels();

      if(AdminService.user.isRedazione()){
        _getArticles();
      }else{
        if(AdminService.user.isRedazione()){
          _getArticles(AdminService.user.channelId());
        }
      }

    }

    /**
     * Get article
     * @private
     */
    function _getArticles(channel_id, category_id){

      ArticleService
        .get(channel_id, category_id)
        .then(
          function(results){
            _this.articles = ArticleService.toArray();
          },
          function(){
            console.error("ERROR GETTING ARTICLES");
          }
        );

    }

    /**
     * Get channels
     * @private
     */
    function _getChannels(){

      ChannelService
        .get()
        .then(
          function(results){

            _this.channels = ChannelService.toArray();
            (_this.channels || []).unshift({
              ds_name: 'Tutti i canali',
              _id: ''
            });

            if(!AdminService.user.isRedazione()){
              _this.channelSelected = ChannelService.byId(AdminService.user.channelId());
              _this.channels = [_this.channelSelected];
            }else{
              _this.channelSelected = _this.channels[0];
            }
          },
          function(){
            console.error("ERROR GETTING CHANNELS");
          }
        );
    }
  }

})(window.angular);