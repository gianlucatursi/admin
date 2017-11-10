(function(angular){
  "use strict";

  var controllers = angular.module('Smart.controllers');

  NewArticleController.$inject = ['$state', 'AdminService', 'ArticleService', 'ChannelService', 'toastr'];
  controllers.controller('NewArticleController', NewArticleController);

  function NewArticleController($state, AdminService, ArticleService, ChannelService, toastr){

    var _this = this;
    _this.user = AdminService.user;
    _this.city = AdminService.user.citySelected();
    _this.channelService = ChannelService;

    _this.current_state = $state.current;
    _this.hours = [];
    _this.categories = [];
    _this.current = {};
    _this.options = {
      saveWorking: ArticleService.working,
      channelSelected: null,
      authorSelected: '',
      channels: [],
      event:{
        isActive: false,
        place: '',
        when: [{
          date: null,
          start : '',
          end: ''
        }]
      }
    };

    _initialize();

    if($state.current == $state.ROUTING.detailarticle){
      _initStatics(ArticleService.byId($state.params.id));
    }else{
      // new article
      _initStatics();
    }

    _this.save = _save;
    _this.delete = _delete;
    _this.stripHTMLCount = _stripHTMLCount;
    _this.clearAuthor = _clearAuthor;
    _this.addDate = _addDate;
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
     * Init new channel
     * @private
     */
    function _initNewArticle(){
      _this.current = {
        isNew : true,
        abstract: '',
        title: '',
        description:'',
        event:{
          place: '',
          dates: []
        }
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

    /**
     *
     * @param html
     * @return {Number}
     * @private
     */
    function _stripHTMLCount(html)
    {
      var tmp = document.createElement("DIV");
      tmp.innerHTML = html;
      return (tmp.textContent || tmp.innerText || "").length;
    }

    /**
     *
     * @private
     */
    function _clearAuthor(){
      _this.options.authorSelected = '';
      //_this.options.authorSelected = (_this.options.channelSelected.authorList() || [])[0];
    }

    function _addDate(){

      _this.current.event.place = _this.options.event.place;
      /**
       * at the end!
      if(!_this.current.event.dates){
        _this.current.event.dates = [];
      }

      _this.current.event.dates.push(_this.options.event.when[_this.options.event.when.length-1]);
       **/

      _this.options.event.when.push({
        date: null,
        start: '',
        end: ''
      });

    }

    /**
     * Init data
     * @private
     */
    function _initialize(){

      //_this.options.channelSelected = ChannelService.byId(AdminService.user.channelId()) || {};

      if(!AdminService.user.isRedazione()){
        _this.options.channels = [_this.channelSelected];
      }else{
        _this.options.channels = ChannelService.toArray();
        //_this.options.channelSelected = _this.options.channels[0];
      }

      //_this.options.authorSelected = (_this.options.channelSelected.authorList() || [])[0];

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

      /** MORNING **/
      _this.hours = [
        "00:00",
        "00:30",
        "01:00",
        "01:30",
        "02:00",
        "02:30",
        "03:00",
        "03:30",
        "04:00",
        "04:30",
        "05:00",
        "05:30",
        "06:00",
        "06:30",
        "07:00",
        "07:30",
        "08:00",
        "08:30",
        "09:00",
        "09:30",
        "10:00",
        "10:30",
        "11:00",
        "11:30",
        "12:00",
        "12:30",
        "13:00",
        "13:30",
        "14:00",
        "14:30",
        "15:00",
        "15:30",
        "16:00",
        "16:30",
        "17:00",
        "17:30",
        "18:00",
        "18:30",
        "19:00",
        "19:30",
        "20:00",
        "20:30",
        "21:00",
        "21:30",
        "22:00",
        "22:30",
        "23:00",
        "23:30",
      ];
    }
  }

})(window.angular);