'Use Strict';
angular.module('App').controller('addPlayerController', function ($scope, $state,$cordovaOauth, $localStorage, $location,$http, $ionicPopup, $firebaseObject, Auth, FURL, Utils) {
  
  var ref = new Firebase(FURL);


  
  $scope.addP = function (player) {
    console.log("Enviada peticion crear jugador");

    //Recogemos datos del formulario
    $scope.name = player.name;
    $scope.dorsal = player.dorsal;
    


    //Referencia a la rama players del usuario que ha iniciado sesion
    var userRef = ref.child('profile').child($localStorage.userkey).child("player");

    //Introducimos los valores
    userRef.push({
                name: $scope.name,
                position: $scope.dorsal
    });

    //Resetear formulario


    //Pop up de confirmación
    var alertPopup = $ionicPopup.alert({
       title: 'Jugador añadido',
       /*template: $scope.name*/
     });

  }

});