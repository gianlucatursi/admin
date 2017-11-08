(function (angular) {
  "use strict";

  var services = angular.module('Smart.services');

  UtilService.$inject = [];
  services.service('UtilService', UtilService);

  function UtilService() {

    var _this = this;

    _this.generatePassword = _genPSW;


    function _genPSW(psw){
      return CryptoJS.SHA256(psw).toString(CryptoJS.enc.Base64);
    }

    /** return service **/
    return this;

  }

})(window.angular);