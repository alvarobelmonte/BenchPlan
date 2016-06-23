'Use Strict';
angular.module('App').controller('strategyDetailController', function (APIfactory, $cordovaScreenshot, $parse, $scope, $ionicModal, $state,$cordovaOauth, $localStorage, $location,$http,$ionicPopup, $firebaseObject, $firebaseArray, Auth, FURL, Utils) {
  
  var ref = new Firebase(FURL);
  $scope.itemList=[];
  $scope.whichestrategia = $state.params.aId;
  console.log($scope.whichestrategia );

  var canvas = document.getElementById('signatureCanvas');
  var signaturePad = new SignaturePad(canvas, {
    minWidth: 1,
    maxWidth: 1,
    penColor: "rgb(255, 51, 0)"
  });

  $scope.clearCanvas = function(){
    signaturePad.clear();
  }


  $scope.saveStrategy = function () {
      $cordovaScreenshot.capture($scope.whichestrategia, 'jpg', '100');

      var alertPopup = $ionicPopup.alert({
           title: 'Estrategia guardada',
         });
  }

  
    

}
);
