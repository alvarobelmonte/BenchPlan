angular.module('App').factory("APIfactory", function($cordovaOauth, $filter, $localStorage, $location,$http,$ionicPopup, $firebaseObject, $firebaseArray, Auth, FURL, Utils){


    var ref = new Firebase(FURL);
    var playersRef = ref.child('profile').child($localStorage.userkey).child("player");
    var eventsRef = ref.child('profile').child($localStorage.userkey).child("event");

    var interfaz = {};

    //JUGADORES
    interfaz.getJugadores = function(){
        var jugadores = $firebaseArray(playersRef);
        return jugadores;
    };

    interfaz.pushJugador = function(jugador){
        var userRef = ref.child('profile').child($localStorage.userkey).child("player");
        userRef.push({
            name: jugador.name,
            position: jugador.position,
            dorsal: jugador.dorsal,
            date: $filter('date')(jugador.fecha, "dd-MM-yyyy"),
            condition: jugador.condition
        });
    };

    interfaz.updateJugador = function(jugador, idJugador){
        var playerRef = ref.child('profile').child($localStorage.userkey).child("player").child(idJugador);
        playerRef.update({
            name: jugador.name,
            position: jugador.position,
            dorsal: jugador.dorsal,
            date: $filter('date')(jugador.fecha, "dd-MM-yyyy"),
            condition: jugador.condition
        });
    };

    interfaz.updateJugador = function(jugador, idJugador){
        var playerRef = ref.child('profile').child($localStorage.userkey).child("player").child(idJugador);
        playerRef.update({
            name: jugador.name,
            position: jugador.position,
            dorsal: jugador.dorsal,
            date: $filter('date')(jugador.fecha, "dd-MM-yyyy"),
            condition: jugador.condition
        });
    };

    interfaz.updateCondicion = function(jugador, idJugador){
        var playerRef = ref.child('profile').child($localStorage.userkey).child("player").child(idJugador);
        playerRef.update({
            condition: jugador.condition
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





    //EVENTOS
    interfaz.getEventos = function(){
        var eventos = $firebaseArray(eventsRef);
        return eventos;
    };

    interfaz.pushEvento = function(evento){
        var userRef = ref.child('profile').child($localStorage.userkey).child("event");
        var diaSemana = $filter('date')(evento.day, "EEEE");
        diaSemana = translatedayWeek(diaSemana);
        mes = $filter('date')(evento.day, "MMMM");
        mes = translatedayMonth(mes);

        if(evento.type == 'Partido'){
            userRef.push({
                name: evento.name,
                type: evento.type,
                rival: evento.rival,
                place: evento.place,
                date: $filter('date')(evento.day, "dd-MM-yyyy"),
                month: $filter('date')(evento.day, "M"),
                dayMonth: mes,
                dayWeek: diaSemana,
                monthWord: $filter('date')(evento.day, "MMMM"),
                dayNumber: $filter('date')(evento.day, "d"),
                time: $filter('date')(evento.hour, "H:mm"),
                
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
                dayMonth: mes,
                dayWeek:  diaSemana,
                dayNumber: $filter('date')(evento.day, "d"),
                hourStart: $filter('date')(evento.hourStart, "H:mm"),
                hourEnd: $filter('date')(evento.hourEnd, "H:mm"),
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













//Traducir días de la semana
function translatedayWeek(diaSemana){
            if(diaSemana =='Monday')
                diaSemana = 'Lunes';
            else if(diaSemana =='Tuesday')
                diaSemana = 'Martes';
            else if(diaSemana =='Wednesday')
                diaSemana = 'Miércoles';
            else if(diaSemana =='Thursday')
                diaSemana = 'Jueves';
            else if(diaSemana =='Friday')
                diaSemana = 'Viernes';
            else if(diaSemana =='Saturday')
                diaSemana = 'Sábado';
            else if(diaSemana =='Sunday')
                diaSemana = 'Domingo';
            
            return diaSemana;
}

function translatedayMonth(mes){
            if(mes =='January')
                mes = 'Enero';
            else if(mes =='February')
                mes = 'Febrero';
            else if(mes =='March')
                mes = 'Marzo';
            else if(mes =='April')
                mes = 'Abril';
            else if(mes =='May')
                mes = 'Mayo';
            else if(mes =='June')
                mes = 'Junio';
            else if(mes =='July')
                mes = 'Julio';
            else if(mes =='August')
                mes = 'Agosto';
            else if(mes =='September')
                mes = 'Septiembre';
            else if(mes =='October')
                mes = 'Octubre';
            else if(mes =='November')
                mes = 'Noviembre';
            else if(mes =='December')
                mes = 'Diciembre';
            
            return mes;
}
