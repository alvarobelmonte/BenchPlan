'Use Strict';
angular.module('App').controller('playersController', function (APIfactory, $scope, $ionicPopup, $state,$cordovaOauth, $localStorage, $location,$http,$ionicPopup, $firebaseObject, $firebaseArray, Auth, FURL, Utils) {
  
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

  $scope.toggleInjured = function(player){
  	player.star = !player.star;
  }

  $scope.showP = function () {
	    $scope.players = APIfactory.getJugadores();
	    console.log($scope.players);
  }

  $scope.showP();

  $scope.onItemDelete = function (player) {
     // A confirm dialog
    $scope.showConfirm = function() {
     var confirmPopup = $ionicPopup.confirm({
       title: 'Borrar jugador',
       template: '¿Estás seguro de que quieres borrar a ' + player.name + '?'
     });

     confirmPopup.then(function(res) {
       if(res) {
         APIfactory.deleteJugador(player);
       } else {

       }
     });
    };

    $scope.showConfirm();

  }


}
);
