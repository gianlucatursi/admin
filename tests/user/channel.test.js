(function() {
  "use strict";

  var _DEFAULT_CHANNEL = {
    "_id" : "59f050d7bb9c9d1d68c7afde",
    "ds_name" : "ds_name",
    "cd_username" : "cd_username",
    "pw_password" : "pw_password",
    "ds_address" : "ds_address",
    "id_city" : "59e741b766d3d358d8fa67ba",
    "ds_phone" : "ds_phone",
    "ds_email" : "mail@communitysmart.it",
    "ds_website" : "http://www.communitysmart.it",
    "id_icon" : "id_icon",
    "dt_activation" : "2017-10-15T08:53:10.347Z",
    "ds_category" : "ds_category",
    "is_advertiser" : false,
    "is_locked" : false,
    "authors" : [
      "Autore1",
      "Autore2"
    ],
    "opening_hours" : [
      {
        "label" : "Lunedì",
        "open" : true,
        "morning" : {
          "start" : "08:30",
          "end" : "12:30"
        },
        "afternoon" : {
          "start" : "",
          "end" : ""
        }
      },
      {
        "open" : false,
        "label" : "Martedì",
        "morning" : {
          "start" : "",
          "end" : ""
        },
        "afternoon" : {
          "start" : "",
          "end" : ""
        }
      },
      {
        "open" : false,
        "label" : "Mercoledì",
        "morning" : {
          "start" : "",
          "end" : ""
        },
        "afternoon" : {
          "start" : "",
          "end" : ""
        }
      },
      {
        "open" : false,
        "label" : "Giovedì",
        "morning" : {
          "start" : "",
          "end" : ""
        },
        "afternoon" : {
          "start" : "",
          "end" : ""
        }
      },
      {
        "open" : false,
        "label" : "Venerdì",
        "morning" : {
          "start" : "",
          "end" : ""
        },
        "afternoon" : {
          "start" : "",
          "end" : ""
        }
      },
      {
        "open" : true,
        "label" : "Sabato",
        "morning" : {
          "start" : "07:00",
          "end" : "10:30"
        },
        "afternoon" : {
          "start" : "17:00",
          "end" : "01:00"
        }
      },
      {
        "open" : false,
        "label" : "Domenica",
        "morning" : {
          "start" : "",
          "end" : ""
        },
        "afternoon" : {
          "start" : "",
          "end" : ""
        }
      }
    ],
    "cd_privilege" : "CMS-ACCESS-CHANNEL"
  };

  describe('Channel model', function() {
    var ChannelModel;

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

    beforeEach(inject(function(_ChannelModel_) {
      ChannelModel = _ChannelModel_;
    }));

    it('should exist', function() {
      expect(ChannelModel).toBeDefined();
    });

    it('should be throw exception', function() {
      try{
        new ChannelModel();
        expect("NOT THROW EXCEPTION").toBeNull();
      }catch (e){
        expect(1).toBe(1);
      }
    });

    it('should be false isWorking after init', function(){
      var user = new ChannelModel({});
      expect(user.isWorking).toBeFalsy()
    });

    it('should have an _id', function() {

      var channel = new ChannelModel(_DEFAULT_CHANNEL);
      expect(channel.id()).toBe("59f050d7bb9c9d1d68c7afde");

    });

    it('should have an _id', function() {

      var channel = new ChannelModel(_DEFAULT_CHANNEL);
      expect(channel.id()).toBe("59f050d7bb9c9d1d68c7afde");

    });

    it('should have a name', function() {

      var channel = new ChannelModel(_DEFAULT_CHANNEL);
      expect(channel.name()).toBe("ds_name");

    });

    it('should have a correct authors', function() {

      var channel = new ChannelModel(_DEFAULT_CHANNEL);
      expect(channel.authorList().length).toBe(2);
      expect(channel.authorList()[0]).toBe('Autore1');
      expect(channel.authorList()[1]).toBe('Autore2');

    });

    it('should have a correct opening hours', function() {

      var channel = new ChannelModel(_DEFAULT_CHANNEL);
      var opening = channel.openHours();
      expect(opening.length).toBe(7);
      var days = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'];

      for(var i in opening){
        expect(opening[i].label).toBe(days[i]);
        expect(opening[i].open).toBeDefined(true);
        expect(opening[i].morning).toBeDefined(true);
        expect(opening[i].afternoon).toBeDefined(true);
      }
    });

    it('should have a category', function() {

      var channel = new ChannelModel(_DEFAULT_CHANNEL);
      expect(channel.category()).toBe("ds_category");

    });

    it('should have a iconImageUrl', function() {

      var channel = new ChannelModel(_DEFAULT_CHANNEL);
      expect(channel.iconImageUrl()).toBe("https://claudiaimages.azurewebsites.net/api/media/id_icon?w=128");

    });

    it('should have a address', function() {

      var channel = new ChannelModel(_DEFAULT_CHANNEL);
      expect(channel.address()).toBe("ds_address");

    });

    it('should have a website', function() {

      var channel = new ChannelModel(_DEFAULT_CHANNEL);
      expect(channel.website()).toBe('http://www.communitysmart.it');

    });

    it('should have a email', function() {

      var channel = new ChannelModel(_DEFAULT_CHANNEL);
      expect(channel.email()).toBe('mail@communitysmart.it');

    });

    it('should have a username', function() {

      var channel = new ChannelModel(_DEFAULT_CHANNEL);
      expect(channel.username()).toBe('cd_username');

    });

    it('should don\'t have a password', function() {

      var channel = new ChannelModel(_DEFAULT_CHANNEL);
      expect(channel.password()).toBe('');

    });

    it('should don\'t be an advertiser', function() {

      var channel = new ChannelModel(_DEFAULT_CHANNEL);
      expect(channel.isAdvertiser()).toBe(false);

    });

    it('should don\'t have locked', function() {

      var channel = new ChannelModel(_DEFAULT_CHANNEL);
      expect(channel.isLocked()).toBe(false);

    });

    it('should have a phonenumber', function() {

      var channel = new ChannelModel(_DEFAULT_CHANNEL);
      expect(channel.phonenumber()).toBe('ds_phone');

    });

  });
})();