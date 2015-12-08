'Use Strict';
angular.module('App').controller('addAlineacionController', function ($scope, $state,$cordovaOauth, $localStorage, $location,$http, $ionicPopup, $firebaseObject, Auth, FURL, Utils) {
  
  var ref = new Firebase(FURL);


  
  $scope.addAl = function (alineacion) {
    console.log("Enviada peticion crear alineacion");

    //Recogemos datos del formulario
    $scope.name = alineacion.name;
    $scope.descripcion = alineacion.descripcion;
    


    //Referencia a la rama players del usuario que ha iniciado sesion
    var userRef = ref.child('profile').child($localStorage.userkey).child("alineaciones");

    //Introducimos los valores
    userRef.push({
                nombre: $scope.name,
                descripcion: $scope.descripcion
    });

    //Resetear formulario


    //Pop up de confirmación
    var alertPopup = $ionicPopup.alert({
       title: 'Alineación añadida',
       /*template: $scope.name*/
     });

  }

});