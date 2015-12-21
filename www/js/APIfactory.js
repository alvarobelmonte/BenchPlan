angular.module('App').factory("APIfactory", function($cordovaOauth, $filter, $localStorage, $location,$http,$ionicPopup, $firebaseObject, $firebaseArray, Auth, FURL, Utils){


    var ref = new Firebase(FURL);
    var playersRef = ref.child('profile').child($localStorage.userkey).child("player");
    var eventsRef = ref.child('profile').child($localStorage.userkey).child("event");

    var interfaz = {};

    interfaz.getJugadores =function(){
        var jugadores = $firebaseArray(playersRef);
        return jugadores;
    };

    interfaz.pushJugador = function(jugador){
        var userRef = ref.child('profile').child($localStorage.userkey).child("player");
        userRef.push({
            name: jugador.name,
            position: jugador.position,
            dorsal: jugador.dorsal,
            date: $filter('date')(jugador.fecha, "dd-MM-yyyy")
        });
    };

    interfaz.deleteJugador = function(jugador){
        var ID = jugador.$id;
        var playerRef = ref.child('profile').child($localStorage.userkey).child("player").child(ID);
        
        playerRef.remove();

        var alertPopup = $ionicPopup.alert({
            title: 'Jugador borrado',
        }); 
    };

    interfaz.getEventos =function(){
        var eventos = $firebaseArray(eventsRef);
        return eventos;
    };

    interfaz.pushEvento = function(evento){
        var userRef = ref.child('profile').child($localStorage.userkey).child("event");
        if(evento.type == 'Partido'){
            userRef.push({
                name: evento.name,
                type: evento.type,
                rival: evento.rival,
                place: evento.place,
                date: $filter('date')(evento.day, "dd-MM-yyyy"),
                month: $filter('date')(evento.day, "M"),
                monthWord: $filter('date')(evento.day, "MMMM"),
                dayWeek:  $filter('date')(evento.day, "EEEE"),
                dayNumber: $filter('date')(evento.day, "d"),
                time: $filter('date')(evento.hour, "H:mm")
            });
        }
        else if(evento.type == 'Entrenamiento'){
            console.log('push entrenamiento');
            userRef.push({
                name: evento.name,
                type: evento.type,
                place: evento.placeTraining,
                date: $filter('date')(evento.day, "dd-MM-yyyy"),
                month: $filter('date')(evento.day, "M"),
                monthWord: $filter('date')(evento.day, "MMMM"),
                dayWeek:  $filter('date')(evento.day, "EEEE"),
                dayNumber: $filter('date')(evento.day, "d"),
                hourStart: $filter('date')(evento.hourStart, "H:mm"),
                hourEnd: $filter('date')(evento.hourEnd, "H:mm")
            }); 
        }
    };
    
    interfaz.deleteEvento = function(evento){
        var ID = evento.$id;
        var eventRef = ref.child('profile').child($localStorage.userkey).child("event").child(ID);
        
        eventRef.remove();

        var alertPopup = $ionicPopup.alert({
            title: 'Evento borrado',
        }); 
    };

    return interfaz;
});


