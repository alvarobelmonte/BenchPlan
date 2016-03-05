'Use Strict';
angular.module('App').controller('playerDetailController', function (APIfactory, $scope, $state,$cordovaOauth, $localStorage, $location,$http,$ionicPopup, $firebaseObject, $firebaseArray, Auth, FURL, Utils) {
  
  var ref = new Firebase(FURL);

  //Dorsales
  $scope.dorsals = [];
  var initDorsals = function() {
    var i;
    for (i = 0;i <= 27; i++) {
      $scope.dorsals.push(i);
    }
  }
  initDorsals();

  $scope.nombre = "nombre";
  $scope.posicion = "posicion";
  $scope.whichplayer = $state.params.aId;
  $scope.editing = false;

  $scope.showP = function () {
	    $scope.players = APIfactory.getJugadores();
	    console.log($scope.players);
  }

  $scope.showP();


  $scope.turnFalse = function () {
      console.log('showForm');
      $scope.editing = true;
  }



  $scope.editP = function (player) {
    console.log("Enviada peticion editar jugador");

    //Recogemos datos del formulario

    $scope.name = player.name;
    $scope.position = player.position;
    $scope.dorsal = player.dorsal;
    $scope.fecha = player.fecha;
    $scope.estado = player.condition;


    var id = player.$id;
    
    //Referencia a la rama players del usuario que ha iniciado sesion
    var userRef = ref.child('profile').child($localStorage.userkey).child("player").child(player.$id);

    
    console.log(player.name);

    APIfactory.updateJugador(player, id);
    //Resetear formulario


    //Pop up de confirmación
    var alertPopup = $ionicPopup.alert({
       title: 'Jugador editado',
       /*template: $scope.name*/
     });

    $scope.editing = false;
  }
}
);
