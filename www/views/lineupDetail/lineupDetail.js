'Use Strict';
angular.module('App').controller('lineupDetailController', function (APIfactory, $scope, $ionicModal, $state,$cordovaOauth, $localStorage, $location,$http,$ionicPopup, $firebaseObject, $firebaseArray, Auth, FURL, Utils) {
  
  var ref = new Firebase(FURL);
  $scope.itemList=[];
  $scope.whichalineacion = $state.params.aId;
  console.log($scope.whichalineacion);

  var alineacionRef = ref.child('profile').child($localStorage.userkey).child("alineaciones");

  $scope.showA = function () {
		$scope.alineaciones = $firebaseArray(alineacionRef);
		console.log($scope.alineaciones);
  };

  $scope.formaciones = ["3-4-3", "3-5-2", "4-4-2", "4-3-3", "4-2-1-3", "4-2-3-1", "4-3-1-2", "4-3-2-1", "4-5-1", "5-3-2", "5-4-1"];
  
  var portero = "calm";
  var defensa = "energized";
  var medio = "royal";
  var delantero = "assertive";

  $scope.update = function(formacion){
    console.log('formacion seleccionada ' + formacion.valor);

    $scope.formacion = formacion.valor;
    $scope.defensas = $scope.formacion.charAt(0);
    $scope.medios1 = $scope.formacion.charAt(2);
    $scope.medios2 = $scope.formacion.charAt(4);
    $scope.delanteros = $scope.formacion.charAt(6);
    console.log('defensa ' + $scope.defensas);
    console.log('medios ' + $scope.medios1);
    console.log('medios-del ' + $scope.medios2);
    console.log('delanteros ' + $scope.delanteros);

    //Jugadores fijos
    $scope.pformado = portero;
    $scope.dformado = defensa;
    $scope.mformado = medio;
    $scope.m2formado = medio;
    $scope.m3formado = medio;
    $scope.dlformado = delantero;

    //Defensas
    if($scope.defensas == '3'){
      $scope.dmformado = medio;
      $scope.dm2formado = medio;
    }
    else if($scope.defensas == '4'){
      $scope.dmformado = defensa;
      $scope.dm2formado = medio;
    }
    else if($scope.defensas == '5'){
      $scope.dmformado = defensa;
      $scope.dm2formado = defensa;
    }

    //Medios y delanteros
    if($scope.delanteros == '1'){
      $scope.md1formado = medio;
      $scope.md2formado = medio;
    }
    else if($scope.delanteros == '2'){
      $scope.md1formado = medio;
      $scope.md2formado = delantero;
    }
    else if($scope.delanteros == '3'){
      $scope.md1formado = delantero;
      $scope.md2formado = delantero;
    }
    else if($scope.delanteros == ''){
      if($scope.medios2 == '1'){
        $scope.md1formado = medio;
        $scope.md2formado = medio;
      }
      else if($scope.medios2 == '2'){
        $scope.md1formado = medio;
        $scope.md2formado = delantero;
      }
      else if($scope.medios2 == '3'){
        $scope.md1formado = delantero;
        $scope.md2formado = delantero;
      }
    }

    
  };












    
    



}
);
