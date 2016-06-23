'Use Strict';
angular.module('App').controller('addPlayerController', function (APIfactory, $filter, $ionicLoading, $scope, $state, $ionicModal, $cordovaOauth, $localStorage, $location,$http, $ionicPopup, $firebaseObject, $cordovaCamera, $cordovaFileTransfer, Auth, FURL, Utils, Upload, Camara ) {
  
  var ref = new Firebase(FURL);



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
    $scope.photoUrl = 'vacio';
    var url = 'http://res.cloudinary.com/dcqushonn/image/upload/v1450025911/perfil_li3dgc.png';

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

    
    $scope.calculateAge = function calculateAge(birthday) { // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
    }   

    $scope.addP = function (player) {
      if($scope.photoUrl == 'vacio'){
        player.edad = $scope.calculateAge(fecha);
        player.position = $scope.positionSelected;
        player.dorsal = $scope.dorsalSelected;
        player.photo = url;
        player.fecha = fecha;

        APIfactory.pushPlayer(player);

        //Pop up de confirmación
        var alertPopup = $ionicPopup.alert({
           title: 'Jugador añadido',
         });
        
      }
      else{
        $scope.uploadPicture();

        //Recogemos datos del formulario
        setTimeout(function(){
        player.edad = $scope.calculateAge(fecha);
        player.position = $scope.positionSelected;
        player.dorsal = $scope.dorsalSelected;
        player.photo = url;
        player.fecha = fecha;

        APIfactory.pushPlayer(player);

        //Pop up de confirmación
        var alertPopup = $ionicPopup.alert({
           title: 'Jugador añadido',
         });

        $state.go('tabs.players');
        }, 6000);
      }
  };

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



  $scope.uploadPicture = function(){                     
    
    Upload.uploadCloud($scope.photoUrl).then(
          function(res) {
            url = res.url;
            $ionicLoading.hide().then(function(){
                 console.log("The loading indicator is now hidden");
            });            
          }, function(err) {
              console.log('error subiendo foto con defer');
          });
           
  };

  $scope.takePicture = function(){

    Camara.takePicture().then(
          function(res) {
            $scope.photoUrl = res;
          }, function(err) {
              console.log('error cogiendo foto');
          });
    
  };

  $scope.getPicture = function(){

    Camara.getPicture().then(
          function(res) {
            $scope.photoUrl = res;
            //alert('photourl con defer'+ $scope.photoUrl);
          }, function(err) {
              console.log('error cogiendo foto');
          });

  };

});