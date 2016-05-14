'Use Strict';
angular.module('App').controller('addEventController', function (APIfactory, $scope, $state,$cordovaOauth, $localStorage, $location,$http, $ionicPopup, $firebaseObject, Auth, FURL, Utils) {
  

  $scope.addE = function (event) {
    console.log("Enviada peticion crear evento");

    APIfactory.pushEvento(event);

    //Resetear formulario


    var alertPopup = $ionicPopup.alert({
       title: 'Evento añadido',
     });

  };


});