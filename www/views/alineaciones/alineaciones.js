'Use Strict';
angular.module('App').controller('alineacionesController', function (APIfactory, $scope, $state,$cordovaOauth, $localStorage, $location,$http,$ionicPopup, $firebaseObject, $firebaseArray, Auth, FURL, Utils) {
  var ref = new Firebase(FURL);

  



  $scope.whichalineacion = $state.params.aId;
  console.log($scope.whichalineacion);

  //Referencia a la rama players del usuario que ha iniciado sesion
  var alineacionRef = ref.child('profile').child($localStorage.userkey).child("alineaciones");

  $scope.showA = function () {
	 //  playersRef.on("child_added", function(snapshot, prevChildKey) {
		//   var newPost = snapshot.val();
		//   console.log("Nombre: " + newPost.name);
		//   console.log("Posicion: " + newPost.position);
		//   console.log("Previous Post ID: " + prevChildKey);

		//   console.log();
		// });

		
	    // download the data from a Firebase reference into a (pseudo read-only) array
	    // all server changes are applied in realtime
	    $scope.alineaciones = $firebaseArray(alineacionRef);
	    console.log($scope.alineaciones);
  }

  $scope.showA();


  $scope.showPlayers = function () {
  	console.log('showPlayers()');
  }

}
);
