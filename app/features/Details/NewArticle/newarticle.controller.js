(function(angular){
  "use strict";

  var controllers = angular.module('Smart.controllers');

  NewArticleController.$inject = ['$state', 'AdminService', 'ArticleService', 'ChannelService', 'CategoryService', 'UtilService', '$uibModal', 'MediaService', '$sce', 'toastr'];
  controllers.controller('NewArticleController', NewArticleController);

  function NewArticleController($state, AdminService, ArticleService, ChannelService, CategoryService, UtilService, $uibModal, MediaService, $sce, toastr){

    var _this = this;
    _this.user = AdminService.user;
    _this.city = AdminService.user.citySelected();
    _this.channelService = ChannelService;
    _this.categoryService = CategoryService;

    _this.current_state = $state.current;
    _this.hours = [];
    _this.categories = [];
    _this.current = {};
    _this.imagesOptions = {
      gallery: [],
      cover : null
    };

    _this.options = {
      categorySelected: null,
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
      },
      program: null
    };

    var _mediaModalInstance;
    var _publishModalInstance;

    _initialize();

    if($state.current == $state.ROUTING.detailarticle){
      _initStatics(ArticleService.byId($state.params.id));
    }else{
      // new article
      _initStatics();
    }

    //_this.save = _save;
    _this.saveDraft = _saveDraft;
    _this.publish = _publish;
    _this.delete = _delete;
    _this.covertToDraft = _covertToDraft;

    _this.stripHTMLCount = _stripHTMLCount;
    _this.clearAuthor = _clearAuthor;
    _this.addDate = _addDate;
    _this.deleteWhen = _deleteWhen;
    _this.openCoverImage = _openCoverImage;
    _this.openGalleryImage = _openGalleryImage;
    _this.getMediaUrl = _getMediaUrl;

    _this.deleteCover = _deleteCover;
    _this.deleteGallery = _deleteGallery;
    _this.openPublishProgram = _openPublishProgram;

    _this.todayDate = function(){ return new Date(); };

    function _openPublishProgram(){

      if(_this.current.is_published){
        var data = _this.current.dt_publication_date;
        var string = data.getUTCHours() + ":" + data.getUTCMinutes();

        ArticleService._modalOptions.programSelected = {
          dateSelected: data,
          oraSelected: string
        };

      }

      _publishModalInstance = $uibModal.open({
        animation: true,
        component: 'publishModal',
        size: 'lg'
      });

      _publishModalInstance.result.then(function (selectedProgram) {
        _this.options.program = selectedProgram;
      }, function (result) {
        if(result == 'delete'){
          _this.options.program = null;
        }
      });

    }

    function _openCoverImage(){

      MediaService._modalOptions.isGallery = false;
      MediaService._modalOptions.isMediaView = false;

      _mediaModalInstance = $uibModal.open({
        animation: true,
        component: 'mediaModal',
        size: 'lg'
      });

      _mediaModalInstance.result.then(function (selectedItem) {
        //_this.selected = selectedItem;
        _this.imagesOptions.cover = selectedItem;
      }, function () {
        console.log('modal-component dismissed at: ' + new Date());
      });


    }

    /**
     * Get media url
     * @param media
     * @return {*}
     * @private
     */
    function _getMediaUrl(media, s){
      if(media.type == 'IMAGE'){
        return UtilService.imageUrl(media.id_image, s);
      }else{
        return $sce.trustAsResourceUrl(media.video_url);
      }
    }

    function _deleteCover(){
      _this.imagesOptions.cover = null;
    };

    function _deleteGallery(_index){
      _this.imagesOptions.gallery = _this.imagesOptions.gallery || [];
      _this.imagesOptions.gallery.splice(_index, 1);
    };


    function _openGalleryImage(){

      MediaService._modalOptions.isGallery = true;
      MediaService._modalOptions.isMediaView = false;

      _mediaModalInstance = $uibModal.open({
        animation: true,
        component: 'mediaModal',
        size: 'lg'
      });

      _mediaModalInstance.result.then(function (selectedItem) {
        _this.imagesOptions.gallery.push(selectedItem);

      }, function () {
        console.log('modal-component dismissed at: ' + new Date());
      });


    }
    /**
     * Save channel
     * @private
     */
    function _saveDraft(toPublish, toDate, toDraft){

      if(!_this.options.channelSelected){

        toastr.error('Devi selezionare un canale per poter proseguire', 'Modifica contenuto');
        return;
      }

      if(!_this.options.categorySelected._id){
        toastr.error('Devi selezionare una categoria per poter proseguire', 'Modifica contenuto');
        return;
      }

      if(!_this.options.authorSelected){

        toastr.error('Devi selezionare un autore per poter proseguire', 'Modifica contenuto');
        return;
      }

      if(ArticleService.validate(_this.current, _this.current.isNew)){
        //valid

        //create
        _this.current.is_published =  toPublish == true ? toPublish : false;
        _this.current.id_channel = _this.options.channelSelected._id;
        _this.current.id_category = _this.options.categorySelected._id;
        _this.current.ds_author = _this.options.authorSelected;

        if(toPublish){
          _this.current.dt_publication_date = toDate;
        }

        if(toDraft){
          _this.current.dt_publication_date = null;
          _this.current.is_published = false;
        }

        if(_this.imagesOptions.cover){
          if(_this.imagesOptions.cover.type == 'IMAGE'){
            _this.current.image_cover = {
              type : _this.imagesOptions.cover.type,
              id_image: _this.imagesOptions.cover.id_image

            };
          }else{
            _this.current.image_cover = {
              type : _this.imagesOptions.cover.type,
              video_url: _this.imagesOptions.cover.video_url

            };
          }
        }

        _this.current.image_gallery = [];

        _.each((_this.imagesOptions.gallery || []), function(img_g){
          _this.current.image_gallery.push(img_g.id_image);
        });

        if(_this.options.event && _this.options.event.when.length > 0 && _this.options.event.when[0].start != ""){
          _this.current.event = {
            place: _this.options.event.place,
            dates:[]
          };
          _this.current.is_event = true;
          _this.current.event.dates = _createDates();
        }else{
          _this.current.is_event = false;
        }


        if(_this.current.isNew){
         ArticleService
              .create(_this.current)
              .then(function(){
                $state.go($state.ROUTING.contenuti.name);
              }, function(){});
          }else{
            //update
              ArticleService
              .update(_this.current._id, _this.current)
              .then(function(){
                $state.go($state.ROUTING.contenuti.name);
              }, function(){});
          }

        }else{
        //not valid
      }

    }

    function _publish(){

      var data = '';

      if(_this.options.program){

        data = new Date(_this.options.program.dateSelected);
        var oraList = (_this.options.program.oraSelected || '').split(':');

        data.setHours((parseInt(oraList[0])));
        data.setMinutes(parseInt(oraList[1]));

        data = createDateAsUTC(data);


      }else{
        data = new Date();
      }

      if(_this.current.isNew){
        _saveDraft(true, data);
      }else{
        _this.current.dt_publication_date = createDateAsUTC(data);
        _this.current.is_published = true;

        _saveDraft(true, data);

        /*
        ArticleService
          .update(_this.current._id, )
          .then(
            function(){
              $state.go($state.ROUTING.contenuti.name);
            },
            function(){
              $state.go($state.ROUTING.contenuti.name);
            }
          )
          */
      }
    }

    /**
     * Delete channel
     * @private
     */
    function _delete(){

       ArticleService
        .delete(_this.current._id)
        .then(function(){
          $state.go($state.ROUTING.contenuti.name);
        }, function(){});
    }

    function _covertToDraft(){
      _saveDraft(false, null, true);
    }
    /**
     * Init new channel
     * @private
     */
    function _initNewArticle(){
      _this.current = {
        isNew : true,
        is_published: false,
        ds_abstract: '',
        ds_title: '',
        ds_description:'',
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

      _this.imagesOptions.gallery = [];

      _this.options.channelSelected = ChannelService.byId(articleToEdit.channelId());
      _this.options.categorySelected = CategoryService.byId(articleToEdit.categoryId());
      _this.options.authorSelected = articleToEdit.authorName();
      //_this.options.categorySelected

      _this.imagesOptions.cover = articleToEdit.coverMedia();
      _.each(articleToEdit.gallery(), function(g_id){
        _this.imagesOptions.gallery.push({
          type: 'IMAGE',
          id_image: g_id
        });
      });

      if(articleToEdit.isEvent()){
        _this.options.event = _convertEvent(articleToEdit.eventInfos());
        _this.options.event.isActive = true;
      }


      _this.current = {
        _id: articleToEdit.identifier(),
        isNew : false,
        is_published: articleToEdit.isPublished(),
        ds_abstract: articleToEdit.abstract(),
        ds_title: articleToEdit.title(),
        ds_description: articleToEdit.description(),
        isReported: articleToEdit.isReported(articleToEdit),
        dt_publication_date: articleToEdit.publishDate(),
        updatedAt: createDateAsUTC(new Date(articleToEdit.timeInfo.dt_lastUpdated))
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

    function _convertEvent(ev){

      _this.options.event = {
        place : ev.place,
        when: []
      };


      _.each(ev.dates || [], function(dat){

        var dataStart = convertDateToUTC(new Date(dat.dt_start));
        var dataEnd = convertDateToUTC(new Date(dat.dt_end));

        var startHour = "" + dataStart.getHours() + ":" + dataStart.getMinutes();
        var endHour = "" + dataEnd.getHours() + ":" + dataEnd.getMinutes();

        _this.options.event.when.push({
          date: dataStart,
          start: startHour,
          end: endHour
        });

      });

      return _this.options.event;
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

      //_this.current.event.place = _this.options.event.place;
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
     * Remove dates
     * @param index
     * @private
     */
    function _deleteWhen(index){

      if(index == _this.options.event.when.length-1){
        _this.options.event.when[index] = {
          date: null,
          start: '',
          end: ''
        };

      }else{
        _this.options.event.when.splice(index, 1);
      }
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

    function _createDates(){
      var list = [];

      _.each(_this.options.event.when, function(w){

        var start = new Date(w.date);
        var end = new Date(w.date);
        var listStart = (w.start || '').split(':');
        var listEnd = (w.end || '').split(':');

        start.setHours((parseInt(listStart[0])));
        start.setMinutes(parseInt(listStart[1]));

        end.setHours((parseInt(listEnd[0])));
        end.setMinutes(parseInt(listEnd[1]));

        start = createDateAsUTC(start);
        end = createDateAsUTC(end);

        list.push({
          dt_start: start,
          dt_end: end
        });
      });

      return list;
    }

    function createDateAsUTC(date) {
      return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
    }

    function convertDateToUTC(date) {
      return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
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