'Use Strict';
angular.module('App').controller('plantillaController', function ($scope, $state,$cordovaOauth, $localStorage, $location,$http,$ionicPopup, $firebaseObject, $firebaseArray, Auth, FURL, Utils) {
  var ref = new Firebase(FURL);

  

  $scope.nombre = "nombre";
  $scope.posicion = "posicion";


  $scope.whichplayer = $state.params.aId;
  console.log($scope.whichplayer);

  //Referencia a la rama players del usuario que ha iniciado sesion
  var playersRef = ref.child('profile').child($localStorage.userkey).child("player");

  $scope.showP = function () {
	 //  playersRef.on("child_added", function(snapshot, prevChildKey) {
		//   var newPost = snapshot.val();
		//   console.log("Nombre: " + newPost.name);
		//   console.log("Posicion: " + newPost.position);
		//   console.log("Previous Post ID: " + prevChildKey);

		//   console.log();
		// });

		
	    // download the data from a Firebase reference into a (pseudo read-only) array
	    // all server changes are applied in realtime
	    $scope.players = $firebaseArray(playersRef);
	    console.log($scope.players);
  }

  $scope.showP();

}
);
