(function() {
  "use strict";

  var _DEFAULT_ARTICLE = {
    "_id" : "5a142c5f687be736244f303b",
    "ds_abstract" : "ds_abstract",
    "ds_title" : "ds_title",
    "ds_description" : "ds_description",
    "ds_author" : "ds_author",
    "dt_publication_date" : "2017-11-21T13:38:39.679Z",
    "id_category" : "59e6f9bf66d3d358d8fa5b38",
    "id_channel" : "59f050f6bb9c9d1d68c7afdf",
    "id_city" : "59e741b766d3d358d8fa67ba",
    "is_deleted" : false,
    "image_gallery" : [],
    "comments" : [],
    "views": 10,
    "likes" : [],
    "is_event" : false,
    "timeInfo" : {
      "_t" : "TimeInfo",
      "dt_creationDate" : "2017-11-21T13:38:39.679Z",
      "dt_lastUpdated" : "2017-11-21T13:38:39.679Z"
    },
    "is_enabled" : true,
    "isNew" : false,
    "is_published" : true,
    "image_cover" : {
      "type" : "VIDEO",
      "video_url" : "https://vimeo.com/243281403"
    }
  };

  var _DEFAULT_COMMENTS = [
    {
      "ds_name" : "Alex",
      "ds_surname" : "Andrii",
      "ds_comment" : "Vaffanculo, questo articolo fa schifo!",
      "is_enabled" : true,
      "is_robot" : true,
      "cd_internalcode" : "5eb4b10e-c5a8-4c9f-b219-801251f18293",
      "dt_comment" : "2017-11-21T13:49:38.459Z",
      "replies" : [
        {
          "ds_name" : "Gianluca",
          "ds_surname" : "Tursi",
          "ds_comment" : "Questo commento fa schifo!",
          "is_blocked" : true,
          "is_enabled" : false,
          "is_robot" : true,
          "cd_internalcode" : "963db1c2-7f10-4dd7-87f3-6c5d465b1bb3",
          "dt_comment" : "2017-11-21T13:50:24.274Z",
          "cd_mastercode" : "5eb4b10e-c5a8-4c9f-b219-801251f18293",
          "reports" : [
            {
              "id_master" : "5eb4b10e-c5a8-4c9f-b219-801251f18293",
              "id_child" : "963db1c2-7f10-4dd7-87f3-6c5d465b1bb3",
              "ds_name" : "Gianluca",
              "ds_surname" : "Tursi",
              "is_handled" : false,
              "dt_report" : "2017-11-21T13:52:59.526Z"
            }
          ],
          "is_handled" : false
        }
      ],
      "is_handled" : false
    }
  ];


  describe('Article model', function() {
    var ArticleModel;

    beforeEach(angular.mock.module('Smart.models'));
    beforeEach(angular.mock.module('Smart.services'));
    beforeEach(angular.mock.module('Smart.directives'));
    beforeEach(angular.mock.module('restangular'));
    beforeEach(angular.mock.module('ui.router'));

    var API, RESTANGULAR, STATE, UTILSSERVICE;
    beforeEach(inject(function (_Restangular_) {
      RESTANGULAR = _Restangular_;
    }));

    beforeEach(inject(function (_UtilService_) {
      UTILSSERVICE = _UtilService_;
    }));

    beforeEach(inject(function (_$state_) {
      STATE = _$state_;
    }));

    beforeEach(inject(function (_API_) {
      API = _API_;
    }));

    beforeEach(inject(function(_ArticleModel_) {
      ArticleModel = _ArticleModel_;
    }));

    it('should exist', function() {
      expect(ArticleModel).toBeDefined();
    });

    it('should be throw exception', function() {
      try{
        new ArticleModel();
        expect("NOT THROW EXCEPTION").toBeNull();
      }catch (e){
        expect(1).toBe(1);
      }
    });

    it('should be false isWorking after init', function(){
      var user = new ArticleModel({});
      expect(user.isWorking).toBeFalsy()
    });

    it('should have an _id', function(){

      var article = new ArticleModel(_DEFAULT_ARTICLE);
      expect(article.identifier()).toBe("5a142c5f687be736244f303b");

    });

    it('should have an abstract', function(){

      var article = new ArticleModel(_DEFAULT_ARTICLE);
      expect(article.abstract()).toBe("ds_abstract");

    });

    it('should have an title', function(){

      var article = new ArticleModel(_DEFAULT_ARTICLE);
      expect(article.title()).toBe("ds_title");

    });

    it('should have an description', function(){

      var article = new ArticleModel(_DEFAULT_ARTICLE);
      expect(article.description()).toBe("ds_description");

    });

    it('should have an publication date', function(){

      var article = new ArticleModel(_DEFAULT_ARTICLE);
      expect(article.publishDate() instanceof Date).toBe(true);

    });


    it('should have an category id', function(){

      var article = new ArticleModel(_DEFAULT_ARTICLE);
      expect(article.categoryId()).toBe("59e6f9bf66d3d358d8fa5b38");

    });


    it('should have an channel id', function(){

      var article = new ArticleModel(_DEFAULT_ARTICLE);
      expect(article.channelId()).toBe("59f050f6bb9c9d1d68c7afdf");

    });

    it('should have an city id', function(){

      var article = new ArticleModel(_DEFAULT_ARTICLE);
      expect(article.cityId()).toBe("59e741b766d3d358d8fa67ba");

    });

    it('should be active', function(){

      var article = new ArticleModel(_DEFAULT_ARTICLE);
      expect(article.isDeleted()).toBe(false);

    });

    it('should don\'t be an event', function(){

      var article = new ArticleModel(_DEFAULT_ARTICLE);
      expect(article.isEvent()).toBe(false);

    });

    it('should have an author', function(){

      var article = new ArticleModel(_DEFAULT_ARTICLE);
      expect(article.authorName()).toBe("ds_author");

    });

    it('should have an cover media', function(){

      var article = new ArticleModel(_DEFAULT_ARTICLE);
      expect(article.coverMedia()).toBe(article.image_cover);

    });

    it('should have views', function(){

      var article = new ArticleModel(_DEFAULT_ARTICLE);
      expect(article.viewsCounter()).toBe(10);

    });

    it('should be published', function(){

      var article = new ArticleModel(_DEFAULT_ARTICLE);
      expect(article.isPublished()).toBe(true);

    });

    it('should not be reported', function(){

      var article = new ArticleModel(_DEFAULT_ARTICLE);
      expect(article.isReported()).toBe(false);

    });


    it('Should comments analysis work', function(){
      /******** try comments *******/
      var article = new ArticleModel(_DEFAULT_ARTICLE);
      article.set({
        comments:_DEFAULT_COMMENTS
      });

      expect(article.commentList().length).toBeDefined();
      expect(article.commentsCount()).toBe(2);
      expect(article.commentsReportedCount()).toBe(1);
      expect(article.commentsReportedCount()).toBe(1);

      expect(article.__toAlert).toBeDefined();
      expect(article.__commentsList).toBeDefined();
      expect(article.__commentsList).toBeDefined();
      expect(article.__reportedCount).toBeDefined();
      expect(article.__commentsCount).toBeDefined();

      expect(article.isReported()).toBe(true);
    });

    it('Should empty article', function(){
      /***** try empty article **/
      var article = new ArticleModel({});

      expect(article.ds_name).toBeUndefined();
      expect(article.ds_surname).toBeUndefined();
      expect(article.token).toBeUndefined();

    })

  });
})();