'Use Strict';
angular.module('App').controller('addEventController', function (APIfactory, $scope, $state, $filter, $cordovaOauth, $localStorage, $location,$http, $ionicPopup, $firebaseObject, Auth, FURL, Utils, ionicTimePicker) {
  

    $scope.startHour = '10:00';
    $scope.endHour = '12:00';
    $scope.hourSelector = true;

    var ipObj1 = {
      callback: function (val) {      //Mandatory
        if (typeof (val) === 'undefined') {
          console.log('Time not selected');
        } else {
          var selectedTime = new Date(val * 1000);
          var minutes;

          if(selectedTime.getUTCMinutes() == 0)
            minutes = '00';
          else
            minutes = selectedTime.getUTCMinutes();

          if($scope.hourSelector == true){
            $scope.startHour = selectedTime.getUTCHours() + ':'+ minutes;
          }
          else{
            $scope.endHour = selectedTime.getUTCHours() + ':'+ minutes;
          }
          console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
        }
      },
      inputTime: 50400,   //Optional
      format: 24,         //Optional
      step: 5,           //Optional
      setLabel: 'Aceptar',    //Optional
      closeLabel: 'Cerrar'
    };

  


    var fecha = new Date("07-01-2016");
    $scope.dateSelected = $filter('date')(fecha, "dd-MM-yyyy");

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
            inputDate: new Date("01-01-2016"),  //Optional
            mondayFirst: true,  //Optional
            disabledDates: disabledDates, //Optional
            weekDaysList: weekDaysList, //Optional
            monthList: monthList, //Optional
            templateType: 'modal', //Optional
            showTodayButton: 'true', //Optional
            modalHeaderColor: 'bar-dark', //Optional
            modalFooterColor: 'bar-dark', //Optional
            from: new Date(2015, 1, 1), //Optional
            to: new Date(2030, 8, 25),  //Optional
            callback: function (val) {  //Mandatory
              datePickerCallback(val);
            },
            dateFormat: 'dd-MM-yyyy', //Optional
            closeOnSelect: false, //Optional
          };

  $scope.openTimePicker = function (selector) {
      $scope.hourSelector = selector;
      ionicTimePicker.openTimePicker(ipObj1);

  };


    $scope.addE = function (event) {
    console.log("Enviada peticion crear evento");

    event.day = fecha;
    event.startHour = $scope.startHour;
    event.endHour = $scope.endHour;

    APIfactory.pushEvento(event);

    //Resetear formulario


    var alertPopup = $ionicPopup.alert({
       title: 'Evento añadido',
     });

  };


});