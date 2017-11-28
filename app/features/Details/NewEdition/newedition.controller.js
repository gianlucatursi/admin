(function(angular){
  "use strict";

  var controllers = angular.module('Smart.controllers');

  NewEditionController.$inject = ['$state', 'AdminService', 'ChannelService', 'CategoryService', '$q', '$sce', 'UtilService', 'ArticleService', 'EdizioniService'];
  controllers.controller('NewEditionController', NewEditionController);

  function NewEditionController($state, AdminService, ChannelService, CategoryService, $q, $sce, UtilService, ArticleService, EdizioniService){

    var _this = this;
    _this.user = AdminService.user;
    _this.city = AdminService.user.citySelected();
    _this.channelService = ChannelService;
    _this.categoryService = CategoryService;

    _this.current_state = $state.current;
    _this.aToAdd = '';

    _this.categories = [];
    _this.categoriesToBe = [];
    _this.articles = [];
    _this.channels = [];

    var monthNames = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
      "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
    ];

    _this.channelSelected = {};
    _this.categorySelected = {};
    _this.periodoSelected = "";
    _this.dateSelected = null;
    _this.categoryToBe = {};

    _this.current = {};

    _this.articleByCategory = {};
    _this.coverArticles = [];


    _this.options = {
      saveWorking: ChannelService.working,
      deleteWorking: ChannelService.working,
      all: [],
      cover:[],
      articles: []
    };

    _initializeCollections();

    var _initEdition = function(){};

    if($state.current == $state.ROUTING.modifica_edizione){
      _initStatics(EdizioniService.byId($state.params.id));
    }else{
      // new channel
      _initStatics();
    }

    _this.saveDraft = _save;
    _this.delete = _delete;
    _this.getMediaUrl = _getMediaUrl;

    _this.onChangedChannel = _onChangedChannel;
    _this.onChangedCategory = _onChangedCategory;
    _this.onChangedPeriodo = _onChangedPeriodo;

    _this.deleteFromCategory = _deleteFromCategory;
    _this.aggiungiAEdizione = _aggiungiAEdizione;

    _this.allPosts = _allPosts;

    /*
    {
      cover: ["5a142c5f687be736244f303b"],
        articles:[{
          ids: ["5a142c5f687be736244f303b"],
          category: "59e6f9b566d3d358d8fa5b34"
        }]

    }
    */

    /**
     * Save channel
     * @private
     */
    function _save(){

      var __articlesToSend = [];
      _.each(_this.articleByCategory, function(elem){
        if('articles' in elem && elem.articles.length > 0){
          __articlesToSend.push({
            ids: _.pluck(elem.articles, "_id"),
            category: elem.category
          });
        }
      });

      if(EdizioniService.validate(_this.current, _this.current.isNew)){

        _this.current.articles = __articlesToSend;
        _this.current.cover = _this.coverArticles;

        //valid
        if(_this.current.isNew){
            //create
            EdizioniService
            .create(_this.current)
            .then(function(){
              $state.go($state.ROUTING.edizioni.name);
            }, function(){});
        }else{
            //update
            EdizioniService
            .update(_this.current._id, _this.current)
            .then(function(){
              $state.go($state.ROUTING.edizioni.name);
            }, function(){});
        }

      }else{
        //not valid
      }

    }

    /**
     * Delete channel
     * @private
     */
    function _delete(){

      ChannelService
        .delete(_this.current._id)
        .then(function(){
          $state.go($state.ROUTING.canali.name);
        }, function(){});

    }

    /**
     * Init statics
     * @private
     */
    function _initStatics(toEdit){

      _this.periodi = ['Ultimo giorno', 'Ultimi 3 giorni', 'Ultimi 7 giorni', 'Ultimi 30 giorni', 'Da sempre'];

      if(toEdit){
        _initEditChannel(toEdit);
      }else{
        //UtilService.options.newEditionDate
        _initNewChannel();
      }
    }
    /**
     * Init new channel
     * @private
     */
    function _initNewChannel(){

      _this.current = {
        isNew: true,
        articles: [],
        cover: []
      };

      var currentDate = new Date();
      if(_.isDate(UtilService.options.newEditionDate)){
        currentDate = UtilService.options.newEditionDate;
      }
      var month = monthNames[currentDate.getMonth()];
      _this.current.ds_title = "Edizione del " + currentDate.getDate() + " " + month + " " + currentDate.getFullYear();
      _this.current.dt_edition = currentDate;

    }

    /**
     * init edit channel
     * @param channelToEdit
     * @private
     */
    function _initEditChannel(channelToEdit){

      //channelToEdit.articles
      _this.current = {
        isNew: false,
        ds_title: channelToEdit.ds_title,
        dt_edition: channelToEdit.dt_edition,
        articles: [],
        cover: []
      };

      //_initEditEdition.bind(channelToEdit);
      //fixme: da fare dopo get articles
      //_initEditEdition(channelToEdit);
      _initEdition = __initEditEdition.bind(null, channelToEdit);
    }

    /**
     * Edit
     * @param channelToEdit
     * @private
     */
    function __initEditEdition(channelToEdit){

      _.each(channelToEdit.articles || [], function(category){

        if(!(category.category in _this.articleByCategory)){
          _this.articleByCategory[category.category] = {
            category: category.category,
            articles: []
          }
        }

        _.each(category.ids || [], function(art){
          _this.articleByCategory[category.category].articles.push(ArticleService.byId(art));
        });

      });

      _.each(channelToEdit.cover || [], function(art){
        _this.coverArticles.push(ArticleService.byId(art));
      });

    }

    function _getMediaUrl(media, s){
      if(media.type == 'IMAGE'){
        return UtilService.imageUrl(media.id_image, s);
      }else{
        return $sce.trustAsResourceUrl(media.video_url);
      }
    }

    function _onChangedChannel(){
      _applyFilters();
    }

    function _onChangedCategory(){
      _applyFilters();
    }

    function _onChangedPeriodo(){
      _applyFilters();
    }

    /**
     * Delete from category
     * @param _id
     * @private
     */
    function _deleteFromCategory(article){
      if(!_this.categoryToBe){
        return;
      }

      _this.articleByCategory[_this.categoryToBe._id].articles = _.without(_this.articleByCategory[_this.categoryToBe._id].articles, article);

    }

    /**
     * Aggiungi a edizione
     * @param article
     * @private
     */
    function _aggiungiAEdizione(article){
      if(_this.categoryToBe){

        if(_this.categoryToBe._id != article.id_category){
          var r = confirm("Stai cercando di inserire l'articolo in un'atra categoria. Vuoi proseguire?");
          if (r == true) {
            //change category article
          } else {
            // don't add
            return;
          }
        }

        if(!('articles' in _this.articleByCategory[_this.categoryToBe._id])){
          _this.articleByCategory[_this.categoryToBe._id] = { articles: [], category: _this.categoryToBe._id};
        }

        _this.articleByCategory[_this.categoryToBe._id].articles.push(article);
      }
    }

    function _allPosts(){

      return _.reduce(_this.articleByCategory, function(memo, category){
          return memo + (category.articles || []).length;
      }, 0);
    }

    function _applyFilters(){
      //article
      var filter = {};
      if(_this.channelSelected._id != ''){
        filter.id_channel = _this.channelSelected._id;
      }
      if(_this.categorySelected._id != ''){
        filter.id_category = _this.categorySelected._id;
      }

      if(_this.periodoSelected){
        var date = new Date();

        switch (_this.periodoSelected){
          case _this.periodi[0]: // ultimo giorno
            date.setDate(date.getDate()-1);
            break;

          case _this.periodi[1]:  // ultimi tre giorni
            date.setDate(date.getDate()-3);
            break;

          case _this.periodi[2]: // ultimi 7 giorni
            date.setDate(date.getDate()-7);
            break;

          case _this.periodi[3]: //ultimi 30 giorni
            date.setDate(date.getDate()-30);
            break;

          case _this.periodi[4]: //da sempre
            date = new Date("1970-01-01");
            break;

        }

        date.setHours(0, 0, 1, 0);
        if(_.isDate(date)){
          filter.dt_start = date;
        }
      }
      _this.articles = [];

      _getArticles(filter);

    }


    /**
     * Get channels
     * @private
     */
    function _getChannels(){

      var defer = $q.defer();

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

            defer.resolve();
          },
          function(){
            console.error("ERROR GETTING CHANNELS");
            defer.reject();
          }
        );

      return defer.promise;
    }

    function _initializeCollections(){

      CategoryService
        .get(true)
        .then(
          function(results){
            _this.categories = JSON.parse(JSON.stringify(results));
            _this.categoriesToBe = JSON.parse(JSON.stringify(results));

            _this.categories.unshift({
              id:'',
              ds_name:'Tutte le categorie'
            });

            if(_this.categories.length > 0){
              _this.categorySelected = _this.categories[0];
              _this.categoryToBe = _this.categoriesToBe[0];

              _.each(_this.categories, function(cat){
                _this.articleByCategory[cat._id] = {
                  articles: [],
                  category: cat._id
                };
              });
            }
          },
          function(){
            console.error("ERROR GETTING CHANNELS");
          }
        );

      _getChannels()
        .then(function(){

          if(AdminService.user.isRedazione()){
            _getArticles();
          }else{
            _getArticles({id_channel: AdminService.user.channelId()});
          }

        }, function(){});

      /*
      if(AdminService.user.isRedazione()){
        _getArticles();
      }else{
        _getArticles({id_channel: AdminService.user.channelId()});
      }
      */

    }

    function _getArticles(filters){

      ArticleService
        .get(filters || {})
        .then(
          function(results){
            _this.articles = ArticleService.toArray();
            //_this.options.pager.count = Math.ceil(_this.articles.length / _this.options.pager.limit);
            _initEdition();
            _initEdition = function(){};
          },
          function(){
            console.error("ERROR GETTING ARTICLES");
          }
        );

    }



  }

})(window.angular);