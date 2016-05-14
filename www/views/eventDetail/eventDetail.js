'Use Strict';
angular.module('App').controller('eventDetailController', function (APIfactory, $ionicModal, $scope, $state,$cordovaOauth, $localStorage, $location,$http,$ionicPopup, $firebaseObject, $firebaseArray, Auth, FURL, Utils) {

  $scope.whichevent = $state.params.aId;

  $scope.showE = function () {
	    $scope.events = APIfactory.getEventos();
	    console.log($scope.events);
  };

  $scope.showE();




  //EventDetail
  $scope.editing = false;
  $scope.goalsSaved = false;

  $scope.teamGoals = 0;
  $scope.rivalGoals = 0;
  $scope.numbers = [0, 1, 2, 3, 4 ,5 , 6, 7, 8, 9, 10];

  $scope.finishMatch = function (idEvent) {
    
    APIfactory.updateMatch(idEvent);
    console.log($scope.yearSelected);

  };

  //Modal 1
  $ionicModal.fromTemplateUrl('goalsModal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal1 = modal;
  });

  $ionicModal.fromTemplateUrl('goalsModal2.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal2 = modal;
  });

  $scope.openGoalsModal = function(n) {
    if(n == 1)
      $scope.modal1.show();
    else
      $scope.modal2.show();
  };

  $scope.closeGoalsModal = function(n) {
    if(n == 1)
      $scope.modal1.hide();
    else
      $scope.modal2.hide();
  };

  $scope.assignGoals = function (n, goals) {
    $scope.closeGoalsModal(n);
    if (n == 1)
      $scope.teamGoals = goals;
    else
      $scope.rivalGoals = goals;
  };

  $scope.saveGoals = function (idEvent) {
    APIfactory.updateMatchGoals(idEvent, $scope.teamGoals, $scope.rivalGoals);
    $scope.editing = false;
    $scope.goalsSaved = true;
  };

}
);
