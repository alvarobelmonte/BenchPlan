'Use Strict';
angular.module('App').controller('lineupsController', function (APIfactory, $scope, $ionicModal, $state,$cordovaOauth, $localStorage, $location,$http,$ionicPopup, $firebaseObject, $firebaseArray, Auth, FURL, Utils) {
  
  var ref = new Firebase(FURL);

  $scope.whichaLineup = $state.params.aId;

  //Referencia a la rama players del usuario que ha iniciado sesion
  var lineupRef = ref.child('profile').child($localStorage.userkey).child("lineups");

  $scope.showA = function () {
		$scope.lineups = $firebaseArray(lineupRef);
  }

  $scope.showA();

  $scope.onItemDelete = function (lineup) {
     // A confirm dialog
    $scope.showConfirm = function() {
     var confirmPopup = $ionicPopup.confirm({
       title: 'Borrar alineación',
       template: '¿Estás seguro de que quieres borrar esta alineación?',
       cancelText: 'Cancelar',
       okType: 'button-calm'
     });

     confirmPopup.then(function(res) {
       if(res) {
         APIfactory.deleteLineup(lineup);
       } else {

       }
     });
    };

    $scope.showConfirm();

  }
}
);
