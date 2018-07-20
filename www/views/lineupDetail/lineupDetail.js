'Use Strict';
angular
  .module('App')
  .controller('lineupDetailController', function(
    APIfactory,
    $parse,
    $scope,
    $ionicModal,
    $state,
    $cordovaOauth,
    $localStorage,
    $location,
    $http,
    $ionicPopup,
    $firebaseObject,
    $firebaseArray,
    Auth,
    FURL,
    Utils
  ) {
    var ref = new Firebase(FURL);
    var alineacionRef = ref
      .child('profile')
      .child($localStorage.userkey)
      .child('alineaciones');
    var portero = 'calm';
    var defensa = 'energized';
    var medio = 'royal';
    var delantero = 'assertive';
    var alineado = false;
    var players = []; //Array that is sent to the DB

    $scope.iframeHeight = window.innerHeight;
    $scope.itemList = [];
    $scope.lineupID = $state.params.aId;
    $scope.formation = '4-4-2';
    $scope.formations = [
      '3-4-3',
      '3-5-2',
      '4-4-2',
      '4-3-3',
      '4-2-1-3',
      '4-2-3-1',
      '4-3-1-2',
      '4-3-2-1',
      '4-5-1',
      '5-3-2',
      '5-4-1'
    ];

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

    //Classes
    $scope.p2class = 'def linea4p1';
    $scope.p3class = 'def linea4p2';
    $scope.p4class = 'def linea4p3';
    $scope.p5class = 'def linea4p4';
    $scope.p6class = 'mc1 linea4p1';
    $scope.p7class = 'mc1 linea4p2';
    $scope.p8class = 'mc1 linea4p3';
    $scope.p9class = 'mc1 linea4p4';
    $scope.p10class = 'del linea2p1';
    $scope.p11class = 'del linea2p2';

    $scope.alineados = [];

    $scope.mformado = medio;
    $scope.m2formado = medio;
    $scope.m3formado = medio;
    $scope.dlformado = delantero;

    (function getPlayers() {
      $scope.players = APIfactory.getPlayers();
    })();

    function updateFormation(formation) {
      console.log('formation seleccionada ' + formation);

      $scope.formation = formation;
      $scope.defensas = $scope.formation.charAt(0);
      $scope.medios1 = $scope.formation.charAt(2);
      $scope.medios2 = $scope.formation.charAt(4);
      $scope.delanteros = $scope.formation.charAt(6);
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
      if ($scope.defensas == '3') {
        $scope.dmformado = medio;
        $scope.dm2formado = medio;
        $scope.p5pos = 'medio';
        $scope.p6pos = 'medio';
        $scope.p2class = 'def linea3p1';
        $scope.p3class = 'def linea3p2';
        $scope.p4class = 'def linea3p3';
      } else if ($scope.defensas == '4') {
        $scope.dmformado = defensa;
        $scope.dm2formado = medio;
        $scope.p5pos = 'defensa';
        $scope.p6pos = 'medio';
        $scope.p2class = 'def linea4p1';
        $scope.p3class = 'def linea4p2';
        $scope.p4class = 'def linea4p3';
        $scope.p5class = 'def linea4p4';
      } else if ($scope.defensas == '5') {
        $scope.dmformado = defensa;
        $scope.dm2formado = defensa;
        $scope.p5pos = 'defensa';
        $scope.p6pos = 'defensa';
        $scope.p2class = 'def linea5p1';
        $scope.p3class = 'def linea5p2';
        $scope.p4class = 'def linea5p3';
        $scope.p5class = 'def linea5p4';
        $scope.p6class = 'def linea5p5';
      }

      //Medios y delanteros
      if ($scope.delanteros == '1') {
        $scope.md1formado = medio;
        $scope.md2formado = medio;
        $scope.p9pos = 'medio';
        $scope.p10pos = 'medio';

        $scope.p2class = 'def linea4p1';
        $scope.p3class = 'def linea4p2';
        $scope.p4class = 'def linea4p3';
        $scope.p5class = 'def linea4p4';
        $scope.p11class = 'del linea1p1';

        if ($scope.medios2 == '2') {
          $scope.p6class = 'mc1 linea3p1';
          $scope.p7class = 'mc1 linea3p2';
          $scope.p8class = 'mc1 linea3p3';
          $scope.p9class = 'mc2 linea2p1';
          $scope.p10class = 'mc2 linea2p2';
        } else if ($scope.medios2 == '3') {
          $scope.p6class = 'mc1 linea2p1';
          $scope.p7class = 'mc1 linea2p2';
          $scope.p8class = 'mc2 linea3p1';
          $scope.p9class = 'mc2 linea3p2';
          $scope.p10class = 'mc2 linea3p3';
        }
      } else if ($scope.delanteros == '2') {
        $scope.md1formado = medio;
        $scope.md2formado = delantero;
        $scope.p9pos = 'medio';
        $scope.p10pos = 'delantero';

        $scope.p2class = 'def linea4p1';
        $scope.p3class = 'def linea4p2';
        $scope.p4class = 'def linea4p3';
        $scope.p5class = 'def linea4p4';

        $scope.p6class = 'mc1 linea3p1';
        $scope.p7class = 'mc1 linea3p2';
        $scope.p8class = 'mc1 linea3p3';
        $scope.p9class = 'mc2 linea1p1';
        $scope.p10class = 'del linea2p1';
        $scope.p11class = 'del linea2p2';
      } else if ($scope.delanteros == '3') {
        $scope.md1formado = delantero;
        $scope.md2formado = delantero;
        $scope.p9pos = 'delantero';
        $scope.p10pos = 'delantero';

        $scope.p2class = 'def linea4p1';
        $scope.p3class = 'def linea4p2';
        $scope.p4class = 'def linea4p3';
        $scope.p5class = 'def linea4p4';

        $scope.p6class = 'mc1 linea2p1';
        $scope.p7class = 'mc1 linea2p2';
        $scope.p8class = 'mc2 linea1p1';
        $scope.p9class = 'del linea3p1';
        $scope.p10class = 'del linea3p2';
        $scope.p11class = 'del linea3p3';
      } else if ($scope.delanteros == '') {
        if ($scope.medios2 == '1') {
          $scope.md1formado = medio;
          $scope.md2formado = medio;
          $scope.p9pos = 'medio';
          $scope.p10pos = 'medio';
          $scope.p11class = 'mc2 linea1p1';

          if ($scope.medios1 == '5') {
            $scope.p2class = 'def linea4p1';
            $scope.p3class = 'def linea4p2';
            $scope.p4class = 'def linea4p3';
            $scope.p5class = 'def linea4p4';
            $scope.p6class = 'mc1 linea5p1';
            $scope.p7class = 'mc1 linea5p2';
            $scope.p8class = 'mc1 linea5p3';
            $scope.p9class = 'mc1 linea5p4';
            $scope.p10class = 'mc1 linea5p5';
          } else if ($scope.medios1 == '4') {
            $scope.p2class = 'def linea5p1';
            $scope.p3class = 'def linea5p2';
            $scope.p4class = 'def linea5p3';
            $scope.p5class = 'def linea5p4';
            $scope.p6class = 'def linea5p5';
            $scope.p7class = 'mc1 linea4p1';
            $scope.p8class = 'mc1 linea4p2';
            $scope.p9class = 'mc1 linea4p3';
            $scope.p10class = 'mc1 linea4p4';
          }
        } else if ($scope.medios2 == '2') {
          $scope.md1formado = medio;
          $scope.md2formado = delantero;
          $scope.p9pos = 'medio';
          $scope.p10pos = 'delantero';
          $scope.p10class = 'mc2 linea2p1';
          $scope.p11class = 'mc2 linea2p2';
          if ($scope.medios1 == '5') {
            $scope.p2class = 'def linea3p1';
            $scope.p3class = 'def linea3p2';
            $scope.p4class = 'def linea3p3';
            $scope.p5class = 'mc1 linea5p1';
            $scope.p6class = 'mc1 linea5p2';
            $scope.p7class = 'mc1 linea5p3';
            $scope.p8class = 'mc1 linea5p4';
            $scope.p9class = 'mc1 linea5p5';
          } else if ($scope.medios1 == '4') {
            $scope.p2class = 'def linea4p1';
            $scope.p3class = 'def linea4p2';
            $scope.p4class = 'def linea4p3';
            $scope.p5class = 'def linea4p4';
            $scope.p6class = 'mc1 linea4p1';
            $scope.p7class = 'mc1 linea4p2';
            $scope.p8class = 'mc1 linea4p3';
            $scope.p9class = 'mc1 linea4p4';
          } else if ($scope.medios1 == '3') {
            $scope.p2class = 'def linea5p1';
            $scope.p3class = 'def linea5p2';
            $scope.p4class = 'def linea5p3';
            $scope.p5class = 'def linea5p4';
            $scope.p6class = 'def linea5p5';
            $scope.p7class = 'mc1 linea3p1';
            $scope.p8class = 'mc1 linea3p2';
            $scope.p9class = 'mc1 linea3p3';
          }
        } else if ($scope.medios2 == '3') {
          $scope.md1formado = delantero;
          $scope.md2formado = delantero;
          $scope.p9pos = 'delantero';
          $scope.p10pos = 'delantero';
          $scope.p9class = 'mc2 linea3p1';
          $scope.p10class = 'mc2 linea3p2';
          $scope.p11class = 'mc2 linea3p3';

          if ($scope.medios1 == '4') {
            $scope.p2class = 'def linea3p1';
            $scope.p3class = 'def linea3p2';
            $scope.p4class = 'def linea3p3';
            $scope.p5class = 'mc1 linea4p1';
            $scope.p6class = 'mc1 linea4p2';
            $scope.p7class = 'mc1 linea4p3';
            $scope.p8class = 'mc1 linea4p4';
          } else if ($scope.medios1 == '3') {
            $scope.p2class = 'def linea4p1';
            $scope.p3class = 'def linea4p2';
            $scope.p4class = 'def linea4p3';
            $scope.p5class = 'def linea4p4';
            $scope.p6class = 'mc1 linea3p1';
            $scope.p7class = 'mc1 linea3p2';
            $scope.p8class = 'mc1 linea3p3';
          }
        }
      }
    }

    (function getLineup () {
      if ($scope.alineados.length === 0) {
        var lineup = APIfactory.getLineup($scope.lineupID);
        if (lineup.formation !== undefined && lineup.players !== undefined) {
          $scope.formation = lineup.formation;
          $scope.alineados = lineup.players.slice();
          players = lineup.players.slice();

          for (var i = 0; i < 11; i++) {
            $scope.numJugador = 'player' + (i + 1);
            var model = $parse($scope.numJugador);
            if (players[i] !== '') {
              var nombre = APIfactory.getPlayerName(players[i]);
              model.assign($scope, nombre);
              $scope.fotoJugador = 'player' + (i + 1) + 'foto';
              var model = $parse($scope.fotoJugador);
              var foto = APIfactory.getPlayerPhoto(players[i]);
              model.assign($scope, foto);
            }

            console.log('players ' + players);
            console.log('player1 ' + $scope.player1);
          }
          updateFormation($scope.formation);
        }
      }
        console.log('players ' + players);
    })();

    $scope.assignPlayer = function(player) {
      $scope.playerID = player.$id;
      $scope.alineados.push(player.$id);
      players[$scope.num - 1] = player.$id;
      $scope.updateDivPlayer();
      $scope.closeChoosePlayerModal();
    };

    $scope.updateDivPlayer = function() {
      $scope.numJugador = 'player' + $scope.num;

      // Get the model
      if (players[$scope.num - 1] != '') {
        var model = $parse($scope.numJugador);

        // Assigns a value to it
        model.assign($scope, APIfactory.getPlayerName($scope.playerID));

        $scope.fotoJugador = 'player' + $scope.num + 'foto';

        // Get the model
        var model2 = $parse($scope.fotoJugador);
        model2.assign($scope, APIfactory.getPlayerPhoto($scope.playerID));
      } else {
        var model = $parse($scope.numJugador);

        // Assigns a value to it
        model.assign($scope, '');

        $scope.fotoJugador = 'player' + $scope.num + 'foto';

        // Get the model
        var model2 = $parse($scope.fotoJugador);
        model2.assign($scope, '');
      }
    };

    $scope.setFormation = function(formation) {
      $scope.formation = formation;
      updateFormation(formation);
      $scope.closeChooseLineupModal();
    };

    $scope.saveLineup = function() {
      var formation = $scope.formation;
      for (var i = 0; i <= 10; i++) {
        if (players[i] == undefined) players[i] = '';
      }

      APIfactory.updateLineup($scope.lineupID, formation, players);
      var alertPopup = $ionicPopup.alert({
        title: 'Lineup saved'
        /*template: $scope.name*/
      });
    };

    $scope.filtroComprobarAlineado = function(player) {
      return !(players.indexOf(player.$id) > -1);
    };

    $scope.removePlayer = function(jugador) {
      players[jugador - 1] = '';
      $scope.numJugador = 'player' + $scope.num;
      console.log('numjug ' + $scope.numJugador);
      $scope.updateDivPlayer();
      $scope.closeChoosePlayerModal();
      console.log('player1: ' + $scope.player1);
    };

    $scope.checkPlayerEmpty = function(player) {
      return (player === '' || player === undefined) ? true: false;
    };

    /////////////////////////////////////////////
    // MODALS
    /////////////////////////////////////////////
    $ionicModal
      .fromTemplateUrl('choosePlayerModal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      })
      .then(function(modal) {
        $scope.modalPlayer = modal;
      });

    $ionicModal
      .fromTemplateUrl('chooseLineupModal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      })
      .then(function(modal) {
        $scope.modalFormation = modal;
      });

    $scope.openChoosePlayerModal = function(jugador, num) {
      $scope.num = num;
      $scope.jugador = jugador;
      $scope.modalPlayer.show();
    };

    $scope.openChooseLineupModal = function() {
      $scope.modalFormation.show();
    };

    $scope.closeChoosePlayerModal = function() {
      $scope.modalPlayer.hide();
    };

    $scope.closeChooseLineupModal = function() {
      $scope.modalFormation.hide();
    };

    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
  });
