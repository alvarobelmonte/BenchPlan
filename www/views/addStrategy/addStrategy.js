'Use Strict';
angular.module('App').controller('addStrategyController', function (APIfactory, $scope, $state,$cordovaOauth, $localStorage, $location,$http, $ionicPopup, $firebaseObject, Auth, FURL, Utils) {
  
  var ref = new Firebase(FURL);


  
  $scope.addEs = function (strategy) {
    console.log("Enviada peticion crear estrategia");

    APIfactory.pushEstrategia(strategy);

    //Resetear formulario

    //Pop up de confirmación
    var alertPopup = $ionicPopup.alert({
       title: 'Estrategia añadida',
       /*template: $scope.name*/
     });


  }

});