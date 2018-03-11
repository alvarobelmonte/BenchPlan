"Use Strict";
angular
  .module("App")
  .controller("menuController", function (
    APIfactory,
    $scope,
    $state,
    $cordovaOauth,
    $localStorage,
    Utils,
    Auth
  ) {

    /*function checkLocalStorage() {
      if (
        $localStorage.email !== undefined && $localStorage.email !== 'empty' &&
        $localStorage.userkey !== undefined && $localStorage.userkey !== 'empty'
      ) {
          console.log('user empty');
          $state.go("tabs.players");
      }
    }
    
    checkLocalStorage();*/

    $scope.$watch(function () { return $localStorage.email; },function(newVal,oldVal){
      if(oldVal!==newVal && newVal === 'empty'){
        console.log('It is empty'); 
     }
   });

    $scope.logOut = function () {
      $localStorage.email = 'empty';
      $localStorage.userkey = 'empty';
      Auth.logout();
      $state.go('login');
    };
  });
