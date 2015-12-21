'Use Strict';
angular.module('App').controller('calendarioController', function (APIfactory, $scope, $state,$cordovaOauth, $localStorage, $location,$http,$ionicPopup, $firebaseObject, $firebaseArray, Auth, FURL, Utils) {

  $scope.whichevent = $state.params.aId;
  $scope.months = ['Enero', 'Febrero', 'Marzo', 'Abril', 
  'Mayo', 'Junio', 'Julio', 'Agosto', 'Septimbre', 'Octubre', 'Noviembre', 'Diciembre'];

  $scope.showE = function () {
	    $scope.events = APIfactory.getEventos();
	    console.log($scope.events);
  }

  $scope.showE();

  $scope.onItemDelete = function (event) {
	    APIfactory.deleteEvento(event);
  }


}
);
