"Use Strict";
angular
  .module("App")
  .controller("loginController", function (
    $scope,
    $ionicSideMenuDelegate,
    $state,
    $cordovaOauth,
    $localStorage,
    $location,
    $http,
    $ionicPopup,
    $firebaseObject,
    Auth,
    FURL,
    Utils
  ) {
    var ref = new Firebase(FURL);
    var userkey = "";
    
    $scope.signIn = function (user) {
      console.log("sign in");
      if (angular.isDefined(user)) {
        Utils.show();
        Auth.login(user).then(
          function (authData) {
            //console.log("id del usuario:" + JSON.stringify(authData));

            ref
              .child("profile")
              .orderByChild("id")
              .equalTo(authData.uid)
              .on("child_added", function (snapshot) {
                console.log(snapshot.key());
                userkey = snapshot.key();
                var obj = $firebaseObject(ref.child("profile").child(userkey));

                obj
                  .$loaded()
                  .then(function (data) {
                    //console.log(data === obj); // true
                    //console.log(obj.email);
                    $localStorage.email = obj.email;
                    $localStorage.userkey = userkey;

                    Utils.hide();
                    $state.go("tabs.players");
                    console.log("Starter page", "Home");
                  })
                  .catch(function (error) {
                    console.error("Error:", error);
                  });
              });
          },
          function (err) {
            Utils.hide();
            Utils.errMessage(err);
          }
        );
      }
    };

    (function checkLocalStorage() {
      if (
        $localStorage.email !== undefined && $localStorage.email !== 'empty' &&
        $localStorage.userkey !== undefined && $localStorage.userkey !== 'empty'
      ) {
          console.log('user not empty');
          $state.go("tabs.players");
      }
    })();

    $ionicSideMenuDelegate.canDragContent(false); //Disables side menu
  });
