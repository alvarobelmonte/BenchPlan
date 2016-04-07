'Use Strict';
angular.module('App').controller('strategiesController', function (APIfactory, $scope, $ionicModal, $state,$cordovaOauth, $localStorage, $location,$http,$ionicPopup, $firebaseObject, $firebaseArray, Auth, FURL, Utils) {
  
  var ref = new Firebase(FURL);

  $scope.whichStrategy = $state.params.aId;
 
  var strategyRef = ref.child('profile').child($localStorage.userkey).child("strategies");

  $scope.showE = function () {
		$scope.strategies = $firebaseArray(strategyRef);
  }

  $scope.showE();

  $scope.onItemDelete = function (strategy) {
     // A confirm dialog
    $scope.showConfirm = function() {
     var confirmPopup = $ionicPopup.confirm({
       title: 'Borrar estrategia',
       template: '¿Estás seguro de que quieres borrar esta estrategia?',
       cancelText: 'Cancelar'
     });

     confirmPopup.then(function(res) {
       if(res) {
         APIfactory.deleteStrategy(strategy);
       } else {

       }
     });
    };

    $scope.showConfirm();

  }

}
);
