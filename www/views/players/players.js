'Use Strict';
angular.module('App').controller('playersController', function (APIfactory, $scope, $state,$cordovaOauth, $localStorage, $location,$http,$ionicPopup, $firebaseObject, $firebaseArray, Auth, FURL, Utils) {
  var ref = new Firebase(FURL);


  $scope.nombre = "nombre";
  $scope.posicion = "posicion";


  $scope.whichplayer = $state.params.aId;


  //Referencia a la rama players del usuario que ha iniciado sesion
  var playersRef = ref.child('profile').child($localStorage.userkey).child("player");



  $scope.toggleInjured = function(player){
  	player.star = !player.star;
  }

  $scope.showP = function () {
	    $scope.players = APIfactory.getJugadores();
	    console.log($scope.players);
  }

  $scope.showP();

  $scope.onItemDelete = function (player) {
	    APIfactory.deleteJugador(player);
  }

}
);
