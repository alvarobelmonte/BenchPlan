"Use Strict";
angular
  .module("App")
  .controller("lineupsController", function(
    APIfactory,
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

    //$scope.whichaLineup = $state.params.aId;

    //Reference to lineups branch
    var lineupRef = ref
      .child("profile")
      .child($localStorage.userkey)
      .child("lineups");

    $scope.showLineups = (function() {
      $scope.lineups = $firebaseArray(lineupRef);
    })();

    $scope.onItemDelete = function(lineup) {
      // A confirm dialog
      $scope.showConfirm = function() {
        var confirmPopup = $ionicPopup.confirm({
          title: "Delete lineup",
          template: "Are you sure you want to delete this lineup?",
          cancelText: "Cancel",
          okType: "button-calm"
        });

        confirmPopup.then(function(res) {
          if (res) {
            APIfactory.deleteLineup(lineup);
          } else {
          }
        });
      };

      $scope.showConfirm();
    };
  });
