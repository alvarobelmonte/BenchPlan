'Use Strict';
angular.module('App').controller('lineupsController', function (APIfactory, $scope, $state,$cordovaOauth, $localStorage, $location,$http,$ionicPopup, $firebaseObject, $firebaseArray, Auth, FURL, Utils) {
  
  var ref = new Firebase(FURL);

  $scope.whichalineacion = $state.params.aId;
  console.log($scope.whichalineacion);

  //Referencia a la rama players del usuario que ha iniciado sesion
  var alineacionRef = ref.child('profile').child($localStorage.userkey).child("alineaciones");

  $scope.showA = function () {
		$scope.alineaciones = $firebaseArray(alineacionRef);
		console.log($scope.alineaciones);
  }

  $scope.showA();


  $scope.showPlayers = function () {
  	console.log('showPlayers()');
  }

}
);
