(function() {
  "use strict";

  var _DEFAULT_EDITION = {
    "_id" : "5a1c2e78e50dd93904db94b8",
    "ds_title" : "Edizione del 30 Novembre 2017",
    "dt_edition" : new Date("2017-11-30T01:00:01.000Z"),
    "id_city" : "59e741b766d3d358d8fa67ba",
    "cover" : [
      "5a13f6d386f2a82b34294224"
    ],
    "articles" : [
      {
        "ids" : [
          "5a13f6d386f2a82b34294224",
          "5a1d1771440fe23b7c90b9c9"
        ],
        "category" : "59e6f9a966d3d358d8fa5b24"
      },
      {
        "ids" : [
          "5a142c5f687be736244f303b"
        ],
        "category" : "59e6f9b566d3d358d8fa5b34"
      }
    ],
    "authorized" : true,
    "is_enabled" : true,
    "dt_creation" : new Date("2017-11-27T15:25:44.583Z"),
  };

  describe('Edition model', function() {
    var EdizioniModel;

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

    beforeEach(inject(function(_EdizioneModel_) {
      EdizioniModel = _EdizioneModel_;
    }));

    it('should exist', function() {
      expect(EdizioniModel).toBeDefined();
    });

    it('should be throw exception', function() {
      try{
        new EdizioniModel();
        expect("NOT THROW EXCEPTION").toBeNull();
      }catch (e){
        expect(1).toBe(1);
      }
    });

    it('should be false isWorking after init', function(){
      var edizione = new EdizioniModel({});
      expect(edizione.isWorking).toBeFalsy()
    });

    it('should have an _id', function() {

      var edizione = new EdizioniModel(_DEFAULT_EDITION);
      expect(edizione._id).toBe("5a1c2e78e50dd93904db94b8");

    });

    it('should have a name', function() {

      var edizione = new EdizioniModel(_DEFAULT_EDITION);
      expect(edizione.name()).toBe("Edizione del 30 Novembre 2017");

    });

    it('should be autorized', function(){

      var edizione = new EdizioniModel(_DEFAULT_EDITION);
      expect(edizione.status()).toBe(true);

    });

    it('should have 3 post', function(){

      var edizione = new EdizioniModel(_DEFAULT_EDITION);
      expect(edizione.postNumber()).toBe(3);

    });
  });
})();