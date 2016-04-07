'Use Strict';
angular.module('App').controller('calendarController', function (APIfactory, $scope, $state,$cordovaOauth, $localStorage, $location,$http,$ionicPopup, $firebaseObject, $firebaseArray, Auth, FURL, Utils) {

  $scope.whichevent = $state.params.aId;
  $scope.months = ['Enero', 'Febrero', 'Marzo', 'Abril', 
  'Mayo', 'Junio', 'Julio', 'Agosto', 'Septimbre', 'Octubre', 'Noviembre', 'Diciembre'];

  $scope.showE = function () {
	    $scope.events = APIfactory.getEventos();
	    console.log($scope.events);
  }

  $scope.showE();

  $scope.onItemDelete = function (event) {
	    
    // A confirm dialog
    $scope.showConfirm = function() {
     var confirmPopup = $ionicPopup.confirm({
       title: 'Borrar evento',
       template: '¿Estás seguro de que quieres borrar el evento "' + event.name + '"?',
       cancelText: 'Cancelar'
     });

     confirmPopup.then(function(res) {
       if(res) {
         APIfactory.deleteEvento(event);
       } else {

       }
     });
    };

    $scope.showConfirm();
  }


}
);
