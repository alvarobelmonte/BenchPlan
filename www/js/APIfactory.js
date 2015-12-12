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
                time: $filter('date')(evento.hour, "H:mm")
            });
        }
        else if(evento.type == 'Entrenamiento'){
            console.log('push entrenamiento');
            userRef.push({
                name: evento.name,
                type: evento.type,
                place: evento.placeTraining,
                hourStart: $filter('date')(evento.hourStart, "H:mm"),
                hourEnd: $filter('date')(evento.hourEnd, "H:mm")
            }); 
        }
    };
    
    return interfaz;
});


