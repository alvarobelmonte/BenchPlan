'Use Strict';
angular.module('App').controller('calendarioController', function (APIfactory, $scope, $state,$cordovaOauth, $localStorage, $location,$http,$ionicPopup, $firebaseObject, $firebaseArray, Auth, FURL, Utils) {



  $scope.whichevent = $state.params.aId;

  $scope.showE = function () {
	 //  playersRef.on("child_added", function(snapshot, prevChildKey) {
		//   var newPost = snapshot.val();
		//   console.log("Nombre: " + newPost.name);
		//   console.log("Posicion: " + newPost.position);
		//   console.log("Previous Post ID: " + prevChildKey);

		//   console.log();
		// });

		
	    // download the data from a Firebase reference into a (pseudo read-only) array
	    // all server changes are applied in realtime
	    $scope.events = APIfactory.getEventos();
	    console.log($scope.events);
  }

  $scope.showE();

}
);
