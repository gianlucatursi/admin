(function() {
  "use strict";

  describe('Article model', function() {
    var ArticleModel;

    beforeEach(angular.mock.module('Smart.models'));

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

    it('should be correctly initialized', function(){
      var article = new ArticleModel({
        "_id": "_id",
        "ds_abstract": "ds_abstract",
        "ds_title": "ds_title",
        "ds_description": "ds_description",
        "dt_publication_date": "dt_publication_date",
        "id_category": "id_category",
        "id_channel": "id_channel",
        "id_city": "id_city",
        "is_deleted": "is_deleted",
        "event": "event",
        "event.place": "event.place",
        "event.dates": "event.dates",
        "event.dates.dt_start": "event.dates.dt_start",
        "event.dates.dt_end": "event.dates.dt_end",
        "cover_media": "cover_media",
        "cover_media.type": "cover_media.type",
        "cover_media.id_image": "cover_media.id_image",
        "image_gallery": "image_gallery",
        "comments": "comments",
        "likes": "likes"
      });

      expect(article.ds_name).toBe('Gianluca');
      expect(article.ds_surname).toBe('Tursi');
      expect(article.token).toBe('123');

      article = new ArticleModel({});
      expect(article.ds_name).toBeUndefined();
      expect(article.ds_surname).toBeUndefined();
      expect(article.token).toBeUndefined();

      // set function
      article.set({
        ds_name: 'Gianluca',
        ds_surname: 'Tursi',
        token: '123'
      });

      expect(article.ds_name).toBe('Gianluca');
      expect(article.ds_surname).toBe('Tursi');
      expect(article.token).toBe('123');

    });


  });
})();