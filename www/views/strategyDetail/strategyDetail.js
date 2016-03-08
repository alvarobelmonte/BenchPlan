'Use Strict';
angular.module('App').controller('strategyDetailController', function (APIfactory, $parse, $scope, $ionicModal, $state,$cordovaOauth, $localStorage, $location,$http,$ionicPopup, $firebaseObject, $firebaseArray, Auth, FURL, Utils) {
  
  var ref = new Firebase(FURL);
  $scope.itemList=[];
  $scope.whichalineacion = $state.params.aId;
  console.log($scope.whichalineacion);

  var alineacionRef = ref.child('profile').child($localStorage.userkey).child("alineaciones");

    $scope.p1pos = 'portero';
    $scope.p2pos = 'defensa';
    $scope.p3pos = 'defensa';
    $scope.p4pos = 'defensa';
    $scope.p5pos = 'defensa';
    $scope.p6pos = 'medio';
    $scope.p7pos = 'medio';
    $scope.p8pos = 'medio';
    $scope.p9pos = 'medio';
    $scope.p10pos = 'delantero';
    $scope.p11pos = 'delantero';

    $scope.alineados = [];

    $scope.mformado = medio;
    $scope.m2formado = medio;
    $scope.m3formado = medio;
    $scope.dlformado = delantero;

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
      $scope.p5pos = 'medio';
      $scope.p6pos = 'medio';
    }
    else if($scope.defensas == '4'){
      $scope.dmformado = defensa;
      $scope.dm2formado = medio;
      $scope.p5pos = 'defensa';
      $scope.p6pos = 'medio';
    }
    else if($scope.defensas == '5'){
      $scope.dmformado = defensa;
      $scope.dm2formado = defensa;
      $scope.p5pos = 'defensa';
      $scope.p6pos = 'defensa';
    }

    //Medios y delanteros
    if($scope.delanteros == '1'){
      $scope.md1formado = medio;
      $scope.md2formado = medio;
      $scope.p9pos = 'medio';
      $scope.p10pos = 'medio';
    }
    else if($scope.delanteros == '2'){
      $scope.md1formado = medio;
      $scope.md2formado = delantero;
      $scope.p9pos = 'medio';
      $scope.p10pos = 'delantero';
    }
    else if($scope.delanteros == '3'){
      $scope.md1formado = delantero;
      $scope.md2formado = delantero;
      $scope.p9pos = 'delantero';
      $scope.p10pos = 'delantero';
    }
    else if($scope.delanteros == ''){
      if($scope.medios2 == '1'){
        $scope.md1formado = medio;
        $scope.md2formado = medio;
        $scope.p9pos = 'medio';
        $scope.p10pos = 'medio';
      }
      else if($scope.medios2 == '2'){
        $scope.md1formado = medio;
        $scope.md2formado = delantero;
        $scope.p9pos = 'medio';
        $scope.p10pos = 'delantero';
      }
      else if($scope.medios2 == '3'){
        $scope.md1formado = delantero;
        $scope.md2formado = delantero;
        $scope.p9pos = 'delantero';
        $scope.p10pos = 'delantero';
      }
    }

    
  };


  $scope.getPlayers = function () {
      $scope.players = APIfactory.getJugadores();
      console.log($scope.players);
  }

  $scope.getPlayers();

  $scope.contact = {
    name: 'Mittens Cat',
    info: 'Tap anywhere on the card to open the modal'
  }


  $ionicModal.fromTemplateUrl('lineupModal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal
  })  

  $scope.openModal = function(jugador, num) {
    $scope.num = num;
    $scope.jugador = jugador;
    console.log($scope.jugador);
    $scope.modal.show()
  }

  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });


    
    

  $scope.assignPlayer = function (player) {
      $scope.playerID = player.$id;
      $scope.alineados.push(player.$id);
      console.log($scope.alineados);
      $scope.updateDivPlayer();
      $scope.closeModal();
  };

  $scope.updateDivPlayer = function () {
      $scope.numJugador = 'player' + $scope.num;
  
      // Get the model
      var model = $parse($scope.numJugador);

      // Assigns a value to it
      model.assign($scope, APIfactory.getNombreJugador($scope.playerID));

      // Apply it to the scope
      //$scope.$apply();

      console.log($scope.numJugador);
      //$scope.player+$scope.numJugador = APIfactory.getNombreJugador($scope.playerID);
  };

}
);
