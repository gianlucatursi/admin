(function(angular){
  "use strict";

  var controllers = angular.module('Smart.controllers');

  ContenutiController.$inject = ['$state', 'EventBus', 'AdminService', 'ArticleService', 'ChannelService', 'CategoryService'];
  controllers.controller('ContenutiController', ContenutiController);

  function ContenutiController($state, EventBus, AdminService, ArticleService, ChannelService, CategoryService){

    var _this = this;
    _this.user = AdminService.user;
    _this.city = AdminService.user.citySelected();
    _this.channelService = ChannelService;
    _this.categoryService = CategoryService;
    _this.adminService = AdminService;

    _this.options = {
      articleWorking: ArticleService.working,
      textToSearch: '',
      searchWorking: false,
      pager:{
        isopen: false,
        active: 1,
        count: 1,
        limit: 5
      }
    };

    _this.current_state = $state.current;
    _this.articles = [];
    _this.channelSelected = {};
    _this.dateSelected = null;
    _this.channels = [];


    _this.categorySelected = {};
    _this.categories = [];

    _this.applyFilters = _applyFilters;
    _this.searchText = _searchText;
    _this.generatePages = _generatePages;
    _this.changePage = _changePage;
    _this.gotoDetail = _gotoDetail;

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

      if(_.isDate(_this.dateSelected)){
        filter.dt_start = _this.dateSelected;
        filter.dt_start.setHours(0, 0, 1, 0);
      }
      _this.articles = [];

      _getArticles(filter);

    }

    function _searchText(){

      _this.articles = [];
      _this.options.searchWorking = true;

      if(_this.options.textToSearch == ''){
        _this.options.searchWorking = false;
        return _applyFilters();
      }

      ArticleService
        .search(_this.options.textToSearch)
        .then(
          function(results){
            _this.options.searchWorking = false;
            _this.articles = ArticleService.toArray();
          },
          function(err){
            _this.options.searchWorking = false;
            console.error("ERROR GETTING ARTICLES");
          }
        );

    }

    function _generatePages(){
      return _.range(1,_this.options.pager. q+1);
    }

    function _changePage(pnum){
      _this.options.pager.active = pnum;
    }

    function _gotoDetail(art){
      $state.go($state.ROUTING.detailarticle.name, {id: art.id()});
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
        _getArticles({id_channel: AdminService.user.channelId()});
      }

    }

    /**
     * Get article
     * @private
     */
    function _getArticles(filters){

      ArticleService
        .get(filters || {})
        .then(
          function(results){
            _this.articles = ArticleService.toArray();
            _this.options.pager.count = Math.ceil(_this.articles.length / _this.options.pager.limit);
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