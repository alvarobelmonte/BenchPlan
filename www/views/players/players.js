"Use Strict";
angular
  .module("App")
  .controller("playersController", function(
    APIfactory,
    $scope,
    $ionicPopup,
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

    //Player numbers
    $scope.dorsals = [];
    var initDorsals = function() {
      var i;
      for (i = 0; i <= 27; i++) {
        $scope.dorsals.push(i);
      }
    }();

    $scope.nombre = "nombre";
    $scope.posicion = "posicion";
    $scope.whichplayer = $state.params.aId;
    $scope.editing = false;

    $scope.toggleInjured = function(player) {
      player.star = !player.star;
      var id = player.$id;
      if (player.condition === "Available") player.condition = "Injured";
      else if (player.condition === "Injured") player.condition = "Available";

      APIfactory.updateCondition(player, id);
    };

    $scope.checkCondition = function(player) {
      if (player.condition === "Available") return false;
      else if (player.condition === "Injured") return true;
    };

    var showPlayers = function() {
      $scope.players = APIfactory.getPlayers();
    }();


    $scope.onItemDelete = function(player) {
      // A confirm dialog
      $scope.showConfirm = function() {
        var confirmPopup = $ionicPopup.confirm({
          title: "Delete player",
          template:
            "Are you sure you want to delete " + player.name + "?",
          cancelText: "Cancel",
          okType: "button-positive"
        });

        confirmPopup.then(function(res) {
          if (res) {
            APIfactory.deletePlayer(player);
          } else {
          }
        });
      };

      $scope.showConfirm();
    };
  });
