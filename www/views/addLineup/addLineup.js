'Use Strict';
angular.module('App').controller('addLineupController', function (APIfactory, $scope, $state, $cordovaOauth, $localStorage, $location, $http, $ionicPopup, $firebaseObject, Auth, FURL, Utils) {

  var ref = new Firebase(FURL);

  $scope.addAl = function (lineup) {
    console.log("Enviada peticion crear alineacion");

    APIfactory.pushLineup(lineup);

    //Resetear formulario

    //Pop up de confirmación
    var alertPopup = $ionicPopup.alert({
      title: 'Lineup added',
      /*template: $scope.name*/
    });

  }

});
