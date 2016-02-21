'Use Strict';
angular.module('App').controller('addPlayerController', function (APIfactory, $scope, $state,$cordovaOauth, $localStorage, $location,$http, $ionicPopup, $firebaseObject, Auth, FURL, Utils) {
  
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

    var fecha;

    var disabledDates = [
      new Date(1437719836326),
      new Date(),
      new Date(2015, 7, 10), //months are 0-based, this is August, 10th!
      new Date('Wednesday, August 12, 2015'), //Works with any valid Date formats like long format
      new Date("08-14-2015"), //Short format
      new Date(1439676000000) //UNIX format
    ];

    var weekDaysList = ["Sun", "Mon", "Tue", "Wed", "thu", "Fri", "Sat"];
    var monthList = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
  
    var datePickerCallback = function (val) {
    if (typeof(val) === 'undefined') {
      console.log('No date selected');
    } else {
      console.log('Selected date is : ', val)
      fecha = val;
      console.log('fecha=', fecha);
    }
    };
    $scope.datepickerObjectModal = {
            titleLabel: 'Title',  //Optional
            todayLabel: 'Today',  //Optional
            closeLabel: 'Close',  //Optional
            setLabel: 'Set',  //Optional
            setButtonType : 'button-assertive',  //Optional
            todayButtonType : 'button-assertive',  //Optional
            closeButtonType : 'button-assertive',  //Optional
            inputDate: new Date(),  //Optional
            mondayFirst: true,  //Optional
            disabledDates: disabledDates, //Optional
            weekDaysList: weekDaysList, //Optional
            monthList: monthList, //Optional
            templateType: 'modal', //Optional
            showTodayButton: 'true', //Optional
            modalHeaderColor: 'bar-positive', //Optional
            modalFooterColor: 'bar-positive', //Optional
            from: new Date(2012, 8, 2), //Optional
            to: new Date(2018, 8, 25),  //Optional
            callback: function (val) {  //Mandatory
              datePickerCallback(val);
            },
            dateFormat: 'dd-MM-yyyy', //Optional
            closeOnSelect: false, //Optional
          };

      $scope.datepickerObjectPopup = {
            titleLabel: 'Title',  //Optional
            todayLabel: 'Today',  //Optional
            closeLabel: 'Close',  //Optional
            setLabel: 'Set',  //Optional
            setButtonType : 'button-assertive',  //Optional
            todayButtonType : 'button-assertive',  //Optional
            closeButtonType : 'button-assertive',  //Optional
            inputDate: new Date(),  //Optional
            mondayFirst: true,  //Optional
            disabledDates: disabledDates, //Optional
            weekDaysList: weekDaysList, //Optional
            monthList: monthList, //Optional
            templateType: 'popup', //Optional
            showTodayButton: 'true', //Optional
            modalHeaderColor: 'bar-positive', //Optional
            modalFooterColor: 'bar-positive', //Optional
            from: new Date(2012, 8, 2), //Optional
            to: new Date(2018, 8, 25),  //Optional
            callback: function (val) {  //Mandatory
              datePickerCallback(val);
            },
            dateFormat: 'dd-MM-yyyy', //Optional
            closeOnSelect: false, //Optional
          };
        
  



    $scope.addP = function (player) {
      console.log("Enviada peticion crear jugador");
      console.log(fecha);
      //Recogemos datos del formulario
      $scope.name = player.name;
      $scope.position = player.position;
      $scope.dorsal = player.dorsal;
      
      $scope.estado = player.condition;
      
      


      //Referencia a la rama players del usuario que ha iniciado sesion
      var userRef = ref.child('profile').child($localStorage.userkey).child("player");

      //Introducimos los valores
      /*userRef.push({
                  name: $scope.name,
                  position: $scope.dorsal
      });*/

      player.fecha = fecha;
      APIfactory.pushJugador(player);

      //Resetear formulario


      //Pop up de confirmación
      var alertPopup = $ionicPopup.alert({
         title: 'Jugador añadido',
         /*template: $scope.name*/
       });

  }

});