(function (angular) {
  "use strict";

  var services = angular.module('Smart.services');

  UtilService.$inject = [];
  services.service('UtilService', UtilService);

  function UtilService() {

    var _this = this;

    _this.options = {
      newEditionDate :null
    };

    _this.generatePassword = _genPSW;
    _this.uploadImageUrl = _uploadImageUrl;
    _this.imageUrl = _imageUrl;

    function _genPSW(psw){
      return CryptoJS.SHA256(psw).toString(CryptoJS.enc.Base64);
    }

    function _uploadImageUrl(){
      return 'https://claudiaimages.azurewebsites.net/api/users/5a059de2443979eb1e266f28/projects/5a05b760045c15349d78f61d/images'
    }

    function _imageUrl(id, size){
      var param = '';
      if(size == 's'){
        param = '?w=128';
      }else if(size == 'm'){
        param = '?w=256';
      }else{
        param = '?w=512';
      }

      return 'https://claudiaimages.azurewebsites.net/api/media/' +id+ '' + param;
    }

    /** return service **/
    return this;

  }

})(window.angular);