(function() {
  "use strict";

  describe('Admin model', function() {
    var AdminModel;

    beforeEach(angular.mock.module('Smart.models'));

    beforeEach(inject(function(_AdminModel_) {
      AdminModel = _AdminModel_;
    }));

    it('should exist', function() {
      expect(AdminModel).toBeDefined();
    });

    it('should be throw exception', function() {
      try{
        new AdminModel();
        expect("NOT THROW EXCEPTION").toBeNull();
      }catch (e){
        expect(1).toBe(1);
      }
    });

    it('should be false isWorking after init', function(){
      var user = new AdminModel({});
      expect(user.isWorking).toBeFalsy()
    });

    it('should be correctly initialized', function(){
      var user = new AdminModel({
        "_id" : "59e5d06866d3d358d8fa49aa",
        "cd_username" : "mobile@digitalx.it",
        "cd_privilege" : "CMS-ACCESS-ADMIN"
      });

      expect(user._id).toBe('59e5d06866d3d358d8fa49aa');
      expect(user.cd_username).toBe('mobile@digitalx.it');
      expect(user.cd_privilege).toBe('CMS-ACCESS-ADMIN');

      user = new AdminModel({});
      expect(user._id).toBeUndefined();
      expect(user.cd_username).toBeUndefined();
      expect(user.cd_privilege).toBeUndefined();

      // set function
      user.set({
        "_id" : "59e5d06866d3d358d8fa49aa",
        "cd_username" : "mobile@digitalx.it",
        "cd_privilege" : "CMS-ACCESS-ADMIN"
      });


      expect(user._id).toBe('59e5d06866d3d358d8fa49aa');
      expect(user.cd_username).toBe('mobile@digitalx.it');
      expect(user.cd_privilege).toBe('CMS-ACCESS-ADMIN');

    });

    it('should have admin privilege', function(){

      var user = new AdminModel({
        "cd_privilege" : "CMS-ACCESS-ADMIN"
      });

      expect(user.isAdmin).toBe(true);

    });

    it('should be exist with check function', function(){

      var user = new AdminModel({
        "_id" : "MYID"
      });

      expect(user.check('_id', 'MYID')).toBeDefined();
      expect(user.check('_id', 'DIFFERENT ID')).toBeUndefined();

    });

    it('should have channel privilege', function(){

      var user = new AdminModel({
        "cd_privilege" : "CMS-ACCESS-CHANNEL"
      });

      expect(user.isAdmin).toBe(false);

      user = new AdminModel({
        "cd_privilege" : "CMS-ACCESS-ADMIN"
      });

      expect(user.isAdmin).toBe(true);


    });


  });
})();