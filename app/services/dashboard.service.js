(function (angular) {
  "use strict";

  var services = angular.module('Smart.services');

  DashboardService.$inject = ['Restangular', 'AdminService', '$q', 'API', '$transitions', '$state'];
  services.service('DashboardService', DashboardService);

  function DashboardService(Restangular, AdminService, $q, API) {

    var _that = this;
    _that.options = {
      isWorking: false,
      loaded: false
    };

    _that.stats = {
      platform: {},
      channel:{},
      alerts : []
    };

    _get();
    _that.allStats = _allStats;

    //////////////////////////////////
    /////////// PROTOTYPES ///////////
    //////////////////////////////////

    _that.get = _get;
    _that.alerts = _alerts;
    _that.byId  = _byId;


    //////////////////////////////////
    /////////// FUNCTIONS ////////////
    //////////////////////////////////

    function _allStats(){
      return _that.stats;
    }

    /**
     * Get city list
     * @private
     */
    function _get(_options, isPlatform){
      var defer = $q.defer();

      _options = _options || {};

      var filters = {
        id_city: AdminService.user.cityId()
      };
      if(!AdminService.user.isRedazione()){
        filters.id_channel = _options.id_channel || AdminService.user.channelId();
      }else if('id_channel' in _options){
        filters.id_channel = _options.id_channel;
      }

      Restangular
        .one(API.dashboard.stats({}, filters))
        .get()
        .then(
          function(result){

            _that.options.loaded = true;

            _that.stats[isPlatform?'platform' : 'channel']['total_users'] = result.total_users; // only platfrm
            _that.stats[isPlatform?'platform' : 'channel']['total_articles'] = result.total_articles;
            _that.stats[isPlatform?'platform' : 'channel']['total_likes'] = result.total_likes;
            _that.stats[isPlatform?'platform' : 'channel']['total_comments'] = result.total_comments;
            _that.stats[isPlatform?'platform' : 'channel']['total_views'] = result.total_views;
            _that.stats[isPlatform?'platform' : 'channel']['total_posts'] = result.total_posts;
            _that.stats[isPlatform?'platform' : 'channel']['total_events'] = result.total_events;
            _that.stats[isPlatform?'platform' : 'channel']['total_articles'] = result.total_articles;
            _that.stats[isPlatform?'platform' : 'channel']['total_channel_followers'] = result.total_channel_followers; // only channel

            defer.resolve(result);
          },
          function(error){
            defer.reject(new Error("CATEGORIES FAILED"));
          }
        );


      return defer.promise;

    }

    function _alerts(_options){

      var defer = $q.defer();

      _options = _options || {};

      var filters = {
        id_city: AdminService.user.cityId()
      };
      if(!AdminService.user.isRedazione()){
        filters.id_channel = _options.id_channel || AdminService.user.channelId();
      }else if('id_channel' in _options){
        filters.id_channel = _options.id_channel;
      }

      Restangular
        .one(API.dashboard.alerts({}, filters))
        .get()
        .then(
          function(results){

            _that.options.loaded = true;
            _that.stats.alerts = results.alerts || [];

            defer.resolve(results);
          },
          function(error){
            defer.reject(new Error("CATEGORIES FAILED"));
          }
        );


      return defer.promise;

    }
    /**
     * Get by id
     * @param _id
     * @return {*}
     * @private
     */
    function _byId(_id){
      return _.find(_that.list, {_id: _id});
    }

    /** return service **/
    return this;

  }

})(window.angular);