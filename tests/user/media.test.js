(function() {
  "use strict";

  var _DEFAULT_MEDIA = {
    "_id" : "5a0ec19d9fff7e2f50db97fc",
    "type" : "IMAGE",
    "id_channel" : "59f050f6bb9c9d1d68c7afdf",
    "id_city" : "59e741b766d3d358d8fa67ba",
    "id_image" : "5a0ec19e33a95b7428ac93dd",
    "video_url" : "",
    "is_enabled" : true,
    "dt_insert" : new Date("2017-11-17T11:01:49.961Z"),
    "ds_description" : "descr",
    "tags" : "tags2,tags1"
  };

  describe('Media model', function() {
    var MediaModel;

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

    beforeEach(inject(function(_MediaModel_) {
      MediaModel = _MediaModel_;
    }));

    it('should exist', function() {
      expect(MediaModel).toBeDefined();
    });

    it('should be throw exception', function() {
      try{
        new MediaModel();
        expect("NOT THROW EXCEPTION").toBeNull();
      }catch (e){
        expect(1).toBe(1);
      }
    });

    it('should be false isWorking after init', function(){
      var media = new MediaModel({});
      expect(media.isWorking).toBeFalsy()
    });

    it('should have an _id', function() {

      var media = new MediaModel(_DEFAULT_MEDIA);
      expect(media.identifier()).toBe("5a0ec19d9fff7e2f50db97fc");

    });

    it('should be an image', function() {

      var media = new MediaModel(_DEFAULT_MEDIA);
      expect(media.mediaType()).toBe("IMAGE");
    });

    it('should have a description', function() {

      var media = new MediaModel(_DEFAULT_MEDIA);
      expect(media.getDescription()).toBe("descr");
    });

    it('should don\'t have a media url because is IMAGE', function(){
      var media = new MediaModel(_DEFAULT_MEDIA);
      expect(media.mediaUrl()).toBeUndefined();
    });

    it('should be an IMAGE', function(){
      var media = new MediaModel(_DEFAULT_MEDIA);
      expect(media.isVideo()).toBe(false);
    });

    it('should have tags well formatted', function(){
      var media = new MediaModel(_DEFAULT_MEDIA);
      expect(media.getTags()).toBe('tags2,tags1');
    })

  });
})();