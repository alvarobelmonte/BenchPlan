'Use Strict';
angular.module('App').controller('playerDetailController', function (APIfactory, $scope, $state, $ionicModal, $filter, $cordovaOauth, $localStorage, $location,$http,$ionicPopup, $firebaseObject, $firebaseArray, Auth, FURL, Utils) {
  
  var ref = new Firebase(FURL);
  $scope.id = $state.params.aId;

  $scope.botonEdit = 'Editar';
  //Dorsales
  $scope.dorsals = [];
  var initDorsals = function() {
    var i;
    for (i = 0;i <= 27; i++) {
      $scope.dorsals.push(i);
    }
  }
  initDorsals();


    var fecha = new Date("08-14-1993");
    $scope.dateSelected = $filter('date')(fecha, "dd-MM-yyyy");
    $scope.positionSelected = 'Portero';
    $scope.dorsalSelected = '1';
    $scope.photoUrl = 'https://cloudinary.com/console/media_library#/dialog/image/upload/perfil_li3dgc';
    var url = '';

    var disabledDates = [
      new Date(1437719836326),
      new Date(),
      new Date(2015, 7, 10), //months are 0-based, this is August, 10th!
      new Date('Wednesday, August 12, 2015'), //Works with any valid Date formats like long format
      new Date("08-14-2015"), //Short format
      new Date(1439676000000) //UNIX format
    ];

    var weekDaysList = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
    $scope.positions = ["Portero", "Defensa", "Centrocampista", "Delantero"];
    var monthList = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  
    var datePickerCallback = function (val) {
    if (typeof(val) === 'undefined') {
      console.log('No date selected');
    } else {
      console.log('Selected date is : ', val)
      fecha = val;
      $scope.dateSelected = $filter('date')(fecha, "dd-MM-yyyy");
    }
    };
    $scope.datepickerObjectModal = {
            titleLabel: 'Fecha de nacimiento',  //Optional
            todayLabel: '  ',  //Optional
            closeLabel: 'Cerrar',  //Optional
            setLabel: 'Aceptar',  //Optional
            setButtonType : 'button-assertive',  //Optional
            todayButtonType : 'button-assertive',  //Optional
            closeButtonType : 'button-assertive',  //Optional
            inputDate: new Date("01-01-1993"),  //Optional
            mondayFirst: true,  //Optional
            disabledDates: disabledDates, //Optional
            weekDaysList: weekDaysList, //Optional
            monthList: monthList, //Optional
            templateType: 'modal', //Optional
            showTodayButton: 'true', //Optional
            modalHeaderColor: 'bar-dark', //Optional
            modalFooterColor: 'bar-dark', //Optional
            from: new Date(1960, 8, 2), //Optional
            to: new Date(2010, 8, 25),  //Optional
            callback: function (val) {  //Mandatory
              datePickerCallback(val);
            },
            dateFormat: 'dd-MM-yyyy', //Optional
            closeOnSelect: false, //Optional
          };


  $scope.nombre = "nombre";
  $scope.posicion = "posicion";
  $scope.whichplayer = $state.params.aId;
  $scope.editing = false;

  $scope.showP = function () {
	   $scope.player = APIfactory.getPlayer($scope.id);

  }

  $scope.showP();


  $scope.turnFalse = function () {
      console.log('showForm');
      $scope.editing = true;
  }



  $scope.editar = function () {
    $scope.editing = !$scope.editing;
    if($scope.editing==true)
      $scope.botonEdit = 'Cancelar';
    else
      $scope.botonEdit = 'Editar';

    $scope.player = APIfactory.getPlayer($scope.id);
    console.log($scope.player.name);
  }

  $scope.editP = function (player) {
    console.log("Enviada peticion editar jugador");

    //Recogemos datos del formulario

    $scope.name = player.name;
    console.log('name '+$scope.name);
    $scope.position = $scope.positionSelected
    $scope.dorsal = $scope.dorsalSelected
    $scope.fecha = fecha;
    $scope.estado = player.condition;


    var id = player.$id;
    
    //Referencia a la rama players del usuario que ha iniciado sesion
    var userRef = ref.child('profile').child($localStorage.userkey).child("player").child(player.$id);

    
    console.log(player.name);
    player.position = $scope.positionSelected
    player.dorsal = $scope.dorsalSelected
    player.fecha = fecha;

    APIfactory.updatePlayer(player, id);
    //Resetear formulario


    //Pop up de confirmación
    var alertPopup = $ionicPopup.alert({
       title: 'Jugador editado',
       /*template: $scope.name*/
     });

    $scope.editing = false;
    $scope.botonEdit = 'Editar';
  }


  //Modal Posiciones
  $ionicModal.fromTemplateUrl('positionModal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal1 = modal;
  });

  $scope.openPositionModal = function(jugador, num) {
    $scope.modal1.show();
  };

  $scope.closePositionModal = function() {
    $scope.modal1.hide();
  };

  $scope.assignPosition = function (p) {
    $scope.closePositionModal();
    $scope.positionSelected = p;
  };

  //Modal Dorsales
  $ionicModal.fromTemplateUrl('dorsalModal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal2 = modal;
  });

  $scope.openDorsalModal = function(jugador, num) {
    $scope.modal2.show();
  };

  $scope.closeDorsalModal = function() {
    $scope.modal2.hide();
  };

  $scope.assignDorsal = function (d) {
    $scope.closeDorsalModal();
    $scope.dorsalSelected = d;
  };

}
);
