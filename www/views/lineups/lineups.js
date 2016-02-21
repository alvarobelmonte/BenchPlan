'Use Strict';
angular.module('App').controller('lineupsController', function (APIfactory, $scope, $ionicModal, $state,$cordovaOauth, $localStorage, $location,$http,$ionicPopup, $firebaseObject, $firebaseArray, Auth, FURL, Utils) {
  
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





$scope.locations = [
      { ID: 109, Nome: 'Aeroporto Internacional Hercilio Luz' },
      { ID: 161, Nome: 'Koxixos' },
      { ID: 109, Nome: 'Aeroporto Internacional Hercilio Luz' },
      { ID: 161, Nome: 'Koxixos' },
      { ID: 109, Nome: 'Aeroporto Internacional Hercilio Luz' },
      { ID: 161, Nome: 'Koxixos' },
      { ID: 109, Nome: 'Aeroporto Internacional Hercilio Luz' },
      { ID: 161, Nome: 'Koxixos' },
      { ID: 109, Nome: 'Aeroporto Internacional Hercilio Luz' },
      { ID: 161, Nome: 'Koxixos' },
      { ID: 109, Nome: 'Aeroporto Internacional Hercilio Luz' },
      { ID: 161, Nome: 'Koxixos' },
      { ID: 109, Nome: 'Aeroporto Internacional Hercilio Luz' },
      { ID: 161, Nome: 'Koxixos' },
      { ID: 109, Nome: 'Aeroporto Internacional Hercilio Luz' },
      { ID: 161, Nome: 'Koxixos' },
      { ID: 109, Nome: 'Aeroporto Internacional Hercilio Luz' },
      { ID: 161, Nome: 'Koxixos' },
      { ID: 109, Nome: 'Aeroporto Internacional Hercilio Luz' },
      { ID: 161, Nome: 'Koxixos' },
      { ID: 109, Nome: 'Aeroporto Internacional Hercilio Luz' },
      { ID: 161, Nome: 'Koxixos' },
      { ID: 109, Nome: 'Aeroporto Internacional Hercilio Luz' },
      { ID: 161, Nome: 'Koxixos' },
      { ID: 109, Nome: 'Aeroporto Internacional Hercilio Luz' },
      { ID: 161, Nome: 'Koxixos' },
      { ID: 109, Nome: 'Aeroporto Internacional Hercilio Luz' },
      { ID: 161, Nome: 'Koxixos' },
      { ID: 109, Nome: 'Aeroporto Internacional Hercilio Luz' },
      { ID: 161, Nome: 'Koxixos' },
      { ID: 109, Nome: 'Aeroporto Internacional Hercilio Luz' },
      { ID: 161, Nome: 'Koxixos' },
      { ID: 109, Nome: 'Aeroporto Internacional Hercilio Luz' },
      { ID: 161, Nome: 'Koxixos' },
      { ID: 109, Nome: 'Aeroporto Internacional Hercilio Luz' },
      { ID: 161, Nome: 'Koxixos' },
      { ID: 109, Nome: 'Aeroporto Internacional Hercilio Luz' },
      { ID: 161, Nome: 'Koxixos' },
      { ID: 109, Nome: 'Aeroporto Internacional Hercilio Luz' },
      { ID: 161, Nome: 'Koxixos' },
      { ID: 184, Nome: 'Praça XV de Novembro' }
    ];

    $scope.showLocationsModal = function() {
      $scope.openLocationsModal();
    }

    $ionicModal.fromTemplateUrl('/lineups/locations-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.locationsModal = modal;
    });

    $scope.openLocationsModal = function() {
      $scope.locationsModal.show();
    };

    $scope.closeLocationsModal = function() {
      $scope.locationsModal.hide();
    };

    $scope.$on('$destroy', function() {
      $scope.locationsModal.remove();
    });

    $scope.$on('locationsModal.hidden', function() {
      // Execute action
    });

    $scope.$on('locationsModal.removed', function() {
      // Execute action
    });
    
    $scope.clickLocationItem = function(id) {
      alert('selected item id: ' + id);
      $scope.closeLocationsModal();
    }


}
);
