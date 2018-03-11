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
       title: 'Delete strategy',
       template: 'Are you sure you want to delete this strategy?',
       cancelText: 'Cancel',
       okType: 'button-calm'
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
